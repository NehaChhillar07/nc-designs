"use client";

import { AboutGallery } from "@/components/about-gallery";
import { aboutHeading } from "@/data/about-data";
import { Highlighter } from "@/components/ui/highlighter";
import { motion } from "framer-motion";

export function AboutSection() {
    return (
        <section className="py-16 md:py-24 lg:py-32 px-4">
            {/* Centered Gallery */}
            <div className="flex justify-center mb-16 md:mb-24">
                <AboutGallery />
            </div>

            {/* Text Content - Centered Below */}
            <div className="max-w-3xl mx-auto text-center">
                {/* Big Heading */}
                <motion.h2
                    className="text-[48px] md:text-[64px] lg:text-[80px] font-light text-gray-300 tracking-tight mb-8 md:mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {aboutHeading}
                </motion.h2>

                {/* Paragraphs with Highlights */}
                <div className="space-y-6">
                    <motion.p
                        className="text-[16px] md:text-[18px] text-muted-foreground leading-relaxed"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                    >
                        I prefer understanding things before reacting. I like noticing patterns, sitting with unclear ideas, and bringing structure to chaos. <Highlighter action="highlight" color="#FFB4A2" isView>Messy problems don't overwhelm me</Highlighter>. They make me <Highlighter action="underline" color="#FF9800" isView>curious</Highlighter>.
                    </motion.p>
                    <motion.p
                        className="text-[16px] md:text-[18px] text-muted-foreground leading-relaxed"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                    >
                        I learn through experiments rather than theory. <Highlighter action="highlight" color="#87CEFA" isView>Trying things and seeing what actually works</Highlighter> matters more to me than assumptions. Outside work, I spend a lot of time with my dog, June. Being around her quietly, without words, is where I <Highlighter action="underline" color="#A8D08D" isView>slow down and observe</Highlighter>. That mindset shapes how I think about people and systems.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
