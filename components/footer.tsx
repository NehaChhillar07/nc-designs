"use client";

import Link from "next/link";

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
        <footer className="border-t bg-background/80 backdrop-blur-sm py-8 md:py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Navigation Links */}
                    <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
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
