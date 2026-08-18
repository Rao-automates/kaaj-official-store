"use client";

import { motion } from "framer-motion";
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

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];


export default function BrandStory() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setHasScrolled(true);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center bg-[#FAF9F6] overflow-hidden">

      {/* ==============================================================
       *  DESKTOP LAYOUT (Massive Centered Text)
       * ============================================================== */}
      <div className="absolute inset-0 hidden sm:flex flex-col items-center justify-center z-[2]">
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
        <div className="absolute inset-0 z-0 bg-[#FAF9F6]/10" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FAF9F6]/30 via-transparent to-[#FAF9F6]/60" />

        {/* Refined Frosted Card Layout (Desktop) */}
        <motion.div
           className="absolute bottom-16 left-6 lg:bottom-32 lg:left-24 flex flex-col items-start transform-gpu z-[2]"
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-black/40 backdrop-blur-lg border border-white/20 rounded-[20px] p-6 sm:p-8 overflow-hidden max-w-[320px] sm:max-w-[380px] shadow-none">
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#F5F5F5] font-bold mb-3">
              new season
            </p>
            <h2 className="font-serif text-3xl text-[#F5F5F5] font-light leading-[1.2] tracking-normal mb-8">
              Effortless elegance, <br className="hidden sm:block" />redefined
            </h2>
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center gap-3 px-6 py-2.5 rounded-full border border-white/30 text-[#E5E5E5] hover:bg-white/10 transition-colors duration-500"
            >
              <span className="font-sans text-[11px] font-medium lowercase tracking-[0.1em]">
                shop now
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                className="group-hover:translate-x-1 transition-transform duration-500 transform-gpu"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </motion.div>
        
        {/* Scroll indicator (Desktop) */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[11] flex flex-col items-center gap-3 transform-gpu"
          initial={{ opacity: 0 }}
          animate={{ opacity: hasScrolled ? 0 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-[#141413]/20 to-transparent animate-scroll-pulse" />
        </motion.div>
      </div>

      {/* ==============================================================
       *  MOBILE LAYOUT (Cinematic Video) - MINIMALIST LUXURY
       * ============================================================== */}
      <Link href="/shop" className="absolute inset-0 flex sm:hidden flex-col items-center justify-center bg-[#141413] overflow-hidden z-[2] cursor-pointer group">
        
        {/* Cinematic Video Background */}
        <div className="absolute inset-0 z-0 bg-[#141413]">
          <div className="absolute inset-0 z-0">
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
          className="absolute bottom-12 flex flex-col items-center z-10 w-full animate-fade-up"
          style={{ animationDelay: "1.2s", animationFillMode: "both" }}
        >
          <div className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/70 text-white hover:bg-white/10 transition-colors duration-500">
            <span className="font-sans text-[13px] font-medium uppercase tracking-[1.5px]">
              Explore Collection
            </span>
          </div>
        </div>
      </Link>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-[11] flex flex-col items-center gap-3 transform-gpu"
        initial={{ opacity: 0 }}
        animate={{ opacity: hasScrolled ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-px h-10 sm:h-12 bg-gradient-to-b from-[#141413]/30 sm:from-[#141413]/20 to-transparent animate-scroll-pulse" />
      </motion.div>

    </section>
  );
}
