"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

// Per-segment blur-in reveal (from 21st.dev's portfolio-hero): each word or
// letter starts blurred, transparent, and offset, then settles in sequence.
//
// Two triggers, because above-fold and below-fold text want opposite things:
//   "mount" — pure CSS, runs off the server-rendered markup at first paint.
//             Nothing waits for React. Use for anything visible on landing.
//   "view"  — IntersectionObserver, fires when scrolled into view. The extra
//             latency is invisible here because the reader has to scroll first.

interface BlurTextProps {
    text: string;
    /** ms between each segment's reveal */
    delay?: number;
    animateBy?: "words" | "letters";
    direction?: "top" | "bottom";
    /** When the reveal starts. See the note above. */
    trigger?: "mount" | "view";
    className?: string;
    style?: CSSProperties;
}

export function BlurText({
    text,
    delay = 50,
    animateBy = "words",
    direction = "top",
    trigger = "view",
    className,
    style,
}: BlurTextProps) {
    const segments = useMemo(
        () => (animateBy === "words" ? text.split(" ") : text.split("")),
        [text, animateBy],
    );

    const suffix = (i: number) =>
        animateBy === "words" && i < segments.length - 1 ? " " : "";

    if (trigger === "mount") {
        const animationName =
            direction === "top" ? "blur-in-from-top" : "blur-in-from-bottom";

        return (
            <p className={cn("inline-flex flex-wrap", className)} style={style}>
                {segments.map((segment, i) => (
                    <span
                        key={i}
                        className="blur-text-segment"
                        style={{ animationName, animationDelay: `${i * delay}ms` }}
                    >
                        {segment}
                        {suffix(i)}
                    </span>
                ))}
            </p>
        );
    }

    return (
        <BlurTextOnView
            segments={segments}
            suffix={suffix}
            delay={delay}
            direction={direction}
            className={className}
            style={style}
        />
    );
}

function BlurTextOnView({
    segments,
    suffix,
    delay,
    direction,
    className,
    style,
}: {
    segments: string[];
    suffix: (i: number) => string;
    delay: number;
    direction: "top" | "bottom";
    className?: string;
    style?: CSSProperties;
}) {
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setInView(true);
            },
            { threshold: 0.1 },
        );
        observer.observe(el);
        return () => observer.unobserve(el);
    }, []);

    return (
        <p ref={ref} className={cn("inline-flex flex-wrap", className)} style={style}>
            {segments.map((segment, i) => (
                <span
                    key={i}
                    style={{
                        display: "inline-block",
                        filter: inView ? "blur(0px)" : "blur(10px)",
                        opacity: inView ? 1 : 0,
                        transform: inView
                            ? "translateY(0)"
                            : `translateY(${direction === "top" ? "-20px" : "20px"})`,
                        transition: `all 0.5s ease-out ${i * delay}ms`,
                    }}
                >
                    {segment}
                    {suffix(i)}
                </span>
            ))}
        </p>
    );
}
