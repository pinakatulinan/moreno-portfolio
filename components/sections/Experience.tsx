"use client";

import { useState } from "react";
import PulseDot from "./PulseDot";
import { SCRIPTS } from "@/data/experience";
import s from "./sections.module.css";

export default function Experience() {
  const [sel, setSel] = useState(0);
  const script = SCRIPTS[sel];
  return (
    <div className={s.stack} style={{ gap: 28 }}>
      <div data-st="" className={s.eyebrow}>04 / 08 — Experience</div>
      <div data-st="" className={s.stack} style={{ gap: 12 }}>
        <div className={s.ongoing}><PulseDot /> Ongoing · 500–600 hours</div>
        <h1 className={s.expH1}>
          Software Developer Intern
          <br />
          <span className={s.muted}>JobTarget — Export Team</span>
        </h1>
        <p className={s.lead}>
          I write and maintain the Puppeteer and Casper scripts that move job postings through their lifecycle — and hunt
          down the ones that get stuck. Most days are spent fixing postings that weren&apos;t posted, deleted or confirmed
          for days, plus web scraping to diagnose what broke.
        </p>
      </div>
      <div data-st="" className={s.stack} style={{ gap: 10 }}>
        <span className={s.meta}>Scripts I maintain — tap one</span>
        <div className={`${s.gridLines} ${s.scripts}`}>
          {SCRIPTS.map((sc, i) => (
            <button key={sc.name} className={s.script} aria-pressed={i === sel} onClick={() => setSel(i)}>
              <span className={s.scriptNo}>{sc.no}</span>
              <span className={s.scriptName}>{sc.name}</span>
            </button>
          ))}
        </div>
        <div className={s.scriptDesc} aria-live="polite">
          <strong>{script.name}</strong>
          <span>{script.desc}</span>
        </div>
      </div>
    </div>
  );
}
