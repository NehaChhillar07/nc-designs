"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download, Share2, ArrowLeft, Mail, Link2, X } from "lucide-react";
import { useState, useRef } from "react";


export default function ResumePage() {
    const [isDownloading, setIsDownloading] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [isSharing, setIsSharing] = useState(false);
    const cvRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (isDownloading) return;

        setIsDownloading(true);
        try {
            // Fetch the resume as a blob
            const response = await fetch("/api/download-resume");

            if (!response.ok) {
                throw new Error("Download failed");
            }

            const blob = await response.blob();

            // Create a download link and trigger it
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "Neha_Chhillar_Resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download error:", error);
            alert("Failed to download resume. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    const handleEmailShare = () => {
        const subject = encodeURIComponent("Neha Chhillar - Resume");
        const body = encodeURIComponent(`Check out my resume!\n\n${window.location.href}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
        setShowShareMenu(false);
    };

    const handleNativeShare = async () => {
        if (isSharing) return; // Prevent multiple share operations

        setIsSharing(true);
        try {
            if (navigator.share) {
                await navigator.share({
                    title: "Neha Chhillar - Resume",
                    text: "Check out my resume!",
                    url: window.location.href,
                });
            }
        } catch (error) {
            if (error instanceof Error && error.name !== "AbortError") {
                console.error("Error sharing:", error);
            }
        } finally {
            setIsSharing(false);
        }
        setShowShareMenu(false);
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert("Resume link copied to clipboard!");
        } catch (error) {
            console.error("Error copying link:", error);
        }
        setShowShareMenu(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="container mx-auto flex h-16 items-center justify-between px-8">
                    <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Back</span>
                    </Link>

                    <div className="flex items-center gap-3 relative">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDownload}
                            disabled={isDownloading}
                            className="flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            {isDownloading ? "Generating..." : "Download"}
                        </Button>

                        <div className="relative">
                            <Button
                                size="sm"
                                onClick={() => setShowShareMenu(!showShareMenu)}
                                className="flex items-center gap-2"
                            >
                                <Share2 className="w-4 h-4" />
                                Share
                            </Button>

                            {showShareMenu && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-20">
                                    <button
                                        onClick={handleEmailShare}
                                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-3"
                                    >
                                        <Mail className="w-4 h-4" />
                                        Email
                                    </button>
                                    <button
                                        onClick={handleNativeShare}
                                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-3"
                                    >
                                        <Share2 className="w-4 h-4" />
                                        Share via...
                                    </button>
                                    <button
                                        onClick={handleCopyLink}
                                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-3"
                                    >
                                        <Link2 className="w-4 h-4" />
                                        Copy Link
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Click outside to close share menu */}
            {showShareMenu && (
                <div
                    className="fixed inset-0 z-5"
                    onClick={() => setShowShareMenu(false)}
                />
            )}

            {/* Resume Container */}
            <main className="container mx-auto px-8 py-8 md:py-12">
                <div className="flex justify-center">
                    {/* Paper Style Resume - ATS Friendly */}
                    <article
                        ref={cvRef}
                        id="cv-content"
                        className="bg-white rounded-sm w-full max-w-[816px] min-h-[1056px] p-10 md:p-12"
                        style={{
                            boxShadow: `
                                0 1px 3px rgba(0,0,0,0.12),
                                0 1px 2px rgba(0,0,0,0.24),
                                0 10px 40px rgba(0,0,0,0.1)
                            `,
                            fontFamily: "system-ui, -apple-system, sans-serif",
                        }}
                    >
                        {/* Header Section */}
                        <header className="pb-6 mb-6">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-gray-900">
                                Neha Chhillar
                            </h1>
                            <div className="flex justify-between items-center text-sm text-gray-600">
                                <p>
                                    Gurgaon, Haryana | +91 82872 33848 |{" "}
                                    <a href="mailto:nehachhillar07@gmail.com" className="text-gray-900 hover:underline">
                                        nehachhillar07@gmail.com
                                    </a>
                                </p>
                                <div className="flex items-center gap-3">
                                    <a
                                        href="https://www.linkedin.com/in/neha-chhillar"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-gray-900 hover:underline flex items-center gap-1"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                        LinkedIn
                                    </a>
                                    <span className="text-gray-400">|</span>
                                    <a
                                        href="https://nc-designs.vercel.app"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-gray-900 hover:underline flex items-center gap-1"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                                        Portfolio
                                    </a>
                                </div>
                            </div>
                        </header>

                        {/* Summary */}
                        <section className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                                Summary
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-sm">
                                Product Designer with 3+ years shipping enterprise B2B SaaS in cybersecurity and HR-tech. Specialised in turning admin-heavy, support-dependent workflows into self-serve systems. Designs with AI in the loop, using it to accelerate exploration while keeping authority and judgment with the user. Comfortable owning a product from problem definition through launch with product, engineering, and customer success.
                            </p>
                        </section>

                        {/* Core Capabilities */}
                        <section className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                                Core Capabilities
                            </h2>
                            <ul className="text-gray-700 space-y-1 list-disc list-inside text-sm">
                                <li>Complex B2B workflow design, information architecture, and end-to-end product flows</li>
                                <li>AI-assisted design for production: GenAI-driven campaign creation, content generation, and reporting with deliberate human-decision checkpoints</li>
                                <li>Data-driven dashboard and analytics design focused on decision-making, not data display</li>
                                <li>Design systems, prototyping (Figma, Cursor), usability testing, accessibility</li>
                                <li>Cross-functional collaboration with Product Management, Engineering, and Customer Success</li>
                            </ul>
                        </section>

                        {/* Experience */}
                        <section className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                                Experience
                            </h2>

                            {/* Infosec Ventures */}
                            <div className="mb-5">
                                <h3 className="font-bold text-gray-900">
                                    Infosec Ventures — Product Designer
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">Jul 2024 – Present | Web-based B2B SaaS used by enterprise security teams</p>
                                <ul className="text-gray-700 space-y-1 list-disc list-inside text-sm">
                                    <li>Led end-to-end design of Human Firewall 3, evolving a 10-year-old security platform into an AI-native risk intelligence system used by enterprise security teams</li>
                                    <li>Unified phishing simulations, LMS training, and risk reporting into one product, replacing a 7-tab manual workflow with an AI-assisted, self-serve flow that reduced customer-success dependency on launches</li>
                                    <li>Designed the AI-assisted campaign creation flow with deliberate human checkpoints (automation prepares, admins approve), preventing 10,000-recipient sends from becoming background actions</li>
                                    <li>Redesigned the risk score from a single number into a structured radar across Behaviour, Training, and Role Sensitivity, giving admins a reason and a place to intervene</li>
                                    <li>Rebuilt the admin dashboard around decisions, not data display, surfacing action hotspots and department performance, and lifted admin engagement by 48%</li>
                                    <li>Partnered with Product and Customer Success on the HF2 to HF3 migration, where two systems ran in parallel for a shared customer base without confusion</li>
                                    <li>Led design for eCrime Hub, a public-facing cybercrime reporting platform for Dubai Police, working within government brand and accessibility constraints to ship a three-tier visual system that scales to large content volumes without redesign</li>
                                </ul>
                            </div>

                            {/* TexlaCulture */}
                            <div>
                                <h3 className="font-bold text-gray-900">
                                    TexlaCulture — Product Designer
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">Mar 2023 – Jun 2024 | HRMS SaaS</p>
                                <ul className="text-gray-700 space-y-1 list-disc list-inside text-sm">
                                    <li>Designed the first end-to-end version of TexlaCulture&apos;s HRMS, a multi-module, scalable SaaS spanning onboarding, hiring, attendance, LMS, and performance management, used by 8,000+ employees across 12 customers in the first year</li>
                                    <li>Restructured a 4-section, 40+ module navigation into a mode-based system (Employee, HR, Admin) with pinning and search, reducing time-to-task for admins</li>
                                    <li>Reworked the onboarding journey and in-product guidance, increasing completion rates by 52% and reducing repetitive questions reaching HR</li>
                                    <li>Built and shipped the design system spanning web and mobile components, handed over to engineering as the source of truth for cross-platform consistency</li>
                                    <li>Ran usability testing with the first three live customers and used findings to fix learnability and error-rate issues before broader rollout</li>
                                </ul>
                            </div>
                        </section>

                        {/* Skills */}
                        <section className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                                Skills
                            </h2>
                            <div className="text-sm text-gray-700 space-y-2">
                                <p>
                                    <span className="font-semibold">Design:</span>{" "}
                                    Interaction design, information architecture, design systems, prototyping, usability testing, accessibility, visual design
                                </p>
                                <p>
                                    <span className="font-semibold">Product:</span>{" "}
                                    Problem framing, prioritisation, qualitative and quantitative research synthesis, cross-functional collaboration, stakeholder management
                                </p>
                                <p>
                                    <span className="font-semibold">Tools:</span>{" "}
                                    Figma, Cursor, Claude, ChatGPT, Perplexity, NotebookLM, Lovable, Jira, Notion
                                </p>
                                <p>
                                    <span className="font-semibold">Domains:</span>{" "}
                                    Cybersecurity (phishing simulation, security awareness training, risk scoring), HR Tech (HRMS, onboarding, LMS, performance), Public Sector / Government, Enterprise B2B SaaS, AI-augmented workflows
                                </p>
                            </div>
                        </section>

                        {/* Education */}
                        <section>
                            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                                Education
                            </h2>
                            <div className="text-gray-700 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <p>
                                        <span className="font-semibold">University of Delhi</span> — B.A. (Hons) English
                                    </p>
                                    <p className="text-gray-500">Jun 2020 – Jun 2023</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>
                                        <span className="font-semibold">Coursera</span> — Google UX Design Specialisation
                                    </p>
                                    <p className="text-gray-500">Nov 2022 – Feb 2023</p>
                                </div>
                            </div>
                        </section>
                    </article>
                </div>
            </main >
        </div >
    );
}
