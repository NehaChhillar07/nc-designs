"use client";

// The resume as a route. Each stop is one role, oldest first, and the work
// made there sits beside it as prints from the desk.
//
// Three depths, all transform-only and driven by the reader's scroll
// (no pinning, no scroll-jacking):
//   back   the stop's big ghost numeral, drifting slower than the page
//   page   the words and numbers, moving with the page
//   front  the prints, each at its own speed, so the stack opens as you pass
// The route line draws itself down the left edge, with a pen tip at the
// reading line. Reduced motion: no parallax, the line is drawn in full.

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

import { homeV2Data, type WorkRow } from "@/data/home-v2-data";
import { v2Pages, type JourneyStop } from "@/data/v2-pages-data";
import { cn } from "@/lib/utils";

import { Print } from "./desk";
import { GRID } from "./grid";
import { CountUp, EASE, Reveal } from "./motion";
import { Spec } from "./spec-mode";

const { resume } = v2Pages;
const rowsById = new Map(homeV2Data.work.rows.map((r) => [r.id, r]));

// Where each print rests in a stop's stack on desktop: position as % of the
// stack, resting tilt, and depth (how much faster than the page it moves).
const STACK = [
    { x: 0, y: 0, r: -4, depth: 0.9 },
    { x: 42, y: 16, r: 3, depth: 1.6 },
    { x: 12, y: 54, r: -1.5, depth: 1.2 },
];

export function Journey() {
    return (
        <section aria-label={resume.journeyLabel}>
            <ol>
                {resume.stops.map((stop, i) => (
                    <Stop key={stop.id} stop={stop} first={i === 0} />
                ))}
            </ol>
        </section>
    );
}

