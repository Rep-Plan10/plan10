import { Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  { quote: "Fiz meu consórcio de imóvel com a Plan10 e foi a melhor decisão. Eles explicaram tudo com clareza e me ajudaram a planejar minha contemplação. Sem juros, sem enrolação.", name: "Marcos T.", type: "Consórcio Imobiliário" },
  { quote: "Queria comprar um carro novo mas não queria pagar juros absurdos. O consultor da Plan10 me mostrou o consórcio e foi perfeito para o meu planejamento.", name: "Juliana M.", type: "Consórcio Auto" },
  { quote: "Usei minha carta de crédito para fazer uma cirurgia que precisava há anos. Não sabia que consórcio servia para isso. A Plan10 me abriu os olhos!", name: "Roberto S.", type: "Consórcio Serviços" },
  { quote: "Processo simples, transparente e rápido. Fui contemplado por lance e já estou com meu apartamento. Recomendo demais!", name: "Ana Paula C.", type: "Consórcio Imobiliário" },
  { quote: "Empresa séria, transparente e que realmente se preocupa com o cliente. Já indiquei para toda a família.", name: "Diego F.", type: "Consórcio Auto" },
  { quote: "Atendimento excelente. Me ajudaram a entender cada detalhe antes de assinar. Confiança total.", name: "Fernanda R.", type: "Consórcio Imobiliário" },
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-accent text-accent" />)}
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: typeof testimonials; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <div className={`flex gap-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`} style={{ animationDuration: "40s" }}>
        {doubled.map((t, i) => (
          <div key={i} className="testimonial-card glass rounded-2xl p-5 w-[340px] shrink-0">
            <Stars />
            <p className="text-sm text-foreground/90 font-inter leading-relaxed mb-4">"{t.quote}"</p>
            <div>
              <span className="text-sm font-semibold text-foreground font-sora">{t.name}</span>
              <span className="text-xs text-muted-foreground font-inter ml-2">· {t.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LPTestimonials() {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <section className="py-20 md:py-28 bg-bg-alt overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 mb-12">
        <div className={`text-center transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <h2 className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">Quem já realizou sonhos com a Plan10</h2>
          <p className="text-lg md:text-xl text-muted-foreground font-inter">A maioria dos nossos clientes chega por indicação — e isso diz tudo.</p>
        </div>
      </div>
      <div className={`marquee-container space-y-4 transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <MarqueeRow items={testimonials.slice(0, 3)} />
        <MarqueeRow items={testimonials.slice(3)} reverse />
      </div>
    </section>
  );
}
