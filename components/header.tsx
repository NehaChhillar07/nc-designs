"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/25 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold tracking-wide">
          nc designs
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/#work"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Work
          </Link>
          <Link
            href="/#playground"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Playground
          </Link>
          <Link
            href="/#about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
        </nav>

        {/* Buttons - Always visible */}
        <div className="flex items-center gap-2 md:gap-3">
          <Button variant="outline" size="sm" asChild className="text-xs md:text-sm bg-white/80 backdrop-blur-sm">
            <Link href="/resume">Resume</Link>
          </Button>
          <Button size="sm" asChild className="text-xs md:text-sm">
            <a href="/#connect">Connect</a>
          </Button>

          {/* Mobile Hamburger Menu Button */}
          <button
            className="md:hidden ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-foreground"
              >
                <path
                  d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-foreground"
              >
                <path
                  d="M2.25 4.5H15.75M2.25 9H15.75M2.25 13.5H15.75"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              href="/#work"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Work
            </Link>
            <Link
              href="/#playground"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Playground
            </Link>
            <Link
              href="/#about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
