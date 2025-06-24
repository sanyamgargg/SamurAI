import OpenAI from "openai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
const client = new OpenAI(
    {
        apiKey: process.env.OPENAI_API_KEY,
    }
);

export async function generateSummary(pdfText: string) {
    try{
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                 content: SUMMARY_SYSTEM_PROMPT,
                },
                {
                    role:"user",
                    content:`Transform this document into an engaging, easy to read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`
                }
                
            ],
            temperature:0.7,
            max_tokens:1500,
        
        });
    
        return completion.choices[0].message.content ;
    }catch(error:any){
        
        if(error.status === 429){
            throw new Error('Rate limit exceeded. Please try again later.') ;
        }
        throw new Error('Failed to generate summary. Please try again.') ;
    }
}

