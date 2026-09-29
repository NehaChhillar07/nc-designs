"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ConnectOverlay } from "@/components/connect-overlay";
import { MobileMenu } from "@/components/mobile-menu";
import { scrollToSection, useHashScrollOnLoad } from "@/lib/scroll-to-section";

// Two kinds of entries: homepage anchors (id set — smooth-scrolled on "/")
// and plain routes (href set — ordinary navigation).
const NAV_LINKS = [
  { id: "work", label: "Work" },
  { href: "/work-with-me", label: "Freelance" },
  { id: "writings", label: "Writings" },
  // Label renamed to Experiments; the id (and /#fun-with-claude anchors
  // already shared elsewhere) stay valid.
  { id: "fun-with-claude", label: "Experiments" },
  { id: "about", label: "About" },
] as const;

export function Header({ theme = "light" }: { theme?: "light" | "dark" }) {
  const [connectOpen, setConnectOpen] = useState(false);
  const pathname = usePathname();

  // Pages with a dark hero (e.g. unsaid) can't wear the default light frosted
  // bar — a translucent bar over the hero gradient always leaves a visible seam.
  // Instead the dark header is fully transparent over the hero and only fades in
  // its bar once you scroll down onto the light content below.
  const isDark = theme === "dark";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isDark) return; // light pages keep their always-on frosted bar
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isDark]);

  // Header shell background:
  //  - light theme: unchanged, always-on white frosted bar.
  //  - dark theme, at top of hero: transparent, no border → no band at all.
  //  - dark theme, scrolled onto content: dark frosted bar for legibility.
  const headerBgClass = !isDark
    ? "bg-white/25 backdrop-blur-md border-b border-white/10"
    : scrolled
      ? "bg-[#1A1512]/85 backdrop-blur-md border-b border-white/10"
      : "bg-transparent border-b border-transparent";

  // If we land on the homepage with a "#section" hash (e.g. from another page),
  // scroll to it once the sections have mounted.
  useHashScrollOnLoad();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
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
    <>
      {/* On a phone the bar carries only the logo and scrolls away with the
          page; its links, Resume and Connect live in the floating menu at the
          bottom, where a thumb reaches. From md up it is the fixed bar. */}
      <header
        className={`absolute md:fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${headerBgClass}`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="/logo.jpeg"
                alt="NC Designs"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={"href" in link ? link.href : `/#${link.id}`}
                onClick={"id" in link ? (e) => handleNavClick(e, link.id) : undefined}
                className={`text-sm font-medium transition-colors whitespace-nowrap ${
                  isDark
                    ? "text-white/70 hover:text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Resume and Connect: in the bar from md up, in the floating menu below. */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm" asChild className="text-xs md:text-sm bg-white/80 backdrop-blur-sm">
              <Link href="/resume">Resume</Link>
            </Button>
            {/* A real link, not a bare click handler: crawlers, a visitor with
                JS off, and open-in-new-tab all land on the footer's email CTA
                at #connect. On a plain click, the overlay takes over instead. */}
            <Button size="sm" asChild className="text-xs md:text-sm">
              <Link
                href="/#connect"
                onClick={(e) => {
                  e.preventDefault();
                  setConnectOpen(true);
                }}
              >
                Connect
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <MobileMenu links={NAV_LINKS} onConnect={() => setConnectOpen(true)} />

      {/* Connect Overlay */}
      <ConnectOverlay isOpen={connectOpen} onClose={() => setConnectOpen(false)} />
    </>
  );
}
