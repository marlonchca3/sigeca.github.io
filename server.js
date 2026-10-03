const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || "127.0.0.1";
const CURRENT_DATE = "2026-10-03";
const SOURCE = {
  packageId: "3c5b0ca3-d7dc-4808-9ec5-bf42954b8ab8",
  datasetUrl: "https://www.datosabiertos.gob.pe/dataset/contratos-de-las-entidades-organismo-especializado-para-las-contrataciones-p%C3%BAblicas",
  ocdsUrl: "https://contratacionesabiertas.oece.gob.pe/api",
  ocdsBase: "https://contratacionesabiertas.oece.gob.pe/api/v1",
  apiBase: "https://www.datosabiertos.gob.pe/api/3/action",
  entityTerms: [
    "DIRAVPOL",
    "DIRECCION DE AVIACION POLICIAL",
    "DIRECCIÓN DE AVIACIÓN POLICIAL",
    "AVIACION POLICIAL",
    "AVIACIÓN POLICIAL",
    "UNIDAD EJECUTORA 018",
    "UNIDAD EJECUTORA N 18",
    "POLICIA NACIONAL DEL PERU",
    "POLICÍA NACIONAL DEL PERÚ",
    "20428696515",
  ],
};

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

function isDiravpolRecord(record) {
  const text = normalizeText(JSON.stringify(record));
  return SOURCE.entityTerms.some((term) => text.includes(normalizeText(term)));
}

function parseDate(value) {
  if (!value) return null;
  const text = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(text)) return new Date(text.slice(0, 10));
  if (/^\d{8}$/.test(text)) return new Date(`${text.slice(0, 4)}-${text.slice(4, 6)}-${text.slice(6, 8)}`);
  const parts = text.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})/);
  if (parts) return new Date(`${parts[3]}-${parts[2].padStart(2, "0")}-${parts[1].padStart(2, "0")}`);
  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isWithinLastYear(record) {
  const values = Object.entries(record)
    .filter(([key]) => normalizeText(key).includes("FECHA") || normalizeText(key).includes("DATE"))
    .map(([, value]) => value);
  const dates = values.map(parseDate).filter(Boolean);
  if (!dates.length) return true;
  const end = new Date(CURRENT_DATE);
  const start = new Date(end);
  start.setFullYear(start.getFullYear() - 1);
  return dates.some((date) => date >= start && date <= end);
}

function pick(record, names, fallback = "No registrado") {
  const keys = Object.keys(record);
  const wanted = names.map(normalizeText);
  const key = keys.find((item) => wanted.some((name) => normalizeText(item).includes(name)));
  return key && record[key] ? record[key] : fallback;
}

function formatCurrency(value) {
  const number = Number(String(value || "").replace(/[^\d.-]/g, ""));
  if (!Number.isFinite(number) || number <= 0) return value || "No registrado";
  return new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN", maximumFractionDigits: 0 }).format(number);
}

function getLastYearStart() {
  const date = new Date(CURRENT_DATE);
  date.setFullYear(date.getFullYear() - 1);
  return date.toISOString().slice(0, 10);
}

function extractOcdsRecords(payload) {
  if (Array.isArray(payload?.records)) return payload.records;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.result)) return payload.result;
  if (Array.isArray(payload)) return payload;
  return [];
}

function mapOcdsContract(record, index) {
  const release = record.compiledRelease || record;
  const contract = release.contracts?.[0] || {};
  const award = release.awards?.[0] || {};
  const supplier = award.suppliers?.[0]?.name || contract.suppliers?.[0]?.name || "No registrado";
  const value = contract.value || award.value || release.tender?.value || {};

  return {
    id: contract.id || release.tender?.title || release.ocid || `OCDS-${index + 1}`,
    supplier,
    object: contract.title || award.title || release.tender?.description || release.tender?.title || "No registrado",
    value: formatCurrency(value.amount),
    status: contract.status || award.status || release.tender?.status || "Registrado",
    end: contract.period?.endDate || contract.dateSigned || release.date || "Ultimo año",
    source: "OECE/OCDS",
  };
}

function mapSeaceContract(record, index) {
  return {
    id: pick(record, ["NUMERO_CONTRATO", "CONTRATO", "CODIGO_CONTRATO", "NOMENCLATURA"], `SEACE-${index + 1}`),
    supplier: pick(record, ["PROVEEDOR", "CONTRATISTA", "RAZON_SOCIAL", "POSTOR"]),
    object: pick(record, ["OBJETO", "DESCRIPCION", "PRESTACION", "CONVOCATORIA"]),
    value: formatCurrency(pick(record, ["MONTO", "VALOR", "IMPORTE", "TOTAL"], "")),
    status: pick(record, ["ESTADO", "SITUACION"], "Registrado"),
    end: pick(record, ["FECHA_FIN", "FECHA_CULMINACION", "FECHA_SUSCRIPCION", "FECHA"], "Ultimo año"),
    source: "Datos Abiertos/OECE",
  };
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      accept: "application/json,text/plain,*/*",
      "user-agent": "SIGECA-DIRAVPOL/1.0 (+local academic prototype)",
    },
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${text.slice(0, 120)}`);
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Respuesta no JSON: ${text.slice(0, 120)}`);
  }
}

