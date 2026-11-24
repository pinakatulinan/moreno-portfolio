"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { SECTIONS, type SectionId } from "@/data/sections";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";
import { applyTheme, type Theme } from "@/data/theme";
import type { Nav } from "./sections/types";
import PulseDot from "./sections/PulseDot";
import Home from "./sections/Home";
import Projects from "./sections/Projects";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import Resume from "./sections/Resume";
import Sakura from "./japan/Sakura";
import Shoji from "./japan/Shoji";
import Enso from "./japan/Enso";
import Hanko from "./japan/Hanko";
import s from "./Portfolio.module.css";

const EASE = "cubic-bezier(.2,.7,.2,1)";
const PETALS_KEY = "km-petals";
const DOOR_MS = 330;

export default function Portfolio() {
  const [section, setSection] = useState<SectionId>("home");
  const [project, setProject] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>("light");
  const [petals, setPetals] = useState(true);
  const [drawer, setDrawer] = useState(false);
  const [doors, setDoors] = useState<{ closed: boolean; to: SectionId }>({ closed: false, to: "home" });
  const [intro, setIntro] = useState(true);
  const mainRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const last = useRef<{ key: string; idx: number } | null>(null);
  const sectionRef = useRef<SectionId>("home");
  const doorTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const go = useCallback((sec: SectionId, proj: string | null = null) => {
    setDrawer(false);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Same section (e.g. opening a project): no doors, just the ink slide.
    if (sec === sectionRef.current || reduced) {
      sectionRef.current = sec;
      setSection(sec);
      setProject(proj);
      return;
    }
    setIntro(false);
    // 障子: close the doors, swap the room behind them, slide them open again.
    clearTimeout(doorTimer.current);
    setDoors({ closed: true, to: sec });
    doorTimer.current = setTimeout(() => {
      sectionRef.current = sec;
      setSection(sec);
      setProject(proj);
      doorTimer.current = setTimeout(() => setDoors((d) => ({ ...d, closed: false })), 140);
    }, DOOR_MS);
  }, []);
  const nav: Nav = { go };

  useEffect(() => () => clearTimeout(doorTimer.current), []);

  // Restore theme, petals + deep link
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    try { if (localStorage.getItem(PETALS_KEY) === "off") setPetals(false); } catch {}
    const [sec, proj] = location.hash.slice(1).split("/");
    const found = SECTIONS.find((x) => x.id === sec);
    if (found) {
      sectionRef.current = found.id;
      setSection(found.id);
      setDoors({ closed: false, to: found.id });
      if (found.id === "projects" && PROJECTS.some((p) => p.id === proj)) setProject(proj);
    }
  }, []);

  const chooseTheme = (t: Theme) => {
    applyTheme(t);
    setTheme(t);
  };
  const togglePetals = () => {
    setPetals((p) => {
      try { localStorage.setItem(PETALS_KEY, p ? "off" : "on"); } catch {}
      return !p;
    });
  };

  // Esc closes the drawer, then project detail
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (drawer) setDrawer(false);
      else if (project) setProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawer, project]);

  // Hash + scroll reset + ink-wash entrance
  useEffect(() => {
    const key = `${section}|${project ?? ""}`;
    if (last.current?.key === key) return;
    const idx = SECTIONS.findIndex((x) => x.id === section) * 10 + (project ? PROJECTS.findIndex((p) => p.id === project) + 1 : 0);
    const prevIdx = last.current?.idx;
    const dir = prevIdx === undefined || idx >= prevIdx ? 1 : -1;
    const first = last.current === null;
    const sameSection = last.current?.key.split("|")[0] === section;
    last.current = { key, idx };
    if (!first) {
      try { history.replaceState(null, "", `#${section}${project ? `/${project}` : ""}`); } catch {}
    }
    if (mainRef.current) mainRef.current.scrollTop = 0;
    const el = contentRef.current;
    if (first || !el?.animate || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sameSection) el.animate([{ opacity: 0, transform: `translateX(${dir * 40}px)` }, { opacity: 1, transform: "none" }], { duration: 480, easing: EASE });
    const base = sameSection ? 40 : DOOR_MS;
    el.querySelectorAll("[data-st]").forEach((n, i) =>
      n.animate(
        [{ opacity: 0, transform: "translateY(16px)", filter: "blur(5px)" }, { opacity: 1, transform: "none", filter: "blur(0)" }],
        { duration: 620, delay: base + i * 70, easing: EASE, fill: "backwards" },
      ),
    );
  }, [section, project]);

  const si = SECTIONS.findIndex((x) => x.id === section);
  const cur = SECTIONS[si];
  const prev = SECTIONS[(si - 1 + SECTIONS.length) % SECTIONS.length];
  const next = SECTIONS[(si + 1) % SECTIONS.length];
  const dest = SECTIONS.find((x) => x.id === doors.to) ?? cur;

  return (
    <div className={s.root}>
      <Sakura enabled={petals} />
      <div className={`${s.backdrop} ${drawer ? s.drawer : ""}`} onClick={() => setDrawer(false)} />

      <aside className={`${s.sidebar} ${drawer ? s.drawer : ""}`} aria-label="Sidebar">
        <div className={s.profile}>
          <div className={s.photoWrap}>
            <button className={s.photo} onClick={() => go("home")} aria-label="Home">
              <Enso className={s.enso} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/kyle.png" alt={SITE.name} />
              <Hanko size={40} className={s.seal} />
            </button>
            <button className={`btn btn-icon btn-ghost ${s.close}`} onClick={() => setDrawer(false)} aria-label="Close menu">
              <X size={20} />
            </button>
          </div>
          <div>
            <span className={s.kana} lang="ja">カイル・モレノ</span>
            <span className={s.name}>{SITE.name}</span>
            <span className={s.role}>Full-stack Developer · Cebu, PH</span>
          </div>
          <div className={s.open}><PulseDot /> Open to full-stack roles</div>
        </div>

        <nav className={s.nav} aria-label="Primary">
          {SECTIONS.map((x) => (
            <button
              key={x.id}
              className={`${s.navItem} ${x.id === section ? s.active : ""}`}
              aria-current={x.id === section ? "page" : undefined}
              onClick={() => go(x.id)}
            >
              <span className={s.navNo} lang="ja">{x.num}</span>
              <span className={s.navLabel}>{x.label}</span>
              <span className={s.navJp} lang="ja">{x.kanji}</span>
              <span className={s.navArrow}><ArrowRight size={15} /></span>
            </button>
          ))}
        </nav>

        <div className={s.sideFoot}>
          <div>
            <span className={s.metaLabel}>Appearance · 外観</span>
            <div className={s.toggle} role="group" aria-label="Theme">
              <button aria-pressed={theme === "light"} onClick={() => chooseTheme("light")}><span lang="ja">昼</span>Day</button>
              <button aria-pressed={theme === "dark"} onClick={() => chooseTheme("dark")}><span lang="ja">夜</span>Night</button>
            </div>
            <button className={s.petalBtn} aria-pressed={petals} onClick={togglePetals}>
              <span lang="ja">桜</span> Falling petals <b>{petals ? "On" : "Off"}</b>
            </button>
          </div>
          <a href={`mailto:${SITE.email}`} className={s.mail}>{SITE.email}</a>
          <span className={s.motto} lang="ja">限界を超えろ</span>
        </div>
      </aside>

      <div className={s.stage}>
        <main ref={mainRef} className={s.main}>
          <div className={s.topbar}>
            <button className={s.brand} onClick={() => go("home")}>K. Moreno<span>●</span></button>
            <div className={s.topRight}>
              <span className={s.topCur}><span lang="ja">{cur.num}</span> {cur.label}</span>
              <button className="btn btn-icon btn-secondary" style={{ width: 44, height: 44 }} onClick={() => setDrawer(true)} aria-label="Open menu">
                <Menu size={20} />
              </button>
            </div>
          </div>

          <div ref={contentRef} className={s.content}>
            <span key={section} className={s.watermark} aria-hidden="true">{cur.kanji}</span>
            {section === "home" && <Home nav={nav} />}
            {section === "projects" && <Projects project={project} setProject={setProject} />}
            {section === "about" && <About />}
            {section === "experience" && <Experience />}
            {section === "skills" && <Skills />}
            {section === "education" && <Education />}
            {section === "contact" && <Contact />}
            {section === "resume" && <Resume />}

            <div className={s.pager}>
              <div className={s.pagerGrid}>
                <button className={`${s.pagerBtn} ${si === 0 ? s.dim : ""}`} onClick={() => go(prev.id)}>
                  <span className={s.metaLabel}><span lang="ja">前</span> ← Previous</span>
                  <span className={s.pagerTitle}>{prev.label} <span lang="ja">{prev.kanji}</span></span>
                </button>
                <button className={s.pagerBtn} onClick={() => go(next.id)}>
                  <span className={s.metaLabel}>Next → <span lang="ja">次</span></span>
                  <span className={s.pagerTitle}>{next.label} <span lang="ja">{next.kanji}</span></span>
                </button>
              </div>
            </div>
          </div>
        </main>
        <Shoji
          closed={doors.closed}
          intro={intro}
          kanji={intro ? "限界" : dest.kanji}
          label={intro ? "Genkai · surpass your limits" : dest.label}
        />
      </div>
    </div>
  );
}
