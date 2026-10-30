"use client";

// Building blocks for v2 case studies. Same paper, ink and motion as the
// homepage (components/home-v2/), arranged for long-form reading.
// Rules: design-system/neha-portfolio/pages/case-study-v2.md

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, type ReactNode } from "react";

import { GRID } from "@/components/home-v2/grid";
import { DUR, EASE } from "@/components/home-v2/motion";
import { Spec } from "@/components/home-v2/spec-mode";
import type { Shot } from "@/data/v2-human-firewall-data";
import { cn } from "@/lib/utils";

export const CAVEAT = { fontFamily: "var(--font-caveat), cursive" } as const;
const PAPER = "#f7f3ec";

// ---------- chapter ----------

// One chapter: a numbered label in mono, a claim-heading in the display
// serif, then the content. Rendered on the server markup so a reader (or a
// crawler, or a screen reader) gets the whole argument without JS.
export function Chapter({
    id,
    n,
    label,
    children,
    className,
}: {
    id: string;
    n: string;
    label: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <section id={id} data-chapter={id} aria-labelledby={`${id}-h`} className={cn("scroll-mt-24", className)}>
            <div className={GRID}>
                <p className="v2-mono col-span-4 flex items-baseline gap-3 text-[12px] text-[var(--v2-muted)] md:col-span-8 lg:col-start-3">
                    <span className="text-[var(--v2-oxblood)]">{n}</span>
                    <span aria-hidden className="h-px w-8 translate-y-[-3px] bg-[var(--v2-rule)]" />
                    {label}
                </p>
            </div>
            {children}
        </section>
    );
}

// A claim-heading: plain words, the highlighted phrase in oxblood italic, and
// an optional quieter suffix (the live page's grey suffix).
export function ChapterHeading({
    id,
    before,
    highlight,
    after,
    suffix,
    className,
}: {
    id: string;
    before?: string;
    highlight?: string;
    after?: string;
    suffix?: string;
    className?: string;
}) {
    return (
        <div className={GRID}>
            <Spec
                as="h2"
                id={`${id}-h`}
                name="display / chapter"
                type
                className={cn(
                    "v2-display col-span-4 mt-5 text-[clamp(2.25rem,5.2vw,4.75rem)] leading-[1.02] tracking-[-0.015em] text-[var(--v2-ink)] md:col-span-10 lg:col-span-8 lg:col-start-3",
                    className,
                )}
            >
                {before}
                {highlight && (
                    <>
                        {before && " "}
                        <em className="italic text-[var(--v2-oxblood)]">{highlight}</em>
                    </>
                )}
                {after}
                {suffix && <span className="block text-[var(--v2-muted)]">{suffix}</span>}
            </Spec>
        </div>
    );
}

// Body copy column: Inter at a reading measure.
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div className={GRID}>
            <div
                className={cn(
                    "col-span-4 max-w-[64ch] space-y-5 text-[17px] leading-[1.75] text-[var(--v2-ink)] md:col-span-8 md:text-[18px] lg:col-span-6 lg:col-start-3",
                    className,
                )}
            >
                {children}
            </div>
        </div>
    );
}

// A pull quote in the display serif, set against the margin.
export function PullQuote({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div className={GRID}>
            <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                transition={{ duration: DUR.base, ease: EASE }}
                className={cn(
                    "v2-display col-span-4 border-l-2 border-[var(--v2-oxblood)] pl-5 text-[clamp(1.75rem,3.4vw,2.9rem)] italic leading-[1.12] text-[var(--v2-oxblood)] md:col-span-8 lg:col-span-7 lg:col-start-4",
                    className,
                )}
            >
                {children}
            </motion.p>
        </div>
    );
}

// ---------- prints ----------

// A screenshot as a print on the desk: cream border, a mono caption on the
// bottom edge, an optional rubber stamp, a resting tilt, and a little depth
// (it drifts against the scroll, a few pixels, like Robin Noguier's layers).
export function PrintFigure({
    shot,
    tilt = 0,
    depth = 0.5,
    sizes = "(min-width: 1024px) 70vw, 100vw",
    priority,
    className,
}: {
    shot: Shot;
    tilt?: number;
    depth?: number;
    sizes?: string;
    priority?: boolean;
    className?: string;
}) {
    const ref = useRef<HTMLElement>(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [36 * depth, -36 * depth]);

    return (
        <motion.figure
            ref={ref}
            style={{ y: reduce ? 0 : y, rotate: tilt }}
            className={cn("relative block", className)}
        >
            <div className="p-[1.4%] pb-0 shadow-[0_30px_50px_-32px_rgba(60,10,12,0.55)]" style={{ background: PAPER }}>
                <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.w}
                    height={shot.h}
                    sizes={sizes}
                    priority={priority}
                    className="block h-auto w-full"
                />
                <figcaption className="v2-mono flex min-h-9 items-center justify-between gap-3 px-1 py-2 text-[11px] text-[var(--v2-ink)] md:text-[12px]">
                    <span className="truncate">{shot.bar.toLowerCase()}</span>
                </figcaption>
            </div>
            {shot.stamp && <Stamp className="absolute -top-3 right-4 md:right-6">{shot.stamp}</Stamp>}
        </motion.figure>
    );
}

