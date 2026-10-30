"use client";

// Phones get a deck instead of the desk. The desk needs hover and drag, which
// touch doesn't have; a swipe is the gesture a phone does have. Rules:
// design-system/neha-portfolio/pages/home-v2.md, "Phones".
//
// - Native horizontal scroll with snap points: it works with thumbs,
//   trackpads, keyboards (each card is a link, and focusing one scrolls it
//   into view) and screen readers (it's a plain list), and never fights the
//   page's vertical scroll.
// - Cards are tilted like prints and straighten as they reach the centre,
//   driven by the scroll position. Reduced motion: no tilt.
// - Holds the featured work and the NDA card; the rest is in "more work".
// - Previous / next buttons and a counter, so swiping is never required.

import { motionValue, motion, useReducedMotion, type MotionValue } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { homeV2Data, type WorkRow } from "@/data/home-v2-data";
import { CAL_LINK, resolveToken } from "@/lib/placeholders";
import { cn } from "@/lib/utils";

import { FaceDown, Print } from "./desk";

const { work, desk } = homeV2Data;
const TILTS = [-3, 3.5, -2.5, 3];

type Card = { kind: "work"; row: WorkRow } | { kind: "nda"; href: string | null };

export function MobileDeck() {
    const reduce = useReducedMotion();
    const scroller = useRef<HTMLUListElement>(null);
    const cards: Card[] = [
        ...work.rows.filter((r) => r.tier === "featured").map((row) => ({ kind: "work" as const, row })),
        { kind: "nda", href: resolveToken(CAL_LINK) },
    ];
    const [tilts] = useState(() => cards.map((_, i) => motionValue(TILTS[i % TILTS.length])));
    const [scales] = useState(() => cards.map(() => motionValue(0.94)));
    // Off-centre cards keep their print but fade their text, so words don't
    // peek in half-cut at the screen edges.
    const [fades] = useState(() => cards.map(() => motionValue(1)));
    const [active, setActive] = useState(0);

    const update = useCallback(() => {
        const el = scroller.current;
        if (!el) return;
        const mid = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let bestD = Infinity;
        Array.from(el.children).forEach((child, i) => {
            const c = child as HTMLElement;
            const d = (c.offsetLeft + c.offsetWidth / 2 - mid) / c.offsetWidth;
            const t = Math.min(1, Math.abs(d));
            if (Math.abs(d) < bestD) {
                bestD = Math.abs(d);
                best = i;
            }
            tilts[i].set(reduce ? 0 : TILTS[i % TILTS.length] * t);
            scales[i].set(reduce ? 1 : 1 - 0.06 * t);
            fades[i].set(1 - Math.min(1, t * 1.6));
        });
        setActive(best);
    }, [reduce, tilts, scales, fades]);

    useEffect(() => {
        const el = scroller.current;
        if (!el) return;
        let frame = 0;
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(() => ((frame = 0), update()));
        };
        // First measure on the next frame (setState can't run synchronously here).
        onScroll();
        el.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            cancelAnimationFrame(frame);
            el.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [update]);

    // Mouse drag. Touch and trackpads scroll the deck natively; a mouse can't,
    // so a narrow desktop window would otherwise be stuck on the first card.
    // Snapping is paused while dragging (it fights scrollLeft writes), then the
    // nearest card is centred on release. A drag never counts as a click.
    const drag = useRef<{ x: number; left: number; from: number; moved: boolean } | null>(null);
    const onPointerDown = (e: React.PointerEvent<HTMLUListElement>) => {
        if (e.pointerType !== "mouse" || e.button !== 0) return;
        const el = e.currentTarget;
        drag.current = { x: e.clientX, left: el.scrollLeft, from: nearestCard(el), moved: false };
    };
    const onPointerMove = (e: React.PointerEvent<HTMLUListElement>) => {
        const d = drag.current;
        if (!d) return;
        const dx = e.clientX - d.x;
        if (!d.moved && Math.abs(dx) < 5) return;
        if (!d.moved) {
            d.moved = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            e.currentTarget.style.scrollSnapType = "none";
        }
        e.currentTarget.scrollLeft = d.left - dx;
    };
    const endDrag = (e: React.PointerEvent<HTMLUListElement>) => {
        const d = drag.current;
        drag.current = null;
        if (!d?.moved) return;
        const el = e.currentTarget;
        const moved = el.scrollLeft - d.left;
        // Where the drag left it, or one card on from the start for a short
        // flick (over 40px) that didn't reach the next card's centre.
        let idx = nearestCard(el);
        if (idx === d.from && Math.abs(moved) > 40) idx = d.from + Math.sign(moved);
        el.style.scrollSnapType = "";
        centre(Math.max(0, Math.min(cards.length - 1, idx)));
        // Swallow the click that follows the release.
        const stop = (ev: MouseEvent) => {
            ev.preventDefault();
            ev.stopPropagation();
        };
        el.addEventListener("click", stop, { capture: true, once: true });
        window.setTimeout(() => el.removeEventListener("click", stop, { capture: true }), 0);
    };

    const centre = (i: number) => {
        const target = scroller.current?.children[i] as HTMLElement | undefined;
        target?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest", inline: "center" });
    };

    const go = (dir: -1 | 1) => {
        const el = scroller.current;
        const target = el?.children[Math.max(0, Math.min(cards.length - 1, active + dir))] as HTMLElement | undefined;
        target?.scrollIntoView({
            behavior: reduce ? "auto" : "smooth",
            block: "nearest",
            inline: "center",
        });
    };

    return (
        <section id="v2-deck" aria-labelledby="v2-deck-title" className="scroll-mt-6 md:hidden">
            <div className="flex items-end justify-between px-4">
                <h2 id="v2-deck-title" className="v2-display text-[44px] italic leading-none text-[var(--v2-oxblood)]">
                    {work.deckHeading}
                </h2>
                <div className="flex items-center gap-1">
                    <span aria-hidden className="v2-mono mr-2 text-[12px] tabular-nums text-[var(--v2-muted)]">
                        {active + 1} / {cards.length}
                    </span>
                    <DeckButton label={work.deckPrev} disabled={active === 0} onClick={() => go(-1)}>
                        ←
                    </DeckButton>
                    <DeckButton label={work.deckNext} disabled={active === cards.length - 1} onClick={() => go(1)}>
                        →
                    </DeckButton>
                </div>
            </div>

            <ul
                ref={scroller}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onDragStart={(e) => e.preventDefault()}
                className="mt-6 flex cursor-grab select-none snap-x active:cursor-grabbing snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[11vw] pb-10 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {cards.map((card, i) => (
                    <li key={card.kind === "work" ? card.row.id : "nda"} className="w-[78vw] max-w-[340px] shrink-0 snap-center">
                        <DeckCard card={card} rotate={tilts[i]} scale={scales[i]} fade={fades[i]} />
                    </li>
                ))}
            </ul>
        </section>
    );
}

