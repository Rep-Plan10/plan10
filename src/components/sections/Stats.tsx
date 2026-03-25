import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { useParallax } from "@/hooks/useParallax";

const stats = [
  { value: 5, suffix: "+", label: "Anos de mercado" },
  { value: 500, suffix: "+", label: "Clientes atendidos" },
  { value: 3, suffix: "", label: "Tipos de consórcio" },
  { value: 100, suffix: "%", label: "Sem juros" },
];

function StatItem({ value, suffix, label, trigger, delay }: { value: number; suffix: string; label: string; trigger: boolean; delay: number }) {
  const count = useCountUp(value, 2000, trigger);
  return (
    <div
      className={`text-center px-4 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${trigger ? "opacity-100 scale-100" : "opacity-0 scale-80"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="font-sora font-extrabold text-4xl md:text-5xl text-accent mb-2">
        {count}{suffix}
      </div>
      <div className="font-inter text-sm text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function Stats() {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const { ref: bgRef, style: bgStyle } = useParallax(0.2);

  return (
    <section className="py-16 md:py-20 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none" ref={bgRef} style={bgStyle}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-white/10 md:divide-x">
          {stats.map((s, i) => (
            <StatItem key={i} {...s} trigger={isVisible} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
