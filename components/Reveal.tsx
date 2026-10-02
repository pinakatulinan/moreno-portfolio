"use client";

import { useEffect } from "react";

/* Scroll reveal: every [data-reveal] element that starts below the fold fades
   up (opacity 0 → 1, translateY 32px → 0, .8s) when it enters the viewport. */
export default function Reveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.style.opacity = "1";
          el.style.transform = "none";
          io.unobserve(el);
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top < innerHeight) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(32px)";
      el.style.transition = "opacity .8s var(--ease), transform .8s var(--ease)";
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
