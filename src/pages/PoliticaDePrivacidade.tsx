import plan10LogoNew from "@/assets/plan10-logo-consorcio.png";

export default function PoliticaDePrivacidade() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#06006B] via-[#08007A] to-[#1A4FD8] text-foreground font-inter">
      {/* Mini header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#06006B]/80 border-b border-white/5">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => window.location.href = '/'} className="focus:outline-none cursor-pointer" aria-label="Ir para o início">
            <img src={plan10LogoNew} alt="Plan10 Consórcio" className="h-8 sm:h-9 w-auto" />
          </button>
          <button
            onClick={() => window.history.back()}
            className="text-sm text-muted-foreground hover:text-accent transition-colors font-semibold"
          >
            ← Voltar
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-sora font-bold text-3xl text-foreground mb-2">
          POLÍTICA DE PRIVACIDADE — PLAN10 CONSÓRCIO
        </h1>
        <p className="text-muted-foreground mb-10">Última atualização: abril de 2025</p>

        <div className="space-y-0">
          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">1. Quem somos</h2>
            <p className="text-gray-300 leading-relaxed">
              Plan10 Consórcio, correspondente autorizada da Porto Seguro Companhia de Seguros Gerais S.A., inscrita no CNPJ [INSERIR CNPJ], com sede em [INSERIR ENDEREÇO].
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">2. Dados coletados</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Coletamos os seguintes dados pessoais fornecidos voluntariamente:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Nome completo</li>
              <li>CPF</li>
              <li>E-mail</li>
              <li>Telefone</li>
              <li>Tipo de consórcio de interesse</li>
              <li>Faixa de crédito</li>
              <li>Informações inseridas nos formulários do site</li>
            </ul>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">3. Finalidade</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Envio de propostas personalizadas</li>
              <li>Contato de consultores</li>
              <li>Cumprimento de obrigações legais perante BACEN e SUSEP</li>
            </ul>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">4. Base legal (LGPD — Lei nº 13.709/2018)</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Consentimento (art. 7º, I)</li>
              <li>Execução de contrato (art. 7º, V)</li>
            </ul>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">5. Compartilhamento</h2>
            <p className="text-gray-300 leading-relaxed">
              Seus dados são compartilhados apenas com a Porto Seguro para fins operacionais. Não comercializamos dados a terceiros.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">6. Segurança</h2>
            <p className="text-gray-300 leading-relaxed">
              Armazenamento com criptografia SSL/TLS, medidas técnicas e organizacionais contra acesso não autorizado.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">7. Retenção</h2>
            <p className="text-gray-300 leading-relaxed">
              Pelo prazo do serviço e mínimo legal (Resolução CMN nº 4.893/2021).
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">8. Direitos do titular (LGPD)</h2>
            <p className="text-gray-300 leading-relaxed mb-3">De acordo com a Lei nº 13.709/2018, você tem direito a:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Acesso aos dados</li>
              <li>Correção de dados incompletos ou inexatos</li>
              <li>Eliminação dos dados pessoais</li>
              <li>Portabilidade dos dados</li>
              <li>Revogação do consentimento</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-3">
              Contato: [INSERIR E-MAIL DE PRIVACIDADE]
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">9. Cookies</h2>
            <p className="text-gray-300 leading-relaxed">
              Cookies de sessão e Google Analytics. Configuráveis no navegador.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">10. Alterações</h2>
            <p className="text-gray-300 leading-relaxed">
              Esta política é atualizada periodicamente nesta mesma página.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">11. DPO — Encarregado</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Encarregado: [INSERIR NOME]</li>
              <li>E-mail: [INSERIR]</li>
              <li>Telefone: [INSERIR]</li>
            </ul>
          </section>
        </div>
      </main>

      <footer className="bg-[#06006B] py-8 border-t border-white/5">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          <p>
            © 2026 Plan10 Consórcio. | Desenvolvido por{" "}
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
