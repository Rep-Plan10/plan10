

# Plan10 — Website Institucional Completo

## Visão Geral
Site single-page profissional para a Plan10, consultoria e corretora multimodal de seguros, saúde, consórcios, finanças e serviços. Design arquétipo TECH: fundo escuro, glassmorphism, animações suaves, paleta navy/purple/orange.

## Design System
- **Paleta**: Dark navy (#0A0F1C), blue (#0B3C8A), purple (#5B2D8C), orange accent (#F28C28), hub colors para cada eixo
- **Tipografia**: Sora (headings) + Inter (body) via Google Fonts
- **Cards**: Glassmorphism com backdrop-blur, bordas semi-transparentes, glow on hover
- **CTAs**: Orange accent (#F28C28), cantos retos, sombra glow

## Estrutura de Componentes

### 1. Header/Navbar
- Fixo no topo, backdrop-blur, hide-on-scroll-down/show-on-scroll-up
- Logo: imagem uploaded (plan10_2.jpg) com tratamento para fundo escuro
- Nav links com smooth scroll + CTA WhatsApp
- Menu hamburger mobile com overlay

### 2. Hero
- Text reveal animation no headline "O seu futuro MUITO mais tranquilo."
- Gradient mesh animado com orbs nas cores dos hubs
- 2 CTAs: WhatsApp + scroll para soluções
- 5 pills coloridas dos eixos de negócio

### 3. Sobre (About)
- Layout 60/40 (texto + stats animados com count-up)
- Missão, Visão, Valores
- Imagem placeholder Unsplash

### 4. Soluções (Services)
- Grid de 5 cards glassmorphism, cada um com cor do hub
- Ícones Lucide, descrições completas, CTAs para WhatsApp
- Seguros, Saúde, Consórcios, Financeiro, Serviços

### 5. Diferenciais
- Grid 2x3 com cards glassmorphism
- 6 diferenciais com ícones e descrições

### 6. Como Funciona (Process)
- 5 etapas com linha conectora glowing (#F28C28)
- Horizontal desktop, vertical mobile

### 7. Depoimentos (Testimonials)
- Marquee auto-scroll em duas fileiras, direções opostas
- 6 depoimentos reais com estrelas

### 8. CTA Final
- Fundo gradiente blue→purple
- Headline + CTA WhatsApp grande

### 9. Contato
- Formulário com validação (nome, email, telefone com máscara BR, assunto dropdown, mensagem)
- Info de contato lateral: WhatsApp, email, Instagram, Facebook
- Toast de sucesso

### 10. Footer
- Logo imagem + tagline
- Nav links, contato, hub color pills
- Crédito "Desenvolvido por Next Corporation"

### Elementos Flutuantes
- Botão WhatsApp flutuante (bottom-right) com pulse
- Botão scroll-to-top (bottom-left) após 400px

## Animações
- Intersection Observer para scroll-triggered fade-in/translate
- Text reveal sequencial no hero
- Count-up nos stats
- Stagger 100ms em grids
- Hover glow em cards e botões
- Respeita prefers-reduced-motion

## SEO & Acessibilidade
- Meta tags OG/Twitter, lang="pt-BR"
- HTML semântico, alt texts em português
- WCAG AA contrast, focus-visible styles
- Lazy loading de imagens