// The card whose centre is closest to the deck's centre, read from the DOM so
// it is right even mid-drag, before React state catches up.
function nearestCard(el: HTMLElement) {
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestD = Infinity;
    Array.from(el.children).forEach((c, i) => {
        const ch = c as HTMLElement;
        const d = Math.abs(ch.offsetLeft + ch.offsetWidth / 2 - mid);
        if (d < bestD) {
            bestD = d;
            best = i;
        }
    });
    return best;
}

function DeckButton({
    label,
    disabled,
    onClick,
    children,
}: {
    label: string;
    disabled: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            aria-label={label}
            disabled={disabled}
            onClick={onClick}
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--v2-rule)] text-[18px] text-[var(--v2-oxblood)] transition-opacity disabled:opacity-30"
        >
            <span aria-hidden>{children}</span>
        </button>
    );
}

function DeckCard({
    card,
    rotate,
    scale,
    fade,
}: {
    card: Card;
    rotate: MotionValue<number>;
    scale: MotionValue<number>;
    fade: MotionValue<number>;
}) {
    const print = (
        <motion.span className="block shadow-[0_22px_34px_-22px_rgba(60,10,12,0.6)]" style={{ rotate, scale }}>
            {card.kind === "work" ? <Print row={card.row} /> : <FaceDown />}
        </motion.span>
    );

    if (card.kind === "nda") {
        const body = (
            <>
                {print}
                <motion.span className="block" style={{ opacity: fade }}>
                    <span className="mt-5 block text-[17px] leading-snug text-[var(--v2-ink)]">{desk.nda.client}</span>
                    <span className="v2-mono mt-2 flex items-center gap-1 text-[13px] text-[var(--v2-oxblood)]">
                        {desk.nda.open} {card.href && <span aria-hidden>↗</span>}
                    </span>
                </motion.span>
            </>
        );
        return card.href ? (
            <a href={card.href} target="_blank" rel="noopener noreferrer" className="block">
                {body}
            </a>
        ) : (
            <div>{body}</div>
        );
    }

    const { row } = card;
    return (
        <Link href={row.href} className="group block">
            {print}
            <motion.span className="block" style={{ opacity: fade }}>
                <span className="v2-display mt-5 block text-[30px] leading-none text-[var(--v2-ink)]">{row.name}</span>
                <span className="mt-2 block text-[16px] leading-snug text-[var(--v2-ink)]">{row.outcome}</span>
                <span className={cn("v2-mono mt-3 flex items-center gap-3 text-[12px] text-[var(--v2-muted)]")}>
                    <span className="text-[var(--v2-oxblood)]">● {work.deckFeatured}</span>
                    <span>
                        {row.readingTime} {work.cursorPrefix}
                    </span>
                    <span aria-hidden className="ml-auto text-[16px] text-[var(--v2-oxblood)]">
                        →
                    </span>
                </span>
            </motion.span>
        </Link>
    );
}
