import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import { MotionConfig } from "motion/react";
import { Analytics } from "@vercel/analytics/next";
import { TimeTracker } from "@/components/time-tracker";
import { CursorProvider } from "@/components/ui/cursor-context";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollRestoration } from "@/components/scroll-restoration";
import { SITE_URL } from "@/lib/site";
import { OG_HOME } from "@/lib/og-home";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Faster font loading
  preload: true,
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Neha Chhillar - Product Designer",
    template: "%s | Neha Chhillar",
  },
  description: "Product designer who ships working code. First designer at two companies. Design systems in Figma, front ends built in Claude Code.",
  keywords: ["Product Designer", "UX Designer", "Design Engineer", "Claude Code", "Next.js", "Freelance Product Designer", "Cybersecurity", "AI", "SaaS"],
  authors: [{ name: "Neha Chhillar" }],
  creator: "Neha Chhillar",
  // Every other route sets its own canonical; without this the homepage emitted
  // none at all, while the sitemap still listed it.
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Neha Chhillar - Product Designer",
    description: "Product designer who ships working code. First designer at two companies. Design systems in Figma, front ends built in Claude Code.",
    type: "website",
    url: SITE_URL,
    siteName: "Neha Chhillar Portfolio",
    images: [
      {
        url: OG_HOME,
        width: 1200,
        height: 630,
        alt: "Neha Chhillar - Product Designer",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neha Chhillar - Product Designer",
    description: "Product designer who ships working code. First designer at two companies. Design systems in Figma, front ends built in Claude Code.",
    images: [OG_HOME],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* No boot script: React 19 errors on <script> it renders. The
            native cursor is pre-hidden in CSS (globals.css) and scroll
            restoration is set in components/scroll-restoration.tsx. */}
        {/* No manual image preloads here. Both hero assets render through
            next/image, which serves /_next/image?url=... — preloading the raw
            originals fetched 158KB of files the page never used, at high
            priority, competing with CSS and fonts for first paint. The Image
            `priority` prop already emits the preload for the URL actually used. */}

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${caveat.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {/* First focusable element in the body: lets keyboard users jump the
            header nav straight to the page content. Hidden until focused. */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <MotionConfig reducedMotion="user">
          <CursorProvider>
            <CustomCursor />
            {children}
          </CursorProvider>
        </MotionConfig>
        <ScrollRestoration />
        <Analytics />
        <TimeTracker />
      </body>
    </html>
  );
}

