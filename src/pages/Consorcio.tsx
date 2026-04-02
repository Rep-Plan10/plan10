import { useState, useEffect, useRef } from "react";
import { ChevronDown, Check, MessageCircle, ArrowDown, Star } from "lucide-react";

const plan10Logo = '/Plan10_-_Logo_Consorcio_01.png';
const portoLogo = '/Logo_porto_att.png';
const imgCasa = '/pngtree-new-house-png-image_12378684.png';
const imgCarro = '/f1d28ec7cf200232f761fc7820381a1b.png';
const imgCaminhao = '/caminhao-de-entrega-de-caixa-preta-em-fundo-branco_84443-13396.png';

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
  { name: "Fernanda Oliveira", role: "Plano de Saúde Familiar", text: "A Plan10 me ajudou a encontrar um plano de saúde com rede excelente e um preço que eu não imaginava conseguir. Atendimento impecável do início ao fim." },
  { name: "Marcos Teixeira", role: "Consórcio Imobiliário", text: "Fiz meu consórcio de imóvel com a Plan10 e foi a melhor decisão. Eles explicaram tudo com clareza e me ajudaram a planejar minha contemplação." },
  { name: "Juliana Moraes", role: "Seguro Auto", text: "Troquei de seguro auto e economizei mais de R$ 800 por ano com cobertura melhor. Recomendo sem hesitar." },
  { name: "Roberto Santana", role: "Serviços Residenciais", text: "Precisei de assistência 24h e o atendimento foi rápido e eficiente. Valeu cada centavo." },
  { name: "Ana Paula Carvalho", role: "Produtos Financeiros", text: "A consultoria financeira da Plan10 me ajudou a reorganizar meu crédito com taxas muito melhores do que eu tinha." },
  { name: "Diego Ferreira", role: "Seguros Empresariais", text: "Empresa séria, transparente e que realmente se preocupa com o cliente. Já indiquei para toda a família." },
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

/* ───────────────────── FAQ DATA ───────────────────── */
const faqItems = [
  { question: "O consórcio tem juros?", answer: "Não. O consórcio não cobra juros. Você paga apenas a taxa de administração e o fundo de reserva. Comparado ao financiamento tradicional, é muito mais econômico no longo prazo." },
  { question: "O consórcio é um bom investimento?", answer: "Sim. Além de ser uma forma disciplinada de poupar, o consórcio permite adquirir bens com poder de compra à vista — o que gera desconto real na negociação. É uma alternativa inteligente para quem não precisa do bem imediatamente." },
  { question: "O que vale mais a pena: consórcio ou financiamento?", answer: "Depende do seu momento. Se você precisa do bem agora, o financiamento pode ser necessário. Se tem planejamento, o consórcio sai muito mais barato — sem juros, apenas taxa administrativa." },
  { question: "Como ser contemplado no consórcio?", answer: "Existem duas formas: por sorteio mensal (qualquer cota pode ser contemplada) ou por lance — onde você oferta um valor antecipado para aumentar suas chances. Nos grupos em andamento da Porto Bank, as chances são maiores pois há menos cotas disponíveis." },
  { question: "Como funciona o lance no consórcio?", answer: "O lance é um valor que você oferta para antecipar sua contemplação. Pode ser com recurso próprio, FGTS (para imóveis) ou lance embutido (parte do próprio crédito). Quem oferta o maior percentual do crédito é contemplado." },
  { question: "Como funcionam os sorteios no consórcio?", answer: "Todo mês acontece uma assembleia onde cotas são contempladas por sorteio. Nos grupos Porto Bank em andamento, a entrega mensal de cotas varia por segmento: 3 a 5 por mês em imóveis, 4 a 6 em veículos e 2 a 4 em pesados." },
  { question: "Posso usar a carta de crédito para qualquer finalidade?", answer: "Dentro da categoria contratada, sim. Em imóveis: compra residencial, comercial, rural, terreno, construção, reforma e quitação de financiamento. Em veículos: automóveis, motos, náuticos e placas solares. Em pesados: caminhões, ônibus, máquinas agrícolas e industriais." },
  { question: "Todos são contemplados até o final do grupo?", answer: "Sim. Todos os participantes que mantiverem suas parcelas em dia serão contemplados até o encerramento do grupo — seja por sorteio ou lance." },
  { question: "O que é a taxa de administração do consórcio?", answer: "É a remuneração da administradora pelo gerenciamento do grupo. Na Porto Bank, varia conforme o tipo e prazo do consórcio. Para clientes Porto, há 10% de desconto sobre essa taxa." },
  { question: "Como a Plan10 me ajuda nesse processo?", answer: "Nossa equipe faz toda a consultoria gratuitamente: análise do seu perfil, escolha do grupo ideal, acompanhamento da contemplação e suporte no uso da carta de crédito. Você não fica sozinho em nenhum momento." },
  { question: "Qual o tempo médio de fechamento dos grupos de consórcio?", answer: "O prazo varia conforme o segmento e o grupo. Em imóveis, os grupos podem ter até 200 meses. Em veículos, até 100 meses. Em pesados, até 117 meses. Grupos em andamento já têm o prazo definido e você entra no tempo restante — o que pode significar mais chances de contemplação rápida." },
  { question: "O que é o fundo de reserva no consórcio?", answer: "É uma reserva financeira do grupo para cobrir inadimplências e garantir que todos os participantes sejam contemplados. Na Porto Bank, corresponde a 2% sobre o crédito e é cobrado junto com a parcela mensal." },
  { question: "Como solicitar o resgate de valores de um grupo já encerrado?", answer: "Após o encerramento do grupo, os valores são devolvidos conforme as condições do contrato. Para solicitações, entre em contato com sua administradora. Nossa equipe da Plan10 pode te orientar durante todo esse processo sem custo adicional." },
];

