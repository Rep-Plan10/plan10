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
      <div className={`container mx-auto px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-14">
          <h2 className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">Como funciona o consórcio Plan10?</h2>
          <p className="text-lg md:text-xl text-muted-foreground font-inter">Simples, transparente e sem burocracia</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop line */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="relative flex flex-col items-center text-center" style={{ transitionDelay: `${i * 150}ms` }}>
                {/* Mobile connector */}
                {i > 0 && <div className="lg:hidden w-0.5 h-8 bg-accent/30 -mt-4 mb-2" />}
                <div className="w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xl font-bold font-sora z-10 relative mb-4 shrink-0">
                  {i + 1}
                </div>
                <span className="text-2xl mb-2">{s.emoji}</span>
                <h3 className="font-sora font-semibold text-base text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground font-inter leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-14">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-accent text-accent-foreground px-8 py-4 text-base font-bold font-inter rounded-lg glow-accent glow-hover hover:brightness-110 transition-all min-h-[52px]">
            Quero começar agora
          </a>
        </div>
      </div>
    </section>
  );
}
