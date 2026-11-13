# Homepage 2.0 (`/v2`)

Overrides `../MASTER.md` for `/v2` only. Everything not listed here follows Master
(voice, no em dashes, no buzzwords, Lucide icons, reduced motion, 4.5:1 contrast).

## Direction
Beige paper, oxblood ink, editorial off-grid. A magazine spread, not a landing page.
About 250 visible words. Numbers over adjectives. One signature idea: **spec mode**.

## Palette (scoped under `.home-v2` in `components/home-v2/home-v2.css`)
| Token | Value | Use |
|---|---|---|
| `--v2-paper` | `#EDE6DA` | page background, with a static grain overlay |
| `--v2-ink` | `#1A1414` | body text |
| `--v2-oxblood` | `#6B0F12` | display type, links, accents (about 10:1 on paper) |
| `--v2-muted` | `#6E6259` | meta, captions (about 5:1 on paper) |
| `--v2-rule` | oxblood at 20% | hairlines |
| `--v2-redline` | `#B42A22` | spec mode only (about 5:1 on paper) |

Replaces Master's orange and blue accents on this page. No orange, no blue.

## Type
- Display: Instrument Serif (`--font-instrument`), roman + italic. The name, section words, the footer line.
- Body: Inter (already global).
- Meta: Geist Mono (`--font-geist-mono`), lowercase, `tracking-tight`. Years, status, numbers, spec labels.
- Annotation: Caveat (already global), one note in the hero only.

## Layout
- 4 columns on phones, 12 from `md`, `px-4 md:px-8`, gutters `gap-x-4 md:gap-x-6`.
  Spec mode draws exactly this grid, so the classes must stay in sync (`GRID` in `spec-mode.tsx`).
- Nothing is centered by default. Content starts on uneven columns (2, 4, 7) on purpose.
- The hero name is oversized and bleeds off the right edge. The section clips it, so there is never horizontal page scroll.
- Vertical rhythm comes from `SpecGap` spacers, so spec mode can show the real values.

## Motion
Every movement answers something the reader did: arriving, pointing, hovering, clicking.
One curve and three durations for the whole page, in `components/home-v2/motion.tsx`:
`EASE = [0.22, 1, 0.36, 1]`, `DUR = { fast: 0.2, base: 0.6, slow: 0.9 }`.
Transform and opacity only. No pinning, no scroll-jacking, no GSAP.

