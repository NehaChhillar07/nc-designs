"use client";

// The hero desk. The work sits on the paper as pieces you can drag, throw and
// inspect. Scroll down (or press "tidy up") and every piece files itself into
// its row in the work list; scroll back up and they return to wherever you
// left them. Rules: design-system/neha-portfolio/pages/home-v2.md, "Desk".
//
// How the flight works: a piece and its row's slot share a layoutId. Only one
// of them is mounted at a time (desk while messy, slot while tidy), so Motion
// animates the element from one box to the other.

import {
    LayoutGroup,
    motion,
    useDragControls,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
    useVelocity,
} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type ReactNode,
    type RefObject,
} from "react";
import { flushSync } from "react-dom";

import { useCursor } from "@/components/ui/cursor-context";
import { homeV2Data, type DeskFan, type DeskPlacement, type WorkRow } from "@/data/home-v2-data";
import { CAL_LINK, resolveToken } from "@/lib/placeholders";
import { useIsDesktop } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

import { useFinePointer } from "./motion";

const { work, desk, hero } = homeV2Data;

// Thumbnails render at this size on the desk AND in the slots, so both ask
// for the same image URL and the slot never waits on a download mid-flight.
const PIECE_SIZES = "320px";
const ZERO = { x: 0, y: 0 };
const FLIGHT = { type: "spring", stiffness: 160, damping: 22, mass: 0.9 } as const;

// ---------- tidy state ----------

type DeskCtx = {
    tidy: boolean;
    workRef: RefObject<HTMLElement | null>;
};
const DeskContext = createContext<DeskCtx | null>(null);

function useDesk() {
    const ctx = useContext(DeskContext);
    if (!ctx) throw new Error("useDesk must be used inside <DeskProvider>");
    return ctx;
}

