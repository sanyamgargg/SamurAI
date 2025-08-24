import BgGradient from "@/components/common/bggradient";
import { Button } from "@/components/ui/button";
import  Link  from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import SummaryCard from "@/components/summaries/summary-card";
import { getSummaries } from "@/lib/summaries";
import { currentUser } from "@clerk/nextjs/server";
import EmptySummaries from "@/components/summaries/empty-summaries";

export default async function DashboardPage() {
    const user  = await currentUser();
    const userId = user?.id;
    if (!userId) {
        redirect("/sign-in");
    }
    const uploadLimit = 5;
    const summaries = await getSummaries(userId);
    return (
        <main className="min-h-screen">
            <BgGradient />
            <div className="container mx-auto flex flex-col items-center  h-screen gap-2 py-20">
                <div className="flex gap-4 mb-10 justify-between w-full">
                <div>
                <h1 className="text-4xl font-bold">Your Summaries</h1>
                <p className="text-lg text-muted-foreground">Transform your PDFs into concise summaries.</p>
                </div>

                
                    <Button variant={"link"} className="mt-4 items-center flex gap-2 text-white border-white border-2">
                        <Link className="flex items-center gap-2" href="/upload">
                        <Plus className="animate-pulse border-2 rounded-full"></Plus>
                            <span className="text-white p-2 ">New Summary</span>
                            
                        </Link>
                    </Button>   
                
                
                </div>
                    {summaries.length === uploadLimit && (
                      <div className="mb-6 w-full">
                      <div className = "bg-grey-50 text-red-500 p-2 rounded-md  hover:text-white border-2">
                          <p className="text-sm text-red-400 gap-2 flex items-center justify-center" >You have reached limit of 5 uploads on the Basic Plan.
                              <Link href="/#pricing" className="text-red-400 hover:underline flex items-center gap-2 ">Click here to Upgrade to pro <ArrowRight className=" w-4 h-4 inline-block border-2 rounded-full"></ArrowRight></Link>
                              
                          </p>
                      </div>
                </div>
                )}
                {summaries.length === 0 ? <EmptySummaries /> : (
                <div className="grid grid-cols-1  sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0 gap-4 w-full">
                    {summaries.map((summary, index) => (
                        <SummaryCard key={index} summary={summary}/>
                    ))}     

                    </div>
                )}
            
            </div>
        </main>
    )
}