async function fetchOcdsContracts() {
  let records = [];
  for (let page = 1; page <= 5; page += 1) {
    const url = `${SOURCE.ocdsBase}/recordsAfter?date=${getLastYearStart()}&page=${page}`;
    const payload = await fetchJson(url);
    const pageRecords = extractOcdsRecords(payload);
    records = records.concat(pageRecords);
    if (!pageRecords.length) break;
  }
  return records
    .filter((record) => isDiravpolRecord(record) && isWithinLastYear(record.compiledRelease || record))
    .map(mapOcdsContract);
}

async function fetchDatasetContracts() {
  const meta = await fetchJson(`${SOURCE.apiBase}/package_show?id=${SOURCE.packageId}`);
  const dataset = Array.isArray(meta.result) ? meta.result[0] : meta.result;
  const resources = dataset?.resources || [];
  const candidates = resources.filter((resource) => {
    const name = normalizeText(`${resource.name || ""} ${resource.description || ""}`);
    return name.includes("CONTRATOS") && !name.includes("DICCIONARIO") && !name.includes("METADATOS");
  });
  const searchable = candidates.filter((resource) => resource.datastore_active && resource.id);
  let records = [];

  for (const resource of searchable) {
    for (const term of SOURCE.entityTerms) {
      const url = `${SOURCE.apiBase}/datastore_search?resource_id=${resource.id}&q=${encodeURIComponent(term)}&limit=100`;
      const result = await fetchJson(url);
      records = records.concat(result.result?.records || []);
    }
  }

  const unique = Array.from(new Map(records.map((record) => [JSON.stringify(record), record])).values());

  return unique
    .filter((record) => isDiravpolRecord(record) && isWithinLastYear(record))
    .map(mapSeaceContract);
}

async function loadContracts() {
  const attempts = [];

  try {
    const contracts = await fetchOcdsContracts();
    attempts.push({ source: "OECE/OCDS", ok: true, count: contracts.length });
    if (contracts.length) {
      return { ok: true, source: "OECE/OCDS", sourceUrl: SOURCE.ocdsUrl, contracts, attempts };
    }
  } catch (error) {
    attempts.push({ source: "OECE/OCDS", ok: false, error: error.message });
  }

  try {
    const contracts = await fetchDatasetContracts();
    attempts.push({ source: "Datos Abiertos/OECE", ok: true, count: contracts.length });
    if (contracts.length) {
      return { ok: true, source: "Datos Abiertos/OECE", sourceUrl: SOURCE.datasetUrl, contracts, attempts };
    }
  } catch (error) {
    attempts.push({ source: "Datos Abiertos/OECE", ok: false, error: error.message });
  }

  return {
    ok: true,
    source: "Sin coincidencias oficiales",
    sourceUrl: SOURCE.datasetUrl,
    contracts: [],
    attempts,
    message: "Las fuentes oficiales respondieron correctamente, pero no devolvieron contratos DIRAVPOL consultables para el ultimo año desde este entorno.",
  };
}

function sendJson(response, status, body) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "access-control-allow-origin": "*",
  });
  response.end(JSON.stringify(body, null, 2));
}

async function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
  const filePath = path.normalize(path.join(ROOT, requestedPath));

  if (!filePath.startsWith(ROOT)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const content = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    response.writeHead(200, {
      "content-type": mimeTypes[ext] || "application/octet-stream",
      "cache-control": "no-store",
    });
    response.end(content);
  } catch {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("No encontrado");
  }
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, OPTIONS",
      "access-control-allow-headers": "content-type",
    });
    response.end();
    return;
  }

  if (url.pathname === "/api/contracts") {
    try {
      const result = await loadContracts();
      sendJson(response, result.ok ? 200 : 502, {
        ...result,
        lastSync: new Intl.DateTimeFormat("es-PE", { dateStyle: "medium", timeStyle: "short" }).format(new Date()),
        window: { from: getLastYearStart(), to: CURRENT_DATE },
      });
    } catch (error) {
      sendJson(response, 500, { ok: false, message: error.message, contracts: [] });
    }
    return;
  }

  await serveStatic(request, response);
});

server.listen(PORT, HOST, () => {
  console.log(`SIGECA listo en http://${HOST}:${PORT}`);
});
