"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

const wordRevealVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const wordChild = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function BrandStory() {
  return (
    <section className="py-40 bg-kaaj-deep text-kaaj-charcoal relative overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #1A1A18 0%, #2A2B29 25%, #1A1A18 50%, #363832 75%, #1A1A18 100%)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 15s ease infinite",
        }}
      />

      {/* Background texture */}
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />

      {/* Decorative lines */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kaaj-gold/30 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kaaj-gold/30 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Urdu-inspired decorative element */}
        <FadeIn delay={0.1} scale>
          <div className="flex items-center justify-center gap-8 mb-16">
            <motion.div
              className="h-px w-24 bg-kaaj-gold/40"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "right" }}
            />
            <motion.div
              className="w-10 h-10 flex items-center justify-center opacity-80"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path
                  d="M16 2C16 2 10 9 4 16C10 23 16 30 16 30C16 30 22 23 28 16C22 9 16 2 16 2Z"
                  stroke="#C9A84C"
                  strokeWidth="0.5"
                  fill="none"
                />
                <circle cx="16" cy="16" r="3.5" stroke="#C9A84C" strokeWidth="0.5" fill="none" />
              </svg>
            </motion.div>
            <motion.div
              className="h-px w-24 bg-kaaj-gold/40"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        </FadeIn>

        {/* Headline — cinematic word-by-word reveal */}
        <motion.div
          variants={wordRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="font-serif text-6xl md:text-8xl text-kaaj-charcoal mb-10 leading-[0.9] tracking-tight">
            <span className="inline-block overflow-hidden">
              <motion.span className="inline-block" variants={wordChild}>The</motion.span>
            </span>{" "}
            <span className="inline-block overflow-hidden">
              <motion.span className="inline-block" variants={wordChild}>Art</motion.span>
            </span>{" "}
            <span className="inline-block overflow-hidden">
              <motion.span className="inline-block" variants={wordChild}>of</motion.span>
            </span>{" "}
            <span className="inline-block overflow-hidden">
              <motion.span className="inline-block" variants={wordChild}>the</motion.span>
            </span>
            <br />
            <span className="inline-block overflow-hidden mt-2">
              <motion.span className="inline-block text-kaaj-gold" variants={wordChild}>Kaaj</motion.span>
            </span>
          </h2>
        </motion.div>

        {/* Body */}
        <FadeIn delay={0.3} blur>
          <div className="max-w-2xl mx-auto space-y-8">
            <p className="font-sans text-base md:text-lg text-kaaj-charcoal/80 leading-relaxed font-light">
              In the craft of Pakistani fashion, the <em>kaaj</em> — the buttonhole — is the
              final touch that transforms fabric into art. It is the meeting point of tradition
              and precision, the detail that separates a garment from a masterpiece.
            </p>
            <p className="font-sans text-sm md:text-base text-kaaj-charcoal/60 leading-relaxed font-light pb-16">
              KAAJ was founded on this philosophy: that every piece of clothing should
              tell a story of heritage, crafted with the care and attention that your culture deserves.
            </p>
          </div>
        </FadeIn>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pt-16 border-t border-kaaj-gold/10">
          {[
            { title: "Heritage", desc: "Every design is rooted in centuries of South Asian textile tradition.", delay: 0.2 },
            { title: "Craftsmanship", desc: "Hand-selected fabrics, intricate embroidery, and artisan finishing.", delay: 0.4 },
            { title: "Modernity", desc: "Contemporary silhouettes that honour tradition while celebrating today's woman.", delay: 0.6 },
          ].map((v) => (
            <FadeIn key={v.title} delay={v.delay} scale blur>
              <motion.div
                className="text-center group cursor-default"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className="font-serif text-2xl md:text-3xl text-kaaj-gold mb-6 transition-all duration-500 group-hover:tracking-wider">{v.title}</h3>
                <p className="font-sans text-xs md:text-sm text-kaaj-charcoal/50 leading-relaxed font-light tracking-wide max-w-[200px] mx-auto">{v.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
