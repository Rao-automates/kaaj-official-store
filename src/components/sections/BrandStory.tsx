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

      {/* Hero image — CSS-only zoom, mobile-optimized crop */}
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

      {/* Cinematic overlays — lighter on mobile so image shows through */}
      <div className="absolute inset-0 z-0 bg-[#0A0A09]/50 sm:bg-[#0A0A09]/60" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0A0A09]/60 via-transparent to-[#0A0A09]/90" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0A0A09]/20 via-transparent to-[#0A0A09]/20 hidden sm:block" />

      {/* Grain — desktop only */}
      <div className="absolute inset-0 bg-grain opacity-25 pointer-events-none z-[1] hidden md:block" />

      {/* ==============================================================
       *  DESKTOP LAYOUT (Massive Centered Text)
       * ============================================================== */}
      <h1 className="relative z-[2] hidden sm:flex items-baseline justify-center px-4">
        {LETTERS.map((letter, i) => (
          <span key={i} className="overflow-hidden inline-block">
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
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.15 + i * 0.06,
                ease,
              }}
            >
              {letter}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.div
        className="relative z-[2] hidden sm:flex flex-col items-center mt-14 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease }}
      >
        <p className="font-sans text-[11px] uppercase tracking-[0.35em] text-[#EAE6DF]/45 leading-[2] text-center max-w-sm mb-12">
          Heritage artistry, modern silhouettes.
        </p>

        <Link
          href="/shop"
          className="group flex items-center gap-5 pb-3 border-b border-[#EAE6DF]/10 hover:border-[#C9A84C]/40 transition-all duration-500"
        >
          <span className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-[#EAE6DF]/60 group-hover:text-[#C9A84C] transition-colors duration-500">
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

      {/* ==============================================================
       *  MOBILE LAYOUT (High-Fashion Minimalist Split)
       * ============================================================== */}
      <motion.div 
        className="absolute inset-0 z-[10] flex sm:hidden flex-col bg-[#0A0A09] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Top 60%: The Editorial Photography */}
        <div className="relative w-full h-[60vh]">
          <Image
            src="/hero-new.png"
            alt="KAAJ Editorial"
            fill
            className="object-cover object-[center_30%] hero-zoom"
            priority
          />
          {/* Gradients to seamlessly blend the image into the charcoal background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A09] via-[#0A0A09]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A09]/60 via-transparent to-transparent" />
        </div>

        {/* Bottom 40%: The Brand Identity (Quiet Luxury) */}
        <div className="relative flex-1 w-full flex flex-col items-center justify-start pt-2 pb-10 px-6">
          <motion.h1 
            className="font-medium tracking-[0.45em] text-[2.5rem] select-none ml-2"
            style={{
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              backgroundImage: "url(/ultimate-silk.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            KAAJ
          </motion.h1>

          <motion.p 
            className="font-sans text-[9px] uppercase tracking-[0.4em] text-[#EAE6DF]/40 mt-5 text-center max-w-[220px] leading-[2]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Heritage artistry, modern silhouettes.
          </motion.p>

          <motion.div 
            className="mt-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <Link
              href="/shop"
              className="group flex flex-col items-center gap-4"
            >
              {/* Bespoke vertical line indicator */}
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-[#EAE6DF]/20 to-[#EAE6DF]/50 group-hover:to-[#C9A84C] transition-colors duration-500" />
              <span className="font-sans text-[9px] font-medium uppercase tracking-[0.3em] text-[#EAE6DF]/70 group-hover:text-[#C9A84C] transition-colors duration-500">
                Explore
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator (Global) */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[11] flex flex-col items-center gap-3 transform-gpu"
        initial={{ opacity: 0 }}
        animate={{ opacity: hasScrolled ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-px h-10 sm:h-12 bg-gradient-to-b from-[#EAE6DF]/20 to-transparent animate-scroll-pulse" />
      </motion.div>

    </section>
  );
}
