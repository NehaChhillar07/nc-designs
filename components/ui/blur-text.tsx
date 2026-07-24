"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

// Per-segment blur-in reveal (from 21st.dev's portfolio-hero): each word or
// letter starts blurred, transparent, and offset, then settles in sequence
// once the element scrolls into view.

interface BlurTextProps {
    text: string;
    /** ms between each segment's reveal */
    delay?: number;
    animateBy?: "words" | "letters";
    direction?: "top" | "bottom";
    className?: string;
    style?: CSSProperties;
}

export function BlurText({
    text,
    delay = 50,
    animateBy = "words",
    direction = "top",
    className,
    style,
}: BlurTextProps) {
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

    const segments = useMemo(
        () => (animateBy === "words" ? text.split(" ") : text.split("")),
        [text, animateBy],
    );

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
                    {animateBy === "words" && i < segments.length - 1 ? " " : ""}
                </span>
            ))}
        </p>
    );
}
