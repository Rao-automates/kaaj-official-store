"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────────
 *  KAAJ — Brand Story / Hero Landing
 *
 *  Mobile-first. Optimized for low-end processors.
 *  Silk-textured KAAJ letterforms + hero backdrop + CTA.
 *  Uses Inter (logo font) — no serif.
 * ───────────────────────────────────────────────────────────── */


export default function BrandStory() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isInstagram, setIsInstagram] = useState(false);

  useEffect(() => {
    // Detect Instagram browser
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (ua.indexOf("Instagram") > -1) {
      setIsInstagram(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setHasScrolled(true);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-[100dvh] hidden sm:flex flex-col items-center justify-center bg-[#FAF9F6] overflow-hidden">

      {/* ==============================================================
       *  DESKTOP LAYOUT (Massive Centered Text)
       * ============================================================== */}
      <div className="absolute inset-0 hidden sm:flex items-center justify-start z-[2] px-8 lg:px-24">
        {/* Desktop Image & Overlays */}
        <div className="absolute inset-0 z-0 hero-zoom">
          <Image
            src="/images/hero-slide-1.webp"
            alt="KAAJ — Premium Pakistani Womenswear"
            fill
            priority
            fetchPriority="high"
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        {/* Soft cream gradient on the left to frame the editorial insert */}
        <div className="absolute inset-y-0 left-0 z-0 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/80 to-transparent w-[65%]" />

        {/* Editorial Floating Layout - Masterpiece */}
        <div
           className="relative z-10 ml-0 lg:ml-12 animate-fade-up"
           style={{ animationDelay: "0.2s", animationDuration: "1.2s", animationFillMode: "both" }}
        >
          <div className="relative group flex items-stretch">
            
            {/* The Video Pillar */}
            <div className="relative w-[300px] h-[480px] lg:w-[380px] lg:h-[620px] overflow-hidden rounded-none shadow-2xl">
              {isInstagram ? (
                <Image
                  src="/images/hero-slide-1.webp"
                  alt="KAAJ Cinematic"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
              ) : (
                <video
                  src="/videos/combo.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              )}
              {/* Subtle inner border */}
              <div className="absolute inset-0 border border-black/5 pointer-events-none z-10" />
              
              {/* Dark gradient at bottom for button visibility */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10" />
              
              {/* Floating Glassmorphic Button inside Video */}
              <div className="absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 w-full px-6 lg:px-10 z-20">
                <Link
                  href="/shop"
                  className="group flex items-center justify-between w-full py-4 px-6 border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-500"
                >
                  <span className="font-sans text-[10px] lg:text-[11px] text-white uppercase tracking-[0.25em] font-medium">
                    Explore Collection
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" className="group-hover:translate-x-1 transition-transform duration-500">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Cute Geometric Editorial Spine */}
            <div className="flex flex-col items-center justify-center gap-6 py-6 px-6 lg:px-10">
               <div className="w-[1px] h-12 lg:h-24 bg-kaaj-charcoal/20" />
               <div className="flex flex-col gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-kaaj-olive/90" />
                 <div className="w-1 h-1 rounded-full bg-kaaj-charcoal/30 mx-auto" />
                 <div className="w-1.5 h-1.5 rounded-full bg-kaaj-olive/90" />
               </div>
               <div className="w-[1px] h-12 lg:h-24 bg-kaaj-charcoal/20" />
            </div>

          </div>
        </div>
        {/* Scroll indicator (Desktop) */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-[11] flex flex-col items-center gap-3 transform-gpu transition-opacity duration-500 ${hasScrolled ? 'opacity-0' : 'opacity-100'}`}
        >
          <div className="w-px h-12 bg-gradient-to-b from-[#141413]/20 to-transparent animate-scroll-pulse" />
        </div>
      </div>

      {/* ==============================================================
       *  MOBILE LAYOUT (Cinematic Video) - MINIMALIST LUXURY
       * ============================================================== */}
      <div className="absolute inset-0 flex sm:hidden flex-col items-center justify-center bg-[#141413] overflow-hidden z-[2] group">
        
        {/* Cinematic Video Background */}
        <div className="absolute inset-0 z-0 bg-[#141413]">
          <div className="absolute inset-0 z-0 pointer-events-none">
            {isInstagram ? (
              <Image
                src="/images/hero-slide-1.webp"
                alt="KAAJ Cinematic"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />
            ) : (
              <video
                src="/videos/combo.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              >
                <source src="/videos/combo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
          {/* Moody Dark Gradients to ensure text readability */}
          <div 
            className="absolute inset-0 pointer-events-none" 
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.65) 100%)'
            }}
          />
        </div>

        {/* Bottom CTA Area — Refined Luxury Floating Text */}
        <div
          className="absolute bottom-12 flex flex-col items-center z-20 w-full animate-fade-up"
          style={{ animationDelay: "1.2s", animationFillMode: "both" }}
        >
          <Link href="/shop" className="group flex items-center justify-between w-[85%] max-w-[320px] py-4 px-6 border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-500">
            <span className="font-sans text-[10px] text-white uppercase tracking-[0.25em] font-medium">
              Explore Collection
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" className="group-hover:translate-x-1 transition-transform duration-500">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-[11] flex flex-col items-center gap-3 transform-gpu transition-opacity duration-500 ${hasScrolled ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent animate-scroll-pulse" />
      </div>

    </section>
  );
}
