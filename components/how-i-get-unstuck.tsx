"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Highlighter } from "@/components/ui/highlighter";
import { ToolBubble } from "@/components/ui/tool-bubble";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

const tools = [
    {
        name: "Perplexity",
        icon: "/how-i-think-logos/perplexity.png",
        delay: 0,
        usageNote: "Domain research before diving in — competitor links, market context, and related assets gathered in one pass.",
    },
    {
        name: "NotebookLM",
        icon: "/how-i-think-logos/notebooklm.png",
        delay: 0.1,
        usageNote: "All research assets go here. I synthesise findings into a structured brief before touching any design tool.",
    },
    {
        name: "Figma",
        icon: "/how-i-think-logos/figma.png",
        delay: 0.2,
        usageNote: "Design system home — components, tokens, and layout decisions live here.",
    },
    {
        name: "Cursor",
        icon: "/how-i-think-logos/cursor.png",
        delay: 0.3,
        usageNote: "Functionality-first prototyping. When the problem is about flows and logic, I build it directly in code.",
    },
    {
        name: "Lovable",
        icon: "/how-i-think-logos/lovable-logo-icon.png",
        delay: 0.4,
        usageNote: "Interface exploration. When I need fresh UI ideas or interactive concepts, this unblocks my thinking fastest.",
    },
];

export function HowIGetUnstuck() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
                setOffset(scrollProgress * 20 - 10);
            }
        };

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!prefersReducedMotion) {
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <section ref={containerRef} className="py-16 md:py-24 relative">
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-start">
                {/* Left — label + paragraph with the highlight */}
                <div>
                    <motion.p
                        {...fadeInUp}
                        className="text-[16px] font-normal text-muted-foreground mb-6 md:mb-8"
                    >
                        How I Get Unstuck
                    </motion.p>
                    <motion.h2
                        {...fadeInUp}
                        transition={{ ...fadeInUp.transition, delay: 0.05 }}
                        className="text-[22px] sm:text-[26px] md:text-[28px] lg:text-[30px] font-normal tracking-tight leading-[1.35]"
                    >
                        When I am stuck, the way out is usually{" "}
                        <Highlighter action="underline" color="#FF9800" isView>a better question</Highlighter>
                        , not a better solution. While redesigning a risk score, every competitor was giving a single number. We tried that, then a more complex version. Both felt wrong. The unblock was reframing the question. Not how to score risk better. What we were scoring. Activity, or behavior. The answer changed the product.
                    </motion.h2>
                </div>

                {/* Right — what helps me get there + bubbles */}
                <div>
                    <motion.p
                        {...fadeInUp}
                        transition={{ ...fadeInUp.transition, delay: 0.1 }}
                        className="text-[16px] font-normal text-muted-foreground mb-6 md:mb-8"
                    >
                        What helps me get there
                    </motion.p>

                    {/* Tools — bubbles flow naturally right under the label */}
                    <div
                        className="flex flex-nowrap items-center justify-start gap-3 md:gap-4 pr-4"
                        style={{
                            transform: `translateY(${offset}px)`,
                            transition: "transform 0.1s ease-out",
                            overflowX: "auto",
                            overflowY: "visible",
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            paddingTop: "20px",
                            paddingBottom: "20px",
                        }}
                    >
                        {tools.map((tool, index) => {
                            const wavePhase = (index / (tools.length - 1)) * Math.PI * 2;
                            const waveOffset = Math.round(Math.sin(wavePhase) * -14);
                            const heightFactor = (waveOffset + 14) / 28;

                            const baseIntensity = 12 + (heightFactor * 28);
                            const animationIntensity = index < 3 ? 20 : baseIntensity;
                            const baseAnimationDuration = 3.0 - (heightFactor * 1.5);
                            const animationDuration = index < 3 ? 3.0 : baseAnimationDuration;

                            const iconSize = (tool.name === "NotebookLM" || tool.name === "Perplexity") ? 44 : 38;
                            const iconClass = (tool.name === "NotebookLM" || tool.name === "Perplexity")
                                ? "w-10 h-10 md:w-11 md:h-11"
                                : "w-8 h-8 md:w-10 md:h-10";

                            return (
                                <ToolBubble
                                    key={tool.name}
                                    label={tool.name}
                                    delay={tool.delay}
                                    index={index}
                                    size={92}
                                    waveOffset={waveOffset}
                                    animationIntensity={animationIntensity}
                                    animationDuration={animationDuration}
                                    usageNote={tool.usageNote}
                                    icon={
                                        <Image
                                            src={tool.icon}
                                            alt=""
                                            width={iconSize}
                                            height={iconSize}
                                            className={iconClass}
                                        />
                                    }
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
