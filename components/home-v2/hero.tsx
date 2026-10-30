"use client";

import Link from "next/link";

import { homeV2Data } from "@/data/home-v2-data";

import { useIsDesktop } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

import { Desk, TidyButton } from "./desk";
import { GRID } from "./grid";
import { CountUp } from "./motion";
import { Signature, useSignIntro } from "./signature";
import { Spec } from "./spec-mode";

const { hero, proof } = homeV2Data;

// The note's arrow: a hook that leaves the role line, bends down and lands on
// the note. The shaft is drawn first, then the head in one stroke.
const NOTE_SHAFT = "M 6 2 C 4 13 9 20 29 21";
const NOTE_HEAD = "M 22 15.5 L 30 21 L 22.5 27";

// Type guides for the "spec" step between the sketch and the set name, at
// Instrument Serif's measured cap height, x-height and baseline (in em, from
// the top of a line at leading 0.8).
const GUIDES = [
    { at: "0.016em", label: "cap height" },
    { at: "0.226em", label: "x-height" },
    { at: "0.736em", label: "baseline" },
];

// One line of the name: the set type, with the handwritten version of the same
// word lying where it will land (signature.tsx). The type is real text from
// the server; the signature and the guides are decoration on top.
function NameLine({ text, word, line, className }: { text: string; word: "neha" | "chhillar"; line: number; className?: string }) {
    return (
        <span className={cn("relative block whitespace-nowrap", className)}>
            <span aria-hidden className="v2-guides pointer-events-none absolute inset-0" style={{ "--line": line } as React.CSSProperties}>
                {/* The second line's cap height would crowd the first line's baseline. */}
                {GUIDES.map((g, i) => (line && i === 0 ? null : (
                    <span key={g.label} className="v2-guide absolute inset-x-0 h-px" style={{ top: g.at, "--g": i } as React.CSSProperties}>
                        {/* Labelled once, on the first line, in the empty space left of the letters. */}
                        {!line && (
                            <span className={cn("v2-mono absolute left-0 text-[11px] leading-none tracking-tight", i === 2 ? "top-1.5" : "bottom-1")}>
                                {g.label}
                            </span>
                        )}
                    </span>
                )))}
            </span>
            <span className="v2-set block" style={{ "--line": line } as React.CSSProperties}>
                {text}
            </span>
            <Signature
                word={word}
                variant="hero"
                // "neha" is about 40% of the ink; a short pen lift, then "chhillar".
                from={line ? 0.44 : 0}
                span={line ? 0.56 : 0.4}
                className={cn("pointer-events-none absolute bottom-[0.02em] h-[0.78em] w-auto", line ? "left-[0.62em]" : "left-0")}
            />
        </span>
    );
}

