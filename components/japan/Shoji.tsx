import s from "./japan.module.css";

/**
 * 障子 Shoji — sliding paper doors that close over the page and open on the next
 * section. `closed` is driven by Portfolio; the first paint plays a CSS-only
 * opening (works without JS and is skipped for reduced motion).
 */
export default function Shoji({ closed, kanji, label, intro }: { closed: boolean; kanji: string; label: string; intro: boolean }) {
  const cls = [s.shoji, closed ? s.shojiClosed : "", intro ? s.shojiIntro : ""].join(" ");
  return (
    <div className={cls} aria-hidden="true">
      <div className={`${s.door} ${s.doorL}`}><span className={s.hikite} /></div>
      <div className={`${s.door} ${s.doorR}`}><span className={s.hikite} /></div>
      <div className={s.shojiLabel}>
        <span className={s.shojiKanji}>{kanji}</span>
        <span className={s.shojiEn}>{label}</span>
      </div>
    </div>
  );
}
