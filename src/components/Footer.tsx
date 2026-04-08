import logo from "@/assets/plan10-logo-consorcio.png";

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

const hubs = [
  { label: "Seguros", color: "bg-hub-seguros" },
  { label: "Saúde", color: "bg-hub-saude" },
  { label: "Consórcios", color: "bg-hub-consorcios" },
  { label: "Financeiro", color: "bg-hub-financeiro" },
  { label: "Serviços", color: "bg-hub-servicos" },
];

export default function Footer() {
  return (
    <footer className="border-t border-accent/20 py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Logo + tagline */}
          <div>
            <img src={logo} alt="Plan10" className="h-12 rounded mb-3" />
            <p className="text-sm text-muted-foreground font-inter">O seu futuro MUITO mais tranquilo.</p>
          </div>

          {/* Nav */}
          <div>
            <h3 className="font-sora font-semibold text-sm text-foreground mb-4">Navegação</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="footer-link inline-block text-sm text-muted-foreground font-inter"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sora font-semibold text-sm text-foreground mb-4">Contato</h3>
            <ul className="space-y-2 text-sm text-muted-foreground font-inter">
              <li>
                <a href="https://api.whatsapp.com/send/?phone=5511991051616" target="_blank" rel="noopener noreferrer" className="footer-link inline-block">
                  WhatsApp: (11) 99105-1616
                </a>
              </li>
              <li>
                <a href="mailto:contato@plan10.com.br" className="footer-link inline-block">
                  contato@plan10.com.br
                </a>
              </li>
              <li>
                <a href="https://instagram.com/plan10seguros" target="_blank" rel="noopener noreferrer" className="footer-link inline-block">
                  @plan10seguros
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/plan10seguros" target="_blank" rel="noopener noreferrer" className="footer-link inline-block">
                  /plan10seguros
                </a>
              </li>
            </ul>
          </div>

          {/* Hubs */}
          <div>
            <h3 className="font-sora font-semibold text-sm text-foreground mb-4">Nossos Eixos</h3>
            <div className="space-y-2">
              {hubs.map((hub) => (
                <div key={hub.label} className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${hub.color}`} />
                  <span className="text-sm text-muted-foreground font-inter">{hub.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground font-inter">
          <p>© 2025 Plan10. Todos os direitos reservados.</p>
          <p>
            Desenvolvido por{" "}
            <a href="https://nextcorporation.com.br" target="_blank" rel="noopener noreferrer" className="text-accent hover:brightness-110 transition-all">
              Next Corporation
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
