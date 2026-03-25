import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Mail, Instagram, Facebook } from "lucide-react";

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=5511991051616";

const subjects = [
  "Planos de Saúde",
  "Consórcios",
  "Seguros Gerais",
  "Produtos Financeiros",
  "Serviços 24h",
  "Outro",
];

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { toast } = useToast();
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.nome.trim()) errs.nome = "Nome é obrigatório";
    if (!form.email.trim()) errs.email = "E-mail é obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "E-mail inválido";
    if (!form.telefone.trim()) errs.telefone = "Telefone é obrigatório";
    else if (form.telefone.replace(/\D/g, "").length < 10) errs.telefone = "Telefone inválido";
    if (!form.assunto) errs.assunto = "Selecione um assunto";
    if (!form.mensagem.trim()) errs.mensagem = "Mensagem é obrigatória";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Mock API call
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    toast({ title: "Mensagem enviada com sucesso!", description: "Em breve um especialista entrará em contato." });
    setForm({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" });
    setErrors({});
  };

  const inputClass = (field: string) =>
    `w-full bg-white/5 border ${errors[field] ? "border-destructive" : "border-white/10"} rounded-lg px-4 py-3 text-sm text-foreground font-inter placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors`;

  return (
    <section id="contato" className="py-20 md:py-28 bg-bg-alt" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="font-sora font-semibold text-3xl md:text-4xl text-foreground mb-4">
            Entre em <span className="text-accent">Contato</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-inter max-w-2xl mx-auto">
            Prefere preencher um formulário? Fale com a gente pelo canal que preferir.
          </p>
        </div>

        <div className={`grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-4">
            <div>
              <input type="text" placeholder="Nome completo *" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className={inputClass("nome")} maxLength={100} />
              {errors.nome && <p className="text-xs text-destructive mt-1 font-inter">{errors.nome}</p>}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <input type="email" placeholder="E-mail *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass("email")} maxLength={255} />
                {errors.email && <p className="text-xs text-destructive mt-1 font-inter">{errors.email}</p>}
              </div>
              <div>
                <input type="tel" placeholder="Telefone / WhatsApp *" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: formatPhone(e.target.value) })} className={inputClass("telefone")} />
                {errors.telefone && <p className="text-xs text-destructive mt-1 font-inter">{errors.telefone}</p>}
              </div>
            </div>
            <div>
              <select value={form.assunto} onChange={(e) => setForm({ ...form, assunto: e.target.value })} className={inputClass("assunto")}>
                <option value="" disabled>Assunto *</option>
                {subjects.map((s) => (<option key={s} value={s}>{s}</option>))}
              </select>
              {errors.assunto && <p className="text-xs text-destructive mt-1 font-inter">{errors.assunto}</p>}
            </div>
            <div>
              <textarea placeholder="Mensagem *" value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })} rows={4} className={inputClass("mensagem")} maxLength={1000} />
              {errors.mensagem && <p className="text-xs text-destructive mt-1 font-inter">{errors.mensagem}</p>}
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-accent text-accent-foreground py-3 text-base font-semibold font-inter hover:brightness-110 transition-all glow-hover disabled:opacity-50"
            >
              {submitting ? "Enviando..." : "Enviar mensagem"}
            </button>
          </form>

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="glass glass-hover rounded-lg p-5 flex items-center gap-4 group">
              <MessageCircle className="text-accent shrink-0" size={24} />
              <div>
                <p className="text-sm font-semibold text-foreground font-sora">WhatsApp</p>
                <p className="text-sm text-muted-foreground font-inter">(11) 99105-1616</p>
              </div>
            </a>
            <a href="mailto:contato@plan10.com.br" className="glass glass-hover rounded-lg p-5 flex items-center gap-4 group">
              <Mail className="text-accent shrink-0" size={24} />
              <div>
                <p className="text-sm font-semibold text-foreground font-sora">E-mail</p>
                <p className="text-sm text-muted-foreground font-inter">contato@plan10.com.br</p>
              </div>
            </a>
            <a href="https://instagram.com/plan10seguros" target="_blank" rel="noopener noreferrer" className="glass glass-hover rounded-lg p-5 flex items-center gap-4 group">
              <Instagram className="text-accent shrink-0" size={24} />
              <div>
                <p className="text-sm font-semibold text-foreground font-sora">Instagram</p>
                <p className="text-sm text-muted-foreground font-inter">@plan10seguros</p>
              </div>
            </a>
            <a href="https://www.facebook.com/plan10seguros" target="_blank" rel="noopener noreferrer" className="glass glass-hover rounded-lg p-5 flex items-center gap-4 group">
              <Facebook className="text-accent shrink-0" size={24} />
              <div>
                <p className="text-sm font-semibold text-foreground font-sora">Facebook</p>
                <p className="text-sm text-muted-foreground font-inter">Plan10 Seguros</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
