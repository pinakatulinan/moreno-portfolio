import { SECTIONS, type SectionId } from "@/data/sections";
import s from "./sections.module.css";

/** 一 ── 01 / 08 · Home 序 — section label with its kanji numeral and Japanese title. */
export default function Eyebrow({ id, label, className, st }: { id: SectionId; label?: string; className?: string; st?: boolean }) {
  const i = SECTIONS.findIndex((x) => x.id === id);
  const sec = SECTIONS[i];
  const nn = (n: number) => String(n).padStart(2, "0");
  return (
    <div className={`${s.eyebrow} ${className ?? ""}`} data-st={st ? "" : undefined}>
      <span className={s.ebNum} lang="ja">{sec.num}</span>
      <span className={s.ebRule} aria-hidden="true" />
      <span>{nn(i + 1)} / {nn(SECTIONS.length)} — {label ?? sec.label}</span>
      <span className={s.ebJp} lang="ja" title={sec.kana}>{sec.kanji}</span>
    </div>
  );
}
