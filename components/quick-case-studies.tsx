"use client";

import { motion } from "framer-motion";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -100px 0px" },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

const quickCaseStudies = [
    {
        title: "Flashcard Training",
        summary: "Micro-learning experience turning phishing compromises into immediate, interactive security training. Designed bite-sized modules that reduced repeat compromise rates by embedding learning at the moment of failure.",
        role: "Lead Designer",
        product: "Human Firewall",
        outcome: "Intervention over punishment",
    },
    {
        title: "Kingphisher",
        summary: "AI-powered phishing simulation platform enabling security teams to test employee resilience at scale. Designed campaign creation flows, template libraries, and result dashboards used across enterprise clients.",
        role: "Product Designer",
        product: "InfoSec Ventures",
        outcome: "Simulation at enterprise scale",
    },
    {
        title: "SmartDMARC",
        summary: "Email authentication and domain protection dashboard simplifying DMARC compliance for enterprises. Translated complex DNS and email security data into clear, actionable monitoring views for non-technical stakeholders.",
        role: "Product Designer",
        product: "InfoSec Ventures",
        outcome: "Compliance made legible",
    },
];

export function QuickCaseStudies() {
    return (
        <section className="py-12 md:py-20">
            <motion.p
                {...fadeInUp}
                className="text-[16px] md:text-[20px] font-normal text-muted-foreground text-center mb-8 md:mb-12"
            >
                More work
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {quickCaseStudies.map((study, index) => (
                    <motion.div
                        key={study.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative rounded-2xl border border-gray-200 bg-white p-6 md:p-8 flex flex-col justify-between min-h-[240px] hover:border-gray-300 transition-colors"
                    >
                        {/* Top: Role badge */}
                        <div>
                            <span className="inline-block text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1 mb-4">
                                {study.role} · {study.product}
                            </span>

                            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                                {study.title}
                            </h3>

                            <p className="text-sm text-gray-500 leading-relaxed">
                                {study.summary}
                            </p>
                        </div>

                        {/* Bottom: Outcome */}
                        <p className="text-xs font-semibold text-gray-900 mt-6 tracking-wide uppercase">
                            {study.outcome}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
