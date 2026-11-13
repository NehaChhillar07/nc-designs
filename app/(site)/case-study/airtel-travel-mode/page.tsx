import type { Metadata } from "next";

import { SpecGap } from "@/components/home-v2/spec-mode";
import { AirtelV2 } from "@/components/v2-case-study/airtel/airtel-v2";
import { atV2 } from "@/data/v2-airtel-travel-mode-data";
import { JsonLd } from "@/components/json-ld";
import { caseStudyCrumbs, v2Metadata } from "@/lib/v2-seo";

const { meta } = atV2;

// The shell (paper, top bar, footer, redlines) comes from app/(site)/layout.tsx.
export const metadata: Metadata = v2Metadata({
    title: meta.title,
    description: meta.description,
    path: "/case-study/airtel-travel-mode",
    card: "airtel-travel-mode",
    cardAlt: "Airtel Travel Mode, a case study by Neha Chhillar",
});

export default function V2AirtelPage() {
    return (
        <main id="main-content" tabIndex={-1} className="outline-none">
            <JsonLd data={caseStudyCrumbs("Airtel Travel Mode", "airtel-travel-mode")} />
            <SpecGap className="h-12 md:h-20" />
            <AirtelV2 />
        </main>
    );
}
