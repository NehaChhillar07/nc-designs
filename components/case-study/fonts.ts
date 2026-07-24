// Shared editorial fonts for the case studies (not loaded globally in layout.tsx).
// Lora        = serif for confession bodies / pull quotes (unsaid).
// Space Grotesk = display headings across studies + the unsaid wordmark.
// Defined in a non-client module so the font objects can be imported into the
// client case-study components; the .variable strings are applied on each root.
import { Lora, Space_Grotesk } from "next/font/google";

export const lora = Lora({
    subsets: ["latin"],
    style: ["normal", "italic"],
    weight: ["400", "500"],
    variable: "--font-lora",
    display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["500", "600", "700"],
    variable: "--font-space-grotesk",
    display: "swap",
});
