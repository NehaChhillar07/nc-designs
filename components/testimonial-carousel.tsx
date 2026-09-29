"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { isUnreplaced, resolveToken } from "@/lib/placeholders";
import { testimonials, type Testimonial } from "@/data/testimonials-data";

// One testimonial at a time. The swap is a blur-crossfade: the outgoing card
// softens and drifts, the incoming one settles with a slight overshoot-free
// spring — both animate simultaneously (popLayout keeps the outgoing card in
// place, absolutely, so nothing jumps). Auto-advances, pauses while hovered
// or focused, and respects reduced motion via the site-wide MotionConfig.
//
// Token gating is unchanged: unreplaced quotes hide in production and render
// as stickered samples in dev, so this whole carousel disappears from the
// live site until real words exist.

const SWAP = {
    // Spring on the travel, quick tween on the fade — the slide reads as one
    // continuous motion with no bounce at the end.
    x: { type: "spring" as const, stiffness: 280, damping: 32, mass: 0.9 },
    opacity: { duration: 0.35 },
};
const AUTO_ADVANCE_MS = 6000;

function initials(name: string): string {
    return name
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? "")
        .join("");
}

function Avatar({ item }: { item: Testimonial }) {
    if (item.avatar) {
        return (
            <Image
                src={item.avatar}
                alt={item.name}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
            />
        );
    }
    // Initials fallback in the site's warm tint until a photo exists.
    return (
        <span
            aria-hidden="true"
            className="flex h-12 w-12 items-center justify-center rounded-full text-[15px] font-semibold"
            style={{ backgroundColor: "rgba(255, 152, 0, 0.16)", color: "#B45309" }}
        >
            {initials(item.name)}
        </span>
    );
}

function Slide({ item, square }: { item: Testimonial; square?: boolean }) {
    const resolved = resolveToken(item.token);
    if (!resolved) return null;
    const sample = isUnreplaced(resolved);

    let quote = item.sampleQuote;
    let name = item.name;
    let role = item.role;
    if (!sample) {
        if (resolved.includes("|")) {
            [quote, name, role] = resolved.split("|").map((s) => s.trim());
        } else {
            quote = resolved;
        }
    }

    return (
        <figure
            className={
                square
                    ? // Square card: quote up top, attribution pinned to the bottom.
                      "relative flex aspect-square flex-col rounded-2xl border border-gray-200 bg-gray-50 p-7 md:p-8"
                    : "relative rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8"
            }
        >
            {sample && (
                <span
                    className="absolute -top-3 left-6 inline-block px-3 py-1 rounded-full"
                    style={{
                        fontFamily: "var(--font-caveat), cursive",
                        fontSize: "15px",
                        transform: "rotate(-2deg)",
                        // deeper than the #FF9800 accent so white text clears 4.5:1
                        backgroundColor: "#B45309",
                        color: "#fff",
                    }}
                >
                    sample, replace with the real quote
                </span>
            )}
            <blockquote className="text-[17px] md:text-[19px] text-gray-800 leading-relaxed">
                &ldquo;{quote}&rdquo;
            </blockquote>
            <figcaption className={square ? "mt-auto flex items-center gap-3.5 pt-4" : "mt-6 flex items-center gap-3.5"}>
                <Avatar item={item} />
                <span className="text-sm text-gray-500">
                    <span className="block font-medium text-gray-900">{name}</span>
                    {role}
                </span>
            </figcaption>
        </figure>
    );
}

// Direction-aware slide variants: forward (+1) enters from the right and
// exits left; backward (-1) mirrors it. The x distance is a bit past the
// viewport so cards fully clear the frame while the fade finishes.
const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "104%" : "-104%", opacity: 0.6 }),
    center: { x: "0%", opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-104%" : "104%", opacity: 0.6 }),
};

export function TestimonialCarousel({ className, square }: { className?: string; square?: boolean }) {
    const visible = testimonials.filter((t) => resolveToken(t.token));
    // index + travel direction move together so the exit animation of the
    // outgoing card uses the same direction as the incoming one.
    const [[index, direction], setSlide] = useState<[number, number]>([0, 1]);
    const [paused, setPaused] = useState(false);
    const timer = useRef<ReturnType<typeof setInterval> | null>(null);

    const advance = useCallback(() => {
        setSlide(([i]) => [(i + 1) % visible.length, 1]);
    }, [visible.length]);

    const restartTimer = useCallback(() => {
        if (timer.current) clearInterval(timer.current);
        timer.current = setInterval(advance, AUTO_ADVANCE_MS);
    }, [advance]);

    useEffect(() => {
        if (paused || visible.length < 2) return;
        restartTimer();
        return () => {
            if (timer.current) clearInterval(timer.current);
        };
    }, [paused, visible.length, restartTimer]);

    // Manual selection also restarts the clock imperatively (not via effect
    // deps), so a click is never overridden moments later and the deps array
    // above keeps a constant size across renders and hot reloads.
    const select = useCallback(
        (i: number) => {
            setSlide(([cur]) => [i, i > cur ? 1 : -1]);
            if (!paused && visible.length > 1) restartTimer();
        },
        [paused, visible.length, restartTimer]
    );

    if (visible.length === 0) return null;
    const current = visible[index % visible.length];

    return (
        <div
            className={className}
            role="region"
            aria-roledescription="carousel"
            aria-label="Testimonials"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
        >
            {/* overflow-hidden is the carousel frame: cards slide fully out of
                it. Vertical padding keeps the sample sticker (which overhangs
                the card top) inside the clip. */}
            <div className="relative overflow-hidden px-1 pt-4 pb-1 -mx-1">
                <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                    <motion.div
                        key={current.token}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={SWAP}
                    >
                        <Slide item={current} square={square} />
                    </motion.div>
                </AnimatePresence>
            </div>

            {visible.length > 1 && (
                <div className="mt-3 md:mt-6 flex items-center justify-center md:gap-2.5">
                    {visible.map((t, i) => (
                        <button
                            key={t.token}
                            type="button"
                            aria-label={`Show testimonial from ${t.name}`}
                            aria-current={i === index}
                            onClick={() => select(i)}
                            className="group px-2.5 py-[19px] md:p-1.5 cursor-pointer"
                        >
                            <span
                                className="block h-1.5 rounded-full transition-all duration-500"
                                style={{
                                    width: i === index ? 24 : 6,
                                    backgroundColor:
                                        i === index ? "var(--accent-warm)" : "rgb(209 213 219)",
                                }}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
