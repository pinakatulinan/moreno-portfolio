import { SKILLS, SOFT_SKILLS } from "@/data/skills";
import shared from "@/styles/shared.module.css";
import s from "./Skills.module.css";

export default function Skills() {
  return (
    <section id="skills" className={shared.section} aria-labelledby="skills-title">
      <div data-reveal="" className={`${shared.headerRow} ${s.header}`}>
        <div>
          <div className={shared.eyebrow}>04 — Skills &amp; tools</div>
          <h2 id="skills-title" className={shared.sectionTitle}>
            Front to back.
          </h2>
        </div>
      </div>

      <ul data-reveal="" className={`${shared.gridLines} ${s.grid}`}>
        {SKILLS.map((k) => (
          <li key={k.area} className={s.cell}>
            <span className={s.no}>{k.no}</span>
            <span className={s.area}>{k.area}</span>
            <span className={s.tools}>
              {k.tools.map((t) => (
                <span key={t} className="tag tag-accent">
                  {t}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>

      <div data-reveal="" className={`${shared.split} ${s.how}`}>
        <h3 className={`${shared.splitLabel} ${shared.eyebrowMuted}`} style={{ margin: 0 }}>
          How I work
        </h3>
        <ul className={`${shared.splitContent} ${s.soft}`}>
          {SOFT_SKILLS.map((x) => (
            <li key={x} className={s.softItem}>
              <span className={s.bullet} aria-hidden="true">
                →
              </span>
              {x}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
