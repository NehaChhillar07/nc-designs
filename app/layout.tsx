import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import { MotionConfig } from "motion/react";
import { CursorProvider } from "@/components/ui/cursor-context";
import { CustomCursor } from "@/components/ui/custom-cursor";
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
  description: "Product designer in AI-native B2B SaaS. First designer at two companies. I design end to end, and I build.",
  keywords: ["Product Designer", "UX Designer", "Cybersecurity", "AI", "SaaS", "Dubai"],
  authors: [{ name: "Neha Chhillar" }],
  creator: "Neha Chhillar",
  // Every other route sets its own canonical; without this the homepage emitted
  // none at all, while the sitemap still listed it.
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Neha Chhillar - Product Designer",
    description: "Product designer in AI-native B2B SaaS. First designer at two companies. I design end to end, and I build.",
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
    description: "Product designer in AI-native B2B SaaS. First designer at two companies. I design end to end, and I build.",
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
        {/* Inline script AND style to hide cursor IMMEDIATELY before any content renders */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Reloads must start at the top. Restoring a mid-page offset
                  // lands on lazy sections that are still short placeholders, so
                  // the page reflows under the viewport for a second or two.
                  if ('scrollRestoration' in history) {
                    history.scrollRestoration = 'manual';
                  }
                } catch(e) {}
                try {
                  var isTouch = window.matchMedia('(pointer: coarse)').matches ||
                                'ontouchstart' in window ||
                                navigator.maxTouchPoints > 0;
                  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                  // Only pre-hide the native cursor for users who will actually
                  // get the custom one. Must match CustomCursor's enable check,
                  // otherwise reduced-motion users are left with no cursor.
                  if (!isTouch && !reducedMotion) {
                    document.documentElement.setAttribute('data-cursor', 'none');
                    document.documentElement.style.setProperty('cursor', 'none', 'important');
                    var style = document.createElement('style');
                    style.id = 'cursor-hide-style';
                    style.textContent = 'html[data-cursor="none"], html[data-cursor="none"] * { cursor: none !important; }';
                    document.head.appendChild(style);
                    if (document.body) {
                      document.body.style.setProperty('cursor', 'none', 'important');
                    } else {
                      document.addEventListener('DOMContentLoaded', function() {
                        document.body.style.setProperty('cursor', 'none', 'important');
                      });
                    }
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
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
      </body>
    </html>
  );
}

