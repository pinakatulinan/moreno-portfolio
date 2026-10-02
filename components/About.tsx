import shared from "@/styles/shared.module.css";
import s from "./About.module.css";

const FACTS = [
  ["Studying", "BS Information Technology, CIT-U"],
  ["Working", "Export Team, JobTarget"],
  ["Focus", "Full-stack web & mobile"],
  ["Hackathon", "Proweaver Hackathon 2025"],
] as const;

export default function About() {
  return (
    <section id="about" className={shared.section} aria-labelledby="about-title">
      <div data-reveal="" className={shared.splitRuled}>
        <div className={`${shared.splitLabel} ${shared.eyebrow}`}>02 — About</div>
        <div className={`${shared.splitContent} ${s.content}`}>
          <h2 id="about-title" className={shared.statement}>
            There are millions of solutions to one problem. I look for the one that takes{" "}
            <span className={s.hl}>less time</span> and makes the <span className={s.hl}>bigger impact</span>.
          </h2>
          <div className={s.cols}>
            <div className={`${shared.body} ${s.copy}`}>
              <p>
                Hi there — I hope you&apos;re having a great day. I take my time with problems: understanding them
                first, then learning the ways a solution can be reached.
              </p>
              <p>
                Every problem has many answers, but there&apos;s always one that&apos;s faster to build and does
                more. Choosing it wisely is the part of the job I enjoy most. That&apos;s a little about me — I&apos;m
                sure we&apos;ll get to know each other more as we go.
              </p>
            </div>
            <dl className={s.facts}>
              {FACTS.map(([k, v]) => (
                <div key={k} className={s.fact}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
