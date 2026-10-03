const { createApp } = Vue;

const views = {
  inicio: "Centro de control",
  requerimientos: "Planificacion contractual",
  procesos: "Flujo de tramite",
  contratos: "Contratos SEACE",
  proveedores: "Talentos y proveedores",
  aeronaves: "Analitica e indicadores",
  alertas: "Integridad anticorrupcion",
};

const SEACE_SOURCE = {
  datasetUrl: "https://www.datosabiertos.gob.pe/dataset/contratos-de-las-entidades-organismo-especializado-para-las-contrataciones-p%C3%BAblicas",
  ocdsUrl: "https://contratacionesabiertas.oece.gob.pe/api",
};

const API_BASE = window.location.port === "4173" ? "" : "http://127.0.0.1:4173";

const sourceData = {
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

const fallbackSeaceRows = [
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
];

const ModuleHeader = {
  props: {
    title: String,
    lead: String,
    stats: Array,
    actions: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["action"],
  template: `
    <section class="module-header">
      <div>
        <p class="eyebrow">Sistema inteligente de gestion</p>
        <h1>{{ title }}</h1>
        <p class="lead">{{ lead }}</p>
        <div v-if="actions" class="header-actions">
          <button class="btn primary" @click="$emit('action', 'generate')">Generar reporte</button>
          <button class="btn" @click="$emit('action', 'sync')">Sincronizar datos</button>
        </div>
      </div>
      <div class="header-stat-grid">
        <div v-for="item in stats" :key="item.label" class="header-stat">
          <b>{{ item.value }}</b>
          <span>{{ item.label }}</span>
        </div>
      </div>
    </section>
  `,
};

createApp({
  components: { ModuleHeader },
  data() {
    return {
      views,
      data: sourceData,
      SEACE_SOURCE,
      navItems: [
        { view: "inicio", icon: "⌂", label: "Inicio" },
        { view: "requerimientos", icon: "▤", label: "Requerimientos" },
        { view: "procesos", icon: "◈", label: "Procesos" },
        { view: "contratos", icon: "▣", label: "Contratos" },
        { view: "proveedores", icon: "◉", label: "Proveedores" },
        { view: "aeronaves", icon: "✈", label: "Aeronaves" },
        { view: "alertas", icon: "⚠", label: "Alertas y Riesgos", badge: 4 },
      ],
      currentView: "inicio",
      query: "",
      status: "Todos",
      selectedRequirementId: null,
      sidebarOpen: false,
      toastMessage: "",
      toastVisible: false,
      liveContracts: null,
      contractSync: {
        status: "idle",
        message: "Pendiente de sincronizar mediante el backend local conectado a OECE/SEACE.",
        lastSync: null,
        sourceUrl: SEACE_SOURCE.datasetUrl,
        attempts: [],
      },
    };
  },
  computed: {
    pageName() {
      return this.views[this.currentView];
    },
    contracts() {
      return this.liveContracts || this.data.contracts;
    },
    contractCount() {
      return this.contracts.length;
    },
    contractHint() {
      return this.liveContracts ? `${this.contractSync.lastSync} · fuente OECE/SEACE` : "Use Sincronizar SEACE para traer contratos reales";
    },
    selectedRequirement() {
      return this.data.requirements.find((item) => item.id === this.selectedRequirementId) || null;
    },
    selectedReportNumber() {
      return this.selectedRequirement?.id.replace(/^REQ-\d{4}-/, "") || "";
    },
    filteredRequirements() {
      return this.data.requirements.filter((item) => this.matchesQuery([item.id, item.item, item.unit, item.priority]) && this.matchesStatus(item.status));
    },
    filteredProcesses() {
      return this.data.processes.filter((item) => this.matchesQuery([item.id, item.title, item.method, item.stage]) && this.matchesStatus(item.risk));
    },
    filteredSuppliers() {
      return this.data.suppliers.filter((item) => this.matchesQuery([item.name, item.specialty, item.docs, item.sanctions]) && this.matchesStatus(item.docs));
    },
    filteredContracts() {
      return this.contracts.filter((item) => this.matchesQuery([item.id, item.supplier, item.object, item.status]) && this.matchesStatus(item.status));
    },
    seaceRows() {
      if (!this.liveContracts) return fallbackSeaceRows;
      return this.filteredContracts.map((item) => ({
        id: item.id,
        date: item.end,
        object: item.object,
        value: item.value,
      }));
    },
  },
  methods: {
    setView(view) {
      this.currentView = view;
      this.selectedRequirementId = null;
      this.query = "";
      this.status = "Todos";
      this.sidebarOpen = false;
    },
    statusClass(value) {
      const text = String(value).toLowerCase();
      if (text.includes("alto") || text.includes("observado") || text.includes("critica") || text.includes("incompleto")) return "bad";
      if (text.includes("medio") || text.includes("renovar") || text.includes("evaluacion") || text.includes("conformidad")) return "warn";
      if (text.includes("bajo") || text.includes("aprobado") || text.includes("vigente") || text.includes("ejecucion")) return "ok";
      return "info";
    },
    matchesQuery(values) {
      const text = this.query.trim().toLowerCase();
      if (!text) return true;
      return values.join(" ").toLowerCase().includes(text);
    },
    matchesStatus(value) {
      return this.status === "Todos" || value === this.status;
    },
    showToast(message) {
      this.toastMessage = message;
      this.toastVisible = true;
      window.clearTimeout(this.toastTimer);
      this.toastTimer = window.setTimeout(() => {
        this.toastVisible = false;
      }, 2600);
    },
    priorityClass(priority) {
      if (priority === "Critica") return "bad";
      if (priority === "Alta") return "warn";
      return "ok";
    },
    handleAction(action) {
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
      this.showToast(messages[action] || "Accion registrada.");
    },
    openRequirement(id) {
      this.selectedRequirementId = id;
    },
    backToRequirements() {
      this.selectedRequirementId = null;
    },
    printRequirement() {
      window.print();
    },
    clearSyncSearch() {
      this.query = "";
      this.status = "Todos";
      this.handleAction("sync-clear");
    },
    async syncContractsFromSeace() {
      this.contractSync = {
        ...this.contractSync,
        status: "loading",
        message: "Consultando contratos del último año mediante el backend local...",
      };

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
        this.liveContracts = contracts.length ? contracts : null;
        this.contractSync = {
          status: "ok",
          message: contracts.length
            ? `Sincronizado con ${contracts.length} contrato(s) DIRAVPOL del último año desde ${result.source}.`
            : `${result.message || "No se encontraron coincidencias oficiales para DIRAVPOL."} Se muestran registros de respaldo local.`,
          lastSync: result.lastSync,
          sourceUrl: result.sourceUrl,
          attempts: result.attempts || [],
        };
      } catch (error) {
        this.liveContracts = null;
        const message = error instanceof TypeError
          ? "No se pudo conectar al backend local. Ejecuta `npm start` y abre http://127.0.0.1:4173"
          : error.message;
        this.contractSync = {
          status: "error",
          message: `No se pudo sincronizar desde el backend local: ${message}. Se mantiene respaldo local y enlace a la fuente oficial.`,
          lastSync: null,
          sourceUrl: error.result?.sourceUrl || SEACE_SOURCE.datasetUrl,
          attempts: error.result?.attempts || [],
        };
      }

      this.showToast(this.contractSync.status === "ok" ? "Consulta SEACE completada." : "No se pudo conectar con el backend local.");
    },
  },
  template: `
    <div>
      <div class="app-shell">
        <aside class="sidebar" :class="{ open: sidebarOpen }">
          <div class="brand-block">
            <img class="crest" src="assets/DIVMAAER.jpg" alt="Escudo de la División de Mantenimiento Aeropolicial">
            <div>
              <strong>DIRAVPOL</strong>
              <span>UNIDAD EJECUTORA N.º 18</span>
            </div>
          </div>
          <div class="brand-title">
            <span class="brand-mark">✦</span>
            <div><b>SIGECA</b><small>Sistema Inteligente de Gestión<br>de Contrataciones Aeropoliciales</small></div>
          </div>
          <nav class="main-nav" aria-label="Navegación principal">
            <button
              v-for="item in navItems"
              :key="item.view"
              class="nav-item"
              :class="{ active: currentView === item.view }"
              @click="setView(item.view)"
            >
              <span>{{ item.icon }}</span>{{ item.label }}<em v-if="item.badge" class="nav-badge">{{ item.badge }}</em>
            </button>
          </nav>
          <div class="sidebar-footer"><span class="live-dot"></span> Prototipo académico<br><small>Datos ficticios · 2025</small></div>
        </aside>

        <main class="main-content">
          <header class="topbar">
            <button class="mobile-menu" aria-label="Abrir menú" @click="sidebarOpen = !sidebarOpen">☰</button>
            <div class="breadcrumb"><span>DIRAVPOL</span><b>/</b><strong>{{ pageName }}</strong></div>
            <div class="top-actions">
              <button class="icon-button" aria-label="Notificaciones" @click="setView('alertas')">♢<span class="notification-dot"></span></button>
              <div class="user-chip"><div class="avatar">CR</div><div><b>Cap. R. Castro</b><small>Jefe de Logística</small></div><span>⌄</span></div>
            </div>
          </header>

          <div class="page">
            <template v-if="currentView === 'inicio'">
              <module-header
                title="Estructura SIGECA DIRAVPOL"
                lead="Mapa operativo para ordenar la planificacion contractual, los requerimientos, el flujo de gestion, la analitica, los proveedores y el monitoreo de integridad."
                :actions="true"
                :stats="[
                  { value: '18', label: 'requerimientos activos' },
                  { value: contractCount, label: 'contratos SEACE' },
                  { value: '5', label: 'modulos funcionales' },
                  { value: '4', label: 'alertas de riesgo' },
                ]"
                @action="handleAction"
              />
              <section class="module-map">
                <article class="module-tile" @click="setView('requerimientos')">
                  <div><span class="module-kicker">Planificacion y programacion contractual</span><p>Convierte necesidades logisticas en expedientes trazables y priorizados.</p></div>
                  <div class="module-list"><span>Requerimientos</span><span>PAC</span><span>Sustento tecnico</span></div>
                </article>
                <article class="module-tile" @click="setView('proveedores')">
                  <div><span class="module-kicker">Gestion de talentos</span><p>Organiza capacidades internas y soporte externo para ejecutar las contrataciones.</p></div>
                  <div class="module-list"><span>Contrataciones</span><span>Cursos</span><span>Capacitaciones</span><span>Proveedores</span></div>
                </article>
                <article class="module-tile" @click="setView('procesos')">
                  <div><span class="module-kicker">Flujo de tramite de gestion</span><p>Sigue cada expediente desde etapa preparatoria hasta contrato y conformidad.</p></div>
                  <div class="module-list"><span>Procesos</span><span>Contratos</span><span>Hitos</span></div>
                </article>
                <article class="module-tile" @click="setView('aeronaves')">
                  <div><span class="module-kicker">Analitica e indicadores</span><p>Cruza disponibilidad de aeronaves, proveedores, montos y tiempos de atencion.</p></div>
                  <div class="module-list"><span>Aeronaves</span><span>Proveedores</span><span>Indicadores</span></div>
                </article>
                <article class="module-tile" @click="setView('alertas')">
                  <div><span class="module-kicker">Integridad anticorrupcion</span><p>Monitoreo digital para alertas, riesgos y auditorias periodicas.</p></div>
                  <div class="module-list"><span>Monitoreo digital</span><span>Alertas y riesgos</span><span>Auditorias periodicas</span></div>
                </article>
              </section>
              <section class="metric-grid">
                <article class="metric-card"><span>Procesos en curso</span><b class="metric-value">11</b><small>3 con hitos en los proximos 7 dias</small></article>
                <article class="metric-card"><span>Contratos SEACE</span><b class="metric-value">{{ contractCount }}</b><small>{{ contractHint }}</small></article>
                <article class="metric-card"><span>Proveedores habilitados</span><b class="metric-value">37</b><small>6 con documentacion por renovar</small></article>
                <article class="metric-card"><span>Aeronaves monitoreadas</span><b class="metric-value">12</b><small>9 disponibles para operaciones</small></article>
              </section>
              <section class="content-grid">
                <div class="panel">
                  <h2>Procesos prioritarios</h2>
                  <div class="record-grid">
                    <article v-for="process in data.processes" :key="process.id" class="record-card">
                      <span class="tag">{{ process.id }}</span>
                      <h3>{{ process.title }}</h3>
                      <p>{{ process.method }} · {{ process.stage }}</p>
                      <div class="progress"><span :style="{ width: process.progress + '%' }"></span></div>
                      <div class="record-meta"><span class="status" :class="statusClass(process.risk)">Riesgo {{ process.risk }}</span><span class="tag">{{ process.progress }}%</span></div>
                    </article>
                  </div>
                </div>
                <aside>
                  <div class="panel">
                    <h2>Alertas activas</h2>
                    <div class="risk-list">
                      <article v-for="alert in data.alerts" :key="alert.title" class="risk-item">
                        <div class="risk-top"><h3>{{ alert.title }}</h3><span class="status" :class="statusClass(alert.level)">{{ alert.level }}</span></div>
                        <p>{{ alert.detail }}</p>
                        <span class="tag">{{ alert.owner }}</span>
                      </article>
                    </div>
                  </div>
                  <div class="panel">
                    <h2>Actividad reciente</h2>
                    <div class="timeline">
                      <article v-for="event in data.timeline" :key="event.title" class="timeline-item"><time>{{ event.date }}</time><h3>{{ event.title }}</h3><p>{{ event.text }}</p></article>
                    </div>
                  </div>
                </aside>
              </section>
            </template>

            <template v-else-if="currentView === 'requerimientos'">
              <template v-if="selectedRequirement">
                <section class="requirement-toolbar">
                  <button class="btn" @click="backToRequirements">← Volver a requerimientos</button>
                  <div><span class="document-state"><i></i> Documento de trabajo · Datos ficticios</span><button class="btn primary" @click="printRequirement">Imprimir / Guardar PDF</button></div>
                </section>
                <article class="requirement-sheet">
                  <header class="document-header">
                    <div class="document-brand"><img class="document-crest" src="assets/DIVMAAER.jpg" alt="Escudo de la División de Mantenimiento Aeropolicial"><div><b>POLICÍA NACIONAL DEL PERÚ</b><span>DIRECCIÓN DE AVIACIÓN POLICIAL</span><span>DIVISIÓN DE MANTENIMIENTO AÉREO · {{ selectedRequirement.section }}</span></div></div>
                  </header>
                  <div class="report-title"><h1>INFORME N.° {{ selectedReportNumber }}-2025-COMOPPOL-DIRAVPOL/DIVMAAER-CONTROL DE CALIDAD</h1><div class="report-reference"><span>REQUERIMIENTO {{ selectedRequirement.id }}</span><span class="status" :class="statusClass(selectedRequirement.status)">{{ selectedRequirement.status }}</span></div></div>
                  <div class="report-subject"><b>ASUNTO:</b><p>{{ selectedRequirement.subject }}</p></div>
                  <section class="report-section"><h2>I. ANTECEDENTES</h2><p>{{ selectedRequirement.background }}</p></section>
                  <section class="report-section"><h2>1. OBJETIVO</h2><p>{{ selectedRequirement.objective }}</p></section>
                  <section class="report-section"><h2>2. FINALIDAD</h2><p>{{ selectedRequirement.purpose }}</p></section>
                  <section class="document-section"><h3>3. IDENTIFICACIÓN DEL REQUERIMIENTO</h3><div class="document-fields">
                    <div><label>Código del requerimiento</label><b>{{ selectedRequirement.id }}</b></div><div><label>Unidad usuaria</label><b>{{ selectedRequirement.unit }}</b></div>
                    <div><label>Área solicitante</label><b>{{ selectedRequirement.requester }}</b></div><div><label>Responsable de seguimiento</label><b>{{ selectedRequirement.responsible }}</b></div>
                    <div><label>Aeronave relacionada</label><b>{{ selectedRequirement.aircraft }}</b></div><div><label>Fecha de registro</label><b>{{ selectedRequirement.created }}</b></div>
                  </div></section>
                  <section class="document-section"><h3>4. ESPECIFICACIONES TÉCNICAS</h3><ol class="spec-list"><li v-for="item in selectedRequirement.specifications" :key="item">{{ item }}</li></ol></section>
                  <section class="document-section"><h3>5. ESTIMACIÓN Y PROGRAMACIÓN</h3><div class="document-fields document-finance">
                    <div><label>Monto estimado</label><b class="document-amount">{{ selectedRequirement.amount }}</b></div><div><label>Fuente de financiamiento</label><b>{{ selectedRequirement.funding }}</b></div>
                    <div><label>Tipo de contratación previsto</label><b>{{ selectedRequirement.process }}</b></div><div><label>Prioridad / fecha requerida</label><b><span class="status" :class="priorityClass(selectedRequirement.priority)">{{ selectedRequirement.priority }}</span> &nbsp; {{ selectedRequirement.due }}</b></div>
                  </div></section>
                  <section class="document-trace"><div><b>TRAZABILIDAD SIGECA</b><span>Registro de trabajo para demostración. No constituye autorización ni certificación presupuestal.</span></div><div class="trace-code"><span>EXPEDIENTE</span><b>{{ selectedRequirement.id }}</b></div></section>
                  <footer class="document-footer"><span>DIRAVPOL PNP · Unidad Ejecutora N.º 18</span><span>Documento demostrativo generado por SIGECA</span><span>{{ selectedRequirement.created }}</span></footer>
                </article>
              </template>
              <template v-else>
                <module-header
                  title="Requerimientos"
                  lead="Registro y priorizacion de necesidades logisticas con sustento tecnico, monto estimado, unidad usuaria y estado de validacion."
                  :stats="[
                    { value: data.requirements.length, label: 'expedientes' },
                    { value: '2', label: 'alta prioridad' },
                    { value: '1', label: 'observado' },
                    { value: '5 dias', label: 'plazo promedio' },
                  ]"
                />
                <section class="panel">
                  <div class="toolbar">
                    <input class="search" v-model="query" type="search" placeholder="Buscar por codigo, bien, servicio o unidad...">
                    <div class="filters"><select class="select" v-model="status"><option>Todos</option><option>Borrador</option><option>En evaluacion</option><option>Aprobado</option><option>Observado</option></select><button class="btn" @click="handleAction('new')">Nuevo registro</button></div>
                  </div>
                  <div class="table-wrap"><table><thead><tr><th>Codigo</th><th>Objeto</th><th>Unidad</th><th>Monto</th><th>Estado</th><th>Vence</th><th>Acciones</th></tr></thead><tbody>
                    <tr v-for="item in filteredRequirements" :key="item.id">
                      <td><b>{{ item.id }}</b><br><span class="tag">{{ item.priority }}</span></td><td>{{ item.item }}</td><td>{{ item.unit }}</td><td>{{ item.amount }}</td><td><span class="status" :class="statusClass(item.status)">{{ item.status }}</span></td><td>{{ item.due }}</td>
                      <td class="actions"><button class="mini" @click="openRequirement(item.id)">Abrir</button><button class="mini" @click="handleAction('approve')">Validar</button></td>
                    </tr>
                  </tbody></table></div>
                </section>
              </template>
            </template>

            <template v-else-if="currentView === 'procesos'">
              <module-header title="Procesos de seleccion" lead="Seguimiento del ciclo de contratacion, desde actuaciones preparatorias hasta buena pro, con control de plazos y riesgos." :stats="[{ value: data.processes.length, label: 'procesos activos' }, { value: '1', label: 'riesgo alto' }, { value: '62%', label: 'avance promedio' }, { value: '3', label: 'hitos proximos' }]" />
              <section class="panel">
                <div class="toolbar"><input class="search" v-model="query" type="search" placeholder="Buscar proceso, objeto o etapa..."><div class="filters"><select class="select" v-model="status"><option>Todos</option><option>Bajo</option><option>Medio</option><option>Alto</option></select><button class="btn" @click="handleAction('new')">Nuevo registro</button></div></div>
                <div class="table-wrap"><table><thead><tr><th>Proceso</th><th>Objeto</th><th>Metodo</th><th>Etapa</th><th>Riesgo</th><th>Acciones</th></tr></thead><tbody>
                  <tr v-for="item in filteredProcesses" :key="item.id"><td><b>{{ item.id }}</b></td><td>{{ item.title }}</td><td>{{ item.method }}</td><td>{{ item.stage }}<div class="progress"><span :style="{ width: item.progress + '%' }"></span></div></td><td><span class="status" :class="statusClass(item.risk)">{{ item.risk }}</span></td><td class="actions"><button class="mini" @click="handleAction('open')">Ver</button><button class="mini" @click="handleAction('timeline')">Hitos</button></td></tr>
                </tbody></table></div>
              </section>
            </template>

            <template v-else-if="currentView === 'contratos'">
              <section class="seace-embed">
                <iframe
                  title="SEACE 3.0 - Buscador Público"
                  src="https://prod1.seace.gob.pe/SeaceWeb-PRO/public/buscarProcedimientosSeleccion.iface?init=1"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </section>
            </template>

            <template v-else-if="currentView === 'proveedores'">
              <module-header title="Proveedores" lead="Padron de proveedores tecnicos con especialidad aeronautica, vigencia documental, desempeno y alertas de habilitacion." :stats="[{ value: data.suppliers.length, label: 'registrados' }, { value: '3', label: 'habilitados' }, { value: '86', label: 'puntaje medio' }, { value: '1', label: 'revision requerida' }]" />
              <section class="panel"><div class="toolbar"><input class="search" v-model="query" type="search" placeholder="Buscar proveedor o especialidad..."><div class="filters"><select class="select" v-model="status"><option>Todos</option><option>Vigente</option><option>Por renovar</option><option>Incompleto</option></select><button class="btn" @click="handleAction('new')">Nuevo registro</button></div></div>
                <div class="table-wrap"><table><thead><tr><th>Proveedor</th><th>Especialidad</th><th>Score</th><th>Documentos</th><th>Observacion</th><th>Acciones</th></tr></thead><tbody>
                  <tr v-for="item in filteredSuppliers" :key="item.name"><td><b>{{ item.name }}</b></td><td>{{ item.specialty }}</td><td>{{ item.score }}/100<div class="progress"><span :style="{ width: item.score + '%' }"></span></div></td><td><span class="status" :class="statusClass(item.docs)">{{ item.docs }}</span></td><td>{{ item.sanctions }}</td><td class="actions"><button class="mini" @click="handleAction('open')">Ficha</button><button class="mini" @click="handleAction('verify')">Verificar</button></td></tr>
                </tbody></table></div>
              </section>
            </template>

            <template v-else-if="currentView === 'aeronaves'">
              <module-header title="Aeronaves" lead="Vista de disponibilidad logistica por matricula, necesidad asociada y dependencia con requerimientos o procesos de contratacion." :stats="[{ value: data.aircraft.length, label: 'monitoreadas' }, { value: '78%', label: 'disponibilidad media' }, { value: '2', label: 'necesidades criticas' }, { value: '7 dias', label: 'menor ETA' }]" />
              <section class="panel"><div class="aircraft-grid">
                <article v-for="aircraft in data.aircraft" :key="aircraft.tail" class="aircraft-card">
                  <div class="aircraft-head"><div><span class="tag">{{ aircraft.tail }}</span><h3>{{ aircraft.model }}</h3></div><span class="status" :class="aircraft.readiness > 85 ? 'ok' : aircraft.readiness > 70 ? 'warn' : 'bad'">{{ aircraft.readiness }}%</span></div>
                  <div class="progress"><span :style="{ width: aircraft.readiness + '%' }"></span></div>
                  <p><b>Necesidad:</b> {{ aircraft.need }}</p><p><b>Atencion estimada:</b> {{ aircraft.eta }}</p>
                  <div class="actions"><button class="mini" @click="handleAction('open')">Historial</button><button class="mini" @click="handleAction('link')">Vincular proceso</button></div>
                </article>
              </div></section>
            </template>

            <template v-else-if="currentView === 'alertas'">
              <module-header title="Alertas y riesgos" lead="Priorizacion de advertencias generadas por reglas de negocio: plazos, stock, documentacion, disponibilidad y trazabilidad contractual." :stats="[{ value: data.alerts.length, label: 'alertas abiertas' }, { value: '2', label: 'riesgo alto' }, { value: '4', label: 'areas involucradas' }, { value: '24 h', label: 'tiempo objetivo' }]" />
              <section class="content-grid">
                <div class="panel"><h2>Bandeja de alertas</h2><div class="risk-list"><article v-for="alert in data.alerts" :key="alert.title" class="risk-item"><div class="risk-top"><h3>{{ alert.title }}</h3><span class="status" :class="statusClass(alert.level)">{{ alert.level }}</span></div><p>{{ alert.detail }}</p><span class="tag">{{ alert.owner }}</span></article></div></div>
                <aside class="panel"><h2>Respuesta sugerida</h2><div class="timeline"><article class="timeline-item"><time>Paso 1</time><h3>Validar fuente</h3><p>Contrastar alerta con expediente, contrato o kardex logistico asociado.</p></article><article class="timeline-item"><time>Paso 2</time><h3>Asignar responsable</h3><p>Registrar area duena, plazo de respuesta y evidencia requerida.</p></article><article class="timeline-item"><time>Paso 3</time><h3>Cerrar con sustento</h3><p>Adjuntar informe, conformidad o actualizacion documental antes de cerrar.</p></article></div></aside>
              </section>
            </template>
          </div>

          <footer class="page-footer"><span>SIGECA v1.0 · Prototipo de tesis</span><span>DIRAVPOL PNP · Unidad Ejecutora N.º 18</span><span>Última actualización: hoy, 10:24</span></footer>
        </main>
      </div>
      <div class="toast" :class="{ show: toastVisible }">{{ toastMessage }}</div>
    </div>
  `,
}).mount("#app");
