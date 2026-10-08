import { ArrowUpRight, Download } from "lucide-react";
import { SITE } from "@/data/site";
import s from "./sections.module.css";

export default function Resume() {
  return (
    <div className={s.stack} style={{ gap: 24 }}>
      <div data-st="" className={s.headRow}>
        <div className={s.headCol}>
          <div className={s.eyebrow}>08 / 08 — Résumé</div>
          <h1 className={s.h1}>Moreno's Resume.</h1>
        </div>
        <div className={s.btnRow}>
          <a
            href={SITE.resume}
            download="Moreno_Resume.pdf"
            className={`btn btn-primary ${s.btnWide}`}
            style={{ padding: "12px 16px", minWidth: 170 }}
          >
            Download <Download size={16} />
          </a>
          <a
            href={SITE.resume}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn btn-secondary ${s.btnWide}`}
            style={{ padding: "12px 16px", minWidth: 170 }}
          >
            Open in tab <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <iframe
        data-st=""
        src={`${SITE.resume}#zoom=100`}
        title="Kyle Moreno résumé"
        className={s.frame}
      />
    </div>
  );
}
