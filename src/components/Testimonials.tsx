import { Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  { quote: "A Plan10 me ajudou a encontrar um plano de saúde com rede excelente e um preço que eu não imaginava conseguir. Atendimento impecável do início ao fim.", name: "Fernanda R.", segment: "Plano de Saúde Familiar" },
  { quote: "Fiz meu consórcio de imóvel com a Plan10 e foi a melhor decisão. Eles explicaram tudo com clareza e me ajudaram a planejar minha contemplação.", name: "Marcos T.", segment: "Consórcio Imobiliário" },
  { quote: "Troquei de seguro auto e economizei mais de R$ 800 por ano com cobertura melhor. Recomendo sem hesitar.", name: "Juliana M.", segment: "Seguro Auto" },
  { quote: "Precisei de assistência 24h e o atendimento foi rápido e eficiente. Valeu cada centavo.", name: "Roberto S.", segment: "Serviços Residenciais" },
  { quote: "A consultoria financeira da Plan10 me ajudou a reorganizar meu crédito com taxas muito melhores do que eu tinha.", name: "Ana Paula C.", segment: "Produtos Financeiros" },
  { quote: "Empresa séria, transparente e que realmente se preocupa com o cliente. Já indiquei para toda a família.", name: "Diego F.", segment: "Seguros Empresariais" },
];

function TestimonialCard({ quote, name, segment }: typeof testimonials[0]) {
  return (
    <div className="testimonial-card glass rounded-lg p-6 w-[340px] shrink-0 mx-3">
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} className="fill-accent text-accent" />
        ))}
      </div>
      <p className="text-sm text-muted-foreground font-inter leading-relaxed mb-4">"{quote}"</p>
      <div>
        <p className="font-sora font-semibold text-sm text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground font-inter">{segment}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation(0.15);
  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="depoimentos" className="py-20 md:py-28 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className={`text-center transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <h2 className="font-sora font-semibold text-3xl md:text-4xl text-foreground mb-4">
            O que nossos <span className="text-accent">clientes</span> dizem
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-inter max-w-2xl mx-auto">
            A maioria dos nossos clientes chega por indicação — e isso diz tudo.
          </p>
        </div>
      </div>

      <div className={`marquee-container transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        {/* Row 1: left to right */}
        <div className="flex animate-marquee mb-6" style={{ width: "max-content" }}>
          {doubledTestimonials.map((t, i) => (
            <TestimonialCard key={`r1-${i}`} {...t} />
          ))}
        </div>

        {/* Row 2: right to left */}
        <div className="flex animate-marquee-reverse" style={{ width: "max-content" }}>
          {doubledTestimonials.map((t, i) => (
            <TestimonialCard key={`r2-${i}`} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
