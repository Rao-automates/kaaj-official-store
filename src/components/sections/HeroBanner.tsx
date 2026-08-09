"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const HEADLINE_LETTERS = ["K", "A", "A", "J"];

export default function HeroBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: image moves slower than scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Image desaturates and dims as user scrolls
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [0.85, 0.4]);
  // Content fades out as user scrolls past
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setHasScrolled(true);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] flex items-end bg-transparent overflow-hidden"
    >
      {/* Parallax Hero Image */}
      <motion.div
        className="absolute top-0 right-0 w-full md:w-[70%] h-[85vh] md:h-[120%] z-0 transform-gpu"
        style={{ y: imageY, opacity: imageOpacity }}
      >
        <Image
          src="/hero.png"
          alt="KAAJ - Premium Pakistani Womenswear"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 70vw"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2E302A] via-[#2E302A]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#363832] via-transparent to-transparent hidden md:block" />
      </motion.div>

      {/* Content — fades out on scroll */}
      <motion.div
        className="relative z-10 w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Eyebrow with animated line */}
        <motion.div
          className="flex items-center gap-4 mb-8 md:mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            className="h-px w-8 md:w-16 bg-kaaj-gold/70"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
          />
          <span className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-kaaj-gold">
            The Atelier Collection
          </span>
        </motion.div>

        {/* Staggered Letter Reveal Headline */}
        <h1 className="flex items-baseline -ml-1 md:-ml-4 mb-12 md:mb-20">
          {HEADLINE_LETTERS.map((letter, i) => (
            <span key={i} className="overflow-hidden inline-block">
              <motion.span
                className="inline-block !font-sans font-medium tracking-[0.3em] md:tracking-[0.4em] text-[clamp(4.5rem,16vw,13rem)] leading-[0.75] text-kaaj-charcoal drop-shadow-2xl"
                style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif" }}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.2 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {letter}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* CTA & Subtext Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="md:col-span-6 lg:col-span-5">
            <p className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-kaaj-charcoal/80 leading-[2]">
              An exploration of heritage artistry through modern silhouettes. Discover our latest curation.
            </p>
          </div>

          <div className="md:col-span-6 lg:col-span-7 flex md:justify-end">
            <Link
              href="/shop"
              className="group flex items-center gap-6 pb-4 border-b border-kaaj-charcoal/20 hover:border-kaaj-gold transition-colors duration-700 w-full md:w-auto"
            >
              <span className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-kaaj-charcoal group-hover:text-kaaj-gold transition-colors duration-700">
                Explore Collection
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-kaaj-charcoal group-hover:text-kaaj-gold transition-all group-hover:translate-x-3 duration-700 transform-gpu will-change-transform"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator — fades out after first scroll */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: hasScrolled ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-sans text-[8px] uppercase tracking-[0.4em] text-kaaj-charcoal/40">
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-kaaj-gold/60 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
