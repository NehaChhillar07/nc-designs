"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

// Renders the resume PDF with pdf.js instead of the browser's native PDF
// viewer. The native viewer (iframe embed) carries its own pinch/ctrl-scroll
// zoom and dark backdrop, which let the page shrink into a black void. Here
// each page is drawn at exactly the container's width, so it always fits.
export function ResumeViewer({ file }: { file: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState<number>();
    const [numPages, setNumPages] = useState(0);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const observer = new ResizeObserver(([entry]) => {
            setWidth(Math.floor(entry.contentRect.width));
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const onLoadSuccess = useCallback(({ numPages: n }: { numPages: number }) => {
        setNumPages(n);
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full overflow-y-auto overflow-x-hidden bg-white">
            {width !== undefined && width > 0 && (
                <Document
                    file={file}
                    onLoadSuccess={onLoadSuccess}
                    loading={<div className="p-8 text-sm text-gray-400">Loading resume…</div>}
                    error={
                        <p className="p-6 text-sm text-gray-600">
                            Could not display the resume.{" "}
                            <a href="/api/download-resume" className="underline">
                                Download it
                            </a>{" "}
                            instead.
                        </p>
                    }
                >
                    {Array.from({ length: numPages }, (_, i) => (
                        <Page
                            key={i}
                            pageNumber={i + 1}
                            width={width}
                            renderTextLayer
                            renderAnnotationLayer
                            loading={null}
                        />
                    ))}
                </Document>
            )}
        </div>
    );
}
