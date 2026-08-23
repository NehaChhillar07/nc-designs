# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/neha-portfolio/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Neha Chhillar Portfolio
**Category:** Portfolio / Personal (product designer)
**Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · shadcn/ui · Motion (`motion/react`) + GSAP · Lenis smooth scroll · custom cursor
**Design Dials:** Variance 4/10 (balanced, editorial) · Motion 7/10 (motion-driven) · Density 3/10 (spacious)

> This file was seeded from the ui-ux-pro-max skill, then rewritten to match the **actual** tokens in this codebase. Values below are real (from `globals.css` and the case-study components), not generic defaults.

---

## Brand Voice (non-negotiable)

- **Lowercase, human, unpolished-on-purpose.** Headlines and body read like a person talking, not a brand. Intentional lowercase (e.g. "the app i built so people could say the thing they'd *never say out loud*").
- **No em dashes. No AI/marketing buzzwords** (no "leverage", "seamless", "elevate", "unlock", "delve").
- Keep proper names/product names as the user styles them (e.g. "unsaid" stays lowercase).
- Handwritten Caveat script is used for asides/annotations ("yes, it's real and live. go tap something.").

---

## Global Rules

### Color Palette

Two layers: a **light neutral base** (the shadcn chrome — header, cards, most pages) and a **warm editorial accent** system (used across case studies and for brand moments). Some case-study heroes run a **dark editorial band**.

**Base UI — light (from `globals.css`, oklch):**

