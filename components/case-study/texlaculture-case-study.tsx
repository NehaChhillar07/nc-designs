"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { texlacultureCaseStudy } from "@/data/case-study-data";
import { Highlighter } from "@/components/ui/highlighter";

const BLUR_PLACEHOLDER = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAQMDBAMBAAAAAAAAAAAAAQIDBAAFEQYSITETQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgARIUH/2gAMAwEAAhEDEQA/AKNzu1wvN2dc8r7kVtxQ2NKBSnaCQDnPOcnPFKUpSlKXAWMnZ//Z";

const data = texlacultureCaseStudy;

// Reusable animation variants
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -100px 0px" },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

// Hero Section — text-first pattern matching HF/eCrime
function HeroSection() {
    const { hero } = data;

    return (
        <section className="pt-24 md:pt-32 pb-20 md:pb-28">
            <div className="max-w-5xl mx-auto px-6">
                {/* Meta */}
                <motion.p
                    {...fadeInUp}
                    className="text-sm font-medium text-gray-900 tracking-wide mb-8"
                >
                    {hero.meta}
                </motion.p>

                {/* Title with Highlighter */}
                <motion.h1
                    {...fadeInUp}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight mb-8 max-w-4xl"
                    style={{ color: "#212B36" }}
                >
                    Building{" "}
                    <Highlighter action="highlight" color="#D3EEB3" isView>Solutions</Highlighter>
                    , Not just HR Management Software
                </motion.h1>

                {/* Tags */}
                <motion.p
                    {...fadeInUp}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
                    className="text-sm text-gray-400 tracking-wide"
                >
                    {hero.tags}
                </motion.p>

                {/* Timeline / Team / Role */}
                <motion.div
                    {...fadeInUp}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.25 }}
                    className="mt-12 flex flex-wrap items-start justify-between w-full gap-6"
                >
                    {[
                        ["Timeline", hero.timeline],
                        ["Team", hero.team],
                        ["Role", hero.role],
                    ].map(([label, value]) => (
                        <div key={label}>
                            <p className="text-sm md:text-base text-gray-400 mb-1">{label}</p>
                            <p className="text-lg md:text-xl font-medium" style={{ color: "#212B36" }}>{value}</p>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Hero Image Frame */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
                className="max-w-5xl mx-auto px-6 mt-16"
            >
                <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                        background: "#EAF6D8",
                        border: "1px solid #DFE3E8",
                    }}
                >
                    <div className="p-8 md:p-12 flex items-center justify-center">
                        <div className="relative w-full max-w-[881px] aspect-[881/492]">
                            <Image
                                src="/work/3rd-case study/hero-3rd-project.svg"
                                alt="TexlaCulture Dashboard"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}


