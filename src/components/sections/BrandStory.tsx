"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BrandStory() {
  return (
    <section className="relative w-full min-h-[150vh] bg-[#0A0A09] text-[#EAE6DF] overflow-hidden flex flex-col items-center justify-center">
      
      {/* 1. Architectural Background Grid - Microscopic detail */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-between px-[5vw] lg:px-[15vw]">
        <div className="w-[1px] h-full bg-[#EAE6DF]/[0.02]" />
        <div className="w-[1px] h-full bg-[#EAE6DF]/[0.02]" />
        <div className="w-[1px] h-full bg-[#EAE6DF]/[0.02]" />
        <div className="w-[1px] h-full bg-[#EAE6DF]/[0.02] hidden lg:block" />
      </div>

      {/* 2. The Monolith (The Central Art Container) */}
      {/* Using a striking, ultra-tall architectural aspect ratio */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] lg:w-[40vw] h-[80vh] lg:h-[95vh] z-10 overflow-hidden"
        initial={{ filter: "blur(20px)", opacity: 0, scale: 0.95 }}
        whileInView={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <Image
          src="/ultimate-silk.png"
          alt="Golden raw silk waves"
          fill
          className="object-cover hover:scale-105 transition-transform duration-[5s] ease-out grayscale-[15%] hover:grayscale-0"
          sizes="(max-width: 1024px) 90vw, 40vw"
          quality={100}
          priority
        />
        {/* Cinematic shadows pinning it to the void */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A09] via-transparent to-[#0A0A09] opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A09] via-transparent to-[#0A0A09] opacity-50 lg:opacity-80" />
        
        {/* Subtle inner border for tactile realism */}
        <div className="absolute inset-0 border border-[#EAE6DF]/10 mix-blend-overlay" />
      </motion.div>

      {/* 3. The Grand Typography Layer */}
      <div className="relative z-20 w-full max-w-[95vw] lg:max-w-[85vw] mx-auto h-full flex items-center justify-between pointer-events-none px-4">
        
        {/* Left Side: Massive Vertical Outline Text (Editorial scale) */}
        <div className="hidden xl:flex h-[95vh] flex-col justify-end pb-24">
           <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
           >
              <h2 className="font-serif text-[15vh] leading-none text-transparent tracking-tighter" style={{ WebkitTextStroke: "1px rgba(234, 230, 223, 0.1)", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                ATELIER
              </h2>
           </motion.div>
        </div>

        {/* Center/Right Side: The Poetic Overlap */}
        <div className="w-full xl:w-auto flex flex-col items-center xl:items-start xl:ml-[20vw] mt-24 xl:mt-48 relative">
          
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="text-center xl:text-left"
          >
            <div className="flex items-center justify-center xl:justify-start gap-6 mb-12">
              <span className="block w-16 h-[1px] bg-[#C9A84C]" />
              <span className="font-sans text-[10px] uppercase tracking-[0.8em] text-[#C9A84C] pl-2">
                The Legacy
              </span>
            </div>

            <h2 className="font-serif text-[clamp(4.5rem,9vw,9rem)] leading-[0.85] tracking-tight mb-16 text-[#EAE6DF] drop-shadow-2xl">
              <span className="block font-light italic text-[#EAE6DF]/70">A quiet</span>
              <span className="block ml-0 xl:ml-[10vw]">refusal</span>
              <span className="block italic text-[#C9A84C] ml-0 xl:ml-[20vw] mt-2">to rush.</span>
            </h2>

            <div className="relative pl-0 xl:pl-12 max-w-lg mx-auto xl:mx-0 text-center xl:text-left">
              {/* Hairline structural accent */}
              <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#EAE6DF]/30 to-transparent hidden xl:block" />
              
              <p className="font-sans text-[15px] text-[#EAE6DF]/80 leading-[2.4] font-light mb-8">
                The machine seeks perfection; the hand seeks soul. Every thread woven, every stitch placed, is an intimate dialogue with the fabric.
              </p>
              <p className="font-sans text-[15px] text-[#EAE6DF]/50 leading-[2.4] font-light">
                We do not just make clothing. We preserve the quiet hours of the maker. The final stitch is our signature.
              </p>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Floating minimal indicator at the very bottom */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 1.5 }}
      >
        <span className="font-sans text-[9px] uppercase tracking-[1em] text-[#EAE6DF]/30 whitespace-nowrap pl-3">
          Kaaj
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#EAE6DF]/20 to-transparent" />
      </motion.div>

    </section>
  );
}
