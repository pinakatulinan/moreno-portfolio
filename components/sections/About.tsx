import { FACTS } from "@/data/sections";
import s from "./sections.module.css";

export default function About() {
  return (
    <div className={s.stack} style={{ gap: 36 }}>
      <div data-st="" className={s.eyebrow}>03 / 08 — About</div>
      <h1 data-st="" className={s.aboutH1}>
        There are millions of solutions to one problem. I look for the one that takes{" "}
        <span className={s.accent}>less time</span> and makes the <span className={s.accent}>bigger impact</span>.
      </h1>
      <div data-st="" className={s.aboutCols}>
        <div className={s.copy}>
          <p>
            Hi there — I hope you&apos;re having a great day. I take my time with problems: understanding them first, then
            learning the ways a solution can be reached.
          </p>
          <p>
            Every problem has many answers, but there&apos;s always one that&apos;s faster to build and does more.
            Choosing it wisely is the part of the job I enjoy most. That&apos;s a little about me — I&apos;m sure
            we&apos;ll get to know each other more as we go.
          </p>
        </div>
        <dl className={s.facts}>
          {FACTS.map(([k, v]) => (
            <div key={k} className={s.fact}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </div>
    </div>
  );
}
