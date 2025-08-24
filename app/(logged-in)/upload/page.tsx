import BgGradient from "@/components/common/bggradient";
import UploadForm from "@/components/upload/uploadForm";
import UploadHeader from "@/components/upload/uploadHeader";



export const maxDuration = 60;
export default function Page() {
    return (
        <section className="min-h-screen py-20">
            <BgGradient />
            <div className="flex flex-col items-center justify-center gap-10">
            <UploadHeader />
            <UploadForm />
            </div>
            
        </section>
    )
}