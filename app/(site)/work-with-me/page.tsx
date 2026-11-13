import type { Metadata } from "next";

import { KindWords } from "@/components/home-v2/kind-words";
import { SpecGap } from "@/components/home-v2/spec-mode";
import { WorkWithMeAsk, WorkWithMeWhoFor } from "@/components/home-v2/work-with-me-v2";
import { SentenceHero } from "@/components/home-v2/wwm-sentence";
import { v2Pages } from "@/data/v2-pages-data";
import { v2Metadata } from "@/lib/v2-seo";

const { meta } = v2Pages.workWithMe;

export const metadata: Metadata = v2Metadata({
    title: meta.title,
    description: meta.description,
    path: "/work-with-me",
    card: "work-with-me",
    cardAlt: "Work with Neha Chhillar",
    type: "website",
});

export default function V2WorkWithMePage() {
    return (
        <main id="main-content" tabIndex={-1} className="outline-none">
            <SpecGap className="h-14 md:h-24" />
            <SentenceHero />
            <SpecGap className="h-28 md:h-40" />
            <WorkWithMeWhoFor />
            <SpecGap className="h-28 md:h-40" />
            <KindWords />
            <SpecGap className="h-28 md:h-40" />
            <WorkWithMeAsk />
            <SpecGap className="h-32 md:h-48" />
        </main>
    );
}
