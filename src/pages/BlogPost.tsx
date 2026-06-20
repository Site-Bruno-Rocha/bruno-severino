import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTAButton from "@/components/CTAButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import { supabase } from "@/integrations/supabase/client";
import type { DbPost } from "@/hooks/usePosts";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { normalizeTitle } from "@/lib/title";
import { usePageMeta } from "@/hooks/usePageMeta";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

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
      const match = line.match(/^- \*\*(.+?)\*\*(.*)$/);
      if (match) {
        elements.push(
          <li key={i} className="text-muted-foreground leading-relaxed mb-1 ml-4">
            <strong className="text-foreground font-medium">{match[1]}</strong>{match[2]}
          </li>
        );
      }
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="text-muted-foreground leading-relaxed mb-1 ml-4">
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

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<DbPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let active = true;
    setLoading(true);
    setNotFound(false);

    supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active) return;
        if (error || !data) {
          setNotFound(true);
          setPost(null);
        } else {
          setPost(data as DbPost);
        }
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  const title = post ? normalizeTitle(post.title) : "Artigo";
  usePageMeta({
    title: post ? `${title} | Bruno Severino Rocha` : "Artigo | Bruno Severino Rocha",
    description: post?.excerpt ?? "Artigo do blog de Bruno Severino Rocha — psicólogo (psicanálise).",
    path: `/blog/${slug ?? ""}`,
  });

  useEffect(() => {
    if (!loading && notFound) {
      const timer = setTimeout(() => navigate("/#blog", { replace: true }), 2500);
      return () => clearTimeout(timer);
    }
  }, [loading, notFound, navigate]);

  return (
    <>
      <Header />
      <main className="pt-28 pb-20">
        <article className="max-w-2xl mx-auto px-6">
          <Link
            to="/#blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 rounded"
          >
            <ArrowLeft size={15} />
            Voltar ao blog
          </Link>

          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : notFound || !post ? (
            <div className="py-16 text-center">
              <h1 className="text-2xl font-semibold text-foreground mb-3">Artigo não encontrado</h1>
              <p className="text-sm text-muted-foreground">
                Este artigo não está mais disponível. Redirecionando para o blog…
              </p>
            </div>
          ) : (
            <>
              <header className="mb-10">
                <div className="flex items-center gap-3 mb-5">
                  <Badge variant="secondary" className="text-xs font-normal px-2.5 py-1 rounded-lg">
                    {post.category}
                  </Badge>
                  <time
                    dateTime={(post.published_at ?? post.created_at).slice(0, 10)}
                    className="text-xs text-muted-foreground"
                  >
                    {formatDate(post.published_at ?? post.created_at)}
                  </time>
                </div>
                <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 text-balance leading-tight normal-case">
                  {title}
                </h1>
                <p className="text-muted-foreground text-base leading-relaxed">{post.excerpt}</p>
              </header>

              <hr className="border-border mb-10" />

              <div>{renderContent(post.content)}</div>

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
            </>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
