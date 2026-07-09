// Fonts scoped to the unsaid case study only (not loaded globally in layout.tsx).
// Lora = the serif used for confession bodies / pull quotes.
// Space Grotesk = the "unsaid" wordmark + small chrome labels.
// Defined in a non-client module so the font objects can be imported into the
// client case-study component; the .variable strings are applied on its root.
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
