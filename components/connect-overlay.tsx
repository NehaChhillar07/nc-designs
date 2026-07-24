"use client";

import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Highlighter } from "@/components/ui/highlighter";

interface ConnectOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ConnectOverlay({ isOpen, onClose }: ConnectOverlayProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const previouslyFocused = useRef<HTMLElement | null>(null);

    // Accessible dialog behaviour: lock scroll, move focus into the dialog,
    // trap Tab within it, close on Escape, and restore focus on close.
    useEffect(() => {
        if (!isOpen) return;

        previouslyFocused.current = document.activeElement as HTMLElement | null;
        document.body.style.overflow = "hidden";

        const getFocusable = () =>
            modalRef.current
                ? Array.from(
                      modalRef.current.querySelectorAll<HTMLElement>(
                          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
                      )
                  )
                : [];

        const focusFrame = requestAnimationFrame(() => getFocusable()[0]?.focus());

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
                return;
            }
            if (e.key === "Tab") {
                const items = getFocusable();
                if (items.length === 0) return;
                const first = items[0];
                const last = items[items.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
            cancelAnimationFrame(focusFrame);
            previouslyFocused.current?.focus?.();
        };
    }, [isOpen, onClose]);

    const whatsappNumber = "918287233848";
    const whatsappMessage = encodeURIComponent("Hi Neha! I'd love to connect.");
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    const whatsappQRUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(whatsappLink)}&bgcolor=ffffff&color=000000&margin=0`;

    const emailSubject = encodeURIComponent("Let's Connect - Portfolio Inquiry");
    const emailBody = encodeURIComponent("Hi Neha,\n\nI came across your portfolio and would love to connect!\n\n[Your message here]\n\nBest regards");
    const emailLink = `mailto:nehachhillar07@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        ref={modalRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="connect-title"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-sm"
                    >
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                            {/* Header */}
                            <div className="relative px-6 pt-6 pb-4">
                                <button
                                    onClick={onClose}
                                    aria-label="Close"
                                    className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <X className="w-4 h-4 text-gray-400" />
                                </button>
                                <h2 id="connect-title" className="text-xl font-medium text-gray-900">
                                    Let's connect
                                </h2>
                            </div>

                            {/* Cards */}
                            <div className="px-6 pb-6 space-y-3">
                                {/* WhatsApp Card */}
                                <motion.a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-4 bg-gray-50 rounded-xl border border-gray-100"
                                    whileHover={{
                                        rotateX: -3,
                                        rotateY: 4,
                                        scale: 1.02,
                                        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)"
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        {/* Text */}
                                        <div className="flex-1">
                                            <span className="text-xs text-gray-400 uppercase tracking-wide">WhatsApp</span>
                                            <p className="text-lg font-medium text-gray-900 mt-0.5">
                                                <Highlighter action="highlight" color="#FF9800">
                                                    +91 82872 33848
                                                </Highlighter>
                                            </p>
                                        </div>

                                        {/* QR Code */}
                                        <div className="flex-shrink-0 bg-white p-1.5 rounded-lg border border-gray-100">
                                            <img
                                                src={whatsappQRUrl}
                                                alt="WhatsApp QR"
                                                width={64}
                                                height={64}
                                                className="rounded"
                                            />
                                        </div>
                                    </div>
                                </motion.a>

                                {/* Email Card */}
                                <motion.a
                                    href={emailLink}
                                    className="block p-4 bg-gray-50 rounded-xl border border-gray-100"
                                    whileHover={{
                                        rotateX: -3,
                                        rotateY: -4,
                                        scale: 1.02,
                                        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)"
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                                >
                                    <span className="text-xs text-gray-400 uppercase tracking-wide">Email</span>
                                    <p className="text-lg font-medium text-gray-900 mt-0.5">
                                        <Highlighter action="highlight" color="#FF9800">
                                            nehachhillar07@gmail.com
                                        </Highlighter>
                                    </p>
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
