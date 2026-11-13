"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

import { homeV2Data } from "@/data/home-v2-data";

import { PLAYING_FLAG } from "./greeting-script";

const { greeting } = homeV2Data;

// Before paint on the client; the server never runs it.
const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

// The opening line: a few words in quick succession, then the paper lifts
// away. The timing is all CSS (.v2-greet in home-v2.css) so it starts at first
// paint. This component handles the edges:
// - no flag from the inline script means a client-side navigation (the script
//   only runs on a full load), so the greeting is skipped;
// - any click or key during the greeting skips the rest of it.
export function Greeting() {
    // Dev Strict Mode runs effects twice; the ref survives that, so the flag
    // is read once per real mount.
    const checked = useRef(false);

    useBeforePaint(() => {
        const d = document.documentElement;
        if (!checked.current) {
            checked.current = true;
            const w = window as unknown as Record<string, unknown>;
            if (!w[PLAYING_FLAG]) d.setAttribute("data-v2-greet", "skip");
            delete w[PLAYING_FLAG];
        }

        const skip = () => d.setAttribute("data-v2-greet", "skip");
        window.addEventListener("pointerdown", skip, { once: true });
        window.addEventListener("keydown", skip, { once: true });
        return () => {
            window.removeEventListener("pointerdown", skip);
            window.removeEventListener("keydown", skip);
        };
    }, []);

    return (
        <div className="v2-greet v2-display text-[clamp(3.5rem,11vw,9rem)] italic leading-none" aria-hidden>
            {greeting.map((word, i) => (
                <span key={word} style={{ "--i": i } as React.CSSProperties}>
                    {word}
                </span>
            ))}
        </div>
    );
}
