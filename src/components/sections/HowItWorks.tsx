import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { WHATSAPP_URL } from "./constants";

const steps = [
  { emoji: "🔍", title: "Diagnóstico gratuito", desc: "Você nos conta seu objetivo, prazo e orçamento. Sem compromisso." },
  { emoji: "📊", title: "Simulação personalizada", desc: "Apresentamos as melhores opções de carta de crédito para o seu perfil." },
  { emoji: "💡", title: "Consultoria clara", desc: "Explicamos tudo: parcelas, prazos, contemplação, lances e regras — sem letras miúdas." },
  { emoji: "✅", title: "Contratação segura", desc: "Você contrata com segurança Porto Seguro e suporte Plan10 em cada etapa." },
  { emoji: "🏆", title: "Contemplação e conquista", desc: "Acompanhamos você até a contemplação e uso da carta de crédito." },
];

export default function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="como-funciona" className="py-20 md:py-28" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-14 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <h2 className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">Como funciona o consórcio Plan10?</h2>
          <p className="text-lg md:text-xl text-muted-foreground font-inter">Simples, transparente e sem burocracia</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop line - animated */}
          <div
            className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 origin-left transition-transform duration-[1200ms] ease-out"
            style={{ transform: isVisible ? "scaleX(1)" : "scaleX(0)" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`process-step relative flex flex-col items-center text-center transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                style={{ transitionDelay: isVisible ? `${i * 200}ms` : "0ms" }}
              >
                {/* Mobile connector */}
                {i > 0 && <div className="lg:hidden w-0.5 h-8 bg-accent/30 -mt-4 mb-2" />}
                <div className="step-badge w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xl font-bold font-sora z-10 relative mb-4 shrink-0">
                  {i + 1}
                </div>
                <span className="text-2xl mb-2">{s.emoji}</span>
                <h3 className="font-sora font-semibold text-base text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground font-inter leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`text-center mt-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "500ms" }}>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="cta-btn cta-glow-pulse inline-flex items-center justify-center bg-accent text-accent-foreground px-8 py-4 text-base font-bold font-inter rounded-lg min-h-[52px]">
            Quero começar agora
          </a>
        </div>
      </div>
    </section>
  );
}