| Role | Value | Token |
|------|-------|-------|
| Background | `oklch(1 0 0)` (#FFFFFF) | `--background` |
| Foreground | `oklch(0.145 0 0)` (near-black) | `--foreground` |
| Primary (solid buttons, e.g. Connect) | `oklch(0.205 0 0)` (near-black) | `--primary` |
| Primary foreground | `oklch(0.985 0 0)` (near-white) | `--primary-foreground` |
| Muted / muted text | `oklch(0.97 0 0)` / `oklch(0.3 0 0)` | `--muted` / `--muted-foreground` |
| Border | `oklch(0.922 0 0)` | `--border` |
| Radius | `0.625rem` | `--radius` |

**Brand accent — warm (hex, from case-study components):**

| Role | Hex | Where it's used |
|------|-----|-----------------|
| Accent / hover | `#C96114` | custom-cursor hover color, links, brand accent |
| Bright accent | `#FF9800` | tags ("fun project · 2026"), highlights (most-used accent) |
| Warm | `#B06A48` | case-study warm tone |
| Warm deep | `#9C5A3C` | case-study warm tone (deeper) |
| Cream | `#F1E9DF` | text/foreground **on** dark hero bands |
| Soft highlight | `#FFD79A` | underline/emphasis on dark |
| Mint highlight | `#9FE8C6` | secondary highlight on dark |

**Dark editorial hero band (e.g. `/case-study/unsaid`):**

| Role | Value |
|------|-------|
| Hero gradient | `radial-gradient(125% 120% at 50% 32%, #241D18 0%, #1A1512 54%, #110D0B 100%)` |
| Text on dark | `#F1E9DF` (cream) |
| Rule: over a dark hero, the **header is transparent at the top** (no bar/seam) and fades a dark frosted bar in on scroll. Never a light `bg-white/25` bar over a dark hero. |

**Notes:** Warm, editorial, monochrome-base + warm-orange accent. Avoid cold blues/indigo as accents — off-brand. One scoped exception: `--accent-cool` (`#79B8FF`) on the hero headline's highlight and underline, which sit on top of the orange gradient blob and need something to separate from.

### Typography

- **UI / body:** `Inter` (`--font-inter`, `font-sans`)
- **Handwritten accent:** `Caveat` (`--font-caveat`) — asides, annotations, playful labels
- **Editorial (case studies):** `Lora` (serif, italic emphasis like "*never say out loud*") + `Space Grotesk` (case-study headings)
- Base size 16px, line-height 1.5. Use semantic Tailwind tokens, not raw hex, in components.

### Spacing (Density 3/10 — Spacious)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | 4px | Tight gaps |
| `--space-sm` | 8px | Icon gaps, inline |
| `--space-md` | 24px | Standard padding |
| `--space-lg` | 32px | Section padding |
| `--space-xl` | 48px | Large gaps |
| `--space-2xl` | 64px | Section margins |
| `--space-3xl` | 96px | Hero padding |

Case-study section rhythm in use: `py-16 md:py-24`.

---

## Component Specs

Prefer **shadcn/ui primitives** (`@/components/ui/*`) — Button, Dialog, Sheet, etc. Match the existing look:

```css
/* Primary (solid, near-black) — e.g. "Connect" */
.btn-primary   { background: var(--primary); color: var(--primary-foreground);
                 border-radius: var(--radius); font-weight: 600; transition: all 200ms ease; cursor: pointer; }

/* Outline / light — e.g. "Resume" */
.btn-outline   { background: rgba(255,255,255,0.8); backdrop-filter: blur(4px);
                 border: 1px solid var(--border); border-radius: var(--radius); transition: all 200ms ease; cursor: pointer; }

/* Warm accent link / hover */
a:hover, .accent { color: #C96114; transition: color 200ms ease; }
```

- Overlays/drawers/menus render through shadcn **Portal** primitives (Dialog/Sheet/Popover) — no raw fixed-position divs.
- Cards: subtle lift on hover, transitions 150–300ms, no layout-shifting scale.

---

## Style Guidelines

**Style:** Motion-driven editorial. Light neutral chrome, warm-orange accents, occasional dark editorial hero bands, a custom cursor, and scroll/entrance motion. Content and craft first.

### Page Pattern — Portfolio Grid

- **Strategy:** Visuals first. Fast loading essential.
- **CTA:** project-card hover + footer contact + header "Connect".
- **Section order:** Hero (name/role) → Work (project grid) → Fun with Claude → About/Philosophy → Contact/Footer.

---

## Motion

Two systems coexist: **Motion (`motion/react`)** for component/entrance animation and **GSAP** for scroll-driven sequences. Lenis drives smooth scroll.

**Stagger list** (load/scroll) — 300–450ms, `back.out(1.4)`:

```js
gsap.from('.grid-item', { opacity: 0, scale: 0.92, y: 16, duration: 0.4,
  stagger: { each: 0.06, from: 'start', grid: 'auto' }, ease: 'back.out(1.4)' });
```

- ⚡ Group DOM writes; avoid layout reads (`getBoundingClientRect`) between staggered tweens.
- ❌ No `back.out` overshoot on dense/informational UI.
- **Always** gate motion behind `prefers-reduced-motion` (the custom cursor and heavy animations already do).

### Custom cursor (project-specific)

- Position via ref + `translate3d` in one rAF loop — never React state per frame. No MutationObserver, no per-move `elementFromPoint`.
- Disabled on touch and reduced-motion, with the **native cursor fully restored** in those cases.
- ⚠️ Known follow-up: the arrow is pure black (`#000`) and hard to see on dark hero bands — add a white `drop-shadow` outline for visibility on dark.

---

## Anti-Patterns (Do NOT Use)

- ❌ Corporate templates / generic layouts.
- ❌ Cold blue/indigo accents (off-brand — use warm `#C96114`/`#FF9800`). Sole exception: `--accent-cool` `#79B8FF`, hero headline marks only.
- ❌ Emojis as icons — use SVG (Lucide).
- ❌ Light frosted header bar over a dark hero (creates a visible band/seam).
- ❌ Sentence-case marketing copy with em dashes and buzzwords (breaks the voice).
- ❌ Missing `cursor` handling, low-contrast text, instant (0ms) state changes, invisible focus states.

---

## Pre-Delivery Checklist

- [ ] Copy reads human + lowercase; no em dashes, no buzzwords
- [ ] No emojis as icons; icons from one set (Lucide)
- [ ] Hover states with smooth transitions (150–300ms)
- [ ] Text contrast ≥ 4.5:1 (incl. cream-on-dark and cursor on dark bands)
- [ ] Focus states visible for keyboard nav
- [ ] `prefers-reduced-motion` respected (motion + cursor)
- [ ] Custom cursor visible on both light and dark sections
- [ ] Header treatment correct per hero (transparent-over-dark, frosted-on-scroll)
- [ ] Responsive: 375 / 768 / 1024 / 1440px, no horizontal scroll on mobile
- [ ] Overlays use shadcn Portal primitives
