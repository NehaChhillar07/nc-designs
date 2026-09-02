"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCursor } from "@/components/ui/cursor-context";
import { scrollToSection } from "@/lib/scroll-to-section";
import { HeroCardFan } from "@/components/case-study/flashcard/HeroCardFan";
import { flashcardTrainingCaseStudyData } from "@/data/flashcard-training-data";
import { GITHUB_UNSAID, resolveToken } from "@/lib/placeholders";

const FLASHCARD_PROJECT_ID = 5;
const FLASHCARD_FAN_CARDS = flashcardTrainingCaseStudyData.whyFlashcards.cards;

// Soft blurred shadow blob placed behind the auto-cycling card deck so the
// stack reads against the dark background.
function FlashcardHighlightBlock() {
    return (
        <div
            aria-hidden
            className="absolute rounded-full pointer-events-none"
            style={{
                width: "55%",
                height: "55%",
                background: "rgba(255, 255, 255, 0.12)",
                filter: "blur(70px)",
            }}
        />
    );
}

// ============================================
// PROJECT DATA - Replace with your real content
// ============================================

// Blur placeholder for smooth image loading (prevents whitespace)
const BLUR_PLACEHOLDER = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAQMDBAMBAAAAAAAAAAAAAQIDBAAFEQYSITETQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgARIUH/2gAMAwEAAhEDEEA/AKNzu1wvN2dc8r7kVtxQ2NKBSnaCQDnPOcnPFKUpSlKXAWMnZ//Z";

// Shape is declared rather than inferred: no live project sets `roleTag` today,
// so an inferred type would drop the field and break the conditional render
// below. The commented-out projects still carry it, and it comes back the
// moment any entry sets one again.
type Project = {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    tags: string[];
    caseStudyLink: string;
    buttonText: string;
    readingTime: string;
    roleTag?: string;
    // External proof links (unsaid). A project that sets either renders its
    // block unwrapped: the whole-block <Link> pattern can't hold a second
    // anchor, so the CTA becomes a real Link beside these.
    liveHref?: string;
    // May still be an unreplaced {{GITHUB_UNSAID}} token — resolve through
    // lib/placeholders before rendering.
    githubHref?: string;
};

const projects: Project[] = [
    {
        id: 1,
        // The whole HF3 arc (dependency to trust), not one section's widget —
        // the card description below carries the "what", this carries the outcome.
        title: "Admins stopped calling support before every launch.\nEngagement up 48% after the rebuild.",
        category: "Enterprise cybersecurity SaaS · Admin-heavy workflows",
        description:
            "The AI-native rebuild of a 10-year-old security platform. Solo designer, 100+ enterprise clients, 10 migrated in beta.",
        image: "/work/thumbs/human-firewall.png",
        tags: [],
        caseStudyLink: "/case-study/human-firewall",
        buttonText: "Read case study",
        readingTime: "8 mins",
    },
    {
        id: 5,
        title: "Built in Cursor.\nEngineering shipped the code.",
        category: "Internal tool · AI-native workflow · Enterprise training",
        description:
            "An AI micro-learning builder inside Human Firewall. Type a topic, get a card pack, ship it to any LMS.",
        image: "/work/1st-case study/humanfirewall cover cropped.png",
        tags: [],
        caseStudyLink: "/case-study/flashcard-training",
        buttonText: "Read case study",
        readingTime: "6 mins",
    },
    {
        id: 6,
        title: "unsaid",
        category: "Designed and built solo · Live",
        description:
            "An anonymous confessions app with two worlds: personal and professional. Designed in Figma, built in Next.js and Supabase, shipped in three weeks.",
        image: "/work/thumbs/unsaid.png",
        tags: [],
        caseStudyLink: "/case-study/unsaid",
        buttonText: "Read case study",
        readingTime: "6 mins",
        liveHref: "https://unsaidnow.vercel.app",
        githubHref: GITHUB_UNSAID,
    },
    {
        id: 2,
        title: "eCrime Hub | Dubai Police",
        category: "WEBSITE DESIGN · CYBERSECURITY · PUBLIC PLATFORM",
        description:
            "Public-facing cybersecurity platform designed to help citizens report cybercrime and learn about digital risks.",
        image: "/work/thumbs/ecrime-hub.png",
        tags: [],
        caseStudyLink: "/case-study/ecrime-hub",
        buttonText: "Read case study",
        readingTime: "4 mins",
    },
    /* Commented out for now — restore when case studies are ready.
    {
        id: 3,
        title: "Designing Kingphisher to Score\nEvery Email Before the User Clicks",
        category: "AI email security · Inbox side defense",
        description:
            "Behavioral Analysis, Threat Scoring, and Account Takeover Protection on Reported Emails, Designed for SOC and Security Admins",
        image: "/work/1st-case study/humanfirewall cover cropped.png",
        tags: [],
        caseStudyLink: "",
        buttonText: "Read case study",
        readingTime: "5 mins",
        roleTag: "Nov 2024 to Jan 2025",
    },
    {
        id: 4,
        title: "Designing SmartDMARC to Turn Unreadable DNS Reports into Decisions",
        category: "DNS and domain reporting · Made human",
        description:
            "Translating Raw DMARC, SPF, and DKIM Data into Reports People Can Actually Act On",
        image: "/work/1st-case study/humanfirewall cover cropped.png",
        tags: [],
        caseStudyLink: "",
        buttonText: "Read case study",
        readingTime: "5 mins",
        roleTag: "Feb 2025 to Apr 2025",
    },
    */
];
// ============================================

