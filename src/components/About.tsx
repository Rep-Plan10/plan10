import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
  { value: 5, suffix: "+", label: "Anos de mercado" },
  { value: 5, suffix: "", label: "Eixos de soluções" },
  { value: 100, suffix: "+", label: "Clientes atendidos" },
  { value: 20, suffix: "+", label: "Seguradoras parceiras" },
];

export default function About() {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <section id="sobre" className="py-20 md:py-28 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Text content - 60% */}
          <div className={`lg:col-span-3 transition-all duration-800 ease-[cubic-bezier(0.4,0,0.2,1)] ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <h2 className="font-sora font-semibold text-3xl md:text-4xl text-foreground mb-6">
              Quem é a <span className="text-accent">Plan10</span>?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed font-inter">
              <p>
                A Plan10 é uma consultoria e corretora multimodal especializada em proteção, planejamento e soluções integradas para pessoas, famílias e empresas. Com 5 anos de mercado, atuamos de forma independente, transparente e orientada por dados — conectando nossos clientes às melhores seguradoras, instituições financeiras e prestadores de serviços do país.
              </p>
              <p>
                Nosso modelo combina tecnologia, análise consultiva e atendimento humano, garantindo clareza, economia e tranquilidade em cada decisão.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mt-10">
              {[
                { title: "Nossa Missão", text: "Oferecer soluções completas e personalizadas em proteção, saúde, patrimônio e finanças, com transparência, ética e excelência." },
                { title: "Nossa Visão", text: "Ser referência nacional em consultoria multimodal, reconhecida pela qualidade do atendimento e pela capacidade de transformar complexidade em clareza." },
                { title: "Nossos Valores", text: "Transparência · Cuidado Humano · Excelência Técnica · Ética · Inovação" },
              ].map((card, i) => (
                <div
                  key={card.title}
                  className={`glass p-5 rounded-lg transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: isVisible ? `${400 + i * 100}ms` : "0ms" }}
                >
                  <h3 className="font-sora font-semibold text-accent text-sm mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground font-inter">{card.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats + Image - 40% */}
          <div className={`lg:col-span-2 space-y-6 transition-all duration-800 ease-[cubic-bezier(0.4,0,0.2,1)] ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
               style={{ transitionDelay: "200ms" }}>
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
              alt="Equipe profissional da Plan10 em reunião de consultoria"
              className="w-full rounded-lg glass object-cover h-52 lg:h-60"
              loading="lazy"
            />
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} {...stat} animate={isVisible} delay={i * 120} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, suffix, label, animate, delay }: { value: number; suffix: string; label: string; animate: boolean; delay: number }) {
  const count = useCountUp(value, 2000, animate);
  return (
    <div
      className={`glass p-5 rounded-lg text-center glass-hover transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${animate ? "opacity-100 scale-100" : "opacity-0 scale-80"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="font-sora font-bold text-3xl text-accent">
        {count}{suffix}
      </div>
      <div className="text-sm text-muted-foreground font-inter mt-1">{label}</div>
    </div>
  );
}
