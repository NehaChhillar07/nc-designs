import { NextRequest, NextResponse } from "next/server";
import { readFile, stat } from "fs/promises";
import path from "path";

export async function GET(request: NextRequest) {
    try {
        const pdfPath = path.join(process.cwd(), "public", "Neha_Chhillar_Resume.pdf");
        const [pdfBuffer, fileStat] = await Promise.all([
            readFile(pdfPath),
            stat(pdfPath),
        ]);

        const inline = request.nextUrl.searchParams.get("inline") === "1";
        const etag = `"${fileStat.size}-${fileStat.mtimeMs}"`;

        if (request.headers.get("if-none-match") === etag) {
            return new NextResponse(null, { status: 304 });
        }

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="Neha_Chhillar_Resume.pdf"`,
                "Cache-Control": "no-cache, must-revalidate",
                ETag: etag,
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
