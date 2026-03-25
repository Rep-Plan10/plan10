import { Shield, Star, Award, Check, Clock, Zap, ShieldCheck, Users } from "lucide-react";

const items = [
  { icon: Shield, text: "Porto Seguro" },
  { icon: ShieldCheck, text: "SUSEP Credenciada" },
  { icon: Clock, text: "5+ Anos de Mercado" },
  { icon: Users, text: "Centenas de Clientes" },
  { icon: Star, text: "Atendimento Especializado" },
  { icon: Check, text: "Sem Juros" },
  { icon: Award, text: "Parceiro Oficial" },
  { icon: Zap, text: "Consultoria Gratuita" },
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <div className={`flex gap-8 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-2 whitespace-nowrap px-2">
            <item.icon size={16} className="text-accent shrink-0" />
            <span className="text-sm font-inter text-foreground/70">{item.text}</span>
            <span className="text-foreground/20 ml-2">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrustBar() {
  return (
    <section className="bg-bg-alt py-6 overflow-hidden border-y border-white/5">
      <MarqueeRow />
    </section>
  );
}
