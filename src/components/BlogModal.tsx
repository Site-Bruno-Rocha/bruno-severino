import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { formatDate, type Post } from "@/data/posts";
import { X } from "lucide-react";
import CTAButton from "./CTAButton";
import WhatsAppButton from "./WhatsAppButton";

interface BlogModalProps {
  post: Post | null;
  open: boolean;
  onClose: () => void;
}

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

const BlogModal = ({ post, open, onClose }: BlogModalProps) => {
  if (!post) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border/50 p-0">
        <div className="p-8">
          <DialogHeader className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" className="text-xs font-normal px-2.5 py-1 rounded-lg">
                {post.category}
              </Badge>
              <time dateTime={post.date} className="text-xs text-muted-foreground">
                {formatDate(post.date)}
              </time>
            </div>
            <DialogTitle className="text-xl md:text-2xl font-semibold text-foreground leading-tight text-left">
              {post.title}
            </DialogTitle>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed text-left">
              {post.excerpt}
            </p>
          </DialogHeader>

          <hr className="border-border mb-6" />

          <div>{renderContent(post.content)}</div>

          {/* CTA */}
          <div className="mt-10 p-6 rounded-2xl bg-secondary/50 border border-border/50 text-center">
            <p className="text-sm text-muted-foreground mb-4">Quer conversar sobre isso?</p>
            <div className="flex flex-wrap justify-center gap-3">
              <CTAButton href="#agendar" onClick={onClose} showArrow>
                Agendar sessão
              </CTAButton>
              <WhatsAppButton size="sm" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogModal;
