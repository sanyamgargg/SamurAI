import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateSummaryGemini(pdfText: string) {
  try {
    const model = ai.getGenerativeModel({
      model: "gemini-1.5-flash-8b",
    });

    const safeText = pdfText.length > 8000 ? pdfText.slice(0, 8000) : pdfText;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: SUMMARY_SYSTEM_PROMPT },
            {
              text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${safeText}`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

    const response = await result.response;

    if (!response) {
      throw new Error("Failed to generate summary");
    }

    return response.text();
  } catch (error: unknown) {
    console.error("Error generating summary with gemini", error);
    throw error;
  }
}
