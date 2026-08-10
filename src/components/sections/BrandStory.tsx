"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BrandStory() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden section-void flex flex-col items-center justify-center min-h-[100dvh]">
      {/* Grain & Atmosphere */}
      <div className="absolute inset-0 bg-grain opacity-[0.15] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-kaaj-gold/[0.02] blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Massive Typography - Brutalist Editorial */}
        <div className="relative w-full flex flex-col items-center justify-center text-center">
          
          <motion.h2 
            className="font-serif text-[clamp(5rem,18vw,14rem)] leading-[0.75] tracking-tighter text-kaaj-charcoal/90 uppercase z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            The Final
          </motion.h2>

          {/* Floating Image breaking the text — this creates the "artful" tension */}
          <motion.div 
            className="relative w-56 h-72 md:w-96 md:h-[32rem] my-[-2rem] md:my-[-6rem] z-20 grayscale hover:grayscale-0 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <Image
              src="/hero.png" // Using the highly textured editorial fabric image
              alt="The Art of Kaaj"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 60vw, 30vw"
            />
            {/* Cinematic dark overlay on the image */}
            <div className="absolute inset-0 bg-gradient-to-t from-kaaj-void/80 via-transparent to-transparent" />
          </motion.div>
          
          <motion.h2 
            className="font-serif text-[clamp(5rem,18vw,14rem)] leading-[0.75] tracking-tighter text-kaaj-gold uppercase relative z-30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <span className="text-kaaj-charcoal/30 italic mr-2 md:mr-6 lowercase font-light">&amp;</span>Stitch.
          </motion.h2>

        </div>

        {/* Small manifesto text anchored at the bottom corners */}
        <div className="mt-24 md:mt-40 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 pt-12 relative">
          
          {/* Subtle dividing line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-kaaj-charcoal/0 via-kaaj-charcoal/20 to-kaaj-charcoal/0" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <p className="font-sans text-[9px] uppercase tracking-[0.5em] text-kaaj-gold mb-6 flex items-center gap-4">
              <span className="w-6 h-px bg-kaaj-gold/50 inline-block" />
              Philosophy
            </p>
            <p className="font-sans text-sm md:text-base text-kaaj-charcoal/60 leading-[2] font-light max-w-sm pl-10">
              In the craft of Pakistani fashion, the <em className="text-kaaj-charcoal not-italic font-medium">kaaj</em> — the buttonhole — is the final touch that transforms fabric into art. It is the meeting point of tradition and precision.
            </p>
          </motion.div>

          <motion.div
            className="md:text-right flex flex-col md:items-end justify-between"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <p className="font-sans text-[9px] uppercase tracking-[0.5em] text-kaaj-charcoal/40 mb-6 flex items-center gap-4 justify-end">
              Est. 2026
              <span className="w-6 h-px bg-kaaj-charcoal/20 inline-block md:hidden" />
            </p>
            <p className="font-sans text-sm md:text-base text-kaaj-charcoal/60 leading-[2] font-light max-w-sm pr-0 md:pr-10">
              We named ourselves after it because we believe every piece should carry that same intention — made with care, finished by hand, meant to last.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
