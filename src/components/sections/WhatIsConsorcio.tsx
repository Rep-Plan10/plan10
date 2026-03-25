import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Check, X } from "lucide-react";
import { WHATSAPP_URL } from "./constants";

const rows = [
  { label: "Juros", good: "Sem juros", bad: "Até 25% a.a." },
  { label: "Entrada", good: "Não obrigatória", bad: "Geralmente 20%+" },
  { label: "Flexibilidade", good: "Usa como quiser", bad: "Bem específico" },
  { label: "Custo total", good: "Muito menor", bad: "Até 2x o valor" },
  { label: "Contemplação", good: "Sorteio ou lance", bad: "—" },
];

export default function WhatIsConsorcio() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="py-20 md:py-28" ref={ref}>
      <div className={`container mx-auto px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-foreground text-center mb-6">
          O que é consórcio e por que é melhor que financiamento?
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 mt-12 items-start">
          {/* Left — text */}
          <div className="font-inter text-muted-foreground text-base md:text-lg leading-relaxed space-y-4">
            <p>O consórcio é a forma mais inteligente de adquirir bens e serviços. Você paga parcelas mensais <strong className="text-foreground">sem juros</strong>, entra em um grupo e pode ser contemplado por sorteio ou lance — e recebe uma carta de crédito para usar como quiser.</p>
            <p>Diferente do financiamento, você não paga juros bancários, não precisa de entrada e o custo total é significativamente menor. É ideal para quem planeja com inteligência.</p>
          </div>

          {/* Right — comparison */}
          <div className="glass rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 text-sm font-sora font-semibold">
              <div className="p-4 border-b border-white/10" />
              <div className="p-4 border-b border-white/10 text-accent text-center">Consórcio Plan10</div>
              <div className="p-4 border-b border-white/10 text-muted-foreground text-center">Financiamento</div>
            </div>
            {rows.map((r, i) => (
              <div key={i} className="grid grid-cols-3 text-sm font-inter border-b border-white/5 last:border-0">
                <div className="p-4 text-foreground/80 font-medium">{r.label}</div>
                <div className="p-4 text-center flex items-center justify-center gap-1.5">
                  <Check size={14} className="text-accent" />
                  <span className="text-foreground/90">{r.good}</span>
                </div>
                <div className="p-4 text-center flex items-center justify-center gap-1.5 text-muted-foreground">
                  {r.bad !== "—" && <X size={14} className="text-destructive/70" />}
                  <span>{r.bad}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-accent text-accent-foreground px-8 py-4 text-base font-bold font-inter rounded-lg glow-accent glow-hover hover:brightness-110 transition-all min-h-[52px]">
            Quero economizar com consórcio
          </a>
        </div>
      </div>
    </section>
  );
}
