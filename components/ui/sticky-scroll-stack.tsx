"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// Stacked-card scroll transition (from ui-layouts' sticky-hero-scroll): the
// first panel pins and recedes (scales down, tilts away) while the second
// slides up over it, arriving small and tilted and straightening as it lands.
// Plain scroll physics — no wheel hijacking. The animation spans exactly one
// viewport of scrolling (the second panel's entry), so the second panel can
// be any height.

interface StickyScrollStackProps {
    first: ReactNode;
    second: ReactNode;
}

export function StickyScrollStack({ first, second }: StickyScrollStackProps) {
    const secondRef = useRef<HTMLDivElement>(null);

    // 0 when the second panel's top enters the viewport bottom,
    // 1 when it reaches the viewport top.
    const { scrollYProgress } = useScroll({
        target: secondRef,
        offset: ["start end", "start start"],
    });

    const firstScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
    const firstRotate = useTransform(scrollYProgress, [0, 1], [0, -4]);

    // Only the first panel transforms. The second stays transform-free so
    // GSAP ScrollTrigger pinning inside it measures against clean viewport
    // coordinates (a transformed ancestor would warp its pin positions).
    // overflow-x-clip keeps the tilted hero corners from widening the page
    // but, unlike overflow-hidden, does not break position: sticky.
    return (
        <div className="relative overflow-x-clip">
            <motion.div
                style={{ scale: firstScale, rotate: firstRotate }}
                className="sticky top-0 h-screen"
            >
                {first}
            </motion.div>
            <div
                ref={secondRef}
                className="relative z-10 bg-white rounded-t-[32px] shadow-[0_-24px_60px_rgba(0,0,0,0.08)]"
            >
                {second}
            </div>
        </div>
    );
}
