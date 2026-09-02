"use client";

import { useEffect, useState } from "react";
import DisplayCards from "@/components/ui/display-cards";
import { isUnreplaced, resolveToken } from "@/lib/placeholders";
import { testimonials } from "@/data/testimonials-data";

// Testimonials as the stacked display cards: quote as the one-line teaser
// that fades out under the right-edge gradient, name up top with an initials
// chip, role below. Hovering a back card lifts it forward. Token-gated like
// every other testimonial surface: production renders nothing until the real
// quotes replace the tokens; dev shows samples under one sticker.

function initials(name: string): string {
    return name
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? "")
        .join("");
}

// Front/back positions the two cards swap between. Both carry the veil
// pseudo-element; only its opacity differs, so the swap animates smoothly
// (the card's transition-all covers the transform, before:transition-opacity
// covers the veil). The stack auto-swaps every few seconds — paused while
// hovered — so both comments get read without any interaction.
const VEIL =
    "before:absolute before:w-[100%] before:rounded-xl before:h-[100%] before:content-[''] before:bg-white/35 before:transition-opacity before:duration-700 before:left-0 before:top-0 before:pointer-events-none";
const BACK_CLASS = `[grid-area:stack] ${VEIL} before:opacity-100`;
const FRONT_CLASS = `[grid-area:stack] translate-x-10 translate-y-14 ${VEIL} before:opacity-0`;
const SWAP_MS = 6000;

export function TestimonialStack({ className }: { className?: string }) {
    const visible = testimonials.filter((t) => resolveToken(t.token));
    // Which card is in front; swaps on a timer, pauses while hovered.
    const [front, setFront] = useState(1);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused || visible.length < 2) return;
        const id = setInterval(() => setFront((f) => (f + 1) % visible.length), SWAP_MS);
        return () => clearInterval(id);
    }, [paused, visible.length]);

    if (visible.length === 0) return null;

    const anySample = visible.some((t) => isUnreplaced(resolveToken(t.token)!));

    const cards = visible.map((t, i) => {
        const resolved = resolveToken(t.token)!;
        const sample = isUnreplaced(resolved);
        let quote = t.sampleQuote;
        let name = t.name;
        let role = t.role;
        if (!sample) {
            if (resolved.includes("|")) {
                [quote, name, role] = resolved.split("|").map((s) => s.trim());
            } else {
                quote = resolved;
            }
        }
        return {
            // Real photo when the data has one; a full-size initials disc
            // until then (the avatar field takes a /public path).
            icon: t.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element -- 44px avatar inside the display card chip; next/image adds nothing here
                <img src={t.avatar} alt={name} className="h-full w-full object-cover" />
            ) : (
                <span className="text-[14px] font-semibold" style={{ color: "#B45309" }}>
                    {initials(name)}
                </span>
            ),
            title: name,
            description: `“${quote}”`,
            date: role,
            // zIndex rides along so the front card also paints on top while
            // the transforms animate between positions.
            className: `${i === front ? FRONT_CLASS : BACK_CLASS} ${i === front ? "z-10" : "z-0"}`,
        };
    });

    return (
        <div
            className={className}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {anySample && (
                <div className="mb-6 flex justify-start">
                    <span
                        className="inline-block px-3 py-1 rounded-full"
                        style={{
                            fontFamily: "var(--font-caveat), cursive",
                            fontSize: "15px",
                            transform: "rotate(-2deg)",
                            // deeper than the #FF9800 accent so white text clears 4.5:1
                            backgroundColor: "#B45309",
                            color: "#fff",
                        }}
                    >
                        samples, replace with the real quotes
                    </span>
                </div>
            )}
            <DisplayCards cards={cards} />
        </div>
    );
}
