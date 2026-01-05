"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { texlacultureCaseStudy } from "@/data/case-study-data";

const BLUR_PLACEHOLDER = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAQMDBAMBAAAAAAAAAAAAAQIDBAAFEQYSITETQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgARIUH/2gAMAwEAAhEDEQA/AKNzu1wvN2dc8r7kVtxQ2NKBSnaCQDnPOcnPFKUpSlKXAWMnZ//Z";

const data = texlacultureCaseStudy;

// Reusable animation variants
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

// Hero Section
function HeroSection() {
    return (
        <section
            className="relative rounded-[15px] overflow-hidden w-full"
            style={{
                background: "#EAF6D8",
                height: "675px",
                maxHeight: "675px",
            }}
        >
            {/* Hero Image - Centered */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[881px] h-[492px]" style={{ marginTop: "-40px" }}>
                    <Image
                        src="/work/3rd-case study/hero-3rd-project.svg"
                        alt="TexlaCulture Dashboard"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            {/* Metadata Row - Positioned at bottom */}
            <motion.div
                className="absolute bottom-[42px] left-0 right-0 px-8 flex flex-row items-start justify-center gap-28"
                {...fadeInUp}
            >
                {Object.values(data.metadata).map((item) => (
                    <div
                        key={item.label}
                        className="flex flex-col gap-1"
                    >
                        <span
                            className="text-sm font-medium leading-4"
                            style={{ color: "#000000" }}
                        >
                            {item.label}
                        </span>
                        <span
                            className="text-lg font-semibold leading-[21px]"
                            style={{ color: "#000000" }}
                        >
                            {item.value}
                        </span>
                    </div>
                ))}
            </motion.div>
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
                        {data.problemStatement.items.map((item, index) => {
                            // Define highlights for each item
                            const highlights: Record<number, string[]> = {
                                0: ["complex navigation", "technical jargon"],
                                1: ["back and forth"],
                                2: ["Lack of customizable policy", "forced compromises"],
                                3: ["fail", "user-friendly, human-centric design"],
                                4: ["engages employees"],
                            };

                            let highlightedText = item;
                            const itemHighlights = highlights[index] || [];

                            return (
                                <li
                                    key={index}
                                    className="font-medium leading-[145%]"
                                    style={{
                                        fontSize: "16px",
                                        color: "#212B36"
                                    }}
                                >
                                    {itemHighlights.length > 0 ? (
                                        <span dangerouslySetInnerHTML={{
                                            __html: itemHighlights.reduce((text, phrase) => {
                                                return text.replace(
                                                    phrase,
                                                    `<span style="background: #FFF5CC; padding: 0 2px;">${phrase}</span>`
                                                );
                                            }, item)
                                        }} />
                                    ) : (
                                        item
                                    )}
                                </li>
                            );
                        })}
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
                                {/* Avatar - Real person photos */}
                                <img
                                    src={`https://randomuser.me/api/portraits/${index === 1 ? 'men' : 'men'}/${index === 0 ? 32 : index === 1 ? 45 : 67}.jpg`}
                                    alt={quote.name}
                                    className="flex-shrink-0 rounded-full object-cover"
                                    style={{
                                        width: "65.57px",
                                        height: "65.57px",
                                        border: "1.66px solid #C4CDD5"
                                    }}
                                />

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
                        style={{ fontSize: "14px", color: "#637381" }}
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
                                        style={{ fontSize: "14px", color: "#637381" }}
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

// Target Market Section
function TargetMarketSection() {
    return (
        <section className="py-12 md:py-16">
            <div>
                <motion.h3
                    className="font-semibold leading-[145%] mb-6"
                    style={{ fontSize: "20px", color: "#212B36" }}
                    {...fadeInUp}
                >
                    {data.targetMarket.title}
                </motion.h3>

                {/* Stats Grid - 3 columns */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {data.targetMarket.stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {/* Label outside card */}
                            <p
                                className="font-normal leading-[145%] mb-2"
                                style={{ fontSize: "12px", color: "#919EAB" }}
                            >
                                {stat.label}
                            </p>
                            {/* Card with shadow */}
                            <div
                                className="p-4 rounded-lg bg-white shadow-sm"
                                style={{
                                    border: "1px solid #DFE3E8",
                                }}
                            >
                                <p
                                    className="font-normal leading-[145%] mb-1"
                                    style={{ fontSize: "14px", color: "#637381" }}
                                >
                                    {stat.companies}
                                </p>
                                <p
                                    className="font-semibold leading-[125%]"
                                    style={{ fontSize: "24px", color: "#212B36" }}
                                >
                                    {stat.value}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Summary Banner - Yellow/Green */}
                <motion.div
                    className="p-5 rounded-lg"
                    style={{
                        background: "#FFF5CC",
                        border: "1px solid #FFE16A",
                    }}
                    {...fadeInUp}
                >
                    <p
                        className="font-semibold leading-[145%]"
                        style={{ fontSize: "20px", color: "#212B36" }}
                    >
                        {data.targetMarket.summary}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

function UserPersonaSection() {
    const persona = data.userPersonas.detailedPersona;

    return (
        <section className="py-12 md:py-16">
            <div>
                <motion.h3
                    className="text-lg font-semibold text-muted-foreground mb-6"
                    {...fadeInUp}
                >
                    {data.userPersonas.title}
                </motion.h3>

                {/* Personas Grid */}
                <motion.div
                    className="flex flex-wrap gap-4 mb-8"
                    {...fadeInUp}
                >
                    {data.userPersonas.personas.map((p, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                            <div
                                className="w-12 h-12 rounded-full bg-muted"
                            />
                            <p className="text-xs font-semibold text-center text-foreground">
                                {p.name}
                            </p>
                            <p className="text-xs text-center text-muted-foreground">
                                {p.role}
                            </p>
                        </div>
                    ))}
                </motion.div>

                {/* Detailed Persona Card */}
                <motion.div
                    className="rounded-xl overflow-hidden shadow-md bg-white"
                    {...fadeInUp}
                >
                    {/* Header */}
                    <div
                        className="p-4 flex flex-wrap justify-between items-center gap-4"
                        style={{ background: "rgba(234, 246, 216, 0.5)" }}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-foreground">Persona</span>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-muted" />
                                <span className="text-xs text-foreground">{persona.name} Role: {persona.role}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-foreground">Age</span>
                            <span className="text-xs text-foreground">{persona.age}</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-5">
                        {/* Background */}
                        <div>
                            <p className="text-xs font-semibold text-foreground mb-1">Background</p>
                            <p className="text-sm leading-relaxed text-muted-foreground">{persona.background}</p>
                        </div>

                        {/* Approach */}
                        <div>
                            <p className="text-xs font-semibold text-foreground mb-1">Approach</p>
                            <div className="text-sm leading-relaxed text-muted-foreground">
                                {persona.approach.map((a, i) => (
                                    <p key={i} className="font-medium">{a}</p>
                                ))}
                            </div>
                        </div>

                        {/* Pain Points */}
                        <div>
                            <p className="text-xs font-semibold text-foreground mb-1">Pain Points</p>
                            <div className="text-sm leading-relaxed text-muted-foreground">
                                {persona.painPoints.map((p, i) => (
                                    <p key={i} className="font-medium">{p}</p>
                                ))}
                            </div>
                        </div>

                        {/* Personality & Decision Power */}
                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <p className="text-xs font-semibold text-foreground mb-2">Personality</p>
                                <div className="space-y-2">
                                    {persona.personality.map((trait, i) => (
                                        <div
                                            key={i}
                                            className="py-1 px-3 rounded-r-lg text-xs text-foreground"
                                            style={{
                                                background: "#D3EEB3",
                                                width: `${60 + Math.random() * 40}%`,
                                            }}
                                        >
                                            {trait}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-foreground mb-2">Decision Power</p>
                                <div className="space-y-2">
                                    {Object.entries(persona.decisionPower).map(([key, value]) => (
                                        <div
                                            key={key}
                                            className="flex items-center gap-2"
                                            style={{ background: "rgba(234, 246, 216, 0.6)" }}
                                        >
                                            <div
                                                className="py-1 px-3 rounded-r-lg text-xs text-foreground"
                                                style={{ background: "#D3EEB3" }}
                                            >
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </div>
                                            <div className="flex gap-1">
                                                {[...Array(6)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className="w-2.5 h-2.5 rounded-full"
                                                        style={{
                                                            background: i < value ? "#365B23" : "#D9D9D9"
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function NavigationSystemSection() {
    return (
        <section className="py-12 md:py-16">
            <div>
                <motion.h2
                    className="text-[28px] md:text-[32px] font-bold mb-8 text-foreground"
                    {...fadeInUp}
                >
                    {data.navigationSystem.title}
                </motion.h2>

                {/* Ideation */}
                <motion.div className="mb-10" {...fadeInUp}>
                    <h3 className="text-lg font-semibold text-muted-foreground mb-4">
                        {data.navigationSystem.ideation.title}
                    </h3>

                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Image Placeholder */}
                        <div
                            className="aspect-[16/10] rounded-xl flex items-center justify-center bg-muted border border-border"
                        >
                            <span className="text-sm text-muted-foreground">
                                Navigation Iteration Image
                            </span>
                        </div>

                        {/* Description */}
                        <div className="space-y-3">
                            <p className="text-sm text-muted-foreground">
                                {data.navigationSystem.ideation.iteration}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {data.navigationSystem.ideation.description}
                            </p>
                            <div className="space-y-1">
                                {data.navigationSystem.ideation.problems.map((problem, i) => (
                                    <p key={i} className="text-sm font-medium text-foreground">
                                        {problem}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Finalized */}
                <motion.div className="mb-10" {...fadeInUp}>
                    <div className="space-y-3 max-w-xl">
                        <p className="text-sm font-semibold text-muted-foreground">
                            {data.navigationSystem.finalized.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {data.navigationSystem.finalized.description}
                        </p>
                        <div className="space-y-1">
                            {data.navigationSystem.finalized.features.map((feature, i) => (
                                <p key={i} className="text-sm font-medium text-foreground">
                                    {feature}
                                </p>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* UX Approach Card */}
                <motion.div
                    className="p-5 md:p-6 rounded-xl max-w-3xl"
                    style={{ background: "rgba(234, 246, 216, 0.6)" }}
                    {...fadeInUp}
                >
                    <h4 className="text-base font-semibold text-muted-foreground mb-3">
                        UX Approach Implemented:
                    </h4>
                    <div className="space-y-1">
                        {data.navigationSystem.uxApproach.map((item, i) => (
                            <p key={i} className="text-sm text-foreground">
                                {item}
                            </p>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function PersonalizedThemeSection() {
    return (
        <section className="py-12 md:py-16">
            <div>
                <motion.h2
                    className="text-[28px] md:text-[32px] font-bold mb-8 text-foreground"
                    {...fadeInUp}
                >
                    {data.personalizedTheme.title}
                </motion.h2>

                {/* Ideation */}
                <motion.div className="mb-10" {...fadeInUp}>
                    <h3 className="text-lg font-semibold text-muted-foreground mb-4">
                        {data.personalizedTheme.ideation.title}
                    </h3>

                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Image Placeholder */}
                        <div
                            className="aspect-[4/3] rounded-xl flex items-center justify-center bg-muted border border-border"
                        >
                            <span className="text-sm text-muted-foreground">
                                Theme Iteration Image
                            </span>
                        </div>

                        {/* Description */}
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    {data.personalizedTheme.ideation.iteration}
                                </p>
                                <p className="text-sm mt-2 text-muted-foreground">
                                    {data.personalizedTheme.ideation.description}
                                </p>
                                <p className="text-sm font-medium mt-2 text-foreground">
                                    {data.personalizedTheme.ideation.feedback}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">
                                    {data.personalizedTheme.finalized.title}
                                </p>
                                <p className="text-sm mt-2 text-muted-foreground">
                                    {data.personalizedTheme.finalized.description}
                                </p>
                                <p className="text-sm font-medium mt-2 text-foreground">
                                    {data.personalizedTheme.finalized.result}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* UX Approach Card */}
                <motion.div
                    className="p-5 md:p-6 rounded-xl max-w-3xl"
                    style={{ background: "rgba(234, 246, 216, 0.6)" }}
                    {...fadeInUp}
                >
                    <h4 className="text-base font-semibold text-muted-foreground mb-3">
                        UX Approach Implemented:
                    </h4>
                    <div className="space-y-1">
                        {data.personalizedTheme.uxApproach.map((item, i) => (
                            <p key={i} className="text-sm text-foreground">
                                {item}
                            </p>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function IdeationSection() {
    return (
        <section className="py-12 md:py-16">
            <div>
                <motion.h2
                    className="text-[28px] md:text-[32px] font-bold mb-8 text-foreground"
                    {...fadeInUp}
                >
                    {data.ideation.title}
                </motion.h2>

                {/* Image Collage Placeholder */}
                <motion.div
                    className="aspect-[2/1] rounded-xl mb-6 flex items-center justify-center bg-muted border-2 border-border"
                    {...fadeInUp}
                >
                    <span className="text-base text-muted-foreground">
                        Ideation Photos Collage
                    </span>
                </motion.div>

                {/* Text */}
                <motion.div className="max-w-3xl space-y-3" {...fadeInUp}>
                    <p className="text-base text-muted-foreground">
                        {data.ideation.description}
                    </p>
                    <p className="text-base font-semibold text-foreground">
                        {data.ideation.summary}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

function WireframesSection() {
    return (
        <section className="py-12 md:py-16">
            <div>
                <motion.h3
                    className="text-xl font-semibold text-muted-foreground mb-6"
                    {...fadeInUp}
                >
                    {data.wireframes.title}
                </motion.h3>

                {/* Wireframes Placeholder */}
                <motion.div
                    className="space-y-4"
                    {...fadeInUp}
                >
                    <div
                        className="aspect-[3/1] rounded-xl flex items-center justify-center bg-muted"
                    >
                        <span className="text-base text-muted-foreground">
                            Wireframe Images
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function PrototypeTestingSection() {
    return (
        <section
            className="py-12 md:py-16 px-[42px]"
            style={{ background: "rgba(234, 246, 216, 0.5)" }}
        >
            <div className="max-w-6xl mx-auto">
                <motion.p
                    className="text-sm font-semibold text-center max-w-3xl mx-auto mb-8 text-foreground"
                    {...fadeInUp}
                >
                    {data.prototypeTesting.description}
                </motion.p>

                {/* Mockups Placeholder */}
                <motion.div
                    className="flex justify-center gap-6"
                    {...fadeInUp}
                >
                    <div
                        className="w-2/3 aspect-[16/10] rounded-xl flex items-center justify-center bg-white border border-border"
                    >
                        <span className="text-sm text-muted-foreground">Web Prototype</span>
                    </div>
                    <div
                        className="w-1/4 aspect-[9/16] rounded-xl flex items-center justify-center bg-white border border-border"
                    >
                        <span className="text-sm text-muted-foreground">Mobile</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function UsabilityTestingSection() {
    return (
        <section className="py-12 md:py-16">
            <div>
                <motion.div className="mb-6" {...fadeInUp}>
                    <h2 className="text-[28px] md:text-[32px] font-bold mb-3 text-foreground">
                        {data.usabilityTesting.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {data.usabilityTesting.description}
                    </p>
                    <p className="text-sm font-medium mt-2 text-foreground">
                        {data.usabilityTesting.note}
                    </p>
                </motion.div>

                {/* Components Grid */}
                <motion.div
                    className="flex flex-wrap gap-3 mb-6"
                    {...fadeInUp}
                >
                    {data.usabilityTesting.components.map((component, index) => (
                        <div
                            key={index}
                            className="flex-1 min-w-[140px] max-w-[240px] p-3 rounded-lg"
                            style={{
                                background: "rgba(234, 246, 216, 0.5)",
                                border: "1px solid #C4CDD5",
                            }}
                        >
                            <h4 className="text-base font-semibold mb-1" style={{ color: "#365B23" }}>
                                {component.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                                {component.description}
                            </p>
                        </div>
                    ))}
                </motion.div>

                {/* Challenge & Takeaway */}
                <div className="grid md:grid-cols-2 gap-4">
                    <motion.div
                        className="p-4 rounded-xl"
                        style={{ background: "#F5FBEB" }}
                        {...fadeInUp}
                    >
                        <h4 className="text-xl font-semibold mb-2 text-foreground">
                            {data.challengeTakeaway.challenge.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            {data.challengeTakeaway.challenge.content}
                        </p>
                    </motion.div>

                    <motion.div
                        className="p-4 rounded-xl"
                        style={{ background: "#F5FBEB" }}
                        {...fadeInUp}
                    >
                        <h4 className="text-xl font-semibold mb-2 text-foreground">
                            {data.challengeTakeaway.takeaway.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            {data.challengeTakeaway.takeaway.content}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function HiFiDesignsSection() {
    return (
        <section className="py-12 md:py-16">
            <div>
                <motion.h3
                    className="text-xl font-semibold text-muted-foreground mb-4"
                    {...fadeInUp}
                >
                    {data.hifiDesigns.title}
                </motion.h3>

                {/* Credentials Info */}
                <motion.div className="mb-6 space-y-3" {...fadeInUp}>
                    <p className="text-base font-medium text-foreground">
                        Here are the high-fidelity designs for an overview of each module. You can access the full product using the credentials below:
                    </p>
                    <div
                        className="p-4 rounded-xl inline-block"
                        style={{ background: "#F5FBEB" }}
                    >
                        <p className="text-sm font-medium text-foreground">url : {data.hifiDesigns.credentials.url}</p>
                        <p className="text-sm font-medium text-foreground">User Name: {data.hifiDesigns.credentials.username}</p>
                        <p className="text-sm font-medium text-foreground">Password: {data.hifiDesigns.credentials.password}</p>
                    </div>
                    <p className="text-xl font-semibold text-foreground">Feel free to explore the live product :)</p>
                </motion.div>

                {/* Screens */}
                <div className="space-y-12">
                    {data.hifiDesigns.screens.map((screen, index) => (
                        <motion.div
                            key={index}
                            className="space-y-3"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <h4 className="text-[28px] font-semibold text-center text-foreground">
                                {screen.title}
                            </h4>
                            <div
                                className="aspect-[16/10] rounded-xl flex items-center justify-center bg-muted"
                            >
                                <span className="text-base text-muted-foreground">
                                    {screen.title} Screenshot
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function DesignSystemSection() {
    return (
        <section className="py-12 md:py-16">
            <div>
                <motion.div className="mb-4" {...fadeInUp}>
                    <h3 className="text-xl font-semibold text-foreground">
                        {data.designSystem.title}
                    </h3>
                    <p className="text-sm mt-2 text-muted-foreground">
                        {data.designSystem.description}
                    </p>
                </motion.div>

                <motion.div className="mb-6" {...fadeInUp}>
                    {data.designSystem.implementation.map((item, i) => (
                        <p key={i} className="text-base font-medium text-foreground">
                            {item}
                        </p>
                    ))}
                </motion.div>

                <motion.p
                    className="text-sm mb-6 text-foreground"
                    {...fadeInUp}
                >
                    {data.designSystem.note}
                </motion.p>

                {/* Design System Image Placeholder */}
                <motion.div
                    className="aspect-[16/9] rounded-xl flex items-center justify-center bg-muted"
                    {...fadeInUp}
                >
                    <span className="text-base text-muted-foreground">
                        Design System Overview Image
                    </span>
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
                <BriefSection />
            </div>
            <TestimonialsSection />
            <div className="container mx-auto px-4">
                <ProductApproachSection />
                <TargetMarketSection />
                <UserPersonaSection />
                <NavigationSystemSection />
                <PersonalizedThemeSection />
                <IdeationSection />
                <WireframesSection />
            </div>
            <PrototypeTestingSection />
            <div className="container mx-auto px-4">
                <UsabilityTestingSection />
                <HiFiDesignsSection />
                <DesignSystemSection />
            </div>
        </article>
    );
}
