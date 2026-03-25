import { GitCompare, UserCheck, ShieldCheck, Clock, Zap, Award } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const items = [
  { icon: GitCompare, title: "Comparação Multimodal", desc: "Acesso a múltiplas seguradoras e instituições financeiras em um único lugar. Você compara e escolhe com clareza." },
  { icon: UserCheck, title: "Atendimento Consultivo", desc: "Não vendemos produtos — construímos relações. Cada recomendação é feita com base no que realmente faz sentido para o seu momento." },
  { icon: ShieldCheck, title: "Independência e Transparência", desc: "Atuamos de forma independente, sem vínculo exclusivo com nenhuma seguradora. Sua proteção vem primeiro." },
  { icon: Clock, title: "Suporte Contínuo", desc: "Estamos com você antes, durante e depois da contratação — inclusive no momento do sinistro, quando mais importa." },
  { icon: Zap, title: "Tecnologia + Atendimento Humano", desc: "Combinamos ferramentas digitais com consultoria personalizada para entregar mais valor, agilidade e eficiência." },
  { icon: Award, title: "5 Anos de Mercado", desc: "Experiência consolidada, portfólio completo e centenas de clientes satisfeitos que nos recomendam por indicação." },
];

export default function Differentials() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="diferenciais" className="py-20 md:py-28" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <h2 className="font-sora font-semibold text-3xl md:text-4xl text-foreground mb-4">
            Por que escolher a <span className="text-accent">Plan10</span>?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-inter max-w-2xl mx-auto">
            Não somos uma corretora comum. Somos sua consultoria estratégica de proteção.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`diff-card glass rounded-lg p-6 transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: isVisible ? `${i * 100}ms` : "0ms" }}
              >
                <div className="diff-icon-wrap w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300">
                  <Icon size={32} className="text-accent" />
                </div>
                <h3 className="font-sora font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-inter leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
