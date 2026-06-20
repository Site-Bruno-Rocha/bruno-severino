import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { CRP, EMAIL_PLACEHOLDER, WHATSAPP_URL } from "@/config";

const PoliticaDePrivacidade = () => {
  const updated = "20 de junho de 2026";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/40">
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Voltar ao site
          </Link>
          <span className="text-xs text-muted-foreground/70">CRP {CRP}</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div
          role="note"
          className="mb-10 rounded-lg border border-yellow-500/30 bg-yellow-500/5 px-4 py-3 text-sm text-yellow-200/90"
        >
          <strong className="font-semibold">Aviso (placeholder):</strong> este texto é um modelo
          inicial gerado automaticamente e <strong>deve ser revisado por um(a) advogado(a)</strong>{" "}
          antes da publicação definitiva, especialmente para adequação à LGPD (Lei nº 13.709/2018)
          e ao Código de Ética Profissional do Psicólogo (CFP).
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-3">Política de Privacidade</h1>
        <p className="text-sm text-muted-foreground mb-10">Última atualização: {updated}</p>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Controlador dos dados</h2>
            <p>
              Esta Política descreve como <strong>Bruno Severino Rocha</strong>, psicólogo inscrito
              no CRP {CRP} ("controlador"), trata os dados pessoais coletados por meio deste site,
              em conformidade com a Lei Geral de Proteção de Dados Pessoais — LGPD (Lei nº
              13.709/2018).
            </p>
            <p className="mt-3">
              Contato do controlador / Encarregado (DPO):{" "}
              <a href={`mailto:${EMAIL_PLACEHOLDER}`} className="text-primary hover:underline">
                {EMAIL_PLACEHOLDER}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Dados coletados</h2>
            <p>Coletamos apenas os dados estritamente necessários para o contato e o agendamento:</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>Nome e mensagens enviadas via WhatsApp ou e-mail;</li>
              <li>Número de telefone, quando informado pelo titular;</li>
              <li>Endereço de e-mail, quando informado pelo titular;</li>
              <li>
                Dados técnicos de navegação (endereço IP, tipo de dispositivo, páginas visitadas),
                coletados de forma agregada para fins estatísticos e de segurança.
              </li>
            </ul>
            <p className="mt-3">
              <strong>Não coletamos dados sensíveis</strong> (saúde, religião, orientação sexual,
              entre outros) por meio dos formulários ou links deste site. Informações clínicas são
              tratadas apenas no contexto reservado do atendimento, conforme o sigilo profissional.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Finalidade do tratamento</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Responder a contatos e dúvidas recebidos via WhatsApp ou e-mail;</li>
              <li>Agendar, confirmar e reagendar sessões de psicoterapia;</li>
              <li>Cumprir obrigações legais e regulatórias da prática profissional;</li>
              <li>Manter a segurança e o bom funcionamento do site.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Base legal</h2>
            <p>O tratamento de dados pessoais ocorre com fundamento nas seguintes hipóteses do art. 7º da LGPD:</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>
                <strong>Consentimento</strong> do titular ao iniciar contato pelos canais
                disponibilizados;
              </li>
              <li>
                <strong>Execução de contrato</strong> ou de procedimentos preliminares ao
                atendimento psicológico;
              </li>
              <li>
                <strong>Cumprimento de obrigação legal ou regulatória</strong>, em especial as
                determinações do Conselho Federal de Psicologia;
              </li>
              <li>
                <strong>Legítimo interesse</strong>, para segurança e melhoria do site, respeitados
                os direitos do titular.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Compartilhamento</h2>
            <p>
              Os dados <strong>não são vendidos nem cedidos</strong> a terceiros para fins
              comerciais. Há compartilhamento apenas com:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>Provedores de infraestrutura (hospedagem do site e e-mail);</li>
              <li>WhatsApp/Meta, quando o titular opta por iniciar conversa por esse canal;</li>
              <li>
                Autoridades públicas, quando exigido por lei, ordem judicial ou regulamentação do
                Conselho Federal de Psicologia.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              6. Sigilo profissional (Código de Ética do CFP)
            </h2>
            <p>
              Todo conteúdo trazido em atendimento psicológico é protegido pelo{" "}
              <strong>sigilo profissional</strong>, conforme o Código de Ética Profissional do
              Psicólogo (Resolução CFP nº 010/2005) e a legislação aplicável. O sigilo só poderá
              ser rompido nas hipóteses excepcionais previstas no próprio Código (por exemplo,
              risco à vida ou ordem judicial), sempre comunicando ao titular sempre que possível e
              restringindo-se ao estritamente necessário.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Retenção e segurança</h2>
            <p>
              Os dados são armazenados pelo tempo necessário ao cumprimento das finalidades acima
              ou por prazo legal/regulatório aplicável (incluindo a guarda de prontuário
              psicológico pelo prazo mínimo previsto pelo CFP). São adotadas medidas técnicas e
              administrativas razoáveis para proteger as informações contra acesso não autorizado,
              perda ou alteração.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">8. Direitos do titular</h2>
            <p>Nos termos do art. 18 da LGPD, o titular pode, a qualquer tempo, solicitar:</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>Confirmação da existência de tratamento;</li>
              <li>Acesso aos dados;</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
              <li>Portabilidade;</li>
              <li>Eliminação dos dados tratados com base no consentimento;</li>
              <li>Informação sobre compartilhamentos;</li>
              <li>Revogação do consentimento.</li>
            </ul>
            <p className="mt-3">
              As solicitações podem ser enviadas para{" "}
              <a href={`mailto:${EMAIL_PLACEHOLDER}`} className="text-primary hover:underline">
                {EMAIL_PLACEHOLDER}
              </a>{" "}
              ou pelo{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                WhatsApp
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">9. Cookies</h2>
            <p>
              O site pode utilizar cookies estritamente necessários ao seu funcionamento e,
              eventualmente, cookies analíticos agregados. O titular pode bloqueá-los nas
              configurações do navegador.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">10. Alterações</h2>
            <p>
              Esta Política pode ser atualizada a qualquer momento. A versão vigente estará sempre
              disponível nesta página, com a respectiva data de atualização.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">11. Contato</h2>
            <p>
              Dúvidas sobre privacidade e proteção de dados:{" "}
              <a href={`mailto:${EMAIL_PLACEHOLDER}`} className="text-primary hover:underline">
                {EMAIL_PLACEHOLDER}
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PoliticaDePrivacidade;
