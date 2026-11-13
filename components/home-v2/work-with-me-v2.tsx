import { v2Pages } from "@/data/v2-pages-data";
import { CAL_LINK, resolveToken } from "@/lib/placeholders";
import { CONTACT_EMAIL } from "@/lib/site";

import { GRID } from "./grid";
import { HandArrow } from "./hand-arrow";
import { Reveal } from "./motion";

const { workWithMe: w } = v2Pages;

// The freelance page, in the homepage's voice: the sentence the founder
// finishes (wwm-sentence.tsx), who it's for, then one ask. The kind words
// section is reused from the homepage by the route, between the two.
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
                    <HandArrow direction="down" className="mt-1 h-10 w-10" />
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
