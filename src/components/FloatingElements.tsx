import { useState, useEffect } from "react";
import { MessageCircle, ArrowUp } from "lucide-react";

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=5511938012222";

export default function FloatingElements() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* WhatsApp button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-115 transition-transform duration-200 group"
        aria-label="Falar no WhatsApp"
        style={{ animation: "ctaGlowPulse 2s ease-in-out infinite", boxShadow: "0 0 20px rgba(37,211,102,0.3)" }}
      >
        <MessageCircle size={28} />
        <span className="absolute right-full mr-3 bg-background text-foreground text-xs font-inter px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none border border-white/10">
          Falar com especialista
        </span>
      </a>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center text-foreground hover:text-accent hover:scale-110 transition-all duration-300 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Voltar ao topo"
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}
