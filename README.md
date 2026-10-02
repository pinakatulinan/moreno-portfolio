# Kyle Ezekiel D. Moreno — Portfolio

Next.js 15 (App Router) + TypeScript + CSS Modules, built from the design handoff (`Portfolio.dc.html`).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Deploy: push to GitHub and import in Vercel (zero config).

## Structure

```
app/            layout.tsx (Archivo via next/font, metadata) · page.tsx · globals.css · icon.svg
components/     Nav, Hero, Typewriter, WorkGrid, ProjectCard, CaseStudyModal, About,
                Experience, Skills, Contact, CopyEmailButton, CursorFollower, Reveal,
                LiveClock, PulseDot  (+ *.module.css)
data/           projects.ts · experience.ts · skills.ts · site.ts   ← edit copy here
styles/         tokens.css (Modernist design-system tokens + component classes, verbatim)
                shared.module.css (eyebrow, section padding, split layout, grid lines)
public/         Moreno_Resume.pdf
```

## Notes

- Only interactive pieces are client components (clock, typewriter, work grid/modal, copy button,
  cursor, reveal). Everything else renders on the server.
- Live clock renders `--:--:--` on the server and fills in on the client — no hydration mismatch.
  All clocks share one 1s ticker.
- `prefers-reduced-motion` disables scroll reveal, the cursor follower and CSS animations.
- Cursor follower only runs on `pointer: fine` devices.
- Project cards are keyboard-accessible (Enter/Space); the modal traps focus, closes on Esc /
  backdrop / X, locks body scroll and returns focus to the card.
- Future images: add `className="grayscale"` (defined in tokens.css).
