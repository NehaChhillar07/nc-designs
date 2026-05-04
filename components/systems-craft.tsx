"use client";

import { motion } from "framer-motion";
import { Highlighter } from "@/components/ui/highlighter";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

const practices = [
    {
        title: "Component-driven from day one",
        description: "Every interface starts as a reusable component — spacing, color tokens, and interaction patterns are defined in code where they'll actually live.",
    },
    {
        title: "Design decisions tested against real constraints",
        description: "Building directly means every layout, responsive breakpoint, and animation is validated against real browser behaviour, not an approximation.",
    },
    {
        title: "System evolves with the product",
        description: "No separate artifact that drifts out of sync. The design system is the product — updates ship in the same commit as the feature.",
    },
];

export function SystemsCraft() {
    return (
        <section className="py-16 md:py-24">
            <motion.p
                {...fadeInUp}
                className="text-[16px] font-normal text-muted-foreground mb-6 md:mb-8"
            >
                Systems & Craft
            </motion.p>

            <motion.h2
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: 0.05 }}
                className="text-[32px] sm:text-[36px] md:text-[40px] font-normal tracking-tight leading-tight mb-10 md:mb-14 max-w-4xl"
            >
                My design system lives in the product itself. I define components, spacing, and interaction patterns through{" "}
                <Highlighter action="underline" color="#FF9800" isView>code-first prototyping</Highlighter>
                {" "}— building real interfaces rather than maintaining a separate artifact.
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {practices.map((practice, index) => (
                    <motion.div
                        key={practice.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="rounded-2xl border border-gray-200 p-6 md:p-7"
                    >
                        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-3">
                            0{index + 1}
                        </p>
                        <h3 className="text-base font-semibold text-gray-900 mb-2">
                            {practice.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            {practice.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
