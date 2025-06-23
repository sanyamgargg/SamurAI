"use client"
import UploadFormInput from "./uploadFormInput";
import {z} from "zod"

const schema = z.object({
    file: z.instanceof(File,{message: 'Invalid file '})
    .refine((file) => file.size <= 1024 * 1024 * 20,  'File size must be less than 20MB')
    .refine((file) => file.type.startsWith('application/pdf'), 'File must be  a PDF file.')
}) ;

export default function UploadForm() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
        const formData = new FormData(e.currentTarget) ;
        const file = formData.get('file') as File ;

        //validating the file
        const validatedFields = schema.safeParse({file}) ;

        if(!validatedFields.success){
            console.log(validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid file') ;
            return ;
        }
        //schema with zod
        //upload the file using uploadthing
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