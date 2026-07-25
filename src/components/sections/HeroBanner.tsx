"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function HeroBanner() {
  return (
    <section className="relative w-full min-h-[92vh] flex items-center overflow-hidden bg-kaaj-charcoal">
      {/* Background Image */}
      <Image
        src="/hero.png"
        alt="Kaaj Official - Premium Pakistani Womenswear"
        fill
        priority
        className="object-cover object-center opacity-60"
        sizes="100vw"
      />

      {/* Grain texture overlay */}
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none mix-blend-overlay" />

      {/* Gradient vignette for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-kaaj-charcoal/80 via-kaaj-charcoal/40 to-transparent" />

      {/* Gold horizontal rule — top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kaaj-gold/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-8 lg:px-16 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="h-px w-12 bg-kaaj-gold" />
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-gold drop-shadow-md">
              ATELIER EDITION
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-serif text-display-xl text-kaaj-cream leading-none mb-6 animate-fade-up drop-shadow-2xl"
            style={{ animationDelay: "0.2s" }}
          >
            Crafted for<br />
            <span className="text-kaaj-gold drop-shadow-xl">Her Grace.</span>
          </h1>

          {/* Sub */}
          <p
            className="font-sans text-sm md:text-base text-kaaj-cream/80 max-w-lg leading-relaxed mb-10 animate-fade-up"
            style={{ animationDelay: "0.35s" }}
          >
            Discover our signature Pret collection — where the art
            of Pakistani embroidery meets contemporary silhouettes.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <Link href="/shop">
              <Button variant="gold" size="lg">
                Shop the Collection
              </Button>
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="flex gap-10 mt-16 pt-8 border-t border-kaaj-cream/10 animate-fade-up"
            style={{ animationDelay: "0.7s" }}
          >
            {[
              { number: "BESPOKE", label: "Tailoring" },
              { number: "ARTISAN", label: "Embroidery" },
              { number: "PREMIUM", label: "Fabrics" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-2xl md:text-3xl text-kaaj-gold">{stat.number}</p>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-kaaj-cream/50 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-kaaj-cream to-transparent" />

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-kaaj-cream/40 animate-bounce">
        <span className="font-sans text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}
