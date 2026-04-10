import { Shield, Heart, TrendingUp, Landmark, Wrench } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=5511938012222";

const services = [
  {
    icon: Shield,
    title: "Seguros Gerais",
    color: "hub-seguros",
    desc: "Seguro auto, residencial, de vida e empresarial. Comparamos as principais seguradoras do mercado para garantir a melhor cobertura pelo menor custo. Suporte completo em sinistros.",
    cta: "Cotação de Seguro",
  },
  {
    icon: Heart,
    title: "Planos de Saúde",
    color: "hub-saude",
    desc: "Planos individuais, familiares, PME e empresariais. Orientamos sobre carências, redes credenciadas e reajustes para que você escolha com segurança e economia.",
    cta: "Comparar Planos",
  },
  {
    icon: TrendingUp,
    title: "Consórcios",
    color: "hub-consorcios",
    desc: "Consórcio de imóveis, veículos e serviços sem juros. Ideal para quem planeja aquisições com inteligência financeira e quer construir patrimônio de forma sustentável.",
    cta: "Simular Carta de Crédito",
  },
  {
    icon: Landmark,
    title: "Produtos Financeiros",
    color: "hub-financeiro",
    desc: "Crédito, financiamento e empréstimo com orientação especializada. Comparamos taxas e condições para que você tome a melhor decisão sem cair em armadilhas financeiras.",
    cta: "Simular Crédito",
  },
  {
    icon: Wrench,
    title: "Serviços para Residência e Veículos",
    color: "hub-servicos",
    desc: "Assistência 24h para emergências em casa e no carro: chaveiro, encanador, eletricista, guincho e muito mais. Praticidade e segurança no dia a dia.",
    cta: "Solicitar Assistência",
  },
];

const colorMap: Record<string, string> = {
  "hub-seguros": "hover:border-hub-seguros hover:shadow-[0_0_30px_hsl(var(--hub-seguros)/0.3)]",
  "hub-saude": "hover:border-hub-saude hover:shadow-[0_0_30px_hsl(var(--hub-saude)/0.3)]",
  "hub-consorcios": "hover:border-hub-consorcios hover:shadow-[0_0_30px_hsl(var(--hub-consorcios)/0.3)]",
  "hub-financeiro": "hover:border-hub-financeiro hover:shadow-[0_0_30px_hsl(var(--hub-financeiro)/0.3)]",
  "hub-servicos": "hover:border-hub-servicos hover:shadow-[0_0_30px_hsl(var(--hub-servicos)/0.3)]",
};

const titleHoverMap: Record<string, string> = {
  "hub-seguros": "group-hover:text-hub-seguros",
  "hub-saude": "group-hover:text-hub-saude",
  "hub-consorcios": "group-hover:text-hub-consorcios",
  "hub-financeiro": "group-hover:text-hub-financeiro",
  "hub-servicos": "group-hover:text-foreground/60",
};

const iconColorMap: Record<string, string> = {
  "hub-seguros": "text-hub-seguros",
  "hub-saude": "text-hub-saude",
  "hub-consorcios": "text-hub-consorcios",
  "hub-financeiro": "text-hub-financeiro",
  "hub-servicos": "text-foreground/60",
};

export default function Services() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="solucoes" className="py-20 md:py-28 bg-bg-alt" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <h2 className="font-sora font-semibold text-3xl md:text-4xl text-foreground mb-4">
            Nossas <span className="text-accent">Soluções</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-inter max-w-2xl mx-auto">
            Cinco eixos de negócio para proteger o que mais importa para você
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`service-card glass rounded-lg p-6 group ${colorMap[service.color]} ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${i >= 3 ? "sm:col-span-1 lg:last:col-start-2" : ""}`}
                style={{ transitionDelay: isVisible ? `${i * 150}ms` : "0ms", transitionDuration: "600ms", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)" }}
              >
                <Icon size={36} className={`${iconColorMap[service.color]} mb-4 service-icon`} />
                <h3 className={`font-sora font-semibold text-lg text-foreground mb-3 transition-colors duration-300 ${titleHoverMap[service.color]}`}>{service.title}</h3>
                <p className="text-sm text-muted-foreground font-inter leading-relaxed mb-5">{service.desc}</p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-btn inline-block bg-accent text-accent-foreground px-5 py-2.5 text-sm font-semibold font-inter"
                >
                  {service.cta}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
