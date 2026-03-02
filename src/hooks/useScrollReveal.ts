import { useEffect, useRef } from "react";

/**
 * Scroll-reveal via IntersectionObserver.
 * Adds `data-revealed="true"` when element enters viewport.
 * Respects prefers-reduced-motion.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; rootMargin?: string }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.setAttribute("data-revealed", "true");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-revealed", "true");
          observer.unobserve(el);
        }
      },
      { threshold: options?.threshold ?? 0.12, rootMargin: options?.rootMargin ?? "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin]);

  return ref;
}

/**
 * Hook for staggered children reveal.
 * Observes a container; when visible, adds `data-revealed="true"` to children with [data-reveal-child].
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { staggerMs?: number }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.querySelectorAll("[data-reveal-child]").forEach((c) =>
        (c as HTMLElement).setAttribute("data-revealed", "true")
      );
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = el.querySelectorAll("[data-reveal-child]");
          const stagger = options?.staggerMs ?? 80;
          children.forEach((child, i) => {
            setTimeout(() => {
              (child as HTMLElement).setAttribute("data-revealed", "true");
            }, i * stagger);
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.staggerMs]);

  return ref;
}
