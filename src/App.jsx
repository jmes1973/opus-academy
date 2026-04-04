/* eslint-disable */
import { useMemo, useState, useEffect } from "react";
import volutracerLogo from "./assets/logos/Logo Volutracer OPUS.png";
import opusLogo from "./assets/logos/Logo_OPUS_Academy_1280x720.png";

/* ────────────────────────────────────────────────
   DESIGN SYSTEM OPUS – COMPONENTES BASE
────────────────────────────────────────────────── */

// Botón OPUS
function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-md font-montserrat font-semibold transition focus:outline-none focus:ring-2 focus:ring-opusBlueSec/60 focus:ring-offset-1 focus:ring-offset-white disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-opusBlueMain text-white hover:bg-opusBlueSec border border-opusBlueMain",
    secondary:
      "bg-white text-opusBlueMain border border-opusBlueMain hover:bg-opusBlueMain/5",
    ghost:
      "bg-transparent text-opusBlueMain hover:bg-opusBlueMain/5 border border-transparent",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-sm",
  };

  const classes = [base, variants[variant] || variants.primary, sizes[size] || sizes.md, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

// Input de texto OPUS
function InputField({ className = "", ...props }) {
  const base =
    "w-full border border-opusGrayLight rounded-md px-3 py-2 text-sm font-ui bg-white text-opusGrayDark placeholder:text-opusGrayLight focus:outline-none focus:ring-2 focus:ring-opusBlueSec/50 focus:border-opusBlueSec";
  return <input className={`${base} ${className}`} {...props} />;
}

// Select OPUS
function SelectField({ className = "", children, ...props }) {
  const base =
    "border border-opusGrayLight rounded-md px-3 py-2 text-sm font-ui bg-white text-opusGrayDark focus:outline-none focus:ring-2 focus:ring-opusBlueSec/50 focus:border-opusBlueSec";
  return (
    <select className={`${base} ${className}`} {...props}>
      {children}
    </select>
  );
}

// Card OPUS
function Card({ className = "", children, ...props }) {
  const base =
    "bg-white border border-opusGrayLight/80 rounded-xl overflow-hidden shadow-sm shadow-black/5";
  return (
    <div className={`${base} ${className}`} {...props}>
      {children}
    </div>
  );
}

// Tag / Chip OPUS
function Tag({ className = "", children }) {
  const base =
    "inline-flex items-center px-2 py-0.5 rounded-full bg-opusGrayLight/30 text-[11px] font-ui text-opusGrayDark";
  return <span className={`${base} ${className}`}>{children}</span>;
}

/* ────────────────────────────────────────────────
   CONFIG – LOGIN / PDF / VIDEOS (VITE: public/)
────────────────────────────────────────────────── */

const SESSION_STORAGE_KEY = "opus.session";
const INTENDED_VIEW_KEY = "opus.intendedView";

const DEMO_LOGIN = {
  username: "admin",
  password: "admin",
};

const APP_PDF = {
  label: "Protocolo RUSH – OPUS Academy (ES)",
  url: "/content/pdfs/OPUS_RUSH_PROTOCOL_TEMPLATE_A4_ES.pdf",
};

/**
 * Mapping de páginas por lección (PDF real).
 * Páginas 1-based (1 = portada).
 */
const PDF_RANGES_BY_LESSON = {
  // Módulo 1
  "Introducción al shock y enfoque POCUS": { start: 10, end: 15 },
  "Modelo Bomba–Tanque–Tuberías": { start: 20, end: 21 },
  "Secuencia práctica del protocolo RUSH": { start: 21, end: 22 },

  // Módulo 2
  "Vista paraesternal eje largo (PLAX) en shock": { start: 55, end: 56 },
  "Vista apical de 4 cámaras (A4C) en shock": { start: 55, end: 56 },
  "Función ventricular global y derrame pericárdico": { start: 58, end: 58 },

  // Módulo 3
  "Evaluación de la VCI subxifoidea": { start: 44, end: 44 },
  "Pulmón: deslizamiento pleural, líneas A/B y derrame": { start: 68, end: 151 },
  "FAST abreviado en shock no traumático": { start: 44, end: 72 },

  // Módulo 4
  "Aorta abdominal: eje longitudinal y transversal": { start: 77, end: 78 },
  "Screening básico de TVP en miembros inferiores": { start: 78, end: 91 },
  "Búsqueda de aneurisma o disección": { start: 79, end: 91 },

  // Módulo 5
  "Algoritmo RUSH según tipo de shock": { start: 93, end: 123 },
  "Patrones integrados Pump–Tank–Pipes": { start: 68, end: 143 },
  "Casos clínicos guiados por RUSH": { start: 153, end: 159 },

  __default: null,
};

const VIDEO_BY_LESSON = {
  // Cuando existan:
  // "Vista paraesternal eje largo (PLAX) en shock": { type: "mp4", src: "/content/videos/rush/rush_m2_plax.mp4" },
};

/* ────────────────────────────────────────────────
   DATOS DE EJEMPLO — CURSO RUSH
────────────────────────────────────────────────── */

const COURSES = [
  {
    id: "rush-basic",
    title: "POCUS – Protocolo RUSH en Shock",
    subtitle: "Nivel básico · 5 módulos · Adulto crítico",
    category: "Medicina Crítica",
    level: "Básico",
    duration: "4–6 horas",
    focus:
      "Aplicación del modelo Bomba–Tanque–Tuberías para la valoración rápida del paciente en shock no traumático.",
    modules: [
      {
        id: "rush-1",
        name: "Fundamentos del protocolo RUSH",
        lessons: [
          "Introducción al shock y enfoque POCUS",
          "Modelo Bomba–Tanque–Tuberías",
          "Secuencia práctica del protocolo RUSH",
        ],
      },
      {
        id: "rush-2",
        name: "La Bomba (Pump) – Corazón",
        lessons: [
          "Vista paraesternal eje largo (PLAX) en shock",
          "Vista apical de 4 cámaras (A4C) en shock",
          "Función ventricular global y derrame pericárdico",
        ],
      },
      {
        id: "rush-3",
        name: "El Tanque (Tank) – Volemia y líquido",
        lessons: [
          "Evaluación de la VCI subxifoidea",
          "Pulmón: deslizamiento pleural, líneas A/B y derrame",
          "FAST abreviado en shock no traumático",
        ],
      },
      {
        id: "rush-4",
        name: "Las Tuberías (Pipes) – Arterias y venas",
        lessons: [
          "Aorta abdominal: eje longitudinal y transversal",
          "Búsqueda de aneurisma o disección",
          "Screening básico de TVP en miembros inferiores",
        ],
      },
      {
        id: "rush-5",
        name: "Integración y toma de decisiones",
        lessons: [
          "Algoritmo RUSH según tipo de shock",
          "Patrones integrados Pump–Tank–Pipes",
          "Casos clínicos guiados por RUSH",
        ],
      },
    ],
  },
];

/* ────────────────────────────────────────────────
   OBJETIVOS (1 frase) – POR LECCIÓN
────────────────────────────────────────────────── */

const OBJECTIVE_BY_LESSON = {
  "Vista paraesternal eje largo (PLAX) en shock":
    "Identificar en PLAX la función global del VI y buscar derrame pericárdico, orientando la causa de shock dentro del modelo Pump–Tank–Pipes.",
  "Vista apical de 4 cámaras (A4C) en shock":
    "Evaluar en A4C la relación VI–VD, la función ventricular global y la presencia de derrame pericárdico, orientando el tipo de shock dentro del modelo Pump–Tank–Pipes.",
  "Función ventricular global y derrame pericárdico":
    "Integrar la función global biventricular y la presencia de derrame pericárdico para diferenciar shock cardiogénico vs obstructivo y estimar compromiso hemodinámico.",

  "Pulmón: deslizamiento pleural, líneas A/B y derrame":
    "Identificar patrones pulmonares básicos (deslizamiento, líneas A/B y derrame) para diferenciar causas respiratorias y volumétricas del shock dentro del protocolo RUSH.",
  "FAST abreviado en shock no traumático":
    "Detectar rápidamente líquido libre intraabdominal o pericárdico como causa potencial de inestabilidad hemodinámica en el shock no traumático, integrándolo al protocolo RUSH.",
  "Aorta abdominal: eje longitudinal y transversal":
    "Identificar dilatación, aneurisma o patología evidente de la aorta abdominal mediante cortes longitudinal y transversal para descartar causa vascular mayor de shock.",
  "Screening básico de TVP en miembros inferiores":
    "Detectar trombosis venosa profunda proximal con un screening ecográfico simple para apoyar la sospecha de TEP como causa de shock obstructivo.",
  "Búsqueda de aneurisma o disección":
    "Detectar aneurismas o disección aórtica utilizando ecografía abdominal y torácica como herramientas rápidas para diagnóstico en pacientes con shock no traumático.",
  "Algoritmo RUSH según tipo de shock":
    "Integrar los hallazgos de Pump–Tank–Pipes para identificar el tipo de shock predominante y orientar las decisiones terapéuticas iniciales.",
  "Patrones integrados Pump–Tank–Pipes":
    "Reconocer patrones ecográficos integrados de Pump–Tank–Pipes que permitan identificar rápidamente la causa predominante del shock y priorizar intervenciones.",
  "Casos clínicos guiados por RUSH":
    "Aplicar el protocolo RUSH de forma secuencial en escenarios clínicos reales para identificar la causa del shock y justificar decisiones terapéuticas iniciales.",
};

/* ────────────────────────────────────────────────
   QUIZZES RUSH (1 pregunta por lección)
────────────────────────────────────────────────── */

const RUSH_QUIZZES = {
  // Módulo 2 – Pump
  "Vista paraesternal eje largo (PLAX) en shock": {
    question:
      "En la vista PLAX dentro del protocolo RUSH, ¿qué hallazgo orienta más a disfunción sistólica grave del VI como causa de shock?",
    options: [
      "VI hiperdinámico con cavidad pequeña",
      "Hipocinesia global del VI con cavidad dilatada",
      "Pericardio sin derrame y válvula mitral normal",
      "VD discretamente mayor que VI con buen movimiento",
    ],
    correctIndex: 1,
    feedbackCorrect:
      "Correcto. Una cavidad izquierda dilatada con hipocinesia global sugiere disfunción sistólica significativa y componente cardiogénico.",
    feedbackIncorrect:
      "Incorrecto. En shock cardiogénico, PLAX suele mostrar hipocinesia global del VI (y a menudo dilatación).",
  },

  "Vista apical de 4 cámaras (A4C) en shock": {
    question:
      "En la vista A4C dentro del protocolo RUSH, ¿qué hallazgo orienta más a shock obstructivo?",
    options: [
      "VI hipocinético con cavidad dilatada",
      "VD dilatado con desviación septal hacia el VI",
      "Aurícula izquierda aumentada con válvula mitral normal",
      "Función biventricular conservada",
    ],
    correctIndex: 1,
    feedbackCorrect:
      "Correcto. Un VD dilatado con desplazamiento septal sugiere sobrecarga aguda del VD, compatible con shock obstructivo.",
    feedbackIncorrect:
      "Incorrecto. En shock obstructivo, A4C suele mostrar dilatación del VD y compromiso del llenado del VI.",
  },

  "Función ventricular global y derrame pericárdico": {
    question:
      "En el protocolo RUSH, ¿qué combinación de hallazgos orienta más a taponamiento cardíaco como causa de shock obstructivo?",
    options: [
      "VI hiperdinámico con VCI colapsable",
      "Derrame pericárdico significativo con colapso diastólico de cavidades derechas",
      "VD pequeño con VI dilatado e hipocinético",
      "Ausencia de derrame y función biventricular normal",
    ],
    correctIndex: 1,
    feedbackCorrect:
      "Correcto. Derrame pericárdico relevante más colapso diastólico derecho sugiere taponamiento y requiere correlación hemodinámica urgente.",
    feedbackIncorrect:
      "Incorrecto. El taponamiento se sospecha por derrame pericárdico significativo y signos de compromiso de llenado, típicamente con colapso diastólico derecho.",
  },

  // Módulo 3 – Tank
  "Evaluación de la VCI subxifoidea": {
    question:
      "En el contexto del protocolo RUSH, ¿qué combinación de hallazgos en la VCI subxifoidea sugiere hipovolemia o bajo llenado?",
    options: [
      "VCI dilatada > 2,1 cm con escasa variación respiratoria",
      "VCI colapsable con diámetro pequeño y variación respiratoria marcada",
      "VCI de tamaño normal sin variación respiratoria",
      "VCI no visible en ventana subxifoidea",
    ],
    correctIndex: 1,
    feedbackCorrect:
      "Correcto. Una VCI pequeña y muy colapsable sugiere bajo llenado intravascular, compatible con componentes hipovolémicos.",
    feedbackIncorrect:
      "Incorrecto. La VCI dilatada y poco colapsable se asocia más a presión elevada en AD que a hipovolemia.",
  },

  "Pulmón: deslizamiento pleural, líneas A/B y derrame": {
    question:
      "En el contexto del protocolo RUSH, ¿qué combinación de hallazgos pulmonares sugiere más un shock cardiogénico?",
    options: [
      "Líneas A bilaterales con deslizamiento pleural conservado",
      "Líneas B difusas bilaterales con deslizamiento pleural presente",
      "Ausencia de deslizamiento pleural unilateral",
      "Derrame pleural pequeño aislado",
    ],
    correctIndex: 1,
    feedbackCorrect:
      "Correcto. Las líneas B difusas reflejan congestión intersticial, típica de sobrecarga y shock cardiogénico.",
    feedbackIncorrect:
      "Incorrecto. En shock cardiogénico se esperan signos de congestión pulmonar, no pulmón aireado ni neumotórax.",
  },

  "FAST abreviado en shock no traumático": {
    question:
      "En el protocolo RUSH, ¿cuál es el objetivo principal del FAST abreviado en el paciente con shock no traumático?",
    options: [
      "Confirmar trauma abdominal oculto",
      "Medir con precisión el volumen de líquido intraperitoneal",
      "Identificar rápidamente líquido libre que explique la inestabilidad hemodinámica",
      "Sustituir la tomografía abdominal en urgencias",
    ],
    correctIndex: 2,
    feedbackCorrect:
      "Correcto. En RUSH, el FAST se usa como herramienta rápida para detectar causas potencialmente reversibles de shock.",
    feedbackIncorrect:
      "Incorrecto. El FAST en RUSH es un examen dirigido y rápido; no cuantifica volumen ni reemplaza otros estudios.",
  },

  // Módulo 4 – Pipes
  "Aorta abdominal: eje longitudinal y transversal": {
    question:
      "Durante la evaluación de la aorta abdominal en el protocolo RUSH, ¿qué hallazgo obliga a descartar de forma prioritaria una causa vascular de shock?",
    options: [
      "Aorta con diámetro uniforme de 2 cm",
      "Visualización incompleta por gas intestinal",
      "Diámetro ≥ 3 cm o dilatación sacular focal",
      "Aorta colapsable con respiración",
    ],
    correctIndex: 2,
    feedbackCorrect:
      "Correcto. Un diámetro aórtico igual o mayor a 3 cm es compatible con aneurisma y debe considerarse causa potencial de shock.",
    feedbackIncorrect:
      "Incorrecto. El criterio clave es el aumento del diámetro o la deformidad focal de la aorta.",
  },

  "Screening básico de TVP en miembros inferiores": {
    question:
      "En el screening ecográfico de TVP dentro del protocolo RUSH, ¿cuál es el hallazgo más útil y directo para diagnosticar TVP proximal?",
    options: [
      "Vena con flujo color continuo",
      "Vena de mayor diámetro que la arteria adyacente",
      "Falta de compresibilidad completa de la vena",
      "Presencia de líneas B en pulmón",
    ],
    correctIndex: 2,
    feedbackCorrect:
      "Correcto. La falta de colapso venoso completo con compresión es el criterio más directo para sospechar TVP proximal.",
    feedbackIncorrect:
      "Incorrecto. En RUSH, el criterio práctico principal es la compresión: una vena que no colapsa completamente es altamente sugestiva.",
  },

  "Búsqueda de aneurisma o disección": {
    question:
      "En el protocolo RUSH, ¿cuál es el hallazgo más sugestivo de disección aórtica en ecografía abdominal?",
    options: [
      "Diámetro aórtico > 3 cm sin imagen sacular",
      "Imagen de doble luz o doble contorno en el corte transversal",
      "Presencia de trombo mural en la luz aórtica",
      "Flujo continuo sin interrupciones en el Doppler",
    ],
    correctIndex: 1,
    feedbackCorrect:
      "Correcto. La doble luz es la característica clave de una disección aórtica, que indica el paso de sangre entre las capas de la aorta.",
    feedbackIncorrect:
      "Incorrecto. El aneurisma puede mostrar un aumento de diámetro sin doble luz. La disección se caracteriza por una imagen de doble contorno.",
  },

  // Módulo 5 – Integración
  "Algoritmo RUSH según tipo de shock": {
    question:
      "En un paciente en shock con VD dilatado, septum desplazado hacia el VI, pulmón sin líneas B y VCI dilatada, ¿cuál es el tipo de shock más probable?",
    options: ["Shock cardiogénico", "Shock hipovolémico", "Shock obstructivo", "Shock distributivo"],
    correctIndex: 2,
    feedbackCorrect:
      "Correcto. La sobrecarga aguda del VD con pulmón seco y VCI dilatada es típica de shock obstructivo (p. ej., TEP, taponamiento).",
    feedbackIncorrect:
      "Incorrecto. En el shock obstructivo predominan los signos de compromiso del VD con impedimento al llenado izquierdo.",
  },

  "Patrones integrados Pump–Tank–Pipes": {
    question:
      "¿Cuál de los siguientes conjuntos de hallazgos corresponde mejor a un patrón hipovolémico dentro del RUSH?",
    options: [
      "VI dilatado hipocinético + líneas B difusas + VCI dilatada",
      "VD dilatado + septum desplazado + pulmón seco",
      "Cavidades pequeñas hiperdinámicas + VCI colapsable + pulmón seco",
      "Función biventricular conservada + líneas B difusas",
    ],
    correctIndex: 2,
    feedbackCorrect:
      "Correcto. Este patrón es característico de bajo llenado intravascular y shock hipovolémico.",
    feedbackIncorrect:
      "Incorrecto. El shock hipovolémico se asocia a cavidades pequeñas, VCI colapsable y ausencia de congestión pulmonar.",
  },

  "Casos clínicos guiados por RUSH": {
    question:
      "Paciente de 62 años, hipotenso y taquicárdico. RUSH: VD dilatado con septum desplazado, pulmón sin líneas B, VCI dilatada y TVP femoral positiva. ¿Causa más probable?",
    options: ["Shock cardiogénico", "Shock hipovolémico", "Shock obstructivo", "Shock distributivo"],
    correctIndex: 2,
    feedbackCorrect:
      "Correcto. El patrón integrado sugiere sobrecarga aguda del VD asociada a TEP como causa obstructiva.",
    feedbackIncorrect:
      "Incorrecto. La combinación de VD dilatado, pulmón seco y TVP apunta a una causa obstructiva, no a hipovolemia ni cardiogénica.",
  },

  __default: {
    question: "¿Cuál es la finalidad global del protocolo RUSH en el paciente con shock?",
    options: [
      "Medir con exactitud fracción de eyección del VI",
      "Identificar rápidamente la causa probable del shock para guiar la reanimación inicial",
      "Descartar definitivamente toda patología cardíaca y vascular",
      "Sustituir la valoración clínica y hemodinámica convencional",
    ],
    correctIndex: 1,
    feedbackCorrect:
      "Correcto. RUSH busca orientar rápidamente la causa probable del shock y apoyar las decisiones terapéuticas iniciales.",
    feedbackIncorrect:
      "Incorrecto. RUSH es un protocolo de aproximación rápida; no sustituye la valoración completa ni descarta toda patología.",
  },
};

/* ────────────────────────────────────────────────
   TEORÍA AMPLIADA (bullets por lección)
   + Panel derecho toma “keyPoints” si existe
────────────────────────────────────────────────── */

const THEORY_BY_LESSON = {
  "Vista paraesternal eje largo (PLAX) en shock": {
    title: "Teoría ampliada — PLAX en shock (RUSH / Pump)",
    bullets: [
      "Objetivo: estimar función sistólica global del VI y buscar derrame pericárdico.",
      "VI hipocinético y dilatado sugiere shock cardiogénico (disfunción sistólica significativa).",
      "Derrame pericárdico relevante + colapso diastólico derecho: considerar taponamiento (obstructivo).",
      "Integración: correlacionar con VCI (Tank) y hallazgos pulmonares (Tank).",
    ],
    keyPoints: [
      "Estimar función global del VI en segundos (no “perfección”, sí utilidad).",
      "Buscar derrame pericárdico y signos de compromiso de llenado.",
      "Integrar con VCI y pulmón: el RUSH es un todo.",
    ],
    note: "Segmento en desarrollo. Se ampliará con esquemas y ejemplos.",
  },

  "Vista apical de 4 cámaras (A4C) en shock": {
    title: "Teoría ampliada — A4C en shock (RUSH / Pump)",
    bullets: [
      "Comparar tamaño y función de VI y VD de forma sistemática.",
      "VD mayor que VI sugiere sobrecarga derecha aguda (TEP, taponamiento, etc.).",
      "Hipocinesia global del VI orienta a shock cardiogénico.",
      "Integrar siempre con VCI y pulmón para completar Pump–Tank–Pipes.",
    ],
    keyPoints: [
      "Comparar VI vs VD y el septum: pistas rápidas de sobrecarga derecha.",
      "Evitar aislar hallazgos: correlacionar con VCI y pulmón.",
      "Pensar fenotipo de shock, no “vista bonita”.",
    ],
    note: "Segmento en desarrollo. Se ampliará con esquemas y ejemplos.",
  },

  "Función ventricular global y derrame pericárdico": {
    title: "Teoría ampliada — Función global + derrame pericárdico (RUSH / Pump)",
    bullets: [
      "Función global: estimación visual de contractilidad y tamaño cavitario.",
      "Derrame pericárdico: distribución, cuantía y relación con colapso diastólico derecho.",
      "Sospecha de taponamiento: derrame + signos de compromiso de llenado + deterioro hemodinámico.",
      "Integrar con VCI (Tank) y hallazgos pulmonares para fenotipo de shock.",
    ],
    keyPoints: [
      "Taponamiento es diagnóstico integrado, no solo “hay derrame”.",
      "Colapso diastólico derecho es un dato fuerte.",
      "Correlacionar con hipotensión/taquicardia y VCI.",
    ],
    note: "Segmento en desarrollo. Se ampliará con algoritmo y casos.",
  },

  "Evaluación de la VCI subxifoidea": {
    title: "Teoría ampliada — VCI en shock (RUSH / Tank)",
    bullets: [
      "VCI pequeña y muy colapsable sugiere bajo llenado intravascular.",
      "VCI dilatada y poco colapsable sugiere presión elevada en AD (congestión).",
      "Correlacionar con pulmón (líneas B vs A) y con la función ventricular.",
      "Evitar interpretaciones rígidas: ventilación mecánica y presión intratorácica modifican la VCI.",
    ],
    keyPoints: [
      "VCI colapsable + pulmón seco: sugiere hipovolemia.",
      "VCI dilatada + líneas B: sugiere congestión (cardiogénico).",
      "Ventilación mecánica puede engañar: contextualizar.",
    ],
    note: "Segmento en desarrollo. Se ampliará con ejemplos y trampas frecuentes.",
  },

  "Pulmón: deslizamiento pleural, líneas A/B y derrame": {
    title: "Teoría ampliada — Pulmón en shock (RUSH / Tank)",
    bullets: [
      "Deslizamiento pleural presente: descarta neumotórax en el punto evaluado.",
      "Líneas A predominantes: pulmón aireado; sugiere hipovolemia si se integra con VCI colapsable.",
      "Líneas B múltiples y difusas: congestión pulmonar; apoya shock cardiogénico.",
      "Derrame pleural: líquido anecoico dependiente; correlacionar con sobrecarga o causas inflamatorias.",
      "Integración: siempre con Pump (VI/VD) y Tank (VCI); ningún hallazgo va solo.",
    ],
    keyPoints: [
      "Líneas B difusas = congestión intersticial (cardiogénico hasta demostrar lo contrario).",
      "Líneas A + VCI colapsable = bajo llenado probable.",
      "Deslizamiento presente descarta neumotórax en ese punto.",
      "Derrame pleural: pensar en contexto (sobrecarga vs inflamación).",
    ],
    note: "Sugerencia: luego añadimos esquema A/B-lines y ejemplos de derrame para el libro.",
  },

  "FAST abreviado en shock no traumático": {
    title: "Teoría ampliada — FAST abreviado (RUSH / Tank)",
    bullets: [
      "En RUSH, el FAST es abreviado y dirigido (no es un FAST traumático completo).",
      "Ventanas clave: perihepática (Morrison), periesplénica, pelvis (fondo de saco) y pericardio subxifoideo si no se evaluó en Pump.",
      "Líquido libre anecoico en paciente inestable → pensar en causa hemorrágica o inflamatoria severa.",
      "FAST negativo no descarta shock: integrar siempre con Pump, VCI y pulmón.",
      "Útil especialmente en shock séptico abdominal, ruptura de víscera, hemoperitoneo espontáneo (anticoagulación, AAA roto).",
    ],
    keyPoints: [
      "FAST en RUSH = búsqueda rápida de líquido libre relevante.",
      "Positivo + inestabilidad: prioriza causa tiempo-dependiente.",
      "Negativo no “cierra” nada: se integra con Pump/VCI/pulmón.",
    ],
    note: "Luego podemos añadir mini-mapa de ventanas y ejemplos de líquido libre.",
  },

  "Aorta abdominal: eje longitudinal y transversal": {
    title: "Teoría ampliada — Aorta abdominal (RUSH / Pipes)",
    bullets: [
      "Evaluar la aorta desde el hiato hasta la bifurcación, siempre que sea posible.",
      "Usar eje longitudinal para continuidad y eje transversal para medir diámetro real.",
      "Diámetro normal: < 3 cm.",
      "≥ 3 cm o dilatación focal → sospechar aneurisma de aorta abdominal (AAA).",
      "En inestabilidad: AAA roto = diagnóstico tiempo-dependiente.",
      "Integrar con Tank (FAST/VCI) y Pump (hipotensión persistente sin causa cardíaca clara).",
    ],
    keyPoints: [
      "≥ 3 cm: sospecha AAA.",
      "Medir en transversal evita falsos tamaños.",
      "Si está inestable: piensa AAA roto temprano.",
    ],
    note: "Si luego quieres, añadimos regla simple de medición y segmentación (prox/medio/distal).",
  },

  "Screening básico de TVP en miembros inferiores": {
    title: "Teoría ampliada — Screening TVP (RUSH / Pipes)",
    bullets: [
      "En RUSH, la TVP es una pista rápida de TEP cuando hay shock y sobrecarga de VD.",
      "Screening por compresión: vena femoral común (inguinal), unión safeno-femoral y vena poplítea (fosa poplítea).",
      "Regla de oro: si la vena no colapsa completamente con presión, sospecha TVP.",
      "Color Doppler puede ayudar, pero la compresión manda.",
      "Un examen negativo no descarta TEP: integrar con Pump (VD) + Tank (pulmón/VCI).",
    ],
    keyPoints: [
      "No compresible = TVP hasta demostrar lo contrario.",
      "Tres puntos prácticos: femoral común, safeno-femoral, poplítea.",
      "Negativo no excluye TEP: integrar con VD/VCI/pulmón.",
    ],
    note: "Luego añadimos un esquema simple de puntos de compresión para el libro.",
  },

  "Búsqueda de aneurisma o disección": {
    title: "Teoría ampliada — Aneurisma y disección (RUSH / Pipes)",
    bullets: [
      "Aneurisma de aorta: diámetro ≥ 3 cm es sospechoso; aneurisma sacular focal se prioriza.",
      "Disección aórtica: en transversal buscar doble luz / doble contorno; en longitudinal puede verse flap íntimal.",
      "Diferenciar aneurisma vs disección: no son lo mismo y cambian conducta.",
      "Integrar con FAST para derrames y con Pump para correlación hemodinámica.",
    ],
    keyPoints: [
      "Doble luz/doble contorno: dato fuerte de disección.",
      "≥ 3 cm: aneurisma probable.",
      "Siempre integrar con estado hemodinámico y FAST.",
    ],
    note: "Aquí después conviene agregar imagen/diagrama del flap íntimal (si tienes material).",
  },

  "Algoritmo RUSH según tipo de shock": {
    title: "Teoría ampliada — Algoritmo RUSH (Integración)",
    bullets: [
      "RUSH no es una lista de vistas: es razonamiento secuencial orientado a una pregunta clínica.",
      "Shock cardiogénico: Pump (VI hipocinético ± dilatado) + Tank (líneas B, VCI dilatada).",
      "Shock obstructivo: Pump (VD dilatado, septum desplazado) + Tank (pulmón seco o neumotórax/±derrame) + Pipes (TVP positiva, aorta patológica).",
      "Shock hipovolémico: Pump (cavidades pequeñas, corazón hiperdinámico) + Tank (VCI colapsable, pulmón seco) + FAST si sangrado.",
      "Shock distributivo (séptico): Pump normal/hiperdinámico temprano, Tank variable, pulmón generalmente seco en fase precoz.",
      "Siempre correlacionar con clínica, TA, lactato y respuesta a fluidos.",
    ],
    keyPoints: [
      "Responder: ¿por qué está en shock ahora?",
      "Fenotipo de shock = patrón integrado, no un dato suelto.",
      "Correlacionar con clínica y respuesta al tratamiento.",
    ],
    note: "Luego podemos convertir esto en un diagrama visual (flowchart) para OPUS Web.",
  },

  "Patrones integrados Pump–Tank–Pipes": {
    title: "Teoría ampliada — Patrones integrados (RUSH)",
    bullets: [
      "El foco ya no es una vista: es el patrón completo Pump–Tank–Pipes.",
      "Patrón cardiogénico: VI hipocinético ± dilatado + líneas B difusas/derrame pleural + VCI dilatada; Pipes sin hallazgos mayores.",
      "Patrón obstructivo: VD dilatado + septum desplazado + pulmón seco o neumotórax/±derrame pericárdico + TVP positiva o aorta patológica.",
      "Patrón hipovolémico: cavidades pequeñas hiperdinámicas + VCI colapsable + pulmón seco; FAST con líquido libre si hemorragia.",
      "Patrón distributivo: función normal/hiperdinámico + VCI variable + pulmón inicialmente seco; Pipes negativos.",
      "Clave: los patrones no son rígidos; el shock puede evolucionar.",
    ],
    keyPoints: [
      "Pensar “patrón” antes que “órgano”.",
      "Hipovolémico = cavidades pequeñas + VCI colapsable + pulmón seco.",
      "Cardiogénico = congestión pulmonar + VCI dilatada + VI disfuncionante.",
      "Obstructivo = VD agudo + pulmón seco + pistas en Pipes.",
    ],
    note: "Aquí conviene añadir fichas visuales por patrón (4 tarjetas) en una próxima iteración.",
  },

  "Casos clínicos guiados por RUSH": {
    title: "Teoría ampliada — Casos clínicos (RUSH)",
    bullets: [
      "Esta lección no enseña vistas: enseña criterio clínico bajo presión.",
      "El orden Pump–Tank–Pipes puede adaptarse según la sospecha inicial.",
      "Cada hallazgo debe responder a una pregunta concreta: ¿bombea? ¿hay volumen? ¿hay obstrucción o causa vascular?",
      "El diagnóstico final es clínico apoyado en ecografía.",
      "Valor del RUSH: reduce diferenciales, acelera decisiones y evita tratamientos contraproducentes.",
      "",
      "Estructura sugerida para casos (OPUS):",
      "1) Presentación clínica breve (edad, TA, FC, contexto).",
      "2) Hallazgos RUSH: Pump / Tank / Pipes.",
      "3) Pregunta clave: tipo de shock predominante.",
      "4) Decisión inicial: fluidos / vasopresor / intervención específica.",
    ],
    keyPoints: [
      "No es “ver todo”: es decidir mejor y más rápido.",
      "Cada vista debe responder una pregunta clínica.",
      "El caso final integra VD + pulmón seco + VCI dilatada + TVP.",
    ],
    note: "Cuando tengas casos reales (texto corto), los metemos como mini-simulaciones dentro de OPUS Web.",
  },

  __default: {
    title: "Teoría ampliada",
    bullets: [
      "Esta sección se está construyendo por capítulos.",
      "Use estos puntos clave antes de responder el quiz.",
    ],
    keyPoints: [
      "Integrar Pump–Tank–Pipes.",
      "Correlacionar con clínica y hemodinamia.",
      "Evitar conclusiones por un solo hallazgo.",
    ],
    note: "Próximamente: texto completo y gráficos por lección.",
  },
};

/* ────────────────────────────────────────────────
   HELPERS
────────────────────────────────────────────────── */

function safeJsonParse(raw, fallback) {
  try {
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function makeToken() {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  } catch {
    // ignore
  }
  return `tok_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

/**
 * Normaliza títulos para que el match sea robusto:
 * - minúsculas
 * - sin acentos
 * - guiones raros (–, —) => "-"
 * - espacios colapsados
 */
function normalizeLessonKey(str) {
  if (!str) return "";
  let s = String(str).trim().toLowerCase();
  s = s.replace(/[–—]/g, "-");
  try {
    s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } catch {
    // ignore
  }
  s = s.replace(/\s+/g, " ");
  return s;
}

// Crear mapa normalizado una vez
const PDF_RANGES_NORMALIZED = (() => {
  const m = {};
  Object.keys(PDF_RANGES_BY_LESSON || {}).forEach((k) => {
    if (k === "__default") return;
    m[normalizeLessonKey(k)] = PDF_RANGES_BY_LESSON[k];
  });
  return m;
})();

function getPdfRangeForLesson(lessonTitle) {
  if (!lessonTitle) return PDF_RANGES_BY_LESSON.__default || null;

  // 1) match exacto
  const exact = PDF_RANGES_BY_LESSON[lessonTitle];
  if (exact) return exact;

  // 2) match normalizado
  const nk = normalizeLessonKey(lessonTitle);
  const nr = PDF_RANGES_NORMALIZED[nk];
  if (nr) return nr;

  return PDF_RANGES_BY_LESSON.__default || null;
}

function getVideoForLesson(lessonTitle) {
  return VIDEO_BY_LESSON[lessonTitle] || null;
}

async function probePdfUrl(url) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    const contentType = res.headers.get("content-type") || "";
    if (!res.ok) {
      return { ok: false, reason: `HTTP ${res.status}`, contentType };
    }

    if (res.body && res.body.getReader) {
      const reader = res.body.getReader();
      const { value } = await reader.read();
      try {
        await reader.cancel();
      } catch {
        // ignore
      }
      const head = value ? new TextDecoder().decode(value.slice(0, 8)) : "";
      const looksPdf = head.startsWith("%PDF");
      return {
        ok: looksPdf,
        reason: looksPdf ? "OK" : "Contenido no es PDF (probable HTML fallback)",
        contentType,
      };
    }

    const buf = await res.arrayBuffer();
    const head = new TextDecoder().decode(new Uint8Array(buf).slice(0, 8));
    const looksPdf = head.startsWith("%PDF");
    return {
      ok: looksPdf,
      reason: looksPdf ? "OK" : "Contenido no es PDF (probable HTML fallback)",
      contentType,
    };
  } catch (e) {
    return { ok: false, reason: "Error de red o ruta inválida", contentType: "" };
  }
}

/* ────────────────────────────────────────────────
   HEADER
────────────────────────────────────────────────── */

function Header({ onChangeView, isLoggedIn, userLabel, onLoginClick, onLogout }) {
  return (
    <header className="h-16 bg-opusBlueMain text-white flex items-center justify-between px-8 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="font-heading text-xl tracking-wide">Volutracer OPUS</div>
        <div className="w-px h-6 bg-white/30" />
        <div className="font-heading text-lg">OPUS Academy</div>
      </div>

      <nav className="flex items-center gap-4 text-sm">
        <button className="hover:underline" onClick={() => onChangeView("library")}>
          Biblioteca
        </button>

        <button
          className="hover:underline hidden sm:inline"
          onClick={() => onChangeView("course")}
          disabled={!isLoggedIn}
          title={!isLoggedIn ? "Inicie sesión para acceder" : ""}
        >
          Mis cursos
        </button>

        <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-white/30">
          <div className="w-8 h-8 rounded-full bg-white/20" />
          <span className="font-ui text-xs sm:text-sm">
            {isLoggedIn ? userLabel || "admin" : "Sin sesión"}
          </span>
        </div>

        {!isLoggedIn ? (
          <Button variant="secondary" size="sm" className="ml-2" onClick={onLoginClick}>
            Iniciar sesión
          </Button>
        ) : (
          <Button variant="secondary" size="sm" className="ml-2" onClick={onLogout}>
            Cerrar sesión
          </Button>
        )}
      </nav>
    </header>
  );
}

/* ────────────────────────────────────────────────
   FOOTER
────────────────────────────────────────────────── */

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-opusGrayLight/40 py-5">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-3">
        <div className="flex items-center justify-between w-full max-w-md">
          <img src={volutracerLogo} alt="Volutracer OPUS" className="h-10 opacity-90" />
          <img src={opusLogo} alt="OPUS Academy" className="h-10 opacity-90" />
        </div>

        <div className="h-px w-full bg-opusGrayLight/40" />

        <p className="text-xs text-opusGrayDark text-center">
          © {year} Volutracer OPUS · OPUS Academy · Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

/* ────────────────────────────────────────────────
   VISTA — LOGIN (admin/admin)
────────────────────────────────────────────────── */

function LoginView({ onLogin, onBackToLibrary }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");

    if (username.trim() !== DEMO_LOGIN.username || password !== DEMO_LOGIN.password) {
      setError("Credenciales inválidas. Use admin / admin.");
      return;
    }

    if (typeof onLogin === "function") {
      onLogin({ username: username.trim() });
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <Card className="p-6">
        <h1 className="font-heading text-2xl text-opusBlueMain mb-2">Acceso OPUS Academy</h1>
        <p className="text-sm text-opusGrayDark mb-6">
          Inicie sesión para acceder a cursos, lecciones, quizzes, teoría ampliada y PDF.
        </p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-xs font-montserrat font-semibold text-opusBlueMain mb-1">
              Usuario
            </label>
            <InputField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-xs font-montserrat font-semibold text-opusBlueMain mb-1">
              Contraseña
            </label>
            <InputField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-md p-3">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={onBackToLibrary}>
              Volver
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Entrar
            </Button>
          </div>

          <div className="text-[11px] text-opusGrayDark pt-3">
            Demo local: usuario/clave <span className="font-semibold">admin/admin</span>.
          </div>
        </form>
      </Card>
    </div>
  );
}

/* ────────────────────────────────────────────────
   VISTA — BIBLIOTECA
────────────────────────────────────────────────── */

function LibraryView({ onOpenCourse, getCourseProgress }) {
  return (
    <div className="px-10 py-8">
      <header className="mb-6">
        <h1 className="font-heading text-3xl sm:text-4xl text-opusBlueMain mb-2">
          Biblioteca Académica OPUS
        </h1>
        <p className="text-sm sm:text-base text-opusGrayDark">
          Seleccione el curso según su nivel, especialidad y objetivo clínico.
        </p>
        <div className="mt-4 h-1 w-24 bg-opusBlueSec rounded-full" />
      </header>

      <section className="mb-6 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
        <SelectField className="min-w-[150px]">
          <option>Especialidad</option>
          <option>Cardiología</option>
          <option>Medicina Crítica</option>
        </SelectField>

        <SelectField className="min-w-[120px]">
          <option>Nivel</option>
          <option>Básico</option>
          <option>Intermedio</option>
          <option>Avanzado</option>
        </SelectField>

        <SelectField className="min-w-[120px]">
          <option>Duración</option>
          <option>≤ 2 horas</option>
          <option>2–6 horas</option>
          <option>&gt; 6 horas</option>
        </SelectField>

        <div className="flex-1 min-w-[180px]">
          <InputField placeholder="Buscar por título o palabra clave" />
        </div>

        <Button variant="secondary" size="sm" className="mt-1 sm:mt-0">
          Limpiar filtros
        </Button>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSES.map((course) => {
          const pi = typeof getCourseProgress === "function" ? getCourseProgress(course) : null;
          const pct = pi ? Math.round((pi.progress || 0) * 100) : 0;

          return (
            <Card
              key={course.id}
              className="text-left hover:border-opusBlueSec hover:shadow-md hover:-translate-y-0.5 transition duration-150 cursor-pointer"
              onClick={() => onOpenCourse(course)}
            >
              <div className="aspect-video bg-opusGrayLight/30" />
              <div className="p-4 space-y-2">
                <h2 className="font-montserrat font-semibold text-base sm:text-lg text-opusBlueMain leading-snug">
                  {course.title}
                </h2>
                <p className="text-xs sm:text-sm text-opusGrayDark">{course.subtitle}</p>

                <div className="flex items-center justify-between mt-2">
                  <Tag>{course.category}</Tag>
                  <span className="text-[11px] text-opusGrayDark">Progreso: {pct}%</span>
                </div>

                <div className="mt-1 h-1.5 bg-opusGrayLight/30 rounded-full overflow-hidden">
                  <div className="h-full bg-opusBlueSec" style={{ width: `${pct}%` }} />
                </div>
              </div>
            </Card>
          );
        })}
      </section>
    </div>
  );
}

/* ────────────────────────────────────────────────
   VISTA — CURSO
────────────────────────────────────────────────── */

function CourseView({ course, onStartCourse, progressInfo }) {
  if (!course) return null;

  const pct = progressInfo ? Math.round((progressInfo.progress || 0) * 100) : 0;

  return (
    <div className="bg-white">
      <div className="bg-opusBlueMain text-white py-6 px-6">
        <div className="max-w-5xl mx-auto space-y-1">
          <p className="text-xs uppercase tracking-[0.15em] opacity-80">Curso OPUS Academy</p>
          <h1 className="font-heading text-2xl sm:text-3xl">{course.title}</h1>
          <p className="opacity-90 text-sm sm:text-base">{course.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-10">
        <div className="lg:w-3/5 space-y-4">
          <Card className="p-5">
            <h2 className="font-montserrat text-lg font-semibold text-opusBlueMain mb-2">
              Descripción general
            </h2>

            <p className="leading-relaxed text-sm text-opusGrayDark">
              Curso orientado a la integración de los hallazgos ecográficos con la fisiopatología del paciente crítico,
              enfatizando la adquisición correcta de vistas y la interpretación hemodinámica.
            </p>

            <h3 className="font-montserrat text-sm font-semibold text-opusBlueMain mt-4">
              Objetivos del curso
            </h3>
            <ul className="list-disc pl-5 text-sm text-opusGrayDark space-y-1">
              <li>Reconocer y adquirir vistas ecográficas estándar.</li>
              <li>Valorar globalmente la función ventricular y hallazgos mayores.</li>
              <li>Integrar la información ecográfica al contexto clínico del shock.</li>
            </ul>

            <div className="flex flex-wrap gap-2 pt-3 text-[11px]">
              <Tag>Especialidad: {course.category || "Medicina Crítica"}</Tag>
              <Tag>Nivel: {course.level || "Básico"}</Tag>
              <Tag>Progreso: {pct}%</Tag>
            </div>

            <div className="mt-3 h-1.5 bg-opusGrayLight/30 rounded-full overflow-hidden">
              <div className="h-full bg-opusBlueSec" style={{ width: `${pct}%` }} />
            </div>
          </Card>
        </div>

        <div className="lg:w-2/5 flex flex-col gap-4">
          <Card className="p-4">
            <h2 className="font-montserrat text-lg font-semibold text-opusBlueMain mb-3">
              Contenido del curso
            </h2>

            <ol className="space-y-3">
              {course.modules.map((mod, index) => (
                <li
                  key={mod.id}
                  className="relative pl-6 border-l border-opusGrayLight/70 pb-2 last:pb-0"
                >
                  <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-opusBlueSec" />
                  <p className="font-montserrat text-sm font-semibold text-opusBlueMain">
                    Módulo {index + 1}: {mod.name}
                  </p>
                  <ul className="text-xs text-opusGrayDark mt-1 space-y-0.5">
                    {mod.lessons.map((lesson, idx) => (
                      <li key={idx}>• {lesson}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Card>

          <Button variant="primary" size="md" className="w-full" onClick={onStartCourse}>
            Iniciar curso
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   VISTA — LECCIÓN
────────────────────────────────────────────────── */

function LessonView({
  course,
  moduleIndex,
  lessonIndex,
  onSelectLesson,
  onOpenQuiz,
  onOpenTheory,
  onOpenPdf,
  canAccess,
  isCompleted,
}) {
  if (!course) return null;

  const currentModule = course.modules?.[moduleIndex];
  const currentLessonTitle = currentModule?.lessons?.[lessonIndex] || "";

  const video = getVideoForLesson(currentLessonTitle);
  const theory = THEORY_BY_LESSON[currentLessonTitle] || THEORY_BY_LESSON.__default;

  const objective =
    OBJECTIVE_BY_LESSON[currentLessonTitle] ||
    `Integrar el hallazgo ecográfico de “${currentLessonTitle}” con el modelo Pump–Tank–Pipes del paciente en shock.`;

  const rightKeyPoints =
    Array.isArray(theory.keyPoints) && theory.keyPoints.length
      ? theory.keyPoints
      : THEORY_BY_LESSON.__default.keyPoints || [];

  const renderVideo = () => {
    if (!video) {
      return (
        <div className="w-full h-[360px] bg-black flex items-center justify-center text-white/70 text-sm">
          Video no configurado para esta lección.
        </div>
      );
    }

    if (video.type === "youtube" || video.type === "vimeo") {
      return (
        <iframe
          className="w-full h-[360px]"
          src={video.src}
          title={`Video – ${currentLessonTitle}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    if (video.type === "mp4" || video.type === "webm") {
      return (
        <video className="w-full h-[360px] bg-black" controls>
          <source src={video.src} type={video.type === "webm" ? "video/webm" : "video/mp4"} />
          Su navegador no soporta video HTML5.
        </video>
      );
    }

    return (
      <div className="w-full h-[360px] bg-black flex items-center justify-center text-white/70 text-sm">
        Formato de video no soportado.
      </div>
    );
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white">
      <aside className="w-72 bg-opusGrayLight/40 px-6 py-6 overflow-y-auto border-r border-opusGrayLight/60">
        <h2 className="font-montserrat font-semibold text-opusBlueMain mb-4 text-sm">
          Estructura del curso RUSH
        </h2>

        <div className="space-y-4 text-xs text-opusGrayDark">
          {course.modules.map((mod, mIdx) => (
            <div key={mod.id}>
              <p className="font-montserrat font-semibold text-opusBlueMain mb-1">
                Módulo {mIdx + 1} – {mod.name}
              </p>

              <ul className="space-y-1">
                {mod.lessons.map((lesson, lIdx) => {
                  const active = mIdx === moduleIndex && lIdx === lessonIndex;
                  const completed = typeof isCompleted === "function" ? isCompleted(mIdx, lIdx) : false;
                  const allowed = typeof canAccess === "function" ? canAccess(mIdx, lIdx) : true;

                  return (
                    <li key={lIdx}>
                      <button
                        type="button"
                        disabled={!allowed}
                        className={`w-full text-left px-2 py-1 rounded-md transition ${
                          active
                            ? "bg-opusBlueSec text-white"
                            : allowed
                            ? "hover:bg-opusGrayLight/60"
                            : "opacity-50 cursor-not-allowed"
                        }`}
                        onClick={() => allowed && onSelectLesson(mIdx, lIdx)}
                        title={!allowed ? "Bloqueado: complete la lección anterior" : ""}
                      >
                        <span className="mr-1">{completed ? "✅" : active ? "●" : "○"}</span>
                        {lesson}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 px-8 py-7 overflow-y-auto">
        <div className="mb-4 text-xs text-opusGrayDark">
          {course.title} &gt; Módulo {moduleIndex + 1} &gt;{" "}
          <span className="text-opusBlueMain font-semibold">{currentLessonTitle}</span>
        </div>

        <h1 className="font-heading text-2xl text-opusBlueMain mb-4">{currentLessonTitle}</h1>

        <Card className="p-0 mb-3">
          <div className="border-4 border-opusBlueMain rounded-md overflow-hidden bg-black">
            {renderVideo()}
          </div>
        </Card>

        <Card className="mt-5 p-4">
          <h2 className="font-montserrat text-sm font-semibold text-opusBlueMain mb-1">
            Objetivo de esta lección
          </h2>
          <p className="text-sm text-opusGrayDark">{objective}</p>
        </Card>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button variant="primary" size="md" onClick={onOpenQuiz}>
            Ir al quiz de esta lección
          </Button>

          <Button variant="secondary" size="md" onClick={onOpenTheory}>
            📘 Teoría ampliada
          </Button>

          <Button variant="secondary" size="md" onClick={onOpenPdf}>
            📄 Libro (PDF)
          </Button>
        </div>
      </main>

      <aside className="w-72 bg-opusBlueSec text-white px-6 py-6 hidden xl:block">
        <h3 className="font-montserrat font-semibold mb-2 text-sm">Puntos clave</h3>
        <ul className="text-xs space-y-2 mb-6">
          {rightKeyPoints.map((kp, i) => (
            <li key={i}>• {kp}</li>
          ))}
        </ul>

        <h3 className="font-montserrat font-semibold mb-2 text-sm">Recomendaciones</h3>
        <ul className="text-xs space-y-2">
          <li>• Documentar ventanas clave del protocolo.</li>
          <li>• Repetir exploración tras intervenciones.</li>
          <li>• Confirmar con contexto hemodinámico.</li>
        </ul>
      </aside>
    </div>
  );
}

/* ────────────────────────────────────────────────
   VISTA — QUIZ
────────────────────────────────────────────────── */

function QuizView({ onBackToLesson, lessonTitle, onPass, onOpenTheory, onOpenPdf }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const quiz = RUSH_QUIZZES[lessonTitle] || RUSH_QUIZZES.__default;
  const isCorrect = answered && selected === quiz.correctIndex;

  const handleSubmit = () => {
    setAnswered(true);
    if (selected === quiz.correctIndex && typeof onPass === "function") {
      onPass();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Card className="p-5 mb-5">
        <div className="flex items-center justify-between mb-4 gap-3">
          <div>
            <h1 className="font-montserrat text-xl font-semibold text-opusBlueMain">
              Quiz – Protocolo RUSH
            </h1>
            <p className="text-xs text-opusGrayDark">Lección: {lessonTitle || "—"}</p>
          </div>

          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={onOpenTheory}>
              📘 Teoría ampliada
            </Button>
            <Button variant="secondary" size="sm" onClick={onOpenPdf}>
              📄 PDF
            </Button>
            <Button variant="ghost" size="sm" onClick={onBackToLesson}>
              ← Volver
            </Button>
          </div>
        </div>

        <h2 className="font-montserrat text-lg font-semibold text-opusBlueMain mb-4">
          {quiz.question}
        </h2>

        <div className="space-y-3 mb-6">
          {quiz.options.map((opt, idx) => {
            const isSelected = selected === idx;
            return (
              <Card
                key={idx}
                className={`px-4 py-3 cursor-pointer text-sm transition ${
                  isSelected ? "border-opusBlueSec bg-opusBlueSec/10" : "hover:border-opusBlueMain"
                }`}
                onClick={() => !answered && setSelected(idx)}
              >
                <span className="font-semibold mr-2">{String.fromCharCode(65 + idx)}.</span>
                {opt}
              </Card>
            );
          })}
        </div>

        {answered && (
          <Card className="p-3 mb-6">
            {isCorrect ? (
              <p className="text-green-700 text-sm">{quiz.feedbackCorrect}</p>
            ) : (
              <div className="space-y-2">
                <p className="text-red-700 text-sm">{quiz.feedbackIncorrect}</p>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" onClick={onOpenTheory}>
                    Ver explicación (teoría)
                  </Button>
                  <Button variant="secondary" size="sm" onClick={onOpenPdf}>
                    Ver páginas en PDF
                  </Button>
                </div>
              </div>
            )}
          </Card>
        )}

        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setSelected(null);
              setAnswered(false);
            }}
          >
            Reiniciar
          </Button>

          <Button variant="primary" size="sm" onClick={handleSubmit} disabled={selected === null}>
            Responder
          </Button>
        </div>
      </Card>
    </div>
  );
}

/* ────────────────────────────────────────────────
   VISTA — TEORÍA AMPLIADA
────────────────────────────────────────────────── */

function TheoryView({ lessonTitle, onBack, onOpenPdf }) {
  const t = THEORY_BY_LESSON[lessonTitle] || THEORY_BY_LESSON.__default;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4 gap-3">
          <div>
            <h1 className="font-montserrat text-xl font-semibold text-opusBlueMain">{t.title}</h1>
            <p className="text-xs text-opusGrayDark">Lección: {lessonTitle || "—"}</p>
          </div>

          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={onOpenPdf}>
              📄 PDF
            </Button>
            <Button variant="ghost" size="sm" onClick={onBack}>
              ← Volver
            </Button>
          </div>
        </div>

        <ul className="list-disc pl-5 text-sm text-opusGrayDark space-y-2">
          {(t.bullets || []).map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        {t.note && (
          <div className="mt-4 text-xs text-opusGrayDark bg-opusGrayLight/30 border border-opusGrayLight/60 rounded-md p-3">
            {t.note}
          </div>
        )}
      </Card>
    </div>
  );
}

/* ────────────────────────────────────────────────
   VISTA — PDF (por lección) + salto a página
────────────────────────────────────────────────── */

function PdfView({ lessonTitle, onBack }) {
  const range = getPdfRangeForLesson(lessonTitle);
  const [page, setPage] = useState(() => (range?.start ? range.start : 1));
  const [probe, setProbe] = useState({ status: "idle", ok: false, reason: "", contentType: "" });

  useEffect(() => {
    setPage(range?.start ? range.start : 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonTitle]);

  const pdfUrl = APP_PDF.url;

  useEffect(() => {
    let alive = true;

    async function run() {
      setProbe({ status: "loading", ok: false, reason: "", contentType: "" });
      const r = await probePdfUrl(pdfUrl);
      if (!alive) return;
      setProbe({ status: "done", ok: !!r.ok, reason: r.reason || "", contentType: r.contentType || "" });
    }

    if (pdfUrl) run();

    return () => {
      alive = false;
    };
  }, [pdfUrl]);

  const canPrev = range ? page > range.start : page > 1;
  const canNext = range ? page < range.end : true;

  const hint = range
    ? `Rango sugerido: páginas ${range.start}–${range.end}`
    : "Esta lección aún no tiene rango de páginas asignado.";

  const openRaw = () => window.open(pdfUrl, "_blank", "noopener,noreferrer");

  const iframeSrc = `${pdfUrl}?opusPage=${page}#page=${page}`;
  const iframeKey = `${pdfUrl}::${page}`;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <Card className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-montserrat text-xl font-semibold text-opusBlueMain">📄 Libro (PDF)</h1>
            <p className="text-xs text-opusGrayDark mt-1">
              Lección: {lessonTitle || "—"} · {hint}
            </p>
          </div>

          <Button variant="ghost" size="sm" onClick={onBack}>
            ← Volver
          </Button>
        </div>

        {!pdfUrl ? (
          <div className="mt-5 text-sm text-opusGrayDark bg-opusGrayLight/30 border border-opusGrayLight/60 rounded-md p-4">
            <div className="font-montserrat font-semibold text-opusBlueMain mb-1">PDF no configurado</div>
            <p className="text-sm">
              Copie el PDF a <span className="font-semibold">public/content/pdfs/</span> y defina{" "}
              <span className="font-mono">APP_PDF.url</span>.
            </p>
          </div>
        ) : probe.status !== "done" ? (
          <div className="mt-5 text-sm text-opusGrayDark bg-opusGrayLight/30 border border-opusGrayLight/60 rounded-md p-4">
            Verificando disponibilidad del PDF…
          </div>
        ) : !probe.ok ? (
          <div className="mt-5 text-sm text-opusGrayDark bg-red-50 border border-red-200 rounded-md p-4">
            <div className="font-montserrat font-semibold text-red-700 mb-1">
              El PDF no se está sirviendo como PDF.
            </div>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>
                Ruta esperada:{" "}
                <span className="font-mono">public/content/pdfs/OPUS_RUSH_PROTOCOL_TEMPLATE_A4_ES.pdf</span>
              </li>
              <li>
                URL esperada:{" "}
                <span className="font-mono">/content/pdfs/OPUS_RUSH_PROTOCOL_TEMPLATE_A4_ES.pdf</span>
              </li>
              <li>
                Diagnóstico: <span className="font-semibold">{probe.reason}</span>
                {probe.contentType ? ` · content-type: ${probe.contentType}` : ""}
              </li>
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={openRaw}>
                Abrir URL del PDF (debug)
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setProbe({ status: "idle", ok: false, reason: "", contentType: "" })}
              >
                Reintentar
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => canPrev && setPage((p) => Math.max(range?.start || 1, p - 1))}
                  disabled={!canPrev}
                >
                  ← Página
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    canNext &&
                    setPage((p) => (range?.end ? Math.min(range.end, p + 1) : p + 1))
                  }
                  disabled={!canNext}
                >
                  Página →
                </Button>

                <Tag>Página: {page}</Tag>

                {range && (
                  <Tag className="hidden sm:inline">
                    Rango: {range.start}–{range.end}
                  </Tag>
                )}
              </div>

              <div className="text-[11px] text-opusGrayDark">{APP_PDF.label}</div>
            </div>

            <div className="mt-4 border border-opusGrayLight/70 rounded-xl overflow-hidden bg-white">
              <iframe
                key={iframeKey}
                title={`PDF – ${lessonTitle || "OPUS"}`}
                src={iframeSrc}
                className="w-full h-[75vh]"
              />
            </div>

            <div className="mt-3 flex justify-end">
              <Button variant="ghost" size="sm" onClick={openRaw}>
                Abrir PDF en pestaña nueva
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

/* ────────────────────────────────────────────────
   ROOT — APP
────────────────────────────────────────────────── */

export default function App() {
  const [view, setView] = useState(() => localStorage.getItem("opus.view") || "library");
  const [selectedCourse, setSelectedCourse] = useState(COURSES[0] || null);

  const [session, setSession] = useState(() =>
    safeJsonParse(localStorage.getItem(SESSION_STORAGE_KEY), null)
  );
  const isLoggedIn = !!session;

  useEffect(() => {
    const s = safeJsonParse(localStorage.getItem(SESSION_STORAGE_KEY), null);
    if (s && !s.username) {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      setSession(null);
    }
  }, []);

  const [selectedModuleIndex, setSelectedModuleIndex] = useState(() => {
    return Number(localStorage.getItem("opus.moduleIndex") || 0);
  });

  const [selectedLessonIndex, setSelectedLessonIndex] = useState(() => {
    return Number(localStorage.getItem("opus.lessonIndex") || 0);
  });

  const [completedKeys, setCompletedKeys] = useState(() => {
    const arr = safeJsonParse(localStorage.getItem("opus.completedLessons"), []);
    return new Set(Array.isArray(arr) ? arr : []);
  });

  useEffect(() => {
    localStorage.setItem("opus.completedLessons", JSON.stringify(Array.from(completedKeys)));
  }, [completedKeys]);

  useEffect(() => {
    localStorage.setItem("opus.view", view);
    localStorage.setItem("opus.moduleIndex", String(selectedModuleIndex));
    localStorage.setItem("opus.lessonIndex", String(selectedLessonIndex));
  }, [view, selectedModuleIndex, selectedLessonIndex]);

  const lessonKey = (mIdx, lIdx) => `${mIdx}-${lIdx}`;

  const getPrevLesson = (course, mIdx, lIdx) => {
    if (!course?.modules?.length) return null;
    if (lIdx > 0) return { m: mIdx, l: lIdx - 1 };

    if (mIdx > 0) {
      const prevMod = course.modules[mIdx - 1];
      const lastIndex = (prevMod?.lessons?.length || 1) - 1;
      return { m: mIdx - 1, l: Math.max(0, lastIndex) };
    }
    return null;
  };

  const isCompleted = (mIdx, lIdx) => completedKeys.has(lessonKey(mIdx, lIdx));

  const canAccess = (mIdx, lIdx) => {
    if (!selectedCourse) return true;
    if (isCompleted(mIdx, lIdx)) return true;

    const prev = getPrevLesson(selectedCourse, mIdx, lIdx);
    if (!prev) return true;

    return isCompleted(prev.m, prev.l);
  };

  const markCurrentLessonCompleted = () => {
    setCompletedKeys((prev) => {
      const next = new Set(prev);
      next.add(lessonKey(selectedModuleIndex, selectedLessonIndex));
      return next;
    });
  };

  const getCourseProgress = (course) => {
    const totalLessons = course.modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);

    let completedLessons = 0;
    let completedModules = 0;

    course.modules.forEach((m, mIdx) => {
      const moduleTotal = m.lessons?.length || 0;
      let moduleCompleted = 0;

      (m.lessons || []).forEach((_, lIdx) => {
        if (completedKeys.has(lessonKey(mIdx, lIdx))) {
          completedLessons += 1;
          moduleCompleted += 1;
        }
      });

      if (moduleTotal > 0 && moduleCompleted === moduleTotal) {
        completedModules += 1;
      }
    });

    const progress = totalLessons === 0 ? 0 : completedLessons / totalLessons;

    return {
      progress,
      totalLessons,
      completedLessons,
      totalModules: course.modules.length,
      completedModules,
    };
  };

  const currentModule = selectedCourse?.modules?.[selectedModuleIndex] || null;
  const currentLessonTitle = currentModule?.lessons?.[selectedLessonIndex] || "";

  const selectedCourseProgress = useMemo(() => {
    if (!selectedCourse) return null;
    return getCourseProgress(selectedCourse);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCourse, completedKeys]);

  const protectedViews = new Set(["course", "lesson", "quiz", "theory", "pdf"]);

  useEffect(() => {
    if (!isLoggedIn && protectedViews.has(view)) {
      localStorage.setItem(INTENDED_VIEW_KEY, view);
      setView("login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, view]);

  const login = ({ username }) => {
    const s = {
      token: makeToken(),
      username: username || "admin",
      createdAt: Date.now(),
    };
    setSession(s);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(s));

    const intended = localStorage.getItem(INTENDED_VIEW_KEY);
    localStorage.removeItem(INTENDED_VIEW_KEY);

    setView(intended && protectedViews.has(intended) ? intended : "library");
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem(SESSION_STORAGE_KEY);
    setView("library");
  };

  const handleOpenCourse = (course) => {
    setSelectedCourse(course);
    setSelectedModuleIndex(0);
    setSelectedLessonIndex(0);
    setView("course");
  };

  const handleStartCourse = () => {
    setSelectedModuleIndex(0);
    setSelectedLessonIndex(0);
    setView("lesson");
  };

  const handleSelectLesson = (moduleIndex, lessonIndex) => {
    if (!canAccess(moduleIndex, lessonIndex)) return;
    setSelectedModuleIndex(moduleIndex);
    setSelectedLessonIndex(lessonIndex);
    setView("lesson");
  };

  const handleOpenQuiz = () => setView("quiz");
  const handleBackToLesson = () => setView("lesson");

  const handleOpenTheory = () => setView("theory");
  const handleBackFromTheory = () => setView("lesson");

  const handleOpenPdf = () => setView("pdf");
  const handleBackFromPdf = () => setView("lesson");

  const renderView = () => {
    if (view === "login") {
      return <LoginView onLogin={login} onBackToLibrary={() => setView("library")} />;
    }

    if (view === "library") {
      return <LibraryView onOpenCourse={handleOpenCourse} getCourseProgress={getCourseProgress} />;
    }

    if (view === "course") {
      if (!selectedCourse || !selectedCourseProgress) return null;
      return (
        <CourseView
          course={selectedCourse}
          onStartCourse={handleStartCourse}
          progressInfo={selectedCourseProgress}
        />
      );
    }

    if (view === "lesson") {
      if (!selectedCourse) return null;
      return (
        <LessonView
          course={selectedCourse}
          moduleIndex={selectedModuleIndex}
          lessonIndex={selectedLessonIndex}
          onSelectLesson={handleSelectLesson}
          onOpenQuiz={handleOpenQuiz}
          onOpenTheory={handleOpenTheory}
          onOpenPdf={handleOpenPdf}
          canAccess={canAccess}
          isCompleted={isCompleted}
        />
      );
    }

    if (view === "quiz") {
      return (
        <QuizView
          onBackToLesson={handleBackToLesson}
          lessonTitle={currentLessonTitle}
          onPass={markCurrentLessonCompleted}
          onOpenTheory={handleOpenTheory}
          onOpenPdf={handleOpenPdf}
        />
      );
    }

    if (view === "theory") {
      return (
        <TheoryView
          lessonTitle={currentLessonTitle}
          onBack={handleBackFromTheory}
          onOpenPdf={handleOpenPdf}
        />
      );
    }

    if (view === "pdf") {
      return <PdfView lessonTitle={currentLessonTitle} onBack={handleBackFromPdf} />;
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[#f3f4f7] flex flex-col">
      <Header
        onChangeView={setView}
        isLoggedIn={isLoggedIn}
        userLabel={session?.username}
        onLoginClick={() => setView("login")}
        onLogout={logout}
      />

      <main className="flex-1 flex justify-center px-4 py-8">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-sm border border-opusGrayLight/40 overflow-hidden">
          {renderView()}
        </div>
      </main>

      <Footer />
    </div>
  );
}
