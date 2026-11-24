import CopyEmailButton from "../CopyEmailButton";
import Seigaiha from "../japan/Seigaiha";
import { SITE } from "@/data/site";
import s from "./sections.module.css";
import Eyebrow from "./Eyebrow";

export default function Contact() {
  return (
    <div className={s.stack} style={{ gap: 28 }}>
      <div data-st="" className={s.contact}>
        <Seigaiha bg="var(--color-accent)" line="color-mix(in srgb, var(--km-on-accent-hi) 16%, transparent)" className={s.waves} />
        <span className={s.contactJp} lang="ja" aria-hidden="true">縁</span>
        <Eyebrow id="contact" className={s.contactEyebrow} />
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
