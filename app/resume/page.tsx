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
            link.download = "Neha_Chhillar_Resume.jpg";
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
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link href="/" className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img
                                src="/logo.jpeg"
                                alt="NC Designs"
                                className="w-full h-full object-cover"
                            />
                        </div>
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
            <main className="container mx-auto px-4 py-8 md:py-12">
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
                                    Gurugram, India |{" "}
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
                                2.5 years of experience using agentic AI workflows to ship SaaS products faster, smarter, and with lower risk.
                                I think like a Product Manager, design like a UX strategist, and deliver like an AI-augmented engineer.
                            </p>
                        </section>

                        {/* Flagship Wins */}
                        <section className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                                Flagship Wins
                            </h2>
                            <ul className="text-gray-700 space-y-1 list-disc list-inside text-sm font-bold">
                                <li>Improved engagement across HumanFirewall security dashboards by ~40–50%, helping enterprise admins understand and act on human risk signals more easily</li>
                                <li>Worked on the Dubai Police eCrime & cybersecurity public platform, contributing to core reporting and awareness flows used at a national, public scale</li>
                                <li>Contributed to phishing simulation and security awareness flows that increased completion and response rates across multiple enterprise clients</li>
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
                                <p className="text-sm text-gray-600 mb-2">Jul 2024 – Present | Cybersecurity SaaS</p>
                                <ul className="text-gray-700 space-y-1 list-disc list-inside text-sm">
                                    <li>Own UX strategy for enterprise cybersecurity awareness + phishing simulation platform</li>
                                    <li>Built 3 AI-driven security tools from 0→1 using Cursor → 40% faster launch cycles</li>
                                    <li>Defined and prioritized dashboard hierarchy, resulting in a 48% lift in admin engagement</li>
                                    <li>Partner with CISOs + engineering for secure, compliant experience at scale</li>
                                    <li>Defined UX tradeoffs to align user needs with enterprise security KPIs through continuous research loops</li>
                                </ul>
                            </div>

                            {/* TexlaCulture */}
                            <div>
                                <h3 className="font-bold text-gray-900">
                                    TexlaCulture — Product Designer
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">Mar 2023 – Jun 2024 | HRMS SaaS</p>
                                <ul className="text-gray-700 space-y-1 list-disc list-inside text-sm">
                                    <li>Owned core HR workflows used by 7,000+ users globally</li>
                                    <li>Improved hiring funnel by 37%, onboarding success by 52%</li>
                                    <li>Led usability research with 320+ participants → 75% satisfaction lift</li>
                                    <li>Built unified design system → 28% faster engineering delivery</li>
                                    <li>Worked with CXOs + customer success to drive adoption and retention</li>
                                </ul>
                            </div>
                        </section>

                        {/* Agentic AI Product Execution */}
                        <section className="mb-6">
                            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
                                Agentic AI Product Execution
                            </h2>
                            <ul className="text-gray-700 space-y-1 list-disc list-inside text-sm">
                                <li>Chose a Cursor-first execution model, enabling functional prototypes beyond static UI mockups</li>
                                <li>Automated research synthesis (NotebookLM, Perplexity)</li>
                                <li>Early adoption testing using user analytics</li>
                                <li>Hypothesis → Prototype → Test → Ship cycles with enterprise discipline</li>
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
                                    Roadmapping • Prioritization • Stakeholder Alignment • Activation/Retention Metrics
                                </p>
                                <p>
                                    <span className="font-semibold">Design & Execution:</span>{" "}
                                    Interaction Design • Information Architecture • Secure UX • Accessibility • Usability Testing • Design Systems
                                </p>
                                <p>
                                    <span className="font-semibold">AI & Tools:</span>{" "}
                                    Cursor AI • Perplexity • NotebookLM • Notion • ChatGPT • Figma • Miro • Jira
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
                                    <span className="font-semibold">Google UX Design Specialization</span> — Coursera
                                </p>
                            </div>
                        </section>
                    </article>
                </div>
            </main >
        </div >
    );
}
