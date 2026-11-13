import { SketchyArrow } from "@/components/ui/sketchy-note";
import { v2Pages } from "@/data/v2-pages-data";
import { CAL_LINK, resolveToken } from "@/lib/placeholders";
import { CONTACT_EMAIL } from "@/lib/site";

import { GRID } from "./grid";
import { Reveal } from "./motion";
import { Spec } from "./spec-mode";

const { workWithMe: w } = v2Pages;

// The freelance page, in the homepage's voice: the claim, the proof, who it's
// for, then one ask. The kind words section is reused from the homepage by
// the route, between "who this is for" and the ask.
export function WorkWithMeHero() {
    return (
        <section aria-labelledby="v2-wwm" className={GRID}>
            <div className="col-span-4 md:col-span-10 md:col-start-2">
                <p className="v2-mono text-[12px] text-[var(--v2-muted)]">{w.eyebrow}</p>
                {/* Set, not signed: only the name on the homepage is handwritten first. */}
                <Spec name="display / headline" type className="v2-display mt-6 text-[clamp(3rem,8vw,7.5rem)] leading-[0.92] tracking-[-0.02em] text-[var(--v2-oxblood)]">
                    <h1 id="v2-wwm">
                        {w.headline.map((text, i) => (
                            <span key={text} className={`v2-title block${i > 0 ? " italic" : ""}`} style={{ "--line": i } as React.CSSProperties}>
                                {text}
                            </span>
                        ))}
                    </h1>
                </Spec>
            </div>

            <div className="col-span-4 mt-10 md:col-span-5 md:col-start-2 md:mt-14">
                <Spec as="p" name="body / lead" type className="text-[20px] leading-[1.45] text-[var(--v2-ink)] md:text-[24px]">
                    {w.body}
                </Spec>
                <p className="v2-mono mt-6 text-[12px] text-[var(--v2-muted)]">{w.availability}</p>
            </div>

            <Spec as="dl" name="proof" className="col-span-4 mt-10 grid grid-cols-2 gap-x-6 border-t border-[var(--v2-rule)] pt-4 md:col-span-5 md:col-start-7 md:mt-14">
                {w.proof.map((p) => (
                    <div key={p.label} className="flex flex-col-reverse justify-end gap-1">
                        <dt className="v2-mono text-[11px] text-[var(--v2-muted)]">{p.label}</dt>
                        <dd className="v2-display whitespace-nowrap text-[32px] leading-none text-[var(--v2-oxblood)] md:text-[44px]">{p.value}</dd>
                    </div>
                ))}
            </Spec>
        </section>
    );
}

export function WorkWithMeWhoFor() {
    return (
        <Reveal className={GRID}>
            <h2 className="v2-mono col-span-4 text-[11px] text-[var(--v2-muted)] md:col-span-2 md:col-start-2 md:pt-3">{w.whoFor.heading}</h2>
            <p className="v2-display col-span-4 mt-4 text-[30px] leading-[1.15] text-[var(--v2-ink)] md:col-span-7 md:col-start-4 md:mt-0 md:text-[42px]">
                {w.whoFor.body}
            </p>
        </Reveal>
    );
}

export function WorkWithMeAsk() {
    const cal = resolveToken(CAL_LINK);
    const mail = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(w.cta.emailSubject)}`;
    return (
        <section aria-label={w.cta.book} className={GRID}>
            <div className="col-span-4 md:col-span-8 md:col-start-2">
                <div className="flex items-start gap-1 text-[var(--v2-oxblood)]">
                    <p className="-rotate-1 text-[22px] leading-none" style={{ fontFamily: "var(--font-caveat), cursive" }}>
                        {w.cta.note}
                    </p>
                    <SketchyArrow direction="down" color="currentColor" className="-mt-1 h-10 w-10" />
                </div>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-8 gap-y-3">
                    {cal && (
                        <a
                            href={cal}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group v2-display text-[clamp(3rem,8vw,7rem)] italic leading-none text-[var(--v2-oxblood)]"
                        >
                            {w.cta.book}{" "}
                            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                                →
                            </span>
                        </a>
                    )}
                    <a href={mail} className="v2-mono v2-link text-[13px]">
                        {w.cta.email}
                    </a>
                </div>
            </div>
        </section>
    );
}
