import { useId } from "react";

/**
 * 青海波 Seigaiha — the "blue ocean waves" pattern of overlapping scales.
 * Rendered as inline SVG so both the ground and line colour can be CSS variables.
 */
export default function Seigaiha({ bg, line, size = 44, className, style }: { bg: string; line: string; size?: number; className?: string; style?: React.CSSProperties }) {
  const id = useId().replace(/:/g, "");
  const scale = (cx: number, cy: number) => (
    <g key={`${cx}-${cy}`}>
      {[20, 15, 10, 5].map((r, i) => (
        <circle key={r} cx={cx} cy={cy} r={r} fill={i === 0 ? bg : "none"} stroke={line} strokeWidth="1.4" />
      ))}
    </g>
  );
  return (
    <svg className={className} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", ...style }} aria-hidden="true">
      <defs>
        <pattern id={`sg${id}`} width={size} height={size / 2} patternUnits="userSpaceOnUse">
          <g transform={`scale(${size / 40})`}>
            {/* back row (offset by half a tile), then the front row painted over it */}
            {scale(20, 0)}
            {scale(0, 10)}{scale(40, 10)}
            {scale(20, 20)}
            {scale(0, 30)}{scale(40, 30)}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#sg${id})`} />
    </svg>
  );
}
