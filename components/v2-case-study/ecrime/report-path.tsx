"use client";

// Chapter 02, the hands-on moment. Dubai Police required reports to be filed
// on their own form, so Report always hands the citizen off. The reader flips
// between what a plain link out would do and what Human Firewall added: a
// nudge to its cybersecurity team on every Report click. The path redraws
// each time. The decision is in the prose above, for readers who never flip.

import { useState } from "react";

import { ecV2 } from "@/data/v2-ecrime-hub-data";
import { cn } from "@/lib/utils";

import { FlowDiagram } from "../flow-diagram";
import { StateSwitch } from "../state-switch";

const { options, switchLabel } = ecV2.report;
type Mode = keyof typeof options;
const MODES = Object.keys(options) as Mode[];

export function ReportPath() {
    const [mode, setMode] = useState<Mode>(MODES[0]);
    const o = options[mode];

    return (
        <figure className="bg-[#f7f3ec] p-5 shadow-[0_30px_50px_-32px_rgba(60,10,12,0.55)] md:p-8">
            <StateSwitch id="report-path" label={switchLabel} value={mode} onChange={setMode} options={MODES.map((m) => ({ id: m, label: options[m].label }))} />
            {/* Re-keyed so the path draws again on every flip. */}
            <FlowDiagram key={mode} lanes={o.lanes} className="mt-7" />
            <ul aria-live="polite" className="mt-7 grid gap-2 border-t border-[var(--v2-rule)] pt-4 md:grid-cols-2">
                {o.results.map((r, i) => {
                    // The first line is the same either way; the second is the difference.
                    const bad = !o.good && i > 0;
                    return (
                        <li key={r} className={cn("flex items-baseline gap-2 text-[15px] leading-snug", bad ? "text-[var(--v2-redline)]" : "text-[var(--v2-ink)]")}>
                            <span aria-hidden className="v2-mono text-[13px]">
                                {bad ? "×" : "✓"}
                            </span>
                            {r}
                        </li>
                    );
                })}
            </ul>
        </figure>
    );
}
