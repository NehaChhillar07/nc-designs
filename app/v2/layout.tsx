import type { Metadata } from "next";

import { FooterV2 } from "@/components/home-v2/footer-v2";
import { geistMono, instrumentSerif } from "@/components/home-v2/fonts";
import { SpecProvider } from "@/components/home-v2/spec-mode";
import { TopBar } from "@/components/home-v2/top-bar";

import "@/components/home-v2/home-v2.css";

// The shell every /v2 page shares: paper, type, top bar, footer, redlines.
// The new design is built beside the current site, so the whole segment stays
// out of search until it replaces "/".
export const metadata: Metadata = {
    robots: { index: false, follow: false },
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={`home-v2 min-h-screen ${instrumentSerif.variable} ${geistMono.variable}`}>
            <SpecProvider>
                <TopBar />
                {children}
                <FooterV2 />
            </SpecProvider>
        </div>
    );
}
