"use client"
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface UploadFormInputProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
}

export default function UploadFormInput({handleSubmit}:UploadFormInputProps) {
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                <div className="flex justify-end items-center gap-1.5">
                <Input type="file" id="file" name="file" accept=".pdf" required className="" />
                <Button type="submit" >Upload</Button>
                </div>
            </form>
    )
}