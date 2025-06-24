"use server" ;

import { fetchAndExtractText } from "@/lib/langchain";
import { generateSummary as generateSummaryOpenAI } from "@/lib/openai";

    export async function generateSummary(uploadResponse : [{
    serverData:{
        userId: string ;
        file: {
            url: string ;
            name: string ;
        };
    }
}]) {
    if(!uploadResponse){
        return {
            success: false,
            error: 'No file uploaded',
            data: null,
        }
    }

    const {serverData: {
            userId, 
            file : {url:pdfUrl,name:pdfName}
            }
        } = uploadResponse[0] ;
    
    if(!pdfUrl || !pdfName){
        return {
            success: false,
            error: 'No file uploaded',
            data: null,
        }
    }

    try{
        const pdfText = await fetchAndExtractText(pdfUrl) ;
        console.log('PDF text', pdfText) ;

        let summary ;

        try{
            summary = await generateSummaryOpenAI(pdfText) ;
            console.log('Summary', summary) ;
        }catch(error){
            console.error('Error generating summary', error) ;
            return {
                success: false,
            }
            // call gemini api here
        }

        if(!summary){
            return {
                success: false,
                error: 'Failed to generate summary',
                data: null,
            }
        }

        return {
            success: true,
            message: 'Summary generated successfully',
            data: {
                summary,
            }
        }

    }catch(error){
        console.error('Error parsing PDF', error) ;
        return {
            success: false,
        }
    }
    
    
}