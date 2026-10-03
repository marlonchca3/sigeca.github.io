const views = {
  inicio: "Centro de control",
  requerimientos: "Planificacion contractual",
  procesos: "Flujo de tramite",
  contratos: "Contratos SEACE",
  proveedores: "Talentos y proveedores",
  aeronaves: "Analitica e indicadores",
  alertas: "Integridad anticorrupcion",
};

const CURRENT_DATE = "2026-10-03";
const SEACE_SOURCE = {
  datasetUrl: "https://www.datosabiertos.gob.pe/dataset/contratos-de-las-entidades-organismo-especializado-para-las-contrataciones-p%C3%BAblicas",
  ocdsUrl: "https://contratacionesabiertas.oece.gob.pe/api",
};
const API_BASE = window.location.port === "4173" ? "" : "http://127.0.0.1:4173";

const data = {
  requirements: [
    { id: "REQ-2025-018", item: "Inspeccion mayor Bell 412 EP", unit: "Mantenimiento Aeronautico", priority: "Alta", amount: "S/ 1,280,000", status: "En evaluacion", due: "26 feb", aircraft: "Bell 412 EP · PNP-501", requester: "Cap. Luis Mendoza · Mantenimiento Aeronautico", section: "SECCIÓN DE MANTENIMIENTO PROGRAMADO", subject: "Sustento para contratar la inspeccion mayor programada de la aeronave Bell 412 EP, matricula PNP-501.", background: "La aeronave Bell 412 EP PNP-501 se encuentra próxima al hito de inspección mayor establecido en su programa de mantenimiento. La intervención requiere personal especializado, evaluación integral de sistemas y registro de los trabajos para conservar su condición de aeronavegabilidad.", objective: "Contratar la ejecución de la inspección mayor de la aeronave, de acuerdo con los manuales vigentes del fabricante y el alcance técnico aprobado por el área usuaria.", purpose: "Restablecer y preservar la disponibilidad operacional del Bell 412 EP, dejando evidencia documentada de las inspecciones, discrepancias atendidas y liberación al servicio.", specifications: ["Inspección estructural y de sistemas conforme al manual del fabricante", "Evaluación de componentes y registro de discrepancias", "Personal técnico con certificación vigente para Bell 412 EP", "Informe técnico, trazabilidad de trabajos y garantía del servicio"], funding: "Meta 004 · Mantenimiento de aeronaves", process: "Servicio especializado · Procedimiento competitivo", created: "12 feb 2025", responsible: "My. Ana Salazar · Oficina de Logística" },
    { id: "REQ-2025-019", item: "Repuestos tren de aterrizaje", unit: "Escuadron de Helicopteros", priority: "Critica", amount: "S/ 540,000", status: "Observado", due: "28 feb", aircraft: "MI-171Sh · PNP-512", requester: "Tte. Crnl. Jorge Rivas · Escuadron de Helicopteros", section: "SECCIÓN DE COMPONENTES Y ESTRUCTURAS", subject: "Adquisición de repuestos para el tren de aterrizaje del helicóptero MI-171Sh PNP-512.", background: "Durante la inspección técnica del MI-171Sh PNP-512 se identificó la necesidad de reemplazar componentes del tren de aterrizaje. La falta de estos repuestos condiciona la recuperación de la aeronave y exige verificar compatibilidad, procedencia y documentación de aeronavegabilidad antes de su instalación.", objective: "Adquirir los componentes requeridos para el tren de aterrizaje, compatibles con el modelo y la configuración de la aeronave, con documentación de origen y trazabilidad.", purpose: "Permitir la reparación controlada del MI-171Sh PNP-512 y contribuir a recuperar su disponibilidad para las operaciones aeropoliciales.", specifications: ["Componentes nuevos y compatibles con modelo y número de serie", "Trazabilidad y documentación de origen del fabricante", "Certificados de aeronavegabilidad y conformidad aplicables", "Garantía y soporte técnico para la instalación"], funding: "Meta 004 · Repuestos y componentes", process: "Bienes · Procedimiento competitivo", created: "14 feb 2025", responsible: "My. Ana Salazar · Oficina de Logística" },
    { id: "REQ-2025-020", item: "Servicio overhaul motor PT6T", unit: "Aeronaves de ala rotatoria", priority: "Alta", amount: "S/ 2,420,000", status: "Aprobado", due: "05 mar", aircraft: "Bell 412 EP · PNP-508", requester: "Cap. Luis Mendoza · Mantenimiento Aeronautico", section: "SECCIÓN DE MOTORES Y PLANTAS MOTRICES", subject: "Contratación del servicio de overhaul del motor PT6T asignado a la aeronave Bell 412 EP PNP-508.", background: "El motor PT6T de la aeronave Bell 412 EP PNP-508 requiere una intervención mayor conforme a sus parámetros de uso y al programa de mantenimiento. El servicio debe ser ejecutado por un taller con capacidad acreditada y dejar constancia de las pruebas y componentes intervenidos.", objective: "Contratar el overhaul del motor PT6T según las instrucciones vigentes del fabricante, incluyendo evaluación, reparación, pruebas y documentación técnica de retorno al servicio.", purpose: "Recuperar los parámetros de funcionamiento del motor y extender su ciclo de operación segura, con historial y garantía verificables.", specifications: ["Overhaul conforme a instrucciones vigentes del fabricante", "Repuestos con certificados de conformidad y trazabilidad", "Pruebas de banco y protocolo de liberación al servicio", "Informe de trabajos, garantía y soporte posservicio"], funding: "Meta 004 · Mantenimiento de aeronaves", process: "Servicio especializado · Procedimiento competitivo", created: "17 feb 2025", responsible: "My. Ana Salazar · Oficina de Logística" },
    { id: "REQ-2025-021", item: "Baterias aeronauticas certificadas", unit: "Abastecimiento", priority: "Media", amount: "S/ 132,000", status: "Borrador", due: "10 mar", aircraft: "Cessna 208B · PNP-320", requester: "S1 PNP Marco Vega · Abastecimiento", section: "SECCIÓN DE AVIÓNICA Y SISTEMA ELÉCTRICO", subject: "Adquisición de baterías aeronáuticas certificadas para la aeronave Cessna 208B PNP-320.", background: "Las baterías instaladas en la aeronave Cessna 208B PNP-320 se aproximan al límite de servicio previsto. Su reemplazo debe considerar compatibilidad con la configuración de la aeronave, fecha de fabricación, documentación técnica y garantía del proveedor.", objective: "Adquirir baterías nuevas que cumplan las especificaciones del fabricante y sean compatibles con el modelo y configuración de la aeronave.", purpose: "Asegurar la disponibilidad del sistema eléctrico para el arranque y la operación de la aeronave, con componentes identificables y documentación verificable.", specifications: ["Baterías nuevas compatibles con modelo y configuración", "Fecha de fabricación vigente y ficha técnica", "Certificado de conformidad y documentación de origen", "Garantía mínima de doce meses"], funding: "Meta 004 · Repuestos y componentes", process: "Bienes · Procedimiento competitivo", created: "20 feb 2025", responsible: "My. Ana Salazar · Oficina de Logística" },
  ],
  processes: [
    { id: "AS-SM-004-2025", title: "Adquisicion de componentes avionicos", method: "Adjudicacion simplificada", stage: "Consultas integradas", progress: 62, risk: "Medio" },
    { id: "CP-001-2025", title: "Mantenimiento programado flota MI-171", method: "Concurso publico", stage: "Bases publicadas", progress: 44, risk: "Alto" },
    { id: "DIRECTA-002-2025", title: "Servicio tecnico por proveedor exclusivo", method: "Contratacion directa", stage: "Informe tecnico", progress: 78, risk: "Bajo" },
  ],
  contracts: [
    { id: "CON-041-2024", supplier: "AeroAndes SAC", object: "Overhaul de transmision principal", value: "S/ 1,940,000", status: "Ejecucion", end: "18 abr 2025" },
    { id: "CON-052-2024", supplier: "HeliParts Peru", object: "Repuestos certificados", value: "S/ 684,500", status: "Por conformidad", end: "02 mar 2025" },
    { id: "CON-006-2025", supplier: "TecnoAvionics", object: "Calibracion de equipos", value: "S/ 216,000", status: "Inicio", end: "28 may 2025" },
  ],
  suppliers: [
    { name: "AeroAndes SAC", specialty: "Mantenimiento mayor", score: 94, docs: "Vigente", sanctions: "Sin sanciones" },
    { name: "HeliParts Peru", specialty: "Repuestos aeronauticos", score: 86, docs: "Por renovar", sanctions: "Sin sanciones" },
    { name: "TecnoAvionics", specialty: "Avionica y calibracion", score: 90, docs: "Vigente", sanctions: "Sin sanciones" },
    { name: "Rotor Service LATAM", specialty: "Componentes dinamicos", score: 72, docs: "Incompleto", sanctions: "Revision requerida" },
  ],
  aircraft: [
    { tail: "PNP-501", model: "Bell 412 EP", readiness: 82, need: "Kit de sellos hidraulicos", eta: "7 dias" },
    { tail: "PNP-512", model: "MI-171Sh", readiness: 64, need: "Overhaul motor TV3-117", eta: "Proceso CP-001" },
    { tail: "PNP-320", model: "Cessna 208B", readiness: 91, need: "Baterias aeronauticas", eta: "10 dias" },
    { tail: "PNP-607", model: "EC145", readiness: 76, need: "Inspeccion 600 horas", eta: "15 dias" },
  ],
  alerts: [
    { level: "Alto", title: "Riesgo de desabastecimiento", detail: "El stock de componentes criticos para Bell 412 cubre 18 dias de operacion.", owner: "Abastecimiento" },
    { level: "Alto", title: "Plazo contractual sensible", detail: "CON-052-2024 vence sin conformidad registrada por el area usuaria.", owner: "Logistica" },
    { level: "Medio", title: "Proveedor con documentos por renovar", detail: "HeliParts Peru requiere actualizar carta de distribuidor autorizado.", owner: "Contrataciones" },
    { level: "Medio", title: "Expediente observado", detail: "REQ-2025-019 necesita sustento tecnico de compatibilidad aeronautica.", owner: "Mantenimiento" },
  ],
  timeline: [
    { date: "Hoy 10:24", title: "Expediente CP-001 actualizado", text: "Se agrego matriz de riesgos y cronograma de absolucion de consultas." },
    { date: "Ayer 16:40", title: "Nueva alerta de stock", text: "SIGECA detecto consumo acelerado en repuestos de tren de aterrizaje." },
    { date: "21 feb 09:15", title: "Conformidad pendiente", text: "El contrato CON-052-2024 espera validacion del area tecnica." },
  ],
};

