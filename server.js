const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || "127.0.0.1";
const CONTRACT_LIMIT = 20;
const SOURCE = {
  packageId: "3c5b0ca3-d7dc-4808-9ec5-bf42954b8ab8",
  datasetUrl: "https://www.datosabiertos.gob.pe/dataset/contratos-de-las-entidades-organismo-especializado-para-las-contrataciones-p%C3%BAblicas",
  ocdsUrl: "https://contratacionesabiertas.oece.gob.pe/api",
  ocdsBase: "https://contratacionesabiertas.oece.gob.pe/api/v1",
  buyerId: "PE-CONSUCODE-10159",
  apiBase: "https://www.datosabiertos.gob.pe/api/3/action",
  entityTerms: [
    "DIRAVPOL",
    "DIRECCION DE AVIACION POLICIAL",
    "AVIACION POLICIAL",
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
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

function isDiravpolRecord(record) {
  const entityNames = [];
  const entityField = /BUYER|PURCHASER|ENTITY|ENTIDAD|INSTITUTION|INSTITUCION|AGENCY|AGENCIA|CONTRACTING|EJECUTORA/i;

  function collectEntityNames(value, inEntityField = false) {
    if (!value || typeof value !== "object") return;
    for (const [key, nestedValue] of Object.entries(value)) {
      const isEntityField = inEntityField || entityField.test(normalizeText(key));
      if (isEntityField && typeof nestedValue === "string") entityNames.push(nestedValue);
      else if (nestedValue && typeof nestedValue === "object") collectEntityNames(nestedValue, isEntityField);
    }
  }

  collectEntityNames(record);
  return entityNames.some((name) =>
    SOURCE.entityTerms.some((term) => normalizeText(name).includes(normalizeText(term)))
  );
}

function parseDate(value) {
  if (!value) return null;
  const text = String(value).trim();
  let date;
  if (/^\d{4}-\d{2}-\d{2}/.test(text)) date = new Date(text.slice(0, 10));
  else if (/^\d{8}$/.test(text)) date = new Date(`${text.slice(0, 4)}-${text.slice(4, 6)}-${text.slice(6, 8)}`);
  const parts = text.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})/);
  if (!date && parts) date = new Date(`${parts[3]}-${parts[2].padStart(2, "0")}-${parts[1].padStart(2, "0")}`);
  if (!date) date = new Date(text);
  return Number.isNaN(date.getTime()) ? null : date;
}

function classifyContract(record) {
  const release = record.compiledRelease || record;
  const tender = release.tender || {};
  const categoryFields = Object.entries(record)
    .filter(([key]) => /TIPO.*(OBJETO|CONTRATACION)|OBJETO.*(CONTRATACION|PROCESO)|CATEGORIA/i.test(normalizeText(key)))
    .map(([, value]) => String(value || ""));
  const categoryText = normalizeText([
    tender.mainProcurementCategory,
    ...categoryFields,
  ].join(" "));
  const searchText = normalizeText([
    tender.title,
    tender.description,
    ...Object.entries(record)
      .filter(([key, value]) => /OBJETO|DESCRIPCION|TITULO|CONVOCATORIA/i.test(normalizeText(key)) && typeof value === "string")
      .map(([, value]) => value),
  ].join(" "));

  if (/\bWORKS?\b|\bOBRAS?\b/.test(categoryText)) return "Obras";
  if (/\bGOODS?\b|\bBIEN(?:ES)?\b/.test(categoryText)) return "Bienes";
  if (/\bSERVICES?\b|\bSERVICIOS?\b/.test(categoryText)) return "Servicios";
  if (/\bSERVICIOS?\b/.test(searchText)) return "Servicios";
  if (/\bBIEN(?:ES)?\b/.test(searchText)) return "Bienes";
  if (/\bOBRAS?\b/.test(searchText)) return "Obras";
  return null;
}

function getRecordDate(record, contractRecord = null) {
  const release = record.compiledRelease || record;
  const contract = contractRecord || release.contracts?.[0] || {};
  const award = release.awards?.[0] || {};
  const directDate = contract.dateSigned || award.date || release.date || contract.period?.startDate || contract.period?.endDate;
  if (directDate) return parseDate(directDate);

  const dateFields = Object.entries(record)
    .filter(([key, value]) => /FECHA|DATE/i.test(normalizeText(key)) && value)
    .sort(([left], [right]) => {
      const priority = (key) => /SUSCRIPCION|CONTRATO|FIRMA/i.test(normalizeText(key)) ? 0 : 1;
      return priority(left) - priority(right);
    });
  return dateFields.length ? parseDate(dateFields[0][1]) : null;
}

