"use client";

// Chapter 05. First the three rejected drafts, laid on the desk as small
// sketches with a red "rejected" stamp and their verdict in hand. Then the
// answer: a radar that draws itself, describing risk instead of summarising it.

import { motion } from "motion/react";

import { EASE } from "@/components/home-v2/motion";
import { hfV2 } from "@/data/v2-human-firewall-data";

import { CAVEAT, Stamp } from "./cs-kit";

const { rejectedVersions, rejectedStamp, radar, radarCaption, radarAria } = hfV2.riskScore;
const INK = "rgb(26 20 20 / 0.7)";
const draw = (delay = 0) => ({
    initial: { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, margin: "0px 0px -15% 0px" },
    transition: { duration: 0.9, ease: EASE, delay },
});

// A tiny sketch of each draft, so the reader sees what each one looked like.
function Sketch({ i }: { i: number }) {
    if (i === 0)
        return (
            <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
                <text x="10" y="46" fontSize="38" fontFamily="var(--font-instrument), serif" fill={INK}>
                    73
                </text>
                <motion.path d="M70 20 h38 v20 h-38 z" fill="none" stroke={INK} strokeWidth="1.2" {...draw(0.2)} />
                <motion.path d="M74 27 h28 M74 33 h20" stroke={INK} strokeWidth="1.2" {...draw(0.4)} />
            </svg>
        );
    if (i === 1)
        return (
            <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
                <motion.path d="M6 28 h108 v12 h-108 z" fill="none" stroke={INK} strokeWidth="1.2" {...draw(0.1)} />
                <motion.path d="M48 28 v12 M78 28 v12 M98 28 v12" stroke={INK} strokeWidth="1.2" {...draw(0.4)} />
                <rect x="6" y="28" width="42" height="12" fill="rgb(26 20 20 / 0.18)" />
            </svg>
        );
    return (
        <svg viewBox="0 0 120 64" className="h-16 w-full" aria-hidden>
            <motion.path d="M20 56 A40 40 0 0 1 100 56" fill="none" stroke={INK} strokeWidth="1.2" {...draw(0.1)} />
            <motion.path d="M60 56 L88 30" stroke="var(--v2-oxblood)" strokeWidth="1.6" strokeLinecap="round" {...draw(0.5)} />
            <path d="M28 40 l6 3 M60 16 v7 M92 40 l-6 3" stroke={INK} strokeWidth="1.2" />
        </svg>
    );
}

export function RejectedDrafts() {
    return (
        <div>
            <p className="v2-mono text-[12px] text-[var(--v2-muted)]">{rejectedVersions.eyebrow}</p>
            <ol className="mt-5 grid gap-6 md:grid-cols-3 md:gap-5">
                {rejectedVersions.versions.map((v, i) => (
                    <motion.li
                        key={v.label}
                        initial={{ opacity: 0, y: 24, rotate: 0 }}
                        whileInView={{ opacity: 1, y: 0, rotate: [-2.5, 1.5, -1.2][i] }}
                        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                        transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
                        className="relative bg-[#f7f3ec] p-4 pt-5 shadow-[0_22px_36px_-26px_rgba(60,10,12,0.55)]"
                    >
                        <span className="v2-mono text-[11px] text-[var(--v2-muted)]">{v.label}</span>
                        <Sketch i={i} />
                        <p className="mt-2 text-[15px] font-medium leading-snug text-[var(--v2-ink)]">{v.title}</p>
                        <p className="mt-3 text-[19px] leading-[1.2] text-[var(--v2-oxblood)]" style={CAVEAT}>
                            {v.body}
                        </p>
                        <Stamp className="absolute -right-2 top-3 rotate-[-8deg]">{rejectedStamp}</Stamp>
                    </motion.li>
                ))}
            </ol>
        </div>
    );
}

// Three axes, 120° apart. Values are 0–100 along each axis.
const R = 110;
const C = 150;
const ANGLES = [-90, 30, 150];
const pt = (deg: number, r: number) => {
    const a = (deg * Math.PI) / 180;
    return [C + r * Math.cos(a), C + r * Math.sin(a)] as const;
};

export function RiskRadar() {
    const poly = radar.map((f, i) => pt(ANGLES[i], (f.value / 100) * R));
    const d = `M${poly.map((p) => p.join(",")).join(" L")} Z`;
    return (
        <figure>
            <svg viewBox="-50 -6 400 316" role="img" aria-label={radarAria} className="mx-auto w-full max-w-[420px]">
                {[0.33, 0.66, 1].map((k) => (
                    <path
                        key={k}
                        d={`M${ANGLES.map((a) => pt(a, R * k).join(",")).join(" L")} Z`}
                        fill="none"
                        stroke="rgb(107 15 18 / 0.18)"
                        strokeWidth="1"
                    />
                ))}
                {ANGLES.map((a) => {
                    const [x, y] = pt(a, R);
                    return <line key={a} x1={C} y1={C} x2={x} y2={y} stroke="rgb(107 15 18 / 0.18)" strokeWidth="1" />;
                })}
                <motion.path d={d} fill="rgb(107 15 18 / 0.12)" stroke="var(--v2-oxblood)" strokeWidth="2" strokeLinejoin="round" {...draw(0.1)} />
                {poly.map(([x, y], i) => (
                    <motion.circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="var(--v2-oxblood)"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 400, damping: 18 }}
                    />
                ))}
                {radar.map((f, i) => {
                    const [x, y] = pt(ANGLES[i], R + 26);
                    const anchor = i === 0 ? "middle" : i === 1 ? "start" : "end";
                    return (
                        <text key={f.label} x={i === 1 ? x - 18 : i === 2 ? x + 18 : x} y={i === 0 ? y + 4 : y} textAnchor={anchor} className="v2-mono" fontSize="11" fill="var(--v2-ink)">
                            {f.label} · {f.value}
                        </text>
                    );
                })}
            </svg>
            <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-[var(--v2-rule)] pt-3">
                {radar.map((f) => (
                    <div key={f.label}>
                        <dt className="v2-mono text-[11px] text-[var(--v2-oxblood)]">{f.label}</dt>
                        <dd className="mt-1 text-[14px] leading-snug text-[var(--v2-ink)]">{f.desc}</dd>
                    </div>
                ))}
            </dl>
            <figcaption className="v2-mono mt-3 text-[11px] text-[var(--v2-muted)]">{radarCaption}</figcaption>
        </figure>
    );
}
