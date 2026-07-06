"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { useCursor } from "@/components/ui/cursor-context";
import { HeroCardFan } from "@/components/case-study/flashcard/HeroCardFan";
import { flashcardTrainingCaseStudyData } from "@/data/flashcard-training-data";

const FLASHCARD_PROJECT_ID = 5;
const FLASHCARD_FAN_CARDS = flashcardTrainingCaseStudyData.whyFlashcards.cards;
// Human Firewall cover renders reduced + centered on a dark card instead of a full-bleed crop.
const HF_PROJECT_ID = 1;

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

const projects = [
    {
        id: 1,
        title: "Designing a Human Firewall Platform to Reduce Enterprise Human Risk",
        category: "Enterprise cybersecurity SaaS · Admin-heavy workflows",
        description:
            "End-to-End UX Architecture for Phishing Simulations, Training & AI-Assisted Risk Insights",
        image: "/work/1st-case study/humanfirewall cover cropped.png",
        tags: [],
        caseStudyLink: "/case-study/human-firewall",
        buttonText: "Read case study",
        readingTime: "8 mins",
        roleTag: "@ Current Role",
    },
    {
        id: 5,
        title: "A flashcard training builder that\nships to any LMS",
        category: "Internal tool · AI-native workflow · Enterprise training",
        description:
            "Built as a module inside Human Firewall to replace boring security training — type a topic, generate a card pack, ship it anywhere.",
        image: "/work/1st-case study/humanfirewall cover cropped.png",
        tags: [],
        caseStudyLink: "/case-study/flashcard-training",
        buttonText: "Read case study",
        readingTime: "6 mins",
        roleTag: "@ Current Role",
    },
    {
        id: 2,
        title: "eCrime Hub | Dubai Police",
        category: "WEBSITE DESIGN · CYBERSECURITY · PUBLIC PLATFORM",
        description:
            "Public-facing cybersecurity platform designed to help citizens report cybercrime and learn about digital risks.",
        image: "/work/dp.svg",
        tags: [],
        caseStudyLink: "/case-study/ecrime-hub",
        buttonText: "Read case study",
        readingTime: "4 mins",
        roleTag: "@ Current Role",
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
        roleTag: "Nov 2024 – Jan 2025",
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
        roleTag: "Feb 2025 – Apr 2025",
    },
    */
];
// ============================================

