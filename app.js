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

const CONTRACTS_URL = window.location.port === "4173" ? "/api/contracts" : "contracts.json";

const sourceData = {
  requirements: [
    { id: "REQ-2026-001", contractId: "1004341", item: "Grasas y lubricantes para mantenimiento e inspeccion", unit: "Mantenimiento Aeronautico", priority: "Alta", amount: "S/ 199,046", status: "En evaluacion", due: "24 sep", aircraft: "Flota DIRAVPOL PNP", requester: "Cap. Luis Mendoza · Mantenimiento Aeronautico", section: "SECCIÓN DE MANTENIMIENTO PROGRAMADO", subject: "Sustento para la adquisicion de grasas y lubricantes para mantenimiento e inspeccion de las aeronaves DIRAVPOL PNP.", background: "La programacion de inspecciones de la flota DIRAVPOL requiere grasas y lubricantes de uso aeronautico compatibles con los manuales tecnicos aplicables. Este requerimiento toma como referencia el objeto SEACE 1004341 registrado en la pestaña Contratos.", objective: "Adquirir grasas y lubricantes certificados para asegurar la continuidad del mantenimiento preventivo y correctivo de las aeronaves DIRAVPOL.", purpose: "Mantener la disponibilidad operacional de la flota con insumos trazables, especificaciones tecnicas verificables y registro documental para auditoria.", specifications: ["Grasas y lubricantes de uso aeronautico", "Compatibilidad con manuales tecnicos de aeronaves DIRAVPOL", "Certificado de calidad y trazabilidad de lote", "Entrega documentada para almacen aeronautico"], funding: "Meta 004 · Mantenimiento de aeronaves", process: "Bienes · Procedimiento competitivo", created: "10 sep 2026", responsible: "My. Ana Salazar · Oficina de Logística" },
    { id: "REQ-2026-002", contractId: "2422008", item: "Neumaticos para avion Antonov AN-32B PNP-233", unit: "Abastecimiento Aeronautico", priority: "Critica", amount: "S/ 150,851", status: "Observado", due: "13 sep", aircraft: "Antonov AN-32B · PNP-233", requester: "Tte. Crnl. Jorge Rivas · Abastecimiento Aeronautico", section: "SECCIÓN DE COMPONENTES Y ESTRUCTURAS", subject: "Adquisicion de neumaticos para el avion Antonov, modelo AN-32B, matricula PNP-233.", background: "El avion Antonov AN-32B PNP-233 requiere neumaticos compatibles para sostener sus operaciones y cumplir condiciones de aeronavegabilidad. Este expediente se vincula con el objeto SEACE 2422008 listado en Contratos.", objective: "Adquirir neumaticos aeronauticos compatibles con el Antonov AN-32B, con documentacion de origen, garantia y trazabilidad.", purpose: "Permitir la operacion segura del PNP-233 y reducir riesgos de indisponibilidad por componentes de tren de aterrizaje.", specifications: ["Neumaticos compatibles con Antonov AN-32B", "Documentacion de procedencia y conformidad", "Fecha de fabricacion vigente", "Garantia y ficha tecnica del fabricante"], funding: "Meta 004 · Repuestos y componentes", process: "Bienes · Procedimiento competitivo", created: "08 sep 2026", responsible: "My. Ana Salazar · Oficina de Logística" },
    { id: "REQ-2026-003", contractId: "2419011", item: "Suministro de combustibles de aviacion", unit: "Operaciones Aereas", priority: "Alta", amount: "S/ 17,388,617", status: "Aprobado", due: "03 sep", aircraft: "Bases Lima, Iquitos, Cusco, Talara y El Milagro", requester: "Cmdte. Raul Castro · Operaciones Aereas", section: "SECCIÓN DE ABASTECIMIENTO DE COMBUSTIBLE", subject: "Contratacion del suministro de combustibles de aviacion en aeropuertos y plantas requeridas por DIRAVPOL.", background: "Las operaciones aeropoliciales requieren abastecimiento continuo de combustible de aviacion en Lima-Callao, Iquitos, Cusco y plantas estrategicas. El expediente referencia el objeto SEACE 2419011 de la pestaña Contratos.", objective: "Contratar el suministro de combustibles de aviacion para asegurar continuidad operativa en bases y destacamentos aereos.", purpose: "Garantizar disponibilidad de combustible certificado, control de consumos y soporte logistico a operaciones policiales.", specifications: ["Combustible de aviacion segun norma aplicable", "Atencion en aeropuertos y plantas indicadas", "Control documentario de despachos", "Trazabilidad de calidad y volumen entregado"], funding: "Meta 006 · Operaciones aeropoliciales", process: "Bienes · Concurso publico", created: "28 ago 2026", responsible: "My. Ana Salazar · Oficina de Logística" },
    { id: "REQ-2026-004", contractId: "2393047", item: "Inspeccion Check C del Antonov AN-32B PNP-233", unit: "Mantenimiento Aeronautico", priority: "Media", amount: "Por confirmar", status: "Borrador", due: "12 sep", aircraft: "Antonov AN-32B · PNP-233", requester: "Cap. Luis Mendoza · Mantenimiento Aeronautico", section: "SECCIÓN DE MANTENIMIENTO PROGRAMADO", subject: "Contratacion del servicio de inspeccion de 300 horas Check C e inspecciones especiales tecnicas para el Antonov AN-32B PNP-233.", background: "La continuidad de aeronavegabilidad del Antonov AN-32B PNP-233 exige inspeccion programada y trabajos tecnicos especializados. Este requerimiento toma como referencia el objeto SEACE 2393047 visible en Contratos.", objective: "Contratar la inspeccion Check C y las inspecciones especiales tecnicas requeridas para el Antonov AN-32B.", purpose: "Conservar la aeronavegabilidad del PNP-233 con registros tecnicos completos, pruebas y conformidad del area usuaria.", specifications: ["Inspeccion de 300 horas Check C", "Inspecciones especiales tecnicas", "Personal certificado para AN-32B", "Informe tecnico y liberacion documental"], funding: "Meta 004 · Mantenimiento de aeronaves", process: "Servicios · Procedimiento competitivo", created: "01 sep 2026", responsible: "My. Ana Salazar · Oficina de Logística" },
  ],
  processes: [
    {
      id: "AS-SM-1004341-2026",
      contractId: "1004341",
      title: "Grasas y lubricantes para aeronaves DIRAVPOL",
      method: "Adjudicacion simplificada",
      stage: "Consultas integradas",
      progress: 62,
      risk: "Medio",
      code: "CP-001-2025",
      object: "Mantenimiento programado de flota MI-171",
      requirementId: "REQ-2025-019",
      area: "Dirección de Aviación Policial - Área de Mantenimiento",
      contractType: "Servicio especializado",
      procedure: "Concurso público",
      amount: "S/ 2,420,000.00",
      responsible: "Oficina de Logística / Contrataciones",
      state: "Bases publicadas",
      riskNote: "El proceso se encuentra en etapa sensible de publicación de bases. SIGECA debe controlar plazos, documentos pendientes y modificaciones del expediente.",
      timeline: [
        { stage: "Requerimiento", status: "Completado", date: "12/08/2026" },
        { stage: "Indagación de mercado", status: "Completado", date: "25/08/2026" },
        { stage: "Expediente aprobado", status: "Completado", date: "05/09/2026" },
        { stage: "Convocatoria", status: "Completado", date: "15/09/2026" },
        { stage: "Bases publicadas", status: "EN CURSO", date: "02/10/2026" },
        { stage: "Consultas / observaciones", status: "Pendiente", date: "-" },
        { stage: "Bases integradas", status: "Pendiente", date: "-" },
        { stage: "Presentación de ofertas", status: "Pendiente", date: "-" },
        { stage: "Buena Pro", status: "Pendiente", date: "-" },
        { stage: "Contrato", status: "Pendiente", date: "-" },
      ],
      documents: [
        { name: "Requerimiento / TDR", status: "Registrado", reference: "REQ-2025-019" },
        { name: "Sustento técnico", status: "Registrado", reference: "Informe técnico" },
        { name: "Indagación de mercado", status: "Registrado", reference: "Cotizaciones / análisis" },
        { name: "Certificación presupuestal", status: "Registrado", reference: "Documento presupuestal" },
        { name: "Bases del procedimiento", status: "Publicado", reference: "Versión vigente" },
        { name: "Acta de consultas y observaciones", status: "Pendiente", reference: "-" },
      ],
      traceability: [
        { date: "02/10/2026 09:20", action: "Bases publicadas", responsible: "Oficina de Logística", detail: "Registro de publicación" },
        { date: "30/09/2026 15:42", action: "Expediente actualizado", responsible: "Contrataciones", detail: "Se incorporó matriz de riesgos" },
        { date: "15/09/2026 11:05", action: "Convocatoria registrada", responsible: "Contrataciones", detail: "Proceso continúa" },
      ],
    },
    {
      id: "AS-SM-2422008-2026",
      contractId: "2422008",
      title: "Neumaticos para Antonov AN-32B PNP-233",
      method: "Adjudicacion simplificada",
      stage: "Bases publicadas",
      progress: 44,
      risk: "Alto",
      code: "CP-002-2025",
      object: "Compra de neumáticos para tren de aterrizaje del AN-32B",
      requirementId: "REQ-2026-002",
      area: "Abastecimiento Aeronáutico - Sección de Componentes",
      contractType: "Bienes",
      procedure: "Adjudicación simplificada",
      amount: "S/ 150,851.00",
      responsible: "Oficina de Logística / Almacén Aeronáutico",
      state: "Bases publicadas",
      riskNote: "El proceso presenta posible retraso por revisión técnica y coordinación con la aerona." ,
      timeline: [
        { stage: "Requerimiento", status: "Completado", date: "08/09/2026" },
        { stage: "Indagación de mercado", status: "Completado", date: "12/09/2026" },
        { stage: "Expediente aprobado", status: "Completado", date: "18/09/2026" },
        { stage: "Bases publicadas", status: "EN CURSO", date: "25/09/2026" },
        { stage: "Consultas / observaciones", status: "Pendiente", date: "-" },
      ],
      documents: [
        { name: "Requerimiento / TDR", status: "Registrado", reference: "REQ-2026-002" },
        { name: "Especificaciones técnicas", status: "Registrado", reference: "Ficha técnica - AN-32B" },
        { name: "Cotizaciones", status: "Pendiente", reference: "-" },
        { name: "Bases del procedimiento", status: "Publicado", reference: "Versión vigente" },
      ],
      traceability: [
        { date: "25/09/2026 16:00", action: "Bases publicadas", responsible: "Abastecimiento", detail: "Se publicó convocatoria" },
        { date: "24/09/2026 12:07", action: "Expediente actualizado", responsible: "Contrataciones", detail: "Se incluyó ficha técnica" },
      ],
    },
    {
      id: "CP-2419011-2026",
      contractId: "2419011",
      title: "Suministro de combustibles de aviacion",
      method: "Concurso publico",
      stage: "Evaluacion de ofertas",
      progress: 78,
      risk: "Bajo",
      code: "CP-003-2025",
      object: "Abastecimiento estratégico de combustible de aviación para bases operativas",
      requirementId: "REQ-2026-003",
      area: "Operaciones Aéreas - Abastecimiento",
      contractType: "Bienes",
      procedure: "Concurso público",
      amount: "S/ 17,388,617.00",
      responsible: "Oficina de Logística / Operaciones",
      state: "Evaluación de ofertas",
      riskNote: "El proceso sigue dentro de cronograma y con evaluación técnica en curso.",
      timeline: [
        { stage: "Requerimiento", status: "Completado", date: "28/08/2026" },
        { stage: "Expediente aprobado", status: "Completado", date: "04/09/2026" },
        { stage: "Convocatoria", status: "Completado", date: "10/09/2026" },
        { stage: "Evaluación de ofertas", status: "EN CURSO", date: "15/09/2026" },
        { stage: "Buena Pro", status: "Pendiente", date: "-" },
      ],
      documents: [
        { name: "Requerimiento / TDR", status: "Registrado", reference: "REQ-2026-003" },
        { name: "Especificaciones técnicas", status: "Registrado", reference: "Bases de combustibles" },
        { name: "Ofertas", status: "Revisando", reference: "3 propuestas recibidas" },
        { name: "Certificación presupuestal", status: "Registrado", reference: "Documento presupuestal" },
      ],
      traceability: [
        { date: "15/09/2026 09:30", action: "Evaluación de ofertas", responsible: "Comité", detail: "Se recepcionaron ofertas" },
        { date: "12/09/2026 17:45", action: "Bases publicadas", responsible: "Contrataciones", detail: "Publicación registrada" },
      ],
    },
    {
      id: "AS-SM-2393047-2026",
      contractId: "2393047",
      title: "Inspeccion Check C Antonov AN-32B",
      method: "Adjudicacion simplificada",
      stage: "Informe tecnico",
      progress: 36,
      risk: "Medio",
      code: "CP-004-2025",
      object: "Servicio de inspección mayor Check C para aeronave AN-32B",
      requirementId: "REQ-2026-004",
      area: "Mantenimiento Aeronáutico - Sección de Programación",
      contractType: "Servicios",
      procedure: "Adjudicación simplificada",
      amount: "S/ 1,020,000.00",
      responsible: "Oficina de Logística / Mantenimiento",
      state: "Informe técnico",
      riskNote: "Se requiere revisión final del informe técnico para evitar demora en la ejecución del servicio.",
      timeline: [
        { stage: "Requerimiento", status: "Completado", date: "01/09/2026" },
        { stage: "Indagación de mercado", status: "Completado", date: "08/09/2026" },
        { stage: "Informe técnico", status: "EN CURSO", date: "12/09/2026" },
        { stage: "Adjudicación", status: "Pendiente", date: "-" },
      ],
      documents: [
        { name: "Requerimiento / TDR", status: "Registrado", reference: "REQ-2026-004" },
        { name: "Informe técnico", status: "En revisión", reference: "Checklist AN-32B" },
        { name: "Cotizaciones", status: "Registrado", reference: "2 propuestas" },
      ],
      traceability: [
        { date: "12/09/2026 08:10", action: "Informe técnico", responsible: "Mantenimiento", detail: "Se adjuntó revisión preliminar" },
        { date: "09/09/2026 13:25", action: "Cotizaciones", responsible: "Contrataciones", detail: "Se actualizaron precios" },
      ],
    },
  ],
  suppliers: [
    {
      name: "AeroAndes SAC",
      ruc: "20548796321",
      specialty: "Mantenimiento mayor",
      score: 94,
      docs: "Vigente",
      sanctions: "Sin sanciones",
      representative: "Ing. Marco Salvatierra",
      address: "Av. Elmer Faucett 3460, Callao",
      phone: "+51 1 614-2300",
      email: "contratos@aeroandes.pe",
      registry: "REG-PROV-2026-001",
      validity: "31/12/2026",
      experience: "12 anos en servicios de mantenimiento aeronautico mayor",
      category: "Servicios especializados",
      certifications: ["DGAC - Organizacion de mantenimiento autorizada", "ISO 9001:2015", "Personal tecnico habilitado"],
      documents: [
        { name: "RNP / OSCE", status: "Vigente", reference: "Constancia 2026" },
        { name: "Ficha RUC", status: "Vigente", reference: "SUNAT activo y habido" },
        { name: "Declaracion jurada anticorrupcion", status: "Registrado", reference: "DJ-2026-001" },
        { name: "Certificados tecnicos", status: "Vigente", reference: "DGAC / fabricante" },
      ],
      contracts: [
        { object: "Inspeccion programada de flota MI-171", amount: "S/ 2,420,000.00", year: "2025", result: "Conforme" },
        { object: "Soporte tecnico de mantenimiento mayor", amount: "S/ 890,000.00", year: "2024", result: "Conforme" },
      ],
      observations: "Proveedor con historial favorable y documentacion tecnica completa para servicios de mantenimiento mayor.",
    },
    {
      name: "HeliParts Peru",
      ruc: "20601478596",
      specialty: "Repuestos aeronauticos",
      score: 86,
      docs: "Por renovar",
      sanctions: "Sin sanciones",
      representative: "Lic. Paola Herrera",
      address: "Jr. Los Halcones 245, San Isidro, Lima",
      phone: "+51 1 441-9820",
      email: "licitaciones@heliparts.pe",
      registry: "REG-PROV-2026-002",
      validity: "15/10/2026",
      experience: "8 anos suministrando componentes y consumibles aeronauticos",
      category: "Bienes aeronauticos",
      certifications: ["Carta de distribuidor autorizado", "Trazabilidad de lote", "Garantia de fabricante"],
      documents: [
        { name: "RNP / OSCE", status: "Vigente", reference: "Constancia 2026" },
        { name: "Ficha RUC", status: "Vigente", reference: "SUNAT activo y habido" },
        { name: "Carta de distribuidor", status: "Por renovar", reference: "Vence en octubre" },
        { name: "Declaracion jurada anticorrupcion", status: "Registrado", reference: "DJ-2026-002" },
      ],
      contracts: [
        { object: "Suministro de filtros y sellos hidraulicos", amount: "S/ 410,000.00", year: "2025", result: "Conforme" },
        { object: "Repuestos para Bell 412", amount: "S/ 275,000.00", year: "2024", result: "Conforme" },
      ],
      observations: "Requiere actualizar carta de distribuidor autorizado antes de nuevas adjudicaciones sensibles.",
    },
    {
      name: "TecnoAvionics",
      ruc: "20596321478",
      specialty: "Avionica y calibracion",
      score: 90,
      docs: "Vigente",
      sanctions: "Sin sanciones",
      representative: "Ing. Valeria Nunez",
      address: "Av. Guardia Chalaca 1320, Callao",
      phone: "+51 1 465-7781",
      email: "comercial@tecnoavionics.pe",
      registry: "REG-PROV-2026-003",
      validity: "30/11/2026",
      experience: "10 anos en calibracion, avionica y bancos de prueba",
      category: "Servicios especializados",
      certifications: ["Laboratorio de calibracion acreditado", "ISO 9001:2015", "Trazabilidad metrologica"],
      documents: [
        { name: "RNP / OSCE", status: "Vigente", reference: "Constancia 2026" },
        { name: "Ficha RUC", status: "Vigente", reference: "SUNAT activo y habido" },
        { name: "Acreditacion de laboratorio", status: "Vigente", reference: "Certificado vigente" },
        { name: "Declaracion jurada anticorrupcion", status: "Registrado", reference: "DJ-2026-003" },
      ],
      contracts: [
        { object: "Calibracion de equipos de navegacion", amount: "S/ 198,000.00", year: "2025", result: "Conforme" },
        { object: "Mantenimiento de radios aeronauticas", amount: "S/ 156,000.00", year: "2024", result: "Conforme" },
      ],
      observations: "Proveedor habilitado para servicios de avionica, calibracion y soporte de equipos de comunicacion.",
    },
    {
      name: "Rotor Service LATAM",
      ruc: "20607845123",
      specialty: "Componentes dinamicos",
      score: 72,
      docs: "Incompleto",
      sanctions: "Revision requerida",
      representative: "Sr. Daniel Ferrer",
      address: "Calle Industria 884, Ate, Lima",
      phone: "+51 1 356-1140",
      email: "ventas@rotorservice.lat",
      registry: "REG-PROV-2026-004",
      validity: "Pendiente de regularizacion",
      experience: "6 anos en reparacion y cambio de componentes dinamicos",
      category: "Servicios y componentes",
      certifications: ["Procedimientos tecnicos del fabricante", "Personal certificado por especialidad"],
      documents: [
        { name: "RNP / OSCE", status: "Vigente", reference: "Constancia 2026" },
        { name: "Ficha RUC", status: "Vigente", reference: "SUNAT activo y habido" },
        { name: "Seguro de responsabilidad civil", status: "Pendiente", reference: "No adjuntado" },
        { name: "Declaracion jurada anticorrupcion", status: "Pendiente", reference: "No adjuntado" },
      ],
      contracts: [
        { object: "Evaluacion de rotor principal", amount: "S/ 320,000.00", year: "2025", result: "En revision" },
        { object: "Servicio de componentes dinamicos", amount: "S/ 230,000.00", year: "2024", result: "Observado" },
      ],
      observations: "No debe pasar a habilitado hasta completar seguro y declaracion anticorrupcion.",
    },
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
      selectedProcessId: null,
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
      return this.liveContracts || [];
    },
    contractCount() {
      return this.contracts.length;
    },
    contractHint() {
      return this.liveContracts ? `${this.contractSync.lastSync} · fuente OECE/SEACE` : "Consulte las fuentes oficiales para ver contratos DIRAVPOL";
    },
    selectedRequirement() {
      return this.data.requirements.find((item) => item.id === this.selectedRequirementId) || null;
    },
    selectedProcess() {
      return this.data.processes.find((item) => item.id === this.selectedProcessId) || null;
    },
    selectedReportNumber() {
      return this.selectedRequirement?.id.replace(/^REQ-\d{4}-/, "") || "";
    },
    filteredRequirements() {
      return this.data.requirements.filter((item) => this.matchesQuery([item.id, item.contractId, item.item, item.unit, item.priority]) && this.matchesStatus(item.status));
    },
    filteredProcesses() {
      return this.data.processes.filter((item) => this.matchesQuery([item.id, item.contractId, item.title, item.method, item.stage]) && this.matchesStatus(item.risk));
    },
    filteredSuppliers() {
      return this.data.suppliers.filter((item) => this.matchesQuery([item.name, item.specialty, item.docs, item.sanctions]) && this.matchesStatus(item.docs));
    },
    filteredContracts() {
      return this.contracts.filter((item) => this.matchesQuery([item.id, item.supplier, item.object, item.status]) && this.matchesStatus(item.status));
    },
    contractGroups() {
      return ["Bienes", "Obras", "Servicios"].map((category) => ({
        category,
        contracts: this.filteredContracts.filter((contract) => contract.category === category),
      }));
    },
  },
  methods: {
    setView(view) {
      this.currentView = view;
      this.selectedRequirementId = null;
      this.selectedProcessId = null;
      this.query = "";
      this.status = "Todos";
      this.sidebarOpen = false;
      if (view === "contratos" && this.contractSync.status !== "loading") {
        this.syncContractsFromSeace();
      }
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
      if (action === "sync") {
        this.syncContractsFromSeace();
        return;
      }

      const messages = {
        generate: "Reporte ejecutivo generado para revision.",
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
    openProcess(id) {
      this.selectedProcessId = id;
    },
    backToProcesses() {
      this.selectedProcessId = null;
    },
    printRequirement() {
      window.print();
    },
    printProcess() {
      window.print();
    },
    escapeHtml(value) {
      return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    },
    supplierStatusClass(value) {
      const text = String(value).toLowerCase();
      if (text.includes("incompleto") || text.includes("pendiente") || text.includes("observado") || text.includes("revision")) return "bad";
      if (text.includes("renovar") || text.includes("revision")) return "warn";
      if (text.includes("vigente") || text.includes("registrado") || text.includes("conforme")) return "ok";
      return "info";
    },
    supplierFichaCode(supplier) {
      const index = this.data.suppliers.findIndex((item) => item.name === supplier.name) + 1;
      return `FP-${String(index || 0).padStart(3, "0")}-2026-SIGECA`;
    },
    renderSupplierRows(items, columns) {
      return items.map((item) => `
        <tr>
          ${columns.map((column) => {
            const value = item[column.key];
            if (column.status) {
              return `<td><span class="pdf-status ${this.supplierStatusClass(value)}">${this.escapeHtml(value)}</span></td>`;
            }
            return `<td>${this.escapeHtml(value)}</td>`;
          }).join("")}
        </tr>
      `).join("");
    },
    openSupplierFicha(supplier) {
      const fichaCode = this.supplierFichaCode(supplier);
      const generatedAt = this.formatSyncTimestamp();
      const certifications = (supplier.certifications || []).map((item) => `<li>${this.escapeHtml(item)}</li>`).join("");
      const documents = this.renderSupplierRows(supplier.documents || [], [
        { key: "name" },
        { key: "status", status: true },
        { key: "reference" },
      ]);
      const contracts = this.renderSupplierRows(supplier.contracts || [], [
        { key: "object" },
        { key: "amount" },
        { key: "year" },
        { key: "result", status: true },
      ]);
      const baseHref = new URL(".", window.location.href).href;
      const popup = window.open("", "_blank");

      if (!popup) {
        this.showToast("El navegador bloqueo la ficha. Permite ventanas emergentes para generar el PDF.");
        return;
      }

      popup.document.write(`
        <!doctype html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <base href="${this.escapeHtml(baseHref)}">
          <title>${this.escapeHtml(fichaCode)} · ${this.escapeHtml(supplier.name)}</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet">
          <style>
            :root { --ink: #171a1f; --muted: #616a74; --line: #d4d9df; --navy: #142f54; --blue: #2468b2; --green: #2f8f68; --amber: #b7791f; --red: #b42318; }
            * { box-sizing: border-box; }
            body { margin: 0; background: #e9eef4; color: var(--ink); font-family: Manrope, Arial, sans-serif; }
            .print-bar { position: sticky; top: 0; z-index: 2; display: flex; justify-content: space-between; gap: 12px; align-items: center; padding: 12px 18px; border-bottom: 1px solid var(--line); background: #fff; }
            .print-bar span { color: var(--muted); font-size: 12px; font-weight: 700; }
            button { min-height: 38px; padding: 0 14px; border: 1px solid var(--blue); border-radius: 8px; background: var(--blue); color: #fff; font: inherit; font-weight: 800; cursor: pointer; }
            .sheet { width: min(100%, 920px); margin: 22px auto; padding: 10mm 12mm 8mm; border: 1px solid #cbd2da; background: #fff; box-shadow: 0 14px 40px rgba(24, 39, 75, 0.11); }
            .header { display: flex; justify-content: center; text-align: center; }
            .brand { display: grid; justify-items: center; gap: 5px; }
            .brand img { width: 72px; height: 72px; object-fit: contain; }
            .brand b, .brand span { display: block; }
            .brand b { font-size: 13px; font-weight: 800; }
            .brand span { color: #292e34; font-size: 9px; font-weight: 700; line-height: 1.25; }
            .title { margin: 9px 0 18px; }
            .title h1 { margin: 0; color: #15191e; font-family: "Barlow Condensed", Manrope, sans-serif; font-size: 26px; line-height: 1.12; text-decoration: underline; text-transform: uppercase; }
            .reference { display: flex; justify-content: space-between; gap: 12px; margin-top: 7px; color: #58616b; font-size: 9px; font-weight: 800; }
            .subject { display: grid; grid-template-columns: 94px minmax(0, 1fr); gap: 12px; margin-bottom: 18px; font-size: 12px; line-height: 1.45; }
            .subject p { margin: 0; text-align: justify; }
            .section { padding: 11px 0 10px; border-bottom: 1px solid var(--line); break-inside: avoid; page-break-inside: avoid; }
            .section h2 { margin: 0 0 8px; font-size: 12px; font-weight: 800; text-transform: uppercase; }
            .fields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px 22px; }
            .field label { display: block; margin-bottom: 2px; color: var(--muted); font-size: 8px; font-weight: 800; letter-spacing: .4px; text-transform: uppercase; }
            .field b { display: block; color: #20252b; font-size: 11px; line-height: 1.4; }
            .score { color: var(--navy); font-family: "Barlow Condensed", Manrope, sans-serif; font-size: 20px; }
            ul { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 5px 24px; margin: 0; padding-left: 19px; font-size: 10px; line-height: 1.45; }
            table { width: 100%; border-collapse: collapse; font-size: 9px; }
            th, td { padding: 7px 8px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; }
            th { color: var(--muted); font-size: 8px; text-transform: uppercase; }
            .pdf-status { display: inline-flex; min-height: 21px; align-items: center; padding: 0 7px; border-radius: 999px; font-size: 8px; font-weight: 800; white-space: nowrap; }
            .pdf-status.ok { background: #e7f6ed; color: var(--green); }
            .pdf-status.warn { background: #fff5dc; color: var(--amber); }
            .pdf-status.bad { background: #ffe8e6; color: var(--red); }
            .pdf-status.info { background: #e7f0ff; color: var(--blue); }
            .trace { display: flex; justify-content: space-between; gap: 12px; margin-top: 10px; padding: 9px 12px; border-top: 1px solid var(--line); }
            .trace b, .trace span { display: block; }
            .trace b { color: var(--navy); font-size: 9px; }
            .trace span { margin-top: 2px; color: var(--muted); font-size: 9px; }
            .trace .code { text-align: right; }
            .trace .code b { font-family: "Barlow Condensed", Manrope, sans-serif; font-size: 15px; }
            .footer { display: flex; justify-content: space-between; gap: 12px; padding-top: 10px; color: var(--muted); font-size: 8px; }
            @page { size: A4 portrait; margin: 10mm; }
            @media print {
              body { background: #fff; }
              .print-bar { display: none; }
              .sheet { width: 100%; margin: 0; padding: 3mm 4mm 2mm; border: 0; box-shadow: none; }
              .pdf-status, .trace { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="print-bar">
            <span>Ficha de proveedor SIGECA · ${this.escapeHtml(supplier.name)}</span>
            <button onclick="window.print()">Imprimir / Guardar PDF</button>
          </div>
          <article class="sheet">
            <header class="header">
              <div class="brand">
                <img src="assets/DIVMAAER.svg" alt="Escudo de la Division de Mantenimiento Aeropolicial">
                <div>
                  <b>POLICIA NACIONAL DEL PERU</b>
                  <span>DIRECCION DE AVIACION POLICIAL</span>
                  <span>DIVISION DE MANTENIMIENTO AEREO · SIGECA</span>
                </div>
              </div>
            </header>
            <div class="title">
              <h1>FICHA DE PROVEEDOR ${this.escapeHtml(fichaCode)}</h1>
              <div class="reference">
                <span>PADRON DE PROVEEDORES TECNICOS</span>
                <span class="pdf-status ${this.supplierStatusClass(supplier.docs)}">${this.escapeHtml(supplier.docs)}</span>
              </div>
            </div>
            <div class="subject">
              <b>ASUNTO:</b>
              <p>Ficha de evaluacion, habilitacion documental y desempeno del proveedor ${this.escapeHtml(supplier.name)}, vinculada al modulo de proveedores SIGECA.</p>
            </div>
            <section class="section">
              <h2>I. Datos generales</h2>
              <div class="fields">
                <div class="field"><label>Razon social</label><b>${this.escapeHtml(supplier.name)}</b></div>
                <div class="field"><label>RUC</label><b>${this.escapeHtml(supplier.ruc)}</b></div>
                <div class="field"><label>Representante</label><b>${this.escapeHtml(supplier.representative)}</b></div>
                <div class="field"><label>Rubro / especialidad</label><b>${this.escapeHtml(supplier.specialty)}</b></div>
                <div class="field"><label>Categoria</label><b>${this.escapeHtml(supplier.category)}</b></div>
                <div class="field"><label>Registro SIGECA</label><b>${this.escapeHtml(supplier.registry)}</b></div>
                <div class="field"><label>Domicilio</label><b>${this.escapeHtml(supplier.address)}</b></div>
                <div class="field"><label>Contacto</label><b>${this.escapeHtml(supplier.phone)} · ${this.escapeHtml(supplier.email)}</b></div>
              </div>
            </section>
            <section class="section">
              <h2>II. Evaluacion y vigencia</h2>
              <div class="fields">
                <div class="field"><label>Puntaje SIGECA</label><b><span class="score">${this.escapeHtml(supplier.score)}/100</span></b></div>
                <div class="field"><label>Estado documental</label><b><span class="pdf-status ${this.supplierStatusClass(supplier.docs)}">${this.escapeHtml(supplier.docs)}</span></b></div>
                <div class="field"><label>Vigencia / renovacion</label><b>${this.escapeHtml(supplier.validity)}</b></div>
                <div class="field"><label>Registro de sanciones</label><b>${this.escapeHtml(supplier.sanctions)}</b></div>
                <div class="field"><label>Experiencia declarada</label><b>${this.escapeHtml(supplier.experience)}</b></div>
                <div class="field"><label>Fecha de emision</label><b>${this.escapeHtml(generatedAt)}</b></div>
              </div>
            </section>
            <section class="section">
              <h2>III. Certificaciones y habilitaciones tecnicas</h2>
              <ul>${certifications}</ul>
            </section>
            <section class="section">
              <h2>IV. Control documental</h2>
              <table>
                <thead><tr><th>Documento</th><th>Estado</th><th>Referencia</th></tr></thead>
                <tbody>${documents}</tbody>
              </table>
            </section>
            <section class="section">
              <h2>V. Antecedentes contractuales referenciales</h2>
              <table>
                <thead><tr><th>Objeto</th><th>Monto</th><th>Ano</th><th>Resultado</th></tr></thead>
                <tbody>${contracts}</tbody>
              </table>
            </section>
            <section class="section">
              <h2>VI. Observaciones SIGECA</h2>
              <div class="fields">
                <div class="field"><label>Comentario de seguimiento</label><b>${this.escapeHtml(supplier.observations)}</b></div>
                <div class="field"><label>Uso de la ficha</label><b>Documento demostrativo para consulta interna. No reemplaza la verificacion oficial ante OSCE, SUNAT u otra entidad competente.</b></div>
              </div>
            </section>
            <section class="trace">
              <div>
                <b>TRAZABILIDAD SIGECA</b>
                <span>Ficha generada desde el modulo Proveedores con datos demostrativos del prototipo.</span>
              </div>
              <div class="code">
                <span>EXPEDIENTE</span>
                <b>${this.escapeHtml(fichaCode)}</b>
              </div>
            </section>
            <footer class="footer">
              <span>DIRAVPOL PNP · Unidad Ejecutora N.º 18</span>
              <span>Ficha demostrativa SIGECA</span>
              <span>${this.escapeHtml(generatedAt)}</span>
            </footer>
          </article>
          <script>
            window.addEventListener("load", () => {
              setTimeout(() => window.print(), 350);
            });
          <\/script>
        </body>
        </html>
      `);
      popup.document.close();
      this.showToast(`Ficha generada para ${supplier.name}.`);
    },
    clearSyncSearch() {
      this.query = "";
      this.status = "Todos";
      this.handleAction("sync-clear");
    },
    formatSyncTimestamp(date = new Date()) {
      return new Intl.DateTimeFormat("es-PE", {
        dateStyle: "short",
        timeStyle: "medium",
      }).format(date);
    },
    async syncContractsFromSeace() {
      const requestedAt = this.formatSyncTimestamp();

      this.contractSync = {
        ...this.contractSync,
        status: "loading",
        message: "Sincronizando con las fuentes oficiales: hasta 20 contratos recientes por categoría...",
        lastSync: requestedAt,
      };

      try {
        const response = await fetch(CONTRACTS_URL, { cache: "no-store" });
        const text = await response.text();
        let result;
        try {
          result = JSON.parse(text);
        } catch {
          throw new Error("La respuesta de contratos no contiene JSON valido.");
        }
        if (!response.ok || !result.ok) {
          throw Object.assign(new Error(result.message || `HTTP ${response.status}`), { result });
        }
        const contracts = result.contracts;
        this.liveContracts = contracts;
        const counts = Object.fromEntries(
          ["Bienes", "Obras", "Servicios"].map((category) => [
            category,
            contracts.filter((contract) => contract.category === category).length,
          ])
        );
        this.contractSync = {
          status: "ok",
          message: contracts.length
            ? `Consulta completada desde ${result.source}: ${counts.Bienes} bienes, ${counts.Obras} obras y ${counts.Servicios} servicios. Se muestran como máximo 20 por categoría.`
            : result.message || "No se encontraron contratos clasificables de DIRAVPOL en las fuentes oficiales.",
          lastSync: requestedAt,
          sourceUrl: result.sourceUrl,
          attempts: result.attempts || [],
        };
      } catch (error) {
        this.liveContracts = null;
        const message = error instanceof TypeError
          ? window.location.port === "4173"
            ? "No se pudo conectar al backend local. Ejecuta `npm start` y abre http://127.0.0.1:4173"
            : "No se pudo cargar la copia pública de contratos. Verifica que contracts.json exista en el sitio."
          : error.message;
        this.contractSync = {
          status: "error",
          message: `No se pudo sincronizar desde las fuentes oficiales: ${message}. No se muestran registros de respaldo para evitar confundirlos con contratos reales.`,
          lastSync: requestedAt,
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
            <img class="crest" src="assets/DIVMAAER.svg" alt="Escudo de la División de Mantenimiento Aeropolicial">
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
                    <div class="document-brand"><img class="document-crest" src="assets/DIVMAAER.svg" alt="Escudo de la División de Mantenimiento Aeropolicial"><div><b>POLICÍA NACIONAL DEL PERÚ</b><span>DIRECCIÓN DE AVIACIÓN POLICIAL</span><span>DIVISIÓN DE MANTENIMIENTO AÉREO · {{ selectedRequirement.section }}</span></div></div>
                  </header>
                  <div class="report-title"><h1>INFORME N.° {{ selectedReportNumber }}-2025-COMOPPOL-DIRAVPOL/DIVMAAER-CONTROL DE CALIDAD</h1><div class="report-reference"><span>REQUERIMIENTO {{ selectedRequirement.id }}</span><span class="status" :class="statusClass(selectedRequirement.status)">{{ selectedRequirement.status }}</span></div></div>
                  <div class="report-subject"><b>ASUNTO:</b><p>{{ selectedRequirement.subject }}</p></div>
                  <section class="report-section"><h2>I. ANTECEDENTES</h2><p>{{ selectedRequirement.background }}</p></section>
                  <section class="report-section"><h2>1. OBJETIVO</h2><p>{{ selectedRequirement.objective }}</p></section>
                  <section class="report-section"><h2>2. FINALIDAD</h2><p>{{ selectedRequirement.purpose }}</p></section>
                  <section class="document-section"><h3>3. IDENTIFICACIÓN DEL REQUERIMIENTO</h3><div class="document-fields">
                    <div><label>Código del requerimiento</label><b>{{ selectedRequirement.id }}</b></div><div><label>Referencia SEACE</label><b>{{ selectedRequirement.contractId }}</b></div>
                    <div><label>Unidad usuaria</label><b>{{ selectedRequirement.unit }}</b></div>
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
                    <input class="search" v-model="query" type="search" placeholder="Buscar por codigo, referencia SEACE, bien, servicio o unidad...">
                    <div class="filters"><select class="select" v-model="status"><option>Todos</option><option>Borrador</option><option>En evaluacion</option><option>Aprobado</option><option>Observado</option></select><button class="btn" @click="handleAction('new')">Nuevo registro</button></div>
                  </div>
                  <div class="table-wrap"><table><thead><tr><th>Codigo</th><th>Ref. SEACE</th><th>Objeto</th><th>Unidad</th><th>Monto</th><th>Estado</th><th>Vence</th><th>Acciones</th></tr></thead><tbody>
                    <tr v-for="item in filteredRequirements" :key="item.id">
                      <td><b>{{ item.id }}</b><br><span class="tag">{{ item.priority }}</span></td><td><span class="tag">{{ item.contractId }}</span></td><td>{{ item.item }}</td><td>{{ item.unit }}</td><td>{{ item.amount }}</td><td><span class="status" :class="statusClass(item.status)">{{ item.status }}</span></td><td>{{ item.due }}</td>
                      <td class="actions"><button class="mini" @click="openRequirement(item.id)">Abrir</button><button class="mini" @click="handleAction('approve')">Validar</button></td>
                    </tr>
                  </tbody></table></div>
                </section>
              </template>
            </template>

            <template v-else-if="currentView === 'procesos'">
              <template v-if="selectedProcess">
                <section class="requirement-toolbar">
                  <button class="btn" @click="backToProcesses">← Volver a procesos</button>
                  <div><span class="document-state"><i></i> Ficha de seguimiento · Datos ficticios</span><button class="btn primary" @click="printProcess">Imprimir / Guardar PDF</button></div>
                </section>
                <article class="requirement-sheet">
                  <header class="document-header">
                    <div class="document-brand"><img class="document-crest" src="assets/DIVMAAER.svg" alt="Escudo de la División de Mantenimiento Aeropolicial"><div><b>POLICÍA NACIONAL DEL PERÚ</b><span>DIRECCIÓN DE AVIACIÓN POLICIAL - SIGECA</span><span>FICHA DE SEGUIMIENTO DEL PROCESO DE CONTRATACIÓN</span></div></div>
                  </header>
                  <div class="report-title"><h1>{{ selectedProcess.code }}</h1><div class="report-reference"><span>{{ selectedProcess.procedure }}</span><span class="status" :class="statusClass(selectedProcess.risk)">{{ selectedProcess.risk }}</span></div></div>
                  <div class="document-object"><span>Objeto de contratación</span><h2>{{ selectedProcess.object }}</h2><p>{{ selectedProcess.method }} · {{ selectedProcess.state }}</p></div>
                  <section class="document-section"><h3><span>1</span> DATOS GENERALES</h3><div class="document-fields">
                    <div><label>Objeto de contratación</label><b>{{ selectedProcess.object }}</b></div>
                    <div><label>Requerimiento de origen</label><b>{{ selectedProcess.requirementId }}</b></div>
                    <div><label>Área usuaria</label><b>{{ selectedProcess.area }}</b></div>
                    <div><label>Tipo de contratación</label><b>{{ selectedProcess.contractType }}</b></div>
                    <div><label>Procedimiento</label><b>{{ selectedProcess.procedure }}</b></div>
                    <div><label>Monto estimado</label><b class="document-amount">{{ selectedProcess.amount }}</b></div>
                    <div><label>Responsable del seguimiento</label><b>{{ selectedProcess.responsible }}</b></div>
                    <div><label>Estado actual</label><b>{{ selectedProcess.state }}</b></div>
                  </div></section>
                  <section class="document-section"><h3><span>2</span> AVANCE DEL PROCESO</h3>
                    <div class="table-wrap"><table><thead><tr><th>#</th><th>Etapa</th><th>Situación</th><th>Fecha</th></tr></thead><tbody>
                      <tr v-for="(step, index) in selectedProcess.timeline" :key="step.stage"><td>{{ index + 1 }}</td><td>{{ step.stage }}</td><td><span class="status" :class="step.status === 'EN CURSO' ? 'warn' : step.status === 'Completado' ? 'ok' : step.status === 'Pendiente' ? 'info' : 'info'">{{ step.status }}</span></td><td>{{ step.date }}</td></tr>
                    </tbody></table></div>
                  </section>
                  <section class="document-section"><h3><span>3</span> DOCUMENTOS DEL EXPEDIENTE</h3>
                    <div class="table-wrap"><table><thead><tr><th>Documento</th><th>Estado</th><th>Referencia</th></tr></thead><tbody>
                      <tr v-for="doc in selectedProcess.documents" :key="doc.name"><td>{{ doc.name }}</td><td><span class="status" :class="doc.status === 'Publicado' || doc.status === 'Registrado' ? 'ok' : doc.status === 'En revisión' || doc.status === 'Revisando' ? 'warn' : 'info'">{{ doc.status }}</span></td><td>{{ doc.reference }}</td></tr>
                    </tbody></table></div>
                  </section>
                  <section class="document-section"><h3><span>4</span> ALERTAS Y RIESGOS</h3><p>{{ selectedProcess.riskNote }}</p></section>
                  <section class="document-section"><h3><span>5</span> TRAZABILIDAD</h3>
                    <div class="table-wrap"><table><thead><tr><th>Fecha / hora</th><th>Acción</th><th>Responsable</th><th>Detalle</th></tr></thead><tbody>
                      <tr v-for="item in selectedProcess.traceability" :key="item.date + item.action"><td>{{ item.date }}</td><td>{{ item.action }}</td><td>{{ item.responsible }}</td><td>{{ item.detail }}</td></tr>
                    </tbody></table></div>
                  </section>
                  <footer class="document-footer"><span>DIRAVPOL PNP · Unidad Ejecutora N.º 18</span><span>Ficha demostrativa SIGECA</span><span>{{ selectedProcess.state }}</span></footer>
                </article>
              </template>
              <template v-else>
                <module-header title="Procesos de seleccion" lead="Seguimiento del ciclo de contratacion, desde actuaciones preparatorias hasta buena pro, con control de plazos y riesgos." :stats="[{ value: data.processes.length, label: 'procesos activos' }, { value: '1', label: 'riesgo alto' }, { value: '62%', label: 'avance promedio' }, { value: '3', label: 'hitos proximos' }]" />
                <section class="panel">
                  <div class="toolbar"><input class="search" v-model="query" type="search" placeholder="Buscar proceso, referencia SEACE, objeto o etapa..."><div class="filters"><select class="select" v-model="status"><option>Todos</option><option>Bajo</option><option>Medio</option><option>Alto</option></select><button class="btn" @click="handleAction('new')">Nuevo registro</button></div></div>
                  <div class="table-wrap"><table><thead><tr><th>Proceso</th><th>Ref. SEACE</th><th>Objeto</th><th>Metodo</th><th>Etapa</th><th>Riesgo</th><th>Acciones</th></tr></thead><tbody>
                    <tr v-for="item in filteredProcesses" :key="item.id"><td><b>{{ item.id }}</b></td><td><span class="tag">{{ item.contractId }}</span></td><td>{{ item.title }}</td><td>{{ item.method }}</td><td>{{ item.stage }}<div class="progress"><span :style="{ width: item.progress + '%' }"></span></div></td><td><span class="status" :class="statusClass(item.risk)">{{ item.risk }}</span></td><td class="actions"><button class="mini" @click="openProcess(item.id)">Ver</button><button class="mini" @click="handleAction('timeline')">Hitos</button></td></tr>
                  </tbody></table></div>
                </section>
              </template>
            </template>

            <template v-else-if="currentView === 'contratos'">
              <section class="module-header">
                <div>
                  <p class="eyebrow">Fuente oficial OECE / SEACE</p>
                  <h1>Contratos de DIRAVPOL</h1>
                  <p class="lead">Consulta únicamente registros de DIRAVPOL, separados por bienes, obras y servicios. Se muestran hasta los 20 más recientes disponibles por categoría.</p>
                </div>
                <div class="header-actions">
                  <button class="btn primary" :disabled="contractSync.status === 'loading'" @click="syncContractsFromSeace">
                    {{ contractSync.status === 'loading' ? 'Sincronizando...' : 'Sincronizar contratos' }}
                  </button>
                </div>
              </section>

              <section class="panel contract-results">
                <div class="sync-banner" :class="contractSync.status">
                  <div>
                    <p>{{ contractSync.message }}</p>
                    <small v-if="contractSync.lastSync">Última consulta: {{ contractSync.lastSync }}</small>
                    <div v-if="contractSync.attempts.length" class="attempt-list">
                      <span v-for="attempt in contractSync.attempts" :key="attempt.source" :class="attempt.ok ? 'ok' : 'bad'">
                        {{ attempt.source }}: {{ attempt.ok ? attempt.count + ' registros' : attempt.error }}
                      </span>
                    </div>
                    <div class="source-links">
                      <a :href="contractSync.sourceUrl || SEACE_SOURCE.datasetUrl" target="_blank" rel="noreferrer">Fuente consultada</a>
                      <a :href="SEACE_SOURCE.ocdsUrl" target="_blank" rel="noreferrer">Portal de Contrataciones SEACE</a>
                    </div>
                  </div>
                </div>
                <div class="toolbar">
                  <input class="search" v-model="query" type="search" placeholder="Buscar por contrato, proveedor u objeto...">
                </div>
                <section v-for="group in contractGroups" :key="group.category" class="contract-category">
                  <h2>{{ group.category }} <span>{{ group.contracts.length }} de 20</span></h2>
                  <div v-if="group.contracts.length" class="table-wrap">
                    <table>
                      <thead><tr><th>Fecha</th><th>Contrato / proceso</th><th>Objeto</th><th>Proveedor</th><th>Monto</th><th>Estado</th></tr></thead>
                      <tbody>
                        <tr v-for="contract in group.contracts" :key="group.category + '-' + contract.id">
                          <td>{{ contract.date || contract.end }}</td>
                          <td><b>{{ contract.id }}</b></td>
                          <td>{{ contract.object }}</td>
                          <td>{{ contract.supplier }}</td>
                          <td>{{ contract.value }}</td>
                          <td>{{ contract.status }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p v-else class="empty-contracts">
                    {{ liveContracts === null ? 'Consulta las fuentes oficiales para cargar esta categoría.' : query ? 'No hay coincidencias para la búsqueda.' : 'No hay registros oficiales disponibles para esta categoría.' }}
                  </p>
                </section>
              </section>
            </template>

            <template v-else-if="currentView === 'proveedores'">
              <module-header title="Proveedores" lead="Padron de proveedores tecnicos con especialidad aeronautica, vigencia documental, desempeno y alertas de habilitacion." :stats="[{ value: data.suppliers.length, label: 'registrados' }, { value: '3', label: 'habilitados' }, { value: '86', label: 'puntaje medio' }, { value: '1', label: 'revision requerida' }]" />
              <section class="panel"><div class="toolbar"><input class="search" v-model="query" type="search" placeholder="Buscar proveedor o especialidad..."><div class="filters"><select class="select" v-model="status"><option>Todos</option><option>Vigente</option><option>Por renovar</option><option>Incompleto</option></select><button class="btn" @click="handleAction('new')">Nuevo registro</button></div></div>
                <div class="table-wrap"><table><thead><tr><th>Proveedor</th><th>Especialidad</th><th>Score</th><th>Documentos</th><th>Observacion</th><th>Acciones</th></tr></thead><tbody>
                  <tr v-for="item in filteredSuppliers" :key="item.name"><td><b>{{ item.name }}</b></td><td>{{ item.specialty }}</td><td>{{ item.score }}/100<div class="progress"><span :style="{ width: item.score + '%' }"></span></div></td><td><span class="status" :class="statusClass(item.docs)">{{ item.docs }}</span></td><td>{{ item.sanctions }}</td><td class="actions"><button class="mini" @click="openSupplierFicha(item)">Ficha</button><button class="mini" @click="handleAction('verify')">Verificar</button></td></tr>
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
