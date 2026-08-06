"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-kaaj-cream">
      {/* Background Image - Full Bleed */}
      <Image
        src="/hero.png"
        alt="KAAJ - Premium Pakistani Womenswear"
        fill
        priority
        fetchPriority="high"
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Extreme Minimal Vignette for Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

      {/* Bottom Aligned Content - Editorial Style */}
      <div className="absolute bottom-16 sm:bottom-24 left-0 w-full px-6 sm:px-12 flex flex-col items-center sm:items-start text-center sm:text-left z-10">
        
        {/* Headline */}
        <h1
          className="font-serif text-[18vw] sm:text-[12vw] leading-[0.8] text-[#F8F5F0] mb-4 sm:mb-6 animate-fade-up font-light tracking-tighter"
          style={{ animationDelay: "0.1s" }}
        >
          Volume <span className="italic">II</span>
        </h1>

        {/* Minimal CTA */}
        <div
          className="animate-fade-up flex items-center gap-6"
          style={{ animationDelay: "0.2s" }}
        >
          <Link 
            href="/shop"
            className="group flex items-center gap-4 font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#F8F5F0]"
          >
            <span className="relative pb-1">
              Explore Collection
              <span className="absolute bottom-0 left-0 w-full h-px bg-[#F8F5F0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="group-hover:translate-x-2 transition-transform duration-500">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
