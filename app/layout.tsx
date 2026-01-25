import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "@/components/ui/cursor-context";
import { CustomCursor } from "@/components/ui/custom-cursor";

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
  title: "Neha Chhillar - Product Designer",
  description: "Product Designer at InfoSec Ventures, designing AI-driven systems and end-to-end experiences for global cybersecurity solutions.",
  openGraph: {
    title: "Neha Chhillar - Product Designer",
    description: "Product Designer at InfoSec Ventures",
    type: "website",
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
                  var isTouch = window.matchMedia('(pointer: coarse)').matches ||
                                'ontouchstart' in window ||
                                navigator.maxTouchPoints > 0;
                  if (!isTouch) {
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
        {/* Preload critical assets */}
        <link rel="preload" href="/hero-gradeint.avif" as="image" />
        <link rel="preload" href="/logo.jpeg" as="image" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${caveat.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <CursorProvider>
          <CustomCursor />
          {children}
        </CursorProvider>
      </body>
    </html>
  );
}

