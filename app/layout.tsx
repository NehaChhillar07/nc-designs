import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "@/components/ui/cursor-context";
import { CustomCursor } from "@/components/ui/custom-cursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "Neha Chhillar - Product Designer",
  description: "Product Designer at InfoSec Ventures, designing AI-driven systems and end-to-end experiences for global cybersecurity solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning style={{ cursor: 'none' }}>
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
