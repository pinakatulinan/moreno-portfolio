import { ArrowDown, Download } from "lucide-react";
import LiveClock from "./LiveClock";
import Typewriter from "./Typewriter";
import shared from "@/styles/shared.module.css";
import { TYPEWRITER_WORDS } from "@/data/projects";
import { SITE } from "@/data/site";
import s from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="top" className={s.hero} aria-label="Intro">
      <div className={s.meta}>
        <div className={s.metaCell}>
          <span className={shared.metaLabel}>Based in</span>
          <span className={s.metaValue}>{SITE.location}</span>
        </div>
        <div className={s.metaCell}>
          <span className={shared.metaLabel}>Local time</span>
          <span className={s.metaValue}>
            <LiveClock suffix=" PHT" />
          </span>
        </div>
        <div className={s.metaCell}>
          <span className={shared.metaLabel}>Currently</span>
          <span className={s.metaValue}>Software Developer Intern, JobTarget</span>
        </div>
        <div className={s.metaCell}>
          <span className={shared.metaLabel}>Status</span>
          <span className={`${s.metaValue} ${s.status}`}>Open to full-stack roles</span>
        </div>
      </div>

      <h1 className={s.name}>
        Kyle Ezekiel
        <br />
        D. Moreno<span className={s.accent}>.</span>
      </h1>

      <div className={s.row}>
        <p className={s.tagline}>
          <span className={`${s.muted} ${s.typeLine}`}>Full-stack developer.</span>
          <span className={s.typeLine}>
            I build <Typewriter words={TYPEWRITER_WORDS} />
          </span>
        </p>
        <div className={s.actions}>
          <a href="#work" className={`btn btn-primary ${s.cta} ${s.ctaPrimary}`} data-cursor="link">
            See selected work <ArrowDown size={18} strokeWidth={2} aria-hidden />
          </a>
          <a
            href={SITE.resume}
            download="Moreno_Resume.pdf"
            className={`btn btn-secondary ${s.cta} ${s.ctaSecondary}`}
            data-cursor="link"
          >
            Résumé (PDF) <Download size={18} strokeWidth={2} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
