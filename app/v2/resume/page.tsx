import type { Metadata } from "next";

import { ResumeV2 } from "@/components/home-v2/resume-v2";
import { SpecGap } from "@/components/home-v2/spec-mode";
import { v2Pages } from "@/data/v2-pages-data";
import { SITE_URL } from "@/lib/site";

const { meta } = v2Pages.resume;

export const metadata: Metadata = {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: `${SITE_URL}/resume` },
};

export default function V2ResumePage() {
    return (
        <main id="main-content" tabIndex={-1} className="outline-none">
            <SpecGap className="h-14 md:h-24" />
            <ResumeV2 />
            <SpecGap className="h-32 md:h-48" />
        </main>
    );
}