// Self-Awareness Intro
function SelfAwarenessIntro() {
    return (
        <section className="py-8 md:py-12">
            <div className="flex flex-col items-start max-w-[900px] mx-auto">
                <motion.div
                    className="rounded-xl p-6 md:p-8"
                    style={{
                        background: "rgba(234, 246, 216, 0.4)",
                        border: "1px solid #DFE3E8",
                    }}
                    {...fadeInUp}
                >
                    <p
                        className="font-normal italic leading-[160%]"
                        style={{ fontSize: "16px", color: "#454F5B" }}
                    >
                        {data.selfAwareness.content}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

// Brief & Problem Statement
function BriefSection() {
    return (
        <section className="py-12 md:py-16">
            {/* Main Container - increased width */}
            <div className="flex flex-col items-start max-w-[900px] mx-auto" style={{ gap: "68px" }}>

                {/* Title & Brief Container - matches Frame 1000004533 */}
                <div className="flex flex-col items-start w-full" style={{ gap: "24px" }}>
                    {/* Main Title */}
                    <motion.h1
                        className="font-semibold leading-[125%]"
                        style={{
                            fontSize: "38px",
                            color: "#212B36"
                        }}
                        {...fadeInUp}
                    >
                        {data.hero.title}
                    </motion.h1>

                    {/* Brief Section - matches Frame 1000004521 */}
                    <motion.div
                        className="flex flex-col items-start w-full"
                        style={{ gap: "8px" }}
                        {...fadeInUp}
                    >
                        <h3
                            className="font-semibold leading-[145%]"
                            style={{
                                fontSize: "20px",
                                color: "#454F5B"
                            }}
                        >
                            {data.brief.title}
                        </h3>
                        <p
                            className="font-medium leading-[145%]"
                            style={{
                                fontSize: "16px",
                                color: "#212B36"
                            }}
                        >
                            {data.brief.content}
                        </p>
                    </motion.div>
                </div>

                {/* Problem Statement Section */}
                <motion.div
                    className="flex flex-col items-start w-full"
                    style={{ gap: "8px" }}
                    {...fadeInUp}
                >
                    <h3
                        className="font-semibold leading-[145%]"
                        style={{
                            fontSize: "20px",
                            color: "#454F5B"
                        }}
                    >
                        {data.problemStatement.title}
                    </h3>
                    <ul className="flex flex-col w-full list-disc pl-5" style={{ gap: "4px" }}>
                        <li className="font-medium leading-[145%]" style={{ fontSize: "16px", color: "#212B36" }}>
                            Users struggle with <Highlighter action="highlight" color="#FFE16A" isView>complex navigation</Highlighter> and <Highlighter action="highlight" color="#FFE16A" isView>technical jargon</Highlighter>, making simple tasks feel overwhelming.
                        </li>
                        <li className="font-medium leading-[145%]" style={{ fontSize: "16px", color: "#212B36" }}>
                            Constant <Highlighter action="highlight" color="#FFE16A" isView>back and forth</Highlighter> between multiple disconnected tools wastes time and breaks focus.
                        </li>
                        <li className="font-medium leading-[145%]" style={{ fontSize: "16px", color: "#212B36" }}>
                            <Highlighter action="highlight" color="#FFE16A" isView>Lack of customizable policy</Highlighter> settings leads to <Highlighter action="highlight" color="#FFE16A" isView>forced compromises</Highlighter> in workflow.
                        </li>
                        <li className="font-medium leading-[145%]" style={{ fontSize: "16px", color: "#212B36" }}>
                            Existing solutions <Highlighter action="highlight" color="#FFE16A" isView>fail</Highlighter> to provide a <Highlighter action="underline" color="#A8D08D" isView>user-friendly, human-centric design</Highlighter> experience.
                        </li>
                        <li className="font-medium leading-[145%]" style={{ fontSize: "16px", color: "#212B36" }}>
                            Need for a platform that naturally <Highlighter action="underline" color="#A8D08D" isView>engages employees</Highlighter> rather than just tracking them.
                        </li>
                    </ul>
                </motion.div>
            </div>
        </section>
    );
}

// Testimonials Section
function TestimonialsSection() {
    // Generate horizontal lines for background - increased spacing
    const lines = Array.from({ length: 22 }, (_, i) => i * 24);

    return (
        <section className="py-12 md:py-16 relative overflow-hidden">
            {/* Horizontal Lines Background */}
            <div className="absolute inset-0 w-full h-full">
                {lines.map((top, index) => (
                    <div
                        key={index}
                        className="absolute w-full"
                        style={{
                            top: `${top}px`,
                            height: "0px",
                            borderBottom: "1px solid #F4F6F8"
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header Banner */}
                <motion.div
                    className="max-w-[642px] mx-auto mb-16 py-3 px-4 text-center"
                    style={{ background: "#365B23" }}
                    {...fadeInUp}
                >
                    <p
                        className="font-semibold leading-[150%]"
                        style={{
                            fontSize: "18px",
                            color: "#FFFFFF"
                        }}
                    >
                        {data.testimonials.headerText}
                    </p>
                </motion.div>

                {/* Testimonial Cards - Scattered Layout */}
                <div className="relative min-h-[400px]">
                    {data.testimonials.quotes.map((quote, index) => {
                        // Position each card differently
                        const positions = [
                            { left: "5%", top: "0%" },
                            { right: "5%", top: "20%" },
                            { left: "25%", top: "55%" },
                        ];
                        const pos = positions[index % 3];

                        return (
                            <motion.div
                                key={index}
                                className="flex items-start gap-[6px] mb-8 md:mb-0 md:absolute"
                                style={{
                                    ...pos,
                                    maxWidth: index === 1 ? "640px" : "520px"
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                            >
                                {/* Avatar - Initials */}
                                <div
                                    className="flex-shrink-0 rounded-full flex items-center justify-center font-semibold"
                                    style={{
                                        width: "65.57px",
                                        height: "65.57px",
                                        border: "1.66px solid #C4CDD5",
                                        background: ["#D3EEB3", "#B8D4E3", "#F5D5A0"][index],
                                        color: "#365B23",
                                        fontSize: "20px",
                                    }}
                                >
                                    {quote.name.split(' ').map(n => n[0]).join('')}
                                </div>

                                {/* Quote Card */}
                                <div
                                    className="flex flex-col p-3"
                                    style={{
                                        background: "rgba(234, 246, 216, 0.25)",
                                        border: "1px solid #DFE3E8",
                                        backdropFilter: "blur(9px)",
                                        borderRadius: "12px",
                                        gap: "8px"
                                    }}
                                >
                                    {/* Name & Role */}
                                    <div className="flex flex-col" style={{ gap: "2px" }}>
                                        <p
                                            className="font-semibold leading-[127.5%]"
                                            style={{
                                                fontSize: "16px",
                                                color: "#212B36"
                                            }}
                                        >
                                            {quote.name}
                                        </p>
                                        <p
                                            className="font-medium leading-[127.5%]"
                                            style={{
                                                fontSize: "12px",
                                                color: "#919EAB"
                                            }}
                                        >
                                            {quote.role}
                                        </p>
                                    </div>

                                    {/* Quote Text */}
                                    <p
                                        className="font-normal leading-[26px]"
                                        style={{
                                            fontSize: "18px",
                                            color: "#161C24"
                                        }}
                                    >
                                        {quote.quote}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// Product Approach Card
function ProductApproachSection() {
    return (
        <section className="py-12 md:py-16">
            <motion.div
                className="p-6 md:p-8 rounded-lg"
                style={{
                    background: "#F2FAE8",
                    border: "1px solid #DFE3E8",
                }}
                {...fadeInUp}
            >
                {/* Header */}
                <div className="mb-8">
                    <h3
                        className="font-semibold leading-[145%] mb-2"
                        style={{ fontSize: "20px", color: "#212B36" }}
                    >
                        {data.productApproach.title}
                    </h3>
                    <p
                        className="font-normal leading-[145%]"
                        style={{ fontSize: "14px", color: "#454F5B" }}
                    >
                        {data.productApproach.subtitle}
                    </p>
                </div>

                {/* Items in 2-column grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {data.productApproach.items.map((item, index) => (
                        <div key={index} className="space-y-2">
                            <h4
                                className="font-semibold leading-[145%]"
                                style={{ fontSize: "16px", color: "#212B36" }}
                            >
                                {item.title}
                            </h4>
                            <ul className="list-disc pl-5 space-y-1">
                                {item.points.map((point, i) => (
                                    <li
                                        key={i}
                                        className="font-normal leading-[145%]"
                                        style={{ fontSize: "14px", color: "#454F5B" }}
                                    >
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}



function NavigationSystemSection() {
    return (
        <section className="py-12 md:py-16" style={{ gap: "48px" }}>
            {/* Section Title - 32px bold */}
            <motion.h2
                className="font-bold leading-[125%] mb-12"
                style={{ fontSize: "32px", color: "#212B36" }}
                {...fadeInUp}
            >
                {data.navigationSystem.title}
            </motion.h2>

            {/* Ideation Section */}
            <motion.div className="flex flex-col" style={{ gap: "21px", marginBottom: "32px" }} {...fadeInUp}>
                <h3
                    className="font-normal leading-[125%]"
                    style={{ fontSize: "20px", color: "#454F5B" }}
                >
                    {data.navigationSystem.ideation.title}
                </h3>

                {/* Content Row - Image + Text */}
                <div className="flex flex-col lg:flex-row" style={{ gap: "32px" }}>
                    {/* Image - 709px width with border */}
                    <div
                        className="flex-shrink-0 rounded-xl overflow-hidden"
                        style={{
                            width: "709px",
                            maxWidth: "100%",
                            border: "2px solid #919EAB",
                        }}
                    >
                        <Image
                            src="/work/3rd-case study/navigation-1.svg"
                            alt="Navigation Iteration 1"
                            className="w-full h-auto"
                            width={709}
                            height={400}
                            sizes="(max-width: 1024px) 100vw, 709px"
                            unoptimized
                        />
                    </div>

                    {/* Text Description */}
                    <div className="flex flex-col" style={{ gap: "8px", maxWidth: "410px" }}>
                        {/* Iteration label */}
                        <p
                            className="font-medium"
                            style={{ fontSize: "20px", lineHeight: "125%", color: "#919EAB" }}
                        >
                            {data.navigationSystem.ideation.iteration}
                        </p>

                        {/* Description + Problems */}
                        <div className="flex flex-col" style={{ gap: "24px" }}>
                            <p
                                className="font-medium leading-[132%]"
                                style={{ fontSize: "14px", color: "#454F5B" }}
                            >
                                {data.navigationSystem.ideation.description}
                            </p>

                            {/* Problems */}
                            <div className="flex flex-col" style={{ gap: "4px" }}>
                                {data.navigationSystem.ideation.problems.map((problem, i) => (
                                    <p
                                        key={i}
                                        className="font-semibold"
                                        style={{ fontSize: "14px", lineHeight: "14px", color: "#212B36" }}
                                    >
                                        {problem}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Finalized Flow Section - Row Layout */}
            <motion.div className="flex flex-col lg:flex-row items-end" style={{ gap: "16px", marginBottom: "32px" }} {...fadeInUp}>
                {/* Text Content - Bottom Aligned */}
                <div className="flex flex-col justify-end" style={{ gap: "8px", maxWidth: "432px" }}>
                    {/* Title - Same size as Iteration 1 (20px) */}
                    <p
                        className="font-medium"
                        style={{ fontSize: "20px", lineHeight: "125%", color: "#919EAB" }}
                    >
                        {data.navigationSystem.finalized.title}
                    </p>

                    {/* Description + Features - 12px */}
                    <div className="flex flex-col" style={{ gap: "24px" }}>
                        <p
                            className="font-medium leading-[132%]"
                            style={{ fontSize: "14px", color: "#454F5B" }}
                        >
                            {data.navigationSystem.finalized.description}
                        </p>

                        {/* Features */}
                        <div className="flex flex-col" style={{ gap: "10px" }}>
                            {data.navigationSystem.finalized.features.map((feature, i) => (
                                <p
                                    key={i}
                                    className="font-semibold"
                                    style={{ fontSize: "14px", lineHeight: "14px", color: "#212B36" }}
                                >
                                    • {feature}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Finalized Images with Badge - 2 Image Placeholders */}
                <div className="relative flex-1">
                    {/* Finalized Badge */}
                    <div
                        className="absolute flex items-center justify-center rounded-full z-10"
                        style={{
                            width: "72px",
                            height: "71px",
                            left: "0px",
                            top: "0px",
                            background: "#365B23",
                        }}
                    >
                        <span
                            className="font-semibold"
                            style={{ fontSize: "14px", lineHeight: "14px", color: "#FFFFFF" }}
                        >
                            Finalized
                        </span>
                    </div>

                    {/* Images Container */}
                    <div className="flex flex-col" style={{ marginLeft: "27px", marginTop: "27px" }}>
                        {/* Image */}
                        <div
                            className="rounded-xl overflow-hidden"
                            style={{
                                width: "100%",
                            }}
                        >
                            <Image
                                src="/work/3rd-case study/navigation-2.svg"
                                alt="Navigation Finalized"
                                className="w-full h-auto"
                                width={1200}
                                height={600}
                                sizes="100vw"
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Cross-functional collaboration moment */}
            {data.challengeTakeaway.collaboration && (
                <motion.div
                    className="rounded-xl p-5 md:p-6 mt-8"
                    style={{
                        background: "rgba(234, 246, 216, 0.4)",
                        border: "1px solid #DFE3E8",
                    }}
                    {...fadeInUp}
                >
                    <p
                        className="font-semibold mb-2"
                        style={{ fontSize: "12px", color: "#919EAB", letterSpacing: "0.2em", textTransform: "uppercase" }}
                    >
                        Working with Engineering
                    </p>
                    <p
                        className="font-medium leading-[155%]"
                        style={{ fontSize: "14px", color: "#454F5B" }}
                    >
                        {data.challengeTakeaway.collaboration}
                    </p>
                </motion.div>
            )}
        </section>
    );
}

function PersonalizedThemeSection() {
    return (
        <section className="py-12 md:py-16 flex flex-col" style={{ gap: "55px" }}>
            {/* Section Title - 32px bold */}
            <motion.h2
                className="font-bold leading-[125%]"
                style={{ fontSize: "32px", color: "#212B36" }}
                {...fadeInUp}
            >
                {data.personalizedTheme.title}
            </motion.h2>

            {/* Content Container */}
            <div className="flex flex-col items-center" style={{ gap: "34px" }}>
                {/* Ideation Section - Image + Text Row */}
                <motion.div className="flex flex-col w-full" style={{ gap: "26px" }} {...fadeInUp}>
                    {/* Ideation Title - 20px normal (matching other sections) */}
                    <h3
                        className="font-normal leading-[125%]"
                        style={{ fontSize: "20px", color: "#454F5B" }}
                    >
                        {data.personalizedTheme.ideation.title}
                    </h3>

                    {/* Content Row - Image + Text */}
                    <div className="flex flex-col lg:flex-row" style={{ gap: "38px" }}>
                        {/* Image - 648px width */}
                        <div
                            className="flex-shrink-0 overflow-hidden"
                            style={{
                                width: "648px",
                                maxWidth: "100%",
                                borderRadius: "19px",
                            }}
                        >
                            <Image
                                src="/work/3rd-case study/personalised-1.svg"
                                alt="Theme Iteration"
                                className="w-full h-auto"
                                width={709}
                                height={400}
                                sizes="(max-width: 1024px) 100vw, 709px"
                                unoptimized
                            />
                        </div>

                        {/* Text Description - 466px width */}
                        <div className="flex flex-col justify-between" style={{ width: "466px", maxWidth: "100%" }}>
                            {/* Iteration 1 + Description */}
                            <div className="flex flex-col" style={{ gap: "8px" }}>
                                {/* Iteration label - 20px medium */}
                                <p
                                    className="font-medium"
                                    style={{ fontSize: "20px", lineHeight: "125%", color: "#919EAB" }}
                                >
                                    {data.personalizedTheme.ideation.iteration}
                                </p>

                                {/* Description + Feedback */}
                                <div className="flex flex-col" style={{ gap: "24px" }}>
                                    <p
                                        className="font-medium leading-[132%]"
                                        style={{ fontSize: "14px", color: "#454F5B" }}
                                    >
                                        {data.personalizedTheme.ideation.description}
                                    </p>

                                    <p
                                        className="font-semibold leading-[132%]"
                                        style={{ fontSize: "14px", color: "#212B36" }}
                                    >
                                        {data.personalizedTheme.ideation.feedback}
                                    </p>
                                </div>
                            </div>

                            {/* Finalized Flow + Description */}
                            <div className="flex flex-col" style={{ gap: "8px", marginTop: "24px" }}>
                                {/* Finalized label - 20px medium (same as Iteration) */}
                                <p
                                    className="font-medium"
                                    style={{ fontSize: "20px", lineHeight: "125%", color: "#919EAB" }}
                                >
                                    {data.personalizedTheme.finalized.title}
                                </p>

                                {/* Description + Result */}
                                <div className="flex flex-col" style={{ gap: "24px" }}>
                                    <p
                                        className="font-medium leading-[132%]"
                                        style={{ fontSize: "14px", color: "#454F5B" }}
                                    >
                                        {data.personalizedTheme.finalized.description}
                                    </p>

                                    <p
                                        className="font-semibold leading-[132%]"
                                        style={{ fontSize: "14px", color: "#212B36" }}
                                    >
                                        {data.personalizedTheme.finalized.result}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Theme Image - Single Full Width */}
                <motion.div
                    className="w-full rounded-xl overflow-hidden"
                    {...fadeInUp}
                >
                    <Image
                        src="/work/3rd-case study/personalised-2.svg"
                        alt="Theme Variations"
                        className="w-full h-auto"
                        width={1200}
                        height={600}
                        sizes="100vw"
                        unoptimized
                    />
                </motion.div>

                {/* UX Approach Card - Centered, matching above section */}
                <motion.div
                    className="p-5 md:p-6 rounded-xl mx-auto"
                    style={{ background: "rgba(234, 246, 216, 0.6)", maxWidth: "768px" }}
                    {...fadeInUp}
                >
                    <h4
                        className="font-semibold mb-3"
                        style={{ fontSize: "14px", color: "#212B36" }}
                    >
                        UX Approach Implemented:
                    </h4>
                    <div className="space-y-1">
                        {data.personalizedTheme.uxApproach.map((item, i) => (
                            <p
                                key={i}
                                className="font-medium"
                                style={{ fontSize: "14px", color: "#212B36" }}
                            >
                                • {item}
                            </p>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function ActualDevelopedFeatureSection() {
    return (
        <section className="py-12 md:py-16">
            {/* Section Title - 32px bold */}
            <motion.h2
                className="font-bold leading-[125%] mb-8"
                style={{ fontSize: "32px", color: "#212B36" }}
                {...fadeInUp}
            >
                Actual Developed Home Screen
            </motion.h2>

            {/* Full-width Image */}
            <motion.div
                className="rounded-xl overflow-hidden mb-8"
                style={{ width: "100%" }}
                {...fadeInUp}
            >
                <Image
                    src="/work/3rd-case study/developed-home.svg"
                    alt="Actual Developed Home Screen"
                    className="w-full h-auto"
                    width={1200}
                    height={600}
                    sizes="100vw"
                    unoptimized
                />
            </motion.div>

            {/* UX Approach Card - Centered */}
            <motion.div
                className="p-5 md:p-6 rounded-xl mx-auto"
                style={{ background: "rgba(234, 246, 216, 0.6)", maxWidth: "768px" }}
                {...fadeInUp}
            >
                <h4
                    className="font-semibold mb-3"
                    style={{ fontSize: "14px", color: "#212B36" }}
                >
                    UX Approach Implemented:
                </h4>
                <div className="space-y-1">
                    {data.navigationSystem.uxApproach.map((item, i) => (
                        <p
                            key={i}
                            className="font-medium"
                            style={{ fontSize: "14px", color: "#212B36" }}
                        >
                            • {item}
                        </p>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

function IdeationSection() {
    return (
        <section className="py-12 md:py-16">
            {/* Section Title - 32px bold */}
            <motion.h2
                className="font-bold leading-[125%] mb-8"
                style={{ fontSize: "32px", color: "#212B36" }}
                {...fadeInUp}
            >
                {data.ideation.title}
            </motion.h2>

            {/* Image Collage - Full Width */}
            <motion.div
                className="rounded-xl mb-6 overflow-hidden"
                style={{ width: "100%" }}
                {...fadeInUp}
            >
                {data.ideation.image ? (
                    <Image
                        src={data.ideation.image}
                        alt="Ideation Photos Collage"
                        className="w-full h-auto"
                        width={1200}
                        height={600}
                        sizes="100vw"
                        unoptimized
                    />
                ) : (
                    <div
                        className="flex items-center justify-center"
                        style={{
                            aspectRatio: "2 / 1",
                            border: "2px solid #919EAB",
                            background: "#F4F6F8",
                        }}
                    >
                        <span
                            className="font-medium"
                            style={{ fontSize: "14px", color: "#919EAB" }}
                        >
                            Ideation Photos Collage
                        </span>
                    </div>
                )}
            </motion.div>

            {/* Text - Centered container with left-aligned text */}
            <motion.div className="space-y-3 mx-auto text-left" style={{ maxWidth: "800px" }} {...fadeInUp}>
                <p
                    className="font-medium leading-[150%]"
                    style={{ fontSize: "14px", color: "#454F5B" }}
                >
                    {data.ideation.description}
                </p>
                <p
                    className="font-semibold leading-[150%]"
                    style={{ fontSize: "14px", color: "#212B36" }}
                >
                    {data.ideation.summary}
                </p>
            </motion.div>
        </section>
    );
}

function WireframesSection() {
    return (
        <section className="py-12 md:py-16">
            {/* Section Title - 32px bold */}
            <motion.h2
                className="font-bold leading-[125%] mb-8"
                style={{ fontSize: "32px", color: "#212B36" }}
                {...fadeInUp}
            >
                {data.wireframes.title}
            </motion.h2>

            {/* Wireframes - Full Width */}
            <motion.div
                className="-mx-8 md:-mx-16 lg:-mx-24"
                {...fadeInUp}
            >
                {data.wireframes.images && data.wireframes.images.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {data.wireframes.images.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                alt={`Wireframe ${index + 1}`}
                                className="w-full h-auto"
                                width={1200}
                                height={600}
                                sizes="100vw"
                                unoptimized
                            />
                        ))}
                    </div>
                ) : (
                    <div
                        className="flex items-center justify-center"
                        style={{
                            aspectRatio: "3 / 1",
                            border: "2px solid #919EAB",
                            background: "#F4F6F8",
                            width: "100%",
                        }}
                    >
                        <span
                            className="font-medium"
                            style={{ fontSize: "14px", color: "#919EAB" }}
                        >
                            Wireframe Images
                        </span>
                    </div>
                )}
            </motion.div>
        </section>
    );
}

function PrototypeTestingSection() {
    return (
        <section
            className="py-12 md:py-16"
            style={{ background: "#F0F7E6" }}
        >
            <div className="container mx-auto px-4">
                {/* Heading and description */}
                <motion.div className="mb-8" style={{ maxWidth: "800px" }} {...fadeInUp}>
                    <p
                        className="font-semibold mb-4"
                        style={{ fontSize: "16px", lineHeight: "145%", color: "#212B36" }}
                    >
                        After creating high-fidelity designs, we prototyped each module for initial testing across multiple departments.
                    </p>
                    <p
                        className="font-medium"
                        style={{ fontSize: "14px", lineHeight: "145%", color: "#454F5B" }}
                    >
                        This testing aimed to understand how quickly users could perform actions, identify if they needed assistance with any tasks, and uncover any concerns that arose during internal testing.
                    </p>
                </motion.div>

                {/* Prototype Image */}
                <motion.div
                    className="overflow-hidden rounded-xl mt-8"
                    style={{ width: "100%" }}
                    {...fadeInUp}
                >
                    {data.prototypeTesting.image && (
                        <Image
                            src={data.prototypeTesting.image}
                            alt="Prototype Testing Flow"
                            className="w-full h-auto"
                            width={1200}
                            height={600}
                            sizes="100vw"
                            unoptimized
                        />
                    )}
                </motion.div>
            </div>
        </section>
    );
}

function UsabilityTestingSection() {
    return (
        <section className="py-12 md:py-16">
            {/* Section Title - 32px bold */}
            <motion.div className="mb-8" {...fadeInUp}>
                <h2
                    className="font-bold leading-[125%] mb-3"
                    style={{ fontSize: "32px", color: "#212B36" }}
                >
                    {data.usabilityTesting.title}
                </h2>
                <p
                    className="font-semibold mt-2"
                    style={{ fontSize: "14px", lineHeight: "145%", color: "#212B36" }}
                >
                    {data.usabilityTesting.note}
                </p>
            </motion.div>

            {/* Components Grid - 5 equal cards */}
            <motion.div
                className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
                {...fadeInUp}
            >
                {data.usabilityTesting.components.map((component, index) => (
                    <div
                        key={index}
                        className="p-4 rounded-lg"
                        style={{
                            background: "rgba(234, 246, 216, 0.5)",
                            border: "1px solid #C4CDD5",
                        }}
                    >
                        <h4
                            className="font-semibold mb-2"
                            style={{ fontSize: "14px", color: "#212B36" }}
                        >
                            {component.title}
                        </h4>
                        <p
                            className="font-medium"
                            style={{ fontSize: "14px", lineHeight: "145%", color: "#454F5B" }}
                        >
                            {component.description}
                        </p>
                    </div>
                ))}
            </motion.div>
        </section>
    );
}

function HiFiDesignsSection() {
    return (
        <section className="py-12 md:py-16">
            {/* Section Title - 32px bold, centered */}
            <motion.h2
                className="font-bold leading-[125%] text-center"
                style={{ fontSize: "32px", color: "#212B36", marginBottom: "18px" }}
                {...fadeInUp}
            >
                {data.hifiDesigns.title}
            </motion.h2>

            {/* Access Request - Centered */}
            <motion.div
                className="mb-0 flex flex-col items-center text-center"
                style={{ gap: "24px" }}
                {...fadeInUp}
            >
                <p
                    className="font-medium leading-[145%]"
                    style={{ fontSize: "14px", color: "#454F5B", maxWidth: "700px" }}
                >
                    Here are the high-fidelity designs for an overview of each module.
                </p>
                <a
                    href={data.hifiDesigns.requestAccess.mailto}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-medium transition-colors hover:opacity-90"
                    style={{ background: "#365B23", color: "#FFFFFF", fontSize: "16px" }}
                >
                    {data.hifiDesigns.requestAccess.label}
                </a>
            </motion.div>

            {/* Explore / Hi-Fi Image */}
            {/* Removed Hi-Fi Image as per instruction */}
        </section>
    );
}

function DesignSystemSection() {
    return (
        <section className="py-12 md:py-16">
            <div className="flex flex-col" style={{ gap: "42px" }}>
                {/* Section Header - Title + Description */}
                <motion.div className="flex flex-col" style={{ gap: "12px", maxWidth: "712px" }} {...fadeInUp}>
                    {/* Title - 32px bold to match other sections */}
                    <h2
                        className="font-bold leading-[125%]"
                        style={{ fontSize: "32px", color: "#212B36" }}
                    >
                        {data.designSystem.title}
                    </h2>
                    {/* Description - 14px regular grey */}
                    <p
                        className="font-normal"
                        style={{ fontSize: "14px", lineHeight: "145%", color: "#454F5B" }}
                    >
                        {data.designSystem.description}
                    </p>
                </motion.div>

                {/* Image Container with Implementation Text and Highlight Card */}
                <motion.div className="relative" {...fadeInUp}>
                    {/* Implementation Text - 18px semibold, positioned above image */}
                    <div className="flex flex-col mb-4" style={{ gap: "8px", maxWidth: "697px" }}>
                        {data.designSystem.implementation.map((item, i) => (
                            <p
                                key={i}
                                className="font-semibold"
                                style={{ fontSize: "18px", lineHeight: "145%", color: "#212B36" }}
                            >
                                {item}
                            </p>
                        ))}
                    </div>

                    {/* Image + Highlight Card positioned relatively */}
                    <div className="relative">
                        {/* Green Highlight Card - Top Right, positioned above */}
                        <div
                            className="absolute flex items-center justify-center pointer-events-none"
                            style={{
                                background: "#EAF6D8", // Stronger green highlight
                                padding: "24px",
                                right: "0",
                                top: "-60px",
                                maxWidth: "460px",
                                zIndex: 10,
                                borderRadius: "12px",
                            }}
                        >
                            <p
                                className="font-medium"
                                style={{ fontSize: "14px", lineHeight: "145%", color: "#000000" }}
                            >
                                {data.designSystem.note}
                            </p>
                        </div>

                        {/* Design System Image - Full Width */}
                        <div
                            className="overflow-hidden"
                            style={{
                                width: "100%",
                                marginTop: "36px",
                                borderRadius: "20px",
                            }}
                        >
                            {data.designSystem.image ? (
                                <Image
                                    src={data.designSystem.image}
                                    alt="Design System Overview"
                                    className="w-full h-auto"
                                    width={1200}
                                    height={600}
                                    sizes="100vw"
                                    unoptimized
                                />
                            ) : (
                                <div
                                    className="flex items-center justify-center"
                                    style={{
                                        aspectRatio: "1152 / 688",
                                        background: "#F4F6F8",
                                        border: "2px solid #919EAB",
                                        borderRadius: "20px",
                                    }}
                                >
                                    <span
                                        className="font-medium"
                                        style={{ fontSize: "14px", color: "#919EAB" }}
                                    >
                                        Design System Overview Image
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// Main Component
// Consistent section wrapper for 42px padding
const SECTION_PADDING = "px-6";
const CONTENT_MAX_WIDTH = "max-w-6xl mx-auto";

export function TexlaCultureCaseStudy() {
    return (
        <article className="py-8 md:py-16">
            {/* All sections use same container width as hero */}
            <div className="container mx-auto px-4">
                <HeroSection />
            </div>
            <div className="container mx-auto px-4">
                <SelfAwarenessIntro />
                <BriefSection />
            </div>
            <TestimonialsSection />
            <div className="container mx-auto px-4">
                <ProductApproachSection />
                <NavigationSystemSection />
                <ActualDevelopedFeatureSection />
                <PersonalizedThemeSection />
                <IdeationSection />
                <WireframesSection />
            </div>
            <div className="container mx-auto px-4">
                <DesignSystemSection />
                <HiFiDesignsSection />
            </div>
            <PrototypeTestingSection />
            <div className="container mx-auto px-4">
                <UsabilityTestingSection />
            </div>
        </article>
    );
}
