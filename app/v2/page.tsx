import type { Metadata } from "next";

import { BeforePaintScript } from "@/components/home-v2/before-paint-script";
import { DeskProvider } from "@/components/home-v2/desk";
import { Greeting } from "@/components/home-v2/greeting";
import { greetingScript } from "@/components/home-v2/greeting-script";
import { Hero, IntroBand } from "@/components/home-v2/hero";
import { KindWords } from "@/components/home-v2/kind-words";
import { MobileDeck } from "@/components/home-v2/mobile-deck";
import { PrinciplesAndLately } from "@/components/home-v2/principles-and-lately";
import { SpecGap } from "@/components/home-v2/spec-mode";
import { WorkIndex } from "@/components/home-v2/work-index";
import { homeV2Data } from "@/data/home-v2-data";
import { SITE_LOCALE, SITE_NAME } from "@/lib/site";

const { meta } = homeV2Data;

// Homepage 2.0, built beside the current homepage for comparison. The shell
// (paper, top bar, footer, redlines, noindex) comes from app/v2/layout.tsx.
export const metadata: Metadata = {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: meta.url },
    openGraph: {
        siteName: SITE_NAME,
        locale: SITE_LOCALE,
        title: meta.title,
        description: meta.description,
        type: "website",
        url: meta.url,
    },
};

export default function HomeV2Page() {
    return (
        <>
            {/* Decides before first paint whether the greeting plays (see greeting.tsx). */}
            <BeforePaintScript code={greetingScript} />
            <Greeting />
            <main id="main-content" tabIndex={-1} className="outline-none">
                {/* One provider from the desk down to the work list, so the
                    pieces can fly between them. */}
                <DeskProvider>
                    <Hero />
                    <SpecGap className="h-16 md:hidden" />
                    <MobileDeck />
                    <SpecGap className="hidden md:block md:h-28" />
                    <IntroBand />
                    <SpecGap className="h-28 md:h-40" />
                    <WorkIndex />
                </DeskProvider>
                <SpecGap className="h-28 md:h-44" />
                <PrinciplesAndLately />
                <SpecGap className="h-28 md:h-44" />
                <KindWords />
                <SpecGap className="h-32 md:h-52" />
            </main>
        </>
    );
}
