"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { otherProjects } from "@/data/case-study-data";
import { scrollToSection } from "@/lib/scroll-to-section";

// The phone's navigation. A menu at the top of a phone is the one place a
// thumb cannot reach, so below md the header's links, Resume and Connect all
// move into a pill that floats at the bottom centre. Tapping it raises a card
// of links out of the same spot and the pill becomes Close, so opening and
// closing happen under the same thumb. Work opens in place to list the case
// studies, since they are what a visitor on a phone came for.
//
// Radix Dialog does the hard parts: focus moves into the card and back to the
// pill, Escape and a tap outside close it, and the page behind cannot scroll.

type NavLink = { readonly id: string; readonly label: string } | { readonly href: string; readonly label: string };

/** Homepage sections a phone shows, in page order. Experiments is desktop only. */
const PHONE_SECTIONS = ["work", "writings", "about"] as const;
const DESKTOP_ONLY = new Set<string>(["fun-with-claude"]);

/** The case studies in the order the homepage lists them. */
const HOMEPAGE_ORDER = [
    "/case-study/human-firewall",
    "/case-study/airtel-travel-mode",
    "/case-study/flashcard-training",
    "/case-study/unsaid",
    "/case-study/ecrime-hub",
];
const CASE_STUDIES = [...otherProjects].sort((a, b) => HOMEPAGE_ORDER.indexOf(a.link) - HOMEPAGE_ORDER.indexOf(b.link));

/** The section whose top has passed 40% of the screen, or the hero. */
function currentSection(): string {
    let current = "home";
    for (const id of PHONE_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = id;
    }
    return current;
}

/** How the pill looks, open or closed. */
const PILL =
    "inline-flex h-12 items-center gap-2 rounded-full bg-gray-900 px-6 text-[0.95rem] font-medium text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
/** Where it sits. The open card's bottom padding matches, so Close lands on Menu. */
const PILL_SPOT = "fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-50 -translate-x-1/2";

const ROW = "flex w-full items-center rounded-2xl px-4 text-left leading-tight outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring";
const ROW_MAIN = "min-h-11 py-2 text-[1.15rem]";
/** A case study under Work: smaller, indented behind a hairline. */
const ROW_CHILD = "min-h-10 py-1.5 pl-5 text-base";
const ROW_IDLE = "text-gray-500 hover:text-gray-900 active:bg-gray-900/[0.04]";
const ROW_ACTIVE = "bg-gray-900/[0.06] text-gray-900";

