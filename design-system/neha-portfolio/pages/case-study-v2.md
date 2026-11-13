# Case studies 2.0 (`/v2/case-study/*`)

Template set by Human Firewall. Everything in `home-v2.md` (paper, ink, type, motion, phones) applies.
Kit: `components/v2-case-study/cs-kit.tsx`. Copy: `data/v2-<slug>-data.ts`.

## The story is not rewritten
- The v2 data file **imports** the live case study's data and only adds staging (chapters, image sizes, the strings that lived in the old component).
- Wording changes are listed as `SLIPS` and approved by Neha first.
- Before shipping, run the word-for-word check: every string in the live data must appear on the v2 page, apart from the approved slips.

## Reading structure
- **Opener:** the title in set type (`.v2-title`; only Neha's own name is ever signed), the problem sentence, subtitle, facts (timeline · team · role), and a margin note. The first screen always carries the title and the problem.
- **Chapters:** numbered (`01 · label`) with a claim-heading in the display serif. The headings alone should tell the story.
- **Chapter index (desktop only, `lg`+):** a quiet spine pinned near the top. At rest it shows ticks plus the current chapter's short title; hover or focus opens all chapters with progress. `aria-current="location"` marks the current chapter. **No index on phones:** the top bar's progress hairline is enough.
- **Close:** reflection, signed by Neha (`<Signature word="full" variant="signoff">`, written once as it scrolls in), then **Notes & methods** (where numbers come from, what's illustrative, how quotes were gathered, built only from the study's own captions), then the next case study.

## Staging vocabulary
- **Screenshots → `PrintFigure`:** a cream print with a mono caption, an optional stamp ("claude code prototype"), a resting tilt and a few px of scroll parallax.
- **Quotes → `TapedNote`** (oxblood tape). **Asides → `MarginNote`** (Caveat, in the margin on desktop, inline with a red rule on phones). **Key lines → `PullQuote`.**
- **Decisions:** the rejected option sits beside the chosen one: struck-through lists, a hand-drawn circle on the choice, and "rejected" stamps on drafts.
- **One hands-on moment per study,** where the reader tries the idea (HF: the funnel switch). It's a real control (radio group, keyboard arrows, 44px), and its conclusion stays in the page for readers who never use it.
- **Outcome:** one big number (`CountUp`) with its source in mono, and secondary numbers smaller.

## Decks (Flashcard Builder: `components/v2-case-study/flashcard/`)
The product is about swiping, flipping and dealing cards, so this study stages its story with those gestures. These rules extend the ones above for this study only.
- **Five verbs, each tied to a claim:** pass (handoff), swipe (learn), flip (reveal), deal (publish), stack (build in layers). No motion without a claim behind it, and one flip per reveal, never a flip on every card.
- **One hero and a few small moments, each proving a decision:** the learner deck is the hero (ch 02). The small ones are the studio (entry fan + push-and-deal) and the mini editor. The handoff pass and the exploded card play by themselves, with no controls.
- **Say each claim once.** One sentence, or one moment, or one pull quote, never all three for the same point. No pop quizzes, no swipe deck in the opener (it spends the hero moment before the story), and no craft sheet: a reviewer's attention goes to the product, not to the page's own motion. The first screen carries the title, the line and the outcome.
- **Shader exception:** a riso `GrainGradient` (oxblood → amber → ink, `@paper-design/shaders-react`, pinned) as the "table" behind a deck, never under reading text. At most 2 canvases per page; the CSS gradient is the fallback (server, no WebGL), and reduced motion, Save-Data or a low-power device get one still frame. Shaders pause off-screen.
- **Every gesture has a key and a button:** ← → to move, space to flip, 44px prev / flip / next. Horizontal drags use `touch-action: pan-y` so the page still scrolls on phones.
- **0.5× switch:** `useTempo()` in `deck.tsx` stretches every duration and spring on the page. Spec mode (S) draws the swipe threshold and live velocity.
- **All the text is in the server markup:** both faces of a flip card (the hidden one `aria-hidden` + `inert`), and a "read the pack as text" disclosure under a deck that only shows a few cards at a time.
- **Stock photos** get a riso duotone (`.v2-riso`); client names and logos are blurred or withheld.

## Never
A loader, a greeting, scroll-jacking or a pinned runway, text that only renders client-side, empty alt text on content images, or numbers without a source line.