const app = document.querySelector("#app");
const pageName = document.querySelector("#pageName");
const toast = document.querySelector("#toast");
const sidebar = document.querySelector("#sidebar");
const footerSync = document.querySelector("#footerSync");

let state = {
  currentView: "inicio",
  query: "",
  status: "Todos",
  liveContracts: null,
  contractSync: {
    status: "idle",
    message: "Pendiente de sincronizar mediante el backend local conectado a OECE/SEACE.",
    lastSync: null,
    sourceUrl: SEACE_SOURCE.datasetUrl,
    attempts: [],
  },
};

function statusClass(value) {
  const text = value.toLowerCase();
  if (text.includes("alto") || text.includes("observado") || text.includes("critica") || text.includes("incompleto")) return "bad";
  if (text.includes("medio") || text.includes("renovar") || text.includes("evaluacion") || text.includes("conformidad")) return "warn";
  if (text.includes("bajo") || text.includes("aprobado") || text.includes("vigente") || text.includes("ejecucion")) return "ok";
  return "info";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function metric(label, value, hint) {
  return `<article class="metric-card"><span>${label}</span><b class="metric-value">${value}</b><small>${hint}</small></article>`;
}

function header(title, lead, stats, actions = true) {
  return `
    <section class="module-header">
      <div>
        <p class="eyebrow">Sistema inteligente de gestion</p>
        <h1>${title}</h1>
        <p class="lead">${lead}</p>
        ${actions ? `<div class="header-actions"><button class="btn primary" data-action="generate">Generar reporte</button><button class="btn" data-action="sync">Sincronizar datos</button></div>` : ""}
      </div>
      <div class="header-stat-grid">
        ${stats.map((item) => `<div class="header-stat"><b>${item.value}</b><span>${item.label}</span></div>`).join("")}
      </div>
    </section>
  `;
}

function table(columns, rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>${columns.map((column) => `<th>${column}</th>`).join("")}<th>Acciones</th></tr></thead>
        <tbody>${rows.join("")}</tbody>
      </table>
    </div>
  `;
}

function toolbar(placeholder, statuses = []) {
  return `
    <div class="toolbar">
      <input class="search" id="searchBox" type="search" placeholder="${placeholder}" value="${state.query}">
      <div class="filters">
        <select class="select" id="statusFilter">
          <option>Todos</option>
          ${statuses.map((status) => `<option ${state.status === status ? "selected" : ""}>${status}</option>`).join("")}
        </select>
        <button class="btn" data-action="new">Nuevo registro</button>
      </div>
    </div>
  `;
}

function matchesQuery(values) {
  const query = state.query.trim().toLowerCase();
  if (!query) return true;
  return values.join(" ").toLowerCase().includes(query);
}

function matchesStatus(value) {
  return state.status === "Todos" || value === state.status;
}

function moduleTile(title, body, items, target) {
  return `
    <article class="module-tile" data-view="${target}">
      <div>
        <span class="module-kicker">${title}</span>
        <p>${body}</p>
      </div>
      <div class="module-list">${items.map((item) => `<span>${item}</span>`).join("")}</div>
    </article>
  `;
}

function renderHome() {
  app.innerHTML = `
    ${header("Estructura SIGECA DIRAVPOL", "Mapa operativo para ordenar la planificacion contractual, los requerimientos, el flujo de gestion, la analitica, los proveedores y el monitoreo de integridad.", [
      { value: "18", label: "requerimientos activos" },
      { value: contractCount(), label: "contratos SEACE" },
      { value: "5", label: "modulos funcionales" },
      { value: "4", label: "alertas de riesgo" },
    ])}
    <section class="module-map">
      ${moduleTile("Planificacion y programacion contractual", "Convierte necesidades logisticas en expedientes trazables y priorizados.", ["Requerimientos", "PAC", "Sustento tecnico"], "requerimientos")}
      ${moduleTile("Gestion de talentos", "Organiza capacidades internas y soporte externo para ejecutar las contrataciones.", ["Contrataciones", "Cursos", "Capacitaciones", "Proveedores"], "proveedores")}
      ${moduleTile("Flujo de tramite de gestion", "Sigue cada expediente desde etapa preparatoria hasta contrato y conformidad.", ["Procesos", "Contratos", "Hitos"], "procesos")}
      ${moduleTile("Analitica e indicadores", "Cruza disponibilidad de aeronaves, proveedores, montos y tiempos de atencion.", ["Aeronaves", "Proveedores", "Indicadores"], "aeronaves")}
      ${moduleTile("Integridad anticorrupcion", "Monitoreo digital para alertas, riesgos y auditorias periodicas.", ["Monitoreo digital", "Alertas y riesgos", "Auditorias periodicas"], "alertas")}
    </section>
    <section class="metric-grid">
      ${metric("Procesos en curso", "11", "3 con hitos en los proximos 7 dias")}
      ${metric("Contratos SEACE", contractCount(), contractHint())}
      ${metric("Proveedores habilitados", "37", "6 con documentacion por renovar")}
      ${metric("Aeronaves monitoreadas", "12", "9 disponibles para operaciones")}
    </section>
    <section class="content-grid">
      <div class="panel">
        <h2>Procesos prioritarios</h2>
        <div class="record-grid">
          ${data.processes.map((process) => `
            <article class="record-card">
              <span class="tag">${process.id}</span>
              <h3>${process.title}</h3>
              <p>${process.method} · ${process.stage}</p>
              <div class="progress"><span style="width:${process.progress}%"></span></div>
              <div class="record-meta"><span class="status ${statusClass(process.risk)}">Riesgo ${process.risk}</span><span class="tag">${process.progress}%</span></div>
            </article>
          `).join("")}
        </div>
      </div>
      <aside>
        <div class="panel">
          <h2>Alertas activas</h2>
          <div class="risk-list">
            ${data.alerts.slice(0, 4).map((alert) => riskItem(alert)).join("")}
          </div>
        </div>
        <div class="panel">
          <h2>Actividad reciente</h2>
          <div class="timeline">
            ${data.timeline.map((event) => `<article class="timeline-item"><time>${event.date}</time><h3>${event.title}</h3><p>${event.text}</p></article>`).join("")}
          </div>
        </div>
      </aside>
    </section>
  `;
}

function contractCount() {
  return getContracts().length;
}

function contractHint() {
  if (state.liveContracts) return `${state.contractSync.lastSync} · fuente OECE/SEACE`;
  return "Use Sincronizar SEACE para traer contratos reales";
}

function getContracts() {
  return state.liveContracts || data.contracts;
}

function renderSyncAttempts() {
  if (!state.contractSync.attempts?.length) return "";
  return `
    <div class="attempt-list">
      ${state.contractSync.attempts.map((attempt) => `
        <span class="${attempt.ok ? "ok" : "bad"}">
          ${attempt.source}: ${attempt.ok ? `${attempt.count} registros` : attempt.error}
        </span>
      `).join("")}
    </div>
  `;
}

async function syncContractsFromSeace() {
  state.contractSync = {
    ...state.contractSync,
    status: "loading",
    message: "Consultando contratos del último año mediante el backend local...",
  };
  render();

  try {
    const response = await fetch(`${API_BASE}/api/contracts`, { cache: "no-store" });
    const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch {
      throw new Error("El servidor local no devolvio JSON valido. Abre la app con `npm start` o verifica que el backend este activo en el puerto 4173");
    }
    if (!response.ok || !result.ok) {
      throw Object.assign(new Error(result.message || `HTTP ${response.status}`), { result });
    }
    const contracts = result.contracts.slice(0, 60);
    state.liveContracts = contracts.length ? contracts : null;
    state.contractSync = {
      status: "ok",
      message: contracts.length
        ? `Sincronizado con ${contracts.length} contrato(s) DIRAVPOL del último año desde ${result.source}.`
        : `${result.message || "No se encontraron coincidencias oficiales para DIRAVPOL."} Se muestran registros de respaldo local.`,
      lastSync: result.lastSync,
      sourceUrl: result.sourceUrl,
      attempts: result.attempts || [],
    };
  } catch (error) {
    state.liveContracts = null;
    const message = error instanceof TypeError
      ? "No se pudo conectar al backend local. Ejecuta `npm start` y abre http://127.0.0.1:4173"
      : error.message;
    state.contractSync = {
      status: "error",
      message: `No se pudo sincronizar desde el backend local: ${message}. Se mantiene respaldo local y enlace a la fuente oficial.`,
      lastSync: null,
      sourceUrl: error.result?.sourceUrl || SEACE_SOURCE.datasetUrl,
      attempts: error.result?.attempts || [],
    };
  }

  render();
}

function renderRequirements() {
  const statuses = ["Borrador", "En evaluacion", "Aprobado", "Observado"];
  const rows = data.requirements
    .filter((item) => matchesQuery([item.id, item.item, item.unit, item.priority]) && matchesStatus(item.status))
    .map((item) => `
      <tr>
        <td><b>${item.id}</b><br><span class="tag">${item.priority}</span></td>
        <td>${item.item}</td>
        <td>${item.unit}</td>
        <td>${item.amount}</td>
        <td><span class="status ${statusClass(item.status)}">${item.status}</span></td>
        <td>${item.due}</td>
        <td class="actions"><button class="mini" data-action="open" data-requirement-id="${item.id}">Abrir</button><button class="mini" data-action="approve">Validar</button></td>
      </tr>
    `);

  app.innerHTML = `
    ${header("Requerimientos", "Registro y priorizacion de necesidades logisticas con sustento tecnico, monto estimado, unidad usuaria y estado de validacion.", [
      { value: data.requirements.length, label: "expedientes" },
      { value: "2", label: "alta prioridad" },
      { value: "1", label: "observado" },
      { value: "5 dias", label: "plazo promedio" },
    ], false)}
    <section class="panel">${toolbar("Buscar por codigo, bien, servicio o unidad...", statuses)}${table(["Codigo", "Objeto", "Unidad", "Monto", "Estado", "Vence"], rows)}</section>
  `;
}

function renderRequirementDetail(requirementId) {
  const requirement = data.requirements.find((item) => item.id === requirementId);
  if (!requirement) {
    state.selectedRequirementId = null;
    renderRequirements();
    showToast("No se encontro el requerimiento solicitado.");
    return;
  }

  const priorityClass = requirement.priority === "Critica" ? "bad" : requirement.priority === "Alta" ? "warn" : "ok";
  const reportNumber = requirement.id.replace(/^REQ-\d{4}-/, "");
  app.innerHTML = `
    <section class="requirement-toolbar">
      <button class="btn" data-action="back-requirements">← Volver a requerimientos</button>
      <div><span class="document-state"><i></i> Documento de trabajo · Datos ficticios</span><button class="btn primary" data-action="print-requirement">Imprimir / Guardar PDF</button></div>
    </section>
    <article class="requirement-sheet">
      <header class="document-header">
        <div class="document-brand"><img class="document-crest" src="assets/DIVMAAER.jpg" alt="Escudo de la División de Mantenimiento Aeropolicial" /><div><b>POLICÍA NACIONAL DEL PERÚ</b><span>DIRECCIÓN DE AVIACIÓN POLICIAL</span><span>DIVISIÓN DE MANTENIMIENTO AÉREO · ${requirement.section}</span></div></div>
      </header>
      <div class="report-title"><h1>INFORME N.° ${reportNumber}-2025-COMOPPOL-DIRAVPOL/DIVMAAER-CONTROL DE CALIDAD</h1><div class="report-reference"><span>REQUERIMIENTO ${requirement.id}</span><span class="status ${statusClass(requirement.status)}">${requirement.status}</span></div></div>
      <div class="report-subject"><b>ASUNTO:</b><p>${requirement.subject}</p></div>
      <section class="report-section"><h2>I. ANTECEDENTES</h2><p>${requirement.background}</p></section>
      <section class="report-section"><h2>1. OBJETIVO</h2><p>${requirement.objective}</p></section>
      <section class="report-section"><h2>2. FINALIDAD</h2><p>${requirement.purpose}</p></section>
      <section class="document-section"><h3>3. IDENTIFICACIÓN DEL REQUERIMIENTO</h3><div class="document-fields">
        <div><label>Código del requerimiento</label><b>${requirement.id}</b></div><div><label>Unidad usuaria</label><b>${requirement.unit}</b></div>
        <div><label>Área solicitante</label><b>${requirement.requester}</b></div><div><label>Responsable de seguimiento</label><b>${requirement.responsible}</b></div>
        <div><label>Aeronave relacionada</label><b>${requirement.aircraft}</b></div><div><label>Fecha de registro</label><b>${requirement.created}</b></div>
      </div></section>
      <section class="document-section"><h3>4. ESPECIFICACIONES TÉCNICAS</h3><ol class="spec-list">${requirement.specifications.map((item) => `<li>${item}</li>`).join("")}</ol></section>
      <section class="document-section"><h3>5. ESTIMACIÓN Y PROGRAMACIÓN</h3><div class="document-fields document-finance">
        <div><label>Monto estimado</label><b class="document-amount">${requirement.amount}</b></div><div><label>Fuente de financiamiento</label><b>${requirement.funding}</b></div>
        <div><label>Tipo de contratación previsto</label><b>${requirement.process}</b></div><div><label>Prioridad / fecha requerida</label><b><span class="status ${priorityClass}">${requirement.priority}</span> &nbsp; ${requirement.due}</b></div>
      </div></section>
      <section class="document-trace"><div><b>TRAZABILIDAD SIGECA</b><span>Registro de trabajo para demostración. No constituye autorización ni certificación presupuestal.</span></div><div class="trace-code"><span>EXPEDIENTE</span><b>${requirement.id}</b></div></section>
      <footer class="document-footer"><span>DIRAVPOL PNP · Unidad Ejecutora N.º 18</span><span>Documento demostrativo generado por SIGECA</span><span>${requirement.created}</span></footer>
    </article>
  `;
}

function renderProcesses() {
  const rows = data.processes
    .filter((item) => matchesQuery([item.id, item.title, item.method, item.stage]) && matchesStatus(item.risk))
    .map((item) => `
      <tr>
        <td><b>${item.id}</b></td>
        <td>${item.title}</td>
        <td>${item.method}</td>
        <td>${item.stage}<div class="progress"><span style="width:${item.progress}%"></span></div></td>
        <td><span class="status ${statusClass(item.risk)}">${item.risk}</span></td>
        <td class="actions"><button class="mini" data-action="open">Ver</button><button class="mini" data-action="timeline">Hitos</button></td>
      </tr>
    `);

  app.innerHTML = `
    ${header("Procesos de seleccion", "Seguimiento del ciclo de contratacion, desde actuaciones preparatorias hasta buena pro, con control de plazos y riesgos.", [
      { value: data.processes.length, label: "procesos activos" },
      { value: "1", label: "riesgo alto" },
      { value: "62%", label: "avance promedio" },
      { value: "3", label: "hitos proximos" },
    ], false)}
    <section class="panel">${toolbar("Buscar proceso, objeto o etapa...", ["Bajo", "Medio", "Alto"])}${table(["Proceso", "Objeto", "Metodo", "Etapa", "Riesgo"], rows)}</section>
  `;
}

function renderContracts() {
  const contracts = getContracts();
  const totalAmount = state.liveContracts ? "SEACE" : "S/ 2.8M";
  const rows = contracts
    .filter((item) => matchesQuery([item.id, item.supplier, item.object, item.status]) && matchesStatus(item.status))
    .map((item) => `
      <tr>
        <td>${contracts.indexOf(item) + 1}</td>
        <td><b>POLICIA NACIONAL DEL PERU<br>- DIRECCION DE AVIACION</b></td>
        <td>${item.end}</td>
        <td><b>${item.id}</b></td>
        <td>Servicio</td>
        <td>${item.object}</td>
        <td>---</td>
        <td>${item.value}</td>
        <td>3</td>
        <td class="actions"><button class="mini" data-action="open">Ver</button><button class="mini" data-action="conformity">Ficha</button></td>
      </tr>
    `);

  const fallbackRows = [
    {
      id: "CP SER-SM-8-2026-DIRAVPOL-1",
      date: "24/09/2026 15:50",
      object: "CONTRATACION DEL SERVICIO DE MANTENIMIENTO DE COMPONENTES PARA LA FLOTA DE HELICOPTEROS EC-145",
      value: "---",
    },
    {
      id: "CP SER-SM-7-2026-DIRAVPOL-1",
      date: "05/08/2026 17:39",
      object: "SERVICIO DE MANTENIMIENTO DE COMPONENTES Y APROVISIONAMIENTO DE PARTES PARA LA FLOTA DE HELICOPTEROS EC-145",
      value: "---",
    },
    {
      id: "CP SER-SM-6-2026-DIRAVPOL-1",
      date: "03/08/2026 18:10",
      object: "CONTRATACION DEL SERVICIO DE DECAPADO, TRATAMIENTO ANTICORROSIVO Y PINTADO GENERAL DE AERONAVES",
      value: "---",
    },
  ].map((item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td><b>POLICIA NACIONAL DEL PERU<br>- DIRECCION DE AVIACION</b></td>
        <td>${item.date}</td>
        <td><b>${item.id}</b></td>
        <td>Servicio</td>
        <td>${item.object}</td>
        <td>---</td>
        <td>${item.value}</td>
        <td>3</td>
        <td class="actions"><button class="mini" data-action="open">Ver</button><button class="mini" data-action="conformity">Ficha</button></td>
      </tr>
    `);

  app.innerHTML = `
    ${header("Contratos SEACE del ultimo año", "Control de ejecucion contractual DIRAVPOL sincronizable con el dataset oficial de contratos de las entidades publicado por OECE/SEACE.", [
      { value: contracts.length, label: state.liveContracts ? "contratos reales" : "registros respaldo" },
      { value: state.liveContracts ? "OECE" : "Local", label: "fuente activa" },
      { value: totalAmount, label: "monto comprometido" },
      { value: "365 dias", label: "ventana consultada" },
    ], false)}
    <section class="seace-shell">
      <div class="seace-tabs">
        <button>Anuncio de Contratacion Futura</button>
        <button class="active">Buscador de Procedimientos de Seleccion</button>
        <button>Buscador de Expresiones de Interes</button>
        <button>Buscador Publico de Ordenes de Compra y Ordenes de Servicio</button>
      </div>
      <div class="seace-form">
        <div class="seace-grid">
          <label><span>Nombre o Sigla de Entidad</span><input value="POLICIA NACIONAL DEL PERU - DIRECCION DE AVIACION" readonly></label>
          <label><span>Tipo de Seleccion</span><select><option>[Seleccione]</option></select></label>
          <label><span>Objeto de Contratacion</span><select><option>[Seleccione]</option><option>Bien</option><option>Servicio</option><option>Obra</option></select></label>
          <label><span>Nro. Seleccion</span><input value="" readonly></label>
          <label><span>Descripcion del Objeto</span><input value="" readonly></label>
          <label><span>Año de la Convocatoria *</span><select><option>2026</option></select></label>
          <label><span>Version SEACE</span><select><option>Seace 3</option></select></label>
          <label><span>Codigo SNIP</span><input value="" readonly></label>
          <label><span>Codigo Unico de Inversion</span><input value="" readonly></label>
        </div>
        <div class="seace-actions">
          <button class="btn" data-action="new">+ Busqueda Avanzada</button>
          <div>
            <button class="btn primary" data-action="seace-sync">${state.contractSync.status === "loading" ? "Buscando..." : "Buscar"}</button>
            <button class="btn" data-action="sync-clear">Limpiar</button>
          </div>
          <button class="btn" data-action="export">Exportar a Excel</button>
        </div>
      </div>
      <div class="sync-banner ${state.contractSync.status}">
        <div>
          <span class="module-kicker">Fuente oficial</span>
          <p>${state.contractSync.message}</p>
          ${renderSyncAttempts()}
          <div class="source-links">
            <a href="${state.contractSync.sourceUrl}" target="_blank" rel="noreferrer">Abrir fuente consultada</a>
            <a href="${SEACE_SOURCE.ocdsUrl}" target="_blank" rel="noreferrer">API OCDS OECE</a>
          </div>
        </div>
      </div>
      <div class="seace-result-title">Codigos SNIP</div>
      <div class="table-wrap seace-table">
        <table>
          <thead>
            <tr>
              <th>N.</th>
              <th>Nombre o Sigla de la Entidad</th>
              <th>Fecha y Hora de Publicacion</th>
              <th>Nomenclatura</th>
              <th>Objeto de Contratacion</th>
              <th>Descripcion de Objeto</th>
              <th>Codigo SNIP</th>
              <th>VR / VE / Cuantia</th>
              <th>Version SEACE</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>${state.liveContracts ? rows : fallbackRows}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderSuppliers() {
  const rows = data.suppliers
    .filter((item) => matchesQuery([item.name, item.specialty, item.docs, item.sanctions]) && matchesStatus(item.docs))
    .map((item) => `
      <tr>
        <td><b>${item.name}</b></td>
        <td>${item.specialty}</td>
        <td>${item.score}/100<div class="progress"><span style="width:${item.score}%"></span></div></td>
        <td><span class="status ${statusClass(item.docs)}">${item.docs}</span></td>
        <td>${item.sanctions}</td>
        <td class="actions"><button class="mini" data-action="open">Ficha</button><button class="mini" data-action="verify">Verificar</button></td>
      </tr>
    `);

  app.innerHTML = `
    ${header("Proveedores", "Padron de proveedores tecnicos con especialidad aeronautica, vigencia documental, desempeno y alertas de habilitacion.", [
      { value: data.suppliers.length, label: "registrados" },
      { value: "3", label: "habilitados" },
      { value: "86", label: "puntaje medio" },
      { value: "1", label: "revision requerida" },
    ], false)}
    <section class="panel">${toolbar("Buscar proveedor o especialidad...", ["Vigente", "Por renovar", "Incompleto"])}${table(["Proveedor", "Especialidad", "Score", "Documentos", "Observacion"], rows)}</section>
  `;
}

function renderAircraft() {
  app.innerHTML = `
    ${header("Aeronaves", "Vista de disponibilidad logistica por matricula, necesidad asociada y dependencia con requerimientos o procesos de contratacion.", [
      { value: data.aircraft.length, label: "monitoreadas" },
      { value: "78%", label: "disponibilidad media" },
      { value: "2", label: "necesidades criticas" },
      { value: "7 dias", label: "menor ETA" },
    ], false)}
    <section class="panel">
      <div class="aircraft-grid">
        ${data.aircraft.map((aircraft) => `
          <article class="aircraft-card">
            <div class="aircraft-head"><div><span class="tag">${aircraft.tail}</span><h3>${aircraft.model}</h3></div><span class="status ${aircraft.readiness > 85 ? "ok" : aircraft.readiness > 70 ? "warn" : "bad"}">${aircraft.readiness}%</span></div>
            <div class="progress"><span style="width:${aircraft.readiness}%"></span></div>
            <p><b>Necesidad:</b> ${aircraft.need}</p>
            <p><b>Atencion estimada:</b> ${aircraft.eta}</p>
            <div class="actions"><button class="mini" data-action="open">Historial</button><button class="mini" data-action="link">Vincular proceso</button></div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function riskItem(alert) {
  return `
    <article class="risk-item">
      <div class="risk-top"><h3>${alert.title}</h3><span class="status ${statusClass(alert.level)}">${alert.level}</span></div>
      <p>${alert.detail}</p>
      <span class="tag">${alert.owner}</span>
    </article>
  `;
}

function renderAlerts() {
  app.innerHTML = `
    ${header("Alertas y riesgos", "Priorizacion de advertencias generadas por reglas de negocio: plazos, stock, documentacion, disponibilidad y trazabilidad contractual.", [
      { value: data.alerts.length, label: "alertas abiertas" },
      { value: "2", label: "riesgo alto" },
      { value: "4", label: "areas involucradas" },
      { value: "24 h", label: "tiempo objetivo" },
    ], false)}
    <section class="content-grid">
      <div class="panel">
        <h2>Bandeja de alertas</h2>
        <div class="risk-list">${data.alerts.map((alert) => riskItem(alert)).join("")}</div>
      </div>
      <aside class="panel">
        <h2>Respuesta sugerida</h2>
        <div class="timeline">
          <article class="timeline-item"><time>Paso 1</time><h3>Validar fuente</h3><p>Contrastar alerta con expediente, contrato o kardex logistico asociado.</p></article>
          <article class="timeline-item"><time>Paso 2</time><h3>Asignar responsable</h3><p>Registrar area duena, plazo de respuesta y evidencia requerida.</p></article>
          <article class="timeline-item"><time>Paso 3</time><h3>Cerrar con sustento</h3><p>Adjuntar informe, conformidad o actualizacion documental antes de cerrar.</p></article>
        </div>
      </aside>
    </section>
  `;
}

function render() {
  pageName.textContent = views[state.currentView];
  if (footerSync) {
    footerSync.textContent = state.liveContracts
      ? `Contratos: sincronizado ${state.contractSync.lastSync}`
      : "Contratos: pendiente de sincronización SEACE";
  }
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.view === state.currentView);
  });

  if (state.currentView === "inicio") renderHome();
  if (state.currentView === "requerimientos") {
    if (state.selectedRequirementId) renderRequirementDetail(state.selectedRequirementId);
    else renderRequirements();
  }
  if (state.currentView === "procesos") renderProcesses();
  if (state.currentView === "contratos") renderContracts();
  if (state.currentView === "proveedores") renderSuppliers();
  if (state.currentView === "aeronaves") renderAircraft();
  if (state.currentView === "alertas") renderAlerts();
}

document.addEventListener("click", async (event) => {
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) {
    state.currentView = viewButton.dataset.view;
    state.selectedRequirementId = null;
    state.query = "";
    state.status = "Todos";
    sidebar.classList.remove("open");
    render();
    return;
  }

  const action = event.target.closest("[data-action]");
  if (action) {
    if (action.dataset.action === "open" && state.currentView === "requerimientos") {
      state.selectedRequirementId = action.dataset.requirementId;
      render();
      return;
    }

    if (action.dataset.action === "back-requirements") {
      state.selectedRequirementId = null;
      render();
      return;
    }

    if (action.dataset.action === "print-requirement") {
      window.print();
      return;
    }

    if (action.dataset.action === "seace-sync" || (action.dataset.action === "sync" && state.currentView === "contratos")) {
      await syncContractsFromSeace();
      showToast(state.contractSync.status === "ok" ? "Consulta SEACE completada." : "No se pudo conectar con el backend local.");
      return;
    }

    const messages = {
      generate: "Reporte ejecutivo generado para revision.",
      sync: "Datos sincronizados con el tablero del prototipo.",
      new: "Formulario de nuevo registro preparado.",
      open: "Ficha abierta en modo consulta.",
      approve: "Requerimiento marcado para validacion tecnica.",
      timeline: "Linea de hitos actualizada.",
      conformity: "Solicitud de conformidad registrada.",
      verify: "Validacion documental simulada.",
      link: "Proceso vinculado a la aeronave.",
      "sync-clear": "Filtros de busqueda restablecidos.",
      export: "Exportacion preparada para Excel.",
    };
    showToast(messages[action.dataset.action] || "Accion registrada.");
  }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "searchBox") {
    state.query = event.target.value;
    render();
    const input = document.querySelector("#searchBox");
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }
});

document.addEventListener("change", (event) => {
  if (event.target.id === "statusFilter") {
    state.status = event.target.value;
    render();
  }
});

document.querySelector("#mobileMenu").addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

render();
