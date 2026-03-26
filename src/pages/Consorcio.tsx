import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown, Check, MessageCircle, ArrowDown, Shield, Phone, Star } from "lucide-react";
import planLogo from "@/assets/plan10-logo.png";

/* ───────────────────── WHATSAPP ───────────────────── */
const WA_PHONE = "5511991051616";
const WA_BASE = `https://api.whatsapp.com/send/?phone=${WA_PHONE}`;

/* ───────────────────── HOOKS ───────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ───────────────────── TEXT REVEAL ───────────────────── */
function TextReveal({ text, as: Tag = "h2", className = "", baseDelay = 0 }: {
  text: string; as?: "h1" | "h2" | "h3"; className?: string; baseDelay?: number;
}) {
  const { ref, visible } = useReveal(0.2);
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-2 mr-[0.3em] last:mr-0">
          <span
            className="inline-block transition-all"
            style={{
              transform: visible ? "translateY(0)" : "translateY(110%)",
              opacity: visible ? 1 : 0,
              transitionProperty: "transform, opacity",
              transitionDuration: "0.7s",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: visible ? `${baseDelay + i * 80}ms` : "0ms",
            }}
          >
            {w}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/* ───────────────────── SCROLL REVEAL WRAPPER ───────────────────── */
function Reveal({ children, className = "", delay = 0, direction = "up" }: {
  children: React.ReactNode; className?: string; delay?: number;
  direction?: "up" | "left" | "right" | "none";
}) {
  const { ref, visible } = useReveal(0.15);
  const transform = {
    up: "translateY(30px)", left: "translateX(-30px)", right: "translateX(30px)", none: "none",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transform[direction],
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ───────────────────── FAQ ITEM ───────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left font-sora font-semibold text-base md:text-lg text-foreground hover:text-accent transition-colors"
      >
        {q}
        <ChevronDown
          size={20}
          className={`shrink-0 ml-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ maxHeight: open ? "300px" : "0", opacity: open ? 1 : 0 }}
      >
        <p className="pb-5 text-sm md:text-base text-muted-foreground font-inter leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* ───────────────────── TESTIMONIALS DATA ───────────────────── */
const testimonials = [
  { name: "Fernanda R.", role: "Plano de Saúde Familiar", text: "A Plan10 me ajudou a encontrar um plano de saúde com rede excelente e um preço que eu não imaginava conseguir. Atendimento impecável do início ao fim." },
  { name: "Marcos T.", role: "Consórcio Imobiliário", text: "Fiz meu consórcio de imóvel com a Plan10 e foi a melhor decisão. Eles explicaram tudo com clareza e me ajudaram a planejar minha contemplação." },
  { name: "Juliana M.", role: "Seguro Auto", text: "Troquei de seguro auto e economizei mais de R$ 800 por ano com cobertura melhor. Recomendo sem hesitar." },
  { name: "Roberto S.", role: "Serviços Residenciais", text: "Precisei de assistência 24h e o atendimento foi rápido e eficiente. Valeu cada centavo." },
  { name: "Ana Paula C.", role: "Produtos Financeiros", text: "A consultoria financeira da Plan10 me ajudou a reorganizar meu crédito com taxas muito melhores do que eu tinha." },
  { name: "Diego F.", role: "Seguros Empresariais", text: "Empresa séria, transparente e que realmente se preocupa com o cliente. Já indiquei para toda a família." },
];

function TestimonialCard({ name, role, text }: typeof testimonials[0]) {
  return (
    <div className="glass rounded-xl p-6 w-[320px] shrink-0 mx-3 testimonial-card">
      <div className="flex gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className="fill-accent text-accent" />
        ))}
      </div>
      <p className="text-sm text-muted-foreground font-inter leading-relaxed mb-4 italic">"{text}"</p>
      <div>
        <p className="font-sora font-semibold text-sm text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground font-inter">{role}</p>
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: typeof testimonials; reverse?: boolean }) {
  const quadrupled = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className={`flex ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ width: "max-content" }}
      >
        {quadrupled.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */
export default function Consorcio() {
  const [form, setForm] = useState({ tipo: "", valor: "", nome: "", telefone: "" });

  const handleSimular = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const { tipo, valor, nome } = form;
    const msg = `Olá! Quero simular um Consórcio de ${tipo || "Imóvel"} no valor de R$ ${valor || "—"}. Meu nome é ${nome || "—"}.`;
    window.open(`${WA_BASE}&text=${encodeURIComponent(msg)}`, "_blank");
  }, [form]);

  const scrollToSim = () => document.getElementById("simulacao")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
      {/* ───── MINI HEADER ───── */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-white/5">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="focus:outline-none cursor-pointer" aria-label="Ir para o início">
            <img src={planLogo} alt="Plan10" className="h-9" />
          </button>
          <button onClick={scrollToSim} className="cta-btn bg-accent text-accent-foreground px-5 py-2.5 rounded-lg text-sm font-bold">
            Simular agora
          </button>
        </div>
      </header>

      <main>
        {/* ═══════ HERO ═══════ */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* BG effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[100px]" />
            {[...Array(12)].map((_, i) => (
              <span
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white/20 animate-pulse"
                style={{
                  top: `${10 + Math.random() * 80}%`,
                  left: `${5 + Math.random() * 90}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 py-20 relative z-10">
            <Reveal delay={0} direction="up">
              <div className="inline-flex items-center gap-2 bg-[#003087]/30 border border-[#003087]/60 rounded-full px-4 py-2 mb-8">
                <Check size={14} className="text-white" />
                <span className="text-xs md:text-sm font-semibold text-white">Parceiro Oficial Porto Bank</span>
              </div>
            </Reveal>

            <TextReveal
              as="h1"
              text="Realize seus sonhos sem pagar juros."
              className="font-sora font-black text-4xl sm:text-5xl md:text-7xl leading-[1.15] pb-3 mb-6 max-w-4xl"
            />

            <Reveal delay={500} direction="up">
              <p className="text-base md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
                Consórcio de imóvel, carro e pesados com parcelas inteligentes. Administrado pela Porto Bank — uma das maiores do Brasil.
              </p>
            </Reveal>

            <Reveal delay={650} direction="up">
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button onClick={scrollToSim} className="cta-btn bg-accent text-accent-foreground px-8 py-4 rounded-xl text-base font-bold">
                  Quero simular agora
                </button>
                <a
                  href={WA_BASE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-btn border border-white/30 text-foreground px-8 py-4 rounded-xl text-base font-bold hover:bg-white/5 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Phone size={18} /> Falar com consultor
                </a>
              </div>
            </Reveal>

            <Reveal delay={800} direction="up">
              <div className="flex flex-wrap gap-3 md:gap-4">
                {["Sem juros", "Parcelas menores", "Carta de crédito garantida"].map((t) => (
                  <div
                    key={t}
                    className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-2"
                  >
                    <span className="text-accent text-sm">✦</span>
                    <span className="text-sm font-semibold text-foreground">{t}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Scroll arrow */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDown size={24} className="text-white/40" />
          </div>
        </section>

        {/* ═══════ CREDIBILIDADE ═══════ */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <TextReveal
              as="h2"
              text="Por que escolher o Consórcio Plan10?"
              className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-center mb-14"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { emoji: "🏆", title: "Porto Bank Oficial", desc: "Somos parceiros credenciados da Porto Bank, uma das maiores administradoras de consórcio do Brasil." },
                { emoji: "💰", title: "Zero Juros", desc: "Você não paga juros. Apenas taxa de administração competitiva e correção de índice padrão de mercado." },
                { emoji: "📋", title: "Flexibilidade Total", desc: "Planos de 60 a 200 meses. Créditos de R$ 50 mil até R$ 500 mil. Você escolhe o que cabe no seu bolso." },
                { emoji: "🤝", title: "Consultoria Gratuita", desc: "Nossa equipe te orienta do início ao fim sem custo adicional. Atendimento humano, não robótico." },
              ].map((c, i) => (
                <Reveal key={i} delay={i * 100} direction="up">
                  <div className="glass rounded-2xl p-6 h-full border border-white/8 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(242,140,40,0.08)] transition-all duration-300">
                    <span className="text-3xl mb-4 block">{c.emoji}</span>
                    <h3 className="font-sora font-bold text-lg text-foreground mb-2">{c.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ MODALIDADES ═══════ */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4">
            <TextReveal as="h2" text="Escolha seu consórcio" className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-center mb-4" />
            <Reveal direction="up" delay={200}>
              <p className="text-center text-muted-foreground text-lg mb-14 max-w-xl mx-auto">
                Cada sonho tem o plano certo. Conheça as modalidades:
              </p>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  emoji: "🏠", title: "Consórcio de Imóvel", popular: true,
                  desc: "Sua casa, apartamento, terreno ou reforma. Planejamento inteligente para você conquistar o imóvel certo no seu tempo, sem pagar juros de financiamento.",
                  items: ["Créditos de R$ 80 mil a R$ 500 mil", "Parcelas a partir de R$ 650/mês", "Prazo de até 200 meses", "Uso em imóvel comercial ou residencial"],
                  cta: "Simular Imóvel", solid: true,
                },
                {
                  emoji: "🚗", title: "Consórcio de Carro", popular: false,
                  desc: "Do primeiro carro à sua próxima troca. Você escolhe o modelo, a marca e recebe a carta de crédito para comprar à vista e negociar melhor.",
                  items: ["Créditos de R$ 30 mil a R$ 200 mil", "Parcelas a partir de R$ 380/mês", "Prazo de até 100 meses", "Carro novo, usado ou importado"],
                  cta: "Simular Veículo", solid: false,
                },
                {
                  emoji: "🚛", title: "Consórcio de Pesados", popular: false,
                  desc: "Caminhão, ônibus, trator ou máquina agrícola. Expanda sua frota com planejamento e sem comprometer o capital de giro da sua empresa.",
                  items: ["Créditos de R$ 100 mil a R$ 500 mil", "Parcelas a partir de R$ 900/mês", "Prazo de até 100 meses", "Pessoa física ou jurídica"],
                  cta: "Simular Pesados", solid: false,
                },
              ].map((p, i) => (
                <Reveal key={i} delay={i * 150} direction="up">
                  <div
                    className={`glass rounded-2xl p-6 md:p-8 flex flex-col h-full relative transition-all duration-300 hover:shadow-[0_0_30px_rgba(242,140,40,0.1)] ${
                      p.popular
                        ? "border-2 border-accent scale-[1.02] shadow-[0_0_30px_rgba(242,140,40,0.1)]"
                        : "border border-white/8 hover:border-accent/40"
                    }`}
                  >
                    {p.popular && (
                      <span className="absolute -top-3 right-6 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                        Mais popular
                      </span>
                    )}
                    <span className="text-4xl mb-4">{p.emoji}</span>
                    <h3 className="font-sora font-bold text-xl text-foreground mb-3">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.desc}</p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {p.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                          <Check size={14} className="text-accent shrink-0 mt-0.5" /> {item}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={scrollToSim}
                      className={`cta-btn w-full py-3 rounded-lg font-bold text-sm ${
                        p.solid
                          ? "bg-accent text-accent-foreground"
                          : "border border-accent text-accent hover:bg-accent/10"
                      }`}
                    >
                      {p.cta}
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ CONFIANÇA E SEGURANÇA ═══════ */}
        <section className="py-20 md:py-28 bg-white/[0.02]">
          <div className="container mx-auto px-4">
            <TextReveal as="h2" text="Do sonho ao patrimônio, a Plan10 está com você." className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-center mb-4" />
            <Reveal direction="up" delay={200}>
              <p className="text-center text-muted-foreground text-lg mb-14 max-w-xl mx-auto">
                Cuidamos de cada detalhe para que você conquiste o que realmente importa.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              {[
                { emoji: "🤝", title: "Consultoria personalizada", desc: "Especialistas que entendem seu momento de vida e indicam o melhor plano para você — sem pressão, sem enrolação." },
                { emoji: "⚡", title: "Contratação simples e rápida", desc: "Simule, escolha e assine 100% online. Em minutos você já sabe qual plano cabe no seu bolso." },
                { emoji: "🔒", title: "Segurança garantida", desc: "Todo o processo é regulamentado pelo Banco Central. Você investe com a segurança da Porto Bank por trás." },
              ].map((c, i) => (
                <Reveal key={i} delay={i * 150} direction="up" className="h-full">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-accent/40 transition-all duration-300 h-full flex flex-col">
                    <span className="text-5xl mb-5 block">{c.emoji}</span>
                    <h3 className="font-sora font-bold text-lg text-foreground mb-2">{c.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{c.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ COMO FUNCIONA ═══════ */}
        <section className="py-20 md:py-28 bg-white/[0.02]">
          <div className="container mx-auto px-4">
            <TextReveal as="h2" text="Como funciona o consórcio?" className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-center mb-14" />

            <div className="relative grid md:grid-cols-4 gap-8">
              {/* Desktop connector */}
              <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px border-t-2 border-dashed border-accent/30" />

              {[
                { n: "01", title: "Escolha seu sonho", desc: "Simule o valor do imóvel ou veículo desejado e encontre o plano ideal para o seu momento de vida." },
                { n: "02", title: "Entre no grupo", desc: "Você passa a fazer parte de um grupo com pessoas de objetivos similares e começa a pagar as parcelas mensais." },
                { n: "03", title: "Seja contemplado", desc: "Todo mês acontecem sorteios. Você também pode dar lances para antecipar sua contemplação." },
                { n: "04", title: "Use sua carta de crédito", desc: "Com a carta em mãos, você compra à vista e ainda tem poder de negociação para conseguir desconto." },
              ].map((s, i) => (
                <Reveal key={i} delay={i * 200} direction="up">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-sora font-bold text-lg mb-4 relative z-10">
                      {s.n}
                    </div>
                    <h3 className="font-sora font-semibold text-base text-foreground mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ SIMULADOR ═══════ */}
        <section id="simulacao" className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
            <div className="absolute top-0 left-0 w-1 h-full bg-accent/20 rounded-full" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <TextReveal as="h2" text="Simule seu consórcio agora" className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-center mb-4" />
            <Reveal direction="up" delay={200}>
              <p className="text-center text-muted-foreground text-lg mb-12">É gratuito, sem compromisso e sem burocracia.</p>
            </Reveal>

            <Reveal direction="up" delay={300}>
              <form onSubmit={handleSimular} className="max-w-xl mx-auto space-y-4">
                <select
                  value={form.tipo}
                  onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                >
                  <option value="">Qual tipo de consórcio?</option>
                  <option value="Imóvel">Imóvel</option>
                  <option value="Carro">Carro</option>
                  <option value="Pesados">Pesados</option>
                </select>
                {[
                  { key: "valor", placeholder: "Qual o valor do crédito desejado? (R$)", type: "text" },
                  { key: "nome", placeholder: "Seu nome", type: "text" },
                  { key: "telefone", placeholder: "Seu telefone (WhatsApp)", type: "tel" },
                ].map((f) => (
                  <input
                    key={f.key}
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3.5 text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                  />
                ))}
                <button type="submit" className="cta-btn w-full bg-accent text-accent-foreground py-4 rounded-xl font-bold text-base">
                  Quero minha simulação gratuita
                </button>
                <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                  <Shield size={14} /> Seus dados são usados apenas para contato. Não compartilhamos com terceiros.
                </p>
              </form>
            </Reveal>
          </div>
        </section>

        {/* ═══════ DEPOIMENTOS ═══════ */}
        <section className="py-20 md:py-28 overflow-hidden">
          <div className="container mx-auto px-4 mb-14">
            <TextReveal as="h2" text="O que nossos clientes dizem" className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-center mb-4" />
            <Reveal direction="up" delay={200}>
              <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto">
                A maioria dos nossos clientes chega por indicação — e isso diz tudo.
              </p>
            </Reveal>
          </div>

          <Reveal direction="none" delay={400}>
            <div className="marquee-container space-y-6">
              <MarqueeRow items={testimonials.slice(0, 3)} />
              <MarqueeRow items={testimonials.slice(3)} reverse />
            </div>
          </Reveal>
        </section>

        {/* ═══════ FAQ ═══════ */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-3xl">
            <TextReveal as="h2" text="Dúvidas frequentes" className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-center mb-14" />

            <Reveal direction="up">
              <div>
                <FaqItem q="Consórcio tem juros?" a="Não. O consórcio não cobra juros. Você paga apenas a taxa de administração e, em alguns planos, o seguro. É muito mais barato que um financiamento tradicional no longo prazo." />
                <FaqItem q="Quanto tempo levo para ser contemplado?" a="A contemplação pode acontecer no primeiro mês (por sorteio) ou você pode antecipar ofertando lances. Não há garantia de prazo, por isso o consórcio é indicado para quem tem planejamento." />
                <FaqItem q="Posso usar a carta de crédito para qualquer imóvel ou carro?" a="Sim. A carta de crédito dá flexibilidade total — você escolhe o bem dentro da categoria contratada (imóvel, carro ou pesados) no momento da contemplação." />
                <FaqItem q="E se eu precisar cancelar?" a="É possível cancelar o consórcio. Nesse caso, você recebe os valores pagos de volta ao final do grupo, com as devidas correções conforme o contrato." />
                <FaqItem q="Como a Plan10 me ajuda nesse processo?" a="Nossa equipe faz toda a consultoria gratuita: simulação, escolha do plano, acompanhamento até a contemplação e suporte no uso da carta de crédito. Você não fica sozinho em nenhum momento." />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════ CTA FINAL ═══════ */}
        <section className="py-20 md:py-28 bg-accent">
          <div className="container mx-auto px-4 text-center">
            <TextReveal as="h2" text="Pronto para conquistar seu sonho?" className="font-sora font-black text-3xl md:text-4xl lg:text-5xl text-accent-foreground mb-4" />
            <Reveal direction="up" delay={200}>
              <p className="text-accent-foreground/80 text-lg mb-8 max-w-xl mx-auto">
                Fale com um consultor Plan10 agora mesmo. Atendimento rápido, sem enrolação.
              </p>
            </Reveal>
            <Reveal direction="up" delay={350}>
              <a
                href={WA_BASE}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn inline-flex items-center gap-2 bg-white text-accent px-8 py-4 rounded-xl font-bold text-base"
              >
                <MessageCircle size={20} /> Falar no WhatsApp
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ───── MINI FOOTER ───── */}
      <footer className="bg-background py-10 border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <img src={planLogo} alt="Plan10" className="h-8 mx-auto mb-4" />
          <p className="text-sm text-muted-foreground mb-3">© 2026 Plan10 Seguros. Parceiro Oficial Porto Bank.</p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <a href="/privacidade" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Política de Privacidade</a>
            <span>|</span>
            <a href="/" className="hover:text-accent transition-colors">plan10.com.br</a>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Desenvolvido por{" "}
            <a
              href="https://nextcorporation.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors underline underline-offset-2"
            >
              Next Corporation
            </a>
          </p>
        </div>
      </footer>

      {/* ───── FLOATING WA ───── */}
      <a
        href={WA_BASE}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform group"
        aria-label="WhatsApp"
      >
        <MessageCircle size={26} className="text-white" />
        <span className="absolute right-full mr-3 bg-background/90 text-foreground text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Falar com especialista
        </span>
      </a>
    </div>
  );
}
