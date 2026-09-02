"use client";

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

// Stack offsets for a two-card pile: back card dims and lifts on hover, the
// front card sits down-right and rises slightly.
const STACK_CLASSES = [
    "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:rounded-xl before:h-[100%] before:content-[''] before:bg-white/60 before:transition-opacity before:duration-700 hover:before:opacity-0 before:left-0 before:top-0",
    "[grid-area:stack] translate-x-16 translate-y-10 hover:translate-y-4",
];

export function TestimonialStack({ className }: { className?: string }) {
    const visible = testimonials.filter((t) => resolveToken(t.token));
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
            icon: (
                <span className="text-[11px] font-semibold" style={{ color: "#B45309" }}>
                    {initials(name)}
                </span>
            ),
            title: name,
            description: `“${quote}”`,
            date: role,
            className: STACK_CLASSES[i % STACK_CLASSES.length],
        };
    });

    return (
        <div className={className}>
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
