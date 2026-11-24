"use client";

import { useEffect, useRef, useState } from "react";
import { GLYPHS } from "@/data/glyphs";
import Hanko from "./Hanko";
import { burst } from "./Sakura";
import s from "./japan.module.css";

/**
 * 限界 Genkai — the hero piece.
 *  - The two kanji are written stroke-by-stroke in ink, then the seal is stamped.
 *  - Behind them a red sun (a pale moon at night) and a rain of kanji that parts around the pointer.
 *  - Press & hold the calligraphy to charge it; at 100% the limit breaks: 限界突破.
 */

const RAIN = "限界突破超努力夢心技体道志魂誠勇気挑戦未来創造飛躍光風花月空侍和美刀炎雷龍虎鍛錬覚悟一閃無双極";
const CHARGE_MS = 1500;
const BROKEN_MS = 3800;

type Phase = "idle" | "charging" | "broken";

export default function Genkai() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const callig = useRef<HTMLButtonElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const holding = useRef(false);
  const phaseRef = useRef<Phase>("idle");
  const [phase, setPhaseState] = useState<Phase>("idle");
  const setPhase = (p: Phase) => { phaseRef.current = p; setPhaseState(p); };

  useEffect(() => {
    const el = root.current, cv = canvas.current, ctx = cv?.getContext("2d");
    if (!el || !cv || !ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, raf = 0, frame = 0, last = performance.now();
    let charge = 0, shockT = -1, lastPct = -1, resetTimer = 0;
    let ink = "#1d1a16", accent = "#c73a2b", family = "serif";
    const ptr = { x: -999, y: -999 };
    const LH = 22, COL = 26;

    interface Col { x: number; head: number; speed: number; len: number; chars: string[]; red: boolean }
    let cols: Col[] = [];
    const pick = () => RAIN[(Math.random() * RAIN.length) | 0];
    const newCol = (x: number, top: boolean): Col => {
      const len = 5 + ((Math.random() * 14) | 0);
      return {
        x, len, red: Math.random() < 0.08,
        head: top ? -Math.random() * h * 0.8 : Math.random() * (h + len * LH),
        speed: 0.35 + Math.random() * 0.9,
        chars: Array.from({ length: len }, pick),
      };
    };

    const readStyle = () => {
      const cs = getComputedStyle(document.documentElement);
      ink = cs.getPropertyValue("--ink").trim() || ink;
      accent = cs.getPropertyValue("--color-accent").trim() || accent;
      family = getComputedStyle(cv).fontFamily || family;
    };

    const resize = () => {
      const r = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = [];
      for (let x = COL / 2; x < w; x += COL) if (Math.random() < 0.72) cols.push(newCol(x, false));
    };

    const triggerBreak = () => {
      setPhase("broken");
      shockT = 0;
      const r = callig.current?.getBoundingClientRect();
      if (r) burst(r.left + r.width / 2, r.top + r.height / 2);
      try { navigator.vibrate?.([30, 40, 60]); } catch {}
      clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => { charge = 0; setPhase("idle"); }, BROKEN_MS);
    };

    const tick = (now: number) => {
      const dt = Math.min(now - last, 50); last = now; frame++;
      if (frame % 60 === 1) readStyle();

      // charge meter
      if (phaseRef.current !== "broken") {
        charge += holding.current ? dt / CHARGE_MS : -dt / 700;
        charge = Math.max(0, Math.min(1, charge));
        if (charge >= 1) triggerBreak();
        else if (holding.current && phaseRef.current !== "charging") setPhase("charging");
        else if (!holding.current && charge === 0 && phaseRef.current === "charging") setPhase("idle");
      }
      el.style.setProperty("--charge", charge.toFixed(3));
      const pct = Math.round(charge * 100);
      if (pct !== lastPct && pctRef.current) { pctRef.current.textContent = `${pct}%`; lastPct = pct; }

      // kanji rain
      ctx.clearRect(0, 0, w, h);
      ctx.font = `500 16px ${family}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const cx = w / 2, cy = h * 0.42;
      let shock = 0;
      if (shockT >= 0) {
        shockT += dt / 16.7;
        shock = 160 * Math.exp(-shockT / 30) * (1 - Math.exp(-shockT / 3));
        if (shockT > 240) shockT = -1;
      }
      const boost = phaseRef.current === "broken" ? 3 : 1 + charge * 5;
      for (const c of cols) {
        c.head += c.speed * boost * (dt / 16.7);
        if (Math.random() < 0.01) c.chars[(Math.random() * c.len) | 0] = pick();
        for (let j = 0; j < c.len; j++) {
          let x = c.x, y = c.head - j * LH;
          if (y < -LH || y > h + LH) continue;
          const dx = x - ptr.x, dy = y - ptr.y, d = Math.hypot(dx, dy);
          if (d < 90 && d > 0.1) { const f = (90 - d) * 0.55; x += (dx / d) * f; y += (dy / d) * f; }
          if (shock) { const sx = x - cx, sy = y - cy, sd = Math.hypot(sx, sy) || 1; x += (sx / sd) * shock; y += (sy / sd) * shock; }
          if (charge > 0.05) x += (Math.random() - 0.5) * charge * 3;
          const head = j === 0;
          ctx.globalAlpha = (head ? 0.5 : 0.3 * (1 - j / c.len)) * (0.7 + charge * 0.6);
          ctx.fillStyle = head && c.red ? accent : ink;
          ctx.fillText(c.chars[j], x, y);
        }
        if (c.head - c.len * LH > h) Object.assign(c, newCol(c.x, true));
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top;
      el.style.setProperty("--px", ((ptr.x / r.width) * 2 - 1).toFixed(3));
      el.style.setProperty("--py", ((ptr.y / r.height) * 2 - 1).toFixed(3));
    };
    const onLeave = () => { ptr.x = ptr.y = -999; el.style.setProperty("--px", "0"); el.style.setProperty("--py", "0"); };
    const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden) { last = performance.now(); raf = requestAnimationFrame(tick); } };

    readStyle(); resize();
    // Canvas text doesn't trigger web-font loading on its own — ask for the glyphs explicitly.
    document.fonts?.load(`500 16px ${family}`, RAIN).catch(() => {});
    const ro = new ResizeObserver(resize); ro.observe(el);
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVis);
    if (!reduced) raf = requestAnimationFrame(tick);
    else {
      // Static frame: a still curtain of kanji, and the meter still works without the motion.
      const still = (now: number) => {
        const dt = Math.min(now - last, 50); last = now;
        if (phaseRef.current !== "broken") {
          charge = Math.max(0, Math.min(1, charge + (holding.current ? dt / CHARGE_MS : -dt / 700)));
          if (charge >= 1) triggerBreak();
          else if (holding.current && phaseRef.current !== "charging") setPhase("charging");
        }
        el.style.setProperty("--charge", charge.toFixed(3));
        const pct = Math.round(charge * 100);
        if (pct !== lastPct && pctRef.current) { pctRef.current.textContent = `${pct}%`; lastPct = pct; }
        raf = requestAnimationFrame(still);
      };
      ctx.font = `500 16px ${family}`; ctx.textAlign = "center"; ctx.fillStyle = ink;
      for (const c of cols) c.chars.forEach((ch, j) => { ctx.globalAlpha = 0.25 * (1 - j / c.len); ctx.fillText(ch, c.x, c.head - j * LH); });
      raf = requestAnimationFrame(still);
    }
    return () => {
      cancelAnimationFrame(raf); clearTimeout(resetTimer); ro.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const start = () => { if (phaseRef.current !== "broken") holding.current = true; };
  const stop = () => { holding.current = false; };

  return (
    <div ref={root} className={`${s.genkai} ${phase === "broken" ? s.broken : ""} ${phase === "charging" ? s.charging : ""}`}>
      <canvas ref={canvas} className={s.rain} aria-hidden="true" />
      <div className={s.sun} aria-hidden="true">
        <svg viewBox="0 0 100 100" className={s.ring}>
          <circle cx="50" cy="50" r="48" pathLength={1} />
        </svg>
      </div>

      <button
        ref={callig}
        type="button"
        className={s.callig}
        aria-label="限界 — genkai, limits. Press and hold to surpass your limits."
        onPointerDown={(e) => { e.currentTarget.setPointerCapture?.(e.pointerId); start(); }}
        onPointerUp={stop}
        onPointerCancel={stop}
        onLostPointerCapture={stop}
        onKeyDown={(e) => { if ((e.key === " " || e.key === "Enter") && !e.repeat) { e.preventDefault(); start(); } }}
        onKeyUp={(e) => { if (e.key === " " || e.key === "Enter") stop(); }}
        onBlur={stop}
        onContextMenu={(e) => e.preventDefault()}
      >
        <svg viewBox="-40 -20 1080 2040" className={s.calligSvg} aria-hidden="true">
          <defs>
            <filter id="km-bleed" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="4" result="t" />
              <feDisplacementMap in="SourceGraphic" in2="t" scale="7" xChannelSelector="R" yChannelSelector="G">
                <animate attributeName="scale" values="60;60;7" keyTimes="0;.25;1" dur="3.4s" fill="freeze" calcMode="spline" keySplines="0 0 1 1;.2 .7 .2 1" />
              </feDisplacementMap>
            </filter>
            <linearGradient id="km-sweep" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" />
              <stop offset=".82" stopColor="#fff" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            {["限", "界"].map((ch, i) => (
              // Masks resolve in each glyph's own (untranslated) 0–1000 space.
              <mask id={`km-m${i}`} key={ch} maskUnits="userSpaceOnUse" x="-40" y="-20" width="1080" height="1040">
                <rect className={`${s.sweep} ${i ? s.sweep2 : ""}`} x="-40" y="-20" width="1080" height="1240" fill="url(#km-sweep)" />
              </mask>
            ))}
          </defs>
          <g className={s.inkGroup} filter="url(#km-bleed)">
            {["限", "界"].map((ch, i) => (
              <g key={ch} transform={`translate(0 ${i * 1000})`}>
                <path className={`${s.outline} ${i ? s.outline2 : ""}`} d={GLYPHS[ch]} pathLength={1} />
                <path className={s.fill} d={GLYPHS[ch]} mask={`url(#km-m${i})`} />
              </g>
            ))}
          </g>
        </svg>
        <Hanko size={64} className={s.stamp} />
      </button>

      <div className={s.caption} aria-hidden="true">
        {"限界を超えろ".split("").map((c, i) => (
          <span key={i} style={{ animationDelay: `${3.5 + i * 0.09}s` }}>{c}</span>
        ))}
      </div>
      <div className={s.romaji} aria-hidden="true">genkai o koero · surpass your limits</div>

      <div className={s.hint} aria-live="polite">
        {phase === "broken" ? (
          <span className={s.toppa}><b>限界突破!</b> Limit broken.</span>
        ) : (
          <>
            <span className={s.meter}><span className={s.meterFill} /></span>
            <span ref={pctRef} className={s.pct}>0%</span>
            <span>{phase === "charging" ? "keep holding…" : "長押し — press & hold 限界"}</span>
          </>
        )}
      </div>
      {phase === "broken" && <div className={s.toppaBig} aria-hidden="true">突破</div>}
    </div>
  );
}
