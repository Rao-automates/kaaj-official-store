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
    <section className="relative w-full h-[100dvh] flex flex-col items-center justify-end overflow-hidden">
      {/* Full Bleed Background */}
      <div className="absolute inset-0 z-0 bg-[#141413]">
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
        {/* Subtle Dark Gradient for readability at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20 pointer-events-none" />
      </div>

      {/* Floating CTA */}
      <div
        className="relative z-20 w-full px-6 pb-12 sm:pb-16 flex flex-col items-center animate-fade-up"
        style={{ animationDelay: "0.5s", animationFillMode: "both" }}
      >
        <Link
          href="/shop"
          className="group flex items-center justify-between w-full max-w-sm py-4 px-8 border border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-500"
        >
          <span className="font-sans text-[11px] text-white uppercase tracking-[0.25em] font-medium">
            Explore Collection
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" className="group-hover:translate-x-1 transition-transform duration-500">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
