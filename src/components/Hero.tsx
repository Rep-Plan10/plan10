import { useEffect, useState, useRef } from "react";
import { useParallax } from "@/hooks/useParallax";

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=5511938012222";

const hubs = [
  { emoji: "🔵", label: "Seguros", color: "border-hub-seguros text-hub-seguros" },
  { emoji: "🟢", label: "Saúde", color: "border-hub-saude text-hub-saude" },
  { emoji: "🟣", label: "Financeiro", color: "border-hub-financeiro text-hub-financeiro" },
  { emoji: "🟠", label: "Consórcios", color: "border-hub-consorcios text-hub-consorcios" },
  { emoji: "⚫", label: "Serviços", color: "border-hub-servicos text-foreground/60" },
];

const headline = "O seu futuro MUITO mais tranquilo.";

export default function Hero() {
  const [revealedWords, setRevealedWords] = useState(0);
  const words = headline.split(" ");
  const allRevealed = revealedWords >= words.length;
  const [scrollY, setScrollY] = useState(0);
  const rafId = useRef(0);
  const { ref: orbsRef, style: orbsStyle } = useParallax(0.3);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setRevealedWords(words.length);
      return;
    }
    const timer = setInterval(() => {
      setRevealedWords((prev) => {
        if (prev >= words.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 60);
    return () => clearInterval(timer);
  }, [words.length]);

  // Scroll-based parallax for text + scroll indicator fade
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated gradient mesh with parallax */}
      <div className="absolute inset-0" ref={orbsRef} style={orbsStyle}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-accent/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: "4s" }} />
      </div>
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center" style={textParallax}>
        <h1 className="font-sora font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6 leading-tight">
          {words.map((word, i) => (
            <span
              key={i}
              className={`inline-block mr-[0.3em] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                i < revealedWords
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-[100%]"
              } ${word === "MUITO" ? "text-accent" : "text-foreground"}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {word}
            </span>
          ))}
        </h1>

        <p className={`max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 font-inter transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${allRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
           style={{ transitionDelay: "400ms" }}>
          Consultoria multimodal em planos de saúde, consórcios, seguros, produtos financeiros e serviços para residência e veículos. Comparamos as melhores opções do mercado para você.
        </p>

        <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${allRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
             style={{ transitionDelay: "600ms" }}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn cta-glow-pulse bg-accent text-accent-foreground px-8 py-4 text-base font-semibold font-inter"
          >
            Falar com Especialista
          </a>
          <button
            onClick={() => document.querySelector("#solucoes")?.scrollIntoView({ behavior: "smooth" })}
            className="cta-btn glass glass-hover px-8 py-4 text-base font-semibold text-foreground font-inter"
          >
            Conheça nossas soluções
          </button>
        </div>

        {/* Hub pills */}
        <div className={`flex flex-wrap justify-center gap-3 transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${allRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
             style={{ transitionDelay: "800ms" }}>
          {hubs.map((hub, i) => (
            <span
              key={hub.label}
              className={`glass border ${hub.color} px-4 py-2 text-sm font-inter rounded-full transition-all duration-500 ${allRevealed ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
              style={{ transitionDelay: `${800 + i * 100}ms` }}
            >
              {hub.emoji} {hub.label}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator with fade on scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity" style={{ opacity: scrollIndicatorOpacity }}>
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