const blockId = (index: number) => (index === 0 ? "first-case-study" : `case-study-${index}`);

export function WorkSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const textBlocksRef = useRef<HTMLDivElement[]>([]);
    const imagesRef = useRef<HTMLDivElement[]>([]);
    const railFillsRef = useRef<HTMLSpanElement[]>([]);
    const railRef = useRef<HTMLDivElement>(null);
    const { setCursor, resetCursor } = useCursor();

    useEffect(() => {
        if (typeof window === "undefined") return;

        gsap.registerPlugin(ScrollTrigger);

        // The sticky-stack panel wrapping this section carries a 3D entry
        // transform whenever the page loads or resizes mid-entry (the panel
        // sits tilted below the fold at scroll 0). Zero it while ScrollTrigger
        // measures so pin and trigger positions come from clean layout; motion
        // re-applies it on the next scroll frame.
        const panelEl = sectionRef.current?.closest("[data-scroll-panel]") as HTMLElement | null;
        const onRefreshInit = () => {
            if (panelEl) panelEl.style.transform = "none";
        };
        ScrollTrigger.addEventListener("refreshInit", onRefreshInit);

        // Re-measure when the PAGE grows, not just on window resize. On a
        // client-side back-navigation the browser restores the scroll offset
        // while the lazy sections below are still short placeholders, so every
        // trigger start is computed against a page ~2 viewports too short and
        // the cover crossfades fire at the wrong offsets (unsaid's cover over
        // the Human Firewall block). GSAP only auto-refreshes on window
        // resize; this observer refreshes when the document's height settles.
        let lastHeight = document.documentElement.scrollHeight;
        const heightObserver = new ResizeObserver(() => {
            const h = document.documentElement.scrollHeight;
            if (Math.abs(h - lastHeight) > 4) {
                lastHeight = h;
                ScrollTrigger.refresh();
            }
        });
        heightObserver.observe(document.body);

        const ctx = gsap.context(() => {
            const section = sectionRef.current;
            const imageContainer = imageContainerRef.current;
            const textBlocks = textBlocksRef.current;
            const images = imagesRef.current;

            if (!section || !imageContainer || textBlocks.length === 0 || images.length === 0) return;

            const mm = gsap.matchMedia();

            mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
                // Set initial state - first image visible, others hidden.
                // The covers are stacked absolutely, so the last one in DOM order
                // sits on top and would swallow clicks meant for the visible cover
                // even at opacity 0. pointer-events follows visibility instead.
                const setClickableCover = (activeIndex: number) => {
                    images.forEach((img, i) => {
                        img.style.pointerEvents = i === activeIndex ? "auto" : "none";
                    });
                };
                images.forEach((img, i) => {
                    gsap.set(img, { opacity: i === 0 ? 1 : 0 });
                });
                setClickableCover(0);

                // Pin the image container throughout the section scroll
                ScrollTrigger.create({
                    trigger: section,
                    start: "top top",
                    end: "bottom bottom",
                    pin: imageContainer,
                    pinSpacing: false,
                });

                // Progress rail is position:fixed (an ancestor's overflow-x-clip
                // would clip an absolutely-positioned rail hanging outside the
                // container; fixed elements escape that). Show it only while the
                // section is on screen; hide it the moment the section's end
                // scrolls past the viewport bottom, so it never lingers over
                // the next section.
                ScrollTrigger.create({
                    trigger: section,
                    start: "top 60%",
                    end: "bottom bottom",
                    onToggle: (self) => {
                        if (railRef.current) {
                            gsap.to(railRef.current, {
                                autoAlpha: self.isActive ? 1 : 0,
                                duration: 0.3,
                                overwrite: "auto",
                            });
                        }
                    },
                });

                // Separate trigger for cursor control (more reliable than combining with pin)
                ScrollTrigger.create({
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                    onEnter: () => setCursor("tag", projects[0].readingTime),
                    onLeave: () => resetCursor(),
                    onEnterBack: () => setCursor("tag", projects[projects.length - 1].readingTime),
                    onLeaveBack: () => resetCursor(),
                });

                // Scrubbed crossfades, computed centrally. The previous version
                // gave each transition its own timeline whose tweens asserted
                // the NEIGHBORING cover's opacity (outgoing image starts at 1),
                // so whenever several triggers rendered in one tick — a refresh,
                // a restored scroll position, an instant jump — the last one to
                // render could leave a later cover opaque on top of the stack
                // (unsaid's cover over the Human Firewall block). Instead, every
                // trigger only records its own progress and one function derives
                // ALL cover states from ALL progresses: cover i is visible only
                // while its own transition is in (p_in) and the next one hasn't
                // taken over (1 - p_next). Order of rendering can no longer
                // produce an inconsistent stack.
                const transitionProgress = new Array(textBlocks.length).fill(0);
                const applyCoverStates = () => {
                    images.forEach((img, i) => {
                        const pIn = i === 0 ? 1 : transitionProgress[i];
                        const pNext = i + 1 < transitionProgress.length ? transitionProgress[i + 1] : 0;
                        gsap.set(img, {
                            opacity: Math.min(pIn, 1 - pNext),
                            yPercent: 5 * (1 - pIn) - 3 * pNext,
                        });
                    });
                };
                textBlocks.forEach((textBlock, index) => {
                    if (index === 0) return;
                    ScrollTrigger.create({
                        trigger: textBlock,
                        start: "top 80%",
                        end: "top 30%",
                        onUpdate: (self) => {
                            transitionProgress[index] = self.progress;
                            applyCoverStates();
                        },
                        onRefresh: (self) => {
                            transitionProgress[index] = self.progress;
                            applyCoverStates();
                        },
                    });
                });
                applyCoverStates();

                // Per-block triggers: cursor reading-time tag + progress-rail fill
                textBlocks.forEach((textBlock, index) => {
                    const project = projects[index];
                    const isFirstProject = index === 0;
                    const isLastProject = index === projects.length - 1;
                    const applyFill = (progress: number) => {
                        const fill = railFillsRef.current[index];
                        if (fill) fill.style.transform = `scaleY(${progress})`;
                    };

                    ScrollTrigger.create({
                        trigger: textBlock,
                        start: "top center",
                        end: "bottom center",
                        onUpdate: (self) => applyFill(self.progress),
                        onRefresh: (self) => applyFill(self.progress),
                        onEnter: () => {
                            setCursor("tag", project.readingTime);
                            setClickableCover(index);
                        },
                        onLeave: isLastProject ? () => resetCursor() : undefined,
                        onEnterBack: () => {
                            setCursor("tag", project.readingTime);
                            setClickableCover(index);
                        },
                        onLeaveBack: isFirstProject ? () => resetCursor() : undefined,
                    });
                });
            });

            // Mobile: No pinning, show all content normally
            mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
                images.forEach((img) => {
                    gsap.set(img, { opacity: 1 });
                    img.style.pointerEvents = "auto";
                });
            });
        }, sectionRef);

        return () => {
            heightObserver.disconnect();
            ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
            ctx.revert();
        };
    }, [setCursor, resetCursor]);

    const addToTextBlocksRef = (el: HTMLDivElement | null, index: number) => {
        if (el) textBlocksRef.current[index] = el;
    };

    const addToImagesRef = (el: HTMLDivElement | null, index: number) => {
        if (el) imagesRef.current[index] = el;
    };

    return (
        <section ref={sectionRef} className="relative">
            {/* Progress rail — fixed at the viewport's left edge, faded in only
                while the Work section is on screen. One segment per case study;
                the active segment fills with scroll progress. Desktop only. */}
            <div
                ref={railRef}
                className="hidden lg:motion-safe:flex fixed inset-y-0 left-5 z-40 w-6 flex-col items-center justify-center gap-3"
                style={{ opacity: 0, visibility: "hidden" }}
            >
                {projects.map((project, index) => (
                    <button
                        key={project.id}
                        type="button"
                        aria-label={`Go to case study: ${project.title}`}
                        onClick={() => scrollToSection(blockId(index))}
                        className="relative h-16 w-1.5 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors overflow-hidden cursor-pointer"
                    >
                        <span
                            ref={(el) => {
                                if (el) railFillsRef.current[index] = el;
                            }}
                            className="absolute inset-0 rounded-full origin-top"
                            style={{ transform: "scaleY(0)", backgroundColor: "var(--accent-warm)" }}
                        />
                    </button>
                ))}
            </div>

            {/* Two-column layout for desktop */}
            <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                {/* LEFT COLUMN - Scrolling text content */}
                <div className="relative">
                    {projects.map((project, index) => {
                        // Unreplaced {{GITHUB_UNSAID}} resolves to null in
                        // production, which drops the GitHub link entirely.
                        const githubHref = project.githubHref ? resolveToken(project.githubHref) : null;
                        // A project with external links renders unwrapped: the
                        // whole-block <Link> can't contain further anchors.
                        const hasExtraLinks = Boolean(project.liveHref || githubHref);
                        // The entire block is the link target, not just the CTA —
                        // same behaviour as the Writings cards. Everything inside
                        // is therefore plain markup: a second anchor nested in this
                        // one would be un-nested by the HTML parser.
                        const block = (
                            <>
                                {/* Mobile Image */}
                                <div className="lg:hidden mb-8 rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: '4/3' }}>
                                    {project.id === FLASHCARD_PROJECT_ID ? (
                                        <div className="relative w-full h-full bg-gradient-to-br from-zinc-700 via-zinc-900 to-zinc-950 flex items-center justify-center p-6">
                                            <div
                                                aria-hidden
                                                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                                            >
                                                <div
                                                    className="w-[380px] h-[380px] rounded-full blur-3xl"
                                                    style={{
                                                        background:
                                                            "radial-gradient(circle, rgba(255,215,154,0.22) 0%, rgba(255,152,0,0.12) 42%, transparent 70%)",
                                                    }}
                                                />
                                            </div>
                                            <FlashcardHighlightBlock />
                                            <HeroCardFan cards={FLASHCARD_FAN_CARDS} />
                                        </div>
                                    ) : (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            width={800}
                                            height={600}
                                            className="w-full h-full object-cover"
                                            priority={index < 2}
                                            placeholder="blur"
                                            blurDataURL={BLUR_PLACEHOLDER}
                                            // Every cover is in the DOM twice: this mobile block and
                                            // the sticky desktop stack below. display:none does not
                                            // stop the fetch, so without a breakpoint-aware sizes the
                                            // browser resolves the hidden copy at its 100vw default
                                            // and downloads a full-size file nobody sees. 1px above
                                            // lg parks it on the smallest srcset candidate instead.
                                            sizes="(min-width: 1024px) 1px, 100vw"
                                            loading={index < 2 ? "eager" : "lazy"}
                                        />
                                    )}
                                </div>

                                {/* Project Content */}
                                <div className="space-y-4">
                                    {project.category && (
                                        <div className="flex flex-wrap items-center gap-3">
                                            {/* Same grey as the description below. --muted-foreground
                                                is rgb(46,46,46) / 13.58:1, which made this small
                                                uppercase label louder than the sentence it introduces. */}
                                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                                {project.category}
                                            </p>
                                            {project.roleTag && (
                                                <span
                                                    className="inline-block px-3 py-1 rounded-full"
                                                    style={{
                                                        fontFamily: "var(--font-caveat), cursive",
                                                        fontSize: "15px",
                                                        transform: "rotate(-3deg)",
                                                        // deeper than the #FF9800 accent so white text clears 4.5:1
                                                        backgroundColor: "#B45309",
                                                        color: "#fff",
                                                    }}
                                                >
                                                    {project.roleTag}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                    <h3
                                        className={`text-[28px] md:text-[36px] font-medium tracking-tight whitespace-pre-line${
                                            project.caseStudyLink ? " transition-colors group-hover:text-primary" : ""
                                        }`}
                                    >
                                        {project.title}
                                    </h3>
                                    <p className="text-[14px] md:text-[18px] text-gray-500 leading-relaxed max-w-2xl mt-2 whitespace-pre-line">
                                        {project.description}
                                    </p>

                                    {/* Tags — guarded because no project sets any today. An
                                        empty flex container still occupies its own pt-4 plus the
                                        space-y-4 margin it earns as a sibling, so rendering it
                                        with no children pushed the CTA 32px further from the
                                        description than the layout intends. */}
                                    {project.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 pt-4">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Read case study button — disabled when no case study exists yet */}
                                    {project.caseStudyLink ? (
                                        hasExtraLinks ? (
                                            // Unwrapped block (see above), so these are real
                                            // anchors: the case-study CTA plus external proof
                                            // links, styled like the Experiments card links.
                                            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                                                <Link
                                                    href={project.caseStudyLink}
                                                    className={cn(
                                                        buttonVariants({ size: "lg" }),
                                                        "mt-3 rounded-2xl px-10 h-12 text-base"
                                                    )}
                                                >
                                                    {project.buttonText || "Read case study"}
                                                </Link>
                                                {project.liveHref && (
                                                    <a
                                                        href={project.liveHref}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="mt-3 text-base font-medium text-gray-900 hover:opacity-70 transition-opacity"
                                                        style={{
                                                            textDecoration: "underline",
                                                            textUnderlineOffset: "4px",
                                                            textDecorationColor: "var(--accent-warm)",
                                                        }}
                                                    >
                                                        Live app
                                                    </a>
                                                )}
                                                {githubHref && (
                                                    <a
                                                        href={githubHref}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="mt-3 text-base font-medium text-gray-900 hover:opacity-70 transition-opacity"
                                                        style={{
                                                            textDecoration: "underline",
                                                            textUnderlineOffset: "4px",
                                                            textDecorationColor: "var(--accent-warm)",
                                                        }}
                                                    >
                                                        {/* Unreplaced token stays visible in dev
                                                            so it can't be forgotten. */}
                                                        {githubHref.startsWith("{{") ? githubHref : "GitHub"}
                                                    </a>
                                                )}
                                            </div>
                                        ) : (
                                            // Not a Link: the block around it already is one, and an
                                            // anchor inside an anchor is invalid markup that browsers
                                            // silently un-nest during parsing.
                                            <span
                                                className={cn(
                                                    buttonVariants({ size: "lg" }),
                                                    "mt-3 rounded-2xl px-10 h-12 text-base"
                                                )}
                                            >
                                                {project.buttonText || "Understand"}
                                            </span>
                                        )
                                    ) : (
                                        <Button
                                            disabled
                                            size="lg"
                                            className="mt-3 rounded-2xl px-10 h-12 text-base"
                                        >
                                            {project.buttonText || "Read case study"}
                                        </Button>
                                    )}
                                </div>
                            </>
                        );

                        return (
                            <div
                                key={project.id}
                                id={blockId(index)}
                                ref={(el) => addToTextBlocksRef(el, index)}
                                className="min-h-screen flex flex-col justify-center py-16 md:py-24 scroll-mt-4"
                            >
                                {project.caseStudyLink && !hasExtraLinks ? (
                                    <Link
                                        href={project.caseStudyLink}
                                        // Titles carry a hard line break for layout; a raw
                                        // newline in the label reads as a pause to some
                                        // screen readers, so flatten it to a space.
                                        aria-label={`Read case study: ${project.title.replace(/\n/g, " ")}`}
                                        className="group block"
                                    >
                                        {block}
                                    </Link>
                                ) : (
                                    block
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* RIGHT COLUMN - Sticky image container (Desktop only) */}
                <div
                    ref={imageContainerRef}
                    className="hidden lg:flex items-center justify-center h-screen sticky top-0"
                >
                    <div className="relative w-full max-w-[660px] h-[750px]">
                        {projects.map((project, index) => {
                            const cover = (
                                <>
                                        {project.id === FLASHCARD_PROJECT_ID ? (
                                            <div className="relative w-full h-full bg-gradient-to-br from-zinc-700 via-zinc-900 to-zinc-950 flex items-center justify-center p-10">
                                                <div
                                                    aria-hidden
                                                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                                                >
                                                    <div
                                                        className="w-[520px] h-[520px] rounded-full blur-3xl"
                                                        style={{
                                                            background:
                                                                "radial-gradient(circle, rgba(255,215,154,0.22) 0%, rgba(255,152,0,0.12) 42%, transparent 70%)",
                                                        }}
                                                    />
                                                </div>
                                                <FlashcardHighlightBlock />
                                                <HeroCardFan cards={FLASHCARD_FAN_CARDS} />
                                            </div>
                                        ) : (
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                                priority={index < 2}
                                                placeholder="blur"
                                                blurDataURL={BLUR_PLACEHOLDER}
                                                // Hidden below lg; see the note above.
                                                sizes="(max-width: 1023px) 1px, 600px"
                                                loading={index < 2 ? "eager" : "lazy"}
                                            />
                                        )}
                                </>
                            );

                            return (
                                <div
                                    key={project.id}
                                    ref={(el) => addToImagesRef(el, index)}
                                    // Only the first card is visible before GSAP runs. Without this
                                    // the whole stack paints at full opacity on reload and the last
                                    // case study flashes for a beat until gsap.set() hides it. The
                                    // breakpoint + motion-safe pair mirrors the matchMedia query that
                                    // owns these opacities, so mobile/reduced-motion still shows all.
                                    className={`absolute inset-0 rounded-2xl overflow-hidden bg-gray-100${
                                        index === 0 ? "" : " lg:motion-safe:opacity-0"
                                    }`}
                                >
                                    {project.caseStudyLink ? (
                                        // Duplicate of the text block's link: hidden from
                                        // the accessibility tree and the tab order, since the
                                        // cover is a click target, not a second announcement.
                                        <Link
                                            href={project.caseStudyLink}
                                            tabIndex={-1}
                                            aria-hidden="true"
                                            className="block w-full h-full"
                                        >
                                            {cover}
                                        </Link>
                                    ) : (
                                        cover
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
