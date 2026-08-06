"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: image scales up & shifts down as user scrolls
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  // Word animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: 60,
      opacity: 0,
      rotateX: -15,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-kaaj-deep"
    >
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: imageScale, y: imageY }}
      >
        <Image
          src="/hero.png"
          alt="KAAJ - Premium Pakistani Womenswear"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-kaaj-deep/70 via-kaaj-deep/30 to-kaaj-deep/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(26,26,24,0.5)_100%)]" />
      <div className="absolute inset-0 mix-blend-overlay opacity-30 bg-grain pointer-events-none" />

      {/* Top subtle gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kaaj-gold/40 to-transparent" />

      {/* Floating decorative dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-kaaj-gold/30"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Center Aligned Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 text-center flex flex-col items-center mt-32 sm:mt-24"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Eyebrow */}
        <motion.div
          className="flex flex-col items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.5em] text-kaaj-gold drop-shadow-lg">
            The Atelier Collection
          </span>
          <motion.div
            className="h-10 w-px bg-gradient-to-b from-kaaj-gold/60 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top" }}
          />
        </motion.div>

        {/* Headline — word by word reveal */}
        <motion.h1
          className="font-serif text-[13vw] sm:text-[10vw] md:text-[9vw] leading-[0.85] text-white mb-8 sm:mb-12 font-light tracking-tighter perspective-[1000px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <span className="inline-block overflow-hidden">
            <motion.span className="inline-block" variants={wordVariants}>Timeless</motion.span>
          </span>{" "}
          <span className="inline-block overflow-hidden">
            <motion.span className="inline-block" variants={wordVariants}>Elegance,</motion.span>
          </span>
          <br />
          <span className="inline-block overflow-hidden">
            <motion.span className="inline-block italic text-kaaj-gold" variants={wordVariants}>Redefined.</motion.span>
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          className="hidden sm:block font-sans text-[9px] text-white/60 max-w-lg mx-auto leading-relaxed mb-16 uppercase tracking-[0.5em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          An exploration of heritage artistry through modern silhouettes. Discover our latest curation of exquisite luxury wear.
        </motion.p>

        {/* Minimal CTA with shimmer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 sm:mt-0"
        >
          <Link
            href="/shop"
            className="group relative inline-flex items-center justify-center px-10 py-4 sm:px-12 sm:py-5 overflow-hidden border border-white/20 hover:border-kaaj-gold bg-white/5 backdrop-blur-sm transition-all duration-700 btn-shimmer"
          >
            <span className="relative font-sans text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.3em] text-white group-hover:text-kaaj-gold transition-colors duration-500">
              Explore the Collection
            </span>
          </Link>
        </motion.div>
      </motion.div>

      {/* Minimal Scroll cue */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="font-sans text-[8px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
