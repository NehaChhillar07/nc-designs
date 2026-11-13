// Fonts for homepage 2.0 only (not loaded globally in layout.tsx).
// Instrument Serif = display: the name, section words, the footer line.
// Geist Mono       = meta: years, status, numbers, spec-mode labels.
// Non-client module so the .variable strings can be applied on the page root.
import { Geist_Mono, Instrument_Serif } from "next/font/google";

export const instrumentSerif = Instrument_Serif({
    subsets: ["latin"],
    weight: "400",
    style: ["normal", "italic"],
    variable: "--font-instrument",
    display: "swap",
});

// Variable font: no weight list (see the note in components/case-study/fonts.ts).
export const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
    display: "swap",
});
