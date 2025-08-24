import { getSummaryById } from "@/lib/summaries";
import { notFound } from "next/navigation";
import BgGradient from "@/components/common/bggradient";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { formatText } from "@/utils/format-text";
import { formatDistanceToNow } from "date-fns";


import DownloadSummaryButton from "@/components/summaries/dowload-button";

export default async function SummaryPage({params}: {params: Promise<{id: string}>}){ 
    
    const {id} = await params;
    const summaryArray = await getSummaryById(id);

    // If no summary is found or the array is empty, return notFound
    if (!summaryArray || summaryArray.length === 0) {
        return notFound();
    }

    // Access the first (and likely only) summary object from the array
    const summary = summaryArray[0];
    
    // Format the summary text for display, handling Markdown or other formatting
    const formattedText = formatText(summary.summary_text);
    
    // Log the title to the console for debugging
    console.log(summary.title);
    
    // Format the creation date to be relative (e.g., "5 minutes ago")
    const createdAt = formatDistanceToNow(new Date(summary.created_at), {addSuffix: true});
   
    return(
        <div className="relative isolate min-h-screen bg-linear-to-b from-gray-900 via-gray-950 to-gray-900">
            {/* Background gradient for visual appeal */}
            <BgGradient />  
            
            <div className="container mx-auto flex flex-col gap-4">
                <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
                    {/* Flex container to place title and button at opposite ends */}
                    <div className="flex justify-between items-center w-full mb-4">
                        {/* Container for the title and creation date */}
                        <div className="flex flex-col">
                            <h3 className="text-2xl font-bold text-white ">{summary.title}</h3>
                            <div className="text-gray-400 text-xs ml-1">{createdAt}</div>
                        </div>
                        
                        {/* Download Button */}
                        <DownloadSummaryButton 
                        title={summary.title}
                        summary={formattedText}
                        fileName={summary.title}
                        createdAt={createdAt}
                        />
                    </div>
                        
                    {/* Card to display the formatted summary text */}
                    <Card>
                        <div className="text-gray-400 text-sm p-4">
                            {/* Render the formatted text, assuming it might contain HTML */}
                            <div dangerouslySetInnerHTML={{__html: formattedText}} />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
