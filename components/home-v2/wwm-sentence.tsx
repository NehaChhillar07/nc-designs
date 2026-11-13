"use client";

// The work-with-me hero: a sentence the founder finishes. "i'm building [ ]
// for [ ], and i'm stuck on [ ]." Each blank is its chosen word, which opens
// a small panel of answers in the site's own type (an ARIA listbox).
// The "stuck on" answer deals the matching proof onto the desk: a print of
// the real work, stamped with its result and its source. The finished
// sentence goes with the booking as its note, so the first call starts
// where the founder already is.
// Reduced motion: the print crossfades instead of being dealt.

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { v2Pages } from "@/data/v2-pages-data";
import { CAL_LINK, resolveToken } from "@/lib/placeholders";
import { CONTACT_EMAIL } from "@/lib/site";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import { cn } from "@/lib/utils";

import { GRID } from "./grid";
import { HandArrow } from "./hand-arrow";
import { EASE } from "./motion";
import { Spec } from "./spec-mode";

const { workWithMe: w } = v2Pages;
const S = w.sentence;
type Stuck = (typeof S.stuck)[number];
const CAVEAT = { fontFamily: "var(--font-caveat), cursive" } as const;
const PANEL_W = 288; // the answer panel's widest (18rem)

// One blank: the chosen word, underlined, opening a small paper panel of
// answers in the site's own type (a native select would open its menu at the
// headline's size). The ARIA listbox pattern: the word is a button that
// opens the list; arrows, Home and End move, Enter or Space choose, Escape
// or a click outside close, and focus goes back to the word.
function Blank({ id, label, value, options, onChange }: { id: string; label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);
    const [pos, setPos] = useState({ top: 0, left: 0 });
    const word = useRef<HTMLSpanElement>(null);
    const list = useRef<HTMLSpanElement>(null);
    const at = Math.max(0, options.findIndex((o) => o.value === value));
    const shown = options[at]?.label ?? value;

    const show = (start = at) => {
        // Place the panel under the word's last line (a blank can wrap), inside
        // the sentence's box and never past the screen edge.
        const el = word.current;
        const box = el?.closest("p")?.getBoundingClientRect();
        const lines = el?.getClientRects();
        if (el && box && lines?.length) {
            const last = lines[lines.length - 1];
            const panel = Math.min(PANEL_W, window.innerWidth - 32);
            const room = Math.min(box.width, window.innerWidth - 16 - box.left) - panel;
            setPos({ top: last.bottom - box.top + 12, left: Math.max(0, Math.min(last.left - box.left, room)) });
        }
        setActive(start);
        setOpen(true);
    };
    const close = (refocus = true) => {
        setOpen(false);
        if (refocus) word.current?.focus();
    };
    const choose = (i: number) => {
        onChange(options[i].value);
        close();
    };
    useEffect(() => {
        if (open) list.current?.focus();
    }, [open]);

    return (
        <span
            className="inline"
            onBlur={(e) => {
                if (open && !e.currentTarget.contains(e.relatedTarget as Node)) close(false);
            }}
        >
            <span
                ref={word}
                role="button"
                tabIndex={0}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={`${id}-list`}
                aria-label={`${label}: ${shown}`}
                onClick={() => (open ? close() : show())}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
                        e.preventDefault();
                        show();
                    } else if (e.key === "ArrowUp") {
                        e.preventDefault();
                        show(Math.max(0, at - 1));
                    }
                }}
                className="cursor-pointer italic text-[var(--v2-oxblood)] underline decoration-[var(--v2-oxblood)] decoration-dashed decoration-[0.04em] underline-offset-[0.12em] outline-none hover:decoration-solid focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--v2-redline)]"
            >
                {shown}
                {"\u2060"}
                <span aria-hidden className="relative -top-[0.12em] ml-[0.08em] text-[0.42em] not-italic">
                    ▾
                </span>
            </span>

            <AnimatePresence>
                {open && (
                    <motion.span
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4, transition: { duration: 0.12 } }}
                        transition={{ duration: 0.18, ease: EASE }}
                        style={{ top: pos.top, left: pos.left }}
                        className="absolute z-30 block w-max min-w-[13rem] max-w-[min(18rem,calc(100vw-2rem))] border border-[var(--v2-redline)] bg-[#f7f3ec] p-1.5 text-left not-italic leading-normal tracking-normal shadow-[0_18px_30px_-20px_rgba(60,10,12,0.55)]"
                    >
                        <span id={`${id}-label`} className="v2-mono block border-b border-[var(--v2-rule)] px-2 pb-1.5 pt-1 text-[10px] text-[var(--v2-redline)]">
                            {label}
                        </span>
                        {/* Spans with listbox roles: the sentence is a <p>, which can't hold a <ul>. */}
                        <span
                            ref={list}
                            id={`${id}-list`}
                            role="listbox"
                            tabIndex={-1}
                            aria-labelledby={`${id}-label`}
                            aria-activedescendant={`${id}-opt-${active}`}
                            onKeyDown={(e) => {
                                const last = options.length - 1;
                                const move: Record<string, number> = { ArrowDown: Math.min(last, active + 1), ArrowUp: Math.max(0, active - 1), Home: 0, End: last };
                                if (e.key in move) {
                                    e.preventDefault();
                                    setActive(move[e.key]);
                                } else if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    choose(active);
                                } else if (e.key === "Escape") {
                                    e.preventDefault();
                                    close();
                                } else if (e.key === "Tab") {
                                    close(false);
                                }
                            }}
                            className="mt-1 block outline-none"
                        >
                            {options.map((o, i) => (
                                <span
                                    key={o.value}
                                    id={`${id}-opt-${i}`}
                                    role="option"
                                    aria-selected={i === at}
                                    onMouseDown={(e) => e.preventDefault()}
                                    onMouseEnter={() => setActive(i)}
                                    onClick={() => choose(i)}
                                    className={cn(
                                        "v2-display flex min-h-11 cursor-pointer items-center justify-between gap-4 px-2 text-[21px] leading-tight md:min-h-10",
                                        i === active ? "bg-[rgb(107_15_18/0.08)] text-[var(--v2-oxblood)]" : "text-[var(--v2-ink)]",
                                    )}
                                >
                                    <span className={i === at ? "italic" : ""}>{o.label}</span>
                                    {i === at && <span className="v2-mono text-[12px] text-[var(--v2-oxblood)]">✓</span>}
                                </span>
                            ))}
                        </span>
                    </motion.span>
                )}
            </AnimatePresence>
        </span>
    );
}

