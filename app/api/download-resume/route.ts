import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(request: Request) {
    let browser = null;

    try {
        // Get the origin from the request URL
        const url = new URL(request.url);
        const origin = `${url.protocol}//${url.host}`;

        // Launch Puppeteer
        browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();

        // Set viewport to A4 dimensions
        await page.setViewport({
            width: 816,  // A4 width in pixels at 96 DPI
            height: 1056, // A4 height in pixels at 96 DPI
        });

        // Navigate to the resume page
        await page.goto(`${origin}/resume`, {
            waitUntil: "networkidle0",
            timeout: 30000,
        });

        // Wait for the CV content to be rendered
        await page.waitForSelector("#cv-content", { timeout: 10000 });

        // Hide everything except CV content for PDF
        await page.addStyleTag({
            content: `
                /* Hide ALL fixed positioned elements (avatar, nav, buttons) */
                .fixed, [class*="fixed"], header.fixed, nav, header {
                    display: none !important;
                }
                /* Hide action buttons container */
                .download-actions, .share-actions, .action-bar, button {
                    display: none !important;
                }
                /* Hide any element with z-index classes (nav overlay) */
                [class*="z-50"], [class*="z-40"], [class*="z-10"] {
                    display: none !important;
                }
                /* Remove blue border line */
                [class*="border-b"], .border-b {
                    border-bottom: none !important;
                }
                /* Remove background gradient */
                body, html, .min-h-screen {
                    background: white !important;
                }
                /* Reset all spacing */
                html, body {
                    padding: 0 !important;
                    margin: 0 !important;
                    background: white !important;
                }
                main {
                    padding: 0 !important;
                    margin: 0 !important;
                }
                main > div {
                    padding: 0 !important;
                }
                /* CV content - consistent padding on all sides */
                #cv-content {
                    box-shadow: none !important;
                    border: none !important;
                    margin: 0 auto !important;
                    padding: 40px !important;
                    max-width: 100% !important;
                    background: white !important;
                }
                /* Ensure CV header section is visible */
                #cv-content header {
                    display: block !important;
                }
            `
        });

        // Generate PDF - consistent margins on all sides
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: false,
            scale: 0.72,
            margin: {
                top: '10mm',
                bottom: '10mm',
                left: '10mm',
                right: '10mm'
            }
        });

        await browser.close();
        browser = null;

        // Return the PDF with proper headers
        const pdfBuffer = Buffer.from(pdf);
        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": 'attachment; filename="Neha_Chhillar_Resume.pdf"',
                "Cache-Control": "no-cache, no-store, must-revalidate",
            },
        });

    } catch (error) {
        console.error("Error generating resume PDF:", error);

        if (browser) {
            await browser.close();
        }

        return NextResponse.json(
            { error: "Failed to generate resume PDF" },
            { status: 500 }
        );
    }
}
