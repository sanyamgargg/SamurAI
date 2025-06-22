import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import NavLink from "../common/nav-link";
// No longer importing Sparkles as it's being removed
// import { Sparkles } from "lucide-react";

// No longer importing Badge as it's being removed
// import { Badge } from "../ui/badge";

export default function HeroSection() {
    return (
        <section className="flex items-center justify-center  mx-auto z-0 py-20 sm:py-32 lg:py-40 ">
        <div className="container flex items-center justify-center flex-col gap-4" >
       
            {/* The div containing the Sparkles and "Powered by AI" has been removed */}

            <h1 className="text-4xl text-center font-bold">Transform PDFs into concise summaries.</h1>
            <h2 className="text-lg text-muted-foreground text-center">Get a beautiful summary of your PDF in seconds.</h2>
            <Button variant={"link"} className="mt-4 items-center flex gap-2 text-white
             border-white border-2 ">
                <NavLink className="flex items-center gap-2" href="/#pricing">
                <span>Try Now</span>
                <ArrowRight className="animate-pulse"></ArrowRight>
                </NavLink>
                
            </Button>
        
        </div>
       </section>
    )
}