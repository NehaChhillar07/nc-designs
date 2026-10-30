"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { homeV2Data } from "@/data/home-v2-data";
import { cn } from "@/lib/utils";

import { ConnectSheet } from "./connect-sheet";
import { ScrollProgress } from "./motion";
import { useSpecMode } from "./spec-mode";

const { topBar, footer } = homeV2Data;

export function TopBar() {
    const { on, toggle } = useSpecMode();
    const [connectOpen, setConnectOpen] = useState(false);
    // Stable, so the sheet's effect doesn't re-run (and refocus) on every render.
    const closeConnect = useCallback(() => setConnectOpen(false), []);

    return (
        <>
            <ScrollProgress />
            <header className="v2-mono flex items-center justify-between gap-4 px-4 pt-3 text-[14px] md:items-baseline md:px-8 md:pt-7 md:text-[12px]">
                <p className="flex items-baseline gap-3">
                    <Link href={topBar.homeHref} className="text-[var(--v2-ink)] transition-colors hover:text-[var(--v2-oxblood)]">
                        {topBar.name}
                    </Link>
                    <span className="hidden text-[var(--v2-muted)] sm:inline">{topBar.updated}</span>
                </p>
                <nav aria-label="Primary" className="flex items-center gap-5 md:items-baseline md:gap-6">
                    {/* Redlines are a desktop inspection tool: on a phone there's no
                        room for the labels and no pointer to inspect with. */}
                    <button
                        type="button"
                        onClick={toggle}
                        aria-pressed={on}
                        className={cn(
                            "hidden items-center gap-1.5 transition-colors md:flex",
                            on ? "text-[var(--v2-redline)]" : "text-[var(--v2-muted)] hover:text-[var(--v2-ink)]",
                        )}
                    >
                        {/* A real switch: the knob travels, the track fills red. */}
                        <span
                            aria-hidden
                            className={cn(
                                "relative inline-flex h-[12px] w-[22px] translate-y-[1px] items-center rounded-full border border-current px-[2px] transition-colors duration-300",
                                on && "bg-[var(--v2-redline)]",
                            )}
                        >
                            <motion.span
                                className={cn("h-[6px] w-[6px] rounded-full", on ? "bg-[var(--v2-paper)]" : "bg-current")}
                                animate={{ x: on ? 10 : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </span>
                        {topBar.specToggle}
                        <kbd className="hidden rounded-[3px] border border-current px-1 text-[10px] leading-[14px] md:inline">
                            {topBar.specHint}
                        </kbd>
                    </button>
                    <Link href={topBar.resumeHref} className="v2-link inline-flex min-h-11 items-center md:min-h-0">
                        {topBar.resume}
                    </Link>
                    <button type="button" onClick={() => setConnectOpen(true)} className="v2-link inline-flex min-h-11 items-center md:min-h-0">
                        {topBar.connect}
                    </button>
                </nav>
            </header>
            <SayHiPill onOpen={() => setConnectOpen(true)} hidden={connectOpen} />
            <ConnectSheet open={connectOpen} onClose={closeConnect} />
        </>
    );
}

// Phones: contact stays one thumb away. Appears once the first screen has
// scrolled past, and steps aside when the footer (which has the same links)
// is on screen. Sits in the bottom-right thumb zone, 48px tall.
function SayHiPill({ onOpen, hidden }: { onOpen: () => void; hidden: boolean }) {
    const [past, setPast] = useState(false);
    const [footerVisible, setFooterVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        const footer = document.querySelector(".home-v2 footer");
        const io = footer ? new IntersectionObserver(([e]) => setFooterVisible(e.isIntersecting)) : null;
        if (footer) io?.observe(footer);
        return () => {
            window.removeEventListener("scroll", onScroll);
            io?.disconnect();
        };
    }, []);

    const show = past && !footerVisible && !hidden;
    return (
        <motion.button
            type="button"
            onClick={onOpen}
            aria-hidden={!show}
            tabIndex={show ? 0 : -1}
            className="v2-mono fixed bottom-5 right-4 z-50 inline-flex h-12 items-center gap-2 rounded-full bg-[var(--v2-oxblood)] px-5 text-[14px] text-[var(--v2-paper)] shadow-[0_14px_30px_-12px_rgba(60,10,12,0.7)] md:hidden"
            initial={false}
            animate={show ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            style={{ pointerEvents: show ? "auto" : "none" }}
        >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
            {footer.pill}
        </motion.button>
    );
}
