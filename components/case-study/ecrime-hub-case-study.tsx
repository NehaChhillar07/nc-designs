"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { eCrimeHubCaseStudyData } from "@/data/ecrime-hub-data";
import { Highlighter } from "@/components/ui/highlighter";

// Blur placeholder for smooth image loading
const BLUR_PLACEHOLDER = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAQMDBAMBAAAAAAAAAAAAAQIDBAAFEQYSITETQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgARIUH/2gAMAwEAAhEDEQA/AKNzu1wvN2dc8r7kVtxQ2NKBSnaCQDnPOcnPFKUpSlKXAWMnZ//Z";

// ============================================
// ANIMATION - Slow, natural, predictable
// No bounce. No elastic. Motion as orientation.
// ============================================

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

const fadeIn = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
};

// ============================================
// SECTION 1: HERO
// Purpose: Orientation and authority
// ============================================

function HeroSection() {
    const { hero } = eCrimeHubCaseStudyData;

    return (
        <section className="pt-24 md:pt-32 pb-20 md:pb-28">
            <div className="max-w-5xl mx-auto px-6">
                {/* Meta - Project Name */}
                <motion.p
                    {...fadeInUp}
                    className="text-sm font-medium text-gray-900 tracking-wide mb-8"
                >
                    {hero.meta}
                </motion.p>

                {/* Title - One liner */}
                <motion.h1
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-gray-900 leading-tight mb-8"
                >
                    A public <Highlighter action="highlight" color="#60A5FA" isView>cybersecurity</Highlighter> website designed to help citizens <Highlighter action="highlight" color="#34D399" isView>report cybercrime</Highlighter> and understand <Highlighter action="highlight" color="#FBBF24" isView>digital risks</Highlighter> at a national scale.
                </motion.h1>

                {/* Tags - Small, quiet */}
                <motion.p
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.2 }}
                    className="text-sm text-gray-400 tracking-wide"
                >
                    {hero.tags}
                </motion.p>

                {/* Timeline / Team / Role - Meta Info */}
                <motion.div
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.25 }}
                    className="mt-12 flex flex-wrap items-start justify-between w-full"
                >
                    <div>
                        <p className="text-sm md:text-base text-gray-400 mb-1">Timeline</p>
                        <p className="text-lg md:text-xl font-medium text-gray-900">Sep 2025 – Nov 2025</p>
                    </div>
                    <div>
                        <p className="text-sm md:text-base text-gray-400 mb-1">Team</p>
                        <p className="text-lg md:text-xl font-medium text-gray-900">Dubai Police Executives, 2 Engineers, PM</p>
                    </div>
                    <div>
                        <p className="text-sm md:text-base text-gray-400 mb-1">Role</p>
                        <p className="text-lg md:text-xl font-medium text-gray-900">Product Designer</p>
                    </div>
                </motion.div>
            </div>

            {/* Hero Video with macOS-style Frame */}
            <motion.div
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: 0.3 }}
                className="container mx-auto px-4 mt-16"
            >
                <div
                    className="rounded-2xl overflow-hidden shadow-2xl"
                    style={{
                        background: "#1a1a1a",
                        border: "1px solid rgba(255,255,255,0.1)",
                    }}
                >
                    {/* macOS Window Header */}
                    <div
                        className="flex items-center gap-2 px-4 py-3"
                        style={{ background: "#2a2a2a" }}
                    >
                        {/* Traffic Lights */}
                        <div className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ background: "#ff5f57" }}
                            />
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ background: "#febc2e" }}
                            />
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ background: "#28c840" }}
                            />
                        </div>
                    </div>
                    {/* Video Content */}
                    <div className="relative aspect-video">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover"
                        >
                            <source
                                src="/work/2nd-case%20study/hero.mp4"
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

// ============================================
// SECTION 2: CONTEXT
// Purpose: Explain why this exists without drama
// No image - let this breathe
// ============================================

