import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import { MotionConfig } from "motion/react";
import { Analytics } from "@vercel/analytics/next";
import { TimeTracker } from "@/components/time-tracker";
import { CursorProvider } from "@/components/ui/cursor-context";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollRestoration } from "@/components/scroll-restoration";
import { homeV2Data } from "@/data/home-v2-data";
import { SITE_LOCALE, SITE_NAME, SITE_URL } from "@/lib/site";
import { ogImage } from "@/lib/v2-seo";

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

// Site-wide defaults. Every page sets its own title, description, canonical
// and preview card through lib/v2-seo.ts; these cover anything that doesn't.
const DESCRIPTION = homeV2Data.meta.description;
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: homeV2Data.meta.title,
    template: "%s · Neha Chhillar",
  },
  description: DESCRIPTION,
  authors: [{ name: "Neha Chhillar" }],
  creator: "Neha Chhillar",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: homeV2Data.meta.title,
    description: DESCRIPTION,
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: ogImage("home"), width: 1200, height: 630, alt: "Neha Chhillar, product designer" }],
    locale: SITE_LOCALE,
  },
  twitter: {
    card: "summary_large_image",
    title: homeV2Data.meta.title,
    description: DESCRIPTION,
    images: [ogImage("home")],
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
      <body
        className={`${inter.variable} ${caveat.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {/* First focusable element in the body: lets keyboard users jump the
            top bar straight to the page content. Hidden until focused. */}
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

