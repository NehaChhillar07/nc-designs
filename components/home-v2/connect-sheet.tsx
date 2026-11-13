"use client";

import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

import { V2, v2Pages } from "@/data/v2-pages-data";
import { CAL_LINK, resolveToken } from "@/lib/placeholders";
import { CONTACT_EMAIL, LINKEDIN_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

import { GRID } from "./grid";
import { DUR, EASE, WaveText } from "./motion";
import { useCopy } from "./use-copy";

const { connect } = v2Pages;
const mailto = () => (window.location.href = `mailto:${CONTACT_EMAIL}`);

// "connect" in the top bar: a sheet of paper slides down over the page.
// A real dialog: focus moves in and stays in, Escape or the backdrop closes
// it, the page behind doesn't scroll, and focus returns where it came from.
export function ConnectSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
    const panel = useRef<HTMLDivElement>(null);
    const returnTo = useRef<HTMLElement | null>(null);
    const { copied, copy } = useCopy(CONTACT_EMAIL, mailto);
    const cal = resolveToken(CAL_LINK);

    const focusables = useCallback(
        () => Array.from(panel.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []),
        [],
    );

    useEffect(() => {
        if (!open) return;
        returnTo.current = document.activeElement as HTMLElement | null;
        const html = document.documentElement;
        const prev = html.style.overflow;
        html.style.overflow = "hidden";
        // After the panel mounts.
        const raf = requestAnimationFrame(() => focusables()[0]?.focus());

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onClose();
            } else if (e.key === "Tab") {
                const items = focusables();
                if (!items.length) return;
                const first = items[0];
                const last = items[items.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        window.addEventListener("keydown", onKey);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("keydown", onKey);
            html.style.overflow = prev;
            returnTo.current?.focus();
        };
    }, [open, onClose, focusables]);

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[60]">
                    <motion.div
                        aria-hidden
                        className="absolute inset-0 bg-[rgb(26_20_20/0.28)] backdrop-blur-[2px]"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: DUR.fast }}
                    />
                    <motion.div
                        ref={panel}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="v2-connect-title"
                        className="absolute inset-x-0 top-0 border-b border-[var(--v2-rule)] bg-[var(--v2-paper)] pb-10 pt-5 shadow-[0_30px_60px_-30px_rgba(60,10,12,0.45)] md:pb-14 md:pt-7"
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: DUR.base, ease: EASE }}
                    >
                        <div className="flex justify-end px-4 md:px-8">
                            <button type="button" onClick={onClose} className="v2-mono v2-link text-[12px]">
                                {connect.close} <span className="text-[var(--v2-muted)]">(esc)</span>
                            </button>
                        </div>

                        <div className={cn(GRID, "mt-6 items-end md:mt-10")}>
                            <div className="col-span-4 md:col-span-6 md:col-start-2">
                                <h2
                                    id="v2-connect-title"
                                    className="v2-display text-[clamp(4rem,11vw,10rem)] italic leading-[0.85] text-[var(--v2-oxblood)]"
                                >
                                    <WaveText text={connect.heading} />
                                </h2>
                                <p className="mt-5 max-w-[40ch] text-[15px] leading-[1.6] text-[var(--v2-muted)]">{connect.lead}</p>
                            </div>

                            <div className="col-span-4 mt-10 md:col-span-4 md:col-start-8 md:mt-0">
                                <button
                                    type="button"
                                    onClick={copy}
                                    aria-describedby="v2-connect-copy"
                                    className="v2-link text-left text-[20px] md:text-[24px]"
                                >
                                    {CONTACT_EMAIL}
                                </button>
                                <span
                                    id="v2-connect-copy"
                                    aria-live="polite"
                                    className="v2-mono relative mt-1 block h-4 overflow-hidden text-[11px] leading-4"
                                >
                                    <AnimatePresence mode="popLayout" initial={false}>
                                        <motion.span
                                            key={copied ? "copied" : "hint"}
                                            className={cn(
                                                "flex items-center gap-1",
                                                copied ? "text-[var(--v2-oxblood)]" : "text-[var(--v2-muted)]",
                                            )}
                                            initial={{ y: "100%", opacity: 0 }}
                                            animate={{ y: "0%", opacity: 1 }}
                                            exit={{ y: "-100%", opacity: 0 }}
                                            transition={{ duration: DUR.fast * 1.4, ease: EASE }}
                                        >
                                            {copied && <Check aria-hidden className="h-3 w-3" strokeWidth={2.5} />}
                                            {copied ? connect.copied : connect.copyHint}
                                        </motion.span>
                                    </AnimatePresence>
                                </span>

                                <ul className="v2-mono mt-8 border-t border-[var(--v2-rule)] text-[13px]">
                                    {cal && (
                                        <li className="border-b border-[var(--v2-rule)]">
                                            <a href={cal} target="_blank" rel="noopener noreferrer" className="group flex items-baseline justify-between py-3">
                                                <span className="text-[var(--v2-oxblood)]">{connect.call}</span>
                                                <span className="text-[11px] text-[var(--v2-muted)] transition-transform duration-300 group-hover:-translate-x-1">
                                                    {connect.callNote} ↗
                                                </span>
                                            </a>
                                        </li>
                                    )}
                                    <li className="border-b border-[var(--v2-rule)]">
                                        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="group flex items-baseline justify-between py-3">
                                            <span className="text-[var(--v2-oxblood)]">{connect.linkedin}</span>
                                            <span aria-hidden className="text-[var(--v2-muted)] transition-transform duration-300 group-hover:-translate-x-1">↗</span>
                                        </a>
                                    </li>
                                    <li className="border-b border-[var(--v2-rule)]">
                                        <Link href={V2.resume} onClick={onClose} className="group flex items-baseline justify-between py-3">
                                            <span className="text-[var(--v2-oxblood)]">{connect.resume}</span>
                                            <span aria-hidden className="text-[var(--v2-muted)] transition-transform duration-300 group-hover:-translate-x-1">→</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
