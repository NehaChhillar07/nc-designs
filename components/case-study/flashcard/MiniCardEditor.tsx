"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion, Reorder } from "motion/react";
import { GripVertical, ImagePlus, ImageOff, ChevronUp, ChevronDown } from "lucide-react";

type Component = { id: "title" | "body" | "media"; label: string };

const STARTER_TITLE = "Data Privacy isn't paperwork.";
const STARTER_BODY =
    "It's the difference between trust and a public incident. Most breaches start with a small choice.";

export function MiniCardEditor({
    guidance,
    limitWithMedia,
    limitWithoutMedia,
}: {
    guidance: string;
    limitWithMedia: number;
    limitWithoutMedia: number;
}) {
    const reduce = useReducedMotion();
    const [items, setItems] = useState<Component[]>([
        { id: "title", label: "Title" },
        { id: "body", label: "Body" },
        { id: "media", label: "Media" },
    ]);
    const [title, setTitle] = useState(STARTER_TITLE);
    const [body, setBody] = useState(STARTER_BODY);
    const [hasMedia, setHasMedia] = useState(true);

    const limit = hasMedia ? limitWithMedia : limitWithoutMedia;
    const overLimit = body.length > limit;
    const remaining = limit - body.length;

    const visibleItems = hasMedia ? items : items.filter((i) => i.id !== "media");

    // Reduced-motion / no-drag fallback uses up/down buttons
    function moveItem(id: string, dir: -1 | 1) {
        setItems((curr) => {
            const idx = curr.findIndex((c) => c.id === id);
            if (idx === -1) return curr;
            const target = idx + dir;
            if (target < 0 || target >= curr.length) return curr;
            const next = curr.slice();
            const [m] = next.splice(idx, 1);
            next.splice(target, 0, m);
            return next;
        });
    }

    return (
        <div className="my-10 grid md:grid-cols-[1fr_320px] gap-6 items-start">
            {/* Editor */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Inline card editor
                    </p>
                    <button
                        onClick={() => setHasMedia((m) => !m)}
                        className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md border border-gray-200 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                    >
                        {hasMedia ? (
                            <>
                                <ImageOff
                                    className="w-3.5 h-3.5 text-gray-500"
                                    aria-hidden
                                />
                                Remove media
                            </>
                        ) : (
                            <>
                                <ImagePlus
                                    className="w-3.5 h-3.5 text-gray-500"
                                    aria-hidden
                                />
                                Add media
                            </>
                        )}
                    </button>
                </div>

                {reduce ? (
                    <ul className="space-y-2">
                        {visibleItems.map((item, i) => (
                            <li
                                key={item.id}
                                className="rounded-lg border border-gray-200 bg-gray-50/40 p-3"
                            >
                                <ComponentRow
                                    item={item}
                                    title={title}
                                    body={body}
                                    setTitle={setTitle}
                                    setBody={setBody}
                                    limit={limit}
                                    overLimit={overLimit}
                                    canMoveUp={i > 0}
                                    canMoveDown={i < visibleItems.length - 1}
                                    onMoveUp={() => moveItem(item.id, -1)}
                                    onMoveDown={() => moveItem(item.id, 1)}
                                    showButtons
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <Reorder.Group
                        axis="y"
                        values={visibleItems}
                        onReorder={(next) => {
                            // Map back to full items list, preserving order while keeping hidden media in place if needed
                            if (hasMedia) {
                                setItems(next as Component[]);
                            } else {
                                // Restore media to its slot relative to the others
                                const mediaItem = items.find(
                                    (i) => i.id === "media"
                                )!;
                                setItems([...(next as Component[]), mediaItem]);
                            }
                        }}
                        className="space-y-2"
                    >
                        {visibleItems.map((item) => (
                            <Reorder.Item
                                key={item.id}
                                value={item}
                                whileDrag={{ scale: 1.02, zIndex: 5 }}
                                className="cursor-grab active:cursor-grabbing rounded-lg border border-gray-200 bg-gray-50/40 p-3"
                            >
                                <ComponentRow
                                    item={item}
                                    title={title}
                                    body={body}
                                    setTitle={setTitle}
                                    setBody={setBody}
                                    limit={limit}
                                    overLimit={overLimit}
                                />
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                )}

                {/* Guidance + counter */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                    <p className="text-[11px] text-gray-500 leading-relaxed flex-1 pr-3">
                        {guidance}
                    </p>
                    <motion.span
                        key={`${limit}-${body.length}`}
                        initial={reduce ? false : { scale: 1.08 }}
                        animate={reduce ? undefined : { scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className={`text-[11px] tabular-nums font-medium ${
                            overLimit
                                ? "text-red-600"
                                : remaining < 30
                                    ? "text-amber-600"
                                    : "text-gray-500"
                        }`}
                    >
                        {body.length} / {limit}
                    </motion.span>
                </div>
            </div>

            {/* Side caption */}
            <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Try it
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                    {reduce
                        ? "Use the up/down buttons to reorder. Toggle media to see the character limit drop from 500 to 200."
                        : "Drag a component to reorder. Toggle media to see the limit drop from 500 to 200."}
                </p>
                <AnimatePresence>
                    {overLimit && (
                        <motion.p
                            initial={reduce ? false : { opacity: 0, y: 4 }}
                            animate={reduce ? undefined : { opacity: 1, y: 0 }}
                            exit={reduce ? undefined : { opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="text-xs text-red-600 leading-relaxed"
                        >
                            Over the limit by {body.length - limit} chars. Remove media
                            or trim text.
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function ComponentRow({
    item,
    title,
    body,
    setTitle,
    setBody,
    limit,
    overLimit,
    showButtons,
    canMoveUp,
    canMoveDown,
    onMoveUp,
    onMoveDown,
}: {
    item: Component;
    title: string;
    body: string;
    setTitle: (v: string) => void;
    setBody: (v: string) => void;
    limit: number;
    overLimit: boolean;
    showButtons?: boolean;
    canMoveUp?: boolean;
    canMoveDown?: boolean;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
}) {
    return (
        <div className="flex items-start gap-2">
            <GripVertical
                className="w-4 h-4 text-gray-300 mt-1 flex-shrink-0"
                aria-hidden
            />
            <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    {item.label}
                </p>
                {item.id === "title" && (
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full text-sm font-medium text-gray-900 bg-transparent border-0 outline-none focus:ring-0 p-0 leading-snug"
                        aria-label="Card title"
                    />
                )}
                {item.id === "body" && (
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value.slice(0, limit + 50))}
                        className={`w-full text-sm bg-transparent border-0 outline-none focus:ring-0 p-0 leading-snug resize-none ${
                            overLimit ? "text-red-600" : "text-gray-600"
                        }`}
                        rows={3}
                        aria-label="Card body"
                    />
                )}
                {item.id === "media" && (
                    <div
                        className="mt-1 rounded-md h-16 flex items-center justify-center text-[11px] text-gray-400"
                        style={{
                            background:
                                "linear-gradient(135deg, #f4f4f5 0%, #e4e4e7 100%)",
                        }}
                    >
                        Media slot
                    </div>
                )}
            </div>
            {showButtons && (
                <div className="flex flex-col gap-0.5 flex-shrink-0">
                    <button
                        onClick={onMoveUp}
                        disabled={!canMoveUp}
                        aria-label={`Move ${item.label} up`}
                        className="w-6 h-6 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                    >
                        <ChevronUp className="w-3.5 h-3.5" aria-hidden />
                    </button>
                    <button
                        onClick={onMoveDown}
                        disabled={!canMoveDown}
                        aria-label={`Move ${item.label} down`}
                        className="w-6 h-6 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                    >
                        <ChevronDown className="w-3.5 h-3.5" aria-hidden />
                    </button>
                </div>
            )}
        </div>
    );
}
