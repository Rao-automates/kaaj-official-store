"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function BrandStory() {
  const [isInstagram, setIsInstagram] = useState(false);

  useEffect(() => {
    // Detect Instagram browser to fallback to images if autoplay is blocked
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (ua.indexOf("Instagram") > -1) {
      setIsInstagram(true);
    }
  }, []);

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center bg-[#FAF9F6] overflow-hidden pt-20 pb-12 lg:py-0">
      
      {/* DESKTOP LAYOUT (The Pillar & Typography Anchor) */}
      <div className="hidden lg:flex w-full h-[100dvh] max-w-8xl mx-auto px-8 xl:px-16 items-center justify-between">
        
        {/* Left: Typography Anchor */}
        <div className="flex-1 flex flex-col items-start pr-12 animate-fade-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
          <h1 className="font-sans text-[clamp(4rem,10vw,12rem)] leading-[0.8] tracking-tighter text-kaaj-charcoal -ml-2 mb-8">
            K A A J
          </h1>
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-kaaj-charcoal/60 mb-12 max-w-sm leading-relaxed">
            Premium womenswear rooted in Pakistani craft. Discover the archives.
          </p>
          <Link
            href="/shop"
            className="group flex items-center justify-between py-4 px-8 border border-kaaj-charcoal hover:bg-kaaj-charcoal hover:text-white transition-all duration-500 w-64"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-medium">
              Explore Collection
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="group-hover:translate-x-1 transition-transform duration-500">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Right: The Video Pillar (Native Portrait Aspect Ratio) */}
        <div className="relative w-[450px] xl:w-[500px] aspect-[4/5] overflow-hidden animate-fade-up shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
          {isInstagram ? (
            <Image
              src="/images/hero-desktop-bg.webp"
              alt="KAAJ Cinematic"
              fill
              className="object-cover"
              priority
              fetchPriority="high"
            />
          ) : (
            <video
              poster="/images/hero-desktop-bg.webp"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            >
              <source src="/videos/combo.mp4" type="video/mp4" />
            </video>
          )}
        </div>
      </div>

      {/* MOBILE LAYOUT (Framed Editorial) */}
      <div className="flex lg:hidden w-full flex-col px-4 mt-8">
        
        {/* Mobile Text Anchor */}
        <div className="mb-8 flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
          <h1 className="font-sans text-[4.5rem] leading-[0.8] tracking-tighter text-kaaj-charcoal mb-4">
            K A A J
          </h1>
          <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal/60">
            Premium Pakistani Craft
          </p>
        </div>

        {/* Mobile Video Pillar (Native Ratio, Un-stretched) */}
        <div className="relative w-full aspect-[4/5] overflow-hidden shadow-sm animate-fade-up" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
          {isInstagram ? (
            <Image
              src="/images/hero-mobile-bg.webp"
              alt="KAAJ Cinematic"
              fill
              className="object-cover"
              priority
            />
          ) : (
            <video
              poster="/images/hero-mobile-bg.webp"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            >
              <source src="/videos/combo.mp4" type="video/mp4" />
            </video>
          )}
        </div>

        {/* Mobile Button (Clear Usability) */}
        <div className="mt-8 flex justify-center w-full animate-fade-up" style={{ animationDelay: "0.6s", animationFillMode: "both" }}>
          <Link
            href="/shop"
            className="group flex items-center justify-between py-4 px-6 border border-kaaj-charcoal text-kaaj-charcoal hover:bg-kaaj-charcoal hover:text-white transition-all duration-300 w-[85%] max-w-[320px]"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-medium">
              Explore Collection
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="group-hover:translate-x-1 transition-transform">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
