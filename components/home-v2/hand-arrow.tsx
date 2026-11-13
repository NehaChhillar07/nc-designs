"use client";

// The site's one hand-drawn arrow, in the homepage note's hand (hero.tsx):
// a thin stroke that leaves in one direction and sweeps into its target,
// with an open chevron head aimed along the last stretch of the line, so
// its two barbs sit evenly either side of it, whichever way it points. It draws itself once, when it comes into
// view: shaft first, then the head. Reduced motion: it's simply there.

import { motion } from "motion/react";

import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import { cn } from "@/lib/utils";

type P = [number, number];
type Curve = { start: P; c1: P; c2: P; end: P };

// Each points toward its named direction at the tip, arriving on a curve.
// 40×40 box, drawn in the note's proportions.
const CURVES: Record<"down" | "up" | "right" | "left", Curve> = {
    // drops from beside the words, easing right into what's below
    down: { start: [12, 3], c1: [8, 14], c2: [11, 26], end: [22, 36] },
    // leaves from beside the words, curls up toward what's above
    up: { start: [36, 33], c1: [18, 35], c2: [9, 26], end: [10, 6] },
    right: { start: [6, 5], c1: [5, 18], c2: [14, 25], end: [35, 26] },
    left: { start: [34, 5], c1: [35, 18], c2: [26, 25], end: [5, 26] },
};

const HEAD = 7; // barb length
const SPREAD = (34 * Math.PI) / 180; // each barb's angle off the line

// A point on the curve, 0 (start) to 1 (tip).
function at({ start, c1, c2, end }: Curve, t: number): P {
    const u = 1 - t;
    const f = (i: 0 | 1) => u * u * u * start[i] + 3 * u * u * t * c1[i] + 3 * u * t * t * c2[i] + t * t * t * end[i];
    return [f(0), f(1)];
}

function head(c: Curve) {
    // Aim the head along the last stretch of line the eye actually sees (the
    // chord into the tip), not the last control point: a curve that bends
    // near its end would otherwise get one barb flat and one hidden.
    const from = at(c, 0.8);
    const back = Math.atan2(from[1] - c.end[1], from[0] - c.end[0]);
    const barb = (a: number): P => [c.end[0] + HEAD * Math.cos(a), c.end[1] + HEAD * Math.sin(a)];
    const [a, b] = [barb(back + SPREAD), barb(back - SPREAD)];
    const f = (n: number) => n.toFixed(2);
    return `M ${f(a[0])} ${f(a[1])} L ${c.end[0]} ${c.end[1]} L ${f(b[0])} ${f(b[1])}`;
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
