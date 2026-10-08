import { ArrowUpRight } from "lucide-react";
import { CERTS, EDUCATION } from "@/data/experience";
import s from "./sections.module.css";

export default function Education() {
  return (
    <div className={s.stack} style={{ gap: 28 }}>
      <div data-st="" className={s.headCol}>
        <div className={s.eyebrow}>06 / 08 — Education &amp; certs</div>
        <h1 className={s.h1}>Always learning.</h1>
      </div>
      <div data-st="" className={s.stack}>
        {EDUCATION.map((e, i) => (
          <div key={e.school} className={s.eduRow}>
            <span className={`${s.years} ${i === 0 ? s.current : ""}`}>{e.years}</span>
            <div className={s.school}>
              <span className={s.schoolName}>{e.school}</span>
              <span className={s.muted}>{e.detail}</span>
            </div>
          </div>
        ))}
      </div>
      <div data-st="" className={s.stack} style={{ gap: 10 }}>
        <span className={s.meta}>Certifications</span>
        <ul className={`${s.gridLines} ${s.certs}`} style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {CERTS.map((c) => (
            <li key={c.name} className={s.cert}>
              {c.image ? (
                <a href={c.image} target="_blank" rel="noopener noreferrer" className={s.certThumb} aria-label={`View ${c.name} certificate`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.image} alt={`${c.name} certificate`} loading="lazy" />
                </a>
              ) : (
                <div className={`${s.certThumb} ${s.certEmpty}`} aria-hidden="true">Certificate</div>
              )}
              <div className={s.certBody}>
                <span className={s.certName}>{c.name}</span>
                {c.issuer && <span className={s.certIssuer}>{c.issuer}</span>}
                <span className={s.certFoot}>
                  <span className={s.certDate}>{c.date}</span>
                  {c.verify && (
                    <a href={c.verify} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      Verify <ArrowUpRight size={14} />
                    </a>
                  )}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
