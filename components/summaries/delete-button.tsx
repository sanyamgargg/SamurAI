"use client";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { deleteSummaryAction } from "@/actions/summary-actions";
import { useTransition } from "react";


export default function DeleteButton({summaryId}: {summaryId: string}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
       startTransition(async () => {
        const result = await deleteSummaryAction({summaryId});
        if(result.success){
            toast.success("Summary deleted successfully");
        }else{
            toast.error("Failed to delete summary");
        }   
        setIsOpen(false);
    });
    }
    return (

        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild><Button variant={'ghost'} size="icon" className="text-gray-400 bg-transparent hover:text-white hover:bg-transparent ">
                            <Trash2 className="w-3 h-3" />
                        </Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Delete Summary</DialogTitle>
                <DialogDescription>
                    Are you sure you want to delete this summary? This action cannot be undone.
                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant={'outline'} onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button variant={'destructive'} className="bg-white text-gray-800 hover:bg-gray-100" onClick={handleDelete}>{isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}</Button>
                </DialogFooter> 
            </DialogContent>
            </Dialog>
            
        </div>
    )
}           