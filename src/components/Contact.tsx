import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Mail, Instagram, Facebook } from "lucide-react";

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=5511938012222";

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
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    toast({ title: "Mensagem enviada com sucesso!", description: "Em breve um especialista entrará em contato." });
    setForm({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" });
    setErrors({});
  };

  const inputClass = (field: string) =>
    `w-full bg-white/5 border ${errors[field] ? "border-destructive" : "border-white/10"} rounded-lg px-4 py-3 text-sm text-foreground font-inter placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors`;

  const contactLinks = [
    { href: WHATSAPP_URL, target: "_blank", icon: MessageCircle, title: "WhatsApp", sub: "(11) 99105-1616" },
    { href: "mailto:contato@plan10.com.br", target: undefined, icon: Mail, title: "E-mail", sub: "contato@plan10.com.br" },
    { href: "https://instagram.com/plan10seguros", target: "_blank", icon: Instagram, title: "Instagram", sub: "@plan10seguros" },
    { href: "https://www.facebook.com/plan10seguros", target: "_blank", icon: Facebook, title: "Facebook", sub: "Plan10 Seguros" },
  ];

  return (
    <section id="contato" className="py-20 md:py-28 bg-bg-alt" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <h2 className="font-sora font-semibold text-3xl md:text-4xl text-foreground mb-4">
            Entre em <span className="text-accent">Contato</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-inter max-w-2xl mx-auto">
            Prefere preencher um formulário? Fale com a gente pelo canal que preferir.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={`lg:col-span-3 space-y-4 transition-all duration-800 ease-[cubic-bezier(0.4,0,0.2,1)] ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
          >
            <div className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`} style={{ transitionDelay: "80ms" }}>
              <input type="text" placeholder="Nome completo *" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className={inputClass("nome")} maxLength={100} />
              {errors.nome && <p className="text-xs text-destructive mt-1 font-inter">{errors.nome}</p>}
            </div>
            <div className={`grid sm:grid-cols-2 gap-4 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`} style={{ transitionDelay: "160ms" }}>
              <div>
                <input type="email" placeholder="E-mail *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass("email")} maxLength={255} />
                {errors.email && <p className="text-xs text-destructive mt-1 font-inter">{errors.email}</p>}
              </div>
              <div>
                <input type="tel" placeholder="Telefone / WhatsApp *" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: formatPhone(e.target.value) })} className={inputClass("telefone")} />
                {errors.telefone && <p className="text-xs text-destructive mt-1 font-inter">{errors.telefone}</p>}
              </div>
            </div>
            <div className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`} style={{ transitionDelay: "240ms" }}>
              <select value={form.assunto} onChange={(e) => setForm({ ...form, assunto: e.target.value })} className={inputClass("assunto")}>
                <option value="" disabled>Assunto *</option>
                {subjects.map((s) => (<option key={s} value={s}>{s}</option>))}
              </select>
              {errors.assunto && <p className="text-xs text-destructive mt-1 font-inter">{errors.assunto}</p>}
            </div>
            <div className={`transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`} style={{ transitionDelay: "320ms" }}>
              <textarea placeholder="Mensagem *" value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })} rows={4} className={inputClass("mensagem")} maxLength={1000} />
              {errors.mensagem && <p className="text-xs text-destructive mt-1 font-inter">{errors.mensagem}</p>}
            </div>
            <button
              type="submit"
              disabled={submitting}
              className={`cta-btn cta-glow-pulse w-full bg-accent text-accent-foreground py-3 text-base font-semibold font-inter disabled:opacity-50 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
              style={{ transitionDelay: "400ms" }}
            >
              {submitting ? "Enviando..." : "Enviar mensagem"}
            </button>
          </form>

          {/* Contact info */}
          <div className={`lg:col-span-2 space-y-6 transition-all duration-800 ease-[cubic-bezier(0.4,0,0.2,1)] ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}>
            {contactLinks.map((link, i) => (
              <a
                key={link.title}
                href={link.href}
                target={link.target}
                rel={link.target ? "noopener noreferrer" : undefined}
                className={`glass glass-hover rounded-lg p-5 flex items-center gap-4 group transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <link.icon className="text-accent shrink-0 transition-transform duration-200 group-hover:scale-110" size={24} />
                <div>
                  <p className="text-sm font-semibold text-foreground font-sora">{link.title}</p>
                  <p className="text-sm text-muted-foreground font-inter">{link.sub}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
