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
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-0.5 text-gray-900">
                                NEHA CHHILLAR
                            </h1>
                            <p className="text-base font-medium text-gray-700 mb-3">
                                Product Designer • AI-Driven SaaS Specialist
                            </p>
                            <div className="flex justify-between items-center text-sm text-gray-600">
                                <p>
                                    Gurgaon, Haryana |{" "}
                                    <a href="mailto:nehachhillar07@gmail.com" className="text-gray-900 hover:underline">
                                        nehachhillar07@gmail.com
                                    </a>
                                    {" "}| +91 82872 33848
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

                        {/* Product Narrative */}
                        <section className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                                Product Narrative
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-sm">
                                Product Designer with 3+ years of experience designing complex enterprise SaaS products across cybersecurity and HRMS domains. Experienced in simplifying high-complexity systems through strong UX architecture, analytical thinking, and system-level design.
                            </p>
                        </section>

                        {/* Flagship Wins */}
                        <section className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                                Flagship Wins
                            </h2>
                            <ul className="text-gray-700 space-y-1 list-disc list-inside text-sm font-bold">
                                <li>Led end-to-end UX and product flow design for an enterprise Human Firewall platform, covering phishing campaigns, security training (LMS), and multi-channel attack simulations</li>
                                <li>Designed clear, scalable user flows across complex security modules, helping engineering teams build features faster and more consistently</li>
                                <li>Added GenAI support to campaign setup, reporting, and risk analysis flows to reduce manual admin work</li>
                                <li>Designed admin dashboards and reports that made human risk data easier to understand and act on, contributing to a 48% increase in admin engagement</li>
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
                                    <li>Owned end-to-end UX and product definition for multiple cybersecurity platforms, partnering with product and engineering to decide what to build and how it should function</li>
                                    <li>Led UX architecture for a Human Firewall platform spanning phishing campaigns, security training (LMS), and multi-channel social engineering simulations</li>
                                    <li>Integrated GenAI capabilities into core workflows to reduce manual admin effort and accelerate campaign setup, reporting, and risk analysis</li>
                                    <li>Designed enterprise dashboards and analytics frameworks, resulting in a 48% increase in admin engagement</li>
                                </ul>
                            </div>

                            {/* TexlaCulture */}
                            <div>
                                <h3 className="font-bold text-gray-900">
                                    TexlaCulture — Product Designer
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">Mar 2023 – Jun 2024 | HRMS SaaS</p>
                                <ul className="text-gray-700 space-y-1 list-disc list-inside text-sm">
                                    <li>Led UX design across the HRMS suite (onboarding, attendance, leave, hiring, LMS, performance, payroll), simplifying complex enterprise workflows into intuitive user journeys</li>
                                    <li>Designed analytics, reports, and dashboards for each HR module, improving data accessibility and interpretability for HR admins and managers</li>
                                    <li>Redesigned hiring workflows and candidate progression flows, contributing to a 37% improvement in funnel completion during post-release rollout</li>
                                    <li>Simplified employee onboarding flows and system guidance, contributing to a 52% increase in successful onboarding completions in early adoption phases</li>
                                </ul>
                            </div>
                        </section>

                        {/* AI-Enabled Product Execution */}
                        <section className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                                AI-Enabled Product Execution
                            </h2>
                            <ul className="text-gray-700 space-y-1 list-disc list-inside text-sm">
                                <li>Defined feature behavior and UX flows with product and engineering before development</li>
                                <li>Used Cursor and AI tools to create functional UX logic and reduce engineering rework</li>
                                <li>Applied AI selectively to reduce manual effort while maintaining admin control in security workflows</li>
                            </ul>
                        </section>

                        {/* Skills */}
                        <section className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                                Skills
                            </h2>
                            <div className="text-sm text-gray-700 space-y-2">
                                <p>
                                    <span className="font-semibold">Product & Strategy:</span>{" "}
                                    UX Problem Solving • Roadmapping • Prioritisation • Stakeholder Alignment • Analytical Thinking & Data Interpretation • Iterative Validation & Feedback Loops
                                </p>
                                <p>
                                    <span className="font-semibold">Design & Execution:</span>{" "}
                                    Interaction Design • Information Architecture • Secure UX • Accessibility • Usability Testing • Design Systems
                                </p>
                                <p>
                                    <span className="font-semibold">AI & Tools:</span>{" "}
                                    Cursor AI • Perplexity • NotebookLM • Notion • ChatGPT • Figma • Jira
                                </p>
                            </div>
                        </section>

                        {/* Education */}
                        <section>
                            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                                Education
                            </h2>
                            <div className="text-gray-700 space-y-2 text-sm">
                                <p>
                                    <span className="font-semibold">University of Delhi</span> — B.A. (Hons) English
                                </p>
                                <p>
                                    <span className="font-semibold">Coursera</span> — Google UX Design Specialisation
                                </p>
                            </div>
                        </section>
                    </article>
                </div>
            </main >
        </div >
    );
}
