"use client";

// The chapter index, like a book's running head.
// - Desktop (lg+): a quiet spine pinned near the top. At rest: one tick per
//   chapter (read ones oxblood) and only the current chapter's number and
//   short title. Hover or keyboard focus opens the full list on a paper panel,
//   with a progress bar through the current chapter. Appears from chapter 01.
// - Below lg: nothing. On a phone the reading-progress hairline in the top
//   bar is enough, and the page stays free of floating chrome.
// Short titles are for the index only; the page's headings are unchanged.

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { DUR, EASE } from "@/components/home-v2/motion";
import { cn } from "@/lib/utils";

type Ch = { id: string; n: string; label: string; short: string };

// Which chapter holds the reading line (40% down the screen), and how far
// through it the reader is.
function useReading(chapters: Ch[]) {
    const [state, setState] = useState<{ id: string | null; progress: number }>({ id: null, progress: 0 });
    useEffect(() => {
        let frame = 0;
        const read = () => {
            frame = 0;
            const line = window.innerHeight * 0.4;
            let id: string | null = null;
            let progress = 0;
            for (const c of chapters) {
                const el = document.getElementById(c.id);
                if (!el) continue;
                const r = el.getBoundingClientRect();
                if (r.top <= line) {
                    id = c.id;
                    progress = Math.min(1, Math.max(0, (line - r.top) / Math.max(1, r.height)));
                }
            }
            setState((s) => (s.id === id && Math.abs(s.progress - progress) < 0.01 ? s : { id, progress }));
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(read);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [chapters]);
    return state;
}

export function ChapterRail({ chapters, label }: { chapters: Ch[]; label: string }) {
    const { id: active, progress } = useReading(chapters);
    const idx = chapters.findIndex((c) => c.id === active);
    const current = chapters[idx];
    const shown = active !== null;

    const [expanded, setExpanded] = useState(false);
    const closeTimer = useRef<number | undefined>(undefined);
    const openPanel = () => {
        window.clearTimeout(closeTimer.current);
        setExpanded(true);
    };
    const closePanel = () => {
        window.clearTimeout(closeTimer.current);
        closeTimer.current = window.setTimeout(() => setExpanded(false), 180);
    };
    useEffect(() => () => window.clearTimeout(closeTimer.current), []);


    return (
        <>
            {/* desktop spine */}
            <motion.nav
                aria-label={label}
                initial={false}
                animate={{ opacity: shown ? 1 : 0 }}
                transition={{ duration: DUR.base, ease: EASE }}
                onPointerEnter={openPanel}
                onPointerLeave={closePanel}
                onFocus={openPanel}
                onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && closePanel()}
                onKeyDown={(e) => e.key === "Escape" && setExpanded(false)}
                className="fixed left-6 top-28 z-30 hidden lg:block xl:left-8"
                style={{ pointerEvents: shown ? "auto" : "none" }}
            >
                <div className="flex items-start gap-3">
                    {/* the ticks */}
                    <ol aria-hidden className="flex flex-col gap-[7px] pt-[5px]">
                        {chapters.map((c, i) => (
                            <li
                                key={c.id}
                                className={cn(
                                    "h-[2px] transition-all duration-300",
                                    i === idx ? "w-6 bg-[var(--v2-oxblood)]" : i < idx ? "w-3 bg-[var(--v2-oxblood)]" : "w-3 bg-[var(--v2-rule)]",
                                )}
                            />
                        ))}
                    </ol>

                    {/* at rest: the running head */}
                    <AnimatePresence mode="wait" initial={false}>
                        {!expanded && current && (
                            <motion.a
                                key={current.id}
                                href={`#${current.id}`}
                                tabIndex={shown ? 0 : -1}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: DUR.fast, ease: EASE }}
                                className="flex items-baseline gap-2 whitespace-nowrap text-[14px] leading-none text-[var(--v2-ink)]"
                            >
                                <span className="v2-mono text-[12px] text-[var(--v2-oxblood)]">{current.n}</span>
                                {current.short}
                            </motion.a>
                        )}
                    </AnimatePresence>
                </div>

                {/* open: the whole contents */}
                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -6 }}
                            transition={{ duration: DUR.fast * 1.4, ease: EASE }}
                            className="absolute -left-3 -top-3 w-[17rem] bg-[#f7f3ec] px-5 py-4 shadow-[0_24px_44px_-24px_rgba(60,10,12,0.5)]"
                        >
                            <p className="v2-mono text-[11px] text-[var(--v2-muted)]">{label}</p>
                            <ol className="mt-2">
                                {chapters.map((c, i) => {
                                    const on = i === idx;
                                    return (
                                        <li key={c.id}>
                                            <a
                                                href={`#${c.id}`}
                                                aria-current={on ? "location" : undefined}
                                                onClick={() => setExpanded(false)}
                                                className={cn(
                                                    "flex items-baseline gap-3 py-[7px] text-[15px] leading-tight transition-colors",
                                                    on ? "text-[var(--v2-oxblood)]" : i < idx ? "text-[var(--v2-ink)]" : "text-[var(--v2-muted)] hover:text-[var(--v2-ink)]",
                                                )}
                                            >
                                                <span className="v2-mono w-5 shrink-0 text-[11px] tabular-nums">{c.n}</span>
                                                <span className="flex-1">
                                                    {c.short}
                                                    {on && (
                                                        <span aria-hidden className="mt-1.5 block h-[2px] w-full bg-[var(--v2-rule)]">
                                                            <span className="block h-full bg-[var(--v2-oxblood)]" style={{ width: `${progress * 100}%` }} />
                                                        </span>
                                                    )}
                                                </span>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ol>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

        </>
    );
}
