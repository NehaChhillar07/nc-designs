import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
    title: "Resume",
    description: "Product Designer with 3+ years of experience, two of them in cybersecurity, designing AI-driven SaaS and enterprise platforms. Currently at InfoSec Ventures.",
    alternates: {
        canonical: `${SITE_URL}/resume`,
    },
    openGraph: {
        title: "Resume | Neha Chhillar - Product Designer",
        description: "Product Designer with 3+ years of experience, two of them in cybersecurity, designing AI-driven SaaS and enterprise platforms. Currently at InfoSec Ventures.",
        type: "profile",
        url: `${SITE_URL}/resume`,
        images: [{ url: "/og/resume.png", width: 1200, height: 630, alt: "Resume - Neha Chhillar" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Resume | Neha Chhillar - Product Designer",
        description: "Product Designer with 3+ years of experience, two of them in cybersecurity, designing AI-driven SaaS and enterprise platforms.",
        images: ["/og/resume.png"],
    },
};

export default function ResumeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
