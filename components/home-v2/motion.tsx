"use client";

// Motion primitives for homepage 2.0. One easing curve and three durations
// for the whole page, so every movement feels like it came from one hand.
// Rules (design-system/neha-portfolio/pages/home-v2.md, "Motion"):
//   - motion answers something the reader did: arrival, pointer, hover, click
//   - transform and opacity only, never layout properties
//   - reduced motion: content arrives in place, pointer effects switch off

import {
    animate,
    motion,
    motionValue,
    useInView,
    useReducedMotion,
    useScroll,
    useSpring,
    type MotionValue,
} from "motion/react";
import {
    useEffect,
    useRef,
    useState,
    useSyncExternalStore,
    type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

export const EASE = [0.22, 1, 0.36, 1] as const;
export const DUR = { fast: 0.2, base: 0.6, slow: 0.9 } as const;
const SPRING = { stiffness: 260, damping: 22, mass: 0.5 };

// Pointer effects only make sense with a real mouse. Hydration-safe: false on
// the server and during hydration, the real value a tick later.
const FINE = "(hover: hover) and (pointer: fine)";
function subscribeFine(cb: () => void) {
    const mq = window.matchMedia(FINE);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
}
export function useFinePointer() {
    return useSyncExternalStore(
        subscribeFine,
        () => window.matchMedia(FINE).matches,
        () => false,
    );
}

// ---------- Reveal: content arrives as it scrolls into view ----------

// A fixed set of tags, so the component type never changes between renders.
const REVEAL_TAGS = { div: motion.div, li: motion.li, p: motion.p } as const;

type RevealProps = {
    as?: keyof typeof REVEAL_TAGS;
    delay?: number;
    className?: string;
    children: ReactNode;
};

export function Reveal({ as = "div", delay = 0, className, children }: RevealProps) {
    const Tag = REVEAL_TAGS[as];
    return (
        <Tag
            className={className}
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: DUR.base, ease: EASE, delay }}
        >
            {children}
        </Tag>
    );
}

// ---------- ProximityText: letters lean toward the cursor ----------
//
// The intro is CSS (blur-in keyframes per letter), so it runs from the server
// markup at first paint without waiting for React. The lift is a spring on an
// inner span, so the two transforms never fight.

function Letter({ char, lift, delayMs, direction }: { char: string; lift: MotionValue<number>; delayMs: number; direction: "top" | "bottom" }) {
    const y = useSpring(lift, SPRING);
    return (
        <span
            aria-hidden
            className="blur-text-segment"
            style={{
                animationName: direction === "top" ? "blur-in-from-top" : "blur-in-from-bottom",
                animationDuration: `${DUR.slow}s`,
                animationDelay: `${delayMs}ms`,
            }}
        >
            <motion.span className="inline-block will-change-transform" style={{ y }}>
                {char}
            </motion.span>
        </span>
    );
}

export function ProximityText({
    text,
    className,
    startDelay = 0,
    direction = "bottom",
    lifts,
}: {
    text: string;
    className?: string;
    startDelay?: number;
    direction?: "top" | "bottom";
    lifts: MotionValue<number>[];
}) {
    return (
        <span className={className}>
            {text.split("").map((char, i) => (
                <Letter key={i} char={char} lift={lifts[i]} delayMs={startDelay + i * 45} direction={direction} />
            ))}
        </span>
    );
}

// Drives the letters of several ProximityText lines from one listener.
// Each letter rises by up to `maxLift` of its own height, falling off with
// distance, so the name reacts like paper lifted by a fingertip.
export function useProximity(count: number, radius = 280, maxLift = 0.09) {
    // Stable motion values, created once per letter.
    const [pool] = useState(() => Array.from({ length: count }, () => motionValue(0)));
    const fine = useFinePointer();
    const reduce = useReducedMotion();
    const rootRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root || !fine || reduce) return;
        const letters = () => Array.from(root.querySelectorAll<HTMLElement>(".blur-text-segment > span"));
        let frame = 0;
        let px = 0;
        let py = 0;

        const update = () => {
            frame = 0;
            letters().forEach((el, i) => {
                const r = el.parentElement!.getBoundingClientRect();
                const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
                const t = Math.max(0, 1 - d / radius);
                pool[i]?.set(-t * t * r.height * maxLift);
            });
        };
        const onMove = (e: PointerEvent) => {
            px = e.clientX;
            py = e.clientY;
            if (!frame) frame = requestAnimationFrame(update);
        };
        const onLeave = () => pool.forEach((v) => v.set(0));

        root.addEventListener("pointermove", onMove);
        root.addEventListener("pointerleave", onLeave);
        return () => {
            cancelAnimationFrame(frame);
            root.removeEventListener("pointermove", onMove);
            root.removeEventListener("pointerleave", onLeave);
        };
    }, [fine, reduce, radius, maxLift, pool]);

    return { rootRef, lifts: pool };
}

// ---------- CountUp: numbers count to their value once, on arrival ----------

export function CountUp({ value, prefix = "", suffix = "", className }: { value: number; prefix?: string; suffix?: string; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
    const reduce = useReducedMotion();

    useEffect(() => {
        const el = ref.current;
        if (!el || !inView || reduce) return;
        const controls = animate(0, value, {
            duration: 1.4,
            ease: EASE,
            onUpdate: (v) => {
                el.textContent = `${prefix}${Math.round(v)}${suffix}`;
            },
        });
        return () => controls.stop();
    }, [inView, reduce, value, prefix, suffix]);

    // Server and no-JS render the final number; the count only replays it.
    return (
        <span ref={ref} className={cn("tabular-nums", className)}>
            {`${prefix}${value}${suffix}`}
        </span>
    );
}

// ---------- WaveText: letters ripple when the word is hovered ----------

export function WaveText({ text, className }: { text: string; className?: string }) {
    return (
        <motion.span className={cn("inline-block", className)} initial="rest" whileHover="hover">
            <span className="sr-only">{text}</span>
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    aria-hidden
                    className="inline-block whitespace-pre"
                    variants={{ rest: { y: 0 }, hover: { y: ["0em", "-0.12em", "0em"] } }}
                    transition={{ duration: 0.5, ease: EASE, delay: i * 0.035 }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
}

// ---------- Tilt: a frame that turns toward the cursor ----------

export function Tilt({ children, className, max = 7 }: { children: ReactNode; className?: string; max?: number }) {
    const fine = useFinePointer();
    const reduce = useReducedMotion();
    const rx = useSpring(0, SPRING);
    const ry = useSpring(0, SPRING);
    const on = fine && !reduce;

    return (
        <motion.div
            className={className}
            style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
            onPointerMove={(e) => {
                if (!on) return;
                const r = e.currentTarget.getBoundingClientRect();
                rx.set(-((e.clientY - r.top) / r.height - 0.5) * 2 * max);
                ry.set(((e.clientX - r.left) / r.width - 0.5) * 2 * max);
            }}
            onPointerLeave={() => {
                rx.set(0);
                ry.set(0);
            }}
        >
            {children}
        </motion.div>
    );
}

// ---------- ScrollProgress: a hairline that fills as you read ----------

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
    return (
        <motion.div
            aria-hidden
            className="fixed inset-x-0 top-0 z-40 h-[2px] origin-left bg-[var(--v2-oxblood)]"
            style={{ scaleX }}
        />
    );
}
