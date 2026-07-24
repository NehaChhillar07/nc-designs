"use client";

import Image from "next/image";
import { AboutMomentsStrip } from "@/components/about-gallery";
import { ScrollChoreography } from "@/components/ui/scroll-choreography";
import { aboutHeading, aboutChoreography } from "@/data/about-data";
import { MagicText } from "@/components/ui/magic-text";
import { motion } from "motion/react";

export function AboutSection() {
    return (
        <section className="py-16 md:py-24 lg:py-32 px-4">
            {/* Desktop: scroll choreography — four moments converge, one takes over.
                Full-bleed breakout: the page's container + padding would otherwise
                clip the hero's final 100vw expansion. */}
            <div className="hidden md:block mb-16 md:mb-24 relative left-1/2 w-screen -translate-x-1/2">
                <ScrollChoreography images={aboutChoreography} />
            </div>

            {/* Mobile: static hero portrait */}
            <div className="md:hidden flex justify-center mb-12">
                <div className="relative w-full max-w-xs aspect-[3/4] -rotate-1 rounded-3xl overflow-hidden shadow-lg bg-gray-200">
                    <Image
                        src={aboutChoreography.bottomLeft.src}
                        alt={aboutChoreography.bottomLeft.alt}
                        fill
                        sizes="320px"
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Text Content - Centered Below */}
            <div className="max-w-3xl mx-auto text-center">
                {/* Big Heading */}
                <motion.h2
                    className="text-[48px] md:text-[64px] lg:text-[80px] font-light text-gray-500 tracking-tight mb-6 md:mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {aboutHeading}
                </motion.h2>

                {/* All three paragraphs share one scroll progress — the reveal
                    runs continuously from the top paragraph to the last word */}
                <MagicText
                    text={[
                        "Three years of designing in cybersecurity. Phishing simulations, security awareness, risk scoring, and admin workflows for security teams.",
                        "I prefer understanding things before reacting. I like noticing patterns, sitting with unclear ideas, and bringing structure to chaos. Messy problems don't overwhelm me. They make me curious.",
                        "I learn through experiments rather than theory. Trying things and seeing what actually works matters more to me than assumptions. Outside work, I spend a lot of time with my dog, June. Being around her quietly, without words, is where I slow down and observe. That mindset shapes how I think about people and systems.",
                    ]}
                    className="space-y-6"
                    paragraphClassName="justify-center p-0 leading-relaxed"
                    wordClassName="mt-0 text-[16px] md:text-[18px] font-normal text-muted-foreground"
                />
            </div>

            {/* The rest of the moments — right below the text */}
            <div className="mt-14 md:mt-20">
                <AboutMomentsStrip />
            </div>
        </section>
    );
}
