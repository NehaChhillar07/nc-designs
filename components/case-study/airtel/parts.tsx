"use client";

import type { ComponentProps, ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/components/case-study/motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Question } from "@/data/airtel-travel-mode-data";

// Building blocks for the Airtel case study. Type sizes and spacing copy the
// Human Firewall helpers class for class, so the two studies sit side by side
// without drift. Colours come only from the Tailwind grays those helpers use
// and the editorial tokens in globals.css: nothing here carries a hex value.

/** *italic* and **bold** inside data strings. */
export function withEmphasis(text: string, dark = false): ReactNode {
    return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return (
                <strong key={i} className={cn("font-semibold", dark ? "text-cream" : "text-gray-900")}>
                    {part.slice(2, -2)}
                </strong>
            );
        }
        if (part.startsWith("*") && part.endsWith("*")) {
            return (
                <em key={i} className={cn("italic", dark ? "text-cream" : "text-gray-900")}>
                    {part.slice(1, -1)}
                </em>
            );
        }
        return <span key={i}>{part}</span>;
    });
}

export function SectionLabel({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
    return (
        <motion.p
            {...fadeInUp}
            className={cn(
                "mb-4 text-xs font-semibold uppercase tracking-[0.2em]",
                dark ? "text-cream-faint" : "text-gray-500",
            )}
        >
            {children}
        </motion.p>
    );
}

export function H2({ children, dark = false, className }: { children: ReactNode; dark?: boolean; className?: string }) {
    return (
        <motion.h2
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.05 }}
            className={cn(
                "mb-6 max-w-4xl text-2xl font-medium leading-snug tracking-tight md:text-3xl lg:text-4xl",
                dark ? "text-cream" : "text-gray-900",
                className,
            )}
        >
            {children}
        </motion.h2>
    );
}

export function Lede({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
    return (
        <motion.p
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
            className={cn(
                "mb-8 max-w-3xl text-lg leading-relaxed md:text-xl",
                dark ? "text-cream-soft" : "text-gray-600",
            )}
        >
            {children}
        </motion.p>
    );
}

export function Body({ items, className }: { items: readonly string[]; className?: string }) {
    return (
        <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
            className={cn("max-w-4xl space-y-4 text-base leading-relaxed text-gray-600", className)}
        >
            {items.map((p, i) => (
                <p key={i}>{withEmphasis(p)}</p>
            ))}
        </motion.div>
    );
}

export function PullQuote({ children, cite }: { children: ReactNode; cite?: string }) {
    return (
        <motion.blockquote {...fadeInUp} className="my-10 max-w-3xl border-l-[3px] border-gray-900/20 py-2 pl-6">
            <p className="text-xl font-light italic leading-relaxed text-gray-900/80 md:text-2xl">{children}</p>
            {cite && <cite className="mt-4 block text-sm font-normal not-italic text-gray-500">{cite}</cite>}
        </motion.blockquote>
    );
}

export function Callout({ lead, children }: { lead: string; children: ReactNode }) {
    return (
        <motion.div
            {...fadeInUp}
            className="my-8 max-w-3xl rounded-lg border border-gray-200 bg-gray-50 px-6 py-5 text-base leading-relaxed text-gray-600"
        >
            <strong className="font-semibold text-gray-900">{lead}</strong> {children}
        </motion.div>
    );
}

export function Card({ title, children, chosen = false }: { title: string; children: ReactNode; chosen?: boolean }) {
    return (
        <div
            className={cn(
                "h-full rounded-lg border p-5",
                chosen ? "border-2 border-gray-900 bg-gray-900/[0.02]" : "border-gray-200",
            )}
        >
            <p className="mb-1.5 font-medium leading-snug text-gray-900">{title}</p>
            <div className="text-sm leading-relaxed text-gray-600">{children}</div>
        </div>
    );
}

/** Hand-drawn cross, the site's sketchy-svg style, in the text colour it sits in. */
export function HandDrawnStrike() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="shrink-0">
            <path d="M 4 4 Q 9 8 14 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 14 4 Q 9 8 4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

/** A rejected option: Caveat label and a strike, as on Human Firewall. */
export function RejectedCard({ label, title, body }: { label: string; title?: string; body: string }) {
    return (
        <div className="h-full rounded-lg border border-gray-200 p-5">
            <div className="mb-3 flex items-center gap-2 text-accent-warm-deep">
                <span className="font-(family-name:--font-caveat) text-[26px] font-semibold leading-none">{label}</span>
                <HandDrawnStrike />
            </div>
            {title && <p className="mb-1.5 text-sm font-medium leading-snug text-gray-900">{title}</p>}
            <p className="text-sm leading-relaxed text-gray-500">{body}</p>
        </div>
    );
}

type Finding = string | { lead: string; body: string };

/**
 * Numbered findings. The number and the text are separate grid items, so a
 * bold lead-in can never be pulled into the number column.
 */
export function FindingsList({ items }: { items: readonly Finding[] }) {
    return (
        <motion.ol {...fadeInUp} className="max-w-3xl border-b border-gray-200">
            {items.map((item, i) => (
                <li key={i} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-2 border-t border-gray-200 py-3.5">
                    <span className="font-(family-name:--font-space-grotesk) font-semibold tabular-nums text-gray-900">
                        {String(i + 1).padStart(2, "0")}
                    </span>
                    {typeof item === "string" ? (
                        <span className="leading-relaxed text-gray-600">{item}</span>
                    ) : (
                        <span className="leading-relaxed text-gray-600">
                            <strong className="font-semibold text-gray-900">{item.lead}</strong> {item.body}
                        </span>
                    )}
                </li>
            ))}
        </motion.ol>
    );
}

/* ----------------------------------------------------------------- split */

/**
 * The page's one layout: the copy on the left (label, headline, body) and the
 * section's screen on the right, large, with a wide gap between them. The
 * right column is the same width everywhere so every section keeps the same
 * rhythm; `wide` gives it room for notes beside the phone from xl. Below lg the
 * two stack, copy first.
 */
export function Split({
    children,
    visual,
    wide = false,
    className,
}: {
    children: ReactNode;
    visual: ReactNode;
    wide?: boolean;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "grid items-center gap-y-12 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-x-20 xl:gap-x-24",
                wide && "xl:grid-cols-[minmax(0,1fr)_36rem]",
                className,
            )}
        >
            <div className="min-w-0">{children}</div>
            <motion.div {...fadeInUp} className="flex min-w-0 justify-center">
                {visual}
            </motion.div>
        </div>
    );
}

