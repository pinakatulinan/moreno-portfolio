import LiveClock from "./LiveClock";
import CopyEmailButton from "./CopyEmailButton";
import { SITE } from "@/data/site";
import s from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contact" className={s.contact} aria-labelledby="contact-title">
      <div className={s.eyebrow}>05 — Contact</div>
      <h2 id="contact-title" data-reveal="" className={s.headline}>
        Got a role that needs a full-stack dev?
      </h2>

      <div data-reveal="" className={s.row}>
        <div className={s.cell}>
          <span className={s.label}>Email</span>
          <a href={`mailto:${SITE.email}`} className={`${s.big} ${s.email}`} data-cursor="link">
            {SITE.email}
          </a>
          <CopyEmailButton email={SITE.email} className={s.copy} />
        </div>
        <div className={s.cell}>
          <span className={s.label}>Phone</span>
          <a href={SITE.phoneHref} className={s.big} data-cursor="link">
            {SITE.phoneDisplay}
          </a>
        </div>
        <div className={s.cell}>
          <span className={s.label}>Location</span>
          <span className={s.big}>{SITE.location}</span>
          <span className={s.time}>
            <LiveClock suffix=" PHT · GMT+8" />
          </span>
        </div>
      </div>

      <footer className={s.footer}>
        <span>© 2026 {SITE.name}</span>
        <a href="#top" data-cursor="link">
          Back to top ↑
        </a>
      </footer>
    </section>
  );
}
