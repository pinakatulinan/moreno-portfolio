export default function PulseDot() {
  return (
    <span
      aria-hidden="true"
      style={{ width: 8, height: 8, flex: "none", display: "inline-block", background: "var(--color-accent)", animation: "kpulse 1.6s ease-out infinite" }}
    />
  );
}
