"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

// A container narrower than this renders the resume's body copy below 9px,
// which is too small to read. Narrow viewports get a fixed legible width and
// pan sideways inside the viewer instead of shrinking the type.
const NARROW_CONTAINER = 640;
const MIN_LEGIBLE_WIDTH = 700;

// Renders the resume PDF with pdf.js instead of the browser's native PDF
// viewer. The native viewer (iframe embed) carries its own pinch/ctrl-scroll
// zoom and dark backdrop, which let the page shrink into a black void. Here
// each page is drawn at the container's width, or at a minimum legible width
// when the container is too narrow for the text to be readable.
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

    // Panning stays inside this scroller, so the page itself never overflows.
    const renderWidth =
        width === undefined ? undefined : width < NARROW_CONTAINER ? MIN_LEGIBLE_WIDTH : width;

    return (
        <div
            ref={containerRef}
            role="region"
            aria-label="Resume document"
            tabIndex={0}
            className="w-full h-full overflow-auto bg-white focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gray-900"
        >
            {renderWidth !== undefined && renderWidth > 0 && (
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
                            width={renderWidth}
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
