"use client";

// Chapter 03. The site map, redrawn from the project's information
// architecture, with every page coloured by the template it uses. It deals
// itself in level by level as it arrives (entry points, the homepage, the
// five topic pages, then their content pages): three templates, every page.
// Plays once, no controls. Reduced motion: it simply arrives laid out.

import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { EASE } from "@/components/home-v2/motion";
import { ecV2 } from "@/data/v2-ecrime-hub-data";
import { cn } from "@/lib/utils";

const { map, templates, mapLabel } = ecV2.system;

const TONE = {
    home: "border-[var(--v2-oxblood)] bg-[var(--v2-oxblood)] text-[var(--v2-paper)]",
    topic: "border-[#1a1414] bg-[#1a1414] text-[#f2ece3]",
    content: "border-[var(--v2-rule)] bg-[#f7f3ec] text-[var(--v2-ink)]",
} as const;

function Deal({ show, order, className, children }: { show: boolean; order: number; className?: string; children: React.ReactNode }) {
    return (
        <motion.li
            initial={false}
            animate={show ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: -14, rotate: order % 2 ? 2 : -2 }}
            transition={{ duration: 0.45, ease: EASE, delay: show ? order * 0.035 : 0 }}
            className={className}
        >
            {children}
        </motion.li>
    );
}

export function SiteMap() {
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
    let n = 0; // deal order, level by level

    return (
        <figure ref={ref} className="bg-[#f7f3ec] p-5 shadow-[0_30px_50px_-32px_rgba(60,10,12,0.55)] md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <figcaption className="v2-mono text-[12px] text-[var(--v2-muted)]">{mapLabel}</figcaption>
                <ul className="flex flex-wrap gap-3">
                    {templates.map((t) => (
                        <li key={t.id} className="v2-mono flex items-center gap-1.5 text-[11px] text-[var(--v2-ink)]">
                            <span aria-hidden className={cn("h-3 w-3 border", TONE[t.id as keyof typeof TONE])} />
                            {t.label.toLowerCase()}
                        </li>
                    ))}
                </ul>
            </div>

            {/* entry points → the homepage */}
            <ul aria-label="Entry points" className="mt-6 flex flex-wrap gap-2">
                {map.entries.map((e) => (
                    <Deal key={e} show={seen} order={n++} className="v2-mono border border-dashed border-[var(--v2-rule)] px-2.5 py-1 text-[11px] text-[var(--v2-muted)]">
                        {e}
                    </Deal>
                ))}
            </ul>
            <ul className="mt-3">
                <Deal show={seen} order={n++} className={cn("inline-block border px-3 py-1.5 text-[14px]", TONE.home)}>
                    Home
                </Deal>
            </ul>

            {/* five topic pages and their content pages */}
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">
                {map.sections.map((s) => (
                    <ul key={s.title} aria-label={s.title} className="space-y-1.5">
                        <Deal show={seen} order={n++} className={cn("border px-2.5 py-1.5 text-[13px] leading-tight", TONE.topic)}>
                            {s.title}
                        </Deal>
                        {s.pages.map((p) => (
                            <Deal key={p} show={seen} order={n++} className={cn("border px-2.5 py-1 text-[12px] leading-snug", TONE.content)}>
                                {p}
                            </Deal>
                        ))}
                    </ul>
                ))}
            </div>

            {/* on every page */}
            <ul aria-label="On every page" className="mt-5 flex flex-wrap gap-2 border-t border-dashed border-[var(--v2-rule)] pt-4">
                {map.layers.map((l) => (
                    <Deal key={l} show={seen} order={n++} className="v2-mono px-1 text-[11px] text-[var(--v2-oxblood)]">
                        + {l}
                    </Deal>
                ))}
            </ul>
        </figure>
    );
}
