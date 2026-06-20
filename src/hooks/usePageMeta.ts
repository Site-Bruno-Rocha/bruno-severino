import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
  /** Path-only (e.g. "/politica-de-privacidade") — resolved against the site origin */
  path: string;
}

const SITE_ORIGIN = "https://psibrunorocha.com.br";

const setMeta = (selector: string, attr: string, value: string, createAttrs?: Record<string, string>) => {
  let el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector);
  if (!el) {
    if (createAttrs) {
      const tag = createAttrs.tag || "meta";
      el = document.createElement(tag) as HTMLMetaElement | HTMLLinkElement;
      Object.entries(createAttrs).forEach(([k, v]) => {
        if (k !== "tag") el!.setAttribute(k, v);
      });
      document.head.appendChild(el);
    } else {
      return;
    }
  }
  el.setAttribute(attr, value);
};

export const usePageMeta = ({ title, description, path }: PageMeta) => {
  useEffect(() => {
    const url = `${SITE_ORIGIN}${path}`;

    document.title = title;

    setMeta('meta[name="description"]', "content", description, { tag: "meta", name: "description" });

    setMeta('link[rel="canonical"]', "href", url, { tag: "link", rel: "canonical" });

    setMeta('meta[property="og:title"]', "content", title, { tag: "meta", property: "og:title" });
    setMeta('meta[property="og:description"]', "content", description, { tag: "meta", property: "og:description" });
    setMeta('meta[property="og:url"]', "content", url, { tag: "meta", property: "og:url" });
    setMeta('meta[property="og:type"]', "content", "website", { tag: "meta", property: "og:type" });

    setMeta('meta[name="twitter:card"]', "content", "summary_large_image", { tag: "meta", name: "twitter:card" });
    setMeta('meta[name="twitter:title"]', "content", title, { tag: "meta", name: "twitter:title" });
    setMeta('meta[name="twitter:description"]', "content", description, { tag: "meta", name: "twitter:description" });
  }, [title, description, path]);
};
