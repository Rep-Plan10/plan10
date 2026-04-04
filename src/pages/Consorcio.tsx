import { useState, useEffect, useRef } from "react";
import { ChevronDown, MessageCircle, Star, TrendingDown, Trophy } from "lucide-react";

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
        style={{ maxHeight: open ? "500px" : "0", opacity: open ? 1 : 0 }}
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

/* ───────────────────── FAQ DATA (18 perguntas) ───────────────────── */
const faqItems = [
  { question: "Consórcio tem juros?", answer: "Não. O consórcio não cobra juros. Você paga apenas a taxa de administração, o fundo de reserva e, quando aplicável, o seguro prestamista. Isso torna o consórcio uma das formas mais econômicas de conquistar um bem." },
  { question: "Quanto tempo levo para ser contemplado?", answer: "A contemplação pode ocorrer a qualquer momento, do primeiro ao último mês do grupo. Ela acontece por sorteio mensal ou por lance. Quem oferta o maior lance tem prioridade e pode antecipar a conquista do bem." },
  { question: "Posso usar a carta de crédito para qualquer imóvel ou veículo?", answer: "Sim. A carta de crédito funciona como pagamento à vista, o que aumenta seu poder de negociação e pode garantir descontos. Você escolhe o imóvel ou veículo que quiser, dentro das condições estabelecidas pelo grupo." },
  { question: "E se eu precisar cancelar?", answer: "Caso precise encerrar sua participação, você tem direito à restituição dos valores pagos, corrigidos conforme as regras do contrato. O reembolso é feito por sorteio entre os desistentes ou ao final do grupo." },
  { question: "Como a Plan10 me ajuda nesse processo?", answer: "A Plan10 acompanha você em cada etapa: da escolha do plano à assinatura do contrato. Nossa equipe está disponível para tirar dúvidas, montar simulações personalizadas e orientar sobre as melhores estratégias de lance para agilizar sua contemplação." },
  { question: "Como fazer um consórcio?", answer: "É simples. Você escolhe a modalidade (imóvel, veículo ou pesados), define o valor da carta de crédito e o prazo, assina o contrato e começa a pagar as parcelas mensais. A partir daí, participa dos sorteios e pode dar lances para ser contemplado antes do prazo." },
  { question: "O consórcio é um bom investimento?", answer: "Sim, especialmente para quem quer adquirir um bem sem pagar juros. O consórcio funciona como uma poupança disciplinada: ao final do prazo, o crédito contratado está garantido para você usar com poder de compra equivalente ao valor contratado." },
  { question: "O que vale mais a pena, consórcio ou financiamento?", answer: "Depende da sua situação. O financiamento entrega o bem imediatamente, mas cobra juros que podem dobrar o custo total ao longo do contrato. O consórcio não tem juros e custa bem menos no total, mas exige planejamento. Para quem tem tempo para esperar, o consórcio é a escolha mais vantajosa financeiramente." },
  { question: "Qual o tempo médio de fechamento dos grupos de consórcio?", answer: "Os prazos variam conforme a modalidade. Consórcios de imóveis podem ter grupos de até 200 meses, veículos de até 100 meses e pesados de até 100 meses. Quanto menor o prazo, maiores as parcelas, e vice-versa." },
  { question: "Como acessar as informações da minha cota?", answer: "Todas as informações da sua cota ficam disponíveis no portal ou aplicativo da Porto. Você pode consultar extratos, datas de assembleia, histórico de pagamentos e sua posição dentro do grupo a qualquer momento." },
  { question: "Como acessar os resultados das assembleias?", answer: "Os resultados são publicados no portal da Porto logo após cada assembleia mensal. Você também recebe notificações por e-mail ou SMS, conforme os dados cadastrados no seu contrato." },
  { question: "Como ser contemplado no consórcio?", answer: "Existem duas formas: sorteio e lance. Nos sorteios mensais, todos os participantes em dia têm chance igual. No lance, você oferta um percentual do crédito e, se for o maior valor daquele mês, é contemplado na assembleia." },
  { question: "Como funciona o lance no consórcio?", answer: "O lance é uma oferta feita antes da assembleia, indicando quanto você quer antecipar do saldo devedor. Quem oferta o maior percentual leva a contemplação. Uma das vantagens da Porto é que você pode usar parte do próprio crédito para compor o lance, sem precisar ter todo o valor em mãos." },
  { question: "Como funcionam os sorteios no consórcio?", answer: "Os sorteios acontecem mensalmente em assembleia e são baseados nos resultados da Loteria Federal. Todos os participantes com pagamentos em dia concorrem automaticamente, sem necessidade de nenhuma ação adicional." },
  { question: "O que é a taxa de administração do consórcio?", answer: "É a remuneração da administradora pelo serviço de organizar e gerir o grupo. Essa taxa é diluída nas parcelas mensais e representa o único custo real do consórcio. Não há juros sobre o crédito contratado." },
  { question: "O que é o fundo de reserva no consórcio?", answer: "O fundo de reserva é uma porcentagem cobrada para cobrir eventuais inadimplências no grupo, garantindo que as contemplações aconteçam normalmente. Ao encerramento do grupo, o saldo remanescente do fundo é devolvido proporcionalmente a todos os consorciados." },
  { question: "Todos são contemplados até o final do grupo de consórcio?", answer: "Sim. Todo participante que mantiver os pagamentos em dia será contemplado até o encerramento do grupo. O prazo final garante que nenhum consorciado ativo fique sem receber a carta de crédito." },
  { question: "Como solicitar o resgate de valores de um grupo de consórcio já encerrado?", answer: "Após o encerramento do grupo, os valores disponíveis podem ser solicitados pelo portal da Porto ou com o apoio da equipe Plan10. É necessário apresentar documentação conforme orientado pela administradora no momento do pedido." },
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
  const [activeSimCategory, setActiveSimCategory] = useState<'imovel' | 'veiculo' | 'pesados' | null>(null);
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
  const { ref: heroRevealRef } = useReveal(0.2);

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
    setActiveSimCategory(cat);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#06006B] via-[#08007A] to-[#1A4FD8] text-foreground font-inter">
      {/* ───── MINI HEADER ───── */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#06006B]/80 border-b border-white/5">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="w-0 sm:w-28" aria-hidden="true" />

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 sm:gap-3 focus:outline-none cursor-pointer flex-1 justify-center"
            aria-label="Ir para o início"
          >
            <img src={plan10Logo} alt="Plan10 Consórcio" className="h-9 w-auto object-contain" />
            {portoLogo && (
              <>
                <span className="text-gray-500 text-base sm:text-xl font-light select-none">+</span>
                <div className="flex flex-col items-start">
                  <img src={portoLogo} alt="Porto" className="h-5 w-auto object-contain" />
                  <span className="text-[10px] text-white/60 tracking-wide leading-none mt-0.5">Credenciado oficial</span>
                </div>
              </>
            )}
          </button>

          <div className="w-0 sm:w-28 flex justify-end">
            <button
              onClick={() => {
                setActiveSimCategory(null);
                setSimCategoria('imovel');
                setSimFaixa(0);
                setSimAberto(true);
                setTimeout(() => {
                  document.getElementById('simulador-parcelas')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }}
              className="hidden sm:block cta-btn bg-accent text-accent-foreground text-sm px-3 py-2 sm:px-5 sm:py-2.5 rounded-lg font-bold whitespace-nowrap"
            >
              Simular agora
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* ═══════ HERO ═══════ */}
        <section className="relative w-full flex flex-col items-center py-8 md:py-12 overflow-x-hidden bg-black/30">
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

          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
            {/* Countdown */}
            <Reveal delay={0} direction="up">
              <div className="flex justify-center mb-2 md:mb-3 w-full">
                <div className="flex items-center gap-1.5 flex-wrap justify-center py-2 px-4 rounded-xl bg-black/40 border border-[#F97316]/30 w-fit">
                  <span className="text-[#F97316]/70 text-[10px] font-medium uppercase tracking-widest">
                    Termina em:
                  </span>
                  {[
                    { value: timeLeft.dias, label: 'dias' },
                    { value: timeLeft.horas, label: 'horas' },
                    { value: timeLeft.mins, label: 'mins' },
                    { value: timeLeft.segs, label: 'seg' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className="bg-[#1a1a2e] rounded-md px-2 py-1 text-center min-w-[42px]">
                        <div className="text-[#F97316] font-black text-base font-mono leading-none">
                          {String(item.value).padStart(2, '0')}
                        </div>
                        <div className="text-[#F97316]/70 text-[9px] uppercase tracking-wider">
                          {item.label}
                        </div>
                      </div>
                      {i < 3 && (
                        <span className="text-[#F97316] font-black text-sm">:</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Pill badge */}
            <Reveal delay={100} direction="up">
              <div className="flex flex-col items-center gap-1 mb-2 md:mb-1">
                <div className="inline-flex items-center gap-2 bg-[#003087]/30 border border-[#003087]/60 rounded-full px-5 py-2">
                  <span className="text-white text-xs font-semibold tracking-wide">O seu futuro muito mais tranquilo!</span>
                </div>
              </div>
            </Reveal>

            {/* H1 */}
            <div ref={heroRevealRef} className="mb-2 md:mb-4">
              <h1 className="font-sora font-black text-3xl sm:text-5xl md:text-6xl leading-[1.35] max-w-2xl mx-auto text-center">
                Os melhores{" "}
                <span className="text-[#FF6B00]">DESCONTOS</span>{" "}
                <span className="text-white">em</span>{" "}
                <span className="text-[#FF6B00]">CONSÓRCIO</span>
                <br />
                estão aqui.
              </h1>
            </div>

            {/* Subtítulo */}
            <Reveal delay={500} direction="up">
              <p className="text-sm md:text-xl text-muted-foreground max-w-sm sm:max-w-2xl mx-auto text-center mb-3 md:mb-5 leading-relaxed px-4 line-clamp-3 md:line-clamp-none">
                Consórcios de Imóveis, veículos e pesados com reduções exclusivas nos grupos em andamento. Parcelas 45% menores até a contemplação.
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={600} direction="up">
              <div className="flex flex-col sm:flex-row gap-3 mb-3 md:mb-4 justify-center w-full">
                <button onClick={() => openSim('imovel')} className="cta-btn bg-accent text-accent-foreground px-6 py-3 md:px-8 md:py-4 rounded-xl text-sm md:text-base font-bold w-full sm:w-auto">
                  Garantir minha cota agora
                </button>
                <a
                  href={WA_BASE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-btn bg-[#25D366] border border-[#25D366] text-white hover:bg-[#1ebe57] px-6 py-3 md:px-8 md:py-4 rounded-xl text-sm md:text-base font-bold transition-colors inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.559 4.14 1.535 5.874L0 24l6.278-1.518A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.368l-.36-.213-3.727.901.949-3.624-.236-.373A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                  </svg>
                  Falar com consultor
                </a>
              </div>
            </Reveal>

            {/* Simulation shortcut buttons */}
            <Reveal delay={650} direction="up">
              <div className="flex gap-2 w-full max-w-md mx-auto mb-3 md:mb-4">
                <button onClick={() => openSim('imovel')} className="flex-1 bg-[#F97316] hover:brightness-110 text-white font-semibold text-xs px-3 py-2 md:text-sm md:px-5 md:py-2.5 rounded-full transition-all duration-200">
                  Simular Imóvel
                </button>
                <button onClick={() => openSim('veiculo')} className="flex-1 bg-[#7C3AED] hover:brightness-110 text-white font-semibold text-xs px-3 py-2 md:text-sm md:px-5 md:py-2.5 rounded-full transition-all duration-200">
                  Simular Veículo
                </button>
                <button onClick={() => openSim('pesados')} className="flex-1 bg-[#1D6FCC] hover:brightness-110 text-white font-semibold text-xs px-3 py-2 md:text-sm md:px-5 md:py-2.5 rounded-full transition-all duration-200">
                  Simular Pesados
                </button>
              </div>
            </Reveal>

            {/* Splash circles — absolute nas laterais (lg+) */}
            <div className="hidden lg:flex absolute left-[5%] top-1/2 -translate-y-1/2 flex-col items-center justify-center w-36 h-36 rounded-full pointer-events-none z-0 bg-gradient-to-br from-[#FF6B00] to-[#e55e00] shadow-2xl shadow-[#FF6B00]/40 border-4 border-[#FF6B00]/60 animate-pulse" style={{ animationDuration: '2.5s' }}>
              <span className="text-white font-black text-3xl leading-none">45%</span>
              <span className="text-white/90 text-[10px] font-bold uppercase tracking-wider text-center leading-tight px-2 mt-1">OFF na parcela</span>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#FF6B00] text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-md whitespace-nowrap">OFERTA</span>
            </div>

            <div className="hidden lg:flex absolute right-[5%] top-1/2 -translate-y-1/2 flex-col items-center justify-center w-36 h-36 rounded-full pointer-events-none z-0 bg-gradient-to-br from-[#1a56db] to-[#003087] shadow-2xl shadow-[#003087]/40 border-4 border-[#1a56db]/60">
              <span className="text-white font-black text-3xl leading-none">10%</span>
              <span className="text-white/90 text-[10px] font-bold uppercase tracking-wider text-center leading-tight px-2 mt-1">OFF na taxa de administração</span>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4ade80] text-[#003087] text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-md whitespace-nowrap">PORTO</span>
            </div>

            {/* Mini circles — tablet (md to lg) */}
            <div className="hidden md:flex lg:hidden justify-center items-center gap-8 mb-3 w-full">
              <div className="relative flex flex-col items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#e55e00] border-[3px] border-[#FF6B00]/70 shadow-lg shadow-[#FF6B00]/30 animate-pulse">
                <span className="text-white font-black text-xl leading-none">45%</span>
                <span className="text-white/90 text-[9px] font-bold uppercase tracking-wide text-center leading-tight px-1.5 mt-0.5">OFF parcela</span>
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white text-[#FF6B00] text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap shadow">OFERTA</span>
              </div>
              <div className="relative flex flex-col items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#1a56db] to-[#003087] border-[3px] border-[#1a56db]/70 shadow-lg shadow-[#003087]/30">
                <span className="text-white font-black text-xl leading-none">10%</span>
                <span className="text-white/90 text-[9px] font-bold uppercase tracking-wide text-center leading-tight px-1.5 mt-0.5">OFF taxa adm</span>
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#4ade80] text-[#003087] text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap shadow">PORTO</span>
              </div>
            </div>

            {/* Mobile badges */}
            <div className="flex md:hidden justify-center gap-6 mt-3 mb-2">
              <div className="flex flex-col items-center justify-center w-24 h-24 rounded-full bg-[#F97316] text-white text-center flex-shrink-0">
                <span className="text-[9px] font-bold uppercase tracking-widest leading-none mb-0.5">OFERTA</span>
                <span className="text-3xl font-black leading-none">45%</span>
                <span className="text-[8px] font-medium leading-tight mt-0.5 px-1">OFF NA PARCELA</span>
              </div>
              <div className="flex flex-col items-center justify-center w-24 h-24 rounded-full bg-[#1D6FCC] text-white text-center flex-shrink-0 relative">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">PORTO</span>
                <span className="text-3xl font-black leading-none">10%</span>
                <span className="text-[8px] font-medium leading-tight mt-0.5 px-2 text-center">OFF NA TAXA DE{"\n"}ADMINISTRAÇÃO</span>
              </div>
            </div>

            {/* Scroll arrow */}
            <ChevronDown size={28} className="text-accent mx-auto mt-4 animate-bounce" />
          </div>
        </section>

        {/* ═══════ ESCOLHA SEU CONSÓRCIO ═══════ */}
        <section className="py-14 md:py-28 bg-[#06006B]/60">
          <div className="container mx-auto px-4">
            <Reveal direction="up">
              <h2 className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-center mb-4">Escolha seu consórcio</h2>
            </Reveal>
            <Reveal direction="up" delay={200}>
              <p className="text-center text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                Encontre o plano ideal para realizar o seu sonho.
              </p>
            </Reveal>

            <p className="text-center text-sm text-white/60 italic mb-6">
              Parcelas mínimas para grupos em andamento e condicionadas à existência de cotas livres.
            </p>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {[
                {
                  cat: 'imovel' as const, title: "Imóvel", img: imgCasa,
                  desc: "Casa, apartamento, terreno ou até reforma. Realize o sonho do imóvel próprio com parcelas que cabem no seu bolso.",
                  popular: true, parcela: "R$ 567,00", parcelaColor: "text-[#F97316]",
                  btnColor: "bg-[#F97316] text-white", cta: "Simular Imóvel",
                },
                {
                  cat: 'veiculo' as const, title: "Veículo", img: imgCarro,
                  desc: "Carro novo, seminovo, moto ou até náutico e placas solares. Troque ou compre sem juros.",
                  popular: false, parcela: "R$ 371,00", parcelaColor: "text-[#7C3AED]",
                  btnColor: "bg-[#7C3AED] text-white", cta: "Simular Veículo",
                },
                {
                  cat: 'pesados' as const, title: "Pesados", img: imgCaminhao,
                  desc: "Caminhão, ônibus, máquinas agrícolas e industriais. Ideal para empresários e transportadores.",
                  popular: false, parcela: "R$ 1.060,00", parcelaColor: "text-[#1D6FCC]",
                  btnColor: "bg-[#1D6FCC] text-white", cta: "Simular Pesados",
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
                    <div className="w-full h-44 mb-4 flex items-center justify-center overflow-hidden rounded-xl">
                      <img src={p.img} alt={p.title} className="w-auto h-40 object-contain" style={{ mixBlendMode: 'screen' }} />
                    </div>
                    <h3 className="font-sora font-bold text-xl text-foreground mb-3 text-center">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 text-center flex-1">{p.desc}</p>

                    <div className="text-center mb-3">
                      <p className="text-white/60 text-xs uppercase tracking-wider">Parcelas reduzidas a partir de</p>
                      <p className={`${p.parcelaColor} font-black text-2xl`}>{p.parcela}</p>
                    </div>

                    <button
                      onClick={() => openSim(p.cat)}
                      className={`cta-btn w-full py-3 rounded-lg font-bold text-sm ${p.btnColor} hover:brightness-110 transition-all`}
                    >
                      {p.cta}
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="text-center text-sm text-white/50 mt-6 max-w-2xl mx-auto italic">
              * Consórcios com reduções exclusivas — garanta a sua cota antes que acabe.
              Grupos em andamento com vagas limitadas.
            </p>
          </div>
        </section>

        {/* ═══════ SIMULADOR DE PARCELAS (condicional) ═══════ */}
        {simAberto && (
          <section id="simulador-parcelas" className="py-14 md:py-28 bg-black/30 relative">
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
                        { key: 'imovel' as const, label: 'Imóvel' },
                        { key: 'veiculo' as const, label: 'Veículo' },
                        { key: 'pesados' as const, label: 'Pesados' },
                      ]).filter((tab) => activeSimCategory === null || activeSimCategory === tab.key).map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => handleCategoria(tab.key)}
                          className={`flex-1 sm:flex-none justify-center flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all ${
                            simCategoria === tab.key
                              ? "bg-accent text-accent-foreground"
                              : "bg-white/5 border border-white/10 text-foreground hover:bg-white/10"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Select de faixa */}
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
                    <div key={`${simCategoria}-${simFaixa}`} className="animate-fade-in mb-6">
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

                      {/* DESKTOP: tabela */}
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
                        <input type="text" placeholder="Seu nome" value={leadNome} onChange={(e) => setLeadNome(e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm" />
                        <input type="email" placeholder="Seu e-mail" value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm" />
                        <input type="tel" placeholder="Seu WhatsApp" value={leadTelefone} onChange={(e) => setLeadTelefone(e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm" />
                      </div>
                      <textarea placeholder="Mensagem (opcional)" value={leadMensagem} onChange={(e) => setLeadMensagem(e.target.value)} rows={2} className="w-full max-w-xl mx-auto block mt-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm resize-none" />
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

                    <p className="text-[11px] text-muted-foreground text-center mt-4 leading-relaxed">
                      Valores para Pessoa Física. Parcelas reajustadas no aniversário do grupo. Para demais condições, consulte o Regulamento. Oferta válida até 30/04/2026.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        )}

        {/* ═══════ POR QUE PLAN10 (CREDIBILIDADE) ═══════ */}
        <section className="py-14 md:py-28 bg-[#06006B]/60">
          <div className="container mx-auto px-4">
            <Reveal direction="up">
              <h2 className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-center mb-4">Por que escolher o Consórcio Plan10?</h2>
            </Reveal>

            {/* Logos + subtítulo */}
            <div className="flex flex-col items-center gap-2 mb-8">
              <div className="flex items-center gap-3">
                <img src={plan10Logo} alt="Plan10" className="h-8 object-contain" />
                <span className="text-white/60 text-lg font-light">+</span>
                <img src={portoLogo} alt="Porto" className="h-7 object-contain" />
              </div>
              <p className="text-white font-semibold text-base tracking-wide">
                Diferenciais que só a Porto tem
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {[
                { emoji: "🏆", title: "Porto Bank Oficial", desc: "Somos parceiros credenciados da Porto Bank, uma das maiores administradoras de consórcio do Brasil.", bg: "bg-[#1D6FCC]/20", border: "border-[#1D6FCC]/40" },
                { emoji: "💰", title: "Zero Juros", desc: "Você não paga juros. Apenas taxa de administração competitiva.", bg: "bg-[#16A34A]/20", border: "border-[#16A34A]/40" },
                { emoji: "📋", title: "Flexibilidade Total", desc: "Planos de 60 a 200 meses. Créditos de R$ 25 mil a R$ 1 milhão. Você escolhe o que cabe no seu bolso.", bg: "bg-[#7C3AED]/20", border: "border-[#7C3AED]/40" },
                { icon: TrendingDown, title: "Parcelas Menores", desc: "Nos grupos em andamento, as parcelas já estão reduzidas em até 45%. Você paga menos e ainda conquista o mesmo crédito.", bg: "bg-[#F97316]/20", border: "border-[#F97316]/40" },
                { icon: Trophy, title: "Carta de Crédito Garantida", desc: "Todo participante ativo recebe a carta até o final do grupo. Você pode potencializar o lance usando parte do seu crédito.", bg: "bg-[#F59E0B]/20", border: "border-[#F59E0B]/40" },
              ].map((c, i) => (
                <Reveal key={i} delay={i * 100} direction="up">
                  <div className={`rounded-2xl p-6 h-full border ${c.border} ${c.bg} hover:shadow-[0_0_20px_rgba(242,140,40,0.08)] transition-all duration-300`}>
                    {'emoji' in c && c.emoji ? (
                      <span className="text-3xl mb-4 block">{c.emoji}</span>
                    ) : (
                      'icon' in c && c.icon ? (
                        <c.icon size={32} className="mb-4 text-white" />
                      ) : null
                    )}
                    <h3 className="font-sora font-bold text-lg text-foreground mb-2">{c.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Bloco stats Porto */}
            <div className="mt-12 rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col gap-4">
              <p className="text-white font-bold text-lg text-center">
                Melhor e mais rápido sistema de contemplação para consórcio!
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                <div className="flex flex-col items-center text-center gap-1">
                  <span className="text-3xl">🤝</span>
                  <p className="text-white text-sm font-bold leading-tight">
                    + de <span className="text-[#F97316]">1.700</span> bens<br/>entregues por mês
                  </p>
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                  <span className="text-3xl">👥</span>
                  <p className="text-white text-sm font-bold leading-tight">
                    + de <span className="text-[#F97316]">165 Mil</span><br/>clientes ativos
                  </p>
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                  <span className="text-3xl">🏛️</span>
                  <p className="text-white text-sm font-bold leading-tight">
                    <span className="text-[#F97316]">47 anos</span><br/>de atuação
                  </p>
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                  <span className="text-3xl">🏆</span>
                  <p className="text-white text-sm font-bold leading-tight">
                    Maior <span className="text-[#F97316]">seguradora</span><br/>do Brasil
                  </p>
                </div>
              </div>
            </div>

            {/* Bloco certificações */}
            <div className="mt-6 rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-[#1D6FCC] flex items-center justify-center text-[#1D6FCC] text-3xl">
                ★
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-white font-bold text-base">
                  Solidez e segurança com a grife Porto Bank
                </p>
                <ul className="text-white/70 text-sm flex flex-col gap-1">
                  <li>• Certificada MESC — Instituto Melhores Empresas em Satisfação do Cliente</li>
                  <li>• Reconhecimento da Revista Seleções — Marcas de confiança 2020</li>
                  <li>• Reconhecimento entre as marcas mais amadas do Brasil 2020</li>
                  <li>• Reconhecimento Marca Brasil 2019</li>
                </ul>
              </div>
            </div>

            {/* Bloco descontos exclusivos */}
            <div className="mt-12 flex flex-col items-center gap-6">
              <div className="text-center">
                <p className="text-white/60 text-xs uppercase tracking-widest mb-1">
                  Oferta por tempo limitado
                </p>
                <h3 className="text-white font-bold text-xl md:text-2xl">
                  Descontos exclusivos até{" "}
                  <span className="text-[#F97316]">30/06/2026</span>
                </h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <div className="flex-1 flex flex-col items-center justify-center bg-[#F97316] rounded-2xl px-6 py-6 text-center shadow-lg shadow-[#F97316]/30">
                  <span className="text-white font-black text-5xl leading-none">20%</span>
                  <span className="text-white/90 font-medium text-sm mt-1">de desconto</span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center bg-[#1D6FCC] rounded-2xl px-6 py-6 text-center shadow-lg shadow-[#1D6FCC]/30">
                  <span className="text-white font-black text-5xl leading-none">10%</span>
                  <span className="text-white/90 font-medium text-sm mt-1">no cartão Porto</span>
                </div>
              </div>
              <a
                href="https://api.whatsapp.com/send/?phone=5511991051616&text=Quero%20garantir%20o%20meu%20desconto"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F97316] hover:brightness-110 text-white font-bold text-base px-10 py-4 rounded-full transition-all duration-200 shadow-lg shadow-[#F97316]/30 text-center"
              >
                Quero garantir o meu desconto
              </a>
            </div>
          </div>
        </section>

        {/* ═══════ COMO FUNCIONA ═══════ */}
        <section className="py-14 md:py-28 bg-black/20">
          <div className="container mx-auto px-4">
            <Reveal direction="up">
              <h2 className="font-sora font-bold text-3xl md:text-4xl lg:text-5xl text-center mb-14">São poucos passos até a conquista do seu sonho</h2>
            </Reveal>

            {/* Desktop: linha + círculos isolados */}
            <div className="hidden md:flex relative justify-between items-center mx-auto mb-6" style={{ paddingLeft: '12.5%', paddingRight: '12.5%' }}>
              <div className="absolute left-[12.5%] right-[12.5%] top-1/2 -translate-y-1/2 border-t-2 border-dashed border-accent z-0" />
              {["01", "02", "03", "04"].map((n) => (
                <div key={n} className="relative z-10 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-sora font-bold text-sm flex-shrink-0">
                  {n}
                </div>
              ))}
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { n: "01", title: "Escolha seu sonho", desc: "Simule o valor do imóvel ou veículo desejado e encontre o plano ideal para o seu momento de vida.", img: "/images/familia-olhando-carro.png", alt: "Família escolhendo o sonho" },
                { n: "02", title: "Entre no grupo", desc: "Você passa a fazer parte de um grupo com pessoas de objetivos similares e começa a pagar as parcelas mensais.", img: "/images/familia-assinando-contrato.png", alt: "Família assinando contrato" },
                { n: "03", title: "Seja contemplado", desc: "Todo mês acontecem sorteios. Você também pode dar lances para antecipar sua contemplação.", img: "/images/familia-comemorando.png", alt: "Família comemorando a contemplação" },
                { n: "04", title: "Use sua carta de crédito", desc: "Com a carta em mãos, você compra à vista e ainda tem poder de negociação para conseguir desconto.", img: "/images/familia-comprando-carro.png", alt: "Família comprando o carro" },
              ].map((s, i) => (
                <Reveal key={i} delay={i * 200} direction="up">
                  <div className="flex flex-col items-center text-center">
                    <img src={s.img} alt={s.alt} className="w-full h-40 object-cover rounded-xl mb-4" loading="lazy" />
                    <div className="md:hidden w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-sora font-bold text-sm mb-3">
                      {s.n}
                    </div>
                    <h3 className="font-sora font-semibold text-base text-foreground mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

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

        {/* ═══════ O SEU FUTURO MUITO MAIS TRANQUILO ═══════ */}
        <section className="py-14 md:py-28 bg-[#06006B]/60">
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
                { img: "/images/seguranca-garantida.png", imgAlt: "Segurança garantida", emoji: "🔒", title: "Segurança garantida", desc: "Todo o processo é regulamentado pelo Banco Central. Você investe com a segurança da Porto Bank por trás." },
                { img: "/images/consultoria-personalizada.png", imgAlt: "Consultoria personalizada", emoji: "🤝", title: "Consultoria personalizada", desc: "Especialistas que entendem seu momento de vida e indicam o melhor plano para você — sem pressão, sem enrolação." },
                { img: "/images/contratacao-simples-rapida.png", imgAlt: "Contratação simples e rápida", emoji: "⚡", title: "Contratação simples e rápida", desc: "Simule, escolha e assine 100% online. Em minutos você já sabe qual plano cabe no seu bolso." },
              ].map((c, i) => (
                <Reveal key={i} delay={i * 150} direction="up" className="h-full">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:border-accent/40 transition-all duration-300 h-full flex flex-col">
                    <img src={c.img} alt={c.imgAlt} className="w-full h-44 object-cover rounded-xl mb-4" loading="lazy" />
                    
                    <h3 className="font-sora font-bold text-lg text-foreground mb-2">{c.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{c.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Bloco consultoria */}
            <div className="mt-10 rounded-2xl bg-[#1D4ED8]/30 border border-[#1D6FCC]/40 p-8 text-center">
              <h3 className="text-white font-bold text-xl md:text-2xl mb-2">
                Conte com consultoria especializada e exclusiva em cada etapa
              </h3>
              <p className="text-white/70 text-base mb-6">
                Da cotação à contratação, um especialista Plan10 cuida de tudo por você.
              </p>
              {/* Prova social */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 bg-[#1D6FCC]/20 border border-[#1D6FCC]/30 rounded-xl p-5 mb-5">
                <div className="flex flex-col items-center sm:pr-6 sm:border-r sm:border-white/20">
                  <span className="text-white font-black text-3xl">
                    5.000<span className="text-[#F97316]">+</span>
                  </span>
                  <span className="text-white/60 text-sm">clientes atendidos</span>
                </div>
                <div className="flex flex-col items-center sm:pl-6">
                  <div className="flex gap-1 text-[#F97316] text-2xl mb-1">
                    ★★★★★
                  </div>
                  <span className="text-white/60 text-sm">avaliação média</span>
                </div>
              </div>
              {/* Card credencial */}
              <div className="flex flex-col items-center gap-2 bg-[#1D6FCC]/20 border border-[#1D6FCC]/30 rounded-xl p-5">
                <div className="w-10 h-10 rounded-full bg-[#F97316]/20 flex items-center justify-center text-[#F97316] text-xl mb-1">
                  🛡️
                </div>
                <p className="text-white font-bold text-base">
                  Plan10 Corretora de Seguros
                </p>
                <p className="text-white/60 text-sm">
                  Credenciada <span className="text-white font-semibold">Porto Seguro</span>
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-white/60 text-sm">Autorizada pela</span>
                  <img src="/images/logo-susep.png" alt="SUSEP" className="h-6 object-contain" />
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center mt-8">
              <a
                href="https://wa.me/5511991051616?text=Quero%20meu%20cons%C3%B3rcio%20agora"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F97316] hover:brightness-110 text-white font-bold text-lg px-10 py-4 rounded-full transition-all duration-200 shadow-lg shadow-[#F97316]/30"
              >
                Quero meu consórcio agora
              </a>
            </div>
          </div>
        </section>

        {/* ═══════ DEPOIMENTOS ═══════ */}
        <section className="py-14 md:py-28 overflow-hidden bg-black/20">
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

        {/* ═══════ FORMULÁRIO DE LEAD COMPLETO ═══════ */}
        <section className="py-14 md:py-20 bg-[#06006B]/60">
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
              <div className="relative w-full" data-tipo-dropdown>
                <button
                  type="button"
                  onClick={() => setTipoDropdownAberto(!tipoDropdownAberto)}
                  className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm hover:border-white/20 transition-colors duration-200 focus:outline-none focus:border-accent"
                >
                  <span className={formTipo ? 'text-white' : 'text-gray-500'}>
                    {formTipo || 'Selecione o tipo de consórcio'}
                  </span>
                  <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${tipoDropdownAberto ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

              <input type="text" inputMode="numeric" placeholder="Valor da carta de crédito (R$)" value={formCredito} onChange={(e) => setFormCredito(formatarCredito(e.target.value))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:border-accent focus:outline-none" />
              <input type="text" placeholder="Nome completo" value={formNome} onChange={(e) => setFormNome(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:border-accent focus:outline-none" />
              <input type="tel" placeholder="WhatsApp (com DDD)" value={formWhatsApp} onChange={(e) => setFormWhatsApp(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:border-accent focus:outline-none" />
              <input type="email" placeholder="E-mail" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:border-accent focus:outline-none" />
              <textarea placeholder="Mensagem (opcional)" value={formMensagem} onChange={(e) => setFormMensagem(e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm resize-none focus:border-accent focus:outline-none" />

              <div className="bg-white/5 rounded-xl p-4 space-y-1.5">
                <p className="text-[#FF6B00] text-xs font-semibold uppercase tracking-widest mb-2">Informações importantes</p>
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

              <button onClick={enviarFormulario} className="w-full bg-[#FF6B00] hover:bg-[#e55e00] text-white font-bold py-4 rounded-xl transition-colors duration-200 text-base">
                Enviar e falar com consultor
              </button>
              <p className="text-gray-500 text-xs text-center">🔒 Seus dados são usados apenas para contato. Não compartilhamos com terceiros.</p>
            </div>
          </div>
        </section>

        {/* ═══════ FAQ ═══════ */}
        <section className="py-14 md:py-28 bg-black/20">
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
          <section className="py-14 md:py-20 bg-[#06006B]/60">
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
                    <span className="text-white/80 group-hover:text-white transition-colors">{item.label}</span>
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
      <footer className="bg-[#06006B] py-10 border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={plan10Logo} alt="Plan10 Consórcio" className="h-8 w-auto" />
            <span className="text-gray-400 text-xl font-light">+</span>
            <img src={portoLogo} alt="Porto" className="h-8 w-auto" />
          </div>
          <p className="text-sm text-muted-foreground mb-3">© 2026 Plan10 Consórcio — Plan10 Corretora de Seguros e Benefícios Ltda. | Parceiro Oficial Porto S.A.</p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <a href="/privacidade" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Política de Privacidade</a>
            <span>|</span>
            <a href="/" className="hover:text-accent transition-colors">plan10.com.br</a>
          </div>

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
            <a href="https://nextcorporation.com.br/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors underline underline-offset-2">
              Next Corporation
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
