import plan10LogoNew from "@/assets/plan10-logo-consorcio.png";
import portoLogo from "@/assets/porto-logo.png";

export default function PoliticaDePrivacidade() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#06006B] via-[#08007A] to-[#1A4FD8] text-foreground font-inter">
      {/* Mini header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#06006B]/80 border-b border-white/5">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => window.location.href = '/'} className="focus:outline-none cursor-pointer" aria-label="Ir para o início">
              <img src={plan10LogoNew} alt="Plan10 Consórcio" className="h-8 sm:h-9 w-auto" />
            </button>
            <img src={portoLogo} alt="Porto" className="h-5 sm:h-6 w-auto object-contain" />
          </div>
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
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">1. Identificação do Controlador</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Plan10 Corretora de Seguros Ltda., inscrita no CNPJ [INSERIR CNPJ], com sede em [INSERIR ENDEREÇO COMPLETO], doravante denominada "Plan10", é a controladora dos dados pessoais tratados por meio deste site e dos canais de atendimento vinculados.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Contato do encarregado (DPO): [INSERIR E-MAIL] | [INSERIR TELEFONE]
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">2. Dados Pessoais Coletados</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Coletamos os seguintes dados fornecidos voluntariamente pelo titular:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 mb-4">
              <li>Nome completo</li>
              <li>CPF</li>
              <li>Endereço de e-mail</li>
              <li>Número de telefone / WhatsApp</li>
              <li>Tipo de consórcio de interesse (imóvel, veículo, pesados)</li>
              <li>Nicho e faixa de crédito pretendida</li>
              <li>Demais informações inseridas nos formulários do site</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mb-2 font-semibold">Dados coletados automaticamente (navegação):</p>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Endereço IP, tipo de navegador, páginas visitadas, tempo de sessão (via cookies e ferramentas de analytics).</li>
            </ul>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">3. Finalidade do Tratamento</h2>
            <p className="text-gray-300 leading-relaxed mb-3">Os dados são utilizados para:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Envio de propostas, simulações e informações sobre consórcios Porto;</li>
              <li>Contato de consultores Plan10 via telefone, e-mail ou WhatsApp;</li>
              <li>Melhoria contínua da experiência do usuário no site;</li>
              <li>Cumprimento de obrigações legais e regulatórias perante o BACEN, SUSEP e demais autoridades competentes.</li>
            </ul>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">4. Base Legal (LGPD — Lei nº 13.709/2018)</h2>
            <p className="text-gray-300 leading-relaxed mb-3">O tratamento dos dados se fundamenta nas seguintes hipóteses legais:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Consentimento do titular (art. 7º, I);</li>
              <li>Execução de contrato ou procedimentos preliminares (art. 7º, V);</li>
              <li>Cumprimento de obrigação legal ou regulatória (art. 7º, II);</li>
              <li>Legítimo interesse do controlador (art. 7º, IX), nos limites do art. 10.</li>
            </ul>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">5. Compartilhamento de Dados</h2>
            <p className="text-gray-300 leading-relaxed mb-3">Os dados poderão ser compartilhados exclusivamente com:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 mb-3">
              <li>Porto Seguro Companhia de Seguros Gerais S.A. e Porto Bank, para fins de operacionalização da contratação do consórcio;</li>
              <li>Fornecedores de tecnologia e hospedagem que atuam como operadores sob contrato de confidencialidade;</li>
              <li>Autoridades públicas, quando exigido por lei ou ordem judicial.</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              Não comercializamos, alugamos ou cedemos dados pessoais a terceiros para fins publicitários ou comerciais.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">6. Segurança da Informação</h2>
            <p className="text-gray-300 leading-relaxed">
              Adotamos medidas técnicas e organizacionais adequadas para proteger os dados pessoais contra acesso não autorizado, perda, destruição ou alteração indevida, incluindo criptografia SSL/TLS, controle de acesso restrito e monitoramento contínuo dos sistemas.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">7. Prazo de Retenção</h2>
            <p className="text-gray-300 leading-relaxed">
              Os dados são armazenados pelo tempo necessário à prestação do serviço e pelo prazo mínimo exigido pela legislação aplicável, especialmente a Resolução CMN nº 4.893/2021 e as determinações da SUSEP. Após esse período, os dados são eliminados ou anonimizados.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">8. Direitos do Titular</h2>
            <p className="text-gray-300 leading-relaxed mb-3">Conforme a LGPD (art. 18), você tem direito a:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Confirmar a existência de tratamento de seus dados;</li>
              <li>Acessar os dados que tratamos sobre você;</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
              <li>Solicitar anonimização, bloqueio ou eliminação de dados desnecessários;</li>
              <li>Solicitar a portabilidade dos dados a outro fornecedor;</li>
              <li>Revogar o consentimento a qualquer momento, sem prejuízo à legalidade do tratamento realizado anteriormente;</li>
              <li>Apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).</li>
            </ul>
            <div className="mt-3 text-gray-300 leading-relaxed space-y-1">
              <p>Para exercer seus direitos, entre em contato:</p>
              <p>E-mail: [INSERIR E-MAIL DE PRIVACIDADE]</p>
              <p>Telefone: [INSERIR TELEFONE]</p>
              <p>Prazo de resposta: até 15 dias úteis, conforme art. 19 da LGPD.</p>
            </div>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">9. Cookies e Tecnologias de Rastreamento</h2>
            <p className="text-gray-300 leading-relaxed mb-3">Utilizamos:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 mb-3">
              <li>Cookies essenciais: necessários ao funcionamento do site;</li>
              <li>Cookies analíticos: Google Analytics, para mensurar o desempenho das páginas;</li>
              <li>Cookies de marketing: para personalização de conteúdo e anúncios.</li>
            </ul>
            <p className="text-gray-300 leading-relaxed">
              Você pode configurar seu navegador para recusar cookies a qualquer momento. A desativação de cookies essenciais pode afetar o funcionamento do site.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">10. Links para Sites de Terceiros</h2>
            <p className="text-gray-300 leading-relaxed">
              Este site pode conter links para portais de parceiros (ex: Porto Bank). A Plan10 não se responsabiliza pelas práticas de privacidade de sites externos. Recomendamos a leitura das políticas de privacidade de cada site visitado.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">11. Menores de Idade</h2>
            <p className="text-gray-300 leading-relaxed">
              Nossos serviços são destinados a maiores de 18 anos. Não coletamos intencionalmente dados de menores. Caso identifique coleta indevida, solicite a eliminação pelo canal de atendimento ao titular indicado nesta política.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">12. Alterações desta Política</h2>
            <p className="text-gray-300 leading-relaxed">
              Esta política pode ser revisada periodicamente para refletir mudanças legais, tecnológicas ou operacionais. A versão vigente sempre estará disponível nesta página com a data de última atualização. Alterações relevantes serão comunicadas pelos canais de contato cadastrados.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">13. Encarregado de Proteção de Dados (DPO)</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Nome: [INSERIR NOME DO DPO]</li>
              <li>E-mail: [INSERIR E-MAIL]</li>
              <li>Telefone: [INSERIR TELEFONE]</li>
              <li>Horário de atendimento: dias úteis, das 9h às 18h (horário de Brasília)</li>
            </ul>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <p className="text-gray-400 text-sm leading-relaxed">
              Esta Política de Privacidade está em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018), o Marco Civil da Internet (Lei nº 12.965/2014), o Código de Defesa do Consumidor (Lei nº 8.078/1990) e as regulamentações da SUSEP e BACEN aplicáveis à atividade de corretagem de seguros e consórcios.
            </p>
          </section>
        </div>
      </main>

      <footer className="bg-[#06006B] py-8 border-t border-white/5">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          <div className="flex items-center justify-center gap-4 mb-3">
            <a href="/politica-de-privacidade" className="hover:text-accent transition-colors">Política de Privacidade</a>
            <span>|</span>
            <a href="/" className="hover:text-accent transition-colors">plan10.com.br</a>
          </div>
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
