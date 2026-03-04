import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchPublishedPostById, type DbPost } from "@/hooks/usePosts";
import CTAButton from "./CTAButton";
import WhatsAppButton from "./WhatsAppButton";

interface BlogModalProps {
  postId: string | null;
  open: boolean;
  onClose: () => void;
}

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
        <h2 key={i} className="text-lg font-semibold text-foreground mt-8 mb-3">
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("- **")) {
      const match = line.match(/^- \*\*(.+?)\*\*(.*)$/);
      if (match) {
        elements.push(
          <li key={i} className="text-muted-foreground leading-relaxed mb-1 ml-4">
            <strong className="text-foreground font-medium">{match[1]}</strong>
            {match[2]}
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
      elements.push(<hr key={i} className="border-border my-6" />);
    } else if (line.trim() !== "") {
      elements.push(
        <p key={i} className="text-muted-foreground leading-relaxed mb-4">
          {line}
        </p>
      );
    }
    i++;
  }

  return elements;
};

const BlogModal = ({ postId, open, onClose }: BlogModalProps) => {
  const [post, setPost] = useState<DbPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !postId) return;

    let active = true;
    setLoading(true);
    setError(null);

    fetchPublishedPostById(postId)
      .then((data) => {
        if (!active) return;
        setPost(data);
        if (!data) setError("Este artigo não está mais disponível.");
      })
      .catch(() => {
        if (!active) return;
        setError("Não foi possível carregar o artigo agora.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [open, postId]);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border/50 p-0">
        <div className="p-8">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : error || !post ? (
            <div className="py-8 text-center">
              <DialogTitle className="text-lg text-foreground mb-2">Artigo indisponível</DialogTitle>
              <p className="text-sm text-muted-foreground">{error ?? "Este artigo não está mais disponível."}</p>
            </div>
          ) : (
            <>
              <DialogHeader className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary" className="text-xs font-normal px-2.5 py-1 rounded-lg">
                    {post.category}
                  </Badge>
                  <time dateTime={(post.published_at ?? post.created_at).slice(0, 10)} className="text-xs text-muted-foreground">
                    {formatDate(post.published_at ?? post.created_at)}
                  </time>
                </div>
                <DialogTitle className="text-xl md:text-2xl font-semibold text-foreground leading-tight text-left">
                  {post.title}
                </DialogTitle>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed text-left">{post.excerpt}</p>
              </DialogHeader>

              <hr className="border-border mb-6" />

              <div>{renderContent(post.content)}</div>

              <div className="mt-10 p-6 rounded-2xl bg-secondary/50 border border-border/50 text-center">
                <p className="text-sm text-muted-foreground mb-4">Quer conversar sobre isso?</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <CTAButton href="#agendar" onClick={onClose} showArrow>
                    Agendar sessão
                  </CTAButton>
                  <WhatsAppButton size="sm" />
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogModal;