// Tidy follows the work list's position, with a gap between the two
// thresholds so the pieces don't flicker back and forth at the boundary.
export function DeskProvider({ children }: { children: ReactNode }) {
    const [tidy, setTidy] = useState(false);
    const workRef = useRef<HTMLElement | null>(null);
    const tidyRef = useRef(tidy);
    useEffect(() => {
        tidyRef.current = tidy;
    }, [tidy]);

    useEffect(() => {
        let frame = 0;
        const check = () => {
            frame = 0;
            const el = workRef.current;
            if (!el) return;
            const top = el.getBoundingClientRect().top;
            const vh = window.innerHeight;
            if (!tidyRef.current && top < vh * 0.72) setTidy(true);
            else if (tidyRef.current && top > vh * 0.9) setTidy(false);
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(check);
        };
        check();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return (
        <DeskContext.Provider value={{ tidy, workRef }}>
            <LayoutGroup id="desk">{children}</LayoutGroup>
        </DeskContext.Provider>
    );
}

export function useWorkRef() {
    return useDesk().workRef;
}

// ---------- a row's slot in the work list ----------

export function WorkSlot({ row, index }: { row: WorkRow; index: number }) {
    const { tidy } = useDesk();
    // Phones have no desk, so there is nothing to fly in: the slot just shows
    // its print. On desktop it fills when the desk is tidied.
    const desktop = useIsDesktop();
    const filled = tidy || !desktop;
    // Featured work gets a big slot, so its big print lands big.
    const size = row.tier === "featured" ? "w-[104px] lg:w-[168px]" : "w-14 lg:w-[72px]";
    return (
        <span className={cn("relative block shrink-0", size, PRINT_ASPECT)}>
            {/* The empty slot reads as a place waiting for its print. */}
            <span aria-hidden className="absolute inset-0 border border-dashed border-[var(--v2-rule)]" />
            {filled && (
                <motion.span
                    layoutId={desktop ? `piece-${row.id}` : undefined}
                    className="absolute inset-0 block shadow-[0_6px_14px_-8px_rgba(60,10,12,0.5)]"
                    transition={{ layout: { ...FLIGHT, delay: index * 0.045 } }}
                    style={{ rotate: 0 }}
                >
                    <Print row={row} />
                </motion.span>
            )}
        </span>
    );
}

// ---------- a print ----------
//
// A project as a photo print: cream border, the screenshot cropped in tight,
// the name and year typed on the bottom edge. The desk piece and the list slot
// render the same print at different widths. Everything inside is sized in
// percentages and container units (cqw), so the small one is an exact
// scaled-down copy and the flight between them never distorts.

const PRINT_ASPECT = "aspect-[100/86]";

// Also used by the resume route (journey.tsx), so the work looks the same everywhere.
export function Print({ row }: { row: WorkRow }) {
    return (
        <span className={cn("flex w-full flex-col bg-[#f7f3ec] p-[4%] pb-0 [container-type:inline-size]", PRINT_ASPECT)}>
            <span className="relative block flex-1 overflow-hidden bg-[var(--v2-ink)]">
                <Image
                    src={row.thumb}
                    alt=""
                    fill
                    sizes={PIECE_SIZES}
                    draggable={false}
                    // The thumbnails carry wide dark margins; crop into the UI.
                    className="pointer-events-none scale-[1.3] object-cover"
                />
            </span>
            <span className="v2-mono flex h-[13cqw] items-center justify-between gap-[2cqw] text-[5cqw] leading-none">
                <span className="truncate text-[var(--v2-ink)]">{row.name.toLowerCase()}</span>
                <span className="shrink-0 text-[var(--v2-muted)]">{row.year}</span>
            </span>
        </span>
    );
}

// ---------- the desk ----------

type PieceSpec = {
    key: string;
    placement: DeskPlacement;
    label: string;
    meta?: string;
    href?: string;
    // Work pieces fly to the list; extras (note, polaroid) stay on the desk.
    flies?: { row: WorkRow; index: number };
    render: (selected: boolean) => ReactNode;
    // Pieces with a fixed shape (the note, the polaroid) don't resize.
    resizable?: boolean;
    // Members of the "more work" pile, and where each moves when it fans out.
    fan?: DeskFan;
    // The inspect frame's link text, when it isn't "open case study".
    openLabel?: string;
};

const isExternal = (href: string) => /^https?:/.test(href);

export function Desk({ className }: { className?: string }) {
    const { tidy } = useDesk();
    const deskRef = useRef<HTMLDivElement>(null);
    const [selected, setSelected] = useState<string | null>(null);
    const [order, setOrder] = useState<string[]>([]);
    // Where each piece was left and how wide it was resized. Kept here, not in
    // the piece, because work pieces unmount while they sit in the list; this
    // is what sends them back to the spot you left them.
    const [offsets, setOffsets] = useState<Record<string, { x: number; y: number }>>({});
    const [widths, setWidths] = useState<Record<string, number>>({});
    const moveBy = useCallback((key: string, dx: number, dy: number) => {
        setOffsets((o) => ({ ...o, [key]: { x: (o[key]?.x ?? 0) + dx, y: (o[key]?.y ?? 0) + dy } }));
    }, []);
    const resize = useCallback((key: string, w: number) => setWidths((o) => ({ ...o, [key]: w })), []);

    // The pile fans out while the pointer (or keyboard focus) is on it. A short
    // grace period on leave, so moving from one print to the next doesn't
    // snap it shut. On phones there's no hover, so it's always fanned.
    const fine = useFinePointer();
    const [pileOpen, setPileOpen] = useState(false);
    const pileTimer = useRef<number | undefined>(undefined);
    const onPileHover = useCallback((on: boolean) => {
        window.clearTimeout(pileTimer.current);
        if (on) setPileOpen(true);
        else pileTimer.current = window.setTimeout(() => setPileOpen(false), 160);
    }, []);
    useEffect(() => () => window.clearTimeout(pileTimer.current), []);
    // A print dragged out of the pile leaves it for good: its fanned spot and
    // tilt are committed into its offset, so it doesn't jump when the pile closes.
    const [loose, setLoose] = useState<Record<string, number>>({});
    const loosen = useCallback(
        (key: string, fan: { dx: number; dy: number; r: number }) => {
            flushSync(() => {
                setLoose((o) => ({ ...o, [key]: fan.r }));
                moveBy(key, fan.dx, fan.dy);
            });
        },
        [moveBy],
    );
    const fanned = !fine || pileOpen;

    const bringToFront = useCallback((key: string) => {
        setOrder((o) => [...o.filter((k) => k !== key), key]);
    }, []);

    // Clicking bare desk, or tidying up, clears the selection.
    useEffect(() => {
        if (!selected) return;
        const onDown = (e: PointerEvent) => {
            if (!(e.target as HTMLElement).closest("[data-piece]")) setSelected(null);
        };
        window.addEventListener("pointerdown", onDown);
        return () => window.removeEventListener("pointerdown", onDown);
    }, [selected]);
    // Filing the pieces away clears the inspect frame.
    const [wasTidy, setWasTidy] = useState(tidy);
    if (tidy !== wasTidy) {
        setWasTidy(tidy);
        if (tidy) setSelected(null);
    }

    const pieces: PieceSpec[] = [
        ...work.rows.map((row, index) => ({
            key: row.id,
            placement: row.desk,
            label: row.name,
            meta: `${work.statusLabels[row.status]} · ${row.year}`,
            href: row.href,
            flies: { row, index },
            resizable: true,
            fan: row.fan,
            render: () => <Print row={row} />,
        })),
        {
            key: "nda",
            placement: desk.nda.desk,
            label: desk.nda.label,
            meta: desk.nda.meta,
            href: resolveToken(CAL_LINK) ?? undefined,
            openLabel: desk.nda.open,
            render: () => <FaceDown />,
        },
        {
            key: "note",
            placement: desk.note.desk,
            label: desk.note.lines.join(" "),
            render: () => (
                <span className="relative block bg-[#ead3c2] px-3 pb-4 pt-5 text-[var(--v2-oxblood)] md:px-4 md:pb-5 md:pt-6" style={{ fontFamily: "var(--font-caveat), cursive" }}>
                    {/* A strip of oxblood tape holding it down, slightly translucent like real tape. */}
                    <span aria-hidden className="absolute -top-2 left-1/2 h-4 w-14 -translate-x-1/2 -rotate-2 bg-[var(--v2-oxblood)] opacity-90" />
                    {desk.note.lines.map((l) => (
                        <span key={l} className="block whitespace-nowrap text-[17px] leading-[1.05] md:text-[22px]">
                            {l}
                        </span>
                    ))}
                </span>
            ),
        },
        {
            key: "polaroid",
            placement: desk.polaroid.desk,
            label: desk.polaroid.caption,
            render: (sel) => (
                <span className="block bg-[#f7f3ec] p-1.5 pb-0">
                    <span className="relative block aspect-[4/5] w-full overflow-hidden">
                        <Image
                            src={hero.portrait}
                            alt={hero.portraitAlt}
                            fill
                            sizes="140px"
                            draggable={false}
                            className={cn("pointer-events-none object-cover object-top transition-[filter] duration-500", sel ? "grayscale-0" : "grayscale")}
                        />
                    </span>
                    <span className="block px-1 py-2 text-[13px] leading-tight text-[var(--v2-ink)]" style={{ fontFamily: "var(--font-caveat), cursive" }}>
                        {desk.polaroid.caption}
                    </span>
                </span>
            ),
        },
    ];

    return (
        <div ref={deskRef} className={cn("pointer-events-none", className)}>
            {pieces.map((p, i) => {
                if (p.flies && tidy) return null;
                return (
                    <Piece
                        key={p.key}
                        spec={p}
                        index={i}
                        deskRef={deskRef}
                        selected={selected === p.key}
                        offset={offsets[p.key] ?? ZERO}
                        width={widths[p.key] ?? null}
                        onMove={(dx, dy) => moveBy(p.key, dx, dy)}
                        onResize={(w) => resize(p.key, w)}
                        onSelect={() => setSelected(p.key)}
                        onDeselect={() => setSelected(null)}
                        z={order.indexOf(p.key) + 1}
                        onFront={() => bringToFront(p.key)}
                        fanned={Boolean(p.fan) && fanned && !(p.key in loose)}
                        extraTilt={loose[p.key] ?? 0}
                        onPileHover={p.fan && !(p.key in loose) ? onPileHover : undefined}
                        onLoosen={p.fan && !(p.key in loose) ? (f) => loosen(p.key, fanned ? f : { dx: 0, dy: 0, r: 0 }) : undefined}
                    />
                );
            })}

            {!tidy && (
                <DeskNote spot={desk.pileLabel.desk} index={pieces.length} className="hidden text-[22px] md:block">
                    {desk.pileLabel.text}
                </DeskNote>
            )}
        </div>
    );
}

// A handwritten note written straight on the desk (not a piece: it can't be
// dragged). Drops in with the pieces, and stays out of the pointer's way.
function DeskNote({
    spot,
    index,
    className,
    children,
}: {
    spot: { desktop: { x: number; y: number }; phone: { x: number; y: number } };
    index: number;
    className?: string;
    children: ReactNode;
}) {
    const desktop = useIsDesktop();
    const at = desktop ? spot.desktop : spot.phone;
    return (
        <span
            aria-hidden
            className={cn("v2-drop pointer-events-none absolute -rotate-3 whitespace-nowrap leading-none text-[var(--v2-oxblood)]", className)}
            style={{ "--i": index, left: `${at.x}%`, top: `${at.y}%`, fontFamily: "var(--font-caveat), cursive" } as CSSProperties}
        >
            {children}
        </span>
    );
}

// Current work under NDA. Only two facts, set as a clear hierarchy: the
// company, large in the display serif, and the industry, small and light in
// mono underneath. Nothing else on the card. Sized in cqw, so the desk piece
// and the phone deck card are the same card at different widths.
export function FaceDown() {
    return (
        <span
            className={cn(
                "flex w-full flex-col justify-end bg-[#f7f3ec] p-[9%] [container-type:inline-size]",
                PRINT_ASPECT,
            )}
        >
            {/* Instrument Serif ships in one weight; a hairline stroke in the
                same colour gives it the extra weight. */}
            <span
                className="v2-display block text-[20cqw] leading-[0.9] tracking-[-0.015em] text-[var(--v2-oxblood)]"
                style={{ WebkitTextStroke: "0.035em currentColor" }}
            >
                {desk.nda.company}
            </span>
            <span className="v2-mono mt-[5cqw] block text-[6.2cqw] font-medium leading-snug text-[rgb(26_20_20/0.72)]">
                {desk.nda.industry}
            </span>
        </span>
    );
}

// ---------- one piece ----------

function Piece({
    spec,
    index,
    deskRef,
    selected,
    onSelect,
    onDeselect,
    z,
    onFront,
    offset,
    width,
    onMove,
    onResize,
    fanned,
    extraTilt,
    onPileHover,
    onLoosen,
}: {
    spec: PieceSpec;
    index: number;
    deskRef: RefObject<HTMLDivElement | null>;
    selected: boolean;
    onSelect: () => void;
    onDeselect: () => void;
    z: number;
    onFront: () => void;
    offset: { x: number; y: number };
    width: number | null;
    onMove: (dx: number, dy: number) => void;
    onResize: (w: number) => void;
    fanned: boolean;
    extraTilt: number;
    onPileHover?: (on: boolean) => void;
    onLoosen?: (fan: { dx: number; dy: number; r: number }) => void;
}) {
    const router = useRouter();
    const fine = useFinePointer();
    const desktop = useIsDesktop();
    const { setCursor, resetCursor } = useCursor();
    const controls = useDragControls();
    const home = desktop ? spec.placement.desktop : spec.placement.phone;

    // The offset from home is committed after each drag, so the layout box is
    // always the real position (the flight starts from there).
    const [dragging, setDragging] = useState(false);

    // Motion snapshots a draggable element's layout on every re-render, so
    // left/top changes (a committed throw, an arrow-key nudge) would animate
    // as layout changes: the piece would snap back and glide. Layout only
    // animates while a work piece is landing back on the desk after a tidy;
    // after that, every layout change is instant.
    const [landing, setLanding] = useState(Boolean(spec.flies));
    useEffect(() => {
        if (!landing) return;
        const t = window.setTimeout(() => setLanding(false), 1400);
        return () => window.clearTimeout(t);
    }, [landing]);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    // Leans into the throw, settles upright-ish when it stops.
    const lean = useSpring(useTransform(useVelocity(x), [-1600, 0, 1600], [-12, 0, 12], { clamp: true }), {
        stiffness: 260,
        damping: 24,
    });
    // The resting tilt is a motion value, so it follows changes (phone vs
    // desktop home, a print leaving the pile) without remounting.
    const tilt = useMotionValue(home.r + extraTilt);
    useEffect(() => {
        tilt.set(home.r + extraTilt);
    }, [tilt, home.r, extraTilt]);
    const rotate = useTransform([tilt, lean], ([t, l]: number[]) => t + l);
    const fan = spec.fan ? (desktop ? spec.fan.desktop : spec.fan.phone) : null;

    const commit = () => {
        flushSync(() => onMove(x.get(), y.get()));
        x.set(0);
        y.set(0);
    };

    const open = () => {
        if (!spec.href) return;
        if (isExternal(spec.href)) window.open(spec.href, "_blank", "noopener,noreferrer");
        else router.push(spec.href);
    };

    // Hovering (or keyboard focus) shows the inspect frame, so one click opens.
    const [peek, setPeek] = useState(false);
    const inspecting = selected || (peek && !dragging);

    // A press that barely moves is a click: open it, or select a piece with nowhere to go.
    const down = useRef<{ x: number; y: number } | null>(null);
    const onPointerDown = (e: React.PointerEvent) => {
        onFront();
        down.current = { x: e.clientX, y: e.clientY };
        if (fine) controls.start(e);
    };
    const onPointerUp = (e: React.PointerEvent) => {
        const d = down.current;
        down.current = null;
        if (!d || Math.hypot(e.clientX - d.x, e.clientY - d.y) > 4) return;
        if (spec.href) open();
        else onSelect();
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        const step = e.shiftKey ? 32 : 8;
        const moves: Record<string, [number, number]> = {
            ArrowLeft: [-step, 0],
            ArrowRight: [step, 0],
            ArrowUp: [0, -step],
            ArrowDown: [0, step],
        };
        const m = moves[e.key];
        if (m) {
            e.preventDefault();
            onMove(m[0], m[1]);
            onFront();
        } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (spec.href) open();
            else onSelect();
        } else if (e.key === "Escape") {
            onDeselect();
        }
    };

    const w = width ?? home.w;

    const body = (
        <motion.div
            data-piece
            layoutId={spec.flies ? `piece-${spec.key}` : undefined}
            transition={{
                layout: landing && spec.flies ? { ...FLIGHT, delay: spec.flies.index * 0.045 } : { duration: 0 },
            }}
            drag={fine}
            dragListener={false}
            dragControls={controls}
            dragConstraints={deskRef}
            dragElastic={0.14}
            dragTransition={{ power: 0.28, timeConstant: 260, bounceStiffness: 260, bounceDamping: 22 }}
            onDragStart={() => {
                if (onLoosen && fan) onLoosen(fan);
                setDragging(true);
            }}
            onDragEnd={() => setDragging(false)}
            onDragTransitionEnd={commit}
            whileDrag={{ scale: 1.04 }}
            style={{ x, y, rotate }}
            tabIndex={0}
            role="button"
            aria-label={`${spec.label}${spec.meta ? `, ${spec.meta}` : ""}. ${desk.keysHint}`}
            aria-pressed={selected}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onKeyDown={onKeyDown}
            onPointerEnter={() => {
                if (fine) {
                    setCursor("tag", spec.href ? desk.pieceHint : "drag");
                    setPeek(true);
                }
                onPileHover?.(true);
            }}
            onPointerLeave={() => {
                resetCursor();
                setPeek(false);
                onPileHover?.(false);
            }}
            onFocus={() => {
                setPeek(true);
                onPileHover?.(true);
            }}
            onBlur={() => {
                setPeek(false);
                onPileHover?.(false);
            }}
            className={cn(
                "pointer-events-auto relative block touch-manipulation select-none outline-none",
                fine && "cursor-grab active:cursor-grabbing",
                "transition-shadow duration-300",
                dragging
                    ? "shadow-[0_40px_60px_-30px_rgba(60,10,12,0.6)]"
                    : "shadow-[0_18px_30px_-20px_rgba(60,10,12,0.55)]",
                "focus-visible:ring-2 focus-visible:ring-[var(--v2-oxblood)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--v2-paper)]",
            )}
        >
            {spec.render(inspecting)}
            {inspecting && (
                <Selection
                    spec={spec}
                    width={w}
                    onResize={spec.resizable && fine ? onResize : undefined}
                />
            )}
        </motion.div>
    );

    return (
        <div
            className="v2-drop absolute"
            style={
                {
                    "--i": index,
                    left: `calc(${home.x}% + ${offset.x}px)`,
                    top: `calc(${home.y}% + ${offset.y}px)`,
                    // Desktop widths are designed at 1440 and shrink below it.
                    width: desktop && width === null ? `min(${w}px, ${((w / 1440) * 100).toFixed(2)}vw)` : w,
                    zIndex: inspecting ? 50 : z,
                    // Fanning moves the whole print on its wrapper, so drag and
                    // tilt on the inner element stay independent of it.
                    transform: fanned && fan ? `translate(${fan.dx}px, ${fan.dy}px) rotate(${fan.r}deg)` : undefined,
                    transition: fan && !extraTilt ? "transform 520ms cubic-bezier(0.22, 1, 0.36, 1)" : undefined,
                } as CSSProperties
            }
        >
            {body}
        </div>
    );
}

// ---------- the inspect frame (the Figma cherry) ----------

function Selection({ spec, width, onResize }: { spec: PieceSpec; width: number; onResize?: (w: number) => void }) {
    const start = useRef<{ x: number; w: number } | null>(null);

    return (
        <span className="v2-select pointer-events-none absolute -inset-2 block">
            <span aria-hidden className="absolute inset-0 border border-[var(--v2-redline)]" />
            {(["-left-[4px] -top-[4px]", "-right-[4px] -top-[4px]", "-left-[4px] -bottom-[4px]"] as const).map((pos) => (
                <span key={pos} aria-hidden className={cn("absolute h-[7px] w-[7px] border border-[var(--v2-redline)] bg-[var(--v2-paper)]", pos)} />
            ))}
            {/* The bottom-right handle actually resizes. */}
            <span
                aria-hidden
                className={cn(
                    "absolute -bottom-[5px] -right-[5px] h-[9px] w-[9px] border border-[var(--v2-redline)] bg-[var(--v2-paper)]",
                    onResize && "pointer-events-auto cursor-nwse-resize",
                )}
                onPointerDown={(e) => {
                    if (!onResize) return;
                    e.stopPropagation();
                    e.currentTarget.setPointerCapture(e.pointerId);
                    start.current = { x: e.clientX, w: width };
                }}
                onPointerMove={(e) => {
                    if (!start.current || !onResize) return;
                    const s = start.current;
                    onResize(Math.round(Math.max(110, Math.min(420, s.w + (e.clientX - s.x)))));
                }}
                onPointerUp={() => (start.current = null)}
            />
            <span aria-hidden className="v2-mono absolute -top-[22px] left-[-1px] whitespace-nowrap bg-[var(--v2-redline)] px-1.5 text-[10px] leading-[16px] text-white">
                {spec.label.toLowerCase()}
                {spec.meta ? ` · ${spec.meta}` : ""}
            </span>
            <span aria-hidden className="v2-mono absolute -bottom-[20px] right-0 text-[10px] text-[var(--v2-redline)]">{width} w</span>
            {spec.href && (
                <Link
                    href={spec.href}
                    {...(isExternal(spec.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="v2-mono pointer-events-auto absolute -bottom-[22px] left-[-1px] whitespace-nowrap text-[11px] text-[var(--v2-oxblood)] underline decoration-[var(--v2-rule)] underline-offset-2 hover:decoration-[var(--v2-oxblood)]"
                >
                    {spec.openLabel ?? desk.open} {spec.href && isExternal(spec.href) ? "↗" : "→"}
                </Link>
            )}
        </span>
    );
}

// ---------- tidy button ----------

export function TidyButton({ className }: { className?: string }) {
    const { workRef } = useDesk();
    const reduce = useReducedMotion();
    return (
        <button
            type="button"
            onClick={() => workRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })}
            className={cn("v2-mono group inline-flex items-center gap-2 text-[12px] text-[var(--v2-oxblood)]", className)}
        >
            <span className="v2-link">{desk.tidy}</span>
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
            </span>
        </button>
    );
}
