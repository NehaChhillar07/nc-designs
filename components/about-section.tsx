"use client";

import { AboutGallery } from "@/components/about-gallery";
import { aboutImages, aboutHeading, aboutParagraphs } from "@/data/about-data";
import { motion } from "framer-motion";

export function AboutSection() {
    return (
        <section className="py-16 md:py-24 lg:py-32 px-4">
            {/* Centered Gallery */}
            <div className="flex justify-center mb-16 md:mb-24">
                <AboutGallery images={aboutImages} />
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

                {/* Paragraphs */}
                <div className="space-y-6">
                    {aboutParagraphs.map((paragraph, index) => (
                        <motion.p
                            key={index}
                            className="text-[16px] md:text-[18px] text-muted-foreground leading-relaxed"
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 * (index + 1) }}
                        >
                            {paragraph}
                        </motion.p>
                    ))}
                </div>
            </div>
        </section>
    );
}
