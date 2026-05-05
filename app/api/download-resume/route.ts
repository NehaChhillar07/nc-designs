import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
    try {
        // Serve static PDF from public folder
        const pdfPath = path.join(process.cwd(), "public", "Neha_Chhillar_Resume.pdf");
        const pdfBuffer = await readFile(pdfPath);

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": 'attachment; filename="Neha_Chhillar_Resume.pdf"',
                "Cache-Control": "public, max-age=3600",
            },
        });

    } catch (error) {
        console.error("Error serving resume PDF:", error);

        return NextResponse.json(
            { error: "Resume PDF not found. Please contact for a copy." },
            { status: 500 }
        );
    }
}
