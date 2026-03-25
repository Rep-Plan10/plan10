import { useState, useEffect } from "react";
import { MessageCircle, ArrowUp } from "lucide-react";

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=5511991051616";

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
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/30 animate-pulse hover:scale-110 transition-transform"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle size={28} />
      </a>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center text-foreground hover:text-accent transition-all duration-300 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Voltar ao topo"
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}
