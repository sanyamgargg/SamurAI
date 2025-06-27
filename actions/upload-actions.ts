"use server";

import { fetchAndExtractText } from "@/lib/langchain";
import { generateSummaryGemini } from "@/lib/geminiai";
import { auth } from "@clerk/nextjs/server";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { getDBConnection } from "@/lib/db";

type UploadResponse = {
    serverData: {
        userId: string;
        file: {
            url: string;
            name: string;
        };
    };
};

// Define a type for the arguments expected by savedPdfSummary
type SavedPdfSummaryArgs = {
    userId: string;
    fileUrl: string;
    summary: string;
    title: string;
    fileName: string;
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
                    error: "Failed to generate summary: Summary content is empty",
                    data: null,
                };
            }

            console.log("Generated Summary:", summary);

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
                error: `Failed to generate summary: ${err.message}`,
                data: null,
            };
        }
    } catch (error: unknown) {
        const err = error as Error;
        console.error("Error extracting text from PDF:", err.message);
        return {
            success: false,
            error: `Failed to extract text from PDF: ${err.message}`,
            data: null,
        };
    }
}

// Modified to accept a single object argument
async function savedPdfSummary({ userId, fileUrl, summary, title, fileName }: SavedPdfSummaryArgs){
   try {
       const sql = await getDBConnection() ;
       // Ensure your table columns match these names and types
       await sql`INSERT INTO pdf_summaries (user_id, original_file_url, summary_text, title, file_name) VALUES (${userId}, ${fileUrl}, ${summary}, ${title}, ${fileName})` ;
       console.log("Successfully inserted PDF summary into DB for user:", userId);
   } catch (error: unknown) {
       const err = error as Error;
       console.error("Error saving PDF summary to DB:", err.message);
       throw new Error(`Database error: ${err.message}`); // Re-throw the error with a more descriptive message
   }
}


// Modified to accept an object for arguments
export async function saveSummaryToDB({ pdfUrl, summary, pdfName }: { pdfUrl: string, summary: string, pdfName: string }){
    try{
        const { userId } = await auth() ;
        if(!userId){
            return {
                success: false,
                error: 'User not authenticated',
            }
        }

        const formattedTitle = formatFileNameAsTitle(pdfName); // Use pdfName to format the title

        await savedPdfSummary({
            userId,
            fileUrl: pdfUrl,
            summary,
            fileName: pdfName,
            title: formattedTitle, // Pass the formatted title
        }) ;

        return {
            success: true,
            message: 'Summary saved to db successfully',
            data: {
                summary,
                title: formattedTitle, // Return the formatted title
                // Consider returning an ID if your insert operation returns one, e.g., for redirection
                // id: savedSummary.id,
            }
        }

    }catch(error: unknown){
        const err = error as Error;
        console.error('Error in saveSummaryToDB:', err.message) ;
        return {
            success: false,
            error: `Failed to save PDF summary: ${err.message}`,
        }
    }
}