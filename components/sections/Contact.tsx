import CopyEmailButton from "../CopyEmailButton";
import { SITE } from "@/data/site";
import s from "./sections.module.css";

export default function Contact() {
  return (
    <div className={s.stack} style={{ gap: 28 }}>
      <div data-st="" className={s.contact}>
        <div className={s.contactEyebrow}>07 / 08 — Contact</div>
        <h1 className={s.contactH1}>Got a role that needs a full-stack dev?</h1>
        <div className={s.cells}>
          <div className={s.cell}>
            <span className={s.meta}>Email</span>
            <a href={`mailto:${SITE.email}`} className={s.big}>{SITE.email}</a>
            <CopyEmailButton email={SITE.email} className={s.copyBtn} />
          </div>
          <div className={s.cell}>
            <span className={s.meta}>Phone</span>
            <a href={SITE.phoneHref} className={s.big}>{SITE.phoneDisplay}</a>
          </div>
          <div className={s.cell} style={{ paddingRight: 0 }}>
            <span className={s.meta}>Location</span>
            <span className={s.big}>{SITE.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