// The hero is the desk. On desktop it fills the first screen: the name top
// left, the pieces scattered over the paper, the role line bottom left with
// "tidy up". On phones the desk becomes its own block between the name and
// the role line, so nothing overlaps and the page still scrolls freely.
// overflow-x-clip stops a piece thrown at the edge from causing sideways
// scroll (clip, not hidden, so nothing becomes a scroll container).
export function Hero() {
    const desktop = useIsDesktop();
    useSignIntro();
    return (
        <section
            aria-labelledby="v2-name"
            className="relative overflow-x-clip md:h-[calc(100svh-4.5rem)] md:max-h-[980px] md:min-h-[640px]"
        >
            <div className={`${GRID} relative z-10 pt-6 md:pt-10`}>
                {/* The type styles sit on the Spec wrapper (the h1 inherits them),
                    so redlines read the name's real font spec. */}
                <Spec
                    name="display / name"
                    type
                    className="v2-display col-span-4 text-[clamp(4.25rem,15vw,15rem)] leading-[0.8] tracking-[-0.03em] text-[var(--v2-oxblood)] md:col-span-9"
                >
                    <h1 id="v2-name">
                        {/* Each line is signed first, then set over its own signature. */}
                        <NameLine text={hero.first} word="neha" line={0} />{" "}
                        <NameLine text={hero.last} word="chhillar" line={1} className="pl-[0.62em] italic" />
                    </h1>
                </Spec>
            </div>

            {/* The desk needs a pointer and room to play: desktop only. Phones get
                the swipe deck below the hero instead (mobile-deck.tsx). Mounted
                only on desktop, so phones never load or tab through it. */}
            {desktop && (
                <div className="pointer-events-none absolute inset-0 z-20 hidden md:block">
                    <Desk className="absolute inset-0" />
                </div>
            )}

            <div className={`${GRID} relative z-10 mt-6 md:absolute md:inset-x-0 md:bottom-10 md:mt-0`}>
                <div className="col-span-4 md:col-span-5">
                    <Spec as="p" name="body / line" type className="text-[22px] leading-[1.25] tracking-[-0.01em] md:text-[28px]">
                        {hero.line}
                    </Spec>
                    {/* Desktop only: on a phone the deck right below already shows the proof. */}
                    <div className="mt-2 hidden items-start gap-1.5 text-[var(--v2-oxblood)] md:flex">
                        {/* Drawn on the note's own CSS clock, so the arrow lands just before the note writes. */}
                        <svg
                            aria-hidden
                            viewBox="0 0 34 30"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="-mt-2 h-[30px] w-[34px] shrink-0"
                        >
                            <path d={NOTE_SHAFT} pathLength={1} className="v2-write-arrow" />
                            <path
                                d={NOTE_HEAD}
                                pathLength={1}
                                className="v2-write-arrow"
                                style={{ "--wait": "0.4s", "--len": "0.18s" } as React.CSSProperties}
                            />
                        </svg>
                        <Spec
                            as="p"
                            name="annotation"
                            type
                            className="v2-write max-w-[30ch] -rotate-1 text-[21px] leading-[1.1]"
                            style={{ fontFamily: "var(--font-caveat), cursive" }}
                        >
                            {hero.note}
                        </Spec>
                    </div>
                    <TidyButton className="mt-6 hidden md:inline-flex" />

                    {/* Phones: the whole pitch fits the first screen. */}
                    <div className="md:hidden">
                        <dl className="mt-6 grid grid-cols-[6.5rem_1fr] gap-y-2 text-[14px] leading-snug">
                            {[hero.currently, hero.previously].map((r) => (
                                <div key={r.label} className="contents">
                                    <dt className="v2-mono text-[12px] leading-[1.6] text-[var(--v2-muted)]">{r.label}</dt>
                                    <dd className="text-[var(--v2-ink)]">{r.text}</dd>
                                </div>
                            ))}
                        </dl>
                        <ProofNumbers className="mt-6" />
                        <a href="#v2-deck" className="v2-mono mt-8 inline-flex min-h-11 items-center gap-2 text-[14px] text-[var(--v2-oxblood)]">
                            <span className="v2-link">{hero.seeWork}</span>
                            <span aria-hidden>↓</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

// The bio and the proof, in one slim band between the desk and the work.
export function IntroBand() {
    return (
        // Desktop only: on phones "currently / previously" in the hero says it.
        <section aria-label="about" className={`${GRID} hidden items-end md:grid`}>
            <Spec as="p" name="body / bio" type className="col-span-4 max-w-[46ch] text-[15px] leading-[1.6] text-[var(--v2-muted)] md:col-span-5 md:col-start-2">
                <span className="text-[var(--v2-ink)]">{hero.bio.now}</span>{" "}
                {/* Phones: one short line. The full track record is desktop-only. */}
                <span className="md:hidden">{hero.bio.short}</span>
                <span className="hidden md:inline">
                    {hero.bio.before}{" "}
                    <Link href={hero.bio.linkHref} className="v2-link">
                        {hero.bio.linkText}
                    </Link>{" "}
                    {hero.bio.after}
                </span>
            </Spec>

            {/* On phones the proof already sits in the first screen. */}
            <ProofNumbers className="hidden md:col-span-5 md:col-start-8 md:mt-0 md:grid" />
        </section>
    );
}

function ProofNumbers({ className }: { className?: string }) {
    return (
        <Spec as="dl" name="proof" className={cn("col-span-4 grid grid-cols-3 gap-x-4 border-t border-[var(--v2-rule)] pt-4", className)}>
            {proof.map((p) => (
                <div key={p.label} className="flex flex-col-reverse justify-end gap-1">
                    <dt className="v2-mono text-[11px] leading-tight text-[var(--v2-muted)]">{p.label}</dt>
                    <dd className="v2-display text-[40px] leading-none text-[var(--v2-oxblood)] md:text-[56px]">
                        <CountUp value={p.value} prefix={p.prefix} suffix={p.suffix} />
                    </dd>
                </div>
            ))}
        </Spec>
    );
}
