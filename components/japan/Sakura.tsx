"use client";

import { useEffect, useRef } from "react";

/**
 * 桜 Sakura + 波紋 Hamon.
 * One full-screen canvas (pointer-events: none) that draws:
 *  - cherry-blossom petals drifting on a breeze that follows the pointer,
 *  - ink-water ripples wherever the visitor clicks,
 *  - a petal burst when anything dispatches `km:burst` ({ detail: { x, y } }).
 */

interface Petal {
  x: number; y: number; vx: number; vy: number; s: number;
  rot: number; spin: number; flip: number; flipV: number; sway: number; tone: number; life: number;
}
interface Ripple { x: number; y: number; t: number }

export const BURST_EVENT = "km:burst";

export function burst(x: number, y: number) {
  window.dispatchEvent(new CustomEvent(BURST_EVENT, { detail: { x, y } }));
}

export default function Sakura({ enabled }: { enabled: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = 1, raf = 0, frame = 0;
    let colors = { p1: "#e9a7b4", p2: "#f4c9d1", ink: "#1d1a16" };
    const petals: Petal[] = [];
    const ripples: Ripple[] = [];
    const wind = { x: 0, y: 0 };
    const ptr = { x: -9999, y: -9999, px: -9999, py: -9999 };

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      colors = {
        p1: cs.getPropertyValue("--petal").trim() || colors.p1,
        p2: cs.getPropertyValue("--petal-2").trim() || colors.p2,
        ink: cs.getPropertyValue("--ink").trim() || colors.ink,
      };
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const target = () => (enabled && !reduced ? (w < 700 ? 14 : 26) : 0);

    const spawn = (fromTop: boolean, x?: number, y?: number, burstV?: { vx: number; vy: number }): Petal => ({
      x: x ?? Math.random() * (w + 200) - 100,
      y: y ?? (fromTop ? -20 - Math.random() * 60 : Math.random() * h),
      vx: burstV?.vx ?? 0.3 + Math.random() * 0.5,
      vy: burstV?.vy ?? 0.5 + Math.random() * 0.7,
      s: 5 + Math.random() * 6,
      rot: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.04,
      flip: Math.random() * Math.PI * 2,
      flipV: 0.02 + Math.random() * 0.04,
      sway: Math.random() * Math.PI * 2,
      tone: Math.random(),
      life: burstV ? 1 : Infinity,
    });

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(Math.cos(p.flip) * 0.9 + 0.1, 1);
      const s = p.s;
      ctx.beginPath();
      // A sakura petal: rounded body with the little notch at its tip.
      ctx.moveTo(0, s);
      ctx.bezierCurveTo(s * 0.9, s * 0.5, s * 0.8, -s * 0.7, s * 0.18, -s);
      ctx.lineTo(0, -s * 0.72);
      ctx.lineTo(-s * 0.18, -s);
      ctx.bezierCurveTo(-s * 0.8, -s * 0.7, -s * 0.9, s * 0.5, 0, s);
      ctx.fillStyle = p.tone > 0.5 ? colors.p1 : colors.p2;
      ctx.globalAlpha = Math.min(1, p.life) * 0.85;
      ctx.fill();
      ctx.restore();
    };

    const drawRipple = (r: Ripple) => {
      const k = r.t / 70; // 0..1
      ctx.save();
      ctx.strokeStyle = colors.ink;
      for (let i = 0; i < 3; i++) {
        const kk = k - i * 0.16;
        if (kk <= 0 || kk >= 1) continue;
        const rad = 6 + kk * 70;
        ctx.globalAlpha = (1 - kk) * 0.35;
        ctx.lineWidth = 1.6 * (1 - kk) + 0.4;
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, rad, rad * 0.42, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    };

    const tick = () => {
      frame++;
      if (frame % 90 === 1) readColors();
      ctx.clearRect(0, 0, w, h);

      // pointer → breeze
      if (ptr.px > -9000) {
        wind.x += (ptr.x - ptr.px) * 0.0025;
        wind.y += (ptr.y - ptr.py) * 0.0012;
      }
      ptr.px = ptr.x; ptr.py = ptr.y;
      wind.x *= 0.96; wind.y *= 0.96;

      const want = target();
      let ambient = 0;
      for (const p of petals) if (p.life === Infinity) ambient++;
      // Fill the sky quickly on load, then trickle new petals in from the top.
      if (ambient < want && frame % (frame < 90 ? 3 : 12) === 0) petals.push(spawn(frame >= 90));

      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];
        p.sway += 0.02;
        const dx = p.x - ptr.x, dy = p.y - ptr.y, d2 = dx * dx + dy * dy;
        if (d2 < 9000) { const f = (1 - d2 / 9000) * 0.6; p.vx += (dx / 95) * f; p.vy += (dy / 95) * f; }
        if (p.life !== Infinity) { p.life -= 0.006; p.vy += 0.04; p.vx *= 0.985; p.vy *= 0.985; }
        else { p.vx += (0.4 - p.vx) * 0.02; p.vy += (0.8 - p.vy) * 0.02; }
        p.x += p.vx + Math.sin(p.sway) * 0.6 + wind.x;
        p.y += p.vy + wind.y;
        p.rot += p.spin + wind.x * 0.01;
        p.flip += p.flipV;
        drawPetal(p);
        const gone = p.life <= 0 || p.y > h + 30 || p.x > w + 120 || p.x < -140;
        if (gone) {
          if (p.life === Infinity && ambient <= want) petals[i] = spawn(true);
          else petals.splice(i, 1);
        }
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.t++;
        drawRipple(r);
        if (r.t > 110) ripples.splice(i, 1);
      }
      raf = petals.length || ripples.length || want ? requestAnimationFrame(tick) : 0;
    };
    const wake = () => { if (!raf && !document.hidden) raf = requestAnimationFrame(tick); };

    const onMove = (e: PointerEvent) => { ptr.x = e.clientX; ptr.y = e.clientY; };
    const onLeave = () => { ptr.x = ptr.y = ptr.px = ptr.py = -9999; };
    const onDown = (e: PointerEvent) => {
      if (reduced) return;
      ripples.push({ x: e.clientX, y: e.clientY, t: 0 });
      if (ripples.length > 8) ripples.shift();
      wake();
    };
    const onBurst = (e: Event) => {
      if (reduced) return;
      const { x, y } = (e as CustomEvent<{ x: number; y: number }>).detail;
      for (let i = 0; i < 70; i++) {
        const a = Math.random() * Math.PI * 2, v = 3 + Math.random() * 9;
        petals.push(spawn(false, x, y, { vx: Math.cos(a) * v, vy: Math.sin(a) * v - 2 }));
      }
      wake();
    };
    const onVis = () => { if (document.hidden) { cancelAnimationFrame(raf); raf = 0; } else wake(); };

    resize(); readColors();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener(BURST_EVENT, onBurst);
    document.addEventListener("visibilitychange", onVis);
    wake();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener(BURST_EVENT, onBurst);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [enabled]);

  return <canvas ref={ref} aria-hidden="true" style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 400 }} />;
}
