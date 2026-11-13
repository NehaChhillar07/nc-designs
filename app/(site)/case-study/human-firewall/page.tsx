import type { Metadata } from "next";

import { SpecGap } from "@/components/home-v2/spec-mode";
import { HumanFirewallV2 } from "@/components/v2-case-study/human-firewall-v2";
import { hfV2 } from "@/data/v2-human-firewall-data";
import { JsonLd } from "@/components/json-ld";
import { caseStudyCrumbs, v2Metadata } from "@/lib/v2-seo";

const { meta } = hfV2;

// The shell (paper, top bar, footer, redlines) comes from app/(site)/layout.tsx.
export const metadata: Metadata = v2Metadata({
    title: meta.title,
    description: meta.description,
    path: "/case-study/human-firewall",
    card: "human-firewall",
    cardAlt: "Human Firewall, a case study by Neha Chhillar",
});

export default function V2HumanFirewallPage() {
    return (
        <main id="main-content" tabIndex={-1} className="outline-none">
            <JsonLd data={caseStudyCrumbs("Human Firewall", "human-firewall")} />
            <SpecGap className="h-12 md:h-20" />
            <HumanFirewallV2 />
        </main>
    );
}