function limitRecentByCategory(contracts) {
  const categories = { Bienes: [], Obras: [], Servicios: [] };
  const seen = new Set();
  const sorted = contracts
    .filter((contract) => Object.hasOwn(categories, contract.category))
    .sort((a, b) => (Date.parse(b.date || "") || 0) - (Date.parse(a.date || "") || 0));

  for (const contract of sorted) {
    const key = JSON.stringify([
      contract.category,
      normalizeText(contract.id),
      normalizeText(contract.object),
      contract.date,
      contract.value,
    ]);
    if (!seen.has(key) && categories[contract.category].length < CONTRACT_LIMIT) {
      seen.add(key);
      categories[contract.category].push(contract);
    }
  }

  return Object.values(categories).flat();
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

function mapOcdsContract(record, contract, index) {
  const release = record.compiledRelease || record;
  const award = release.awards?.[0] || {};
  const supplier = award.suppliers?.[0]?.name || contract.suppliers?.[0]?.name || "No registrado";
  const value = contract.value || award.value || release.tender?.value || {};

  return {
    id: contract.id || release.tender?.title || release.ocid || `OCDS-${index + 1}`,
    supplier,
    object: contract.title || award.title || release.tender?.description || release.tender?.title || "No registrado",
    value: formatCurrency(value.amount),
    status: contract.status || award.status || release.tender?.status || "Registrado",
    end: contract.period?.endDate || contract.dateSigned || release.date || "No registrado",
    date: getRecordDate(record, contract)?.toISOString().slice(0, 10) || "",
    category: classifyContract(record),
    source: "OECE/OCDS",
  };
}

function mapOcdsContracts(record, index) {
  const release = record.compiledRelease || record;
  const contracts = release.contracts || [];
  return contracts.map((contract, contractIndex) =>
    mapOcdsContract(record, contract, `${index + 1}-${contractIndex + 1}`)
  );
}

function mapSeaceContract(record, index) {
  return {
    id: pick(record, ["NUMERO_CONTRATO", "CONTRATO", "CODIGO_CONTRATO", "NOMENCLATURA"], `SEACE-${index + 1}`),
    supplier: pick(record, ["PROVEEDOR", "CONTRATISTA", "RAZON_SOCIAL", "POSTOR"]),
    object: pick(record, ["OBJETO", "DESCRIPCION", "PRESTACION", "CONVOCATORIA"]),
    value: formatCurrency(pick(record, ["MONTO", "VALOR", "IMPORTE", "TOTAL"], "")),
    status: pick(record, ["ESTADO", "SITUACION"], "Registrado"),
    end: pick(record, ["FECHA_FIN", "FECHA_CULMINACION", "FECHA_SUSCRIPCION", "FECHA"], "No registrado"),
    date: getRecordDate(record)?.toISOString().slice(0, 10) || "",
    category: classifyContract(record),
    source: "Datos Abiertos/OECE",
  };
}

async function fetchJson(url) {
  const origin = new URL(url).origin;
  const response = await fetch(url, {
    headers: {
      accept: "application/json,text/plain,*/*",
      "user-agent": "SIGECA-DIRAVPOL/1.0 (+local academic prototype)",
      origin,
      referer: `${origin}/`,
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
  const categories = [
    { source: "goods", name: "Bienes" },
    { source: "works", name: "Obras" },
    { source: "services", name: "Servicios" },
  ];

  const results = await Promise.all(categories.map(async ({ source, name }) => {
    const contracts = [];
    let page = 1;

    while (page <= 100) {
      const params = new URLSearchParams({
        entity: SOURCE.buyerId,
        category: source,
        page: String(page),
        paginateBy: "100",
        format: "json",
      });
      const payload = await fetchJson(`${SOURCE.ocdsBase}/search?${params}`);
      const records = Array.isArray(payload.results) ? payload.results : [];
      contracts.push(...records
        .filter(isDiravpolRecord)
        .flatMap(mapOcdsContracts)
        .filter((contract) => contract.category === name));

      if (!payload.pagination?.has_next || !records.length) break;
      page += 1;
    }

    return contracts;
  }));

  return results.flat();
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
  if (!searchable.length) {
    throw new Error("La fuente de Datos Abiertos no tiene recursos de contratos consultables por API.");
  }
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
    .filter((record) => isDiravpolRecord(record) && classifyContract(record))
    .map(mapSeaceContract);
}

async function loadContracts() {
  const attempts = [];
  const availableContracts = [];
  const sources = [];
  let ocdsSucceeded = false;

  try {
    const contracts = await fetchOcdsContracts();
    availableContracts.push(...contracts);
    sources.push("OECE/OCDS");
    attempts.push({ source: "OECE/OCDS", ok: true, count: limitRecentByCategory(contracts).length });
    ocdsSucceeded = true;
  } catch (error) {
    attempts.push({ source: "OECE/OCDS", ok: false, error: error.message });
  }

  if (!ocdsSucceeded) {
    try {
      const contracts = await fetchDatasetContracts();
      availableContracts.push(...contracts);
      sources.push("Datos Abiertos/OECE");
      attempts.push({ source: "Datos Abiertos/OECE", ok: true, count: limitRecentByCategory(contracts).length });
    } catch (error) {
      attempts.push({ source: "Datos Abiertos/OECE", ok: false, error: error.message });
    }
  }

  const contracts = limitRecentByCategory(availableContracts);
  if (attempts.every((attempt) => !attempt.ok)) {
    return {
      ok: false,
      source: "Fuentes oficiales no disponibles",
      sourceUrl: SOURCE.datasetUrl,
      contracts: [],
      attempts,
      message: "No fue posible consultar las fuentes oficiales OECE/SEACE.",
    };
  }

  return {
    ok: true,
    source: sources.join(" + ") || "Sin coincidencias oficiales",
    sourceUrl: sources.includes("Datos Abiertos/OECE") ? SOURCE.datasetUrl : SOURCE.ocdsUrl,
    contracts,
    attempts,
    message: contracts.length
      ? undefined
      : "Las fuentes oficiales respondieron correctamente, pero no devolvieron registros clasificables de bienes, obras o servicios para DIRAVPOL.",
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
        limitPerCategory: CONTRACT_LIMIT,
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
