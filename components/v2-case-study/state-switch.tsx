"use client";

// A pill radio group that switches a figure between states: Human Firewall's
// funnel toggle, made shareable. Click, tap or arrow keys; 44px tall on
// phones. One state can drive several figures (the caller owns the value).

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export function StateSwitch<T extends string>({
    id,
    label,
    options,
    value,
    onChange,
    className,
}: {
    id: string;
    label: string;
    options: { id: T; label: string }[];
    value: T;
    onChange: (v: T) => void;
    className?: string;
}) {
    const step = (d: number) => {
        const i = options.findIndex((o) => o.id === value);
        onChange(options[(i + d + options.length) % options.length].id);
    };
    return (
        <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", className)}>
            <span id={`${id}-label`} className="v2-mono text-[12px] text-[var(--v2-muted)]">
                {label}
            </span>
            <div
                role="radiogroup"
                aria-labelledby={`${id}-label`}
                onKeyDown={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                        e.preventDefault();
                        step(1);
                    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                        e.preventDefault();
                        step(-1);
                    }
                }}
                className="relative inline-flex flex-wrap rounded-[22px] border border-[var(--v2-rule)] p-1"
            >
                {options.map((o) => {
                    const on = value === o.id;
                    return (
                        <button
                            key={o.id}
                            type="button"
                            role="radio"
                            aria-checked={on}
                            tabIndex={on ? 0 : -1}
                            onClick={() => onChange(o.id)}
                            className={cn("v2-mono relative min-h-11 rounded-full px-4 text-left text-[13px] transition-colors md:min-h-9", on ? "text-[var(--v2-paper)]" : "text-[var(--v2-oxblood)]")}
                        >
                            {on && (
                                <motion.span
                                    layoutId={`${id}-pill`}
                                    className="absolute inset-0 rounded-full bg-[var(--v2-oxblood)]"
                                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                                />
                            )}
                            <span className="relative">{o.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