function ContextSection() {
    return (
        <section className="py-20 md:py-28">
            <div className="max-w-5xl mx-auto px-6">
                <motion.h2
                    {...fadeInUp}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-gray-900 leading-snug"
                >
                    Cybercrime incidents were rapidly increasing, accelerated by AI-driven attacks. Dubai Police needed a single, <Highlighter action="underline" color="#212B36" strokeWidth={2} isView>trusted public platform</Highlighter> that could both enable cybercrime reporting and educate citizens on digital and human risks, without compromising clarity, authority, or trust.
                </motion.h2>
            </div>
        </section>
    );
}

// ============================================
// SECTION 3: OBJECTIVE
// Purpose: Clarify intent with precision
// ============================================

function ObjectiveSection() {
    const { objective } = eCrimeHubCaseStudyData;

    return (
        <section
            className="py-16 md:py-20"
            style={{ background: "#E8F5E9" }}
        >
            <div className="max-w-5xl mx-auto px-6">
                {/* Small Label */}
                <motion.p
                    {...fadeInUp}
                    className="text-sm text-gray-400 tracking-wide mb-8"
                >
                    Objective
                </motion.p>

                {/* Horizontal Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {objective.items.map((item, index) => (
                        <motion.div
                            key={index}
                            {...fadeInUp}
                            transition={{ ...fadeInUp.transition, delay: 0.1 * (index + 1) }}
                            className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/80"
                        >
                            <span className="text-xs font-medium text-gray-400 mb-3 block">0{index + 1}</span>
                            <p className="text-xl md:text-2xl font-medium text-gray-900 leading-snug">
                                {item}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 4: ROLE & RESPONSIBILITY
// Purpose: Define ownership boundaries clearly
// ============================================

function RoleSection() {
    const { role } = eCrimeHubCaseStudyData;

    // Helper function to highlight keywords in the body text
    const renderBodyWithHighlights = () => {
        let text = role.body;
        const parts: React.ReactNode[] = [];
        let lastIndex = 0;

        role.highlights.forEach((highlight, idx) => {
            const index = text.toLowerCase().indexOf(highlight.toLowerCase(), lastIndex);
            if (index !== -1) {
                if (index > lastIndex) {
                    parts.push(text.substring(lastIndex, index));
                }
                parts.push(
                    <Highlighter key={idx} action="highlight" color="#FBBF24" isView>
                        {text.substring(index, index + highlight.length)}
                    </Highlighter>
                );
                lastIndex = index + highlight.length;
            }
        });

        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }

        return parts;
    };

    return (
        <section className="py-20 md:py-28">
            <div className="max-w-5xl mx-auto px-6">
                {/* Small Label */}
                <motion.p
                    {...fadeInUp}
                    className="text-sm text-gray-400 tracking-wide mb-6"
                >
                    {role.heading}
                </motion.p>

                {/* Body Text with Highlights */}
                <motion.p
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 leading-relaxed mb-16"
                >
                    {renderBodyWithHighlights()}
                </motion.p>

                {/* Image Grid: 2-column for IA + User Flow */}
                <motion.div
                    {...fadeIn}
                    transition={{ ...fadeIn.transition, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
                >
                    {/* Information Architecture Diagram */}
                    {role.iaImage && (
                        <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                            <Image
                                src={role.iaImage}
                                alt={role.iaImageAlt || "Information Architecture"}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md">
                                <span className="text-xs font-medium text-gray-700">Information Architecture</span>
                            </div>
                        </div>
                    )}

                    {/* User Flow Diagram */}
                    {role.userFlowImage && (
                        <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                            <Image
                                src={role.userFlowImage}
                                alt={role.userFlowImageAlt || "User Flow"}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-md">
                                <span className="text-xs font-medium text-gray-700">User Flow</span>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 5: CONSTRAINTS
// Purpose: Signal senior decision-making
// This proves seniority - do not skip
// ============================================

function ConstraintsSection() {
    const { constraints } = eCrimeHubCaseStudyData;

    return (
        <section className="py-20 md:py-28 bg-gray-50">
            <div className="max-w-2xl mx-auto px-6">
                <motion.h2
                    {...fadeInUp}
                    className="text-xl md:text-2xl font-medium text-gray-900 mb-12"
                >
                    {constraints.heading}
                </motion.h2>
                <div className="space-y-0">
                    {constraints.items.map((item, index) => (
                        <motion.div
                            key={index}
                            {...fadeInUp}
                            transition={{ ...fadeInUp.transition, delay: 0.1 * (index + 1) }}
                            className="py-5 border-t border-gray-200 last:border-b"
                        >
                            <p className="text-lg text-gray-600">{item}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 6: DESIGN APPROACH
// Purpose: Show thinking, not tools
// Three mini blocks with UI screenshots
// ============================================

// Sketchy note annotations for the design approach section
// Each arrow has a unique loopy hand-drawn path with organic curves
const sketchyNotes = [
    {
        text: "Reporting placed front and center for quick, stress-free access",
        position: "top-right" as const,
        // Loopy curve with spiral - starts from top, loops around, points down-right
        arrowPath: "M 15 8 C 8 12 5 22 12 30 C 20 40 35 35 32 22 C 30 12 18 15 22 28 C 26 42 45 55 55 65 M 55 65 L 48 60 M 55 65 L 52 56"
    },
    {
        text: "Content structured by clear topic headings for easy navigation",
        position: "bottom-left" as const,
        // Curvy loop going down with a curl - matches reference style
        arrowPath: "M 55 8 C 48 15 40 18 35 28 C 28 42 38 48 45 38 C 52 28 42 22 35 32 C 28 45 22 58 25 70 M 25 70 L 18 65 M 25 70 L 32 66"
    },
    {
        text: "Dubai Police Bot guides users and flags suspicious activity",
        position: "top-left" as const,
        // Spiral loop with arrow pointing down
        arrowPath: "M 18 5 C 10 12 8 25 18 32 C 30 40 42 32 38 20 C 35 10 22 12 25 25 C 28 40 35 55 40 68 M 40 68 L 33 62 M 40 68 L 46 62"
    },
];

function DesignApproachSection() {
    const { designApproach } = eCrimeHubCaseStudyData;

    // Function to render body text with highlights on key phrases
    const renderBodyWithHighlights = (body: string, index: number) => {
        // Define key phrases to highlight based on section index
        const highlightPhrases: Record<number, { phrase: string; color: string }[]> = {
            0: [
                { phrase: "linear, distraction-free", color: "#60A5FA" },
                { phrase: "users under stress or urgency", color: "#FBBF24" },
            ],
            1: [
                { phrase: "clear, scannable topics", color: "#34D399" },
                { phrase: "non-technical users", color: "#60A5FA" },
            ],
            2: [
                { phrase: "AI-powered cyber assistant", color: "#F472B6" },
                { phrase: "conversationally", color: "#34D399" },
            ],
        };

        const phrases = highlightPhrases[index] || [];
        let result: React.ReactNode[] = [];
        let remainingText = body;
        let lastIndex = 0;

        // Sort phrases by their position in the text
        const sortedPhrases = phrases
            .map(p => ({ ...p, index: body.toLowerCase().indexOf(p.phrase.toLowerCase()) }))
            .filter(p => p.index !== -1)
            .sort((a, b) => a.index - b.index);

        sortedPhrases.forEach((item, idx) => {
            const phraseIndex = body.toLowerCase().indexOf(item.phrase.toLowerCase(), lastIndex);
            if (phraseIndex !== -1) {
                // Add text before the phrase
                if (phraseIndex > lastIndex) {
                    result.push(body.substring(lastIndex, phraseIndex));
                }
                // Add highlighted phrase
                result.push(
                    <Highlighter key={`highlight-${idx}`} action="highlight" color={item.color} isView>
                        {body.substring(phraseIndex, phraseIndex + item.phrase.length)}
                    </Highlighter>
                );
                lastIndex = phraseIndex + item.phrase.length;
            }
        });

        // Add remaining text
        if (lastIndex < body.length) {
            result.push(body.substring(lastIndex));
        }

        return result.length > 0 ? result : body;
    };

    return (
        <section className="py-20 md:py-28">
            {/* Match hero content width: max-w-5xl */}
            <div className="max-w-5xl mx-auto px-6">
                <div className="space-y-24">
                    {designApproach.sections.map((section, index) => (
                        <div key={index} className="space-y-6">
                            {/* Title becomes less prominent - small label style */}
                            <motion.p
                                {...fadeInUp}
                                className="text-sm font-medium text-gray-400 tracking-wide uppercase"
                            >
                                {section.title}
                            </motion.p>

                            {/* Body becomes heading-style - prominent */}
                            <motion.h3
                                {...fadeInUp}
                                transition={{ ...fadeInUp.transition, delay: 0.1 }}
                                className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 leading-snug max-w-4xl"
                            >
                                {renderBodyWithHighlights(section.body, index)}
                            </motion.h3>

                            {section.image && (
                                <motion.div
                                    {...fadeIn}
                                    transition={{ ...fadeIn.transition, delay: 0.2 }}
                                    className="relative mt-10"
                                >
                                    {/* Image container with sketchy note */}
                                    <div className="relative">
                                        <div className="relative aspect-[16/10] bg-gray-100 rounded-2xl overflow-hidden">
                                            <Image
                                                src={section.image}
                                                alt={section.imageAlt || ""}
                                                fill
                                                className="object-cover"
                                                placeholder="blur"
                                                blurDataURL={BLUR_PLACEHOLDER}
                                            />
                                        </div>

                                        {/* Sketchy annotation - positioned to the side of the image */}
                                        <motion.div
                                            initial={{ opacity: 0, x: index === 1 ? -10 : 10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: 0.6 }}
                                            className={`absolute ${index === 0 ? "-right-48 md:-right-64 top-1/4" :
                                                index === 1 ? "-left-48 md:-left-64 top-1/3" :
                                                    "-right-48 md:-right-64 top-1/2"
                                                } hidden md:flex items-center gap-2 z-10`}
                                        >
                                            {/* For left-side annotations (index 1), text comes first */}
                                            {index === 1 && (
                                                <p
                                                    className="max-w-[160px] leading-snug text-right"
                                                    style={{
                                                        fontFamily: "var(--font-caveat), cursive",
                                                        fontSize: "22px",
                                                        color: "#475569",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {sketchyNotes[index]?.text}
                                                </p>
                                            )}

                                            {/* Loopy curved arrow SVG */}
                                            <svg
                                                width="60"
                                                height="60"
                                                viewBox="0 0 80 80"
                                                fill="none"
                                                className="flex-shrink-0"
                                                style={{
                                                    transform: index === 1 ? "scaleX(-1)" : "none"
                                                }}
                                            >
                                                <motion.path
                                                    d={sketchyNotes[index]?.arrowPath || ""}
                                                    stroke="#475569"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    fill="none"
                                                    initial={{ pathLength: 0 }}
                                                    whileInView={{ pathLength: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                                                />
                                            </svg>

                                            {/* For right-side annotations (index 0, 2), text comes after arrow */}
                                            {index !== 1 && (
                                                <p
                                                    className="max-w-[160px] leading-snug"
                                                    style={{
                                                        fontFamily: "var(--font-caveat), cursive",
                                                        fontSize: "22px",
                                                        color: "#475569",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {sketchyNotes[index]?.text}
                                                </p>
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* Second Image if exists */}
                                    {section.secondImage && (
                                        <div className="relative mt-8">
                                            <div className="relative aspect-[16/10] bg-gray-100 rounded-xl overflow-hidden">
                                                <Image
                                                    src={section.secondImage}
                                                    alt={section.secondImageAlt || ""}
                                                    fill
                                                    className="object-cover"
                                                    placeholder="blur"
                                                    blurDataURL={BLUR_PLACEHOLDER}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {/* Video if exists */}
                            {section.video && (
                                <motion.div
                                    {...fadeIn}
                                    transition={{ ...fadeIn.transition, delay: 0.2 }}
                                    className="relative mt-10"
                                >
                                    <div className="relative">
                                        <div className="relative rounded-2xl overflow-hidden">
                                            <video
                                                src={section.video}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="w-full h-auto rounded-2xl"
                                            />
                                        </div>

                                        {/* Sketchy annotation for video */}
                                        <motion.div
                                            initial={{ opacity: 0, x: index === 1 ? -10 : 10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: 0.6 }}
                                            className={`absolute ${index === 0 ? "-right-48 md:-right-64 top-1/4" :
                                                index === 1 ? "-left-48 md:-left-64 top-1/3" :
                                                    "-right-48 md:-right-64 top-1/2"
                                                } hidden md:flex items-center gap-2 z-10`}
                                        >
                                            {/* For left-side annotations (index 1), text comes first */}
                                            {index === 1 && (
                                                <p
                                                    className="max-w-[160px] leading-snug text-right"
                                                    style={{
                                                        fontFamily: "var(--font-caveat), cursive",
                                                        fontSize: "22px",
                                                        color: "#475569",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {sketchyNotes[index]?.text}
                                                </p>
                                            )}

                                            {/* Loopy curved arrow SVG */}
                                            <svg
                                                width="60"
                                                height="60"
                                                viewBox="0 0 80 80"
                                                fill="none"
                                                className="flex-shrink-0"
                                                style={{
                                                    transform: index === 1 ? "scaleX(-1)" : "none"
                                                }}
                                            >
                                                <motion.path
                                                    d={sketchyNotes[index]?.arrowPath || ""}
                                                    stroke="#475569"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    fill="none"
                                                    initial={{ pathLength: 0 }}
                                                    whileInView={{ pathLength: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                                                />
                                            </svg>

                                            {/* For right-side annotations (index 0, 2), text comes after arrow */}
                                            {index !== 1 && (
                                                <p
                                                    className="max-w-[160px] leading-snug"
                                                    style={{
                                                        fontFamily: "var(--font-caveat), cursive",
                                                        fontSize: "22px",
                                                        color: "#475569",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {sketchyNotes[index]?.text}
                                                </p>
                                            )}
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 7: VISUAL SYSTEM & EXECUTION
// Purpose: Explain the three-level visual system
// No background, better text hierarchy
// ============================================

// Annotations for visual system images
const visualSystemAnnotations = [
    { arrowPath: "M 15 8 C 8 12 5 22 12 30 C 20 40 35 35 32 22 C 30 12 18 15 22 28 C 26 42 45 55 55 65 M 55 65 L 48 60 M 55 65 L 52 56" },
    { arrowPath: "M 55 8 C 48 15 40 18 35 28 C 28 42 38 48 45 38 C 52 28 42 22 35 32 C 28 45 22 58 25 70 M 25 70 L 18 65 M 25 70 L 32 66" },
    { arrowPath: "M 18 5 C 10 12 8 25 18 32 C 30 40 42 32 38 20 C 35 10 22 12 25 25 C 28 40 35 55 40 68 M 40 68 L 33 62 M 40 68 L 46 62" },
];

function VisualSystemSection() {
    const { visualSystem } = eCrimeHubCaseStudyData;

    return (
        <section className="py-20 md:py-28">
            <div className="max-w-5xl mx-auto px-6">
                {/* Small label - subtle */}
                <motion.p
                    {...fadeInUp}
                    className="text-sm font-medium text-gray-400 tracking-wide uppercase mb-6"
                >
                    {visualSystem.heading}
                </motion.p>

                {/* Main statement - prominent */}
                <motion.h2
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 leading-snug mb-8"
                >
                    The website was designed as a <Highlighter action="underline" color="#475569" strokeWidth={2} isView>three-level visual system</Highlighter> to ensure consistency, scalability, and speed of execution under strict guidelines.
                </motion.h2>

                {/* Supporting text - secondary */}
                <motion.p
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.15 }}
                    className="text-lg text-gray-500 leading-relaxed mb-6"
                >
                    {visualSystem.body}
                </motion.p>

                {/* Philosophy - tertiary */}
                <motion.p
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.2 }}
                    className="text-base text-gray-400 leading-relaxed mb-16"
                >
                    {visualSystem.philosophy}
                </motion.p>

                {/* Image 1: Homepage - Full width */}
                <motion.div
                    {...fadeIn}
                    transition={{ ...fadeIn.transition, delay: 0.25 }}
                    className="relative mb-8"
                >
                    <div className="relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                        <Image
                            src={visualSystem.images[0].src}
                            alt={visualSystem.images[0].alt}
                            width={1200}
                            height={700}
                            className="w-full h-auto object-contain rounded-2xl"
                            placeholder="blur"
                            blurDataURL={BLUR_PLACEHOLDER}
                        />
                    </div>
                    {/* Annotation - right side */}
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="absolute -right-48 md:-right-56 top-1/3 hidden lg:flex items-center gap-2 z-10"
                    >
                        <svg width="50" height="50" viewBox="0 0 80 80" fill="none" className="flex-shrink-0">
                            <motion.path
                                d={visualSystemAnnotations[0].arrowPath}
                                stroke="#475569"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            />
                        </svg>
                        <p
                            className="max-w-[140px] leading-snug"
                            style={{
                                fontFamily: "var(--font-caveat), cursive",
                                fontSize: "22px",
                                color: "#475569",
                                fontWeight: 500,
                            }}
                        >
                            {visualSystem.images[0].annotation}
                        </p>
                    </motion.div>
                </motion.div>

                {/* Images 2 & 3: Level templates - 2 column grid */}
                <motion.div
                    {...fadeIn}
                    transition={{ ...fadeIn.transition, delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {visualSystem.images.slice(1).map((image, index) => (
                        <div key={index} className="relative">
                            <div className="relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    width={600}
                                    height={450}
                                    className="w-full h-auto object-contain rounded-2xl"
                                    placeholder="blur"
                                    blurDataURL={BLUR_PLACEHOLDER}
                                />
                            </div>
                            {/* Annotation - arrow first, text below */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                className="flex flex-col items-start mt-4"
                            >
                                <svg width="60" height="60" viewBox="0 0 80 80" fill="none" className="flex-shrink-0">
                                    <motion.path
                                        d={visualSystemAnnotations[index + 1].arrowPath}
                                        stroke="#475569"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                                    />
                                </svg>
                                <p
                                    className="leading-snug mt-1"
                                    style={{
                                        fontFamily: "var(--font-caveat), cursive",
                                        fontSize: "22px",
                                        color: "#475569",
                                        fontWeight: 500,
                                    }}
                                >
                                    {image.annotation}
                                </p>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 8: PUBLIC LAUNCH & ONGOING IMPACT
// Purpose: Document post-launch public impact
// Anti-Gravity: restrained, institutional, calm
// ============================================

function PublicImpactSection() {
    const { publicImpact } = eCrimeHubCaseStudyData;

    return (
        <section className="py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-6">
                {/* Main Statement with Highlights - replaces header */}
                <motion.h2
                    {...fadeInUp}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 leading-snug mb-16"
                >
                    The platform was officially introduced through a <Highlighter action="underline" color="#475569" strokeWidth={2} isView>public launch</Highlighter> aligned with Dubai Police's cybersecurity initiatives. The focus was to establish <Highlighter action="underline" color="#475569" strokeWidth={2} isView>trust</Highlighter>, <Highlighter action="underline" color="#475569" strokeWidth={2} isView>visibility</Highlighter>, and a clear path for citizens to report and understand cybercrime.
                </motion.h2>

                {/* Block 1: Official Public Launch - Full Width Media */}
                <motion.div
                    {...fadeIn}
                    transition={{ ...fadeIn.transition, delay: 0.15 }}
                    className="mb-20"
                >
                    <div className="relative aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden">
                        <Image
                            src={publicImpact.officialLaunch.media.src}
                            alt={publicImpact.officialLaunch.media.alt}
                            fill
                            className="object-cover"
                            placeholder="blur"
                            blurDataURL={BLUR_PLACEHOLDER}
                        />
                    </div>
                </motion.div>

                {/* Block 2: Ongoing Engagement Text + Awareness Images */}
                <motion.div
                    {...fadeIn}
                    transition={{ ...fadeIn.transition, delay: 0.2 }}
                    className="mb-20"
                >
                    {/* Text above images */}
                    <p className="text-lg text-gray-900 leading-relaxed mb-4">
                        Following launch, the platform became part of ongoing cybersecurity awareness efforts. Monthly quizzes, public education initiatives, and school programs were introduced to keep citizens informed as cyber threats continued to evolve.
                    </p>
                    <p className="text-base text-gray-400 leading-relaxed italic mb-10">
                        The impact of the platform is measured through sustained public participation and trust, not short-term engagement metrics.
                    </p>

                    {/* 3 Awareness Campaign Images */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {publicImpact.awarenessCampaigns.images.map((image, index) => (
                            <div key={index} className="relative aspect-[3/2] bg-gray-100 rounded-xl overflow-hidden">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover"
                                    placeholder="blur"
                                    blurDataURL={BLUR_PLACEHOLDER}
                                />
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 9: OUTCOME (Legacy - not rendered)
// Purpose: Close the loop without exposure
// No numbers. No claims. Just confidence.
// ============================================

function OutcomeSection() {
    const { outcome } = eCrimeHubCaseStudyData;

    return (
        <section className="py-20 md:py-28">
            <div className="max-w-2xl mx-auto px-6">
                <motion.h2
                    {...fadeInUp}
                    className="text-xl md:text-2xl font-medium text-gray-900 mb-8"
                >
                    {outcome.heading}
                </motion.h2>
                <motion.p
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="text-lg text-gray-500 leading-relaxed"
                >
                    {outcome.body}
                </motion.p>
            </div>
        </section>
    );
}

// ============================================
// SECTION 9: LEARNINGS
// Purpose: Reflect maturity
// ============================================

function LearningsSection() {
    const { learnings } = eCrimeHubCaseStudyData;

    return (
        <section className="py-20 md:py-28 bg-gray-50">
            <div className="max-w-2xl mx-auto px-6">
                <motion.h2
                    {...fadeInUp}
                    className="text-xl md:text-2xl font-medium text-gray-900 mb-10"
                >
                    {learnings.heading}
                </motion.h2>
                <ul className="space-y-6">
                    {learnings.items.map((item, index) => (
                        <motion.li
                            key={index}
                            {...fadeInUp}
                            transition={{ ...fadeInUp.transition, delay: 0.1 * (index + 1) }}
                            className="text-lg text-gray-600 leading-relaxed pl-6 relative before:content-[''] before:absolute before:left-0 before:top-3 before:w-1.5 before:h-1.5 before:bg-gray-400 before:rounded-full"
                        >
                            {item}
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

// ============================================
// SECTION 10: WHAT'S EVOLVING
// Purpose: Signal continuity without emphasis
// Optional, soft - no visuals needed
// ============================================

function EvolvingSection() {
    const { evolving } = eCrimeHubCaseStudyData;

    return (
        <section className="py-20 md:py-28">
            <div className="max-w-5xl mx-auto px-6">
                {/* Main Statement as Heading */}
                <motion.h2
                    {...fadeInUp}
                    className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-900 leading-snug mb-8"
                >
                    {evolving.mainStatement}
                </motion.h2>
                {/* Body in black */}
                <motion.p
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="text-lg text-gray-900 leading-relaxed"
                >
                    {evolving.body}
                </motion.p>
            </div>
        </section>
    );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function ECrimeHubCaseStudy() {
    return (
        <article className="bg-white">
            <HeroSection />
            <ContextSection />
            <ObjectiveSection />
            <RoleSection />
            <DesignApproachSection />
            <VisualSystemSection />
            <PublicImpactSection />
            <EvolvingSection />
        </article>
    );
}
