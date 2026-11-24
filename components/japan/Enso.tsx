/**
 * 円相 Ensō — the zen circle, drawn in one breath. The stroke is left open at the
 * top-right like a real brush circle, and it draws itself on load (see .enso in globals.css).
 */
export default function Enso({ className, progress }: { className?: string; progress?: number }) {
  const dash = progress === undefined ? undefined : { strokeDashoffset: 1 - progress };
  return (
    <svg viewBox="0 0 200 200" className={`enso ${className ?? ""}`} aria-hidden="true">
      <path
        className="enso-main"
        pathLength={1}
        style={dash}
        d="M128 22 C 70 8, 18 52, 22 108 C 26 160, 78 188, 124 178 C 168 168, 190 126, 180 86 C 174 62, 160 46, 146 36"
        fill="none"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        className="enso-dry"
        pathLength={1}
        style={dash}
        d="M124 28 C 72 16, 28 56, 30 106 C 33 154, 80 180, 122 171 C 160 162, 180 128, 173 92"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity=".55"
      />
    </svg>
  );
}
