import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DeleteButton from "./delete-button";
import Link from "next/link";
import { FileText } from "lucide-react";
import { cn, formatFileName } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const SummaryStatus = ({status}: {status: string}) => {
    return (
        <span className={cn(
            "px-2 py-1 text-xs rounded-full font-medium capitalize",
            status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
        )}>
            {status}
        </span>
    )
}

const SummaryHeader = ({
    fileUrl,
    title,
    createdAt,
}: {
    fileUrl: string;
    title: string;
    createdAt: string;
}) => {
    return (
        <div className="flex items-center gap-1 sm:gap-2 w-full">
            <FileText className="w-6 h-6 text-white" />
            <div>
            <h3 className="text-base xl:text-lg font-semibold text-shadow-white truncate ">{title || formatFileName(fileUrl)}</h3>
            
            <p className="text-sm text-gray-400">
                {formatDistanceToNow(new Date(createdAt), {addSuffix: true})}</p>
            </div>
            
        </div>
    )
}


export default function SummaryCard({summary}: {summary: any}) {
    return (
        <div>
            <Card className="relative h-full">
                
                    <div className="absolute top-2 right-2">
                    <DeleteButton summaryId={summary.id} />
                    </div>
                        <Link href={`/summaries/${summary.id}`} className="block p-4 sm:p-6">
                        <div className="flex flex-col gap-3">
                        
                            <SummaryHeader fileUrl={summary.fileUrl} title={summary.title} createdAt={summary.created_at} />
                            <p className="text-sm line-clamp-2 sm:text-base pl-2">{summary.summary_text}</p>
                            <div className="flex justify-between items-center mt-2 sm:mt-4">
                            <SummaryStatus status={summary.status} />
                            </div>
                        </div>
                            

                        
                    </Link>
                     
                
            </Card> 
        </div>
    )
}   