export function Stamp({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <span
            className={cn(
                "v2-mono inline-block rotate-[4deg] border border-[var(--v2-oxblood)] bg-[#f7f3ec] px-2 py-0.5 text-[11px] uppercase tracking-[0.06em] text-[var(--v2-oxblood)]",
                className,
            )}
        >
            {children}
        </span>
    );
}

// ---------- notes ----------

// A handwritten note in the margin, like an annotated book. Beside the text
// on desktop; inline with a red rule on phones.
export function MarginNote({ label, children, className }: { label?: string; children: ReactNode; className?: string }) {
    return (
        <aside className={cn("border-l-2 border-[var(--v2-oxblood)] pl-4 lg:border-l-0 lg:pl-0", className)}>
            {label && <p className="v2-mono mb-2 text-[11px] text-[var(--v2-muted)]">{label}</p>}
            <div className="text-[19px] leading-[1.25] text-[var(--v2-oxblood)] md:text-[21px]" style={CAVEAT}>
                {children}
            </div>
        </aside>
    );
}

// A quote on a taped note: the paper and oxblood tape of the homepage.
export function TapedNote({
    children,
    attribution,
    tilt = -1.5,
    className,
}: {
    children: ReactNode;
    attribution?: string;
    tilt?: number;
    className?: string;
}) {
    return (
        <motion.figure
            initial={{ opacity: 0, y: 18, rotate: tilt * 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: tilt }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: DUR.base, ease: EASE }}
            className={cn("relative block bg-[#ead3c2] px-6 pb-6 pt-8 shadow-[0_22px_36px_-26px_rgba(60,10,12,0.6)]", className)}
        >
            <span aria-hidden className="absolute -top-2.5 left-1/2 h-5 w-20 -translate-x-1/2 -rotate-2 bg-[var(--v2-oxblood)] opacity-90" />
            <blockquote className="v2-display text-[22px] leading-[1.25] text-[var(--v2-ink)] md:text-[26px]">{children}</blockquote>
            {attribution && <figcaption className="v2-mono mt-4 text-[11px] leading-snug text-[rgb(26_20_20/0.62)]">{attribution}</figcaption>}
        </motion.figure>
    );
}

// ---------- drawn marks ----------

// A list whose items get struck through by an oxblood line as it arrives.
export function StrikeList({ items, className }: { items: string[]; className?: string }) {
    return (
        <ul className={cn("space-y-3", className)}>
            {items.map((item, i) => (
                <li key={item} className="relative w-fit text-[17px] text-[var(--v2-muted)]">
                    {item}
                    <motion.span
                        aria-hidden
                        className="absolute inset-x-[-4px] top-1/2 h-[2px] origin-left bg-[var(--v2-oxblood)]"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                        transition={{ duration: 0.55, ease: EASE, delay: 0.25 + i * 0.18 }}
                    />
                </li>
            ))}
        </ul>
    );
}

// A horizontal (or, on phones, vertical) chain of labels joined by a line that
// draws itself: Organization → Department → Group → User, and the like.
export function DrawnRoute({ steps, className }: { steps: string[]; className?: string }) {
    return (
        <ol className={cn("flex flex-col gap-3 md:flex-row md:items-center md:gap-0", className)}>
            {steps.map((s, i) => (
                <li key={s} className="flex items-center md:flex-1 md:last:flex-none">
                    <motion.span
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: DUR.fast * 2, ease: EASE, delay: i * 0.22 }}
                        className="v2-mono shrink-0 border border-[var(--v2-rule)] bg-[#f7f3ec] px-3 py-1.5 text-[13px] text-[var(--v2-ink)]"
                    >
                        {s}
                    </motion.span>
                    {i < steps.length - 1 && (
                        <motion.span
                            aria-hidden
                            className="mx-3 hidden h-px flex-1 origin-left bg-[var(--v2-oxblood)] md:block"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.22 }}
                        />
                    )}
                </li>
            ))}
        </ol>
    );
}
