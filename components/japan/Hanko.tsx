import { useId } from "react";
import { GLYPHS } from "@/data/glyphs";

/**
 * 判子 Hanko — a red seal that reads 限界突破 (genkai toppa, "break through your limits").
 * Traditional order: right column top→bottom (限界), then left column (突破).
 * A noise filter knocks speckles out of the ink so it looks hand-stamped.
 */
export default function Hanko({ size = 96, className, style }: { size?: number; className?: string; style?: React.CSSProperties }) {
  const id = useId().replace(/:/g, "");
  const cells: [string, number, number][] = [["限", 1, 0], ["界", 1, 1], ["突", 0, 0], ["破", 0, 1]];
  return (
    <svg
      viewBox="0 0 1000 1000"
      width={size}
      height={size}
      className={className}
      style={style}
      role="img"
      aria-label="Seal: 限界突破 — genkai toppa, break through your limits"
    >
      <defs>
        <filter id={`worn${id}`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 1.55" result="m" />
          <feComposite in="SourceGraphic" in2="m" operator="in" />
        </filter>
      </defs>
      <g filter={`url(#worn${id})`}>
        <rect x="30" y="30" width="940" height="940" rx="70" fill="var(--color-accent)" />
        <rect x="80" y="80" width="840" height="840" rx="30" fill="none" stroke="var(--km-on-accent-hi, #fff8ee)" strokeWidth="18" />
        {cells.map(([ch, cx, cy]) => (
          <path
            key={ch}
            d={GLYPHS[ch]}
            transform={`translate(${110 + cx * 400} ${105 + cy * 400}) scale(0.38)`}
            fill="var(--km-on-accent-hi, #fff8ee)"
          />
        ))}
      </g>
    </svg>
  );
}
