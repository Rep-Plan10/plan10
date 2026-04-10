import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/plan10-logo-consorcio.png";

const WHATSAPP_URL = "https://api.whatsapp.com/send/?phone=5511938012222";

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      setVisible(currentY < lastScrollY || currentY < 100);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${scrolled ? "bg-background/90 backdrop-blur-xl shadow-lg shadow-black/20" : "bg-transparent"}`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img
            src={logo}
            alt="Plan10 - Consultoria e Corretora Multimodal"
            className="h-8 md:h-10 rounded"
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="nav-link-animated text-sm text-foreground/80 hover:text-accent transition-colors font-inter pb-1"
            >
              {link.label}
            </button>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn bg-accent text-accent-foreground px-5 py-2.5 text-sm font-semibold font-inter"
          >
            Falar com Especialista
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-foreground p-2"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-xl z-40">
          <div className="flex flex-col items-center gap-6 pt-12">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-lg text-foreground/80 hover:text-accent transition-colors font-inter"
              >
                {link.label}
              </button>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn bg-accent text-accent-foreground px-8 py-3 text-base font-semibold font-inter mt-4"
            >
              Falar com Especialista
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
