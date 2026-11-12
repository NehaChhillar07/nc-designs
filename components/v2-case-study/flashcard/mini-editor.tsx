"use client";

// Chapter 07. Enough freedom, not enough to break it. Ported from the live
// MiniCardEditor: reorder the three components, edit the text, toggle media
// and watch the limit move between 200 and 500. Beside it, the learner card is
// just a rendering of the parts, in their order.
// Reorder: drag with a mouse; up/down buttons on touch, keyboard and reduced
// motion (the buttons are always in the server markup).

import { AnimatePresence, motion, Reorder } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import { useFinePointer } from "@/components/home-v2/motion";
import { fcV2 } from "@/data/v2-flashcard-data";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import { cn } from "@/lib/utils";


const f = fcV2.freedomInside;
const image = fcV2.backwardsFirst.sample.image ?? "";
type Part = { id: "title" | "body" | "media"; label: string };

export function MiniEditor() {
    const fine = useFinePointer();
    const reduce = useReducedMotionSafe();
    const drag = fine && !reduce;
    const [items, setItems] = useState<Part[]>(f.components.map((id) => ({ id, label: id[0].toUpperCase() + id.slice(1) })));
    const [title, setTitle] = useState(f.starter.title);
    const [body, setBody] = useState(f.starter.body);
    const [hasMedia, setHasMedia] = useState(true);

    const limit = hasMedia ? f.limitWithMedia : f.limitWithoutMedia;
    const over = body.length > limit;
    const visible = hasMedia ? items : items.filter((i) => i.id !== "media");

    const move = (id: Part["id"], d: -1 | 1) =>
        setItems((curr) => {
            const i = curr.findIndex((c) => c.id === id);
            const j = i + d;
            if (i < 0 || j < 0 || j >= curr.length) return curr;
            const next = curr.slice();
            [next[i], next[j]] = [next[j], next[i]];
            return next;
        });

    const row = (p: Part, i: number) => (
        <div className="flex items-start gap-3">
            {drag && (
                <span aria-hidden className="v2-mono mt-0.5 select-none text-[14px] leading-none text-[var(--v2-muted)]">
                    ⋮⋮
                </span>
            )}
            <div className="min-w-0 flex-1">
                <p className="v2-mono mb-1 text-[11px] text-[var(--v2-muted)]">{p.id}</p>
                {p.id === "title" && (
                    <input value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Card title" className="w-full bg-transparent text-[16px] font-medium leading-snug text-[var(--v2-ink)] outline-none" />
                )}
                {p.id === "body" && (
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value.slice(0, limit + 50))}
                        rows={3}
                        aria-label="Card body"
                        className={cn("w-full resize-none bg-transparent text-[15px] leading-snug outline-none", over ? "text-[var(--v2-redline)]" : "text-[var(--v2-ink)]")}
                    />
                )}
                {p.id === "media" && (
                    <span className="v2-riso relative block h-14 overflow-hidden rounded-[6px]">
                        <Image src={image} alt="" fill sizes="320px" className="object-cover" />
                    </span>
                )}
            </div>
            {!drag && (
                <span className="flex shrink-0 gap-1">
                    {(["up", "down"] as const).map((dir) => (
                        <button
                            key={dir}
                            type="button"
                            disabled={dir === "up" ? i === 0 : i === visible.length - 1}
                            onClick={() => move(p.id, dir === "up" ? -1 : 1)}
                            aria-label={`Move ${p.label} ${dir}`}
                            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--v2-rule)] text-[var(--v2-oxblood)] disabled:opacity-25"
                        >
                            {dir === "up" ? "↑" : "↓"}
                        </button>
                    ))}
                </span>
            )}
        </div>
    );

    const rowClass = "border border-[var(--v2-rule)] bg-[var(--v2-paper)] p-3";

    return (
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_16rem] md:gap-8">
            {/* the editor */}
            <div className="bg-[#f7f3ec] p-5 shadow-[0_30px_50px_-32px_rgba(60,10,12,0.55)]">
                <div className="mb-4 flex items-center justify-between gap-3">
                    <p className="v2-mono text-[12px] text-[var(--v2-muted)]">{f.editorLabel.toLowerCase()}</p>
                    <button
                        type="button"
                        aria-pressed={!hasMedia}
                        onClick={() => setHasMedia((m) => !m)}
                        className="v2-mono min-h-11 rounded-full border border-[var(--v2-rule)] px-4 text-[12px] text-[var(--v2-oxblood)] hover:bg-[rgb(107_15_18/0.06)] md:min-h-9"
                    >
                        {hasMedia ? f.removeMedia : f.addMedia}
                    </button>
                </div>

                {drag ? (
                    <Reorder.Group
                        axis="y"
                        values={visible}
                        onReorder={(next: Part[]) => setItems(hasMedia ? next : [...next, items.find((i) => i.id === "media")!])}
                        className="space-y-2"
                    >
                        {visible.map((p, i) => (
                            <Reorder.Item key={p.id} value={p} whileDrag={{ scale: 1.02, rotate: -1 }} className={cn(rowClass, "cursor-grab active:cursor-grabbing")}>
                                {row(p, i)}
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                ) : (
                    <ul className="space-y-2">
                        {visible.map((p, i) => (
                            <motion.li layout key={p.id} className={rowClass}>
                                {row(p, i)}
                            </motion.li>
                        ))}
                    </ul>
                )}

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--v2-rule)] pt-3">
                    <p className="v2-mono text-[11px] text-[var(--v2-muted)]">{drag ? f.tryDrag : f.tryButtons}</p>
                    <motion.span
                        key={`${limit}-${over}`}
                        initial={{ scale: 1.25 }}
                        animate={{ scale: 1 }}
                        className={cn("v2-mono shrink-0 text-[13px] tabular-nums", over ? "text-[var(--v2-redline)]" : "text-[var(--v2-ink)]")}
                    >
                        {body.length} / {limit}
                    </motion.span>
                </div>
                <AnimatePresence>
                    {over && (
                        <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-[13px] text-[var(--v2-redline)]" aria-live="polite">
                            {f.overBy(body.length - limit)}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {/* the learner card is a rendering of the parts */}
            <div>
                <div className="flex aspect-[958/1159] flex-col gap-3 overflow-hidden rounded-[18px] border border-white/10 bg-[linear-gradient(160deg,#241a1a_0%,#120d0d_100%)] p-4 text-[#f2ece3] shadow-[0_28px_60px_-28px_rgba(10,4,4,0.85)]">
                    {visible.map((p) => (
                        <motion.div layout key={p.id} className={p.id === "media" ? "min-h-0 flex-1" : ""}>
                            {p.id === "title" && <p className="text-[17px] font-medium leading-snug">{title}</p>}
                            {p.id === "body" && <p className="line-clamp-6 text-[13px] leading-snug text-white/75">{body}</p>}
                            {p.id === "media" && (
                                <span className="v2-riso relative block h-full min-h-16 overflow-hidden rounded-[8px]">
                                    <Image src={image} alt="" fill sizes="256px" className="object-cover" />
                                </span>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
