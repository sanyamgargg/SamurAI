"use server";

import { getDBConnection } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

export async function deleteSummaryAction({summaryId}: {summaryId: string}) {
    try{
        const sql = await getDBConnection();
    const user = await currentUser();
    if(!user?.id){
        return {
            success: false
        }
    }
    const result = await sql`
    DELETE FROM pdf_summaries WHERE id = ${summaryId} AND user_id = ${user?.id} RETURNING id`;
    
    if(result.length > 0){
        revalidatePath("/dashboard");
        return {
            success: true
        }
    }
    return {
        success: false
    
    }}catch(error){
        console.error(error);
        return {
            success: false
        }
    }
}