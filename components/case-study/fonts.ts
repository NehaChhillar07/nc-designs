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

// No `weight` list: Space Grotesk is a variable font, and listing 500/600/700
// makes Google return the same file three times, which breaks the Turbopack
// production build ("next/font/google queries have exactly one entry").
// The variable axis covers every weight the studies use.
export const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
    display: "swap",
});
