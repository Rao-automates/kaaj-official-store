"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative w-full min-h-[100dvh] flex items-center bg-transparent pt-20 pb-12 overflow-hidden">
      
      {/* Editorial Image Block (Right aligned, sharp edges) */}
      <div className="absolute top-0 right-0 w-[90%] md:w-[65%] h-[75vh] md:h-full z-0 transform-gpu transition-transform duration-1000 ease-out translate-y-0">
        <Image
          src="/hero.png"
          alt="KAAJ - Premium Pakistani Womenswear"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center grayscale opacity-80"
          sizes="(max-width: 768px) 100vw, 65vw"
        />
        {/* Edge fade for mobile readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#2E302A] md:hidden" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end min-h-[80dvh] md:min-h-[90dvh]">
        
        {/* Eyebrow */}
        <div className="animate-fade-up flex items-center gap-4 mb-6 md:mb-12" style={{ animationDelay: "0.1s" }}>
          <div className="h-px w-8 md:w-12 bg-kaaj-gold/70" />
          <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-kaaj-gold">
            The Atelier Collection
          </span>
        </div>

        {/* Massive Headline */}
        <h1 
          className="font-serif text-[clamp(5rem,20vw,16rem)] leading-[0.75] text-kaaj-charcoal animate-fade-up tracking-tighter -ml-1 md:-ml-4 drop-shadow-lg"
          style={{ animationDelay: "0.2s" }}
        >
          KAAJ
        </h1>
        
        {/* CTA & Subtext Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mt-12 md:mt-24 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <div className="md:col-span-6 lg:col-span-5">
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-charcoal/90 leading-loose">
              An exploration of heritage artistry through modern silhouettes. Discover our latest curation.
            </p>
          </div>
          
          <div className="md:col-span-6 lg:col-span-7 flex md:justify-end">
            <Link 
              href="/shop"
              className="group flex items-center gap-6 pb-4 border-b border-kaaj-charcoal/20 hover:border-kaaj-gold transition-colors duration-500 w-full md:w-auto"
            >
              <span className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-kaaj-charcoal group-hover:text-kaaj-gold transition-colors duration-500">
                Explore Collection
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-kaaj-charcoal group-hover:text-kaaj-gold transition-colors group-hover:translate-x-2 duration-500 transform-gpu will-change-transform">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
