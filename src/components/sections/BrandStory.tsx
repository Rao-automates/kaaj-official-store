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

        {/* Editorial Floating Layout */}
        <motion.div
           className="relative flex items-center gap-10 lg:gap-16 z-10 max-w-[850px]"
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Portrait Video Insert (On Left Side) - Polaroid Style Frame */}
          <div className="relative w-[280px] h-[400px] lg:w-[320px] lg:h-[460px] bg-[#FAF9F6] p-2 lg:p-3 overflow-hidden shadow-2xl flex-shrink-0">
            <div className="relative w-full h-full overflow-hidden">
              <video
                src="/videos/combo.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              {/* Very subtle inner border overlay */}
              <div className="absolute inset-0 border border-black/5 pointer-events-none" />
            </div>
          </div>

          {/* Minimalist Editorial Placard (Replacing massive headline) */}
          <div className="flex flex-col items-start justify-center max-w-[280px] pl-6 lg:pl-12 mt-12 lg:mt-24">
            <div className="w-10 h-[1px] bg-kaaj-charcoal/30 mb-6" />
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-kaaj-charcoal/70 font-semibold leading-[2] mb-10">
              Discover the latest arrivals featuring authentic craftsmanship and timeless silhouettes.
            </p>
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center gap-4 px-8 py-3.5 rounded-none bg-kaaj-olive text-kaaj-cream hover:bg-[#4A4D45] transition-all duration-500 shadow-sm"
            >
              <span className="font-sans text-[12px] font-medium uppercase tracking-[0.15em]">
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
          <div className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-none border border-white/70 text-white hover:bg-white/10 transition-colors duration-500">
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
