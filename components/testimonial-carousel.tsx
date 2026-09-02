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
    duration: 0.65,
    ease: [0.22, 1, 0.36, 1] as const, // easeOutQuint-ish, the "expensive" glide
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

function Slide({ item }: { item: Testimonial }) {
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
        <figure className="relative rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8">
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
            <figcaption className="mt-6 flex items-center gap-3.5">
                <Avatar item={item} />
                <span className="text-sm text-gray-500">
                    <span className="block font-medium text-gray-900">{name}</span>
                    {role}
                </span>
            </figcaption>
        </figure>
    );
}

export function TestimonialCarousel({ className }: { className?: string }) {
    const visible = testimonials.filter((t) => resolveToken(t.token));
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const timer = useRef<ReturnType<typeof setInterval> | null>(null);

    const advance = useCallback(() => {
        setIndex((i) => (i + 1) % visible.length);
    }, [visible.length]);

    useEffect(() => {
        if (paused || visible.length < 2) return;
        // `index` in the deps on purpose: every change — including a manual
        // dot click — restarts the clock, so a selection is never overridden
        // moments after it was made.
        timer.current = setInterval(advance, AUTO_ADVANCE_MS);
        return () => {
            if (timer.current) clearInterval(timer.current);
        };
    }, [paused, advance, visible.length, index]);

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
            <div className="relative">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                        key={current.token}
                        initial={{ opacity: 0, y: 24, scale: 0.985, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -18, scale: 0.985, filter: "blur(6px)" }}
                        transition={SWAP}
                    >
                        <Slide item={current} />
                    </motion.div>
                </AnimatePresence>
            </div>

            {visible.length > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2.5">
                    {visible.map((t, i) => (
                        <button
                            key={t.token}
                            type="button"
                            aria-label={`Show testimonial from ${t.name}`}
                            aria-current={i === index}
                            onClick={() => setIndex(i)}
                            className="group p-1.5 cursor-pointer"
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
