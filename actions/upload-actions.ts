"use server";

import { fetchAndExtractText } from "@/lib/langchain";
import { generateSummaryGemini } from "@/lib/geminiai";

type UploadResponse = {
    serverData: {
        userId: string;
        file: {
            url: string;
            name: string;
        };
    };
};

export async function generateSummary(uploadResponse: UploadResponse[]) {
    if (!uploadResponse || uploadResponse.length === 0) {
        return {
            success: false,
            error: "No file uploaded",
            data: null,
        };
    }

    const {
        serverData: {
            userId,
            file: { url: pdfUrl, name: pdfName },
        },
    } = uploadResponse[0];

    if (!pdfUrl || !pdfName) {
        return {
            success: false,
            error: "Invalid file information",
            data: null,
        };
    }

    try {
        const pdfText = await fetchAndExtractText(pdfUrl);
        console.log("PDF text snippet:", pdfText?.slice(0, 500));

        try {
            const summary = await generateSummaryGemini(pdfText);

            if (!summary) {
                return {
                    success: false,
                    error: "Failed to generate summary",
                    data: null,
                };
            }

            console.log("Summary:", summary);

            return {
                success: true,
                message: "Summary generated successfully",
                data: { summary },
            };
        } catch (error: unknown) {
            const err = error as Error;
            console.error("Error while calling generateSummaryGemini:", err.message);
            return {
                success: false,
                error: "Failed to generate summary",
                data: null,
            };
        }
    } catch (error: unknown) {
        const err = error as Error;
        console.error("Error extracting text from PDF:", err.message);
        return {
            success: false,
            error: "Failed to extract text",
            data: null,
        };
    }
}
