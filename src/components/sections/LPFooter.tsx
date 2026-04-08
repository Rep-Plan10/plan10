import logo from "@/assets/plan10-logo-consorcio.png";

export default function LPFooter() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="container mx-auto px-4 text-center space-y-4">
        <img src={logo} alt="Plan10 Consórcio" className="h-10 rounded mx-auto" />
        <p className="text-sm text-muted-foreground font-inter">O seu futuro MUITO mais tranquilo.</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground font-inter">
          <a href="https://api.whatsapp.com/send/?phone=5511938012222" target="_blank" rel="noopener noreferrer" className="footer-link inline-block">WhatsApp: (11) 93801-2222</a>
          <span className="text-white/20">·</span>
          <a href="mailto:contato@plan10.com.br" className="footer-link inline-block">contato@plan10.com.br</a>
          <span className="text-white/20">·</span>
          <a href="https://instagram.com/plan10seguros" target="_blank" rel="noopener noreferrer" className="footer-link inline-block">@plan10seguros</a>
          <span className="text-white/20">·</span>
          <a href="https://www.facebook.com/plan10seguros" target="_blank" rel="noopener noreferrer" className="footer-link inline-block">/plan10seguros</a>
        </div>
        <p className="text-xs text-foreground/20 font-inter">Plan10 Corretora de Seguros · Credenciada Porto Seguro · SUSEP</p>
        <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground font-inter">
          <p>© 2025 Plan10 Consórcio. Todos os direitos reservados.</p>
          <p>Desenvolvido por{" "}
            <a href="https://nextcorporation.com.br" target="_blank" rel="noopener noreferrer" className="text-accent hover:brightness-110 transition-all">Next Corporation</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
