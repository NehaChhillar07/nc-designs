"use client";

import { motion } from "framer-motion";

interface AboutTextProps {
    text: string;
}

export function AboutText({ text }: AboutTextProps) {
    // Split text into paragraphs
    const paragraphs = text.split("\n\n").filter((p) => p.trim());

    return (
        <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
        >
            <div className="space-y-5">
                {paragraphs.map((paragraph, index) => (
                    <p
                        key={index}
                        className="text-[16px] md:text-[17px] text-muted-foreground leading-relaxed"
                        style={{ lineHeight: 1.75 }}
                    >
                        {paragraph}
                    </p>
                ))}
            </div>
        </motion.div>
    );
}
