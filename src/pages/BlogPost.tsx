import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getPostBySlug, formatDate } from "@/data/posts";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Bruno Severino`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", post.excerpt);
      else {
        const m = document.createElement("meta");
        m.name = "description";
        m.content = post.excerpt;
        document.head.appendChild(m);
      }
    }
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  // Render markdown-like content (basic)
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="text-xl font-medium text-foreground mt-10 mb-4">
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("- **")) {
        // Bold list item
        const match = line.match(/^- \*\*(.+?)\*\*(.*)$/);
        if (match) {
          elements.push(
            <li key={i} className="text-muted-foreground leading-relaxed mb-1">
              <strong className="text-foreground font-medium">{match[1]}</strong>{match[2]}
            </li>
          );
        }
      } else if (line.startsWith("- ")) {
        elements.push(
          <li key={i} className="text-muted-foreground leading-relaxed mb-1">
            {line.replace("- ", "")}
          </li>
        );
      } else if (line.startsWith("---")) {
        elements.push(<hr key={i} className="border-border my-8" />);
      } else if (line.trim() !== "") {
        elements.push(
          <p key={i} className="text-muted-foreground leading-relaxed mb-5">
            {line}
          </p>
        );
      }
      i++;
    }
    return elements;
  };

  return (
    <>
      <Header />
      <main className="pt-28 pb-20">
        <article className="max-w-2xl mx-auto px-6">
          {/* Voltar */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            <ArrowLeft size={15} />
            Voltar ao blog
          </Link>

          {/* Header do post */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <Badge variant="secondary" className="text-xs font-normal px-2.5 py-1 rounded-lg">
                {post.category}
              </Badge>
              <time dateTime={post.date} className="text-xs text-muted-foreground">
                {formatDate(post.date)}
              </time>
            </div>
            <h1 className="text-2xl md:text-3xl font-medium text-foreground mb-4 text-balance leading-tight">
              {post.title}
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Divisor */}
          <hr className="border-border mb-10" />

          {/* Conteúdo */}
          <div className="prose-custom">
            {renderContent(post.content)}
          </div>

          {/* CTA final */}
          <div className="mt-16 p-8 rounded-2xl bg-secondary/50 border border-border text-center">
            <p className="text-sm text-muted-foreground mb-2">Ficou com alguma dúvida ou quer conversar?</p>
            <h2 className="text-lg font-medium text-foreground mb-6">
              Agende uma sessão ou entre em contato.
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <CTAButton href="/#agendar" showArrow>
                Agendar sessão
              </CTAButton>
              <WhatsAppButton />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
