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

      {/* Hero image — CSS-zoom enabled across all devices */}
      <div className="absolute inset-0 z-0 hero-zoom">
        <Image
          src="/hero-new.png"
          alt="KAAJ — Premium Pakistani Womenswear"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-[center_30%] sm:object-center"
          sizes="100vw"
        />
      </div>

      {/* Cinematic overlays — Darkened at the bottom to ensure CTA visibility */}
      <div className="absolute inset-0 z-0 bg-[#0A0A09]/40 sm:bg-[#0A0A09]/60" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A0A09]/30 via-transparent to-[#0A0A09]/95 sm:to-[#0A0A09]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0A0A09]/20 via-transparent to-[#0A0A09]/20 hidden sm:block" />

      {/* Grain — desktop only to save mobile GPU */}
      <div className="absolute inset-0 bg-grain opacity-25 pointer-events-none z-[1] hidden md:block" />

      {/* ==============================================================
       *  UNIFIED LAYOUT (Massive Centered Typography)
       * ============================================================== */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-[2]">
        
        {/* Massive Staggered KAAJ */}
        <h1 className="relative flex items-baseline justify-center w-full px-2">
          {LETTERS.map((letter, i) => (
            <span key={i} className="overflow-hidden inline-block pb-4">
              <motion.span
                className="inline-block text-center leading-[0.78] select-none cursor-default drop-shadow-2xl transform-gpu text-[22vw] tracking-tight sm:text-[clamp(5rem,20vw,16rem)] sm:tracking-[0.3em]"
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
                /* Elegant slide-up reveal */
                initial={{ opacity: 0, y: "60%" }}
                animate={{ opacity: 1, y: "0%" }}
                transition={{ duration: 1.2, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {letter}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subline + CTA */}
        <motion.div
          className="relative flex flex-col items-center mt-10 sm:mt-14 px-6 transform-gpu"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#EAE6DF]/80 sm:text-[#EAE6DF]/45 leading-[2] text-center max-w-[280px] sm:max-w-sm mb-10 sm:mb-12 shadow-black drop-shadow-md">
            Heritage artistry, modern silhouettes.
          </p>

          <Link
            href="/shop"
            className="group flex items-center gap-4 sm:gap-5 pb-3 border-b border-[#EAE6DF]/30 sm:border-[#EAE6DF]/10 hover:border-[#C9A84C]/60 transition-all duration-500"
          >
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#EAE6DF] sm:text-[#EAE6DF]/60 group-hover:text-[#C9A84C] transition-colors duration-500 shadow-black drop-shadow-md">
              Explore Collection
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-[#EAE6DF]/80 sm:text-[#EAE6DF]/40 group-hover:text-[#C9A84C] transition-all group-hover:translate-x-2 duration-500 transform-gpu"
            >
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
