"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { Highlighter } from "@/components/ui/highlighter";
import { scrollToSection } from "@/lib/scroll-to-section";
import { ConnectVideo } from "@/components/connect-video";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CAL_LINK, VIDEO_URL, resolveToken } from "@/lib/placeholders";
import { CONTACT_EMAIL } from "@/lib/site";

// Anchor entries carry `id` (smooth-scrolled on "/"); route entries carry `href`.
const navLinks = [
    { label: "Home", id: "hero" },
    { label: "Work", id: "work" },
    { label: "Freelance", href: "/work-with-me" },
    { label: "Writings", id: "writings" },
    { label: "Experiments", id: "fun-with-claude" },
    { label: "About", id: "about" },
] as const;

export function Footer() {
    const pathname = usePathname();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        // On the homepage, take over the scroll so it stays accurate while the
        // lazy-loaded sections settle. On other pages, let the link navigate to
        // "/#id" and the homepage's hash handler will do the scroll on arrival.
        if (pathname === "/") {
            e.preventDefault();
            scrollToSection(id);
            window.history.replaceState(null, "", `/#${id}`);
        }
    };

    return (
        <footer id="connect" className="border-t bg-background/80 backdrop-blur-sm py-12 md:py-16">
            <div className="container mx-auto px-4">
                {/* Vibe-led coding chip */}
                <motion.div
                    className="mb-6 md:mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <span
                        className="inline-block px-4 py-2 rounded-full border border-gray-300 bg-white/50 backdrop-blur-sm"
                        style={{
                            fontFamily: "var(--font-caveat), cursive",
                            fontSize: "18px",
                            color: "#6B7280",
                            transform: "rotate(-2deg)",
                        }}
                    >
                        Started in Claude Code. Documented in Figma. Handed over functional.
                    </span>
                </motion.div>

                {/* Have an idea? Let's talk. - Large CTA */}
                <motion.div
                    className="mb-6 md:mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                >
                    <motion.a
                        href={`mailto:${CONTACT_EMAIL}?subject=Project%20inquiry`}
                        className="inline-block text-[32px] md:text-[56px] lg:text-[80px] xl:text-[112px] font-light tracking-tight transition-all duration-300 leading-none"
                        style={{ color: "#6B7280" }}
                        whileHover={{
                            color: "#212B36",
                            transition: { duration: 0.3 }
                        }}
                    >
                        Have an idea? <Highlighter action="highlight" color="#FF9800" isView>Let&apos;s talk</Highlighter>.
                    </motion.a>
                </motion.div>

                {/* Connect block: intro line, lite video embed, booking +
                    email buttons, and the freelance-page link. Both
                    placeholder-driven elements (video, Book a call) hide in
                    production while their tokens are unreplaced, and the
                    intro line drops its video mention with them. */}
                <motion.div
                    className="mb-12 md:mb-16 flex flex-col gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                >
                    {(() => {
                        const videoUrl = resolveToken(VIDEO_URL);
                        const calLink = resolveToken(CAL_LINK);
                        return (
                            <>
                                <p className="text-[16px] md:text-[18px] text-gray-600 leading-relaxed max-w-2xl">
                                    {videoUrl
                                        ? "Building something and need design that comes with working code? Watch the two-minute intro, then book a call or email me."
                                        : "Building something and need design that comes with working code? Book a call or email me."}
                                </p>
                                {videoUrl && (
                                    <ConnectVideo url={videoUrl} title="Two-minute intro" />
                                )}
                                <div className="flex flex-wrap items-center gap-3">
                                    {calLink && (
                                        <a
                                            href={calLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={cn(buttonVariants({ size: "lg" }))}
                                        >
                                            Book a call
                                        </a>
                                    )}
                                    <a
                                        href={`mailto:${CONTACT_EMAIL}?subject=Project%20inquiry`}
                                        className={cn(
                                            buttonVariants({ variant: calLink ? "outline" : "default", size: "lg" })
                                        )}
                                    >
                                        Email me
                                    </a>
                                </div>
                                <Link
                                    href="/work-with-me"
                                    className="self-start text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors underline underline-offset-4"
                                    style={{ textDecorationColor: "var(--accent-warm)" }}
                                >
                                    Freelance offer and pricing
                                </Link>
                            </>
                        );
                    })()}
                </motion.div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    {/* Navigation Links */}
                    <nav className="flex flex-wrap items-center gap-6 md:gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={"href" in link ? link.href : `/#${link.id}`}
                                onClick={"id" in link ? (e) => handleClick(e, link.id) : undefined}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </Link>
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
