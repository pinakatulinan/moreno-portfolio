"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import type { Project } from "@/data/projects";
import shared from "@/styles/shared.module.css";
import s from "./CaseStudyModal.module.css";

interface Props {
  project: Project;
  onClose: () => void;
  onNext: () => void;
}

export default function CaseStudyModal({ project: p, onClose, onNext }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll, close on Esc, keep focus inside, restore focus on close.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, [onClose]);

  // Scroll back to the top when cycling to the next project.
  useEffect(() => {
    dialogRef.current?.scrollTo({ top: 0 });
  }, [p.id]);

  return (
    <div className={`dialog-backdrop ${s.backdrop}`} onClick={onClose}>
      <div
        ref={dialogRef}
        className={`dialog ${s.dialog}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={s.header}>
          <div className={s.headerTop}>
            <span className={s.kicker}>
              {p.no} / {p.kicker}
            </span>
            <button
              ref={closeRef}
              type="button"
              className={`btn btn-icon ${s.close}`}
              onClick={onClose}
              aria-label="Close"
              data-cursor="link"
            >
              <X size={18} strokeWidth={2} aria-hidden />
            </button>
          </div>
          <h2 id="case-title" className={s.title}>
            {p.title}
          </h2>
        </div>

        <div className={s.body}>
          <p className={s.desc}>{p.desc}</p>

          <div className={s.meta}>
            {(
              [
                ["Role", p.role],
                ["Platform", p.platform],
                ["Status", p.status],
              ] as const
            ).map(([label, value]) => (
              <div key={label} className={s.metaCell}>
                <span className={shared.metaLabel}>{label}</span>
                <span className={s.metaValue}>{value}</span>
              </div>
            ))}
          </div>

          <div className={s.stack}>
            <span className={shared.metaLabel}>Stack</span>
            <div className={s.tags}>
              {p.stack.map((t) => (
                <span key={t} className={`tag tag-accent ${s.tag}`}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className={s.actions}>
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-primary ${s.action} ${s.github}`}
              data-cursor="link"
            >
              View on GitHub <ArrowUpRight size={16} strokeWidth={2} aria-hidden />
            </a>
            <button
              type="button"
              className={`btn btn-secondary ${s.action} ${s.next}`}
              onClick={onNext}
              data-cursor="link"
            >
              Next project <ArrowRight size={16} strokeWidth={2} aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
