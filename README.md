# Kyle Ezekiel D. Moreno — Portfolio

Next.js 15 (App Router) + TypeScript + CSS Modules, with a Japanese (和 *wa*) visual language:
washi paper, sumi ink, shu-vermilion and a 限界を超えろ (*genkai o koero* — surpass your limits) motif.

## 和 Japanese design & interactions

| Piece | Where | What it does |
| --- | --- | --- |
| 限界 Genkai hero | `components/japan/Genkai.tsx` | Brush-calligraphy 限界 written stroke-by-stroke in ink over a red sun (a moon at night), hanko stamp, kanji rain that parts around the cursor. **Press & hold** the kanji (or Space/Enter) to charge it — at 100% the limit breaks: 限界突破. |
| 障子 Shoji doors | `components/japan/Shoji.tsx` | Sliding paper doors close and open between sections, showing the destination's kanji. Opens by itself on first load (CSS only). |
| 桜 Sakura + 波紋 ripples | `components/japan/Sakura.tsx` | Petals drift on a breeze that follows the pointer; every click leaves a pond ripple. Toggle in the sidebar. |
| 円相 Ensō, 判子 Hanko, 青海波 Seigaiha | `components/japan/*` | Zen circle around the portrait, red seal reading 限界突破, wave pattern on vermilion panels. |
| Kanji labels | `data/sections.ts`, `data/skills.ts` | Each section/skill has a kanji, reading and numeral (一 二 三…). |

Fonts: Shippori Mincho (headings) and Zen Kaku Gothic New (body) via `next/font`; Google serves the
Japanese glyphs in unicode-range slices so only the kanji on the page are downloaded. The calligraphy
is pre-converted to SVG paths (`data/glyphs.ts`, from Yuji Boku, SIL OFL) so it can be ink-animated.
`prefers-reduced-motion` turns off the petals, ripples, doors and ink animations.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Deploy: push to GitHub and import in Vercel (zero config).

## Structure

```
app/            layout.tsx (Japanese fonts via next/font, metadata) · page.tsx · globals.css · icon.svg
components/     Nav, Hero, Typewriter, WorkGrid, ProjectCard, CaseStudyModal, About,
                Experience, Skills, Contact, CopyEmailButton, CursorFollower, Reveal,
                LiveClock, PulseDot  (+ *.module.css)
data/           projects.ts · experience.ts · skills.ts · site.ts   ← edit copy here
components/japan/  Genkai, Shoji, Sakura, Hanko, Enso, Seigaiha (+ japan.module.css)
styles/         tokens.css (washi/sumi/vermilion design tokens + component classes)
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
