import { SKILLS, SOFT_SKILLS } from "@/data/skills";
import s from "./sections.module.css";

export default function Skills() {
  return (
    <div className={s.stack} style={{ gap: 28 }}>
      <div data-st="" className={s.headCol}>
        <div className={s.eyebrow}>05 / 08 — Skills &amp; tools</div>
        <h1 className={s.h1}>Front to back.</h1>
      </div>
      <div data-st="" className={`${s.gridLines} ${s.skills}`}>
        {SKILLS.map((k) => (
          <div key={k.area} className={s.skill}>
            <span className={s.skillNo}>{k.no}</span>
            <span className={s.skillArea}>{k.area}</span>
            <div className={s.skillTools}>
              {k.tools.map((t) => <span key={t} className="tag tag-accent">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
      <div data-st="" className={s.stack} style={{ gap: 4 }}>
        <span className={s.meta} style={{ marginBottom: 6 }}>How I work</span>
        <div className={s.soft}>
          {SOFT_SKILLS.map((t) => (
            <div key={t} className={s.softItem}><span>→</span>{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
