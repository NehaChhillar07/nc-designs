"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download, Share2, ArrowLeft, Mail, Link2 } from "lucide-react";
import { useState } from "react";


export default function ResumePage() {
    const [isDownloading, setIsDownloading] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [isSharing, setIsSharing] = useState(false);

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
        <div className="h-[100dvh] flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm flex-shrink-0 z-10">
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

            {/* Resume Container — embeds the PDF directly so updates flow from /public */}
            <main className="flex-1 min-h-0 container mx-auto px-6 md:px-10 py-6 md:py-8">
                <div className="flex justify-center h-full">
                    {/* 3D extruded box: white front face + two skewed dark panels for right/bottom */}
                    <div className="relative w-full max-w-[816px] h-full">
                        {/* Right side panel — skewed parallelogram going right & down */}
                        <div
                            aria-hidden
                            style={{
                                position: "absolute",
                                top: 0,
                                left: "100%",
                                width: "14px",
                                height: "100%",
                                background: "#0f0f0f",
                                transform: "skewY(45deg)",
                                transformOrigin: "0 0",
                            }}
                        />
                        {/* Bottom side panel — skewed parallelogram going right & down */}
                        <div
                            aria-hidden
                            style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                width: "100%",
                                height: "14px",
                                background: "#1a1a1a",
                                transform: "skewX(45deg)",
                                transformOrigin: "0 0",
                            }}
                        />
                        {/* Front face — the card */}
                        <div
                            className="relative w-full h-full bg-white overflow-hidden"
                            style={{
                                borderTop: "1px solid rgba(0,0,0,0.10)",
                                borderLeft: "1px solid rgba(0,0,0,0.10)",
                                boxShadow: `
                                    18px 22px 40px rgba(0,0,0,0.22),
                                    6px 10px 18px rgba(0,0,0,0.10)
                                `,
                            }}
                        >
                            <iframe
                                src="/api/download-resume?inline=1#toolbar=0&navpanes=0&view=FitH"
                                title="Neha Chhillar — Resume"
                                className="w-full h-full block border-0"
                            />
                            <noscript>
                                <p className="p-6 text-sm text-gray-600">
                                    Your browser cannot display the embedded PDF.{" "}
                                    <a href="/api/download-resume" className="underline">
                                        Download the resume
                                    </a>{" "}
                                    instead.
                                </p>
                            </noscript>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}