/* ------------------------------------------------------------- questions */

const pad2 = (n: number) => String(n).padStart(2, "0");

/**
 * Each chapter opens on the traveller's own question, in her words, with where
 * she is in the trip above it and my answer under it.
 */
export function QuestionHeader({ q, total, answer }: { q: Question; total: number; answer: string }) {
    return (
        <>
            <SectionLabel>
                {q.act} · {q.n} of {total}
            </SectionLabel>
            <H2>
                <span aria-hidden="true" className="text-accent-warm-deep">
                    “
                </span>
                {q.question}
                <span aria-hidden="true" className="text-accent-warm-deep">
                    ”
                </span>
            </H2>
            <Lede>{answer}</Lede>
        </>
    );
}

type MapRow = { question: Question; source: string; note: string };

/**
 * The whole trip as her questions, each beside the source it came from. Every
 * question links down to the chapter that answers it, so the map doubles as
 * the page's contents for anyone skimming.
 */
export function QuestionMap({ acts }: { acts: readonly { label: string; rows: readonly MapRow[] }[] }) {
    return (
        <motion.div {...fadeInUp} className="max-w-4xl space-y-10">
            {acts.map((act) => (
                <div key={act.label}>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-warm-deep">{act.label}</p>
                    <ol className="border-b border-gray-200">
                        {act.rows.map((r) => (
                            <li
                                key={r.question.id}
                                className="grid gap-x-10 gap-y-2 border-t border-gray-200 py-5 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
                            >
                                <a
                                    href={`#${r.question.id}`}
                                    className="group grid grid-cols-[2.25rem_minmax(0,1fr)] items-baseline rounded-sm text-lg font-medium leading-snug text-gray-900 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    <span className="font-(family-name:--font-space-grotesk) text-sm font-semibold tabular-nums text-gray-500">
                                        {pad2(r.question.n)}
                                    </span>
                                    <span className="underline decoration-gray-300 underline-offset-4 transition-colors group-hover:text-accent-warm-strong group-hover:decoration-current">
                                        {r.question.question}
                                    </span>
                                </a>
                                <div className="pl-9 md:pl-0">
                                    <p className="mb-1 text-xs uppercase tracking-[0.1em] text-gray-500">{r.source}</p>
                                    <p className="font-(family-name:--font-lora) italic leading-relaxed text-gray-600">{r.note}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            ))}
        </motion.div>
    );
}

/** The three moves, up front, each a link to the chapter that proves it. */
export function MovesStrip({
    items,
    linkLabel,
}: {
    items: readonly { line: string; body: string; to: string }[];
    linkLabel: string;
}) {
    return (
        <motion.ol
            {...fadeInUp}
            className="grid gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 md:grid-cols-3"
        >
            {items.map((m, i) => (
                <li key={m.to} className="bg-white">
                    <a
                        href={`#${m.to}`}
                        className="group flex h-full flex-col p-6 outline-none transition-colors hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                    >
                        <span className="mb-4 font-(family-name:--font-space-grotesk) text-sm font-semibold tabular-nums text-gray-500">
                            {pad2(i + 1)}
                        </span>
                        <span className="mb-2 text-xl font-medium leading-snug tracking-tight text-gray-900">{m.line}</span>
                        <span className="mb-6 text-sm leading-relaxed text-gray-600">{m.body}</span>
                        <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-gray-900 transition-colors group-hover:text-accent-warm-strong">
                            {linkLabel}
                            <ArrowDown aria-hidden="true" className="size-4 transition-transform group-hover:translate-y-0.5" />
                        </span>
                    </a>
                </li>
            ))}
        </motion.ol>
    );
}

/* ------------------------------------------------------------------ tabs */

/**
 * shadcn Tabs (Radix) dressed as the site's pill chips, wrapping across lines.
 * Radix gives the arrow-key roving focus and the tab/tabpanel wiring.
 */
export function ChipTabs(props: ComponentProps<typeof Tabs>) {
    return <Tabs {...props} className={cn("gap-5", props.className)} />;
}

export function ChipTabsList({ className, ...props }: ComponentProps<typeof TabsList>) {
    return (
        <TabsList
            {...props}
            className={cn(
                "h-auto w-full flex-wrap justify-start gap-2 rounded-none bg-transparent p-0 group-data-[orientation=horizontal]/tabs:h-auto",
                className,
            )}
        />
    );
}

export function ChipTab({ className, dark = false, ...props }: ComponentProps<typeof TabsTrigger> & { dark?: boolean }) {
    return (
        <TabsTrigger
            {...props}
            className={cn(
                "h-auto flex-none gap-1.5 rounded-full border px-4 py-2 text-sm font-medium shadow-none transition-colors",
                dark
                    ? "border-cream-faint text-cream-soft hover:text-cream data-[state=active]:border-cream data-[state=active]:bg-cream data-[state=active]:text-editorial-dark"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-900 data-[state=active]:border-gray-900 data-[state=active]:bg-gray-900 data-[state=active]:text-white",
                "data-[state=active]:shadow-none",
                className,
            )}
        />
    );
}

/* ------------------------------------------------------------ spec table */

type SpecRow = { beat: string; what: string; timing: string };

export function SpecTable({
    rows,
    headers,
}: {
    rows: readonly SpecRow[];
    headers: { beat: string; what: string; timing: string };
}) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="border-b border-gray-200 text-left text-[0.7rem] uppercase tracking-[0.12em] text-gray-500">
                        <th className="py-2 pr-4 font-semibold">{headers.beat}</th>
                        <th className="py-2 pr-4 font-semibold">{headers.what}</th>
                        <th className="py-2 font-semibold">{headers.timing}</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r) => (
                        <tr key={r.beat} className="border-b border-gray-200 align-top">
                            <td className="py-2 pr-4 font-semibold text-gray-900">{r.beat}</td>
                            <td className="py-2 pr-4 text-gray-600">{r.what}</td>
                            <td className="whitespace-nowrap py-2 tabular-nums text-gray-600">{r.timing}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
