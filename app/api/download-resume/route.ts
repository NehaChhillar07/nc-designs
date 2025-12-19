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

        // Set viewport to A4 dimensions at 2x scale for high quality
        await page.setViewport({
            width: 816 * 2,  // A4 width in pixels at 96 DPI, 2x for retina
            height: 1056 * 2, // A4 height in pixels at 96 DPI, 2x for retina
            deviceScaleFactor: 2,
        });

        // Navigate to the resume page
        await page.goto(`${origin}/resume`, {
            waitUntil: "networkidle0",
            timeout: 30000,
        });

        // Wait for the CV content to be rendered
        await page.waitForSelector("#cv-content", { timeout: 10000 });

        // Get the CV element
        const cvElement = await page.$("#cv-content");

        if (!cvElement) {
            throw new Error("CV element not found");
        }

        // Take a screenshot of just the CV element
        const screenshot = await cvElement.screenshot({
            type: "jpeg",
            quality: 95,
        });

        await browser.close();
        browser = null;

        // Return the image with proper headers
        const buffer = Buffer.from(screenshot);
        return new NextResponse(buffer, {
            status: 200,
            headers: {
                "Content-Type": "image/jpeg",
                "Content-Disposition": 'attachment; filename="Neha_Chhillar_Resume.jpg"',
                "Cache-Control": "no-cache, no-store, must-revalidate",
            },
        });

    } catch (error) {
        console.error("Error generating resume image:", error);

        if (browser) {
            await browser.close();
        }

        return NextResponse.json(
            { error: "Failed to generate resume image" },
            { status: 500 }
        );
    }
}