function Stop({ stop, first }: { stop: JourneyStop; first: boolean }) {
    const ref = useRef<HTMLLIElement>(null);
    const reduce = useReducedMotion();

    // Whole pass of the stop through the viewport, for parallax.
    const { scrollYProgress: pass } = useScroll({ target: ref, offset: ["start end", "end start"] });
    // The stop's top and bottom crossing the reading line, for the route.
    const { scrollYProgress: read } = useScroll({ target: ref, offset: ["start 62%", "end 62%"] });

    const amp = reduce ? 0 : 1;
    const markY = useTransform(pass, [0, 1], [-90 * amp, 140 * amp]);
    const drawn = useTransform(read, (v) => (reduce ? 1 : v));
    const tipY = useTransform(drawn, (v) => `${v * 100}%`);
    const tipOpacity = useTransform(read, [0, 0.01, 0.99, 1], [0, 1, 1, stop.current ? 1 : 0]);
    const reached = useTransform(read, [0, 0.01], [reduce ? 1 : 0, 1]);

    const prints = stop.work.map((id) => rowsById.get(id)).filter((r): r is WorkRow => !!r);

    return (
        <li ref={ref} className={cn(GRID, "relative pb-24 md:pb-40", first ? "pt-6 md:pt-10" : "pt-0")}>
            {/* back: the ghost numeral */}
            <motion.span
                aria-hidden
                style={{ y: markY }}
                className="v2-display pointer-events-none absolute right-4 top-0 -z-[1] select-none text-[clamp(7rem,24vw,22rem)] italic leading-[0.8] text-[rgb(107_15_18/0.075)] md:right-8"
            >
                {stop.mark}
            </motion.span>

            {/* the route: a dashed track, the drawn line, the stop's dot, the pen tip */}
            <div
                aria-hidden
                className={cn(
                    "v2-route absolute w-px",
                    // The route starts at the first stop and ends at the last.
                    first ? "top-[calc(1.5rem+12px)] md:top-[calc(2.5rem+12px)]" : "top-0",
                    stop.current ? "h-[12px]" : "bottom-0",
                )}
            >
                {!stop.current && <div className="absolute inset-0 border-l border-dashed border-[var(--v2-rule)]" />}
                {!stop.current && (
                    <motion.div className="absolute inset-0 origin-top bg-[var(--v2-oxblood)]" style={{ scaleY: drawn }} />
                )}
                <span
                    className={cn(
                        "absolute left-1/2 h-[11px] w-[11px] -translate-x-1/2 rounded-full border border-[var(--v2-oxblood)] bg-[var(--v2-paper)]",
                        first ? "-top-[6px]" : "top-[6px]",
                    )}
                >
                    <motion.span className="absolute inset-[2px] rounded-full bg-[var(--v2-oxblood)]" style={{ opacity: reached }} />
                </span>
                {stop.current ? (
                    <span className="v2-here absolute left-1/2 top-[6px] h-[11px] w-[11px] -translate-x-1/2 rounded-full" />
                ) : (
                    <motion.div className="absolute inset-0" style={{ y: tipY, opacity: reduce ? 0 : tipOpacity }}>
                        <span className="absolute left-1/2 top-0 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--v2-oxblood)] shadow-[0_0_0_4px_rgb(107_15_18/0.12)]" />
                    </motion.div>
                )}
            </div>

            {/* page: the words */}
            <div className="col-span-4 pl-8 md:col-span-5 md:col-start-3 md:pl-0">
                <Reveal>
                    <p className="v2-mono flex items-baseline gap-3 text-[12px] text-[var(--v2-muted)]">
                        <span>{stop.when}</span>
                        {stop.current && <span className="text-[var(--v2-oxblood)]">· {resume.hereLabel}</span>}
                    </p>
                    <Spec
                        as="h2"
                        name="display / stop"
                        type
                        className="v2-display mt-3 text-[44px] italic leading-[0.95] text-[var(--v2-oxblood)] md:text-[64px]"
                    >
                        {stop.role}
                    </Spec>
                    <p className="v2-mono mt-2 text-[12px] text-[var(--v2-ink)]">{stop.place}</p>
                </Reveal>
                <Reveal delay={0.08}>
                    <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.6] text-[var(--v2-ink)]">{stop.line}</p>
                </Reveal>
                {stop.stats.length > 0 && (
                    <Reveal delay={0.16}>
                        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5 border-t border-[var(--v2-rule)] pt-5">
                            {stop.stats.map((s) => (
                                <div key={s.label} className="flex flex-col-reverse">
                                    <dt className="v2-mono mt-1 text-[11px] text-[var(--v2-muted)]">{s.label}</dt>
                                    <dd className="v2-display text-[40px] leading-none text-[var(--v2-ink)]">
                                        <CountUp prefix={s.prefix} value={s.value} suffix={s.suffix} />
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </Reveal>
                )}
            </div>

            {/* front: the work made at this stop */}
            {prints.length > 0 && (
                <ul
                    className={cn(
                        "col-span-4 mt-10 grid grid-cols-2 gap-4 pl-8 md:relative md:col-span-4 md:col-start-8 md:mt-0 md:block md:pl-0",
                        prints.length > 2 ? "md:h-[600px]" : "md:h-[380px]",
                    )}
                >
                    {prints.map((row, i) => (
                        <StackedPrint key={row.id} row={row} slot={STACK[i % STACK.length]} pass={pass} reduce={!!reduce} />
                    ))}
                </ul>
            )}
        </li>
    );
}

function StackedPrint({
    row,
    slot,
    pass,
    reduce,
}: {
    row: WorkRow;
    slot: (typeof STACK)[number];
    pass: MotionValue<number>;
    reduce: boolean;
}) {
    const a = reduce ? 0 : 70 * slot.depth;
    const y = useTransform(pass, [0, 1], [a, -a]);

    return (
        <li
            // The print under the pointer (or keyboard focus) comes to the top of the stack.
            className="md:absolute md:left-[var(--x)] md:top-[var(--y)] md:w-[58%] md:hover:z-10 md:focus-within:z-10"
            style={{ "--x": `${slot.x}%`, "--y": `${slot.y}%` } as React.CSSProperties}
        >
            <motion.div style={{ y }}>
                <Link
                    href={row.href}
                    // relative: anchors the desktop hover tag.
                    aria-label={`${resume.readPrefix} ${row.name}, ${row.readingTime}`}
                    className="group relative block"
                >
                    <motion.span
                        className="block shadow-[0_18px_30px_-18px_rgba(60,10,12,0.55)]"
                        initial={false}
                        animate={{ rotate: slot.r }}
                        whileHover={{ rotate: 0, scale: 1.04, y: -6 }}
                        transition={{ duration: 0.5, ease: EASE }}
                    >
                        <Print row={row} />
                    </motion.span>
                    {/* On a phone the label sits under the print; in the desktop stack the prints
                        overlap, so it appears as a tag above the print on hover or focus. */}
                    <span className="v2-mono mt-2 block text-[11px] text-[var(--v2-muted)] transition-[opacity,color] duration-200 group-hover:text-[var(--v2-oxblood)] md:absolute md:-top-7 md:left-0 md:mt-0 md:bg-[var(--v2-oxblood)] md:px-1.5 md:py-0.5 md:text-[var(--v2-paper)] md:opacity-0 md:group-hover:text-[var(--v2-paper)] md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                        {resume.readPrefix} · {row.readingTime} →
                    </span>
                </Link>
            </motion.div>
        </li>
    );
}
