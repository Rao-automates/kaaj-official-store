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
                className="inline-block text-center leading-[0.78] select-none cursor-default transform-gpu text-[clamp(5rem,20vw,16rem)] tracking-[0.3em]"
                style={{
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  fontWeight: 600,
                  color: "rgba(255, 255, 255, 0.7)", // Frosted white fill
                  mixBlendMode: "overlay", // Premium integrated effect
                  filter: "blur(0.5px) drop-shadow(0 10px 30px rgba(255,255,255,0.3))", // Subtle frost glow
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

          <Link
            href="/shop"
            className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-white/40 backdrop-blur-md border border-white/50 text-[#141413] shadow-lg hover:bg-white/60 hover:border-white/70 transition-all duration-500"
          >
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em]">
              Shop Now
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="group-hover:translate-x-2 transition-transform duration-500 transform-gpu"
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
          <div className="absolute top-0 inset-x-0 h-[30vh] bg-gradient-to-b from-[#141413]/80 via-[#141413]/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141413] via-[#141413]/60 to-transparent pointer-events-none" />
        </div>

        {/* Bottom CTA Area — Refined Luxury Floating Text */}
        <div
          className="absolute bottom-12 flex flex-col items-center z-10 w-full animate-fade-up"
          style={{ animationDelay: "1.2s", animationFillMode: "both" }}
        >
          <div className="flex flex-col items-center gap-3 text-white/70 group-active:text-white transition-colors duration-500">
            <span className="font-sans text-[10px] font-medium uppercase tracking-[0.4em]">
              Explore Collection
            </span>
            <div className="w-8 h-[1px] bg-white/30 group-active:w-16 group-active:bg-white transition-all duration-700 ease-out" />
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
