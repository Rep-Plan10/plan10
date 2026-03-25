import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useParallax } from "@/hooks/useParallax";

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=5511991051616";

export default function FinalCTA() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { ref: bgRef, style: bgStyle } = useParallax(0.15);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary to-secondary relative overflow-hidden" ref={ref}>
      {/* Subtle pattern overlay with parallax */}
      <div className="absolute inset-0" ref={bgRef} style={bgStyle}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className={`font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 transition-all duration-800 ease-[cubic-bezier(0.4,0,0.2,1)] ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          Pronto para proteger o que mais importa?
        </h2>
        <p className={`text-lg md:text-xl text-foreground/80 font-inter max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
           style={{ transitionDelay: "150ms" }}>
          Fale agora com um especialista da Plan10. Sem compromisso, sem burocracia — só clareza e as melhores opções do mercado para você.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`cta-btn cta-glow-pulse inline-block bg-accent text-accent-foreground px-10 py-4 text-lg font-semibold font-inter transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
          style={{ transitionDelay: "300ms" }}
        >
          Falar com Especialista no WhatsApp
        </a>
        <p className={`text-sm text-foreground/60 font-inter mt-6 transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
           style={{ transitionDelay: "450ms" }}>
          Atendimento rápido · Comparação gratuita · Sem letras miúdas
        </p>
      </div>
    </section>
  );
}
