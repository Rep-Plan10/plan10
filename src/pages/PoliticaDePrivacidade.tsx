import plan10LogoNew from "@/assets/plan10-logo-consorcio.png";
import portoLogo from "@/assets/porto-logo.png";

export default function PoliticaDePrivacidade() {
  return (
    <div className="min-h-screen font-inter" style={{ backgroundColor: '#1A1F8F' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/5" style={{ backgroundColor: 'rgba(26,31,143,0.92)' }}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => window.location.href = '/'} className="focus:outline-none cursor-pointer" aria-label="Ir para o início">
              <img src={plan10LogoNew} alt="Plan10 Consórcio" className="h-8 sm:h-9 w-auto" />
            </button>
            <img src={portoLogo} alt="Porto" className="h-5 sm:h-6 w-auto object-contain" />
          </div>
          <button
            onClick={() => window.history.back()}
            className="text-sm text-white/60 hover:text-white transition-colors font-semibold"
          >
            ← Voltar
          </button>
        </div>
      </header>

      <main className="mx-auto px-6 py-12 sm:py-16" style={{ maxWidth: '860px' }}>
        {/* Title */}
        <h1 className="font-sora text-center mb-1" style={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF' }}>
          POLÍTICA DE PRIVACIDADE — PLAN10 CORRETORA
        </h1>
        <p className="text-center mb-10" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)' }}>
          Última atualização: abril de 2026
        </p>

        <div className="space-y-0" style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.88)' }}>
          {/* Intro */}
          <p className="mb-8">
            A Plan10 Corretora de Seguros Ltda. tem o compromisso de tratar seus dados pessoais com responsabilidade, transparência e segurança. Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos, compartilhamos e protegemos suas informações, em conformidade com a LGPD — Lei Geral de Proteção de Dados Pessoais nº 13.709/2018 e demais normas aplicáveis aos setores de consórcios, seguros, produtos financeiros, planos de saúde e serviços.
          </p>

          <hr className="border-white/10 my-8" />

          {/* 1 */}
          <Section n="1" title="IDENTIFICAÇÃO DO CONTROLADOR">
            <p>
              A Plan10 Corretora de Seguros Ltda., inscrita no CNPJ 44.980.545/0001-87, com sede na Av. Paulista, 1079 — 7º andar — Bela Vista — São Paulo — SP, doravante denominada Plan10, é a controladora responsável pelo tratamento de dados pessoais obtidos por meio deste site, canais de atendimento vinculados e demais canais digitais.
            </p>
          </Section>

          {/* 2 */}
          <Section n="2" title="COMO COLETAMOS SEUS DADOS PESSOAIS">
            <p>A Plan10 coleta dados pessoais de diferentes formas, sempre respeitando os princípios da necessidade, finalidade e transparência.</p>

            <Sub title="2.1. Informações fornecidas diretamente por você">
              <p>São dados que você nos entrega voluntariamente ao preencher formulários, solicitar simulações, enviar documentos, interagir com nossos consultores ou contratar nossos serviços. Esses dados permitem que possamos identificar você, entrar em contato e oferecer informações adequadas ao seu interesse, como: Nome completo, CPF, E-mail, Telefone / WhatsApp, tipos de produtos e serviços de seu interesse, faixa de crédito pretendida, outras informações inseridas nos formulários do site, landing page e outros.</p>
            </Sub>

            <Sub title="2.2. Informações recebidas de terceiros">
              <p>Em determinadas situações, recebemos dados pessoais por meio de parceiros comerciais, como seguradoras, financeiras, corretores associados, Operadoras de saúde, representantes bancários, empresas de serviços parceiras, plataformas de autenticação e bureaux de crédito. Esses dados são utilizados exclusivamente para finalidades legítimas, como análise de crédito, prevenção à fraude e continuidade do atendimento iniciado por você.</p>
            </Sub>

            <Sub title="2.3. Informações coletadas automaticamente">
              <p>Ao navegar em nosso site ou utilizar nossos canais digitais, algumas informações são coletadas automaticamente por meio de cookies, pixels, identificadores de dispositivo e ferramentas de analytics. Esses dados ajudam a melhorar a experiência do usuário, medir desempenho, identificar erros e personalizar conteúdo. Exemplos de dados coletados na navegação: Endereço IP, geolocalização aproximada, tipo de navegador, páginas acessadas, tempo de sessão.</p>
            </Sub>

            <Sub title="2.4. Informações obtidas de fontes públicas">
              <p>Podemos consultar informações disponíveis em bases públicas, como redes sociais, portais de transparências governamentais e registros oficiais, especialmente para fins de validação antifraude e cumprimento de obrigações legais.</p>
            </Sub>
          </Section>

          {/* 3 */}
          <Section n="3" title="QUAIS DADOS PESSOAIS TRATAMOS">
            <p>A Plan10 trata diferentes categorias de dados pessoais, dependendo da sua interação conosco.</p>

            <Sub title="3.1. Dados pessoais comuns">
              <p>Incluem informações como: Identificação (nome, CPF, RG, data de nascimento); contato (telefone, e-mail, endereço); dados financeiros (banco, renda, histórico de pagamentos); informações profissionais; dados de contratação de seguros, consórcios, produtos financeiros, planos de saúde e serviços; valor pretendido; histórico de relacionamento; dados de navegação.</p>
            </Sub>

            <Sub title="3.2. Dados pessoais sensíveis">
              <p>A Plan10 não solicita ou coleta e nem trata dados sensíveis, exceto quando estritamente necessário e exigido por lei, prevenir fraudes e cumprir obrigações legais ou exigências regulatórias. Quando isso ocorrer, o tratamento seguirá rigorosos padrões de segurança e proteção.</p>
            </Sub>
          </Section>

          {/* 4 */}
          <Section n="4" title="FINALIDADES DO TRATAMENTO">
            <p>
              Os dados pessoais coletados são utilizados para diversas finalidades legítimas, sempre informadas ao titular, entre elas: atendimento comercial (envio de propostas, simulações, informações sobre produtos e serviços comercializados e retorno de solicitações feitas por você); execução de contrato (análise de crédito, validação de identidade, formalização de documentos e comunicação durante todo o processo de contratação); cumprimento de obrigações legais e regulatórias (atendimento às normas do BACEN, SUSEP, Receita Federal e demais autoridades); prevenção à fraude e segurança (verificação de autenticidade, análise de risco e proteção das operações); melhoria contínua da experiência digital (análise de navegação, desempenho do site e personalização de conteúdo); comunicação institucional e marketing (envio de informações relevantes, desde que autorizado pelo titular); atendimento a solicitações do titular (exercício de direitos previstos na LGPD).
            </p>
          </Section>

          {/* 5 */}
          <Section n="5" title="BASES LEGAIS UTILIZADAS">
            <p>
              A Plan10 utiliza diferentes bases legais para justificar o tratamento dos dados pessoais, conforme previsto na LGPD: execução de contrato ou procedimentos preliminares (quando tratamos dados para atender solicitações ou formalizar contratações); consentimento (utilizado para comunicações opcionais, cookies de marketing e outras atividades que dependem da sua autorização); obrigação legal ou regulatória (aplicável em situações exigidas por órgãos como BACEN, SUSEP e Receita Federal); legítimo interesse (utilizado para garantir segurança, prevenir fraudes, melhorar serviços e realizar análises internas); proteção ao crédito (aplicável em análises financeiras e validações antifraude).
            </p>
          </Section>

          {/* 6 */}
          <Section n="6" title="COMPARTILHAMENTO DE DADOS">
            <p>
              Os dados poderão ser compartilhados, apenas quando necessário, sempre com proteção contratual adequada e exclusivamente para fins de operacionalização da contratação com operadores sob contrato de confidencialidade. Entre os destinatários estão: seguradoras; operadoras de saúde; financeiras; corretores parceiros; representantes bancários; bureaux de crédito; empresas de serviços parceiras; autoridades públicas quando exigido por lei ou ordem judicial; fornecedores de tecnologia e hospedagem; plataformas de autenticação; prestadores de serviços tecnológicos (hospedagem, CRM, automação, analytics, plataformas de multicalculos, comunicação e autenticação).
            </p>
            <div className="mt-4 rounded-xl pl-4 italic" style={{ borderLeft: '3px solid #F97316', background: 'rgba(249,115,22,0.08)', padding: '14px 18px', color: 'rgba(255,255,255,0.95)' }}>
              A Plan10 não comercializa, aluga ou cede dados pessoais para terceiros para fins publicitários, comerciais ou outra circunstância.
            </div>
          </Section>

          {/* 7 */}
          <Section n="7" title="TRANSFERÊNCIA INTERNACIONAL DE DADOS">
            <p>
              Alguns serviços utilizados pela Plan10 podem envolver transferência internacional, especialmente quando utilizamos ferramentas como Google Analytics, serviços em nuvem, plataformas de autenticação ou WhatsApp Business. Nesses casos, garantimos que a transferência ocorra conforme os mecanismos previstos na LGPD, como cláusulas contratuais padrão, execução de contrato ou decisões de adequação.
            </p>
          </Section>

          {/* 8 */}
          <Section n="8" title="PRAZO DE RETENÇÃO">
            <p>
              Os dados pessoais são mantidos pelo tempo necessário para a prestação do serviço e cumprir as finalidades informadas, respeitando prazos legais e regulatórios. Em setores regulados, como consórcios, seguros, produtos financeiros, planos de saúde e serviços, alguns dados podem ser mantidos por períodos que variam entre 5 e 30 anos, conforme exigências do BACEN, SUSEP, ANS, CMN e legislação financeira. Após o prazo, os dados são eliminados ou anonimizados de forma segura.
            </p>
          </Section>

          {/* 9 */}
          <Section n="9" title="DIREITOS DO TITULAR">
            <p>
              Você possui diversos direitos garantidos pela LGPD, como: confirmar a existência de tratamento de seus dados; acessar os dados que tratamos sobre você; correção de dados incompletos, inexatos ou desatualizados; solicitar anonimização, bloqueio ou eliminação de dados desnecessários; solicitar a portabilidade dos dados a outro fornecedor; informação sobre compartilhamento; revisão de decisões automatizadas; revogar o consentimento a qualquer momento, sem prejuízo à legalidade do tratamento realizado anteriormente; oposição ao tratamento; apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).
            </p>
            <p className="mt-3">
              Para exercer seus direitos, solicite diretamente ao DPO pelos canais informados no item 15 abaixo.
            </p>
          </Section>

          {/* 10 */}
          <Section n="10" title="LINKS PARA SITES DE TERCEIROS">
            <p>
              Este site pode conter links para portais de parceiros. A Plan10 não se responsabiliza pelas práticas de privacidade de sites externos. Recomendamos a leitura das políticas de privacidade de cada site visitado.
            </p>
          </Section>

          {/* 11 */}
          <Section n="11" title="COOKIES E TECNOLOGIAS DE RASTREAMENTO">
            <p>
              Utilizamos cookies para melhorar sua experiência, medir desempenho e personalizar conteúdo: cookies essenciais e necessários ao funcionamento do site; cookies analíticos para mensurar o desempenho das páginas; cookies de marketing para personalização de conteúdo e anúncios, com consentimento. Você pode configurar seu navegador para recusar cookies a qualquer momento. A desativação de cookies essenciais pode afetar o funcionamento do site.
            </p>
          </Section>

          {/* 12 */}
          <Section n="12" title="MENORES DE IDADE">
            <p>
              Os serviços da Plan10 são destinados a maiores de 18 anos. Não coletamos intencionalmente dados de menores. Caso identifique coleta e tratamento indevido de dados de menores, entre em contato para solicitar a eliminação imediata pelo canal de atendimento indicado nesta política.
            </p>
          </Section>

          {/* 13 */}
          <Section n="13" title="SEGURANÇA DA INFORMAÇÃO">
            <p>
              A Plan10 adota medidas técnicas e organizacionais robustas e adequadas para proteger seus dados, incluindo criptografia, controle de acesso, monitoramento contínuo dos sistemas, políticas internas de segurança e procedimentos de resposta a incidentes.
            </p>
          </Section>

          {/* 14 */}
          <Section n="14" title="ALTERAÇÕES DESTA POLÍTICA">
            <p>
              Esta Política pode ser atualizada periodicamente para refletir mudanças legais, tecnológicas ou operacionais. A versão vigente estará sempre disponível nesta página.
            </p>
          </Section>

          {/* 15 */}
          <Section n="15" title="ENCARREGADO DE PROTEÇÃO DE DADOS (DPO) E CONTATO">
            <p>
              Para garantir a conformidade com a legislação e facilitar a comunicação, a Plan10 possui um Encarregado de Proteção de Dados (DPO), responsável por atender solicitações, exercício de direitos, esclarecer dúvidas e interagir com a Autoridade Nacional de Proteção de Dados (ANPD).
            </p>
            <div className="mt-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)', padding: '16px 20px' }}>
              <p className="font-semibold text-white">E-mail: <a href="mailto:privacidade@plan10.com.br" className="underline underline-offset-2 hover:text-orange-400 transition-colors">privacidade@plan10.com.br</a></p>
              <p className="font-semibold text-white mt-1">Telefone: <a href="tel:+551122271700" className="underline underline-offset-2 hover:text-orange-400 transition-colors">11 2227-1700</a></p>
              <p className="mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>Horário de atendimento: dias úteis, das 9h às 18h (horário de Brasília)</p>
            </div>
          </Section>

          {/* 16 */}
          <Section n="16" title="FUNDAMENTAÇÃO LEGAL">
            <p>
              Esta Política de Privacidade e o tratamento dos dados estão em conformidade e se fundamentam nas hipóteses legais da: Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — consentimento do titular, execução de contrato ou procedimentos preliminares, cumprimento de obrigação legal ou regulatória, legítimo interesse do controlador, proteção ao crédito); Marco Civil da Internet (Lei nº 12.965/2014); Código de Defesa do Consumidor (Lei nº 8.078/1990); regulamentações da SUSEP e normatizações aplicáveis à atividade de corretagem de seguros, produtos financeiros, planos de saúde, consórcios e serviços.
            </p>
          </Section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5" style={{ backgroundColor: '#1A1F8F' }}>
        <div className="container mx-auto px-4 text-center text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
          <div className="flex items-center justify-center gap-4 mb-3">
            <a href="/politica-de-privacidade" className="hover:text-orange-400 transition-colors">Política de Privacidade</a>
            <span>|</span>
            <a href="/" className="hover:text-orange-400 transition-colors">plan10.com.br</a>
          </div>
          <p>
            © 2026 Plan10 Corretora de Seguros. | Desenvolvido por{" "}
            <a
              href="https://nextcorporation.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors underline underline-offset-2"
            >
              Next Corporation
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

/* Helper components */
function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <>
      <hr className="border-white/10 my-8" />
      <section>
        <h2 className="font-sora" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F97316', marginBottom: '8px' }}>
          {n}. {title}
        </h2>
        {children}
      </section>
    </>
  );
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <h3 className="font-sora font-semibold text-white mb-1" style={{ fontSize: '0.95rem' }}>{title}</h3>
      {children}
    </div>
  );
}
