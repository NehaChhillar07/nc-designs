"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { eCrimeHubCaseStudyData } from "@/data/ecrime-hub-data";

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
                    {hero.title}
                </motion.h1>

                {/* Tags - Small, quiet */}
                <motion.p
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.2 }}
                    className="text-sm text-gray-400 tracking-wide"
                >
                    {hero.tags}
                </motion.p>
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
                            className="w-full h-full object-cover"
                        >
                            <source
                                src="/work/2nd-case study/hero.mov"
                                type="video/quicktime"
                            />
                            <source
                                src="/work/2nd-case study/hero.mov"
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
    const { context } = eCrimeHubCaseStudyData;

    return (
        <section className="py-20 md:py-28">
            <div className="max-w-2xl mx-auto px-6">
                <motion.h2
                    {...fadeInUp}
                    className="text-xl md:text-2xl font-medium text-gray-900 mb-8"
                >
                    {context.heading}
                </motion.h2>
                <motion.p
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="text-lg text-gray-500 leading-relaxed"
                >
                    {context.body}
                </motion.p>
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
        <section className="py-20 md:py-28 bg-gray-50">
            <div className="max-w-2xl mx-auto px-6">
                <motion.h2
                    {...fadeInUp}
                    className="text-xl md:text-2xl font-medium text-gray-900 mb-10"
                >
                    {objective.heading}
                </motion.h2>
                <ul className="space-y-6">
                    {objective.items.map((item, index) => (
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
// SECTION 4: ROLE & RESPONSIBILITY
// Purpose: Define ownership boundaries clearly
// ============================================

function RoleSection() {
    const { role } = eCrimeHubCaseStudyData;

    return (
        <section className="py-20 md:py-28">
            <div className="max-w-2xl mx-auto px-6">
                <motion.h2
                    {...fadeInUp}
                    className="text-xl md:text-2xl font-medium text-gray-900 mb-8"
                >
                    {role.heading}
                </motion.h2>
                <motion.p
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="text-lg text-gray-500 leading-relaxed"
                >
                    {role.body}
                </motion.p>
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

function DesignApproachSection() {
    const { designApproach } = eCrimeHubCaseStudyData;

    return (
        <section className="py-20 md:py-28">
            <div className="max-w-4xl mx-auto px-6">
                <motion.h2
                    {...fadeInUp}
                    className="text-xl md:text-2xl font-medium text-gray-900 mb-16"
                >
                    {designApproach.heading}
                </motion.h2>

                <div className="space-y-20">
                    {designApproach.sections.map((section, index) => (
                        <div key={index} className="space-y-8">
                            <motion.h3
                                {...fadeInUp}
                                className="text-lg font-medium text-gray-900"
                            >
                                {section.title}
                            </motion.h3>
                            <motion.p
                                {...fadeInUp}
                                transition={{ ...fadeInUp.transition, delay: 0.1 }}
                                className="text-lg text-gray-500 leading-relaxed max-w-2xl"
                            >
                                {section.body}
                            </motion.p>
                            {section.image && (
                                <motion.div
                                    {...fadeIn}
                                    transition={{ ...fadeIn.transition, delay: 0.2 }}
                                    className="relative aspect-[16/10] bg-gray-100 rounded-xl overflow-hidden"
                                >
                                    <Image
                                        src={section.image}
                                        alt={section.imageAlt || ""}
                                        fill
                                        className="object-cover"
                                        placeholder="blur"
                                        blurDataURL={BLUR_PLACEHOLDER}
                                    />
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
// Purpose: Explain execution carefully
// Show illustration grid + hero variation
// ============================================

function VisualSystemSection() {
    const { visualSystem } = eCrimeHubCaseStudyData;

    return (
        <section className="py-20 md:py-28 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6">
                <motion.h2
                    {...fadeInUp}
                    className="text-xl md:text-2xl font-medium text-gray-900 mb-8"
                >
                    {visualSystem.heading}
                </motion.h2>
                <motion.p
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="text-lg text-gray-500 leading-relaxed max-w-2xl mb-12"
                >
                    {visualSystem.body}
                </motion.p>

                {/* Image Grid - 2 images */}
                <motion.div
                    {...fadeIn}
                    transition={{ ...fadeIn.transition, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    {visualSystem.images.map((image, index) => (
                        <div
                            key={index}
                            className="relative aspect-[3/2] bg-gray-200 rounded-lg overflow-hidden"
                        >
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
                </motion.div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 8: OUTCOME
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
            <div className="max-w-2xl mx-auto px-6">
                <motion.h2
                    {...fadeInUp}
                    className="text-lg font-medium text-gray-400 mb-6"
                >
                    {evolving.heading}
                </motion.h2>
                <motion.p
                    {...fadeInUp}
                    transition={{ ...fadeInUp.transition, delay: 0.1 }}
                    className="text-lg text-gray-400 leading-relaxed"
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
            <ConstraintsSection />
            <DesignApproachSection />
            <VisualSystemSection />
            <OutcomeSection />
            <LearningsSection />
            <EvolvingSection />
        </article>
    );
}