export function WorkSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const textBlocksRef = useRef<HTMLDivElement[]>([]);
    const imagesRef = useRef<HTMLDivElement[]>([]);
    const { setCursor, resetCursor } = useCursor();

    useEffect(() => {
        if (typeof window === "undefined") return;

        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const section = sectionRef.current;
            const imageContainer = imageContainerRef.current;
            const textBlocks = textBlocksRef.current;
            const images = imagesRef.current;

            if (!section || !imageContainer || textBlocks.length === 0 || images.length === 0) return;

            const mm = gsap.matchMedia();

            mm.add("(min-width: 1024px)", () => {
                // Set initial state - first image visible, others hidden
                images.forEach((img, i) => {
                    gsap.set(img, {
                        opacity: i === 0 ? 1 : 0,
                        visibility: i === 0 ? "visible" : "hidden",
                    });
                });

                // Pin the image container throughout the section scroll
                ScrollTrigger.create({
                    trigger: section,
                    start: "top top",
                    end: "bottom bottom",
                    pin: imageContainer,
                    pinSpacing: false,
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

                // Create triggers for each text block to control image visibility and cursor
                textBlocks.forEach((textBlock, index) => {
                    const project = projects[index];
                    const isFirstProject = index === 0;
                    const isLastProject = index === projects.length - 1;

                    ScrollTrigger.create({
                        trigger: textBlock,
                        start: "top center",
                        end: "bottom center",
                        onEnter: () => {
                            // Update cursor to show reading time tag
                            setCursor("tag", project.readingTime);

                            // Fade in current image
                            gsap.to(images[index], {
                                opacity: 1,
                                visibility: "visible",
                                duration: 0.5,
                                ease: "power2.out",
                            });
                            // Fade out other images
                            images.forEach((img, i) => {
                                if (i !== index) {
                                    gsap.to(img, {
                                        opacity: 0,
                                        duration: 0.5,
                                        ease: "power2.out",
                                        onComplete: () => {
                                            gsap.set(img, { visibility: "hidden" });
                                        },
                                    });
                                }
                            });
                        },
                        onLeave: isLastProject ? () => resetCursor() : undefined,
                        onEnterBack: () => {
                            // Update cursor to show reading time tag
                            setCursor("tag", project.readingTime);

                            // Fade in current image
                            gsap.to(images[index], {
                                opacity: 1,
                                visibility: "visible",
                                duration: 0.5,
                                ease: "power2.out",
                            });
                            // Fade out other images
                            images.forEach((img, i) => {
                                if (i !== index) {
                                    gsap.to(img, {
                                        opacity: 0,
                                        duration: 0.5,
                                        ease: "power2.out",
                                        onComplete: () => {
                                            gsap.set(img, { visibility: "hidden" });
                                        },
                                    });
                                }
                            });
                        },
                        onLeaveBack: isFirstProject ? () => resetCursor() : undefined,
                    });
                });
            });

            // Mobile: No pinning, show all content normally
            mm.add("(max-width: 1023px)", () => {
                images.forEach((img) => {
                    gsap.set(img, { opacity: 1, visibility: "visible" });
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [setCursor, resetCursor]);

    const addToTextBlocksRef = (el: HTMLDivElement | null, index: number) => {
        if (el) textBlocksRef.current[index] = el;
    };

    const addToImagesRef = (el: HTMLDivElement | null, index: number) => {
        if (el) imagesRef.current[index] = el;
    };

    return (
        <section ref={sectionRef} className="relative">
            {/* Two-column layout for desktop */}
            <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                {/* LEFT COLUMN - Scrolling text content */}
                <div className="relative">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            id={index === 0 ? "first-case-study" : undefined}
                            ref={(el) => addToTextBlocksRef(el, index)}
                            className="min-h-screen flex flex-col justify-center py-16 md:py-24 scroll-mt-4"
                        >
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
                                                        "radial-gradient(circle, rgba(110,231,183,0.22) 0%, rgba(96,165,250,0.12) 42%, transparent 70%)",
                                                }}
                                            />
                                        </div>
                                        <FlashcardHighlightBlock />
                                        <HeroCardFan cards={FLASHCARD_FAN_CARDS} />
                                    </div>
                                ) : project.id === HF_PROJECT_ID ? (
                                    <div className="relative w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black flex items-center justify-center p-6 overflow-hidden">
                                        <div
                                            aria-hidden
                                            className="pointer-events-none absolute inset-0 flex items-center justify-center"
                                        >
                                            <div
                                                className="w-[480px] h-[480px] rounded-full blur-3xl"
                                                style={{
                                                    background:
                                                        "radial-gradient(circle, rgba(139,92,246,0.55) 0%, rgba(96,165,250,0.3) 45%, transparent 72%)",
                                                }}
                                            />
                                        </div>
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            width={2693}
                                            height={1644}
                                            className="relative w-full h-auto rounded-lg border border-white/15 shadow-2xl"
                                            priority={index < 2}
                                            loading={index < 2 ? "eager" : "lazy"}
                                        />
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
                                        loading={index < 2 ? "eager" : "lazy"}
                                    />
                                )}
                            </div>

                            {/* Project Content */}
                            <div className="space-y-4">
                                {project.category && (
                                    <div className="flex flex-wrap items-center gap-3">
                                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                            {project.category}
                                        </p>
                                        {project.roleTag && (
                                            <span
                                                className="inline-block px-3 py-1 rounded-full"
                                                style={{
                                                    fontFamily: "var(--font-caveat), cursive",
                                                    fontSize: "15px",
                                                    transform: "rotate(-3deg)",
                                                    backgroundColor: "#FF9800",
                                                    color: "#fff",
                                                }}
                                            >
                                                {project.roleTag}
                                            </span>
                                        )}
                                    </div>
                                )}
                                {project.caseStudyLink ? (
                                    <Link href={project.caseStudyLink}>
                                        <h3 className="text-[28px] md:text-[36px] font-medium tracking-tight hover:text-primary transition-colors whitespace-pre-line">
                                            {project.title}
                                        </h3>
                                    </Link>
                                ) : (
                                    <h3 className="text-[28px] md:text-[36px] font-medium tracking-tight whitespace-pre-line">
                                        {project.title}
                                    </h3>
                                )}
                                <p className="text-[14px] md:text-[18px] text-gray-500 leading-relaxed max-w-2xl mt-2 whitespace-pre-line">
                                    {project.description}
                                </p>

                                {/* Tags */}
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

                                {/* Read case study button — disabled when no case study exists yet */}
                                {project.caseStudyLink ? (
                                    <Button asChild size="lg" className="mt-3 rounded-2xl px-10 h-12 text-base">
                                        <Link href={project.caseStudyLink}>
                                            {project.buttonText || "Understand"}
                                        </Link>
                                    </Button>
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
                        </div>
                    ))}
                </div>

                {/* RIGHT COLUMN - Sticky image container (Desktop only) */}
                <div
                    ref={imageContainerRef}
                    className="hidden lg:flex items-center justify-center h-screen sticky top-0"
                >
                    <div className="relative w-full max-w-[660px] h-[750px]">
                        {projects.map((project, index) => (
                            <div
                                key={project.id}
                                ref={(el) => addToImagesRef(el, index)}
                                className="absolute inset-0 rounded-2xl overflow-hidden bg-gray-100"
                            >
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
                                                        "radial-gradient(circle, rgba(110,231,183,0.22) 0%, rgba(96,165,250,0.12) 42%, transparent 70%)",
                                                }}
                                            />
                                        </div>
                                        <FlashcardHighlightBlock />
                                        <HeroCardFan cards={FLASHCARD_FAN_CARDS} />
                                    </div>
                                ) : project.id === HF_PROJECT_ID ? (
                                    <div className="relative w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black flex items-center justify-center p-8 overflow-hidden">
                                        <div
                                            aria-hidden
                                            className="pointer-events-none absolute inset-0 flex items-center justify-center"
                                        >
                                            <div
                                                className="w-[640px] h-[640px] rounded-full blur-3xl"
                                                style={{
                                                    background:
                                                        "radial-gradient(circle, rgba(139,92,246,0.55) 0%, rgba(96,165,250,0.3) 45%, transparent 72%)",
                                                }}
                                            />
                                        </div>
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            width={2693}
                                            height={1644}
                                            className="relative w-full h-auto rounded-xl border border-white/15 shadow-2xl"
                                            priority={index < 2}
                                            sizes="600px"
                                            loading={index < 2 ? "eager" : "lazy"}
                                        />
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
                                        sizes="600px"
                                        loading={index < 2 ? "eager" : "lazy"}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
