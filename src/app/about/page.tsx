import Image from "next/image";
import React from "react";

export const metadata = {
  title: "Story — KAAJ",
  description: "Fifteen years of quiet, hard-earned skill. The story behind KAAJ by Mehwish Imran.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] text-[#141413] pt-24 pb-20 lg:pt-32 lg:pb-32 selection:bg-black selection:text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-24">

        {/* Left Column - Image */}
        <div className="w-full lg:w-5/12 flex-shrink-0 animate-fade-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
          <div className="relative w-full aspect-[4/5] bg-[#EAE8E3]">
            <Image
              src="/images/about-mehwish.webp"
              alt="Mehwish Imran - Founder of KAAJ"
              fill
              className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
              quality={100}
              unoptimized
            />
          </div>
        </div>

        {/* Right Column - Typography & Story */}
        <div className="w-full lg:w-6/12 flex flex-col justify-center animate-fade-up" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
          <h1 className="font-sans text-4xl lg:text-6xl tracking-tighter font-medium mb-10 lg:mb-16 uppercase">
            Our Story
          </h1>

          <div className="space-y-6 font-sans text-[15px] lg:text-[17px] leading-relaxed text-[#141413]/80 font-light max-w-2xl">
            <p>
              Fifteen years ago, our founder wasn't running a brand. She was a housewife with a single sewing machine and a lot of determination.
            </p>
            <p>
              No formal training. No investor. No shortcut. Just real skill, built the hard way, order by order, outfit by outfit, for fifteen years straight.
            </p>
            <p>
              It started with that one sewing machine, at home. Stitching for people nearby. Learning as she went. Word spread, the way it does when the work is genuinely good, and slowly, what began on that single machine grew into her own small shop, trusted by everyone who found her, one customer at a time.
            </p>
            <p>
              That shop is still open today.
            </p>
            <p>
              Kaaj is what happens when that same craftsmanship finally goes online.
            </p>
            <p>
              We're a mother and son building this together. She brings fifteen years of hands-on mastery, every cut, every stitch, every finish she's perfected since 2012. I bring the tools to get her work in front of more people than a single shop ever could.
            </p>
            <p>
              Nothing about the quality has changed. Only where you can find it.
            </p>
            <p>
              This isn't a startup with an idea. It's fifteen years of quiet, hard-earned skill, finally getting the platform it always deserved.
            </p>
            <p>
              Every piece you order from Kaaj is made the same way it always has been, by hand, with care, by someone who's spent a decade and a half getting it right.
            </p>
            <p>
              Thank you for being part of the next chapter.
            </p>
          </div>

          <div className="mt-16 pt-8 border-t border-[#141413]/10">
            <p className="font-sans text-lg lg:text-xl font-medium tracking-tight">
              K A A J, by Mehwish Imran
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