// A region of a larger screenshot, in % of the image.
const cropStyle = (c: { x: number; y: number; w: number; h: number }) => ({
    width: `${10000 / c.w}%`,
    left: `${(-100 * c.x) / c.w}%`,
    top: `${(-100 * c.y) / c.h}%`,
    height: "auto",
});

// The proof, as a print: the real work (or, with no screen to show, the
// result alone), the result stamped across it, and where it comes from.
function ProofPrint({ p }: { p: Stuck }) {
    const img = "image" in p ? p.image : undefined;
    return (
        <figure className="relative bg-[#f7f3ec] p-2.5 pb-0 shadow-[0_30px_50px_-30px_rgba(60,10,12,0.6)]">
            {img ? (
                <span className="relative block overflow-hidden bg-[#1a1412]" style={{ aspectRatio: img.ratio }}>
                    {img.crop ? (
                        // A cut-out of a larger screenshot (in % of the image).
                        <Image
                            src={img.src}
                            alt={img.alt}
                            width={2458}
                            height={1720}
                            sizes="(min-width: 768px) 900px, 100vw"
                            className="absolute max-w-none"
                            style={cropStyle(img.crop)}
                        />
                    ) : (
                        <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 440px, 100vw" className="object-cover" style={{ objectPosition: img.position }} />
                    )}
                </span>
            ) : (
                <span className="grid aspect-[4/3] place-items-center border border-dashed border-[var(--v2-rule)]">
                    <span className="v2-display px-8 text-center text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight text-[var(--v2-ink)]">{p.what}</span>
                </span>
            )}
            <figcaption className="px-1 pb-3 pt-4">
                <span className="v2-mono block text-[11px] leading-snug text-[var(--v2-muted)]">{p.source}</span>
                <Link href={p.href} className="v2-mono v2-link mt-2 inline-block text-[12px]">
                    {p.link} →
                </Link>
            </figcaption>
            {/* the result, stamped across the print */}
            <span className="absolute -left-3 top-[42%] -rotate-[5deg] md:top-[58%] border-2 border-[var(--v2-oxblood)] bg-[#f7f3ec] px-3 py-1.5 shadow-[0_10px_20px_-14px_rgba(60,10,12,0.6)] md:-left-8">
                <span className="v2-display block text-[clamp(2rem,3.6vw,3rem)] leading-none text-[var(--v2-oxblood)]">{p.value}</span>
                <span className="v2-mono mt-1 block text-[10px] uppercase tracking-[0.06em] text-[var(--v2-oxblood)]">{p.what}</span>
            </span>
        </figure>
    );
}

