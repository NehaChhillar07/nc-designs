"use client";

import Image from "next/image";
import { useEffect, useRef, type RefObject } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface ChoreographyImage {
    src: string;
    alt: string;
    /** CSS object-position for the crop, e.g. "center 30%". Defaults to center. */
    position?: string;
}

interface ScrollChoreographyProps {
    className?: string;
    images: {
        topLeft: ChoreographyImage;
        topRight: ChoreographyImage;
        /** Ends up front-most in the stack and expands to fill the page — cast an image whose subject survives a full-screen crop. */
        bottomLeft: ChoreographyImage;
        bottomRight: ChoreographyImage;
    };
}

// Plain (non-transform) style values are bound imperatively rather than via
// style={{ ... }}: motion's plain-value subscriptions can be lost during React
// dev double-mounts (the value freezes while transforms keep animating). A
// direct subscription with symmetric cleanup survives remounts.
function useBoundStyle<T extends string | number>(value: MotionValue<T>, ref: RefObject<HTMLDivElement | null>, property: string) {
    useEffect(() => {
        const apply = (v: T) => ref.current?.style.setProperty(property, String(v));
        apply(value.get());
        return value.on("change", apply);
    }, [value, ref, property]);
}

export function ScrollChoreography({ className, images }: ScrollChoreographyProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<HTMLDivElement>(null);
    const trRef = useRef<HTMLDivElement>(null);
    const blRef = useRef<HTMLDivElement>(null);
    const brRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const scrollSpring = useSpring(scrollYProgress, {
        stiffness: 400, // Higher stiffness for a slightly faster snap
        damping: 50, // Play with damping to add a little bounce/jerk
        mass: 1.2, // Adds a bit more weight to the movement
        restDelta: 0.001,
    });

    // Every frame transform reads from this one progress value. It is 0 on the
    // first render of both server and client, so the markup below is identical
    // on both — useReducedMotion() is false during SSR and true on the client
    // for a user with the OS setting on, so branching the rendered tree on it
    // is a hydration mismatch. Instead an effect decides what feeds this value:
    // the scroll spring normally, nothing at all under reduced motion, which
    // parks all four frames at their resting 2x2 grid.
    const smoothProgress = useMotionValue(0);

    useEffect(() => {
        if (prefersReducedMotion) {
            smoothProgress.set(0);
            return;
        }
        smoothProgress.set(scrollSpring.get());
        return scrollSpring.on("change", (value) => smoothProgress.set(value));
    }, [prefersReducedMotion, scrollSpring, smoothProgress]);

    // Square frames of 42vh with an exact 24px gutter: offsets are half the
    // square (21vh) plus half the gutter (12px). Every keyframe endpoint keeps
    // the same calc() template so motion interpolates the numbers inside it.
    const xLeft = "calc(-21vh + -12px)";
    const xRight = "calc(21vh + 12px)";
    const yTop = "calc(-21vh + -12px)";
    const yBottom = "calc(21vh + 12px)";
    const center = "calc(0vh + 0px)";

    // Phase 1: 0.06 - 0.3 (Diagonal movement, after a short hold on the resting grid)
    // Phase 2: 0.35 - 0.65 (Stack alignment to center; bottom images stack in front)
    // Phase 3: 0.7 - 0.9 (The front image — bottomLeft — expands to fill the page)

    // Top Left -> slides down behind Bottom Left, then to Center
    const tlX = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [xLeft, xLeft, xLeft, center, center]);
    const tlY = useTransform(smoothProgress, [0, 0.06, 0.3, 0.35, 0.65, 1], [yTop, yTop, yBottom, yBottom, center, center]);

    // Bottom Right -> slides up over Top Right, then to Center
    const brX = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [xRight, xRight, xRight, center, center]);
    const brY = useTransform(smoothProgress, [0, 0.06, 0.3, 0.35, 0.65, 1], [yBottom, yBottom, yTop, yTop, center, center]);

    // Bottom Left -> stays, then moves to Center — front-most, becomes the hero
    const blX = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [xLeft, xLeft, xLeft, center, center]);
    const blY = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [yBottom, yBottom, yBottom, center, center]);

    // Top Right -> stays, then moves to Center
    const trX = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [xRight, xRight, xRight, center, center]);
    const trY = useTransform(smoothProgress, [0, 0.3, 0.35, 0.65, 1], [yTop, yTop, yTop, center, center]);

    // The front image expands from its square to a large portrait card that
    // clears the fixed header (82vh, centered). The end size is locked to the
    // photo's own 3:4 ratio (61.5vh x 82vh) so object-cover lands on a zero-crop
    // full bleed — no letterbox bars, the whole photo, frame always filled.
    const heroWidth = useTransform(smoothProgress, [0.7, 0.9], ["calc(42vh + 0vw)", "calc(61.5vh + 0vw)"]);
    const heroHeight = useTransform(smoothProgress, [0.7, 0.9], ["42vh", "82vh"]);

    // The other three fade out underneath as the front image expands
    const underImagesOpacity = useTransform(smoothProgress, [0.75, 0.85], [1, 0]);

    useBoundStyle(underImagesOpacity, tlRef, "opacity");
    useBoundStyle(underImagesOpacity, trRef, "opacity");
    useBoundStyle(underImagesOpacity, brRef, "opacity");
    useBoundStyle(heroWidth, blRef, "width");
    useBoundStyle(heroHeight, blRef, "height");

    const baseImageClasses =
        "absolute left-1/2 top-1/2 w-[42vh] h-[42vh] overflow-hidden -translate-x-1/2 -translate-y-1/2 bg-muted shadow-2xl will-change-transform";

    // Bottom row stacks in front of the top row; bottomLeft is front-most and expands.
    const underFrames = [
        { image: images.topLeft, ref: tlRef, x: tlX, y: tlY, z: "z-10" },
        { image: images.topRight, ref: trRef, x: trX, y: trY, z: "z-20" },
        { image: images.bottomRight, ref: brRef, x: brX, y: brY, z: "z-30" },
    ];

    return (
        <div ref={containerRef} data-scroll-choreography className={cn("relative h-[300vh] w-full", className)}>
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">

                    {underFrames.map(({ image, ref, x, y, z }) => (
                        <motion.div
                            key={image.src}
                            ref={ref}
                            style={{ x, y }}
                            className={cn(baseImageClasses, z)}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="480px"
                                className="object-cover"
                                style={{ objectPosition: image.position ?? "center" }}
                            />
                        </motion.div>
                    ))}

                    {/* Bottom Left — front of the stack, expands to fill the page */}
                    <motion.div
                        ref={blRef}
                        style={{ x: blX, y: blY }}
                        className={cn(baseImageClasses, "z-40 origin-center")}
                    >
                        <Image
                            src={images.bottomLeft.src}
                            alt={images.bottomLeft.alt}
                            fill
                            sizes="100vw"
                            className="object-cover"
                            style={{ objectPosition: images.bottomLeft.position ?? "center" }}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default ScrollChoreography;
