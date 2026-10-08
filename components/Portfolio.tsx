"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, Moon, Sun, X } from "lucide-react";
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
import s from "./Portfolio.module.css";

const no = (i: number) => String(i + 1).padStart(2, "0");
const EASE = "cubic-bezier(.2,.7,.2,1)";

export default function Portfolio() {
  const [section, setSection] = useState<SectionId>("home");
  const [project, setProject] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>("light");
  const [drawer, setDrawer] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const last = useRef<{ key: string; idx: number } | null>(null);

  const go = useCallback((sec: SectionId, proj: string | null = null) => {
    setSection(sec);
    setProject(proj);
    setDrawer(false);
  }, []);
  const nav: Nav = { go };

  // Restore theme + deep link
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    const [sec, proj] = location.hash.slice(1).split("/");
    const found = SECTIONS.find((x) => x.id === sec);
    if (found) {
      setSection(found.id);
      if (found.id === "projects" && PROJECTS.some((p) => p.id === proj)) setProject(proj);
    }
  }, []);

  const chooseTheme = (t: Theme) => {
    applyTheme(t);
    setTheme(t);
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

  // Hash + scroll reset + directional transition
  useEffect(() => {
    const key = `${section}|${project ?? ""}`;
    if (last.current?.key === key) return;
    const idx = SECTIONS.findIndex((x) => x.id === section) * 10 + (project ? PROJECTS.findIndex((p) => p.id === project) + 1 : 0);
    const prevIdx = last.current?.idx;
    const dir = prevIdx === undefined || idx >= prevIdx ? 1 : -1;
    const first = last.current === null;
    last.current = { key, idx };
    if (!first) {
      try { history.replaceState(null, "", `#${section}${project ? `/${project}` : ""}`); } catch {}
    }
    if (mainRef.current) mainRef.current.scrollTop = 0;
    const el = contentRef.current;
    if (first || !el?.animate || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.animate([{ opacity: 0, transform: `translateX(${dir * 56}px)` }, { opacity: 1, transform: "none" }], { duration: 520, easing: EASE });
    el.querySelectorAll("[data-st]").forEach((n, i) =>
      n.animate([{ opacity: 0, transform: `translateX(${dir * 28}px)` }, { opacity: 1, transform: "none" }], {
        duration: 520, delay: 60 + i * 55, easing: EASE, fill: "backwards",
      }),
    );
  }, [section, project]);

  const si = SECTIONS.findIndex((x) => x.id === section);
  const prev = SECTIONS[(si - 1 + SECTIONS.length) % SECTIONS.length];
  const next = SECTIONS[(si + 1) % SECTIONS.length];

  return (
    <div className={s.root}>
      <div className={`${s.backdrop} ${drawer ? s.drawer : ""}`} onClick={() => setDrawer(false)} />

      <aside className={`${s.sidebar} ${drawer ? s.drawer : ""}`} aria-label="Sidebar">
        <div className={s.profile}>
          <div className={s.photoWrap}>
            <button className={s.photo} onClick={() => go("home")} aria-label="Home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/kyle.png" alt={SITE.name} />
            </button>
            <button className={`btn btn-icon btn-ghost ${s.close}`} onClick={() => setDrawer(false)} aria-label="Close menu">
              <X size={20} />
            </button>
          </div>
          <div>
            <span className={s.name}>{SITE.name}</span>
            <span className={s.role}>Full-stack Developer · Cebu, PH</span>
          </div>
          <div className={s.open}><PulseDot /> Open to full-stack roles</div>
        </div>

        <nav className={s.nav} aria-label="Primary">
          {SECTIONS.map((x, i) => (
            <button
              key={x.id}
              className={`${s.navItem} ${x.id === section ? s.active : ""}`}
              aria-current={x.id === section ? "page" : undefined}
              onClick={() => go(x.id)}
            >
              <span className={s.navNo}>{no(i)}</span>
              <span className={s.navLabel}>{x.label}</span>
              <span className={s.navArrow}><ArrowRight size={16} /></span>
            </button>
          ))}
        </nav>

        <div className={s.sideFoot}>
          <div>
            <span className={s.metaLabel}>Appearance</span>
            <div className={s.toggle} role="group" aria-label="Theme">
              <button aria-pressed={theme === "light"} onClick={() => chooseTheme("light")}><Sun size={15} />Light</button>
              <button aria-pressed={theme === "dark"} onClick={() => chooseTheme("dark")}><Moon size={15} />Dark</button>
            </div>
          </div>
          <a href={`mailto:${SITE.email}`} className={s.mail}>{SITE.email}</a>
        </div>
      </aside>

      <main ref={mainRef} className={s.main}>
        <div className={s.topbar}>
          <button className={s.brand} onClick={() => go("home")}>K. Moreno<span>.</span></button>
          <div className={s.topRight}>
            <span className={s.topCur}>{no(si)} {SECTIONS[si].label}</span>
            <button className="btn btn-icon btn-secondary" style={{ width: 44, height: 44 }} onClick={() => setDrawer(true)} aria-label="Open menu">
              <Menu size={20} />
            </button>
          </div>
        </div>

        <div ref={contentRef} className={s.content}>
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
                <span className={s.metaLabel}>← Previous</span>
                <span className={s.pagerTitle}>{prev.label}</span>
              </button>
              <button className={s.pagerBtn} onClick={() => go(next.id)}>
                <span className={s.metaLabel}>Next →</span>
                <span className={s.pagerTitle}>{next.label}</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