export function SentenceHero() {
    const [building, setBuilding] = useState<string>(S.building[0]);
    const [who, setWho] = useState<string>(S.who[0]);
    const [stuckId, setStuckId] = useState<string>(S.stuck[0].id);
    const stuck = S.stuck.find((s) => s.id === stuckId) ?? S.stuck[0];
    const reduce = useReducedMotionSafe();

    const sentence = `${S.pre} ${building} ${S.mid} ${who}, ${S.post} ${stuck.label}${S.end}`;
    const cal = resolveToken(CAL_LINK);
    const book = cal ? `${cal}?notes=${encodeURIComponent(sentence)}` : null;
    const mail = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(w.cta.emailSubject)}&body=${encodeURIComponent(sentence)}`;
    const opts = (xs: readonly string[]) => xs.map((x) => ({ value: x, label: x }));

    return (
        <section aria-labelledby="v2-wwm" className={cn(GRID, "items-start gap-y-12 md:gap-y-10")}>
            {/* A: the sentence. On phones the proof follows it directly, so an
                answer visibly changes something; on desktop it sits beside. */}
            <div className="col-span-4 md:col-span-7 md:col-start-1 md:row-start-1 lg:col-start-2">
                {/* The h1 is what the page is; the sentence below is the founder's
                    (its selects carry every option, so it can't be the heading). */}
                <h1 id="v2-wwm" className="v2-mono text-[12px] text-[var(--v2-muted)]">
                    {w.eyebrow}
                </h1>
                <Spec name="display / sentence" type className="v2-display mt-6 text-[clamp(2.6rem,5.6vw,5.4rem)] leading-[1.08] tracking-[-0.015em] text-[var(--v2-ink)]">
                    {/* relative: the answer panels are placed against the sentence's box. */}
                    <p className="relative">
                        {S.pre} <Blank id="wwm-building" label={S.labels.building} value={building} options={opts(S.building)} onChange={setBuilding} /> {S.mid}{" "}
                        <Blank id="wwm-who" label={S.labels.who} value={who} options={opts(S.who)} onChange={setWho} />, {S.post}{" "}
                        <Blank id="wwm-stuck" label={S.labels.stuck} value={stuckId} options={S.stuck.map((s) => ({ value: s.id, label: s.label }))} onChange={setStuckId} />
                        {S.end}
                    </p>
                </Spec>
                <p className="mt-3 flex items-end gap-1.5 text-[var(--v2-oxblood)]">
                    <HandArrow direction="up" className="h-9 w-9" />
                    <span className="-rotate-1 pb-0.5 text-[22px] leading-none" style={CAVEAT}>
                        {S.hint}
                    </span>
                </p>

            </div>

            {/* The proof for the chosen answer, dealt onto the desk. */}
            <div className="col-span-4 md:col-span-5 md:col-start-8 md:row-span-2 md:row-start-1 md:pt-24 lg:col-span-4 lg:col-start-9" aria-live="polite">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                        key={stuck.id}
                        initial={reduce ? { opacity: 0 } : { opacity: 0, x: 60, y: -20, rotate: 8 }}
                        animate={{ opacity: 1, x: 0, y: 0, rotate: reduce ? 0 : 2 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, x: -40, y: 30, rotate: -6, transition: { duration: 0.3 } }}
                        transition={{ duration: reduce ? 0.25 : 0.6, ease: EASE }}
                        className="mx-auto max-w-[440px]"
                    >
                        <ProofPrint p={stuck} />
                    </motion.div>
                </AnimatePresence>
            </div>
            {/* C: what you get, and the ask. */}
            <div className="col-span-4 md:col-span-7 md:col-start-1 md:row-start-2 lg:col-start-2">
                <Spec as="p" name="body / lead" type className="max-w-[44ch] text-[19px] leading-[1.5] text-[var(--v2-ink)] md:text-[21px]">
                    {w.body}
                </Spec>

                <div className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3">
                    {book && (
                        <a href={book} target="_blank" rel="noopener noreferrer" className="group v2-display text-[clamp(2.6rem,5vw,4.5rem)] italic leading-none text-[var(--v2-oxblood)]">
                            {w.cta.book}{" "}
                            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                                →
                            </span>
                        </a>
                    )}
                    <a href={mail} className="v2-mono v2-link text-[13px]">
                        {w.cta.email}
                    </a>
                </div>
                <p className="v2-mono mt-4 text-[11px] text-[var(--v2-muted)]">
                    {S.note} · {w.availability}
                </p>
            </div>

        </section>
    );
}
