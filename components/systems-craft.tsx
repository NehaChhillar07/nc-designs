"use client";

import { motion } from "framer-motion";
import { Highlighter } from "@/components/ui/highlighter";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

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
                className="text-[32px] sm:text-[36px] md:text-[40px] font-normal tracking-tight leading-tight max-w-4xl"
            >
                I work{" "}
                <Highlighter action="underline" color="#FF9800" isView>between Figma and code</Highlighter>
                . The system lives in Figma so the team can scale it. Prototypes live in code, built with Cursor and Lovable, so decisions are tested against real browser behavior, not approximations. AI accelerates the exploration. The design decisions stay mine.
            </motion.h2>
        </section>
    );
}
