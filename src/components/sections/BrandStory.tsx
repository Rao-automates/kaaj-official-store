"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────────
 *  KAAJ — Brand Story / Hero Landing
 *  
 *  THE first thing users see. Full viewport. One image.
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

      {/* Single hero image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-new.png"
          alt="KAAJ — Premium Pakistani Womenswear"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0A0A09]/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A09]/30 via-transparent to-[#0A0A09]/80" />
      </div>

      {/* Grain */}
      <div className="absolute inset-0 bg-grain opacity-25 pointer-events-none z-[1]" />

      {/* Staggered KAAJ — silk-filled, logo font */}
      <h1 className="relative z-[2] flex items-baseline justify-center">
        {LETTERS.map((letter, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              className="inline-block text-center leading-[0.78] select-none cursor-default"
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(5rem, 20vw, 16rem)",
                letterSpacing: "0.3em",
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
                duration: 1,
                delay: 0.2 + i * 0.08,
                ease,
              }}
            >
              {letter}
            </motion.span>
          </span>
        ))}
      </h1>

      {/* Subline + CTA */}
      <motion.div
        className="relative z-[2] flex flex-col items-center mt-12 sm:mt-16 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease }}
      >
        <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#EAE6DF]/50 leading-[2] text-center max-w-md mb-10 sm:mb-14">
          An exploration of heritage artistry through modern silhouettes.
        </p>

        <Link
          href="/shop"
          className="group flex items-center gap-6 pb-3 border-b border-[#EAE6DF]/15 hover:border-[#C9A84C]/50 transition-colors duration-700"
        >
          <span className="font-sans text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.3em] text-[#EAE6DF]/70 group-hover:text-[#C9A84C] transition-colors duration-700">
            Explore Collection
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-[#EAE6DF]/50 group-hover:text-[#C9A84C] transition-all group-hover:translate-x-3 duration-700 transform-gpu"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: hasScrolled ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-sans text-[8px] uppercase tracking-[0.4em] text-[#EAE6DF]/30">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-[#C9A84C]/50 to-transparent animate-scroll-pulse" />
      </motion.div>

    </section>
  );
}
