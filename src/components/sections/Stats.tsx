import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { value: 5, suffix: "+", label: "Anos de mercado" },
  { value: 500, suffix: "+", label: "Clientes atendidos" },
  { value: 3, suffix: "", label: "Tipos de consórcio" },
  { value: 100, suffix: "%", label: "Sem juros" },
];

function StatItem({ value, suffix, label, trigger }: { value: number; suffix: string; label: string; trigger: boolean }) {
  const count = useCountUp(value, trigger);
  return (
    <div className="text-center px-4">
      <div className="font-sora font-extrabold text-4xl md:text-5xl text-accent mb-2">
        {count}{suffix}
      </div>
      <div className="font-inter text-sm text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function Stats() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className="py-16 md:py-20" ref={ref}>
      <div className={`container mx-auto px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-white/10 md:divide-x">
          {stats.map((s, i) => (
            <StatItem key={i} {...s} trigger={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
