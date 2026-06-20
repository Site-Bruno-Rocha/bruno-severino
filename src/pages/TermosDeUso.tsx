import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { CRP, EMAIL_PLACEHOLDER } from "@/config";
import { usePageMeta } from "@/hooks/usePageMeta";

const TermosDeUso = () => {
  usePageMeta({
    title: "Termos de Uso | Bruno Severino Rocha — Psicólogo",
    description:
      "Termos de uso do site do psicólogo Bruno Severino Rocha (CRP 06/171992): finalidade do site, agendamento, sigilo profissional e responsabilidades.",
    path: "/termos-de-uso",
  });

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
          inicial e <strong>deve ser revisado por um(a) advogado(a)</strong> antes da publicação
          definitiva.
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-3">Termos de Uso</h1>
        <p className="text-sm text-muted-foreground mb-10">Última atualização: {updated}</p>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Sobre o site</h2>
            <p>
              Este site é mantido por <strong>Bruno Severino Rocha</strong>, psicólogo inscrito no
              CRP {CRP}, com finalidade exclusivamente informativa sobre os serviços de psicologia
              prestados pelo profissional.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Aceitação</h2>
            <p>
              Ao acessar e utilizar este site, o usuário declara estar de acordo com estes Termos
              de Uso e com a{" "}
              <Link to="/politica-de-privacidade" className="text-primary hover:underline">
                Política de Privacidade
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Conteúdo informativo</h2>
            <p>
              As informações disponibilizadas no site, incluindo artigos do blog, têm caráter
              estritamente educativo e <strong>não substituem</strong> avaliação, diagnóstico ou
              atendimento psicológico individual.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Agendamento</h2>
            <p>
              O agendamento de sessões ocorre exclusivamente por WhatsApp ou e-mail. A confirmação
              da sessão depende de retorno do profissional e do acordo entre as partes quanto a
              data, horário e valores.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Sigilo profissional</h2>
            <p>
              Todo atendimento é regido pelo <strong>sigilo profissional</strong> previsto no
              Código de Ética Profissional do Psicólogo (Resolução CFP nº 010/2005), respeitadas as
              exceções legais.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Propriedade intelectual</h2>
            <p>
              Textos, imagens, marca e identidade visual deste site são de titularidade do
              profissional e protegidos pela legislação aplicável. É vedada a reprodução total ou
              parcial sem autorização prévia e por escrito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Links externos</h2>
            <p>
              O site pode conter links para serviços de terceiros (como WhatsApp e Instagram). O
              profissional não se responsabiliza pelo conteúdo ou pelas práticas de privacidade
              desses terceiros.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">8. Limitação de responsabilidade</h2>
            <p>
              Empenhamo-nos para manter o site disponível e com informações corretas, mas não
              garantimos sua disponibilidade ininterrupta nem nos responsabilizamos por decisões
              tomadas exclusivamente com base no conteúdo aqui publicado.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">9. Alterações</h2>
            <p>
              Estes Termos podem ser atualizados a qualquer momento. A versão vigente estará sempre
              disponível nesta página.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">10. Foro e contato</h2>
            <p>
              Fica eleito o foro da comarca de domicílio do profissional para dirimir eventuais
              controvérsias. Contato:{" "}
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

export default TermosDeUso;
