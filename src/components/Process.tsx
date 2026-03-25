import { Search, BarChart3, Lightbulb, CheckCircle, Handshake } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  { icon: Search, emoji: "🔍", title: "Diagnóstico", desc: "Você nos conta sua necessidade, perfil e orçamento. Sem compromisso." },
  { icon: BarChart3, emoji: "📊", title: "Comparação", desc: "Analisamos as melhores opções do mercado para o seu caso específico." },
  { icon: Lightbulb, emoji: "💡", title: "Consultoria", desc: "Apresentamos as alternativas com clareza, sem letras miúdas ou pressão." },
  { icon: CheckCircle, emoji: "✅", title: "Contratação", desc: "Você escolhe e nós cuidamos de todo o processo de forma ágil e segura." },
  { icon: Handshake, emoji: "🤝", title: "Suporte Contínuo", desc: "Seguimos ao seu lado para renovações, sinistros e novas necessidades." },
];

export default function Process() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-bg-alt" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="font-sora font-semibold text-3xl md:text-4xl text-foreground mb-4">
            Como <span className="text-accent">funciona</span>?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-inter max-w-2xl mx-auto">
            Do primeiro contato à contratação — simples, rápido e sem burocracia
          </p>
        </div>

        {/* Desktop: horizontal */}
        <div className="hidden md:flex items-start justify-between max-w-5xl mx-auto relative">
          {/* Connecting line */}
          <div className="absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-accent/20 via-accent to-accent/20" />
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`flex flex-col items-center text-center w-1/5 relative z-10 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${i * 150}ms` : "0ms" }}
            >
              <div className="w-20 h-20 rounded-full glass flex items-center justify-center text-2xl mb-4 border-2 border-accent/30">
                {step.emoji}
              </div>
              <h3 className="font-sora font-semibold text-base text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground font-inter leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden space-y-0 relative max-w-sm mx-auto">
          {/* Vertical line */}
          <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/20 via-accent to-accent/20" />
          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`flex gap-5 items-start relative py-6 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: isVisible ? `${i * 150}ms` : "0ms" }}
            >
              <div className="w-20 h-20 rounded-full glass flex items-center justify-center text-2xl shrink-0 border-2 border-accent/30 relative z-10">
                {step.emoji}
              </div>
              <div>
                <h3 className="font-sora font-semibold text-base text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground font-inter leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
