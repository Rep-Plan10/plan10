import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown, Check, MessageCircle, ArrowDown, Shield, Phone, Star } from "lucide-react";
import planLogo from "@/assets/plan10-logo.png";
import portoBankLogo from "@/assets/porto-bank-logo.webp";

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

/* ───────────────────── PORTO BANK SVG ───────────────────── */
function PortoBankIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect rx="10" width="64" height="64" fill="white" fillOpacity="0.25" />
      <path d="M16 44C16 44 22 38 28 28C34 18 40 14 48 12" stroke="white" strokeWidth="4" strokeLinecap="round" />
      <path d="M16 36C16 36 22 30 28 22C34 14 40 12 48 12" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
      <path d="M16 28C16 28 24 22 30 18C36 14 42 12 48 12" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */
export default function Consorcio() {
  const [form, setForm] = useState({ tipo: "", valor: "", nome: "", telefone: "" });
  const [simCategoria, setSimCategoria] = useState<'imovel' | 'veiculo' | 'pesados'>('imovel');
  const [simFaixa, setSimFaixa] = useState(0);

  const formatCurrency = (raw: string): string => {
    const digits = raw.replace(/\D/g, '');
    if (!digits) return '';
    const number = parseInt(digits, 10);
    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const handleSimular = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const { tipo, valor, nome } = form;
    const msg = `Olá! Quero simular um Consórcio de ${tipo || "Imóvel"} no valor de ${valor || "—"}. Meu nome é ${nome || "—"}.`;
    window.open(`${WA_BASE}&text=${encodeURIComponent(msg)}`, "_blank");
  }, [form]);

  const scrollToSim = () => document.getElementById("simulacao")?.scrollIntoView({ behavior: "smooth" });

  /* ───────────────────── SIMULADOR DATA ───────────────────── */
  const simuladorData = {
    imovel: [
      {
        faixa: "R$ 70.000 a R$ 140.000",
        descricao: "Taxa adm 25% · Fundo Reserva 2% · Seguro 0,038%",
        colunas: ["Crédito", "Parcela sem Oferta", "Com Redução (5x entrada)", "Demais Parcelas"],
        linhas: [
          ["R$ 70.000", "R$ 1.889", "R$ 564", "R$ 284"],
          ["R$ 80.000", "R$ 2.159", "R$ 645", "R$ 325"],
          ["R$ 90.000", "R$ 2.429", "R$ 725", "R$ 365"],
          ["R$ 100.000", "R$ 2.699", "R$ 806", "R$ 406"],
          ["R$ 110.000", "R$ 2.969", "R$ 886", "R$ 446"],
          ["R$ 120.000", "R$ 3.239", "R$ 967", "R$ 487"],
          ["R$ 130.000", "R$ 3.509", "R$ 1.048", "R$ 528"],
          ["R$ 140.000", "R$ 3.779", "R$ 1.128", "R$ 568"],
        ]
      },
      {
        faixa: "R$ 140.000 a R$ 280.000",
        descricao: "Taxa adm 23% diluída · Fundo Reserva 2% · Seguro 0,038%",
        colunas: ["Crédito", "Parcela sem Oferta", "Parcela Reduzida + Entrada diluída"],
        linhas: [
          ["R$ 140.000", "R$ 3.763", "R$ 567"],
          ["R$ 150.000", "R$ 4.032", "R$ 608"],
          ["R$ 160.000", "R$ 4.301", "R$ 648"],
          ["R$ 170.000", "R$ 4.569", "R$ 689"],
          ["R$ 180.000", "R$ 4.838", "R$ 730"],
          ["R$ 190.000", "R$ 5.107", "R$ 770"],
          ["R$ 200.000", "R$ 5.376", "R$ 811"],
          ["R$ 210.000", "R$ 5.645", "R$ 851"],
          ["R$ 220.000", "R$ 5.913", "R$ 892"],
          ["R$ 230.000", "R$ 6.182", "R$ 932"],
          ["R$ 240.000", "R$ 6.451", "R$ 973"],
          ["R$ 250.000", "R$ 6.720", "R$ 1.013"],
          ["R$ 260.000", "R$ 6.989", "R$ 1.054"],
          ["R$ 270.000", "R$ 7.257", "R$ 1.095"],
          ["R$ 280.000", "R$ 7.526", "R$ 1.135"],
        ]
      },
      {
        faixa: "R$ 280.000 a R$ 560.000",
        descricao: "Taxa adm 21% (entrada 2% em 3x) · Fundo Reserva 2% · Seguro 0,038%",
        colunas: ["Crédito", "Parcela sem Oferta", "Com Redução (3x entrada)", "Demais Parcelas"],
        linhas: [
          ["R$ 280.000", "R$ 7.459", "R$ 2.948", "R$ 1.081"],
          ["R$ 300.000", "R$ 7.992", "R$ 3.158", "R$ 1.158"],
          ["R$ 320.000", "R$ 8.525", "R$ 3.369", "R$ 1.236"],
          ["R$ 340.000", "R$ 9.057", "R$ 3.580", "R$ 1.313"],
          ["R$ 360.000", "R$ 9.590", "R$ 3.790", "R$ 1.390"],
          ["R$ 380.000", "R$ 10.123", "R$ 4.001", "R$ 1.467"],
          ["R$ 400.000", "R$ 10.656", "R$ 4.211", "R$ 1.545"],
          ["R$ 420.000", "R$ 11.189", "R$ 4.422", "R$ 1.622"],
          ["R$ 440.000", "R$ 11.721", "R$ 4.632", "R$ 1.699"],
          ["R$ 460.000", "R$ 12.254", "R$ 4.843", "R$ 1.776"],
          ["R$ 480.000", "R$ 12.787", "R$ 5.054", "R$ 1.854"],
          ["R$ 500.000", "R$ 13.320", "R$ 5.264", "R$ 1.931"],
          ["R$ 520.000", "R$ 13.853", "R$ 5.475", "R$ 2.008"],
          ["R$ 540.000", "R$ 14.386", "R$ 5.685", "R$ 2.085"],
          ["R$ 560.000", "R$ 14.918", "R$ 5.896", "R$ 2.163"],
        ]
      },
      {
        faixa: "R$ 632.520 a R$ 948.780",
        descricao: "Taxa adm 19,5% diluída · Fundo Reserva 2% · Seguro 0,038%",
        colunas: ["Crédito", "Parcela sem Oferta", "Parcela Reduzida + Entrada diluída"],
        linhas: [
          ["R$ 632.520", "R$ 17.118", "R$ 2.627"],
          ["R$ 685.230", "R$ 18.545", "R$ 2.846"],
          ["R$ 737.940", "R$ 19.971", "R$ 3.065"],
          ["R$ 790.650", "R$ 21.398", "R$ 3.284"],
          ["R$ 843.360", "R$ 22.824", "R$ 3.503"],
          ["R$ 895.070", "R$ 24.224", "R$ 3.717"],
          ["R$ 948.780", "R$ 25.677", "R$ 3.940"],
        ]
      },
    ],
    veiculo: [
      {
        faixa: "R$ 25.000 a R$ 50.000",
        descricao: "Taxa adm 18% · Fundo Reserva 2% · Seguro 0,038%",
        colunas: ["Crédito", "Parcela sem Oferta", "Parcelas com Redução"],
        linhas: [
          ["R$ 25.000", "R$ 663", "R$ 370"],
          ["R$ 30.000", "R$ 796", "R$ 444"],
          ["R$ 35.000", "R$ 929", "R$ 518"],
          ["R$ 40.000", "R$ 1.061", "R$ 592"],
          ["R$ 45.000", "R$ 1.194", "R$ 666"],
          ["R$ 50.000", "R$ 1.327", "R$ 740"],
        ]
      },
      {
        faixa: "R$ 34.000 a R$ 65.000",
        descricao: "Taxa adm 18% · Lance Fixo 40% · Fundo Reserva 2% · Seguro 0,038%",
        colunas: ["Crédito", "Parcela sem Oferta", "Parcelas com Redução"],
        linhas: [
          ["R$ 34.000", "R$ 663", "R$ 371"],
          ["R$ 35.000", "R$ 682", "R$ 382"],
          ["R$ 40.000", "R$ 780", "R$ 437"],
          ["R$ 45.000", "R$ 877", "R$ 491"],
          ["R$ 50.000", "R$ 975", "R$ 546"],
          ["R$ 55.000", "R$ 1.072", "R$ 601"],
          ["R$ 60.000", "R$ 1.170", "R$ 655"],
          ["R$ 65.000", "R$ 1.267", "R$ 710"],
        ]
      },
      {
        faixa: "R$ 62.500 a R$ 125.000",
        descricao: "Taxa adm 16% · Fundo Reserva 2% · Seguro 0,038%",
        colunas: ["Crédito", "Parcela sem Oferta", "Parcelas com Redução"],
        linhas: [
          ["R$ 62.500", "R$ 998", "R$ 561"],
          ["R$ 72.500", "R$ 1.158", "R$ 651"],
          ["R$ 82.500", "R$ 1.317", "R$ 741"],
          ["R$ 92.500", "R$ 1.477", "R$ 831"],
          ["R$ 102.500", "R$ 1.637", "R$ 921"],
          ["R$ 112.500", "R$ 1.797", "R$ 1.011"],
          ["R$ 122.500", "R$ 1.956", "R$ 1.101"],
          ["R$ 125.000", "R$ 1.996", "R$ 1.123"],
        ]
      },
      {
        faixa: "R$ 125.000 a R$ 200.000",
        descricao: "Taxa adm 15% · Fundo Reserva 2% · Seguro 0,038%",
        colunas: ["Crédito", "Parcela sem Oferta", "Parcelas com Redução"],
        linhas: [
          ["R$ 125.000", "R$ 1.756", "R$ 990"],
          ["R$ 130.000", "R$ 1.826", "R$ 1.030"],
          ["R$ 140.000", "R$ 1.966", "R$ 1.109"],
          ["R$ 150.000", "R$ 2.107", "R$ 1.189"],
          ["R$ 160.000", "R$ 2.247", "R$ 1.268"],
          ["R$ 170.000", "R$ 2.388", "R$ 1.347"],
          ["R$ 180.000", "R$ 2.528", "R$ 1.426"],
          ["R$ 190.000", "R$ 2.669", "R$ 1.506"],
          ["R$ 200.000", "R$ 2.809", "R$ 1.585"],
        ]
      },
    ],
    pesados: [
      {
        faixa: "R$ 180.000 a R$ 260.000",
        descricao: "Taxa adm 14% · Lance Fixo 40% · Fundo Reserva 2% · Seguro 0,038%",
        colunas: ["Crédito", "Parcela sem Oferta", "Parcelas com Redução"],
        linhas: [
          ["R$ 180.000", "R$ 1.863", "R$ 1.060"],
          ["R$ 190.000", "R$ 1.967", "R$ 1.119"],
          ["R$ 200.000", "R$ 2.071", "R$ 1.178"],
          ["R$ 210.000", "R$ 2.174", "R$ 1.237"],
          ["R$ 220.000", "R$ 2.278", "R$ 1.296"],
          ["R$ 230.000", "R$ 2.381", "R$ 1.355"],
          ["R$ 240.000", "R$ 2.485", "R$ 1.414"],
          ["R$ 250.000", "R$ 2.588", "R$ 1.473"],
          ["R$ 260.000", "R$ 2.692", "R$ 1.532"],
        ]
      },
      {
        faixa: "R$ 270.000 a R$ 360.000",
        descricao: "Taxa adm 14% · Lance Fixo 40% · Fundo Reserva 2% · Seguro 0,038%",
        colunas: ["Crédito", "Parcela sem Oferta", "Parcelas com Redução"],
        linhas: [
          ["R$ 270.000", "R$ 2.795", "R$ 1.591"],
          ["R$ 280.000", "R$ 2.899", "R$ 1.650"],
          ["R$ 290.000", "R$ 3.003", "R$ 1.709"],
          ["R$ 300.000", "R$ 3.106", "R$ 1.768"],
          ["R$ 310.000", "R$ 3.210", "R$ 1.827"],
          ["R$ 320.000", "R$ 3.313", "R$ 1.886"],
          ["R$ 330.000", "R$ 3.417", "R$ 1.944"],
          ["R$ 340.000", "R$ 3.520", "R$ 2.003"],
          ["R$ 350.000", "R$ 3.624", "R$ 2.062"],
          ["R$ 360.000", "R$ 3.727", "R$ 2.121"],
        ]
      },
    ],
  };

  const categoriaLabels = { imovel: "Imóvel", veiculo: "Veículo", pesados: "Pesados" };
  const faixas = simuladorData[simCategoria];
  const faixaAtual = faixas[simFaixa];

  const handleCategoria = (cat: 'imovel' | 'veiculo' | 'pesados') => {
    setSimCategoria(cat);
    setSimFaixa(0);
  };

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
              <div className="flex flex-col items-center gap-3 mb-8">
                <div className="flex items-center gap-2 opacity-90">
                  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="8" fill="white" fillOpacity="0.2"/>
                    <path d="M7 33 C10 24 15 10 21 9 C27 8 33 18 33 18 C27 13 20 15 15 20 C10 25 7 33 7 33Z" fill="white"/>
                    <path d="M7 33 C11 26 17 19 23 17 C29 15 35 26 35 26 C29 21 21 22 17 26 C12 30 7 33 7 33Z" fill="white" fillOpacity="0.6"/>
                  </svg>
                  <span className="text-white font-bold text-xl tracking-wide">
                    Porto<span className="font-black">Bank</span>
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 bg-[#003087]/30 border border-[#003087]/60 rounded-full px-4 py-1.5">
                  <span className="text-[#4ade80] text-xs">✓</span>
                  <span className="text-white text-xs font-semibold">Parceiro Oficial Porto Bank</span>
                </div>
              </div>
            </Reveal>

            <TextReveal
              as="h1"
              text="Realize seus sonhos sem pagar juros."
              className="font-sora font-black text-4xl sm:text-5xl md:text-7xl leading-[1.15] pb-3 mb-6 max-w-4xl"
            />

            <Reveal delay={500} direction="up">
              <p className="text-base md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
                Consórcio de imóvel, veículo e pesados com parcelas inteligentes. Administrado pela Porto Bank — uma das maiores do Brasil.
              </p>
            </Reveal>

            <Reveal delay={650} direction="up">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
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

            {/* ── BANNER DE OFERTA ── */}
            <Reveal delay={700} direction="up">
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-xl px-4 py-2.5">
                  <span className="text-lg">🔥</span>
                  <span className="text-sm font-semibold text-foreground">Parcelas 45% menores até a contemplação</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-[#003087]/20 border border-[#003087]/40 rounded-xl px-4 py-2.5">
                  <span className="text-lg">💳</span>
                  <span className="text-sm font-semibold text-foreground">10% off na taxa adm com Cartão Porto</span>
                </div>
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

        {/* ═══════ SIMULADOR DE PARCELAS ═══════ */}
        <section id="simulador-parcelas" className="py-20 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <TextReveal as="h2" text="Simule sua parcela agora" className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-center mb-3" />
              <Reveal direction="up" delay={200}>
                <p className="text-center text-muted-foreground text-sm md:text-base mb-10">
                  Valores reais Porto Bank • Oferta válida até 30/04/2026
                </p>
              </Reveal>

              <Reveal direction="up" delay={300}>
                <div className="glass rounded-2xl p-6 md:p-8 border border-white/10">
                  {/* Tabs de categoria */}
                  <div className="flex gap-2 mb-6">
                    {([
                      { key: 'imovel' as const, emoji: '🏠', label: 'Imóvel' },
                      { key: 'veiculo' as const, emoji: '🚗', label: 'Veículo' },
                      { key: 'pesados' as const, emoji: '🚛', label: 'Pesados' },
                    ]).map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => handleCategoria(tab.key)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                          simCategoria === tab.key
                            ? "bg-accent text-accent-foreground"
                            : "bg-white/5 border border-white/10 text-foreground hover:bg-white/10"
                        }`}
                      >
                        <span>{tab.emoji}</span> {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Select de faixa */}
                  <div className="mb-6">
                    <label className="block text-xs text-muted-foreground mb-2 font-semibold">Escolha a faixa de crédito</label>
                    <select
                      value={simFaixa}
                      onChange={(e) => setSimFaixa(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
                    >
                      {faixas.map((f, i) => (
                        <option key={i} value={i}>{f.faixa}</option>
                      ))}
                    </select>
                  </div>

                  {/* Badges oferta */}
                  <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF6B00]/20 border border-[#FF6B00]/50">
                      <span className="text-lg">🔥</span>
                      <span className="text-white font-bold text-sm">Parcelas 45% menores até a contemplação</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/15">
                      <span className="text-lg">💳</span>
                      <span className="text-white font-semibold text-sm">10% off na taxa adm com Cartão Porto</span>
                    </div>
                  </div>

                  {/* Descrição da taxa */}
                  <p className="text-xs text-muted-foreground mb-4">{faixaAtual.descricao}</p>

                  {/* Tabela de parcelas */}
                  <div
                    key={`${simCategoria}-${simFaixa}`}
                    className="animate-fade-in border border-white/10 rounded-xl overflow-hidden mb-6"
                  >
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm" style={{ minWidth: "500px" }}>
                        <thead>
                          <tr>
                            {faixaAtual.colunas.map((col, ci) => {
                              const isStrike = col.toLowerCase().includes("sem oferta");
                              const isLast = ci === faixaAtual.colunas.length - 1 && ci > 0;
                              return (
                                <th
                                  key={ci}
                                  className={`px-4 py-3 text-left text-xs font-bold whitespace-nowrap ${
                                    isStrike
                                      ? "bg-accent text-accent-foreground"
                                      : isLast
                                      ? "bg-[#003087] text-white"
                                      : "bg-white/5 text-foreground"
                                  }`}
                                >
                                  {col}
                                </th>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {faixaAtual.linhas.map((row, ri) => (
                            <tr key={ri} className={ri % 2 === 0 ? "bg-white/[0.03]" : "bg-transparent"}>
                              {row.map((cell, ci) => {
                                const isStrike = faixaAtual.colunas[ci]?.toLowerCase().includes("sem oferta");
                                const isLast = ci === row.length - 1 && ci > 0;
                                return (
                                  <td
                                    key={ci}
                                    className={`px-4 py-3 whitespace-nowrap ${
                                      isStrike
                                        ? "line-through text-muted-foreground"
                                        : isLast
                                        ? "text-[#4ade80] font-bold"
                                        : "text-foreground/80"
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Lead capture */}
                  <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-white font-semibold text-center mb-4">
                      Gostou? Fale com um consultor e garanta essa condição
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                      <input
                        type="text"
                        placeholder="Seu nome"
                        value={leadNome}
                        onChange={(e) => setLeadNome(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm"
                      />
                      <input
                        type="tel"
                        placeholder="Seu WhatsApp"
                        value={leadTelefone}
                        onChange={(e) => setLeadTelefone(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm"
                      />
                    </div>
                    <button
                      onClick={() => {
                        const cat = categoriaLabels[simCategoria];
                        const faixa = faixaAtual?.faixa || '';
                        const msg = encodeURIComponent(
                          `Olá! Tenho interesse no Consórcio de ${cat} na faixa ${faixa}. Meu nome é ${leadNome || '(não informado)'}.`
                        );
                        window.open(`${WA_BASE}&text=${msg}`, '_blank');
                      }}
                      className="mt-3 w-full max-w-xl mx-auto block bg-[#FF6B00] hover:bg-[#e55e00] text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200"
                    >
                      Quero essa condição no WhatsApp
                    </button>
                  </div>

                  {/* Nota legal */}
                  <p className="text-[11px] text-muted-foreground text-center mt-4 leading-relaxed">
                    Valores para Pessoa Física. Parcelas reajustadas no aniversário do grupo. Para demais condições, consulte o Regulamento. Oferta válida até 30/04/2026.
                  </p>
                </div>
              </Reveal>
            </div>
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
                  emoji: "🚗", title: "Consórcio de Veículo", popular: false,
                  desc: "Do primeiro veículo à sua próxima troca. Você escolhe o modelo, a marca e recebe a carta de crédito para comprar à vista e negociar melhor.",
                  items: ["Créditos de R$ 30 mil a R$ 200 mil", "Parcelas a partir de R$ 380/mês", "Prazo de até 100 meses", "Veículo novo, usado ou importado"],
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
                <FaqItem q="Posso usar a carta de crédito para qualquer imóvel ou veículo?" a="Sim. A carta de crédito dá flexibilidade total — você escolhe o bem dentro da categoria contratada (imóvel, veículo ou pesados) no momento da contemplação." />
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
    </div>
  );
}
