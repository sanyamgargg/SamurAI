
import { FileText } from 'lucide-react';
import { Button } from "../ui/button";
import NavLink from "./nav-link";
import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/nextjs';

export default function Header() {
    
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center py-4 lg:px-8 px mx-auto">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo/Title on the left */}
        <NavLink href="/">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-primary hover:rotate-12 transition-transform duration-300" />
            samurAI
          </h1>
        </NavLink>

        {/* Navigation items on the right */}
        <div className="flex items-center gap-6"> {/* Use a flex container for the right-aligned items */}
            <div className="flex items-center gap-6">
                  <SignedOut>
                    <NavLink href="/#pricing">
                      <h1 className="text-xl font-medium">Pricing</h1>
                    </NavLink>
                  </SignedOut>
                  <SignedIn>
                    <NavLink href="/dashboard">
                      <h1 className="text-xl font-medium"> Summaries</h1>
                    </NavLink>
                  </SignedIn>
           
          
            </div>
            <div className="flex items-center gap-6">
                <SignedOut>
                  <NavLink href="/#sign-in">
                  <h1 className="text-xl font-medium">Sign In</h1>
                  </NavLink>
                </SignedOut>
                <SignedIn>
                    <div>
                    <NavLink href="/upload">
                      <h1 className="text-xl font-medium">Upload Pdf</h1>
                    </NavLink>
                    <div className="flex items-center gap-2">
                    <div >Pro</div>
                    <SignedIn>
                      <UserButton/>
                    </SignedIn>
                  </div>
                            
                  </div>
                </SignedIn>
            
            
          
            </div>
          
        </div>
      </div>
    </nav>
  );
}