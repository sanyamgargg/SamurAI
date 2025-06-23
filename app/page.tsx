import { Button } from "@/components/ui/button";
import HeroSection from "@/components/home/heroSection";
import Image from "next/image";
import { Pridi } from "next/font/google";
import BgGradient from "@/components/common/bggradient";
import HowItWorksSection from "@/components/home/howitworksSection";
import PricingSection from "@/components/home/pricingpage";

export default function Home() {
  return (
    <div className="relative w-full h-full">
      <BgGradient />
      {/* Added gap-y-16 to control space between sections */}
      <div className="flex flex-col">
        {/* Modify individual section files to reduce their py- values if desired */}
        <HeroSection />
        <HowItWorksSection />
        <PricingSection />
      </div>

    </div>
  );
}