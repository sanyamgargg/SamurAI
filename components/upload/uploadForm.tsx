"use client"
import { useUploadThing } from "@/utils/uploadthing";
import UploadFormInput from "./uploadFormInput";
import {z} from "zod"
import { useSonner } from "sonner";
import { title } from "process";
import {toast} from "sonner" ;

const schema = z.object({
    file: z.instanceof(File,{message: 'Invalid file '})
    .refine((file) => file.size <= 1024 * 1024 * 20,  'File size must be less than 20MB')
    .refine((file) => file.type.startsWith('application/pdf'), 'File must be  a PDF file.')
}) ;

export default function UploadForm() {

    
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
        console.log("Form submitted");
        const formData = new FormData(e.currentTarget) ;
        const file = formData.get('file') as File ;

        //validating the file
        const validatedFields = schema.safeParse({file}) ;

        if(!validatedFields.success){
            toast.error('Invalid file',{
                description: validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid file',
            }) ;
            return ;
        }

        toast.success('Uploading file...',{
            description: 'Please wait while we upload your file',
        }) ;
        
        //schema with zod
        //upload the file using uploadthing
        const resp = await startUpload([file]) ;
        if(!resp || resp.length === 0){
            toast.error('Upload failed',{
                description: 'Please try again',
            }) ;
            return ;
        }

        toast.success('File uploaded successfully',{
            description: 'File is being processed',
        }) ;
        

        //parse the pdf using langchain
        //summarize the pdf using AI
        //save the summary to the database
        //redirect to the [id] summary page
    }
    const isLoading = false;
    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
            <UploadFormInput handleSubmit={handleSubmit} isLoading={isLoading} />
        </div>
    )
}