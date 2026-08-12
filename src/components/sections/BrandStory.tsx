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
const LETTERS = ["K", "A", "A", "J"];

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

        <h1 className="relative z-[2] flex items-center justify-center w-full px-4">
          {LETTERS.map((letter, i) => (
            <span key={i} className="overflow-hidden inline-block pb-4">
              <motion.span
                className="inline-block text-center leading-[0.78] select-none cursor-default drop-shadow-2xl transform-gpu text-[clamp(5rem,20vw,16rem)] tracking-[0.3em]"
                style={{
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  fontWeight: 500,
                  color: "#141413",
                  WebkitTextStroke: "none",
                  textShadow: "none",
                }}
                initial={{ opacity: 0, y: "60%" }}
                animate={{ opacity: 1, y: "0%" }}
                transition={{ duration: 1.2, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {letter}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="absolute bottom-12 left-12 lg:bottom-20 lg:left-20 flex flex-col items-start transform-gpu z-[2]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-[#141413]/60 leading-[2] text-left max-w-[280px] mb-8">
            Heritage artistry, modern silhouettes.
          </p>

          <Link
            href="/shop"
            className="group flex items-center justify-start gap-5 pb-3 border-b border-[#141413]/10 hover:border-[#C9A84C]/60 transition-all duration-500 w-full"
          >
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-[#141413]/80 group-hover:text-[#C9A84C] transition-colors duration-500">
              Explore Collection
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-[#141413]/60 group-hover:text-[#C9A84C] transition-all group-hover:translate-x-2 duration-500 transform-gpu"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
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
       *  MOBILE LAYOUT (The Monogram Jewel) - COMPLETELY REDESIGNED
       * ============================================================== */}
      <div className="absolute inset-0 flex sm:hidden flex-col items-center justify-center bg-[#FAF9F6] overflow-hidden z-[2]">
        
        {/* Moody Background Texture - Extreme GPU Optimization */}
        <div className="absolute inset-0 z-0 bg-[#FAF9F6]">
          <motion.div 
            className="absolute inset-0 z-0 transform-gpu"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            style={{ willChange: "transform" }}
          >
            <Image
              src="/images/hero-mobile.webp"
              alt="KAAJ Editorial"
              fill
              sizes="(max-width: 640px) 50vw"
              quality={40}
              className="object-cover object-[center_30%]"
              priority
            />
          </motion.div>
          {/* Single gradient to ensure text readability at the bottom, without muting the dress */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6]/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* The Massive Brand Symbol (Buttonhole) filled with Silk */}
        {/* The Massive Brand Symbol (Buttonhole) filled with Silk */}
        <motion.div 
          className="relative z-10 flex flex-col items-center mt-[-8vh]"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-[150vw] h-[150vw] drop-shadow-2xl pointer-events-none">
            <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
              <defs>
              </defs>
              <g transform="translate(87, 100)" stroke="#141413" fill="none">
                {/* Exact original paths preserved for shape. Stroke width reduced by half to make it less bold. Sharp edges restored. */}
                <line x1="-12" y1="-45" x2="-12" y2="45" strokeWidth="3" />
                <path d="M 38,-45 C -28,-20 -28,20 38,45" strokeWidth="3" />
                <path d="M 18,-45 C -18,-20 -18,20 18,45" strokeWidth="1.25" opacity="0.6" />
              </g>
            </svg>
          </div>
          
          {/* Elegant Sub-branding - Made noticeably larger and pulled up closer to symbol */}
          <motion.p 
            className="font-inter text-[32px] font-medium tracking-[1em] text-[#141413] mt-[-35vw] ml-[1em]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            KAAJ
          </motion.p>
        </motion.div>

        {/* Bottom CTA Area */}
        <motion.div
          className="absolute bottom-10 flex flex-col items-center z-10 w-full px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="w-px h-10 bg-gradient-to-b from-[#141413]/40 to-transparent mb-8 animate-scroll-pulse" />
          <p className="font-sans text-[9px] uppercase tracking-[0.4em] text-[#141413]/60 text-center mb-6">
            Heritage artistry.
          </p>
          <Link
            href="/shop"
            className="group flex items-center gap-4 pb-2 border-b border-[#141413]/20 hover:border-[#C9A84C]/60 transition-all duration-500"
          >
            <span className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-[#141413]/90 group-hover:text-[#C9A84C] transition-colors duration-500">
              Explore
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#141413]/80 group-hover:text-[#C9A84C] transition-all group-hover:translate-x-1 duration-500">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </motion.div>
      </div>

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
