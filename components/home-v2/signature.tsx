"use client";

import { useEffect, useId, useLayoutEffect, useRef } from "react";
import { useInView } from "motion/react";

import { cn } from "@/lib/utils";

import { SIGN_FLAG } from "./greeting-script";
import { SIGNATURE } from "./signature-paths";

// Neha's name, handwritten. Each letter is uncovered by its own strip, one
// after another at a pen's pace (timings in signature-paths.ts, motion in
// home-v2.css under "signature → type"). Two uses:
// - hero: written from first paint, after the greeting, then it fades as the
//   set type inks in over it. Sketch first, then the shipped thing.
// - signoff: the author signs the end of a case study, once, as it arrives.
// Decorative: the real name is always the text beside it.

const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

// Decides once per mount of the hero whether the signing plays. Same rules as
// the greeting: the inline script leaves a flag when it should. No flag means
// a repeat visit or a client-side navigation, so the name is simply set. A
// click or key skips the rest. Called by the hero, not by each signature,
// because the name has one signature per line and the flag is read once.
export function useSignIntro() {
    // Dev Strict Mode runs effects twice; the ref survives that.
    const checked = useRef(false);
    useBeforePaint(() => {
        const d = document.documentElement;
        if (!checked.current) {
            checked.current = true;
            const w = window as unknown as Record<string, unknown>;
            if (!w[SIGN_FLAG]) d.setAttribute("data-v2-sign", "skip");
            delete w[SIGN_FLAG];
        }
        const skip = () => d.setAttribute("data-v2-sign", "skip");
        window.addEventListener("pointerdown", skip, { once: true });
        window.addEventListener("keydown", skip, { once: true });
        return () => {
            window.removeEventListener("pointerdown", skip);
            window.removeEventListener("keydown", skip);
        };
    }, []);
}

export function Signature({
    word,
    variant,
    from = 0,
    span = 1,
    className,
}: {
    word: keyof typeof SIGNATURE;
    variant: "hero" | "signoff";
    // When a name is split over lines, each line gets its slice of the
    // writing time, so the pen finishes one word before starting the next.
    from?: number;
    span?: number;
    className?: string;
}) {
    const sig = SIGNATURE[word];
    // url(#id) needs a plain id: React's ids carry punctuation.
    const id = `sig${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
    const ref = useRef<SVGSVGElement>(null);
    const seen = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

    return (
        <svg
            ref={ref}
            aria-hidden
            viewBox={sig.viewBox}
            overflow="visible"
            fill="currentColor"
            data-variant={variant}
            data-play={variant === "hero" || seen ? "" : undefined}
            className={cn("v2-sign", className)}
            style={{ "--from": from, "--span": span } as React.CSSProperties}
        >
            <defs>
                {/* The strip's leading edge is soft, so ink appears to flow in
                    behind the pen instead of being wiped on. The strip is a
                    quarter wider than its letter, so once it has fully opened
                    the soft edge sits past the letter. */}
                <linearGradient id={`${id}-nib`}>
                    <stop offset="0.8" stopColor="#fff" />
                    <stop offset="1" stopColor="#000" />
                </linearGradient>
                {sig.glyphs.map((g, i) => (
                    <mask key={i} id={`${id}-${i}`} maskUnits="userSpaceOnUse" x={g.x - 50} y={-400} width={g.w * 1.25 + 100} height={800}>
                        <rect
                            className="v2-sign-pen"
                            x={g.x}
                            y={-200}
                            width={g.w * 1.25}
                            height={400}
                            fill={`url(#${id}-nib)`}
                            style={{ "--at": g.at, "--dur": g.dur } as React.CSSProperties}
                        />
                    </mask>
                ))}
            </defs>
            {sig.glyphs.map((g, i) => (
                <path key={i} d={g.d} mask={`url(#${id}-${i})`} />
            ))}
        </svg>
    );
}
