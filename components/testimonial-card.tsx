"use client";

import { motion } from "motion/react";
import { isUnreplaced, resolveToken } from "@/lib/placeholders";
import type { Testimonial } from "@/data/testimonials-data";

// One quote card, token-gated. Unreplaced token: hidden in production, sample
// rendered in dev with a sticker so fabricated words can never ship above a
// real name. Replaced token: the quote text goes live under the person's name
// and role from data/testimonials-data.ts ("Quote | Name | Role" overrides
// the attribution if ever needed).

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -80px 0px" },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

export function TestimonialCard({ item }: { item: Testimonial }) {
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
        <motion.figure
            {...fadeUp}
            className="relative rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8"
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
            <blockquote className="text-[16px] md:text-[17px] text-gray-800 leading-relaxed">
                &ldquo;{quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm text-gray-500">
                <span className="font-medium text-gray-700">{name}</span>
                {role ? ` · ${role}` : null}
            </figcaption>
        </motion.figure>
    );
}
