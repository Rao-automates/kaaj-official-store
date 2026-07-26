"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative w-full min-h-[95vh] flex items-center justify-center overflow-hidden bg-kaaj-charcoal">
      {/* Background Image */}
      <Image
        src="/hero.png"
        alt="Kaaj Official - Premium Pakistani Womenswear"
        fill
        priority
        className="object-cover object-center opacity-60 mix-blend-luminosity"
        sizes="100vw"
      />

      {/* Grain texture overlay for editorial feel */}
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none mix-blend-overlay" />

      {/* Center radial gradient vignette for text readability */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-kaaj-charcoal/30 to-kaaj-charcoal/80" />
      <div className="absolute inset-0 bg-kaaj-charcoal/30" />

      {/* Top subtle border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kaaj-gold/30 to-transparent" />

      {/* Center Aligned Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center flex flex-col items-center mt-32 sm:mt-24">
        {/* Eyebrow */}
        <div className="flex flex-col items-center gap-3 mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-kaaj-gold drop-shadow-md">
            The Atelier Collection
          </span>
          <div className="h-8 w-px bg-kaaj-gold/50" />
        </div>

        {/* Headline */}
        <h1
          className="font-serif text-5xl sm:text-7xl lg:text-[6rem] text-kaaj-cream leading-[1.1] mb-8 animate-fade-up drop-shadow-2xl font-light tracking-tight"
          style={{ animationDelay: "0.2s" }}
        >
          Timeless Elegance,<br />
          <span className="italic text-kaaj-gold/90">Redefined.</span>
        </h1>

        {/* Sub */}
        <p
          className="font-sans text-xs sm:text-sm text-kaaj-cream/70 max-w-lg mx-auto leading-relaxed mb-12 animate-fade-up uppercase tracking-[0.2em]"
          style={{ animationDelay: "0.3s" }}
        >
          An exploration of heritage artistry through modern silhouettes. Discover our latest curation of exquisite luxury wear.
        </p>

        {/* Minimal CTA */}
        <div
          className="animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <Link 
            href="/shop"
            className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden bg-kaaj-cream hover:bg-kaaj-charcoal hover:border-kaaj-gold border border-transparent transition-all duration-500"
          >
            <span className="relative font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-kaaj-charcoal group-hover:text-kaaj-gold transition-colors duration-500">
              Explore the Collection
            </span>
          </Link>
        </div>
      </div>

      {/* Bottom fade into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-kaaj-cream to-transparent" />

      {/* Minimal Scroll cue */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-kaaj-charcoal/60 animate-bounce">
        <div className="h-12 w-px bg-gradient-to-b from-transparent via-kaaj-charcoal to-kaaj-charcoal" />
      </div>
    </section>
  );
}
