"use client";

// The site's one hand-drawn arrow, in the homepage note's hand (hero.tsx):
// a thin stroke that leaves in one direction and sweeps into its target,
// with an open chevron head. The head is worked out from the end of the
// curve, so its two barbs always sit evenly either side of the line,
// whichever way the arrow points. It draws itself once, when it comes into
// view: shaft first, then the head. Reduced motion: it's simply there.

import { motion } from "motion/react";

import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import { cn } from "@/lib/utils";

type P = [number, number];
type Curve = { start: P; c1: P; c2: P; end: P };

// Each points toward its named direction at the tip, arriving on a curve.
// 40×40 box, drawn in the note's proportions.
const CURVES: Record<"down" | "up" | "right" | "left", Curve> = {
    down: { start: [11, 3], c1: [6, 15], c2: [9, 27], end: [24, 35] },
    // leaves from beside the words, curls up toward what's above
    up: { start: [36, 33], c1: [16, 36], c2: [8, 25], end: [11, 5] },
    right: { start: [7, 4], c1: [5, 17], c2: [12, 26], end: [35, 27] },
    left: { start: [33, 4], c1: [35, 17], c2: [28, 26], end: [5, 27] },
};

const HEAD = 7.5; // barb length
const SPREAD = (32 * Math.PI) / 180; // each barb's angle off the line

function head({ c2, end }: Curve) {
    // Direction the line travels into the tip, reversed: barbs point back.
    const back = Math.atan2(c2[1] - end[1], c2[0] - end[0]);
    const barb = (a: number): P => [end[0] + HEAD * Math.cos(a), end[1] + HEAD * Math.sin(a)];
    const [a, b] = [barb(back + SPREAD), barb(back - SPREAD)];
    const f = (n: number) => n.toFixed(2);
    return `M ${f(a[0])} ${f(a[1])} L ${end[0]} ${end[1]} L ${f(b[0])} ${f(b[1])}`;
}

export function HandArrow({ direction = "down", className }: { direction?: keyof typeof CURVES; className?: string }) {
    const reduce = useReducedMotionSafe();
    const c = CURVES[direction];
    const shaft = `M ${c.start.join(" ")} C ${c.c1.join(" ")} ${c.c2.join(" ")} ${c.end.join(" ")}`;
    const draw = (delay: number, duration: number) =>
        reduce
            ? {}
            : {
                  initial: { pathLength: 0 },
                  whileInView: { pathLength: 1 },
                  viewport: { once: true, margin: "0px 0px -10% 0px" },
                  transition: { duration, delay, ease: [0.45, 0, 0.55, 1] as const },
              };
    return (
        <svg
            aria-hidden
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("inline-block h-9 w-9 shrink-0 overflow-visible", className)}
        >
            <motion.path d={shaft} vectorEffect="non-scaling-stroke" {...draw(0, 0.45)} />
            <motion.path d={head(c)} vectorEffect="non-scaling-stroke" {...draw(0.4, 0.18)} />
        </svg>
    );
}
