import { Link } from "react-router-dom";
import { formatDate, type Post } from "@/data/posts";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
  post: Post;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="group border border-border rounded-2xl bg-card p-6 hover:shadow-md hover:-translate-y-px transition-all duration-200">
      <Link
        to={`/blog/${post.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
        aria-label={`Leia o artigo: ${post.title}`}
      >
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="text-xs font-normal px-2.5 py-1 rounded-lg">
            {post.category}
          </Badge>
          <time
            dateTime={post.date}
            className="text-xs text-muted-foreground"
          >
            {formatDate(post.date)}
          </time>
        </div>

        <h2 className="text-base font-medium text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
          {post.title}
        </h2>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>

        <div className="mt-4 flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Ler artigo <ArrowRight size={13} />
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
