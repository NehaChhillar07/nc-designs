import { FooterV2 } from "@/components/home-v2/footer-v2";
import { geistMono, instrumentSerif } from "@/components/home-v2/fonts";
import { SpecProvider } from "@/components/home-v2/spec-mode";
import { TopBar } from "@/components/home-v2/top-bar";

import "@/components/home-v2/home-v2.css";

// The shell every public page shares: paper, type, top bar, footer, redlines.
// A route group, so the URLs stay /, /case-study/*, /resume and so on, while
// /stats and the APIs sit outside it with only the root layout.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
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
