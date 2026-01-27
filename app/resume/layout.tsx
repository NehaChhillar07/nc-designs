import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resume | Neha Chhillar - Product Designer",
    description: "Product Designer with 4+ years of experience in AI-driven SaaS, cybersecurity platforms, and enterprise solutions. Currently at InfoSec Ventures.",
    openGraph: {
        title: "Resume | Neha Chhillar - Product Designer",
        description: "Product Designer with 4+ years of experience in AI-driven SaaS, cybersecurity platforms, and enterprise solutions.",
        type: "profile",
        url: "https://nehachhillar.com/resume",
    },
    twitter: {
        card: "summary_large_image",
        title: "Resume | Neha Chhillar - Product Designer",
        description: "Product Designer with 4+ years of experience in AI-driven SaaS and cybersecurity platforms.",
    },
};

export default function ResumeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
