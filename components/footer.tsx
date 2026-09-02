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
import { GITHUB_PROFILE } from "@/lib/placeholders";
import { CONTACT_EMAIL, LINKEDIN_URL } from "@/lib/site";

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
                    {/* Navigation Links + social icons */}
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
                        <span aria-hidden="true" className="hidden md:block h-4 w-px bg-gray-300" />
                        <a
                            href={GITHUB_PROFILE}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                            </svg>
                        </a>
                        <a
                            href={LINKEDIN_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
                            </svg>
                        </a>
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
