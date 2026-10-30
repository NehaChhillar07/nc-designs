"use client";

import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { homeV2Data } from "@/data/home-v2-data";
import { CAL_LINK, GITHUB_PROFILE, resolveToken } from "@/lib/placeholders";
import { CONTACT_EMAIL, LINKEDIN_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

import { GRID } from "./grid";
import { DUR, EASE, WaveText } from "./motion";
import { useCopy } from "./use-copy";
import { Spec } from "./spec-mode";

const { footer } = homeV2Data;
const mailto = () => (window.location.href = `mailto:${CONTACT_EMAIL}`);

// Live local time. Rendered only after mount, so the server and the first
// client render agree (the server has no idea what minute it is for you).
function useLocalTime(timeZone: string) {
    const [time, setTime] = useState<string | null>(null);
    useEffect(() => {
        const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone });
        const tick = () => setTime(fmt.format(new Date()));
        tick();
        const id = window.setInterval(tick, 15_000);
        return () => window.clearInterval(id);
    }, [timeZone]);
    return time;
}

export function FooterV2() {
    const { copied, copy: copyEmail } = useCopy(CONTACT_EMAIL, mailto);
    const time = useLocalTime(footer.timeZone);
    const cal = resolveToken(CAL_LINK);

    return (
        <footer className="pb-8">
            <div className={GRID}>
                <Spec
                    as="p"
                    name="display / sign-off"
                    type
                    className="v2-display col-span-4 text-[clamp(4.5rem,16vw,15rem)] italic leading-[0.85] text-[var(--v2-oxblood)] md:col-span-12 lg:col-span-8"
                >
                    <WaveText text={footer.line} />
                </Spec>

                <div className="col-span-4 mt-6 flex flex-col items-start gap-1 md:col-span-12 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
                    <button
                        type="button"
                        onClick={copyEmail}
                        className="v2-link text-left text-[18px] md:text-[20px]"
                        aria-describedby="v2-copy-status"
                    >
                        {CONTACT_EMAIL}
                    </button>
                    {/* The hint rolls up and out as the confirmation rolls in. The live
                        region is the stable outer span, so it's announced once. */}
                    <span
                        id="v2-copy-status"
                        aria-live="polite"
                        className="v2-mono relative block h-4 overflow-hidden text-[11px] leading-4"
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
                                {copied ? footer.copied : footer.copyHint}
                            </motion.span>
                        </AnimatePresence>
                    </span>
                </div>
            </div>

            <div className={`${GRID} v2-mono mt-14 items-baseline border-t border-[var(--v2-rule)] pt-4 text-[12px] md:mt-20`}>
                <nav aria-label="Contact" className="col-span-4 flex flex-wrap gap-x-6 gap-y-2 md:col-span-8">
                    {cal && (
                        <a href={cal} target="_blank" rel="noopener noreferrer" className="v2-link">
                            {footer.call}
                        </a>
                    )}
                    <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="v2-link">
                        {footer.linkedin}
                    </a>
                    <a href={GITHUB_PROFILE} target="_blank" rel="noopener noreferrer" className="v2-link">
                        {footer.github}
                    </a>
                    <Link href={footer.workWithMeHref} className="v2-link">
                        {footer.workWithMe}
                    </Link>
                    <Link href={footer.resumeHref} className="v2-link">
                        {footer.resume}
                    </Link>
                </nav>
                <p className="col-span-4 mt-3 text-[var(--v2-muted)] md:mt-0 md:text-right">
                    {/* Reserve the width so the line doesn't jump when the clock arrives. */}
                    <span className="inline-block min-w-[5ch] tabular-nums">{time ?? "--:--"}</span> {footer.timeLabel}
                </p>
            </div>
        </footer>
    );
}
