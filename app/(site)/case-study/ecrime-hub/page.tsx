import type { Metadata } from "next";

import { SpecGap } from "@/components/home-v2/spec-mode";
import { EcrimeV2 } from "@/components/v2-case-study/ecrime/ecrime-v2";
import { ecV2 } from "@/data/v2-ecrime-hub-data";
import { JsonLd } from "@/components/json-ld";
import { caseStudyCrumbs, v2Metadata } from "@/lib/v2-seo";

const { meta } = ecV2;

// The shell (paper, top bar, footer, redlines) comes from app/(site)/layout.tsx.
export const metadata: Metadata = v2Metadata({
    title: meta.title,
    description: meta.description,
    path: "/case-study/ecrime-hub",
    card: "ecrime-hub",
    cardAlt: "eCrime Hub, a case study by Neha Chhillar",
});

export default function V2EcrimeHubPage() {
    return (
        <main id="main-content" tabIndex={-1} className="outline-none">
            <JsonLd data={caseStudyCrumbs("eCrime Hub", "ecrime-hub")} />
            <SpecGap className="h-12 md:h-20" />
            <EcrimeV2 />
        </main>
    );
}
