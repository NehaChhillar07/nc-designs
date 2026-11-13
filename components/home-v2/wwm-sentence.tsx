"use client";

// The work-with-me hero: a sentence the founder finishes. "i'm building [ ]
// for [ ], and i'm stuck on [ ]." Each blank is a native select laid over
// the word it shows (keyboard, screen readers and phone pickers come free).
// The "stuck on" answer deals the matching proof onto the desk: a print of
// the real work, stamped with its result and its source. The finished
// sentence goes with the booking as its note, so the first call starts
// where the founder already is.
// Reduced motion: the print crossfades instead of being dealt.

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { v2Pages } from "@/data/v2-pages-data";
import { CAL_LINK, resolveToken } from "@/lib/placeholders";
import { CONTACT_EMAIL } from "@/lib/site";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import { cn } from "@/lib/utils";

import { GRID } from "./grid";
import { EASE } from "./motion";
import { Spec } from "./spec-mode";

const { workWithMe: w } = v2Pages;
const S = w.sentence;
type Stuck = (typeof S.stuck)[number];
const CAVEAT = { fontFamily: "var(--font-caveat), cursive" } as const;

// One blank: the chosen word, underlined, with a select stretched over it.
function Blank({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
    const shown = options.find((o) => o.value === value)?.label ?? value;
    return (
        <span className="relative inline">
            <select
                aria-label={label}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="peer absolute inset-0 z-10 w-full cursor-pointer appearance-none opacity-0"
            >
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
            <span
                aria-hidden
                className="italic text-[var(--v2-oxblood)] underline decoration-[var(--v2-oxblood)] decoration-dashed decoration-[0.04em] underline-offset-[0.12em] transition-colors peer-hover:decoration-solid peer-focus-visible:rounded-sm peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[var(--v2-redline)]"
            >
                {shown}
                {"\u2060"}
                <span className="relative -top-[0.12em] ml-[0.08em] text-[0.42em] not-italic">▾</span>
            </span>
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
                    <span className="v2-display px-8 text-center text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight text-[var(--v2-ink)]">{"card" in p ? p.card : p.what}</span>
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
                    <p>
                        {S.pre} <Blank label={S.labels.building} value={building} options={opts(S.building)} onChange={setBuilding} /> {S.mid}{" "}
                        <Blank label={S.labels.who} value={who} options={opts(S.who)} onChange={setWho} />, {S.post}{" "}
                        <Blank label={S.labels.stuck} value={stuckId} options={S.stuck.map((s) => ({ value: s.id, label: s.label }))} onChange={setStuckId} />
                        {S.end}
                    </p>
                </Spec>
                <p className="mt-5 -rotate-1 text-[22px] leading-none text-[var(--v2-oxblood)]" style={CAVEAT}>
                    <span aria-hidden>↑ </span>
                    {S.hint}
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
