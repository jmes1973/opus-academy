import opusLogo from "../assets/logos/Logo_OPUS_Academy_1280x720.png";
import volutracerLogo from "../assets/logos/Logo Volutracer OPUS.png";


export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-opusGrayLight/40 mt-8 py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-3">

        {/* Logos */}
        <div className="flex items-center justify-between w-full max-w-md">
          <img
            src={volutracerLogo}
            alt="Volutracer OPUS"
            className="h-10 opacity-90"
          />
          <img
            src={opusLogo}
            alt="OPUS Academy"
            className="h-10 opacity-90"
          />
        </div>

        {/* Separador */}
        <div className="h-px w-full bg-opusGrayLight/40 mt-3" />

        {/* Copyright */}
        <p className="text-xs text-opusGrayDark text-center">
          © {new Date().getFullYear()} Volutracer OPUS · OPUS Academy · Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
