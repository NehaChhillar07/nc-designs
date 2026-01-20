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
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
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
    <html lang="en" suppressHydrationWarning style={{ cursor: 'none' }}>
      <head>
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
        style={{ cursor: 'none' }}
      >
        <CursorProvider>
          <CustomCursor />
          {children}
        </CursorProvider>
      </body>
    </html>
  );
}

