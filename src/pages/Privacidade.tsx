const plan10Logo = '/Plan10_-_Logo_Consorcio_01.png';

export default function Privacidade() {
  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
      {/* Mini header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-white/5">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => window.location.href = '/'} className="focus:outline-none cursor-pointer" aria-label="Ir para o início">
            <img src={plan10Logo} alt="Plan10 Consórcio" className="h-10 w-auto" />
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
        <h1 className="font-sora font-bold text-3xl text-foreground mb-2">Política de Privacidade</h1>
        <p className="text-muted-foreground mb-10">Última atualização: março de 2025</p>

        <div className="space-y-0">
          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">1. Quem somos</h2>
            <p className="text-gray-300 leading-relaxed">
              A Plan10 Seguros é uma consultoria e corretora multimodal especializada em consórcios, seguros, planos de saúde e produtos financeiros. Nosso site é plan10.com.br e esta Política de Privacidade se aplica à nossa Landing Page de consórcio e a todas as comunicações realizadas por meio dela.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">2. Quais dados coletamos</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Coletamos apenas os dados que você nos fornece voluntariamente ao preencher o formulário de simulação ou ao entrar em contato pelo WhatsApp:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Nome completo</li>
              <li>Número de telefone (WhatsApp)</li>
              <li>Tipo de consórcio de interesse</li>
              <li>Valor de crédito desejado</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-3">
              Não coletamos dados de pagamento, documentos pessoais (CPF, RG) nem qualquer informação sensível por meio desta página.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">3. Para que usamos seus dados</h2>
            <p className="text-gray-300 leading-relaxed mb-3">Os dados fornecidos são utilizados exclusivamente para:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Entrar em contato com você para apresentar simulações e condições de consórcio personalizadas;</li>
              <li>Responder dúvidas e prestar consultoria gratuita;</li>
              <li>Encaminhar sua proposta à administradora Porto Bank, quando autorizado por você.</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-3">
              Não utilizamos seus dados para envio de spam, telemarketing não solicitado ou qualquer finalidade diferente das acima descritas.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">4. Compartilhamento de dados</h2>
            <p className="text-gray-300 leading-relaxed">
              Seus dados pessoais não são vendidos, alugados ou compartilhados com terceiros para fins comerciais. O único compartilhamento possível ocorre com a Porto Bank (administradora do consórcio), exclusivamente quando necessário para formalização do produto contratado e mediante seu consentimento expresso.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">5. Por quanto tempo guardamos seus dados</h2>
            <p className="text-gray-300 leading-relaxed">
              Mantemos seus dados pelo tempo necessário para a prestação dos serviços ou pelo prazo exigido pela legislação brasileira aplicável (incluindo o Código de Defesa do Consumidor e a Lei Geral de Proteção de Dados — LGPD). Após esse período, os dados são excluídos ou anonimizados.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">6. Seus direitos (LGPD)</h2>
            <p className="text-gray-300 leading-relaxed mb-3">De acordo com a Lei nº 13.709/2018 (LGPD), você tem direito a:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Confirmação da existência de tratamento dos seus dados;</li>
              <li>Acesso aos dados que temos sobre você;</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>Eliminação dos seus dados pessoais;</li>
              <li>Revogação do consentimento a qualquer momento;</li>
              <li>Portabilidade dos dados a outro fornecedor de serviço.</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-3">
              Para exercer qualquer um desses direitos, entre em contato pelo WhatsApp (11) 99105-1616 ou pelo e-mail de atendimento da Plan10.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">7. Cookies e rastreamento</h2>
            <p className="text-gray-300 leading-relaxed">
              Esta página pode utilizar cookies técnicos essenciais para funcionamento básico. Não utilizamos cookies de rastreamento ou publicidade comportamental de terceiros nesta página.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">8. Segurança</h2>
            <p className="text-gray-300 leading-relaxed">
              Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, perda ou divulgação indevida. A comunicação com nossos consultores ocorre por canais criptografados (WhatsApp).
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">9. Alterações nesta política</h2>
            <p className="text-gray-300 leading-relaxed">
              Esta Política de Privacidade pode ser atualizada periodicamente. Sempre que houver alterações relevantes, a data de "última atualização" no topo desta página será revisada. Recomendamos a consulta periódica.
            </p>
          </section>

          <section className="border-t border-white/10 pt-8 pb-8">
            <h2 className="text-xl font-semibold text-accent mb-3 font-sora">10. Contato</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Em caso de dúvidas sobre esta Política de Privacidade ou sobre o tratamento dos seus dados, entre em contato:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>WhatsApp: (11) 99105-1616</li>
              <li>Site: plan10.com.br</li>
            </ul>
          </section>
        </div>
      </main>

      <footer className="bg-background py-8 border-t border-white/5">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          <p>
            © 2025 Plan10 Seguros. | Desenvolvido por{" "}
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
