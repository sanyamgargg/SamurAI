import { BrainCircuitIcon, FileCheck2, Upload } from "lucide-react";

type Step = {
    Icon: React.ReactNode;
    title: string;
    description: string;
}

const steps: Step[] = [
    {
        Icon: <Upload size={40} />,
        title: "Upload your PDF",
        description: "Upload your PDF file to the platform.",
    },
    {
        Icon: <BrainCircuitIcon size={40} />,
        title: "AI analysis",
        description: "Our advanced AI analyzes the content of your PDF",
    },
    {
        Icon: <FileCheck2 size={40} />,
        title: "Get Summary",
        description: "Get a beautiful summary of your PDF in seconds.",
    },
]


export default function HowItWorksSection() {
    return (
        <section className="flex items-center justify-center mx-auto z-0 py-20 sm:py-32 lg:py-40">
            <div className="container flex flex-col items-center justify-center gap-4" >

               <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">How it Works.</h2>
                <h3 className="text-lg text-muted-foreground">Transform any pdf into an easy-to-digest summary in three simple steps.</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
                   {steps.map((step,idx) => (
                    <StepItem key={idx} {...step} />
                   ))}
               </div>

            </div>
        </section>
    )
}

function StepItem({Icon, title, description}: Step) {
    return (
        // Added transition, hover:scale, hover:shadow, and cursor-pointer for the hover effect
        <div className="flex flex-col items-center justify-center gap-4 p-4 text-center
                        transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer rounded-lg">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
                <span className="text-primary">{Icon}</span>
            </div>
            <h4 className="text-lg font-bold">{title}</h4>
            <p className="text-muted-foreground text-xs max-w-xs">{description}</p>
        </div>
    )
}