| Moment | What happens | Why |
|---|---|---|
| Greeting | `hey` → `hiii` → `ok hi.` → `i’m neha`, then the paper lifts away (about 1.9s). Once per session; any click or key skips it; skipped for reduced motion. All CSS, timed by `--greet`. | A voice before a layout. |
| Signed name | The name is handwritten first (Caveat, one letter at a time at a pen's pace: "neha", a pen lift, "chhillar"), then a spec step: the handwriting fades to an underlay, redline guides (cap height, x-height, baseline) draw across and the serif appears in outline. Then the outline fills with ink and the guides clear (about 3s in all). On every page load, also on phones; a click or key skips it; reduced motion shows the set name only. All CSS, timed by `--sign-at` / `--spec-at` / `--set-at`. Paths: `scripts/build-signature.mjs`. | Sketch, spec, ship: how she works. A print gets signed. |
| Desk | The work sits on the paper as pieces: drag and throw them (they lean into the throw), hover to inspect, click to open, arrow keys to nudge. | Shows interaction design, not just animation. |
| Inspect | A hovered (or focused) piece gets a Figma-style frame: handles, a redline label (name · status · year), a working resize grip, "open case study". One click opens it. | Speaks the language of product design. |
| Tidy up | Scroll to the work list (or press "tidy up") and every piece flies into its row's slot. Scroll back and they return to where you left them. | Mess into system: what a product designer does. |
| Proof numbers | Count up once when they arrive (`CountUp`). The server renders the final value. | Draws the eye to the numbers. |
| Scroll | Sections arrive with rise + blur (`Reveal`), staggered 70–120ms. A 2px oxblood line fills with reading progress. | Rhythm, plus a sense of where you are. |
| Work rows | Others dim, the title steps right, the number rolls into an arrow. The preview opens from its center, follows the cursor, and leans with cursor velocity. | The list stays light; the visuals arrive on demand. |
| Manifesto | Hovering one line quiets the others. | Each line reads on its own. |
| Footer | "say hi." ripples on hover (`WaveText`). Copy-email rolls "click to copy" into "copied ✓". | Small rewards for the last action on the page. |
| Spec mode | A scan line sweeps down; boxes appear behind it, staggered by screen position. The toggle is a real switch. | The signature gets its own moment. |

Pointer effects run only on a fine pointer (`useFinePointer`). With reduced motion on, content
arrives in place (`MotionConfig reducedMotion="user"` plus the global CSS rule) and every pointer
effect switches off.

## Desk (`components/home-v2/desk.tsx`)
- Piece homes live in `data/home-v2-data.ts` as percentages of the desk, with separate desktop and phone homes.
- A piece and its work-list slot share a `layoutId`. Only one is mounted at a time, which is what makes them fly.
- Where a piece was left is kept in `<Desk>`, not in the piece, because work pieces unmount while filed.
- Drag offsets are committed into `left`/`top` after each throw (`flushSync`, then reset x/y), so a flight always starts from where the piece really is.
- Each project is a **print** (`Print` in desk.tsx): cream border, screenshot cropped in, name and year on the bottom edge. The list slot renders the same print smaller; it is sized in % and container units (cqw), so the flight between them never distorts.
- Desk and slot images use the same `sizes` (320px), so a slot never waits on a download mid-flight.
- Desktop piece widths are designed at 1440 and shrink with the viewport below that.
- Tidy has two thresholds (72% and 90% of the viewport) so pieces don't flicker at the boundary.
- Phones: no dragging (the page must scroll freely). A tap opens the case study; the tidy flight still plays.

## Hierarchy (which work to open first)
- Every work row has a `tier` in `data/home-v2-data.ts`. **featured** (Human Firewall, Flashcard Builder): big prints, tall rows with reading time. **more** (unsaid, Airtel, eCrime Hub): a stacked pile on the desk, compact rows under "more work".
- The pile fans out on hover or focus (always fanned on phones). Dragging a print out commits its fanned spot, so it never jumps, and it stays loose from then on.
- Current client work under NDA is a face-down print ("wholesale banking · under NDA"). Its inspect frame offers a call instead of a case study. It never flies to the list.

## Phones (below 768px): designed, not shrunk
- **Layout follows width; interaction follows the pointer.** The desk renders only from md up (and isn't mounted below, so phones never load or tab through it).
- **First screen carries the pitch:** name, role line, note, "now" line, proof numbers, "see the work ↓". No collage before the claim.
- **Work is a swipe deck** (`mobile-deck.tsx`): native scroll-snap, featured work plus the NDA card, prints that straighten as they reach the centre (no tilt with reduced motion), neighbours' text faded, a counter, and 44px previous/next buttons. Tapping a card opens it, and every card says where it goes.
- **Nothing appears twice:** the list below shows only "more work" on phones.
- The polaroid sits with the bio and the sticky note with "how i work".
- **Touch and text:** top bar links are 44px tall. No label is smaller than 12px (a CSS rule in home-v2.css). Redlines are hidden: they're a desktop inspection tool.

## Signature: spec mode
Press `S` (ignored while typing or with a modifier) or use the "redlines" toggle in the top bar.
Shows the 12-column layout grid, a dashed box on every `<Spec>` element with its name, live size,
and live type spec read from computed styles, and the measured height of every `SpecGap`.
Values are measured, never typed, so they stay true when the layout changes.

## Resume (`/v2/resume`): the route
The PDF is a download; the screen shows the journey. Stops live in `v2Pages.resume.stops`
(`data/v2-pages-data.ts`), oldest first. A stop's `work` lists ids from `homeV2Data.work.rows`, so its
prints (the desk's `Print`) and links never drift from the homepage.

| Layer | What happens | Why |
|---|---|---|
| Contour map (`contour-field.tsx`) | A WebGL2 survey map of the paper: oxblood hairline contours, every fifth heavier. Scrolls at 35% of the page and drifts very slowly. Quieter under the reading column. Reduced motion: one still frame. No WebGL2: the static grain only. | A journey reads as terrain. The one exception to "no shader" and "motion answers the reader", on this page only. |
| Ghost numeral | The stop's year, huge and faint, moves slower than the page. | The back layer of the parallax. |
| Route | A dashed track down grid column 2; an oxblood line draws over it as each stop crosses the reading line (62% of the viewport), with a pen tip. The current stop breathes ("you are here"). | Where you are in the story, like the reading-progress hairline. |
| Prints | Each moves at its own speed, so a stack opens as you pass. Hover or focus straightens one, brings it to the top and shows "read · n min". | The front layer: the work made at that stop. |

Still transform-only and scroll-driven: no pinning, no scroll-jacking, no GSAP.
