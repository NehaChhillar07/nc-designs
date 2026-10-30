import type { Metadata } from "next";
import Link from "next/link";

import { GRID } from "@/components/home-v2/grid";
import { SpecGap } from "@/components/home-v2/spec-mode";
import { v2Pages } from "@/data/v2-pages-data";

const { notFound: nf } = v2Pages;

export const metadata: Metadata = {
    title: { absolute: "Nothing filed here · Neha Chhillar" },
};

// Any unknown /v2 URL lands here (see app/v2/[...missing]/page.tsx), inside
// the v2 shell, so a visitor never drops back into the old design.
export default function V2NotFound() {
    return (
        <main id="main-content" tabIndex={-1} className="outline-none">
            <SpecGap className="h-20 md:h-32" />
            <section className={GRID}>
                <div className="col-span-4 md:col-span-9 md:col-start-2">
                    <p className="v2-mono text-[12px] text-[var(--v2-muted)]">{nf.code}</p>
                    <h1 className="v2-display mt-6 text-[clamp(3.5rem,10vw,9rem)] italic leading-[0.9] text-[var(--v2-oxblood)]">
                        {nf.heading}
                    </h1>
                    <p className="mt-6 max-w-[46ch] text-[17px] leading-[1.6] text-[var(--v2-muted)]">{nf.body}</p>
                    <nav aria-label="Pages" className="v2-mono mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-[var(--v2-rule)] pt-5 text-[13px]">
                        {nf.links.map((l) => (
                            <Link key={l.href} href={l.href} className="v2-link">
                                {l.label} →
                            </Link>
                        ))}
                    </nav>
                </div>
            </section>
            <SpecGap className="h-32 md:h-52" />
        </main>
    );
}
