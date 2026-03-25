import { useState } from "react";
import { Check, Shield } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import { WHATSAPP_URL } from "./constants";

const tipoOptions = ["Imóveis", "Veículos", "Serviços", "Não sei ainda"];
const valorOptions = ["Até R$ 50 mil", "R$ 50k–150k", "R$ 150k–300k", "R$ 300k–500k", "Acima de R$ 500k"];
const benefits = [
  "Consultoria 100% gratuita",
  "Sem compromisso de contratação",
  "Comparamos as melhores opções Porto Seguro",
  "Especialista dedicado para o seu caso",
  "Processo simples e 100% digital",
  "Suporte do início à contemplação",
];

function phoneMask(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function LeadForm() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { toast } = useToast();
  const [form, setForm] = useState({ nome: "", whatsapp: "", tipo: "", valor: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nome.trim()) e.nome = "Informe seu nome";
    const digits = form.whatsapp.replace(/\D/g, "");
    if (digits.length < 10) e.whatsapp = "Informe um WhatsApp válido";
    if (!form.tipo) e.tipo = "Selecione o tipo";
    if (!form.valor) e.valor = "Selecione o valor";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    toast({ title: "✅ Recebemos sua solicitação!", description: "Um especialista Plan10 entrará em contato em breve pelo WhatsApp." });
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground font-inter text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all";

  return (
    <section className="py-20 md:py-28" ref={ref}>
      <div className={`container mx-auto px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div className="glass rounded-2xl p-6 md:p-8">
            <h2 className="font-sora font-bold text-2xl md:text-3xl text-foreground mb-2">Simule seu consórcio agora</h2>
            <p className="text-muted-foreground font-inter mb-6">Gratuito, sem compromisso e sem letras miúdas.</p>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-accent" />
                </div>
                <h3 className="font-sora font-bold text-xl text-foreground mb-2">Solicitação enviada!</h3>
                <p className="text-muted-foreground font-inter text-sm">Um especialista Plan10 entrará em contato em breve pelo WhatsApp.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input className={inputClass} placeholder="Nome completo" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
                  {errors.nome && <p className="text-destructive text-xs mt-1">{errors.nome}</p>}
                </div>
                <div>
                  <input className={inputClass} placeholder="WhatsApp (00) 00000-0000" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: phoneMask(e.target.value) })} />
                  {errors.whatsapp && <p className="text-destructive text-xs mt-1">{errors.whatsapp}</p>}
                </div>
                <div>
                  <select className={inputClass} value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
                    <option value="">Tipo de consórcio</option>
                    {tipoOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {errors.tipo && <p className="text-destructive text-xs mt-1">{errors.tipo}</p>}
                </div>
                <div>
                  <select className={inputClass} value={form.valor} onChange={(e) => setForm({ ...form, valor: e.target.value })}>
                    <option value="">Valor aproximado da carta</option>
                    {valorOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {errors.valor && <p className="text-destructive text-xs mt-1">{errors.valor}</p>}
                </div>
                <button type="submit" className="w-full bg-accent text-accent-foreground py-4 font-bold font-inter rounded-lg glow-accent glow-hover hover:brightness-110 transition-all min-h-[52px] text-base">
                  Quero minha simulação gratuita
                </button>
              </form>
            )}

            <p className="text-center mt-4 text-sm text-muted-foreground font-inter">
              Prefere falar agora?{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">WhatsApp direto →</a>
            </p>
          </div>

          {/* Right */}
          <div className="lg:pt-4">
            <h3 className="font-sora font-bold text-xl md:text-2xl text-foreground mb-6">Por que simular com a Plan10?</h3>
            <ul className="space-y-4 mb-8">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-foreground/90 font-inter text-sm">
                  <Check size={18} className="text-accent shrink-0 mt-0.5" /> {b}
                </li>
              ))}
            </ul>
            <div className="glass rounded-xl px-5 py-4 inline-flex items-center gap-3">
              <Shield size={20} className="text-primary" />
              <span className="text-sm font-inter text-foreground/80">Parceiro Oficial Porto Seguro</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
