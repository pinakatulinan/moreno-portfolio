import PulseDot from "./PulseDot";
import { CERTS, EDUCATION, SCRIPTS } from "@/data/experience";
import shared from "@/styles/shared.module.css";
import s from "./Experience.module.css";

export default function Experience() {
  return (
    <section id="experience" className={shared.section} aria-labelledby="exp-title">
      <div data-reveal="" className={shared.splitRuled}>
        <div className={`${shared.splitLabel} ${shared.eyebrow}`}>03 — Experience</div>
        <div className={`${shared.splitContent} ${s.intro}`}>
          <div className={s.ongoing}>
            <PulseDot /> Ongoing · 500–600 hours
          </div>
          <h2 id="exp-title" className={`${shared.statement} ${s.role}`}>
            Software Developer Intern
            <br />
            <span className={s.team}>JobTarget — Export Team</span>
          </h2>
          <p className={`${shared.body} ${s.lead}`}>
            I write and maintain the Puppeteer and Casper scripts that move job postings through their lifecycle — and
            hunt down the ones that get stuck. Most days are spent fixing postings that weren&apos;t posted, deleted or
            confirmed for days, plus web scraping to diagnose what broke.
          </p>
        </div>
      </div>

      <ul data-reveal="" className={`${shared.gridLines} ${s.scripts}`} aria-label="Automation scripts">
        {SCRIPTS.map((sc) => (
          <li key={sc.name} className={s.script}>
            <span className={s.scriptNo}>{sc.no}</span>
            <span className={s.scriptName}>{sc.name}</span>
            <span className={s.scriptDesc}>{sc.desc}</span>
          </li>
        ))}
      </ul>

      <div data-reveal="" className={`${shared.split} ${s.education}`}>
        <h3 className={`${shared.splitLabel} ${shared.eyebrowMuted}`} style={{ margin: 0 }}>
          Education
        </h3>
        <ol className={`${shared.splitContent} ${s.list}`}>
          {EDUCATION.map((e) => (
            <li key={e.school} className={s.eduRow}>
              <span className={s.years}>{e.years}</span>
              <div className={s.school}>
                <span className={s.schoolName}>{e.school}</span>
                <span className={s.detail}>{e.detail}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div data-reveal="" className={`${shared.split} ${s.certs}`}>
        <h3 className={`${shared.splitLabel} ${shared.eyebrowMuted}`} style={{ margin: 0 }}>
          Certifications
        </h3>
        <div className={`${shared.splitContent} ${s.certTable}`}>
          <div className={s.certHead} aria-hidden="true">
            <span>Certification</span>
            <span>Date</span>
          </div>
          <ul className={s.list}>
            {CERTS.map((c) => (
              <li key={c.name} className={s.certRow}>
                <span className={s.certName}>{c.name}</span>
                <span className={s.certDate}>{c.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
