import type { Metadata } from "next";

import { KindWords } from "@/components/home-v2/kind-words";
import { SpecGap } from "@/components/home-v2/spec-mode";
import { WorkWithMeAsk, WorkWithMeHero, WorkWithMeWhoFor } from "@/components/home-v2/work-with-me-v2";
import { v2Pages } from "@/data/v2-pages-data";
import { SITE_URL } from "@/lib/site";

const { meta } = v2Pages.workWithMe;

export const metadata: Metadata = {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: `${SITE_URL}/work-with-me` },
};

export default function V2WorkWithMePage() {
    return (
        <main id="main-content" tabIndex={-1} className="outline-none">
            <SpecGap className="h-14 md:h-24" />
            <WorkWithMeHero />
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
