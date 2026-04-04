/* eslint-disable */
import { useMemo, useState, useEffect } from "react";
import volutracerLogo from "./assets/logos/Logo Volutracer OPUS.png";
import opusLogo from "./assets/logos/Logo_OPUS_Academy_1280x720.png";
// import { STORAGE_KEYS, DEMO_CREDENTIALS } from "./shared/constants";
import { safeJsonParse, normalizeLessonKey } from "./shared/utils";
import { courses } from "./data/courses";
import { quizzesByLesson } from "./data/quizzes";
import { theoryByLesson } from "./data/theory";
import { objectivesByLesson } from "./data/objectives";
import { pdfRangesByLesson } from "./data/pdfRanges";

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
const PDF_RANGES_BY_LESSON = pdfRangesByLesson;

const VIDEO_BY_LESSON = {
  // Cuando existan:
  // "Vista paraesternal eje largo (PLAX) en shock": { type: "mp4", src: "/content/videos/rush/rush_m2_plax.mp4" },
};

/* ────────────────────────────────────────────────
   DATOS DE EJEMPLO — CURSO RUSH
────────────────────────────────────────────────── */

const COURSES = courses;

/* ────────────────────────────────────────────────
   OBJETIVOS (1 frase) – POR LECCIÓN
────────────────────────────────────────────────── */

const OBJECTIVE_BY_LESSON = objectivesByLesson;

/* ────────────────────────────────────────────────
   QUIZZES RUSH (1 pregunta por lección)
────────────────────────────────────────────────── */

const RUSH_QUIZZES = quizzesByLesson;

/* ────────────────────────────────────────────────
   TEORÍA AMPLIADA (bullets por lección)
   + Panel derecho toma “keyPoints” si existe
────────────────────────────────────────────────── */

const THEORY_BY_LESSON = theoryByLesson;

/* ────────────────────────────────────────────────
   HELPERS
────────────────────────────────────────────────── */



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



