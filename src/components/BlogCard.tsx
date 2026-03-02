import { formatDate, type Post } from "@/data/posts";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  post: Post;
  onClick?: () => void;
}

const BlogCard = ({ post, onClick }: BlogCardProps) => {
  return (
    <article
      className="group border border-border/50 rounded-2xl bg-card/50 p-6 hover:bg-card hover-lift cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      aria-label={`Leia o artigo: ${post.title}`}
    >
      <div className="flex items-center justify-between mb-3">
        <Badge variant="secondary" className="text-xs font-normal px-2.5 py-1 rounded-lg">
          {post.category}
        </Badge>
        <time dateTime={post.date} className="text-xs text-muted-foreground">
          {formatDate(post.date)}
        </time>
      </div>

      <h3 className="text-base font-medium text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
        {post.title}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
        {post.excerpt}
      </p>
    </article>
  );
};

export default BlogCard;
