import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import PulseDot from "./PulseDot";
import type { Nav } from "./types";
import s from "./sections.module.css";

const JUMPS = [
  { kicker: "Projects", title: `${PROJECTS.length} builds across web, mobile & AI`, to: "projects" },
  { kicker: "Experience", title: "Intern, JobTarget Export Team", to: "experience" },
  { kicker: "Skills", title: "Front to back, 8 areas", to: "skills" },
  { kicker: "Contact", title: "Let's talk about the role", to: "contact" },
] as const;

export default function Home({ nav }: { nav: Nav }) {
  return (
    <div className={s.stack} style={{ gap: "clamp(28px, 4vw, 48px)" }}>
      <div data-st="" className={s.eyebrow}>01 / 08 — Home</div>
      <h1 data-st="" className={s.homeH1}>
        Full-stack
        <br />
        developer<span className={s.accent}>.</span>
      </h1>
      <p data-st="" className={s.pitch}>
        I build web platforms, mobile apps and the automation that keeps them running — choosing the solution that takes
        less time and makes the bigger impact.
      </p>
      <div data-st="" className={s.btnRow}>
        <button className={`btn btn-primary ${s.btnWide}`} style={{ padding: "14px 18px", fontSize: 15, minWidth: 210 }} onClick={() => nav.go("projects")}>
          Browse projects <ArrowRight size={18} />
        </button>
        <button className={`btn btn-secondary ${s.btnWide}`} style={{ padding: "14px 18px", fontSize: 15, minWidth: 180 }} onClick={() => nav.go("resume")}>
          View résumé <FileText size={18} />
        </button>
      </div>
      <button data-st="" className={s.now} onClick={() => nav.go("projects", "happymed")}>
        <span className={s.nowTag}><PulseDot /> Now building</span>
        <span className={s.nowTitle}>
          HappyMed Pharmacy POS <span>— sales &amp; inventory for our family pharmacy</span>
        </span>
        <ArrowUpRight size={20} />
      </button>
      <div data-st="" className={`${s.gridLines} ${s.jumps}`}>
        {JUMPS.map((j) => (
          <button key={j.kicker} className={s.jump} onClick={() => nav.go(j.to)}>
            <span className={s.jumpKicker}>{j.kicker} <ArrowUpRight size={18} /></span>
            <span className={s.jumpTitle}>{j.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
