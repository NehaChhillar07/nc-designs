"use client";

// The desk polaroid is a component with variants. Hover, focus or tap it and
// a Figma-style properties panel opens beside the inspect frame; pick a
// variant and the photo develops from a negative into a print, like a
// darkroom. Quiet on purpose: nothing shows until someone looks at the
// polaroid, and the work stays the loudest thing on the desk.
// Reduced motion: the photo simply crossfades. The "moving" variant plays a
// short clip, muted; under reduced motion it shows its still.

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { homeV2Data } from "@/data/home-v2-data";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import { cn } from "@/lib/utils";

import { EASE } from "./motion";

const { polaroid } = homeV2Data.desk;
export const VARIANTS = polaroid.variants;
export type Variant = (typeof VARIANTS)[number];

// The darkroom: a negative (inverted, grey, a touch soft) developing into a print.
const NEGATIVE = { opacity: 0.9, filter: "invert(1) grayscale(1) contrast(1.35) blur(1.5px)" };
const PRINT = { opacity: 1, filter: "invert(0) grayscale(0) contrast(1) blur(0px)" };

function Clip({ v }: { v: Variant & { video?: string } }) {
    const ref = useRef<HTMLVideoElement>(null);
    // Hydration-safe: it decides whether the clip plays at all.
    const still = useReducedMotionSafe();
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (still) el.pause();
        else el.play().catch(() => {});
    }, [still]);
    return (
        <video
            ref={ref}
            src={v.video}
            poster={v.src}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={v.alt}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: v.position }}
        />
    );
}

/** The photo inside the polaroid, developing on every change of variant. */
export function PolaroidPhoto({ index, developed }: { index: number; developed: boolean }) {
    const reduce = useReducedMotion();
    const v = VARIANTS[index] as Variant & { video?: string };

    return (
        <span className={cn("relative block aspect-[4/5] w-full overflow-hidden bg-[#1a1412] transition-[filter] duration-500", !developed && "grayscale")}>
            {/* initial={false}: the first photo is already a print (server
                render); every later one develops. */}
            <AnimatePresence initial={false}>
                <motion.span
                    key={v.id}
                    className="absolute inset-0"
                    initial={reduce ? { opacity: 0 } : NEGATIVE}
                    animate={PRINT}
                    exit={{ opacity: 0, transition: { duration: 0.3, delay: reduce ? 0 : 0.9 } }}
                    transition={{ duration: reduce ? 0.3 : 1.1, ease: EASE }}
                >
                    {v.video ? (
                        <Clip v={v} />
                    ) : (
                        <Image
                            src={v.src}
                            alt={v.alt}
                            fill
                            sizes="140px"
                            draggable={false}
                            className="pointer-events-none object-cover"
                            style={{ objectPosition: v.position }}
                        />
                    )}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

/** The properties panel, beside the inspect frame. A real radio group. */
export function PolaroidPanel({ index, onChange }: { index: number; onChange: (i: number) => void }) {
    const step = (d: number) => onChange((index + d + VARIANTS.length) % VARIANTS.length);
    return (
        <motion.span
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            // Clicks and keys stay in the panel: the piece underneath drags,
            // selects and nudges on the same events.
            onPointerDown={(e) => e.stopPropagation()}
            onPointerUp={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                    e.preventDefault();
                    step(1);
                } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    step(-1);
                }
            }}
            // The transparent right padding bridges the gap to the polaroid, so
            // moving the pointer across doesn't count as leaving it.
            className="pointer-events-auto absolute right-full top-[-8px] block cursor-default pr-[18px]"
        >
            <span className="block w-[176px] border border-[var(--v2-redline)] bg-[#f7f3ec] p-2.5 shadow-[0_18px_30px_-20px_rgba(60,10,12,0.55)]">
            <span className="v2-mono block border-b border-[var(--v2-rule)] pb-1.5 text-[10px] text-[var(--v2-redline)]">{polaroid.panelTitle}</span>
            <span id="polaroid-variant" className="v2-mono mt-2 block text-[10px] text-[var(--v2-muted)]">
                {polaroid.variantLabel}
            </span>
            <span role="radiogroup" aria-labelledby="polaroid-variant" className="mt-1 grid grid-cols-2 gap-1">
                {VARIANTS.map((v, i) => {
                    const on = i === index;
                    return (
                        <button
                            key={v.id}
                            type="button"
                            role="radio"
                            aria-checked={on}
                            tabIndex={on ? 0 : -1}
                            onClick={() => onChange(i)}
                            className={cn(
                                "v2-mono min-h-9 truncate border px-1.5 text-left text-[11px] transition-colors",
                                on ? "border-[var(--v2-oxblood)] bg-[var(--v2-oxblood)] text-[var(--v2-paper)]" : "border-[var(--v2-rule)] text-[var(--v2-ink)] hover:border-[var(--v2-oxblood)]",
                            )}
                        >
                            {v.label}
                        </button>
                    );
                })}
            </span>
            </span>
        </motion.span>
    );
}
