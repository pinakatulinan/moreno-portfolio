import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import s from "./ProjectCard.module.css";

interface Props {
  project: Project;
  onOpen: (id: string) => void;
}

export default function ProjectCard({ project: p, onOpen }: Props) {
  return (
    <article
      className={s.card}
      data-cursor="view"
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-label={`${p.title} — open case study`}
      onClick={() => onOpen(p.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(p.id);
        }
      }}
    >
      <div className={s.top}>
        <span className={s.kicker}>{p.kicker}</span>
        <span className={s.arrow}>
          <ArrowUpRight size={28} strokeWidth={2} aria-hidden />
        </span>
      </div>
      <div className={s.number} aria-hidden="true">
        {p.no}
      </div>
      <div className={s.bottom}>
        <h3 className={s.title}>{p.title}</h3>
        <p className={s.short}>{p.short}</p>
        <div className={s.tags}>
          {p.stack.slice(0, 4).map((t) => (
            <span key={t} className="tag tag-neutral">
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
