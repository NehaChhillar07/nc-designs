"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Highlighter } from "@/components/ui/highlighter";

const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Products", href: "#products" },
    { label: "How I Think", href: "#how-i-think" },
    { label: "Work", href: "#work" },
];

export function Footer() {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer id="connect" className="border-t bg-background/80 backdrop-blur-sm py-12 md:py-16">
            <div className="container mx-auto px-4">
                {/* Having an idea, let's catch up - Large CTA */}
                <motion.div
                    className="mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <motion.a
                        href="mailto:nehachhillar07@gmail.com?subject=Let's%20catch%20up!"
                        className="inline-block text-[32px] md:text-[56px] lg:text-[80px] xl:text-[112px] font-light tracking-tight transition-all duration-300 leading-none"
                        style={{ color: "#C4CDD5" }}
                        whileHover={{
                            color: "#212B36",
                            transition: { duration: 0.3 }
                        }}
                    >
                        Having an idea, <Highlighter action="highlight" color="#FF9800" isView>let&apos;s catch up</Highlighter>.
                    </motion.a>
                </motion.div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    {/* Navigation Links */}
                    <nav className="flex flex-wrap items-center gap-6 md:gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleClick(e, link.href)}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Copyright */}
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Neha Chhillar. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
