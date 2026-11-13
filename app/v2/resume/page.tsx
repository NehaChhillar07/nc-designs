import type { Metadata } from "next";

import { ResumeV2 } from "@/components/home-v2/resume-v2";
import { SpecGap } from "@/components/home-v2/spec-mode";
import { v2Pages } from "@/data/v2-pages-data";
import { JsonLd } from "@/components/json-ld";
import { personLd, v2Metadata } from "@/lib/v2-seo";

const { meta } = v2Pages.resume;

export const metadata: Metadata = v2Metadata({
    title: meta.title,
    description: meta.description,
    path: "/resume",
    card: "resume",
    cardAlt: "Resume, Neha Chhillar",
    type: "profile",
});

export default function V2ResumePage() {
    return (
        <main id="main-content" tabIndex={-1} className="outline-none">
            <JsonLd data={personLd} />
            <SpecGap className="h-14 md:h-24" />
            <ResumeV2 />
            <SpecGap className="h-32 md:h-48" />
        </main>
    );
}
