import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { posts } from "@/data/posts";
import { Search } from "lucide-react";

const Blog = () => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Blog | Bruno Severino — Psicanálise e Autoconhecimento";
    const meta = document.querySelector('meta[name="description"]');
    const desc = "Textos curtos sobre psicanálise, emoções e autoconhecimento. Blog do psicólogo Bruno Severino Rocha.";
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = desc;
      document.head.appendChild(m);
    }
  }, []);

  const filtered = posts.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <Header />
      <main className="pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          {/* Título */}
          <div className="mb-10 max-w-lg">
            <p className="text-xs uppercase tracking-widest text-primary font-medium mb-4">Blog</p>
            <h1 className="text-3xl md:text-4xl font-medium text-foreground mb-3 text-balance">
              Reflexões sobre saúde mental
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              Textos curtos sobre psicanálise, emoções e autoconhecimento.
            </p>
          </div>

          {/* Busca */}
          <div className="relative max-w-md mb-12">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Buscar artigos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Buscar artigos no blog"
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
            />
          </div>

          {/* Cards */}
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-sm">Nenhum artigo encontrado para "{query}".</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
