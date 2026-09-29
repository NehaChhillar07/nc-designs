"use client";

import Image from "next/image";
import { AboutMomentsStrip } from "@/components/about-gallery";
import { ScrollChoreography } from "@/components/ui/scroll-choreography";
import { aboutHeading, aboutChoreography, workingWithMe } from "@/data/about-data";
import { MagicText } from "@/components/ui/magic-text";
import { motion } from "motion/react";
import { TestimonialCarousel } from "@/components/testimonial-carousel";

const ABOUT = [
    "Designing in cybersecurity. Phishing simulations, security awareness, risk scoring, and admin workflows for security teams.",
    "I prefer understanding things before reacting. I like noticing patterns, sitting with unclear ideas, and bringing structure to chaos. Messy problems don't overwhelm me. They make me curious.",
    "I learn through experiments rather than theory. Trying things and seeing what actually works matters more to me than assumptions. Outside work, I spend a lot of time with my dog, June. Being around her quietly, without words, is where I slow down and observe. That mindset shapes how I think about people and systems.",
];

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
            <div className="md:hidden flex justify-center mb-8">
                <div className="relative w-full max-w-[15rem] aspect-[3/4] -rotate-1 rounded-3xl overflow-hidden shadow-lg bg-gray-200">
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
            <div className="max-w-3xl mx-auto md:text-center">
                {/* Big Heading */}
                <motion.h2
                    className="text-[36px] md:text-[64px] lg:text-[80px] font-light text-gray-500 tracking-tight leading-tight mb-5 md:mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {aboutHeading}
                </motion.h2>

                {/* All three paragraphs share one scroll progress — the reveal
                    runs continuously from the top paragraph to the last word */}
                <div className="hidden md:block">
                    <MagicText
                        text={ABOUT}
                        className="space-y-6"
                        paragraphClassName="justify-center p-0 leading-relaxed"
                        wordClassName="mt-0 text-[16px] md:text-[18px] font-normal text-muted-foreground"
                    />
                </div>
                {/* Phones: plain, left-aligned text with no scroll-driven reveal,
                    and without the role recap the hero and Work already give. */}
                <motion.div
                    className="md:hidden space-y-4 text-[16px] leading-relaxed text-gray-600"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {ABOUT.slice(1).map((p) => (
                        <p key={p}>{p}</p>
                    ))}
                </motion.div>
            </div>

            {/* The rest of the moments — right below the text */}
            <div className="mt-10 md:mt-20">
                <AboutMomentsStrip />
            </div>

            {/* Working with me — three handwritten notes (brief section 5,
                Block A). Same handmade language as the photo strip and the
                signature chip: Caveat hand, paper cards, a strip of tape,
                a slight rotation that straightens on hover. Placed after the
                personal story so the section reads warm first, practical
                second. */}
            {/* From md up only: on a phone the page stays with the case studies. */}
            <div className="hidden md:block max-w-5xl mx-auto mt-28">
                <motion.p
                    className="text-sm font-medium uppercase tracking-[0.18em] text-gray-500 mb-10 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {workingWithMe.eyebrow}
                </motion.p>
                <div className="flex flex-wrap justify-center gap-10">
                    {workingWithMe.notes.map((note, i) => (
                        <motion.div
                            key={note.lead}
                            className="relative w-[280px] rounded-xl border border-black/[0.06] bg-[#FFFDF7] px-6 pt-8 pb-6 text-left shadow-[0_16px_40px_-18px_rgba(0,0,0,0.25)]"
                            style={{ rotate: `${note.rotate}deg` }}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                            whileHover={{ rotate: 0, scale: 1.04, zIndex: 10 }}
                        >
                            {/* Tape strip */}
                            <span
                                aria-hidden="true"
                                className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rounded-[2px]"
                                style={{
                                    background: "rgba(255, 152, 0, 0.28)",
                                    transform: `translateX(-50%) rotate(${-note.rotate * 1.4}deg)`,
                                    boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                                }}
                            />
                            <p
                                className="leading-snug"
                                style={{ fontFamily: "var(--font-caveat), cursive" }}
                            >
                                <span className="block text-[24px] md:text-[26px] text-gray-900">
                                    {note.lead}
                                </span>
                                <span className="mt-1.5 block text-[19px] md:text-[21px] text-gray-500">
                                    {note.text}
                                </span>
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Testimonials — one at a time, token-gated (the carousel renders
                nothing in production until the real quotes replace the tokens;
                dev shows stickered samples). */}
            <TestimonialCarousel className="max-w-2xl mx-auto mt-10 md:mt-20 text-left" />
        </section>
    );
}
