"use client";

import Image from "next/image";
import { AboutMomentsStrip } from "@/components/about-gallery";
import { ScrollChoreography } from "@/components/ui/scroll-choreography";
import { aboutHeading, aboutChoreography, workingWithMe } from "@/data/about-data";
import { MagicText } from "@/components/ui/magic-text";
import { motion } from "motion/react";
import { TestimonialCard } from "@/components/testimonial-card";
import { testimonials } from "@/data/testimonials-data";
import { resolveToken } from "@/lib/placeholders";

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
                        "Designing in cybersecurity. Phishing simulations, security awareness, risk scoring, and admin workflows for security teams.",
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

            {/* Working with me — three handwritten notes (brief section 5,
                Block A). Same handmade language as the photo strip and the
                signature chip: Caveat hand, paper cards, a strip of tape,
                a slight rotation that straightens on hover. Placed after the
                personal story so the section reads warm first, practical
                second. */}
            <div className="max-w-5xl mx-auto mt-20 md:mt-28">
                <motion.p
                    className="text-sm font-medium uppercase tracking-[0.18em] text-gray-500 mb-10 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {workingWithMe.eyebrow}
                </motion.p>
                <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                    {workingWithMe.notes.map((note, i) => (
                        <motion.div
                            key={note.lead}
                            className="relative w-[260px] md:w-[280px] rounded-xl border border-black/[0.06] bg-[#FFFDF7] px-6 pt-8 pb-6 text-left shadow-[0_16px_40px_-18px_rgba(0,0,0,0.25)]"
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

            {/* Testimonials — token-gated (hidden in production until the real
                quotes replace the tokens; dev shows stickered samples). */}
            {testimonials.some((t) => resolveToken(t.token)) && (
                <div className="max-w-4xl mx-auto mt-16 md:mt-20 grid md:grid-cols-2 gap-6 md:gap-8 text-left">
                    {testimonials.map((item) => (
                        <TestimonialCard key={item.token} item={item} />
                    ))}
                </div>
            )}
        </section>
    );
}