/* ───────────────────── BENEFÍCIOS POR CATEGORIA ───────────────────── */
const beneficiosPorCategoria = {
  imovel: {
    titulo: "Benefícios do Consórcio de Imóvel",
    itens: ["Créditos de R$ 70 mil a R$ 1 milhão", "Lance embutido de até 30% do crédito", "Use para imóvel residencial, comercial, terreno ou reforma", "Aceita FGTS para composição de lance", "3 a 5 cotas contempladas por mês"],
    paraQuem: "Para quem quer sair do aluguel ou investir em patrimônio."
  },
  veiculo: {
    titulo: "Benefícios do Consórcio de Veículo",
    itens: ["Créditos de R$ 25 mil a R$ 200 mil", "Lance embutido de até 30% do crédito", "Carro novo, usado, moto, náutico ou placas solares", "Sem entrada obrigatória", "4 a 6 cotas contempladas por mês"],
    paraQuem: "Para quem quer trocar ou comprar seu veículo sem juros."
  },
  pesados: {
    titulo: "Benefícios do Consórcio de Pesados",
    itens: ["Créditos de R$ 180 mil a R$ 360 mil", "Lance fixo de 40% disponível", "Caminhão, ônibus, máquinas agrícolas e industriais", "Pessoa física ou jurídica", "2 a 4 cotas contempladas por mês"],
    paraQuem: "Para empresários e transportadores que querem crescer."
  }
};

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */
export default function Consorcio() {
  const [simCategoria, setSimCategoria] = useState<'imovel' | 'veiculo' | 'pesados'>('imovel');
  const [simFaixa, setSimFaixa] = useState(0);
  const [simAberto, setSimAberto] = useState(false);
  const [leadNome, setLeadNome] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadTelefone, setLeadTelefone] = useState('');
  const [leadMensagem, setLeadMensagem] = useState('');
  const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, mins: 0, segs: 0 });

  /* Form states */
  const [formTipo, setFormTipo] = useState('');
  const [formCredito, setFormCredito] = useState('');
  const [formNome, setFormNome] = useState('');
  const [formWhatsApp, setFormWhatsApp] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMensagem, setFormMensagem] = useState('');
  const [tipoDropdownAberto, setTipoDropdownAberto] = useState(false);
  const [faixaDropdownAberto, setFaixaDropdownAberto] = useState(false);

  /* ── Close dropdown on outside click ── */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-tipo-dropdown]')) {
        setTipoDropdownAberto(false);
      }
    };
    if (tipoDropdownAberto) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [tipoDropdownAberto]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('[data-faixa-dropdown]')) {
        setFaixaDropdownAberto(false);
      }
    };
    if (faixaDropdownAberto) {
      document.addEventListener('mousedown', handler);
    }
    return () => document.removeEventListener('mousedown', handler);
  }, [faixaDropdownAberto]);

  /* ── Hero text reveal ── */
  const { ref: heroRevealRef, visible: heroVisible } = useReveal(0.2);

  useEffect(() => {
    document.title = "Plan10 Consórcio — Imóvel, Veículo e Pesados sem juros";
  }, []);

  /* ── Countdown ── */
  useEffect(() => {
    const target = new Date('2026-04-30T23:59:59');
    const timer = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) { clearInterval(timer); return; }
      setTimeLeft({
        dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
        horas: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        segs: Math.floor((diff % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const openSim = (cat: 'imovel' | 'veiculo' | 'pesados') => {
    setSimCategoria(cat);
    setSimFaixa(0);
    setSimAberto(true);
    setTimeout(() => {
      document.getElementById('simulador-parcelas')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const formatarCredito = (val: string) => {
    const digits = val.replace(/\D/g, '');
    if (!digits) return '';
    return parseInt(digits).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 });
  };

  const enviarFormulario = () => {
    if (!formNome || !formWhatsApp) return;
    const msg = encodeURIComponent(
      `Olá! Meu nome é ${formNome}.\n` +
      `Tipo de consórcio: ${formTipo || 'não informado'}.\n` +
      `Valor do crédito: ${formCredito || 'não informado'}.\n` +
      `WhatsApp: ${formWhatsApp}.\n` +
      `E-mail: ${formEmail || 'não informado'}.\n` +
      `${formMensagem ? 'Mensagem: ' + formMensagem : ''}`
    );
    window.open(`https://api.whatsapp.com/send/?phone=5511991051616&text=${msg}`, '_blank');
  };

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

  /* ── Card colors for "Por que escolher" ── */
  const cardColors = [
    { hover: "hover:border-[#003087]/40", bg: "hover:bg-[#003087]/5" },
    { hover: "hover:border-[#16a34a]/40", bg: "hover:bg-[#16a34a]/5" },
    { hover: "hover:border-[#7c3aed]/40", bg: "hover:bg-[#7c3aed]/5" },
    { hover: "hover:border-[#FF6B00]/40", bg: "hover:bg-[#FF6B00]/5" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
      {/* ───── MINI HEADER ───── */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-white/5">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="focus:outline-none cursor-pointer" aria-label="Ir para o início">
            <img src={plan10Logo} alt="Plan10 Consórcio" className="h-10 w-auto" />
          </button>
          <button onClick={() => openSim('imovel')} className="cta-btn bg-accent text-accent-foreground text-sm px-3 py-2 sm:px-5 sm:py-2.5 rounded-lg font-bold">
            Simular agora
          </button>
        </div>
      </header>

      <main>
        {/* ═══════ HERO ═══════ */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
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

          <div className="container mx-auto px-4 pt-12 pb-10 relative z-10">
            {/* ── COUNTDOWN ── */}
            <Reveal delay={0} direction="up">
              <div className="flex justify-center mb-6 w-full">
                <div className="flex items-center gap-1.5 flex-wrap justify-center py-2 px-3 rounded-lg bg-white/5 border border-white/10 w-fit">
                  <span className="text-gray-500 text-[10px] font-medium uppercase tracking-widest">
                    Termina em:
                  </span>
                  {[
                    { value: timeLeft.dias, label: 'dias' },
                    { value: timeLeft.horas, label: 'horas' },
                    { value: timeLeft.mins, label: 'mins' },
                    { value: timeLeft.segs, label: 'seg' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className="bg-[#1a1f2e] border border-white/10 rounded-md px-2 py-1 text-center min-w-[42px]">
                        <div className="text-white font-bold text-base font-mono leading-none">
                          {String(item.value).padStart(2, '0')}
                        </div>
                        <div className="text-gray-500 text-[9px] uppercase tracking-wider">
                          {item.label}
                        </div>
                      </div>
                      {i < 3 && (
                        <span className="text-[#FF6B00] font-bold text-sm">:</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={100} direction="up">
              <div className="flex flex-col items-start gap-3 mb-6">
                <img
                  src={portoLogo}
                  alt="Porto"
                  className="h-6 w-auto"
                  style={{ filter: 'brightness(0) invert(1)', opacity: 0.9 }}
                />
                <div className="inline-flex items-center gap-1.5 bg-[#003087]/30 border border-[#003087]/60 rounded-full px-4 py-1.5">
                  <span className="text-[#4ade80] text-xs font-bold">✓</span>
                  <span className="text-white text-xs font-semibold tracking-wide">Parceiro Oficial Porto Bank</span>
                </div>
              </div>
            </Reveal>

            <div ref={heroRevealRef}>
              <h1 className="font-sora font-black text-4xl sm:text-5xl md:text-6xl leading-[1.15] pb-3 mb-6 max-w-4xl">
                {[
                  { text: "Os", accent: false },
                  { text: "melhores", accent: false },
                  { text: "DESCONTOS", accent: true },
                  { text: "em", accent: false },
                  { text: "CONSÓRCIO", accent: true },
                  { text: "estão", accent: false },
                  { text: "aqui.", accent: false },
                ].map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden pb-2 mr-[0.3em] last:mr-0">
                    <span
                      className={`inline-block transition-all ${w.accent ? "text-[#FF6B00]" : ""}`}
                      style={{
                        transform: heroVisible ? "translateY(0)" : "translateY(110%)",
                        opacity: heroVisible ? 1 : 0,
                        transitionProperty: "transform, opacity",
                        transitionDuration: "0.7s",
                        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                        transitionDelay: heroVisible ? `${i * 80}ms` : "0ms",
                      }}
                    >
                      {w.text}
                    </span>
                  </span>
                ))}
              </h1>
            </div>

            <Reveal delay={500} direction="up">
              <p className="text-base md:text-xl text-muted-foreground max-w-2xl mb-6 leading-relaxed">
                Consórcios de Imóveis, veículos e pesados com reduções exclusivas nos grupos em andamento. Parcelas 45% menores até a contemplação.
              </p>
            </Reveal>

            {/* ── CTAs ── */}
            <Reveal delay={600} direction="up">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button onClick={() => openSim('imovel')} className="cta-btn bg-accent text-accent-foreground px-8 py-4 rounded-xl text-base font-bold">
                  Garantir minha cota agora
                </button>
                <a
                  href={WA_BASE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-btn bg-[#25D366] border border-[#25D366] text-white hover:bg-[#1ebe57] px-8 py-4 rounded-xl text-base font-bold transition-colors inline-flex items-center justify-center gap-2"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.559 4.14 1.535 5.874L0 24l6.278-1.518A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.213-3.727.901.949-3.624-.236-.373A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                  </svg>
                  Falar com consultor
                </a>
              </div>
            </Reveal>

            <Reveal delay={700} direction="up">
              <div className="flex flex-wrap gap-3 md:gap-4 mb-3">
                {["Cotas com desconto de 45%", "Contemplação antecipada possível", "Carta de crédito garantida"].map((t) => (
                  <div key={t} className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-2">
                    <span className="text-accent text-sm">✦</span>
                    <span className="text-sm font-semibold text-foreground">{t}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* ── BANNER DE OFERTA ── */}
            <Reveal delay={750} direction="up">
              <div className="flex flex-col-reverse md:flex-row gap-3 mb-3">
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF6B00]/20 border border-[#FF6B00]/50">
                  <span className="text-lg">🔥</span>
                  <span className="text-white font-bold text-sm">45% de desconto na parcela até a contemplação</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/15">
                  <span className="text-lg">💳</span>
                  <span className="text-white font-semibold text-sm">10% OFF na taxa adm para clientes Porto</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Scroll arrow */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDown size={24} className="text-white/40" />
          </div>
        </section>

        {/* ═══════ MODALIDADES (ESCOLHA SEU CONSÓRCIO) ═══════ */}
        <section className="py-14 md:py-28 bg-muted/30">
          <div className="container mx-auto px-4">
            <Reveal direction="up">
              <h2 className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-center mb-4">Escolha seu consórcio</h2>
            </Reveal>
            <Reveal direction="up" delay={200}>
              <p className="text-center text-muted-foreground text-lg mb-14 max-w-xl mx-auto">
                Cada sonho tem o plano certo. Conheça as modalidades:
              </p>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  emoji: "🏠", title: "Consórcio de Imóvel", popular: true, cat: 'imovel' as const,
                  desc: "Sua casa, apartamento, terreno ou reforma. Planejamento inteligente para você conquistar o imóvel certo no seu tempo, sem pagar juros de financiamento.",
                  items: ["Créditos de R$ 80 mil a R$ 500 mil", "Parcelas a partir de R$ 650/mês", "Prazo de até 200 meses", "Uso em imóvel comercial ou residencial"],
                  cta: "Simular Imóvel", solid: true,
                },
                {
                  emoji: "🚗", title: "Consórcio de Veículo", popular: false, cat: 'veiculo' as const,
                  desc: "Do primeiro veículo à sua próxima troca. Você escolhe o modelo, a marca e recebe a carta de crédito para comprar à vista e negociar melhor.",
                  items: ["Créditos de R$ 30 mil a R$ 200 mil", "Parcelas a partir de R$ 380/mês", "Prazo de até 100 meses", "Veículo novo, usado ou importado"],
                  cta: "Simular Veículo", solid: false,
                },
                {
                  emoji: "🚛", title: "Consórcio de Pesados", popular: false, cat: 'pesados' as const,
                  desc: "Caminhão, ônibus, trator ou máquina agrícola. Expanda sua frota com planejamento e sem comprometer o capital de giro da sua empresa.",
                  items: ["Créditos de R$ 100 mil a R$ 500 mil", "Parcelas a partir de R$ 900/mês", "Prazo de até 100 meses", "Pessoa física ou jurídica"],
                  cta: "Simular Pesados", solid: false,
                },
              ].map((p, i) => (
                <Reveal key={i} delay={i * 150} direction="up">
                  <div
                    className={`glass rounded-2xl p-6 md:p-8 flex flex-col items-center text-center h-full relative transition-all duration-300 hover:shadow-[0_0_30px_rgba(242,140,40,0.1)] ${
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
                    {p.cat === 'imovel' && (
                      <div className="w-full h-44 mb-4 flex items-center justify-center overflow-hidden rounded-xl">
                        <img src={imgCasa} alt="Imóvel" className="w-auto h-44 object-contain" style={{ mixBlendMode: 'screen' }} />
                      </div>
                    )}
                    {p.cat === 'veiculo' && (
                      <div className="w-full h-44 mb-4 flex items-center justify-center overflow-hidden rounded-xl">
                        <img src={imgCarro} alt="Veículo" className="w-auto h-40 object-contain" style={{ mixBlendMode: 'screen' }} />
                      </div>
                    )}
                    {p.cat === 'pesados' && (
                      <div className="w-full h-44 mb-4 flex items-center justify-center overflow-hidden rounded-xl">
                        <img src={imgCaminhao} alt="Pesados" className="w-auto h-40 object-contain" style={{ mixBlendMode: 'screen' }} />
                      </div>
                    )}
                    <h3 className="font-sora font-bold text-xl text-foreground mb-3 text-center">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 text-center">{p.desc}</p>
                    <ul className="space-y-2 mb-6 flex-1 text-left max-w-xs">
                      {p.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                          <Check size={14} className="text-accent shrink-0 mt-0.5" /> {item}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => openSim(p.cat)}
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

        {/* ═══════ SIMULADOR DE PARCELAS (condicional) ═══════ */}
        {simAberto && (
          <section id="simulador-parcelas" className="py-14 md:py-28 bg-muted/30 relative">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <button
                  onClick={() => setSimAberto(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1"
                >
                  ✕ Fechar simulação
                </button>

                <Reveal direction="up">
                  <h2 className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-center mb-3">Simule sua parcela agora</h2>
                </Reveal>
                <Reveal direction="up" delay={200}>
                  <p className="text-center text-muted-foreground text-sm md:text-base mb-10 px-2 break-words">
                    Valores reais Porto Bank • Oferta válida até 30/04/2026
                  </p>
                </Reveal>

                <Reveal direction="up" delay={300}>
                  <div className="glass rounded-2xl p-6 md:p-8 border border-white/10">
                    {/* Tabs de categoria */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {([
                        { key: 'imovel' as const, emoji: '🏠', label: 'Imóvel' },
                        { key: 'veiculo' as const, emoji: '🚗', label: 'Veículo' },
                        { key: 'pesados' as const, emoji: '🚛', label: 'Pesados' },
                      ]).map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => handleCategoria(tab.key)}
                          className={`flex-1 sm:flex-none justify-center flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                            simCategoria === tab.key
                              ? "bg-accent text-accent-foreground"
                              : "bg-white/5 border border-white/10 text-foreground hover:bg-white/10"
                          }`}
                        >
                          <span>{tab.emoji}</span> {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Select de faixa — dropdown customizado */}
                    <div className="mb-6 relative w-full" data-faixa-dropdown>
                      <p className="text-gray-400 text-xs mb-1.5 uppercase tracking-widest">
                        Escolha a faixa de crédito
                      </p>
                      <button
                        type="button"
                        onClick={() => setFaixaDropdownAberto(!faixaDropdownAberto)}
                        className="w-full flex items-center justify-between bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white text-sm font-medium hover:border-white/25 transition-colors duration-200 focus:outline-none"
                      >
                        <span>{simuladorData[simCategoria][simFaixa]?.faixa || 'Selecione a faixa'}</span>
                        <svg
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${faixaDropdownAberto ? 'rotate-180' : ''}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {faixaDropdownAberto && (
                        <div className="absolute z-50 w-full mt-1 bg-[#0d1117] border border-white/15 rounded-xl shadow-2xl overflow-hidden max-h-64 overflow-y-auto">
                          {simuladorData[simCategoria].map((faixa, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => {
                                setSimFaixa(index);
                                setFaixaDropdownAberto(false);
                              }}
                              className={`w-full text-left px-4 py-3 text-sm transition-colors duration-150 border-b border-white/5 last:border-0 ${
                                simFaixa === index
                                  ? 'bg-[#FF6B00]/20 text-[#FF6B00] font-semibold'
                                  : 'text-gray-200 hover:bg-white/[0.08] hover:text-white'
                              }`}
                            >
                              <span className="flex items-center justify-between">
                                <span>{faixa.faixa}</span>
                                {simFaixa === index && (
                                  <span className="text-[#FF6B00] text-xs">✓</span>
                                )}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Benefícios por categoria */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/[0.08] mb-4 transition-all duration-300" key={simCategoria}>
                      <p className="text-white font-semibold text-sm mb-3">
                        {beneficiosPorCategoria[simCategoria].titulo}
                      </p>
                      <ul className="space-y-1.5 mb-3">
                        {beneficiosPorCategoria[simCategoria].itens.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-300 text-xs">
                            <span className="text-[#FF6B00] mt-0.5 shrink-0">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="text-gray-500 text-xs italic">
                        {beneficiosPorCategoria[simCategoria].paraQuem}
                      </p>
                    </div>

                    {/* Descrição da taxa */}
                    <p className="text-xs text-muted-foreground mb-4">{faixaAtual.descricao}</p>

                    {/* Tabela de parcelas */}
                    <div
                      key={`${simCategoria}-${simFaixa}`}
                      className="animate-fade-in mb-6"
                    >
                      {/* MOBILE: cards empilhados */}
                      <div className="md:hidden space-y-2">
                        {faixaAtual.linhas.map((linha, i) => (
                          <div key={i} className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400 text-xs uppercase tracking-widest">Crédito</span>
                              <span className="text-white font-bold text-base">{linha[0]}</span>
                            </div>
                            {faixaAtual.colunas.slice(1).map((coluna, j) => {
                              const isRiscada = coluna.toLowerCase().includes('sem oferta');
                              const isDestaque = j === faixaAtual.colunas.length - 2;
                              return (
                                <div key={j} className="flex justify-between items-center border-t border-white/5 pt-2">
                                  <span className="text-gray-400 text-xs">{coluna}</span>
                                  <span className={
                                    isRiscada
                                      ? 'text-gray-500 text-sm line-through'
                                      : isDestaque
                                        ? 'text-[#4ade80] font-bold text-sm'
                                        : 'text-white text-sm'
                                  }>
                                    {linha[j + 1]}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>

                      {/* DESKTOP: tabela original */}
                      <div className="hidden md:block border border-white/10 rounded-xl overflow-hidden">
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
                          type="email"
                          placeholder="Seu e-mail"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
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
                      <textarea
                        placeholder="Mensagem (opcional) — ex: quero informações sobre imóvel"
                        value={leadMensagem}
                        onChange={(e) => setLeadMensagem(e.target.value)}
                        rows={2}
                        className="w-full max-w-xl mx-auto block mt-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm resize-none"
                      />
                      <button
                        onClick={() => {
                          const cat = categoriaLabels[simCategoria];
                          const faixa = faixaAtual?.faixa || '';
                          const msg = encodeURIComponent(
                            `Olá! Tenho interesse no Consórcio de ${cat} na faixa ${faixa}. Meu nome é ${leadNome || '(não informado)'}. E-mail: ${leadEmail || 'não informado'}.${leadMensagem ? ` Mensagem: ${leadMensagem}` : ''}`
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
        )}

        {/* ═══════ CREDIBILIDADE ═══════ */}
        <section className="py-14 md:py-28">
          <div className="container mx-auto px-4">
            <Reveal direction="up">
              <h2 className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-center mb-14">Por que escolher o Consórcio Plan10?</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { emoji: "🏆", title: "Porto Bank Oficial", desc: "Somos parceiros credenciados da Porto Bank, uma das maiores administradoras de consórcio do Brasil." },
                { emoji: "💰", title: "Zero Juros", desc: "Você não paga juros. Apenas taxa de administração competitiva e correção de índice padrão de mercado." },
                { emoji: "📋", title: "Flexibilidade Total", desc: "Planos de 60 a 200 meses. Créditos de R$ 50 mil até R$ 500 mil. Você escolhe o que cabe no seu bolso." },
                { emoji: "🤝", title: "Consultoria Gratuita", desc: "Nossa equipe te orienta do início ao fim sem custo adicional. Atendimento humano, não robótico." },
              ].map((c, i) => (
                <Reveal key={i} delay={i * 100} direction="up">
                  <div className={`glass rounded-2xl p-6 h-full border border-white/8 hover:shadow-[0_0_20px_rgba(242,140,40,0.08)] transition-all duration-300 ${cardColors[i].hover} ${cardColors[i].bg}`}>
                    <span className="text-3xl mb-4 block">{c.emoji}</span>
                    <h3 className="font-sora font-bold text-lg text-foreground mb-2">{c.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ CONFIANÇA E SEGURANÇA ═══════ */}
        <section className="py-14 md:py-28 bg-white/[0.02]">
          <div className="container mx-auto px-4">
            <Reveal direction="up">
              <h2 className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-center mb-4">O seu futuro muito mais tranquilo.</h2>
            </Reveal>
            <Reveal direction="up" delay={200}>
              <p className="text-center text-muted-foreground text-lg mb-14 max-w-xl mx-auto">
                Do sonho ao patrimônio, a Plan10 está com você em cada etapa.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6 items-stretch">
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
        <section className="py-14 md:py-28 bg-white/[0.02]">
          <div className="container mx-auto px-4">
            <Reveal direction="up">
              <h2 className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-center mb-14">Como funciona o consórcio?</h2>
            </Reveal>

            <div className="relative grid md:grid-cols-4 gap-6 md:gap-8">
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

            {/* CTA Como Funciona */}
            <div className="flex justify-center mt-10">
              <a
                href="https://api.whatsapp.com/send/?phone=5511991051616&text=Ol%C3%A1!%20Quero%20escolher%20meu%20cons%C3%B3rcio%20agora."
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn inline-flex items-center gap-2 bg-[#FF6B00] hover:bg-[#e55e00] text-white font-bold px-10 py-4 rounded-full transition-colors duration-200 text-base"
              >
                Escolher o meu patrimônio agora
                <span>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ═══════ DEPOIMENTOS ═══════ */}
        <section className="py-14 md:py-28 overflow-hidden">
          <div className="container mx-auto px-4 mb-14">
            <Reveal direction="up">
              <h2 className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-center mb-4">O que nossos clientes dizem</h2>
            </Reveal>
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

        {/* ═══════ SEGURO DE VIDA PORTO ═══════ */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 bg-[#003087]/20 border border-[#003087]/40 rounded-full px-4 py-1.5 mb-4">
                <img src={portoLogo} alt="Porto" className="h-3.5 w-auto" style={{ filter: 'brightness(0) invert(1)' }} />
                <span className="text-white text-xs font-semibold">Produto Complementar</span>
              </span>
              <h2 className="font-sora font-bold text-2xl md:text-3xl text-white mb-3">
                Proteja sua família enquanto conquista seu patrimônio
              </h2>
              <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
                Combine seu consórcio com o Seguro de Vida Porto e garanta tranquilidade em cada etapa da sua jornada.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {/* Plano R$50 mil */}
              <div className="glass rounded-2xl p-6 border border-white/10 flex flex-col transition-all duration-300 hover:border-white/20">
                <div className="text-center mb-6">
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Plano</p>
                  <p className="text-white font-bold text-2xl">R$ 50 mil</p>
                </div>
                <div className="space-y-3 flex-1">
                  {[
                    ['Morte (qualquer causa)', 'R$ 50.000'],
                    ['Invalidez por acidente', 'Até R$ 50.000'],
                    ['Assistência funeral', 'R$ 5.000'],
                    ['Porto Plus', 'Incluso'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-gray-400 text-sm">{label}</span>
                      <span className="text-white text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <p className="text-gray-400 text-xs mb-1">A partir de</p>
                  <p className="text-[#FF6B00] font-bold text-xl mb-4">R$ 14,52/mês</p>
                  <a
                    href="https://api.whatsapp.com/send/?phone=5511991051616&text=Ol%C3%A1!%20Tenho%20interesse%20no%20Seguro%20de%20Vida%20Porto%20-%20Plano%20R%24%2050%20mil."
                    target="_blank" rel="noopener noreferrer"
                    className="block w-full bg-white/10 hover:bg-[#FF6B00] text-white font-bold py-3 rounded-xl transition-colors duration-200 text-sm text-center"
                  >
                    Quero este plano
                  </a>
                </div>
              </div>

              {/* Plano R$100 mil — destaque */}
              <div className="glass rounded-2xl p-6 border border-[#FF6B00]/50 flex flex-col relative transition-all duration-300 hover:border-[#FF6B00]/80">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#FF6B00] text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    Melhor Custo-benefício
                  </span>
                </div>
                <div className="text-center mb-6 mt-2">
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Plano</p>
                  <p className="text-white font-bold text-2xl">R$ 100 mil</p>
                </div>
                <div className="space-y-3 flex-1">
                  {[
                    ['Morte (qualquer causa)', 'R$ 100.000'],
                    ['Invalidez por acidente', 'Até R$ 100.000'],
                    ['Assistência funeral', 'R$ 5.000'],
                    ['Porto Plus', 'Incluso'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-gray-400 text-sm">{label}</span>
                      <span className="text-white text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <p className="text-gray-400 text-xs mb-1">A partir de</p>
                  <p className="text-[#FF6B00] font-bold text-xl mb-4">R$ 21,20/mês</p>
                  <a
                    href="https://api.whatsapp.com/send/?phone=5511991051616&text=Ol%C3%A1!%20Tenho%20interesse%20no%20Seguro%20de%20Vida%20Porto%20-%20Plano%20R%24%20100%20mil."
                    target="_blank" rel="noopener noreferrer"
                    className="block w-full bg-[#FF6B00] hover:bg-[#e55e00] text-white font-bold py-3 rounded-xl transition-colors duration-200 text-sm text-center"
                  >
                    Quero este plano
                  </a>
                </div>
              </div>

              {/* Plano R$150 mil */}
              <div className="glass rounded-2xl p-6 border border-white/10 flex flex-col relative transition-all duration-300 hover:border-white/20">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-white/10 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap border border-white/20">
                    O Mais Escolhido
                  </span>
                </div>
                <div className="text-center mb-6 mt-2">
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Plano</p>
                  <p className="text-white font-bold text-2xl">R$ 150 mil</p>
                </div>
                <div className="space-y-3 flex-1">
                  {[
                    ['Morte (qualquer causa)', 'R$ 150.000'],
                    ['Invalidez por acidente', 'Até R$ 150.000'],
                    ['Assistência funeral', 'R$ 5.000'],
                    ['Porto Plus', 'Incluso'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-gray-400 text-sm">{label}</span>
                      <span className="text-white text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <p className="text-gray-400 text-xs mb-1">A partir de</p>
                  <p className="text-[#FF6B00] font-bold text-xl mb-4">R$ 27,77/mês</p>
                  <a
                    href="https://api.whatsapp.com/send/?phone=5511991051616&text=Ol%C3%A1!%20Tenho%20interesse%20no%20Seguro%20de%20Vida%20Porto%20-%20Plano%20R%24%20150%20mil."
                    target="_blank" rel="noopener noreferrer"
                    className="block w-full bg-white/10 hover:bg-[#FF6B00] text-white font-bold py-3 rounded-xl transition-colors duration-200 text-sm text-center"
                  >
                    Quero este plano
                  </a>
                </div>
              </div>
            </div>

            <p className="text-gray-500 text-xs text-center mt-6">
              * Valores para Pessoa Física. Sujeito a análise de perfil. Fale com nosso consultor para mais detalhes.
            </p>
          </div>
        </section>

        {/* ═══════ FORMULÁRIO DE LEAD COMPLETO ═══════ */}
        <section className="py-14 md:py-20 bg-white/[0.02]">
          <div className="container mx-auto px-4 max-w-xl">
            <div className="text-center mb-8">
              <h2 className="font-sora font-bold text-2xl md:text-3xl text-white mb-3">
                Receba uma proposta personalizada
              </h2>
              <p className="text-gray-400 text-sm">
                Preencha abaixo e nosso consultor entra em contato em até 1 hora útil.
              </p>
            </div>
            <div className="glass rounded-2xl p-6 md:p-8 border border-white/10 space-y-4">
              {/* Dropdown customizado — tipo de consórcio */}
              <div className="relative w-full" data-tipo-dropdown>
                <button
                  type="button"
                  onClick={() => setTipoDropdownAberto(!tipoDropdownAberto)}
                  className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm hover:border-white/20 transition-colors duration-200 focus:outline-none focus:border-accent"
                >
                  <span className={formTipo ? 'text-white' : 'text-gray-500'}>
                    {formTipo || 'Selecione o tipo de consórcio'}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${tipoDropdownAberto ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {tipoDropdownAberto && (
                  <div className="absolute z-50 w-full mt-1 bg-[#0d1117] border border-white/15 rounded-lg shadow-2xl overflow-hidden">
                    {[
                      { value: '', label: 'Selecione o tipo de consórcio', disabled: true },
                      { value: 'Imóvel', label: '🏠  Consórcio de Imóvel' },
                      { value: 'Veículo', label: '🚗  Consórcio de Veículo' },
                      { value: 'Pesados', label: '🚛  Consórcio de Pesados' },
                      { value: 'Seguro de Vida', label: '🛡️  Seguro de Vida Porto' },
                      { value: 'Outros', label: '✨  Outros consórcios' },
                    ].map((option) => (
                      <button
                        key={option.value || 'placeholder'}
                        type="button"
                        disabled={option.disabled}
                        onClick={() => {
                          if (!option.disabled) {
                            setFormTipo(option.value);
                            setTipoDropdownAberto(false);
                          }
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors duration-150 border-b border-white/5 last:border-0 ${
                          option.disabled
                            ? 'text-gray-600 cursor-default'
                            : formTipo === option.value
                              ? 'bg-[#FF6B00]/20 text-[#FF6B00] font-medium'
                              : 'text-gray-200 hover:bg-white/[0.08] hover:text-white'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <input
                type="text"
                inputMode="numeric"
                placeholder="Valor da carta de crédito (R$)"
                value={formCredito}
                onChange={(e) => setFormCredito(formatarCredito(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:border-accent focus:outline-none"
              />

              <input
                type="text"
                placeholder="Nome completo"
                value={formNome}
                onChange={(e) => setFormNome(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:border-accent focus:outline-none"
              />

              <input
                type="tel"
                placeholder="WhatsApp (com DDD)"
                value={formWhatsApp}
                onChange={(e) => setFormWhatsApp(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:border-accent focus:outline-none"
              />

              <input
                type="email"
                placeholder="E-mail"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:border-accent focus:outline-none"
              />

              <textarea
                placeholder="Mensagem (opcional) — ex: tenho interesse em imóvel para reforma"
                value={formMensagem}
                onChange={(e) => setFormMensagem(e.target.value)}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm resize-none focus:border-accent focus:outline-none"
              />

              <div className="bg-white/5 rounded-xl p-4 space-y-1.5">
                <p className="text-[#FF6B00] text-xs font-semibold uppercase tracking-widest mb-2">
                  Informações importantes
                </p>
                {[
                  'A carta de crédito pode ser usada para diversas finalidades (reforma, terreno, etc.)',
                  'Condição por tempo limitado: válida até 30 de abril de 2026.',
                  'Taxa de administração a partir de 25%.',
                ].map((info, i) => (
                  <p key={i} className="text-gray-400 text-xs flex items-start gap-2">
                    <span className="text-[#FF6B00] shrink-0 mt-0.5">*</span>
                    {info}
                  </p>
                ))}
              </div>

              <button
                onClick={enviarFormulario}
                className="w-full bg-[#FF6B00] hover:bg-[#e55e00] text-white font-bold py-4 rounded-xl transition-colors duration-200 text-base"
              >
                Enviar e falar com consultor
              </button>

              <p className="text-gray-500 text-xs text-center">
                🔒 Seus dados são usados apenas para contato. Não compartilhamos com terceiros.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════ FAQ ═══════ */}
        <section className="py-14 md:py-28">
          <div className="container mx-auto px-4 max-w-3xl">
            <Reveal direction="up">
              <h2 className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-center mb-14">Dúvidas frequentes</h2>
            </Reveal>

            <Reveal direction="up">
              <div>
                {faqItems.map((item, i) => (
                  <FaqItem key={i} q={item.question} a={item.answer} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════ ATUAMOS TAMBÉM EM ═══════ */}
        <Reveal direction="up">
          <section className="py-14 md:py-20 bg-white/[0.02]">
            <div className="container mx-auto px-4 max-w-3xl text-center">
              <h2 className="font-sora font-bold text-2xl md:text-3xl text-white mb-3">
                Atuamos Também em
              </h2>
              <p className="text-gray-400 text-sm md:text-base mb-10">
                Além dos consórcios principais, a Plan10 oferece soluções para outros objetivos de vida.
              </p>

              <div className="flex flex-col items-center gap-3">
                {[
                  { icon: "🚲", label: "Consórcio de Bike" },
                  { icon: "✈️", label: "Consórcio de Viagens" },
                  { icon: "💊", label: "Consórcio de Procedimentos Estéticos" },
                  { icon: "🏥", label: "Consórcio de Saúde" },
                  { icon: "📱", label: "Consórcio de Eletrônicos" },
                  { icon: "🎓", label: "Consórcio de Educação" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={`https://api.whatsapp.com/send/?phone=5511991051616&text=${encodeURIComponent(`Olá! Tenho interesse no ${item.label}. Pode me ajudar?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full max-w-sm px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:border-accent/40 hover:bg-white/[0.08] transition-all duration-300 cursor-pointer group"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-white/80 group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>

              <p className="text-gray-500 text-xs mt-8">
                Em breve mais categorias. Fale com um consultor para verificar disponibilidade.
              </p>
            </div>
          </section>
        </Reveal>

        {/* ═══════ CTA FINAL ═══════ */}
        <section className="py-14 md:py-28 bg-accent">
          <div className="container mx-auto px-4 text-center">
            <Reveal direction="up">
              <h2 className="font-sora font-black text-3xl md:text-4xl lg:text-5xl text-accent-foreground mb-4">Pronto para conquistar seu sonho?</h2>
            </Reveal>
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={plan10Logo} alt="Plan10 Consórcio" className="h-8 w-auto" />
            <span className="text-gray-400 text-xl font-light">+</span>
            <img
              src={portoLogo}
              alt="Porto"
              className="h-8 w-auto"
            />
          </div>
          <p className="text-sm text-muted-foreground mb-3">© 2026 Plan10 Consórcio — Plan10 Corretora de Seguros e Benefícios Ltda. | Parceiro Oficial Porto S.A.</p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <a href="/privacidade" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Política de Privacidade</a>
            <span>|</span>
            <a href="/" className="hover:text-accent transition-colors">plan10.com.br</a>
          </div>

          {/* Notas legais */}
          <div className="border-t border-white/5 pt-4 mt-4 text-xs text-gray-500 text-center space-y-1 max-w-3xl mx-auto">
            <p>* Valores da simulação são exclusivos para Pessoa Física.</p>
            <p>* Desconto de 45% incide sobre o valor da parcela até a contemplação. Após a contemplação, o valor será compensado nas parcelas restantes.</p>
            <p>* Desconto de 10% para clientes Porto incide sobre a taxa de administração.</p>
            <p>* Cotas sujeitas à disponibilidade de vagas no grupo. Oferta válida até 30/04/2026.</p>
            <p>* Parcelas reajustadas no aniversário do grupo. Para demais condições, consulte o Regulamento.</p>
            <p>* Taxa de administração, fundo de reserva e seguro prestamista variam conforme o tipo e grupo do consórcio.</p>
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
