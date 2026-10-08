"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { countFor, FILTERS, PROJECTS, type Filter } from "@/data/projects";
import s from "./sections.module.css";

interface Props { project: string | null; setProject: (id: string | null) => void }

export default function Projects({ project, setProject }: Props) {
  const [filter, setFilter] = useState<Filter>("All");
  const pi = PROJECTS.findIndex((p) => p.id === project);

  if (pi >= 0) {
    const cur = PROJECTS[pi];
    const step = (d: number) => setProject(PROJECTS[(pi + d + PROJECTS.length) % PROJECTS.length].id);
    const nextTitle = PROJECTS[(pi + 1) % PROJECTS.length].title;
    return (
      <div className={s.stack} style={{ gap: 28 }}>
        <div data-st="" className={s.detailBar}>
          <button className="btn btn-ghost" style={{ padding: "8px 10px 8px 0", gap: 8 }} onClick={() => setProject(null)}>
            <ArrowLeft size={18} />All projects
          </button>
          <div className={s.stepper}>
            <span className={s.stepNo}>{cur.no} / {String(PROJECTS.length).padStart(2, "0")}</span>
            <button className="btn btn-icon btn-secondary" onClick={() => step(-1)} aria-label="Previous project"><ArrowLeft size={18} /></button>
            <button className="btn btn-icon btn-secondary" onClick={() => step(1)} aria-label="Next project"><ArrowRight size={18} /></button>
          </div>
        </div>
        <div data-st="" className={s.hero}>
          <div className={s.heroTop}><span>{cur.kicker}</span><span>{cur.status}</span></div>
          <h1 className={s.heroTitle}>{cur.title}</h1>
        </div>
        <p data-st="" className={s.desc}>{cur.desc}</p>
        <div data-st="" className={s.facts3}>
          {([["Role", cur.role], ["Platform", cur.platform], ["Status", cur.status]] as const).map(([k, v]) => (
            <div key={k} className={s.fact3}><span className={s.meta}>{k}</span><span>{v}</span></div>
          ))}
        </div>
        <div data-st="" className={s.stack} style={{ gap: 10 }}>
          <span className={s.meta}>Stack</span>
          <div className={s.tags}>
            {cur.stack.map((t) => (
              <span key={t} className="tag tag-accent" style={{ fontSize: 13, padding: "5px 12px" }}>{t}</span>
            ))}
          </div>
        </div>
        <div data-st="" className={s.btnRow}>
          {cur.github && (
            <a href={cur.github} target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${s.btnWide}`} style={{ padding: "13px 16px", minWidth: 220 }}>
              View on GitHub <ArrowUpRight size={16} />
            </a>
          )}
          <button className={`btn btn-secondary ${s.btnWide}`} style={{ padding: "13px 16px", minWidth: 240 }} onClick={() => step(1)}>
            Next: {nextTitle} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  const shown = PROJECTS.filter((p) => filter === "All" || p.cats.includes(filter));
  return (
    <div className={s.stack} style={{ gap: 28 }}>
      <div data-st="" className={s.headRow}>
        <div className={s.headCol}>
          <div className={s.eyebrow}>02 / 08 — Projects</div>
          <h1 className={s.h1}>Things I&apos;ve shipped.</h1>
        </div>
        <div className={s.filters} role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button key={f} className={`btn ${f === filter ? "btn-primary" : "btn-secondary"}`} style={{ padding: "9px 13px" }} onClick={() => setFilter(f)} aria-pressed={f === filter}>
              {f}<span className={s.filterCount}>{countFor(f)}</span>
            </button>
          ))}
        </div>
      </div>
      <div data-st="" className={s.list}>
        {shown.map((p) => (
          <button key={p.id} className={s.row} onClick={() => setProject(p.id)}>
            <span className={s.rowNo}>{p.no}</span>
            <span className={s.rowBody}>
              <span className={s.rowTitle}>{p.title}</span>
              <span className={s.rowShort}>{p.short}</span>
            </span>
            <span className={s.rowEnd}>
              <span className={s.rowPlat}>{p.platform}</span>
              <ArrowRight size={22} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
