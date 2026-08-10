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

      {/* Hero image — static on mobile to prevent jitter, CSS-zoom on desktop */}
      <div className="absolute inset-0 z-0 sm:hero-zoom">
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

      {/* Cinematic overlays */}
      <div className="absolute inset-0 z-0 bg-[#0A0A09]/50 sm:bg-[#0A0A09]/60" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A0A09]/40 sm:from-[#0A0A09]/50 via-transparent to-[#0A0A09]/90 sm:to-[#0A0A09]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0A0A09]/20 via-transparent to-[#0A0A09]/20 hidden sm:block" />

      {/* Grain — desktop only to save mobile GPU */}
      <div className="absolute inset-0 bg-grain opacity-25 pointer-events-none z-[1] hidden md:block" />

      {/* Unified Staggered KAAJ — responsive scaling fits mobile perfectly without wrapping */}
      <h1 className="relative z-[2] flex items-baseline justify-center px-2 w-full">
        {LETTERS.map((letter, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              className="inline-block text-center leading-[0.78] select-none cursor-default drop-shadow-2xl transform-gpu text-[17vw] tracking-[0.05em] sm:text-[clamp(5rem,20vw,16rem)] sm:tracking-[0.3em]"
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
              /* Pure opacity fade to prevent layout/repaint jitter */
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.15 + i * 0.1,
                ease,
              }}
            >
              {letter}
            </motion.span>
          </span>
        ))}
      </h1>

      {/* Unified Subline + CTA */}
      <motion.div
        className="relative z-[2] flex flex-col items-center mt-12 sm:mt-14 px-6 transform-gpu"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease }}
      >
        <p className="font-sans text-[9px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#EAE6DF]/60 sm:text-[#EAE6DF]/45 leading-[2] text-center max-w-[260px] sm:max-w-sm mb-10 sm:mb-12">
          Heritage artistry, modern silhouettes.
        </p>

        <Link
          href="/shop"
          className="group flex items-center gap-4 sm:gap-5 pb-3 border-b border-[#EAE6DF]/20 sm:border-[#EAE6DF]/10 hover:border-[#C9A84C]/50 sm:hover:border-[#C9A84C]/40 transition-all duration-500"
        >
          <span className="font-sans text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#EAE6DF]/80 sm:text-[#EAE6DF]/60 group-hover:text-[#C9A84C] transition-colors duration-500">
            Explore Collection
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-[#EAE6DF]/60 sm:text-[#EAE6DF]/40 group-hover:text-[#C9A84C] transition-all group-hover:translate-x-2 duration-500 transform-gpu"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-3 transform-gpu"
        initial={{ opacity: 0 }}
        animate={{ opacity: hasScrolled ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-px h-10 sm:h-12 bg-gradient-to-b from-[#EAE6DF]/30 sm:from-[#EAE6DF]/20 to-transparent animate-scroll-pulse" />
      </motion.div>

    </section>
  );
}
