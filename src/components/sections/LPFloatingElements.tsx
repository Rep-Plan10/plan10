import { useState, useEffect } from "react";
import { MessageCircle, ArrowUp } from "lucide-react";
import { WHATSAPP_URL } from "./constants";

export default function LPFloatingElements() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 animate-pulse hover:scale-110 transition-transform group" aria-label="Falar com especialista no WhatsApp">
        <MessageCircle size={28} />
        <span className="absolute right-full mr-3 bg-background text-foreground text-xs font-inter px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
          Falar com especialista
        </span>
      </a>
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={`fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center text-foreground hover:text-accent transition-all duration-300 ${showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`} aria-label="Voltar ao topo">
        <ArrowUp size={20} />
      </button>
    </>
  );
}
