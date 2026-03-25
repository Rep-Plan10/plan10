import { useEffect, useState, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
import { WHATSAPP_URL } from "./constants";

const headline = "Realize seus sonhos sem pagar juros.";
const microTrust = [
  "Sem juros",
  "Sem entrada obrigatória",
  "Consultoria gratuita",
];

export default function LPHero() {
  const words = headline.split(" ");
  const [revealed, setRevealed] = useState(0);
  const allRevealed = revealed >= words.length;
  const [scrollY, setScrollY] = useState(0);
  const rafId = useRef(0);
  const { ref: orbsRef, style: orbsStyle } = useParallax(0.3);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(words.length);
      return;
    }
    const t = setInterval(() => {
      setRevealed((p) => {
        if (p >= words.length) { clearInterval(t); return p; }
        return p + 1;
      });
    }, 60);
    return () => clearInterval(t);
  }, [words.length]);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const textParallax = window.innerWidth >= 768 ? { transform: `translateY(${scrollY * -0.08}px)`, willChange: "transform" as const } : {};
  const scrollIndicatorOpacity = Math.max(0, 1 - scrollY / 300);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Gradient mesh with parallax */}
      <div className="absolute inset-0" ref={orbsRef} style={orbsStyle}>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[160px] animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[140px] animate-float" style={{ animationDelay: "3s" }} />
      </div>
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }} />

      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl" style={textParallax}>
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 bg-primary/20 border border-primary/40 rounded-full px-4 py-1.5 text-sm font-inter text-foreground mb-8 transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${allRevealed || revealed > 0 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}>
          🏆 Parceiro Oficial Porto Seguro
        </div>

        {/* Headline */}
        <h1 className="font-sora font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight mb-6">
          {words.map((w, i) => (
            <span
              key={i}
              className={`inline-block mr-[0.3em] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${i < revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[100%]"} ${w === "juros." ? "text-accent" : "text-foreground"}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {w}
            </span>
          ))}
        </h1>

        {/* Sub */}
        <p className={`text-lg md:text-xl text-muted-foreground font-inter leading-relaxed max-w-2xl mx-auto mb-10 transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${allRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
           style={{ transitionDelay: "400ms" }}>
          Consórcio de imóveis, veículos e serviços com as melhores condições do mercado. Consultoria especializada Plan10 + segurança Porto Seguro.
        </p>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-8 transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${allRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
             style={{ transitionDelay: "600ms" }}>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="cta-btn cta-glow-pulse bg-accent text-accent-foreground px-8 py-4 text-base md:text-lg font-bold font-inter rounded-lg min-h-[52px] flex items-center justify-center">
            Simular meu consórcio agora
          </a>
          <button onClick={() => document.querySelector("#como-funciona")?.scrollIntoView({ behavior: "smooth" })} className="cta-btn glass glass-hover px-8 py-4 text-base font-semibold text-foreground font-inter rounded-lg border-white/20 min-h-[52px]">
            Ver como funciona
          </button>
        </div>

        {/* Micro trust */}
        <div className={`flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-muted-foreground font-inter transition-all duration-600 ${allRevealed ? "opacity-100" : "opacity-0"}`}
             style={{ transitionDelay: "800ms" }}>
          {microTrust.map((t, i) => (
            <span key={t} className={`flex items-center gap-1.5 transition-all duration-500 ${allRevealed ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
                  style={{ transitionDelay: `${800 + i * 100}ms` }}>
              <Check size={16} className="text-accent" /> {t}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ opacity: scrollIndicatorOpacity }}>
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
