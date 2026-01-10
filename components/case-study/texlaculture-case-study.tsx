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

    // Avatar URLs from randomuser.me for realistic human photos
    const avatarIds = [
        { gender: 'men', id: 32 },
        { gender: 'women', id: 44 },
        { gender: 'men', id: 67 },
        { gender: 'women', id: 28 },
        { gender: 'men', id: 75 },
        { gender: 'women', id: 63 },
        { gender: 'men', id: 52 },
        { gender: 'women', id: 89 },
    ];

    // Fixed personality bar widths matching the design
    const personalityWidths = [85, 65, 75, 55, 70];

    return (
        <section className="py-12 md:py-16">
            <motion.h3
                className="font-semibold leading-[145%] mb-8"
                style={{ fontSize: "20px", color: "#212B36" }}
                {...fadeInUp}
            >
                {data.userPersonas.title}
            </motion.h3>

            {/* Two Column Layout */}
            <div className="flex flex-col lg:flex-row" style={{ gap: "64px" }}>
                {/* Left Side - Avatars + Disclaimer */}
                <div className="flex flex-col lg:flex-shrink-0 self-start" style={{ maxWidth: "420px", gap: "8px" }}>
                    {/* Personas Grid (4 columns x 2 rows) */}
                    <motion.div
                        className="grid grid-cols-4 content-start"
                        style={{ gap: "24px 24px" }}
                        {...fadeInUp}
                    >
                        {data.userPersonas.personas.map((p, index) => (
                            <div key={index} className="flex flex-col items-center gap-2">
                                <img
                                    src={`https://randomuser.me/api/portraits/${avatarIds[index].gender}/${avatarIds[index].id}.jpg`}
                                    alt={p.name}
                                    className="rounded-full object-cover"
                                    style={{
                                        width: "72px",
                                        height: "72px",
                                        border: "2px solid #E5E5E5",
                                        filter: "grayscale(100%)",
                                    }}
                                />
                                <div className="text-center">
                                    <p
                                        className="font-medium leading-tight"
                                        style={{ fontSize: "12px", color: "#212B36" }}
                                    >
                                        {p.role}
                                    </p>
                                    <p
                                        className="font-normal leading-tight"
                                        style={{ fontSize: "14px", color: "#919EAB" }}
                                    >
                                        {p.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                    {/* Disclaimer text */}
                    <p
                        className="font-normal italic"
                        style={{ fontSize: "14px", color: "#919EAB" }}
                    >
                        *Avatars and names are for presentation purposes only. Personas represent the roles.
                    </p>
                </div>

                {/* Right Side - Detailed Persona Card */}
                <motion.div
                    className="flex-1 rounded-xl overflow-hidden"
                    style={{
                        background: "#FFFFFF",
                        border: "1px solid #DFE3E8",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    }}
                    {...fadeInUp}
                >
                    {/* Header */}
                    <div
                        className="px-5 py-4 flex flex-wrap justify-between items-center gap-4"
                        style={{ background: "rgba(234, 246, 216, 0.5)" }}
                    >
                        <div className="flex items-center gap-4">
                            <span
                                className="font-semibold"
                                style={{ fontSize: "13px", color: "#637381" }}
                            >
                                Persona
                            </span>
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://randomuser.me/api/portraits/women/55.jpg"
                                    alt={persona.name}
                                    className="rounded-full object-cover"
                                    style={{
                                        width: "32px",
                                        height: "32px",
                                        border: "1.5px solid #C4CDD5",
                                    }}
                                />
                                <span
                                    className="font-medium"
                                    style={{ fontSize: "13px", color: "#212B36" }}
                                >
                                    {persona.name} <span style={{ color: "#637381" }}>Role:</span> {persona.role}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span
                                className="font-semibold"
                                style={{ fontSize: "13px", color: "#637381" }}
                            >
                                Age
                            </span>
                            <span
                                className="font-medium"
                                style={{ fontSize: "13px", color: "#212B36" }}
                            >
                                {persona.age}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-5">
                        {/* Background */}
                        <div>
                            <p
                                className="font-semibold mb-1"
                                style={{ fontSize: "13px", color: "#454F5B" }}
                            >
                                Background
                            </p>
                            <p
                                className="font-normal leading-[155%]"
                                style={{ fontSize: "13px", color: "#637381" }}
                            >
                                {persona.background}
                            </p>
                        </div>

                        {/* Approach */}
                        <div>
                            <p
                                className="font-semibold mb-2"
                                style={{ fontSize: "13px", color: "#454F5B" }}
                            >
                                Approach
                            </p>
                            <div className="space-y-1">
                                {persona.approach.map((a, i) => {
                                    const [title, desc] = a.split(': ');
                                    return (
                                        <p
                                            key={i}
                                            className="font-normal leading-[155%]"
                                            style={{ fontSize: "13px", color: "#637381" }}
                                        >
                                            <span className="font-medium" style={{ color: "#212B36" }}>• {title}:</span> {desc}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Pain Points */}
                        <div>
                            <p
                                className="font-semibold mb-2"
                                style={{ fontSize: "13px", color: "#454F5B" }}
                            >
                                Pain Points
                            </p>
                            <div className="space-y-1">
                                {persona.painPoints.map((point, i) => {
                                    const [title, desc] = point.split(': ');
                                    return (
                                        <p
                                            key={i}
                                            className="font-normal leading-[155%]"
                                            style={{ fontSize: "13px", color: "#637381" }}
                                        >
                                            <span className="font-medium" style={{ color: "#212B36" }}>• {title}:</span> {desc}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Personality & Decision Power - Side by Side */}
                        <div className="grid md:grid-cols-2 gap-6 pt-2">
                            {/* Personality */}
                            <div>
                                <p
                                    className="font-semibold mb-3"
                                    style={{ fontSize: "13px", color: "#454F5B" }}
                                >
                                    Personality
                                </p>
                                <div className="space-y-2">
                                    {persona.personality.map((trait, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center"
                                        >
                                            <div
                                                className="py-1.5 px-3 text-xs font-medium"
                                                style={{
                                                    background: "#D3EEB3",
                                                    borderRadius: "0 6px 6px 0",
                                                    width: `${personalityWidths[i]}%`,
                                                    fontSize: "12px",
                                                    color: "#365B23",
                                                }}
                                            >
                                                {trait}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Decision Power */}
                            <div>
                                <p
                                    className="font-semibold mb-3"
                                    style={{ fontSize: "13px", color: "#454F5B" }}
                                >
                                    Decision Power
                                </p>
                                <div className="space-y-2">
                                    {Object.entries(persona.decisionPower).map(([key, value]) => (
                                        <div
                                            key={key}
                                            className="flex items-center justify-between gap-3"
                                        >
                                            <div
                                                className="py-1.5 px-3 text-xs font-medium flex-shrink-0"
                                                style={{
                                                    background: "#D3EEB3",
                                                    borderRadius: "0 6px 6px 0",
                                                    fontSize: "12px",
                                                    color: "#365B23",
                                                    minWidth: "100px",
                                                }}
                                            >
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </div>
                                            <div className="flex gap-1.5">
                                                {[...Array(6)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className="rounded-full"
                                                        style={{
                                                            width: "10px",
                                                            height: "10px",
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
                        <img
                            src="/work/3rd-case study/navigation-1.svg"
                            alt="Navigation Iteration 1"
                            className="w-full h-auto"
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
                            <img
                                src="/work/3rd-case study/navigation-2.svg"
                                alt="Navigation Finalized"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
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
                            <img
                                src="/work/3rd-case study/personalised-1.svg"
                                alt="Theme Iteration"
                                className="w-full h-auto"
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
                    <img
                        src="/work/3rd-case study/personalised-2.svg"
                        alt="Theme Variations"
                        className="w-full h-auto"
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
                <img
                    src="/work/3rd-case study/developed-home.svg"
                    alt="Actual Developed Home Screen"
                    className="w-full h-auto"
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
                    <img
                        src={data.ideation.image}
                        alt="Ideation Photos Collage"
                        className="w-full h-auto"
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
                            <img
                                key={index}
                                src={image}
                                alt={`Wireframe ${index + 1}`}
                                className="w-full h-auto"
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
                        <img
                            src={data.prototypeTesting.image}
                            alt="Prototype Testing Flow"
                            className="w-full h-auto"
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

            {/* Credentials Info - Centered */}
            <motion.div
                className="mb-0 flex flex-col items-center text-center"
                style={{ gap: "24px" }}
                {...fadeInUp}
            >
                <p
                    className="font-medium leading-[145%]"
                    style={{ fontSize: "14px", color: "#454F5B", maxWidth: "700px" }}
                >
                    Here are the high-fidelity designs for an overview of each module. <br />
                    You can access the full product using the credentials below:
                </p>
                <div
                    className="p-8 md:p-10 rounded-2xl inline-block text-left min-w-[320px] md:min-w-[400px]"
                    style={{ background: "#F5FBEB" }}
                >
                    <p
                        className="font-medium mb-2"
                        style={{ fontSize: "16px", color: "#212B36" }}
                    >
                        url : <a href={data.hifiDesigns.credentials.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{data.hifiDesigns.credentials.url}</a>
                    </p>
                    <p
                        className="font-medium"
                        style={{ fontSize: "16px", color: "#212B36" }}
                    >
                        User Name: {data.hifiDesigns.credentials.username}
                    </p>
                    <p
                        className="font-medium"
                        style={{ fontSize: "16px", color: "#212B36" }}
                    >
                        Password: {data.hifiDesigns.credentials.password}
                    </p>
                </div>
                <p
                    className="font-medium"
                    style={{ fontSize: "48px", lineHeight: "1.1", color: "#212B36" }}
                >
                    Feel free to explore the live product :)
                </p>
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
                                <img
                                    src={data.designSystem.image}
                                    alt="Design System Overview"
                                    className="w-full h-auto"
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
                <BriefSection />
            </div>
            <TestimonialsSection />
            <div className="container mx-auto px-4">
                <ProductApproachSection />
                <TargetMarketSection />
                <UserPersonaSection />
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
