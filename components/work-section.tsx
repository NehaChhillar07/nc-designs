"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { useCursor } from "@/components/ui/cursor-context";

// ============================================
// PROJECT DATA - Replace with your real content
// ============================================

// Blur placeholder for smooth image loading (prevents whitespace)
const BLUR_PLACEHOLDER = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAQMDBAMBAAAAAAAAAAAAAQIDBAAFEQYSITETQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgARIUH/2gAMAwEAAhEDEEA/AKNzu1wvN2dc8r7kVtxQ2NKBSnaCQDnPOcnPFKUpSlKXAWMnZ//Z";

const projects = [
    {
        id: 1,
        title: "Cybersecurity AI-Driven SaaS Platform",
        category: "PRODUCT DESIGN · HUMAN RISK · AI-DRIVEN SAAS",
        description:
            "Enterprise platform helping organizations identify and reduce human-driven security risks through AI-powered awareness and training.",
        image: "/work/humanfirewall.svg",
        tags: [],
        caseStudyLink: null,
        comingSoon: true,
        readingTime: "Coming soon",
        isCurrentProject: true,
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
        isCurrentProject: true,
    },
    {
        id: 3,
        title: "Human Resource Management System (TexlaCulture)",
        category: "Product Design · End-to-end · SaaS",
        description:
            "Simplifying hiring, onboarding, and core people workflows",
        image: "/work/texlaculture.svg",
        tags: [],
        caseStudyLink: "/case-study/texlaculture",
        buttonText: "Read case study",
        readingTime: "12 mins",
    },
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
                            ref={(el) => addToTextBlocksRef(el, index)}
                            className="min-h-screen flex flex-col justify-center py-16 md:py-24"
                        >
                            {/* Mobile Image */}
                            <div className="lg:hidden mb-8 rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: '4/3' }}>
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
                            </div>

                            {/* Project Content */}
                            <div className="space-y-4">
                                {project.category && (
                                    <div className="flex flex-wrap items-center gap-3">
                                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                            {project.category}
                                        </p>
                                        {project.isCurrentProject && (
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
                                                @ Current Role
                                            </span>
                                        )}
                                    </div>
                                )}
                                {project.caseStudyLink ? (
                                    <Link href={project.caseStudyLink}>
                                        <h3 className="text-[28px] md:text-[36px] font-medium tracking-tight hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                    </Link>
                                ) : (
                                    <h3 className="text-[28px] md:text-[36px] font-medium tracking-tight">
                                        {project.title}
                                    </h3>
                                )}
                                <p className="text-[14px] md:text-[18px] text-gray-500 leading-relaxed max-w-lg mt-2">
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

                                {/* Coming Soon Badge */}
                                {project.comingSoon && (
                                    <div className="mt-3">
                                        <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-100 text-gray-600 rounded-full">
                                            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                                            Coming Soon
                                        </span>
                                    </div>
                                )}

                                {/* View Case Study Link for projects with case study */}
                                {project.caseStudyLink && (
                                    <Button asChild size="lg" className="mt-3 rounded-2xl px-10 h-12 text-base">
                                        <Link href={project.caseStudyLink}>
                                            {project.buttonText || "Understand"}
                                        </Link>
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
