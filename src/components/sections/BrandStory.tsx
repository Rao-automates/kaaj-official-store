"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";

const VALUES = [
  {
    title: "Heritage",
    desc: "Every design is rooted in centuries of South Asian textile tradition.",
    number: "01",
  },
  {
    title: "Craftsmanship",
    desc: "Hand-selected fabrics, intricate embroidery, and artisan finishing.",
    number: "02",
  },
  {
    title: "Modernity",
    desc: "Contemporary silhouettes that honour tradition while celebrating today\u2019s woman.",
    number: "03",
  },
];

const wordVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const wordChild = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function BrandStory() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden section-void">
      {/* Subtle ambient glow behind text */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-kaaj-gold/[0.03] blur-[120px]" />
      </div>

      {/* Grain */}
      <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative element */}
        <FadeIn delay={0.1}>
          <div className="flex items-center justify-center gap-8 mb-16">
            <motion.div
              className="h-px w-24 bg-kaaj-gold/30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "right" }}
            />
            <div className="w-10 h-10 flex items-center justify-center opacity-60">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path
                  d="M16 2C16 2 10 9 4 16C10 23 16 30 16 30C16 30 22 23 28 16C22 9 16 2 16 2Z"
                  stroke="#C9A84C"
                  strokeWidth="0.5"
                  fill="none"
                />
                <circle cx="16" cy="16" r="3.5" stroke="#C9A84C" strokeWidth="0.5" fill="none" />
              </svg>
            </div>
            <motion.div
              className="h-px w-24 bg-kaaj-gold/30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        </FadeIn>

        {/* Headline with word-by-word reveal */}
        <motion.h2
          className="font-serif text-6xl md:text-8xl lg:text-9xl text-kaaj-charcoal mb-12 leading-[0.85] tracking-tight"
          variants={wordVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {["The", "Art", "of", "the"].map((word, i) => (
            <span key={i} className="overflow-hidden inline-block mr-[0.25em]">
              <motion.span className="inline-block" variants={wordChild}>
                {word}
              </motion.span>
            </span>
          ))}
          <br />
          <span className="overflow-hidden inline-block mt-2">
            <motion.em
              className="not-italic text-kaaj-gold inline-block"
              variants={wordChild}
            >
              Kaaj
            </motion.em>
          </span>
        </motion.h2>

        {/* Body */}
        <FadeIn delay={0.3}>
          <div className="max-w-2xl mx-auto space-y-8">
            <p className="font-sans text-base md:text-lg text-kaaj-charcoal/70 leading-relaxed font-light">
              In the craft of Pakistani fashion, the <em className="text-kaaj-charcoal/90">kaaj</em> — the buttonhole — is the
              final touch that transforms fabric into art. It is the meeting point of tradition
              and precision, the detail that separates a garment from a masterpiece.
            </p>
            <p className="font-sans text-sm md:text-base text-kaaj-charcoal/50 leading-relaxed font-light pb-16">
              KAAJ was founded on this philosophy: that every piece of clothing should
              tell a story of heritage, crafted with the care and attention that your culture deserves.
            </p>
          </div>
        </FadeIn>

        {/* Values grid — with editorial numbers and hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 pt-16">
          {VALUES.map((v, idx) => (
            <FadeIn key={v.title} delay={0.2 + idx * 0.15}>
              <div className="text-center group relative py-8">
                {/* Large editorial number */}
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 font-serif text-[5rem] md:text-[6rem] text-kaaj-charcoal/[0.04] leading-none pointer-events-none select-none">
                  {v.number}
                </span>
                {/* Top gold line draws in on hover */}
                <div className="w-8 h-px bg-kaaj-gold/30 mx-auto mb-8 group-hover:w-16 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <h3 className="font-serif text-2xl md:text-3xl text-kaaj-gold mb-6 transition-transform duration-500 group-hover:-translate-y-1">
                  {v.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-kaaj-charcoal/40 leading-relaxed font-light tracking-wide max-w-[220px] mx-auto">
                  {v.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
