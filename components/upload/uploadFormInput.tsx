"use client"
import { forwardRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadFormInputProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
}
const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(({handleSubmit, isLoading}, ref) => {
    return (
        <form ref={ref} className="flex flex-col gap-4" onSubmit={handleSubmit}>

                <div className="flex justify-end items-center gap-1.5">
                <Input type="file" id="file" name="file" accept=".pdf" required className={cn(isLoading && 'opacity-50 cursor-not-allowed')} disabled={isLoading} />
                <Button type="submit" disabled={isLoading}>{isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</> : 'Upload'}</Button>
                </div>
            </form>
    )
})
UploadFormInput.displayName = 'UploadFormInput' ;

export default UploadFormInput;