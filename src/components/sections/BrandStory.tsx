"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center bg-[#0A0A09] overflow-hidden">

      {/* ==============================================================
       *  DESKTOP LAYOUT (Massive Centered Text)
       * ============================================================== */}
      <div className="absolute inset-0 hidden sm:flex flex-col items-center justify-center z-[2]">
        {/* Desktop Image & Overlays */}
        <div className="absolute inset-0 z-0 hero-zoom">
          <Image
            src="/hero-new.png"
            alt="KAAJ — Premium Pakistani Womenswear"
            fill
            priority
            fetchPriority="high"
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-[#0A0A09]/60" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A0A09]/50 via-transparent to-[#0A0A09]" />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0A0A09]/20 via-transparent to-[#0A0A09]/20" />
        <div className="absolute inset-0 bg-grain opacity-25 pointer-events-none z-[1]" />

        <h1 className="relative z-[2] flex items-baseline justify-center w-full px-4">
          {LETTERS.map((letter, i) => (
            <span key={i} className="overflow-hidden inline-block pb-4">
              <motion.span
                className="inline-block text-center leading-[0.78] select-none cursor-default drop-shadow-2xl transform-gpu text-[clamp(5rem,20vw,16rem)] tracking-[0.3em]"
                style={{
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  fontWeight: 500,
                  backgroundImage: "url(/ultimate-silk.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center 40%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
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
          className="relative flex flex-col items-center mt-14 px-6 transform-gpu z-[2]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-[#EAE6DF]/45 leading-[2] text-center max-w-sm mb-12 shadow-black drop-shadow-md">
            Heritage artistry, modern silhouettes.
          </p>

          <Link
            href="/shop"
            className="group flex items-center gap-5 pb-3 border-b border-[#EAE6DF]/10 hover:border-[#C9A84C]/60 transition-all duration-500"
          >
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-[#EAE6DF]/60 group-hover:text-[#C9A84C] transition-colors duration-500 shadow-black drop-shadow-md">
              Explore Collection
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-[#EAE6DF]/40 group-hover:text-[#C9A84C] transition-all group-hover:translate-x-2 duration-500 transform-gpu"
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
          <div className="w-px h-12 bg-gradient-to-b from-[#EAE6DF]/20 to-transparent animate-scroll-pulse" />
        </motion.div>
      </div>

      {/* ==============================================================
       *  MOBILE LAYOUT (The Monogram Jewel) - COMPLETELY REDESIGNED
       * ============================================================== */}
      <div className="absolute inset-0 flex sm:hidden flex-col items-center justify-center bg-[#0A0A09] overflow-hidden z-[2]">
        
        {/* Moody Background Texture */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-new.png"
            alt="KAAJ Editorial"
            fill
            className="object-cover object-[center_30%] opacity-35 hero-zoom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A09] via-transparent to-[#0A0A09]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A09]/90 via-transparent to-[#0A0A09]/90" />
        </div>

        {/* The Massive Brand Symbol (Buttonhole) filled with Silk */}
        <motion.div 
          className="relative z-10 flex flex-col items-center mt-[-8vh]"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-[55vw] h-[55vw] drop-shadow-2xl">
            <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
              <defs>
                <pattern id="hero-silk" patternUnits="userSpaceOnUse" width="200" height="200">
                  <image href="/ultimate-silk.png" x="0" y="0" width="200" height="200" preserveAspectRatio="xMidYMid slice" />
                </pattern>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <g transform="translate(100, 100)" stroke="url(#hero-silk)" fill="none" filter="url(#glow)">
                {/* 
                  Thickened lines (strokeWidth="16") to reveal the silk texture. 
                  Coordinates scaled slightly so the thick lines don't completely overlap,
                  creating a beautiful interlocking thread effect.
                */}
                <line x1="-22" y1="-65" x2="-22" y2="65" strokeWidth="16" strokeLinecap="round" />
                <path d="M 50,-65 C -45,-30 -45,30 50,65" strokeWidth="16" strokeLinecap="round" />
                <path d="M 20,-65 C -25,-30 -25,30 20,65" strokeWidth="6" opacity="0.8" strokeLinecap="round" />
              </g>
            </svg>
          </div>
          
          {/* Elegant Sub-branding - Made slightly bigger as requested */}
          <motion.p 
            className="font-inter text-[15px] font-medium tracking-[1.2em] text-[#EAE6DF] mt-8 ml-[1.2em] drop-shadow-md"
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
          <div className="w-px h-10 bg-gradient-to-b from-[#EAE6DF]/40 to-transparent mb-8 animate-scroll-pulse" />
          <p className="font-sans text-[9px] uppercase tracking-[0.4em] text-[#EAE6DF]/60 text-center mb-6">
            Heritage artistry.
          </p>
          <Link
            href="/shop"
            className="group flex items-center gap-4 pb-2 border-b border-[#EAE6DF]/20 hover:border-[#C9A84C]/60 transition-all duration-500"
          >
            <span className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-[#EAE6DF]/90 group-hover:text-[#C9A84C] transition-colors duration-500">
              Explore
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#EAE6DF]/80 group-hover:text-[#C9A84C] transition-all group-hover:translate-x-1 duration-500">
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
        <div className="w-px h-10 sm:h-12 bg-gradient-to-b from-[#EAE6DF]/30 sm:from-[#EAE6DF]/20 to-transparent animate-scroll-pulse" />
      </motion.div>

    </section>
  );
}
