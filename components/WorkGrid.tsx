"use client";

import { useCallback, useState } from "react";
import { FILTERS, PROJECTS, countFor, type Filter } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import CaseStudyModal from "./CaseStudyModal";
import shared from "@/styles/shared.module.css";
import s from "./WorkGrid.module.css";

export default function WorkGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const shown = PROJECTS.filter((p) => filter === "All" || p.cats.includes(filter));
  const current = PROJECTS.find((p) => p.id === openId) ?? null;

  const close = useCallback(() => setOpenId(null), []);
  const next = useCallback(
    () =>
      setOpenId((id) => {
        const i = PROJECTS.findIndex((p) => p.id === id);
        return PROJECTS[(i + 1) % PROJECTS.length].id;
      }),
    [],
  );

  return (
    <section id="work" className={shared.section} aria-labelledby="work-title">
      <div data-reveal="" className={shared.headerRow}>
        <div>
          <div className={shared.eyebrow}>01 — Selected work</div>
          <h2 id="work-title" className={shared.sectionTitle}>
            Things I&apos;ve shipped.
          </h2>
        </div>
        <div className={s.filters} role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`btn ${f === filter ? "btn-primary" : "btn-secondary"} ${s.filter}`}
              aria-pressed={f === filter}
              onClick={() => setFilter(f)}
              data-cursor="link"
            >
              {f} <span className={s.count}>{countFor(f)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* key={filter} remounts the cards so they re-run their rise animation */}
      <div data-reveal="" key={filter} className={`${shared.gridLines} ${s.grid}`}>
        {shown.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={setOpenId} />
        ))}
      </div>

      {current && <CaseStudyModal project={current} onClose={close} onNext={next} />}
    </section>
  );
}
