import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { WHATSAPP_URL } from "./constants";

export default function LPFinalCTA() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary to-accent relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
      <div className={`container mx-auto px-4 text-center relative z-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
          Seu próximo patrimônio começa com uma simulação gratuita.
        </h2>
        <p className="text-lg md:text-xl text-foreground/80 font-inter max-w-2xl mx-auto mb-10 leading-relaxed">
          Fale agora com um especialista Plan10 e descubra a melhor carta de crédito para o seu objetivo.
        </p>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-background text-primary px-10 py-5 text-lg font-bold font-inter rounded-lg hover:scale-105 transition-all min-h-[52px]">
          Simular agora no WhatsApp
        </a>
        <p className="text-sm text-foreground/60 font-inter mt-6">Atendimento rápido · Sem compromisso · Consultoria gratuita</p>
      </div>
    </section>
  );
}