export function MobileMenu({ links, onConnect }: { links: readonly NavLink[]; onConnect: () => void }) {
    const pathname = usePathname();
    const onHome = pathname === "/";
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("home");
    const [workOpen, setWorkOpen] = useState(false);
    // A section jump waits for the card to finish closing: until then the
    // dialog still holds the page's scroll lock and the scroll would be lost.
    const pendingScroll = useRef<string | null>(null);

    const onOpenChange = (next: boolean) => {
        if (next) {
            const where = onHome ? currentSection() : pathname;
            setActive(where);
            // Opens already expanded when she is in the work or on a case study.
            setWorkOpen(where === "work" || where.startsWith("/case-study/"));
        }
        setOpen(next);
    };

    const goToSection = (e: React.MouseEvent, id: string) => {
        if (!onHome) {
            setOpen(false);
            return; // the link goes to "/#id" and the homepage scrolls on arrival
        }
        e.preventDefault();
        pendingScroll.current = id;
        setOpen(false);
    };

    const afterClose = () => {
        const id = pendingScroll.current;
        pendingScroll.current = null;
        if (!id) return;
        if (id === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.history.replaceState(null, "", "/");
        } else {
            scrollToSection(id);
            window.history.replaceState(null, "", `/#${id}`);
        }
    };

    const phoneLinks = links.filter((link) => !("id" in link && DESKTOP_ONLY.has(link.id)));

    return (
        <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
            <DialogPrimitive.Trigger asChild>
                <button type="button" className={cn(PILL, PILL_SPOT, "md:hidden")} aria-label="Open menu">
                    <Menu aria-hidden="true" className="size-[1.1rem]" />
                    Menu
                </button>
            </DialogPrimitive.Trigger>

            <AnimatePresence onExitComplete={afterClose}>
                {open && (
                    <DialogPrimitive.Portal forceMount>
                        <DialogPrimitive.Overlay asChild forceMount>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 z-50 bg-gray-900/10 backdrop-blur-[2px] md:hidden"
                            />
                        </DialogPrimitive.Overlay>

                        <DialogPrimitive.Content asChild forceMount aria-describedby={undefined}>
                            <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-3 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] outline-none md:hidden">
                                <DialogPrimitive.Title className="sr-only">Menu</DialogPrimitive.Title>

                                {/* Rises out of the pill: scales up from its bottom edge. */}
                                <motion.nav
                                    aria-label="Site"
                                    initial={{ opacity: 0, y: 16, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 12, scale: 0.97 }}
                                    transition={{ duration: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
                                    style={{ transformOrigin: "bottom center" }}
                                    className="max-h-[calc(100dvh-6.5rem)] w-full max-w-sm overflow-y-auto overscroll-contain rounded-[28px] border border-white/70 bg-white/85 p-2 shadow-[0_24px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl"
                                >
                                    <ul>
                                        <li>
                                            <Link
                                                href="/"
                                                onClick={(e) => goToSection(e, "home")}
                                                aria-current={active === "home" ? "page" : undefined}
                                                className={cn(ROW, ROW_MAIN, active === "home" ? ROW_ACTIVE : ROW_IDLE)}
                                            >
                                                Home
                                            </Link>
                                        </li>
                                        {phoneLinks.map((link) => {
                                            if ("id" in link && link.id === "work") {
                                                return (
                                                    <li key={link.label}>
                                                        <button
                                                            type="button"
                                                            onClick={() => setWorkOpen((v) => !v)}
                                                            aria-expanded={workOpen}
                                                            aria-controls="menu-case-studies"
                                                            className={cn(
                                                                ROW,
                                                                ROW_MAIN,
                                                                "justify-between",
                                                                active === "work" ? ROW_ACTIVE : ROW_IDLE,
                                                            )}
                                                        >
                                                            {link.label}
                                                            <ChevronDown
                                                                aria-hidden="true"
                                                                className={cn("size-5 transition-transform duration-200", workOpen && "rotate-180")}
                                                            />
                                                        </button>
                                                        <AnimatePresence initial={false}>
                                                            {workOpen && (
                                                                <motion.ul
                                                                    id="menu-case-studies"
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                                                                    className="ml-4 overflow-hidden border-l border-gray-200"
                                                                >
                                                                    {CASE_STUDIES.map((p) => (
                                                                        <li key={p.link} className="pl-2">
                                                                            <Link
                                                                                href={p.link}
                                                                                onClick={() => setOpen(false)}
                                                                                aria-current={active === p.link ? "page" : undefined}
                                                                                className={cn(ROW, ROW_CHILD, active === p.link ? ROW_ACTIVE : ROW_IDLE)}
                                                                            >
                                                                                {p.name}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </motion.ul>
                                                            )}
                                                        </AnimatePresence>
                                                    </li>
                                                );
                                            }
                                            const isSection = "id" in link;
                                            const isActive = isSection ? active === link.id : active === link.href;
                                            return (
                                                <li key={link.label}>
                                                    <Link
                                                        href={isSection ? `/#${link.id}` : link.href}
                                                        onClick={isSection ? (e) => goToSection(e, link.id) : () => setOpen(false)}
                                                        aria-current={isActive ? "page" : undefined}
                                                        className={cn(ROW, ROW_MAIN, isActive ? ROW_ACTIVE : ROW_IDLE)}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>

                                    <div className="grid grid-cols-2 gap-2 px-2 pb-2 pt-5">
                                        <Link
                                            href="/resume"
                                            onClick={() => setOpen(false)}
                                            className="inline-flex h-11 items-center justify-center rounded-full border border-gray-300 bg-white text-[0.95rem] font-medium text-gray-900 outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        >
                                            Resume
                                        </Link>
                                        {/* A real link for crawlers and new tabs; a tap opens the
                                            Connect overlay instead, as the desktop header does. */}
                                        <Link
                                            href="/#connect"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setOpen(false);
                                                onConnect();
                                            }}
                                            className="inline-flex h-11 items-center justify-center rounded-full bg-gray-900 text-[0.95rem] font-medium text-white outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        >
                                            Connect
                                        </Link>
                                    </div>
                                </motion.nav>

                                {/* Sits exactly where the Menu pill does, so the thumb
                                    that opened the card closes it. */}
                                <DialogPrimitive.Close asChild>
                                    <motion.button
                                        type="button"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                        className={PILL}
                                    >
                                        <X aria-hidden="true" className="size-[1.1rem]" />
                                        Close
                                    </motion.button>
                                </DialogPrimitive.Close>
                            </div>
                        </DialogPrimitive.Content>
                    </DialogPrimitive.Portal>
                )}
            </AnimatePresence>
        </DialogPrimitive.Root>
    );
}
