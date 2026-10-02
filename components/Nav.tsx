import LiveClock from "./LiveClock";
import PulseDot from "./PulseDot";
import s from "./Nav.module.css";

const LINKS = [
  ["#work", "Work"],
  ["#about", "About"],
  ["#experience", "Experience"],
  ["#skills", "Skills"],
  ["#contact", "Contact"],
] as const;

export default function Nav() {
  return (
    <nav className={`nav ${s.nav}`} aria-label="Primary">
      <a href="#top" className={`nav-brand ${s.brand}`} data-cursor="link">
        K. Moreno<span className={s.dot}>.</span>
      </a>
      <div className={s.links}>
        {LINKS.map(([href, label]) => (
          <a key={href} href={href} data-cursor="link">
            {label}
          </a>
        ))}
      </div>
      <span className={s.clock}>
        <PulseDot /> Cebu <LiveClock />
      </span>
    </nav>
  );
}
