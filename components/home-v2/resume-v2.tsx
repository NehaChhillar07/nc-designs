"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { v2Pages } from "@/data/v2-pages-data";
import { cn } from "@/lib/utils";

import { ContourField } from "./contour-field";
import { GRID } from "./grid";
import { Journey } from "./journey";
import { Spec, SpecGap } from "./spec-mode";
import { useCopy } from "./use-copy";

const { resume } = v2Pages;
const currentUrl = () => window.location.href;

export function ResumeV2() {
    const [downloading, setDownloading] = useState(false);
    const [failed, setFailed] = useState(false);
    // Copies the page URL, read at click time (the server has no window).
    const { copied, copy } = useCopy(currentUrl);

    // Same flow as the live page: fetch through the API route (which logs the
    // download), then save the blob under a readable file name.
    const download = async () => {
        if (downloading) return;
        setDownloading(true);
        setFailed(false);
        try {
            const res = await fetch("/api/download-resume");
            if (!res.ok) throw new Error(String(res.status));
            const url = URL.createObjectURL(await res.blob());
            const a = document.createElement("a");
            a.href = url;
            a.download = "Neha_Chhillar_Resume.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch {
            setFailed(true);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <>
            <ContourField />
            <section aria-labelledby="v2-resume" className={GRID}>
                <div className="col-span-4 flex flex-col gap-6 md:col-span-10 md:col-start-2 md:flex-row md:items-end md:justify-between">
                    <div>
                        <Spec
                            as="h1"
                            id="v2-resume"
                            name="display / page title"
                            type
                            className="v2-display text-[clamp(3.5rem,9vw,8rem)] italic leading-[0.85] text-[var(--v2-oxblood)]"
                        >
                            {resume.heading}
                        </Spec>
                        <p className="mt-4 text-[15px] text-[var(--v2-muted)]">{resume.sub}</p>
                    </div>

                    <div className="v2-mono flex items-center gap-6 text-[12px]">
                        <button type="button" onClick={download} disabled={downloading} className="v2-link disabled:opacity-60">
                            {downloading ? resume.downloading : resume.download}
                        </button>
                        <button
                            type="button"
                            onClick={copy}
                            className={cn("flex items-center gap-1", copied ? "text-[var(--v2-oxblood)]" : "v2-link")}
                            aria-live="polite"
                        >
                            {copied && <Check aria-hidden className="h-3 w-3" strokeWidth={2.5} />}
                            {copied ? resume.copied : resume.copy}
                        </button>
                    </div>
                </div>

                {failed && (
                    <p role="alert" className="v2-mono col-span-4 mt-4 text-[12px] text-[var(--v2-oxblood)] md:col-span-10 md:col-start-2">
                        {resume.downloadError}
                    </p>
                )}
            </section>
            <SpecGap className="h-16 md:h-28" />
            <Journey />
        </>
    );
}
