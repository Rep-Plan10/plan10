import logo from "@/assets/plan10-logo-consorcio.png";
import { WHATSAPP_URL } from "./constants";

export default function LPHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/90 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <img
          src={logo}
          alt="Plan10 Consórcio"
          className="h-8 sm:h-10"
        />
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-btn bg-accent text-accent-foreground px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold font-inter rounded-lg"
        >
          Simular agora
        </a>
      </div>
    </header>
  );
}
