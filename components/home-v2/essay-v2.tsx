import Image from "next/image";
import Link from "next/link";

import type { Essay } from "@/components/writing/essay-article";
import { V2, v2Pages } from "@/data/v2-pages-data";

import { GRID } from "./grid";
import { Reveal } from "./motion";
import { Spec } from "./spec-mode";

const { essay: copy } = v2Pages;

// An essay on the paper. The display serif for the title and section words,
// Inter at a comfortable measure (about 66 characters) for reading, and the
// cover printed like the work on the desk: cream border, slight tilt.
export function EssayV2({ essay, next }: { essay: Essay; next?: { slug: string; essay: Essay } }) {
    return (
        <article>
            <header className={GRID}>
                <div className="col-span-4 md:col-span-9 md:col-start-2">
                    <p className="v2-mono flex items-baseline gap-3 text-[12px] text-[var(--v2-muted)]">
                        <Link href={V2.home} className="v2-link">
                            ← {copy.back}
                        </Link>
                        <span aria-hidden>/</span>
                        <span>{copy.eyebrow}</span>
                    </p>
                    <Spec
                        as="h1"
                        name="display / essay title"
                        type
                        className="v2-display mt-8 text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.02em] text-[var(--v2-oxblood)]"
                    >
                        {essay.title}
                    </Spec>
                    <p className="v2-display mt-6 max-w-[34ch] text-[24px] italic leading-[1.25] text-[var(--v2-ink)] md:text-[30px]">
                        {essay.dek}
                    </p>
                    <p className="v2-mono mt-6 text-[12px] text-[var(--v2-muted)]">
                        <time dateTime={essay.dateISO}>{essay.dateDisplay.toLowerCase()}</time>
                        <span aria-hidden className="mx-2">
                            ·
                        </span>
                        {essay.readTime}
                    </p>
                </div>

                <div className="col-span-4 mt-12 md:col-span-10 md:col-start-2 md:mt-16">
                    <span className="block -rotate-[0.6deg] bg-[#f7f3ec] p-[1.5%] shadow-[0_24px_40px_-26px_rgba(60,10,12,0.5)]">
                        <Image
                            src={essay.cover}
                            alt={essay.coverAlt}
                            width={essay.coverWidth ?? 2400}
                            height={essay.coverHeight ?? 1120}
                            sizes="(min-width: 768px) 80vw, 100vw"
                            priority
                            className="block h-auto w-full"
                        />
                    </span>
                </div>
            </header>

            <div className={`${GRID} mt-16 md:mt-24`}>
                <Spec name="body / essay" type className="col-span-4 max-w-[66ch] md:col-span-7 md:col-start-3">
                    {essay.blocks.map((block, i) =>
                        block.type === "h2" ? (
                            <h2
                                key={i}
                                className="v2-display mb-5 mt-14 text-[34px] italic leading-[1.05] text-[var(--v2-oxblood)] first:mt-0 md:text-[44px]"
                            >
                                {block.text}
                            </h2>
                        ) : (
                            <p key={i} className="mb-6 text-[17px] leading-[1.75] text-[var(--v2-ink)] md:text-[18px]">
                                {block.text}
                            </p>
                        ),
                    )}
                </Spec>
            </div>

            {next && (
                <Reveal className={`${GRID} mt-24 md:mt-32`}>
                    <Link
                        href={V2.writing(next.slug)}
                        className="group col-span-4 block border-t border-[var(--v2-rule)] pt-5 md:col-span-7 md:col-start-3"
                    >
                        <span className="v2-mono block text-[11px] text-[var(--v2-muted)]">{copy.next}</span>
                        <span className="v2-display mt-2 block text-[32px] leading-[1.05] text-[var(--v2-ink)] transition-colors group-hover:text-[var(--v2-oxblood)] md:text-[44px]">
                            {next.essay.title}{" "}
                            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                                →
                            </span>
                        </span>
                    </Link>
                </Reveal>
            )}
        </article>
    );
}
