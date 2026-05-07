"use client";

import { motion } from "framer-motion";

const sideQuests = [
    {
        chip: "Built with code, no Figma",
        title: "Flashcard Training Builder",
        summary: "Type a topic. Get a flashcard pack. Ship it to any LMS.",
    },
];

export function QuickCaseStudies() {
    return (
        <div className="px-6 md:px-10 lg:px-12">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-12 md:mb-20">
                <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-normal tracking-tight leading-tight text-white flex-shrink-0">
                    Side Quests
                </h2>
                <p className="md:max-w-md lg:max-w-lg text-[15px] md:text-[16px] text-zinc-400 leading-relaxed">
                    Small, self-initiated builds I shipped without a Figma file — design and code in one loop.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sideQuests.map((study, index) => (
                    <motion.div
                        key={study.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative"
                    >
                        {/* Stacked card — fans out left on hover */}
                        <div
                            aria-hidden
                            className="absolute inset-0 rounded-[28px] bg-white border border-gray-200 shadow-sm transition-transform duration-500 ease-out group-hover:-rotate-[6deg] group-hover:-translate-x-4 group-hover:translate-y-3"
                        />

                        {/* Stacked card — fans out right on hover */}
                        <div
                            aria-hidden
                            className="absolute inset-0 rounded-[28px] bg-white border border-gray-200 shadow-sm transition-transform duration-500 ease-out group-hover:rotate-[6deg] group-hover:translate-x-4 group-hover:translate-y-3"
                        />

                        {/* Main card */}
                        <div className="relative rounded-[28px] border border-gray-200 bg-white p-8 md:p-10 flex flex-col min-h-[280px] shadow-sm transition-shadow duration-500 group-hover:shadow-md">
                            <span
                                className="inline-block self-start px-3 py-1 rounded-full mb-6"
                                style={{
                                    fontFamily: "var(--font-caveat), cursive",
                                    fontSize: "15px",
                                    transform: "rotate(-3deg)",
                                    backgroundColor: "#FF9800",
                                    color: "#fff",
                                }}
                            >
                                {study.chip}
                            </span>

                            <h3 className="text-2xl md:text-3xl lg:text-[34px] font-semibold tracking-tight text-gray-900 leading-[1.15] mb-4">
                                {study.title}
                            </h3>

                            <p className="text-base md:text-lg text-gray-500 leading-relaxed">
                                {study.summary}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
