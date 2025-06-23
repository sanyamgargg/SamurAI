import BgGradient from '@/components/common/bggradient';
import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    // This top-level div acts as the relative container for the absolute BgGradient
    // 'min-h-screen' ensures it spans the full viewport height even with short content.
    <div className="relative w-full min-h-screen">
      {/* BgGradient is positioned absolutely within this div, covering it */}
      <BgGradient />

      {/*
        The section containing your SignIn component is placed *on top* of the gradient.
        We'll increase its z-index (e.g., z-10) to ensure it's visible above the gradient.
      */}
      <section className="relative flex items-center justify-center mx-auto z-10 py-10 sm:py-10 lg:py-10">
          <div className="container flex items-center justify-center flex-col gap-4">
              <div className="w-full max-w-md mx-auto">
                  <SignUp />
              </div>
          </div>
      </section>
    </div>
  );
}