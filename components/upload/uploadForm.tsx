"use client"
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./uploadFormInput";
import {z} from "zod"
import { useSonner } from "sonner"; // This import seems unused, consider removing if not used
import { title } from "process"; // This import seems unused and potentially problematic, consider removing
import {toast} from "sonner" ;
import { generateSummary , saveSummaryToDB} from "@/actions/upload-actions";
import { useRef, useState } from "react";

const schema = z.object({
    file: z.instanceof(File,{message: 'Invalid file '})
    .refine((file) => file.size <= 1024 * 1024 * 20,  'File size must be less than 20MB')
    .refine((file) => file.type.startsWith('application/pdf'), 'File must be  a PDF file.')
}) ;

export default function UploadForm() {
    const formRef = useRef<HTMLFormElement>(null) ;
    const [isLoading, setIsLoading] = useState(false) ;

    const {startUpload, isUploading} = useUploadThing('pdfUploader',{
        onClientUploadComplete: (res) => {
            console.log('Upload complete', res) ;
        },
        onUploadError: (error: Error) => {
            console.log('Upload error', error)
            toast.error('Upload failed', {
                description: error.message,
            }) ;
            return ;
        }
    }) ;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true) ; // Set loading true at the beginning of the submission

        try{
            const formData = new FormData(e.currentTarget) ;
            const file = formData.get('file') as File ;

            // Validating the file
            const validatedFields = schema.safeParse({file}) ;

            if(!validatedFields.success){
                toast.error('Invalid file',{
                    description: validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid file',
                }) ;
                setIsLoading(false) ;
                return ;
            }

            toast.success('Uploading file...',{
                description: 'Please wait while we upload your file',
            }) ;

            // Upload the file using uploadthing
            const resp = await startUpload([file]) ;
            if(!resp || resp.length === 0){
                toast.error('Upload failed',{
                    description: 'Please try again',
                }) ;
                setIsLoading(false) ;
                return ;
            }

            toast.success('File uploaded successfully',{
                description: 'File is being processed',
            }) ;

            // Parse the pdf using langchain and generate summary
            const result = await generateSummary(resp) ;
            const {data = null, message = null, error = null} = result || {}; // Destructure error from the result

            if(error){ // Handle error from generateSummary
                toast.error('Summary generation failed', {
                    description: error,
                });
                setIsLoading(false);
                return;
            }

            if(data && data.summary){ // Check for data and summary
                

                // The pdfName is available from resp[0].serverData.file.name
                const pdfUrl = resp[0].serverData.file.url;
                const pdfName = resp[0].serverData.file.name;
                const summaryText = data.summary;

                const storeResult = await saveSummaryToDB({
                    pdfUrl,
                    summary: summaryText,
                    pdfName,
                }) ;

                if(storeResult.success){
                    toast.success('Summary generated successfully',{
                        description: 'Redirecting to summary page...',
                    }) ;
                    formRef.current?.reset() ;
                    setIsLoading(false) ;
                    router.push(`/summary/${storeResult.data.id}`) ; // Uncomment when router is available and data.id is returned
                } else {
                    console.log('Failed to save summary to DB', storeResult) ;
                    toast.error('Failed to save summary to DB',{
                        description: storeResult.error, // Display the error from saveSummaryToDB
                    }) ;
                    formRef.current?.reset() ;
                    setIsLoading(false) ;
                }
            } else { // Handle cases where summary generation succeeded but data.summary is null/undefined
                toast.error('Summary not available', {
                    description: message || 'An unexpected error occurred during summary generation.',
                });
                setIsLoading(false);
            }
        } catch(error){
            console.error('Error submitting form', error) ;
            toast.error('An unexpected error occurred',{
                description: error instanceof Error ? error.message : 'Please try again',
            }) ;
            formRef.current?.reset() ;
            setIsLoading(false) ;
        }
        console.log("Form submission process finished");
    }

    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
            <UploadFormInput  ref = {formRef} handleSubmit={handleSubmit} isLoading={isLoading || isUploading} />
        </div>
    )
}