"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useIsDesktop } from "@/lib/use-media-query";

// Stacked-card scroll transition in the style of Aceternity's
// container-scroll-animation: the first panel pins and recedes (scales down)
// while the second rises over it tilted back in 3D (rotateX with its own
// perspective, pivoting at its top edge) and straightens flat as it lands.
// Plain scroll physics — no wheel hijacking. The animation spans exactly one
// viewport of scrolling (the second panel's entry), so the second panel can
// be any height.

interface StickyScrollStackProps {
    first: ReactNode;
    second: ReactNode;
}

export function StickyScrollStack({ first, second }: StickyScrollStackProps) {
    const secondRef = useRef<HTMLDivElement>(null);
    // Phones get plain scrolling: no pinned hero, no receding scale, no 3D
    // entry. On a small screen the effect cost a full screen of scroll and a
    // tilted panel for no new information.
    const stacked = useIsDesktop();

    // 0 when the second panel's top enters the viewport bottom,
    // 1 when it reaches the viewport top.
    const { scrollYProgress } = useScroll({
        target: secondRef,
        offset: ["start end", "start start"],
    });

    const firstScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

    // 3D entry for the second panel. Its GSAP-pinned content requires care: a
    // transformed ancestor breaks position:fixed pinning and warps trigger
    // measurement. So the transform string collapses to exactly "none" once
    // the panel lands (a lingering perspective() would still create a fixed
    // containing block), and the Work section zeroes it during ScrollTrigger's
    // refreshInit measurement pass via the data-scroll-panel hook. The tilt
    // pivots at the panel's top edge so only the entering viewport of the
    // (very tall) panel leans back — origin center would swing it wildly.
    // Enters at 92% width so the 3D trapezoid is visible inside the viewport
    // (full-bleed width would clip the flare at the screen edges), growing to
    // full-bleed as it straightens.
    const secondTransform = useTransform(scrollYProgress, (p) =>
        p > 0.995
            ? "none"
            : `perspective(1200px) rotateX(${((1 - p) * 20).toFixed(2)}deg) scale(${(
                  0.92 +
                  0.08 * p
              ).toFixed(4)})`
    );

    // overflow-x-clip keeps the scaled hero edges from widening the page
    // but, unlike overflow-hidden, does not break position: sticky.
    return (
        <div className="relative overflow-x-clip">
            <motion.div
                // Explicit resting values on a phone, not an absent style: Motion
                // leaves whatever it last wrote on the element, which kept the
                // panel frozen mid-tilt after hydration.
                style={stacked ? { scale: firstScale } : { scale: 1 }}
                className="md:sticky md:top-0 md:h-screen"
            >
                {first}
            </motion.div>
            <motion.div
                ref={secondRef}
                data-scroll-panel
                style={stacked ? { transform: secondTransform, transformOrigin: "top center" } : { transform: "none" }}
                className="relative z-10 bg-white md:rounded-t-[32px] md:shadow-[0_-24px_60px_rgba(0,0,0,0.08)]"
            >
                {second}
            </motion.div>
        </div>
    );
}
