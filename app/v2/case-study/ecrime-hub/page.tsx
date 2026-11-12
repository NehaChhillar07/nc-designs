import type { Metadata } from "next";

import { SpecGap } from "@/components/home-v2/spec-mode";
import { EcrimeV2 } from "@/components/v2-case-study/ecrime/ecrime-v2";
import { ecV2 } from "@/data/v2-ecrime-hub-data";

const { meta } = ecV2;

// The shell (paper, top bar, footer, redlines, noindex) comes from app/v2/layout.tsx.
export const metadata: Metadata = {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: meta.canonical },
};

export default function V2EcrimeHubPage() {
    return (
        <main id="main-content" tabIndex={-1} className="outline-none">
            <SpecGap className="h-12 md:h-20" />
            <EcrimeV2 />
        </main>
    );
}
