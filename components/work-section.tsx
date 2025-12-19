"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// ============================================
// PROJECT DATA - Replace with your real content
// ============================================
const projects = [
    {
        id: 1,
        title: "E-Commerce Redesign",
        category: "UX Design • Mobile",
        description:
            "A complete UX overhaul for a fashion brand, focusing on mobile conversion and checkout flow. Increased mobile conversions by 34% through streamlined user journeys.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
        tags: ["User Research", "Prototyping", "A/B Testing"],
    },
    {
        id: 2,
        title: "FinTech Dashboard",
        category: "Product Design • Data Viz",
        description:
            "A real-time data visualization platform for trading analytics with dark mode UI. Designed for power users who need instant insights from complex financial data.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
        tags: ["Dashboard Design", "Dark Mode", "Real-time Data"],
    },
    {
        id: 3,
        title: "Travel App",
        category: "Mobile App • AI",
        description:
            "An AI-powered itinerary planner with map integrations and social sharing features. Helps travelers discover hidden gems and plan trips effortlessly.",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
        tags: ["AI Integration", "Maps", "Social Features"],
    },
];
// ============================================

export function WorkSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const pinnedContainerRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement[]>([]);
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        gsap.registerPlugin(ScrollTrigger);

        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });
        lenisRef.current = lenis;

        lenis.on("scroll", ScrollTrigger.update);

        const rafCallback = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(rafCallback);
        gsap.ticker.lagSmoothing(0);

        const ctx = gsap.context(() => {
            const section = sectionRef.current;
            const pinnedContainer = pinnedContainerRef.current;
            const projectElements = projectsRef.current;

            if (!section || !pinnedContainer || projectElements.length === 0) return;

            const mm = gsap.matchMedia();

            mm.add("(min-width: 1024px)", () => {
                const numProjects = projects.length;

                // Set initial state - first project visible, others hidden
                projectElements.forEach((proj, i) => {
                    gsap.set(proj, {
                        opacity: i === 0 ? 1 : 0,
                        zIndex: numProjects - i
                    });
                });

                // Pin the entire container
                ScrollTrigger.create({
                    trigger: section,
                    start: "top top",
                    end: `+=${100 * (numProjects - 1)}vh`,
                    pin: pinnedContainer,
                    pinSpacing: true,
                });

                // Create scroll-linked transitions between projects
                projectElements.forEach((proj, index) => {
                    if (index === 0) return; // Skip first project

                    ScrollTrigger.create({
                        trigger: section,
                        start: `top+=${100 * (index - 1)}vh top`,
                        end: `top+=${100 * index}vh top`,
                        scrub: 0.5,
                        onUpdate: (self) => {
                            const progress = self.progress;
                            // Fade out previous project
                            gsap.set(projectElements[index - 1], { opacity: 1 - progress });
                            // Fade in current project
                            gsap.set(proj, { opacity: progress });
                        },
                    });
                });
            });

            // Mobile: Show all projects normally (no pinning)
            mm.add("(max-width: 1023px)", () => {
                projectElements.forEach((proj) => {
                    gsap.set(proj, { opacity: 1, position: "relative" });
                });
            });
        }, sectionRef);

        return () => {
            ctx.revert();
            lenis.destroy();
            gsap.ticker.remove(rafCallback);
        };
    }, []);

    const addToProjectsRef = (el: HTMLDivElement | null, index: number) => {
        if (el) projectsRef.current[index] = el;
    };

    return (
        <section
            ref={sectionRef}
            className="relative"
        >
            {/* Pinned Container - holds all projects stacked */}
            <div
                ref={pinnedContainerRef}
                className="relative min-h-screen lg:h-screen"
            >
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        ref={(el) => addToProjectsRef(el, index)}
                        className="lg:absolute lg:inset-0 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center py-16 md:py-24"
                    >
                        {/* Left Column - Text Content */}
                        <div className="flex flex-col justify-center">
                            {/* Mobile Image */}
                            <div className="lg:hidden mb-8 rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-cover"
                                    priority={index === 0}
                                />
                            </div>

                            {/* Project Content */}
                            <div className="space-y-4">
                                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                    {project.category}
                                </p>
                                <h3 className="text-[28px] md:text-[36px] font-semibold tracking-tight">
                                    {project.title}
                                </h3>
                                <p className="text-[16px] md:text-[18px] text-muted-foreground leading-relaxed max-w-lg">
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
                            </div>
                        </div>

                        {/* Right Column - Image (Desktop Only) */}
                        <div className="hidden lg:flex items-center justify-center">
                            <div className="relative w-[770px] h-[785px] rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                    sizes="(min-width: 1024px) 770px, 100vw"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
