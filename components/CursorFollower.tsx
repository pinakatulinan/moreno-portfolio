"use client";

import { useEffect, useRef } from "react";
import s from "./CursorFollower.module.css";

/* Red square that lerps toward the pointer. 14px default, 36px (multiply) over
   [data-cursor="link"], 104px with "View case" over [data-cursor="view"]. */
export default function CursorFollower() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const c = ref.current;
    const lab = labelRef.current;
    if (!c || !lab) return;
    if (!matchMedia("(pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let tx = x;
    let ty = y;
    let mode: string | null = null;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      c.style.opacity = "1";
      const target = (e.target as Element | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      const m = target?.dataset.cursor ?? "";
      if (m === mode) return;
      mode = m;
      const size = m === "view" ? 104 : m === "link" ? 36 : 14;
      c.style.width = c.style.height = `${size}px`;
      c.style.mixBlendMode = m === "link" ? "multiply" : "normal";
      lab.style.opacity = m === "view" ? "1" : "0";
    };
    const onLeave = () => {
      c.style.opacity = "0";
    };
    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      c.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={s.cursor} aria-hidden="true">
      <span ref={labelRef} className={s.label}>View case</span>
    </div>
  );
}
