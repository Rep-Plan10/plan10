import { Home, Car, Sparkles, Check } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { WHATSAPP_URL } from "./constants";

const products = [
  {
    icon: Home,
    title: "Consórcio de Imóveis",
    badge: "Mais procurado",
    desc: "Realize o sonho da casa própria, compre um apartamento, terreno, construa ou invista em imóveis comerciais — sem juros e sem entrada obrigatória.",
    items: ["Apartamentos", "Casas", "Terrenos", "Construção"],
    cta: "Simular imóvel",
  },
  {
    icon: Car,
    title: "Consórcio de Veículos",
    badge: null,
    desc: "Do carro popular ao caminhão de frota — consórcio para todos os tipos de veículos com as melhores condições Porto Seguro.",
    items: ["Carros e Motos", "Caminhões e Ônibus", "Máquinas pesadas", "Frota empresarial", "Equipamentos"],
    cta: "Simular veículo",
  },
  {
    icon: Sparkles,
    title: "Consórcio de Serviços",
    badge: null,
    desc: "Use sua carta de crédito para realizar serviços e conquistas que transformam sua vida — do intercâmbio à reforma.",
    items: ["Cirurgias e saúde", "Cursos e educação", "Viagens", "Festas e eventos", "Eletrodomésticos e móveis", "Placas solares"],
    cta: "Simular serviço",
  },
];

export default function Products() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="py-20 md:py-28 bg-bg-alt" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-14 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <h2 className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">Escolha o consórcio ideal para você</h2>
          <p className="text-lg md:text-xl text-muted-foreground font-inter max-w-2xl mx-auto">Cartas de crédito para realizar qualquer objetivo — imóvel, veículo ou serviço</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <div
              key={i}
              className={`service-card glass rounded-2xl p-6 md:p-8 flex flex-col group transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-accent/30 hover:shadow-[0_0_30px_rgba(242,140,40,0.1)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: isVisible ? `${i * 150}ms` : "0ms" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                  <p.icon size={24} className="text-accent service-icon" />
                </div>
                {p.badge && (
                  <span className="text-xs font-sora font-semibold uppercase tracking-widest bg-accent/20 text-accent px-3 py-1 rounded-full">{p.badge}</span>
                )}
              </div>
              <h3 className="font-sora font-bold text-xl text-foreground mb-3 transition-colors duration-300 group-hover:text-accent">{p.title}</h3>
              <p className="text-sm text-muted-foreground font-inter leading-relaxed mb-5">{p.desc}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {p.items.map((item, j) => (
                  <li
                    key={item}
                    className={`flex items-center gap-2 text-sm font-inter text-foreground/80 transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"}`}
                    style={{ transitionDelay: isVisible ? `${i * 150 + 200 + j * 60}ms` : "0ms" }}
                  >
                    <Check size={14} className="text-accent shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="cta-btn w-full bg-accent text-accent-foreground py-3 text-center font-semibold font-inter rounded-lg min-h-[48px] flex items-center justify-center">
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
