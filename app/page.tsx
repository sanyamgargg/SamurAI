import { Button } from "@/components/ui/button";
import HeroSection from "@/components/home/heroSection";
import Image from "next/image";
import { Pridi } from "next/font/google";
import BgGradient from "@/components/common/bggradient";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
      <HeroSection />
      </div>
      
      {/* <DemoSection /> */}
      {/* <PricingSection /> */}
      {/* <CTASection /> */}

    </div>
  ) ;
}
