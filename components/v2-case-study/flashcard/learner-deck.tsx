"use client";

// Chapter 04, the hands-on moment: the format an employee actually sees, on
// the dark learner surface over the coloured table. "Give it a try" comes
// first and the explanation after (the Pudding's order). Swipe, arrow keys
// or buttons to move; tap, space or ↻ to flip; a quiz card answers back; the
// pack ends with a stamp. Spec mode (S) draws the swipe threshold and the
// live velocity; the 0.5× switch slows every card on the page.

import { fcV2 } from "@/data/v2-flashcard-data";

import { CAVEAT } from "../cs-kit";
import { SlowMoSwitch, SwipeDeck } from "./deck";
import { GrainTable } from "./grain-table";

const w = fcV2.whyFlashcards;

export function LearnerDeck() {
    return (
        <figure>
            <GrainTable seed={2} className="px-5 pb-8 pt-6 md:px-10 md:pb-12 md:pt-8">
                <div className="flex items-center justify-between gap-4 text-[#f2ece3]">
                    <p className="text-[24px] leading-none text-[#e2b98a] md:text-[28px]" style={CAVEAT}>
                        {w.tryLabel} ↓
                    </p>
                    <SlowMoSwitch label={w.slowMo} className="[--fc-switch-knob:#1a1414]" />
                </div>
                <SwipeDeck
                    cards={w.deck}
                    label={w.deckLabel}
                    controls={w.controls}
                    complete={w.complete}
                    restart={w.restart}
                    className="mx-auto mt-6 w-full max-w-[340px] md:mt-8"
                />
                <p className="v2-mono mt-5 hidden text-center text-[11px] text-white/60 md:block">{w.keys}</p>
            </GrainTable>
            <figcaption className="v2-mono mt-3 text-[11px] text-[var(--v2-muted)] md:text-[12px]">{w.demoCaption}</figcaption>
            {/* The whole pack as text: for screen readers, for readers without
                JS, and for anyone who'd rather read than swipe. */}
            <details className="group mt-4">
                <summary className="v2-mono inline-flex min-h-11 cursor-pointer list-none items-center gap-2 text-[12px] text-[var(--v2-oxblood)] [&::-webkit-details-marker]:hidden">
                    <span aria-hidden className="transition-transform group-open:rotate-90">
                        ›
                    </span>
                    {w.transcript}
                </summary>
                <ol className="mt-2 space-y-3 border-l border-[var(--v2-rule)] pl-4 text-[15px] leading-snug text-[var(--v2-ink)]">
                    {w.cards.map((c, i) => (
                        <li key={i}>
                            <span className="v2-mono mr-2 text-[11px] text-[var(--v2-muted)]">{String(i + 1).padStart(2, "0")}</span>
                            {c.type === "quiz" ? (
                                <>
                                    {c.question}
                                    <ul className="mt-1 space-y-0.5 pl-6 text-[var(--v2-muted)]">
                                        {c.options.map((o) => (
                                            <li key={o.text}>
                                                {o.correct ? "✓ " : "· "}
                                                {o.text}
                                            </li>
                                        ))}
                                    </ul>
                                    <span className="mt-1 block pl-6 text-[var(--v2-muted)]">{c.explanation}</span>
                                </>
                            ) : (
                                <>
                                    <span className="font-medium">{c.front}</span> <span className="text-[var(--v2-muted)]">{c.back}</span>
                                </>
                            )}
                        </li>
                    ))}
                </ol>
            </details>
        </figure>
    );
}
