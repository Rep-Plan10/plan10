import { GitCompare, UserCheck, ShieldCheck, Clock, Zap, Award } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const benefits = [
  { icon: GitCompare, title: "Comparação Multimodal", desc: "Acesso às melhores condições Porto Seguro com análise personalizada para o seu perfil e objetivo." },
  { icon: UserCheck, title: "Consultoria Especializada", desc: "Especialistas dedicados que explicam cada detalhe — da parcela à contemplação — sem pressão e sem enrolação." },
  { icon: ShieldCheck, title: "Segurança Porto Seguro", desc: "Você contrata com a solidez e credibilidade da Porto Seguro, com o suporte próximo da Plan10." },
  { icon: Clock, title: "Acompanhamento Contínuo", desc: "Estamos com você do primeiro contato até a contemplação e uso da carta de crédito." },
  { icon: Zap, title: "Processo 100% Digital", desc: "Simulação, proposta e contratação online. Rápido, seguro e sem precisar sair de casa." },
  { icon: Award, title: "5 Anos de Mercado", desc: "Centenas de clientes contemplados e satisfeitos que nos recomendam por indicação." },
];

export default function Benefits() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="py-20 md:py-28 bg-bg-alt" ref={ref}>
      <div className={`container mx-auto px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-14">
          <h2 className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">Por que escolher a Plan10 para o seu consórcio?</h2>
          <p className="text-lg md:text-xl text-muted-foreground font-inter max-w-2xl mx-auto">Não somos apenas uma corretora — somos sua consultoria estratégica de patrimônio</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div key={i} className="glass rounded-2xl p-6 hover:border-accent/30 hover:shadow-[0_0_25px_rgba(242,140,40,0.08)] transition-all duration-300 group" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <b.icon size={22} className="text-accent" />
              </div>
              <h3 className="font-sora font-semibold text-lg text-foreground mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground font-inter leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
