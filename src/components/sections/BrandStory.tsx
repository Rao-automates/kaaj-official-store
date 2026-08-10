"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BrandStory() {
  return (
    // We use the brand cream color. The text inside will be the exact same cream color, 
    // but with mix-blend-difference, which mathematically turns it to pure black over the background,
    // and white over the dark image.
    <section className="relative w-full min-h-[150vh] bg-[#DCD8D0] overflow-hidden flex flex-col items-center justify-center py-48">
      
      {/* 1. Abstract Kinetic Texture - A massive, barely visible marquee that anchors the piece */}
      <div className="absolute inset-0 z-0 flex flex-col justify-between opacity-[0.04] pointer-events-none overflow-hidden py-12 select-none">
         <h1 className="font-serif text-[20vw] leading-[0.7] whitespace-nowrap tracking-tighter text-[#1A1A18] translate-x-[-10%]">
            KAAJ KAAJ KAAJ KAAJ
         </h1>
         <h1 className="font-serif text-[20vw] leading-[0.7] whitespace-nowrap tracking-tighter text-[#1A1A18] translate-x-[-30%]">
            THE STITCH THE STITCH
         </h1>
         <h1 className="font-serif text-[20vw] leading-[0.7] whitespace-nowrap tracking-tighter text-[#1A1A18] translate-x-[-15%]">
            KAAJ KAAJ KAAJ KAAJ
         </h1>
      </div>

      {/* 2. The Central Art Piece - Strict Brutalist Geometry */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.div 
          className="relative w-[90vw] md:w-[45vw] lg:w-[35vw] h-[60vh] md:h-[75vh] overflow-hidden shadow-2xl"
          initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
          whileInView={{ clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <Image
            src="/raw-thread.png"
            alt="The Golden Thread"
            fill
            className="object-cover scale-110"
            sizes="(max-width: 768px) 90vw, 45vw"
            quality={100}
          />
          {/* Subtle noise over the image to give it tactile texture */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'400\\'%3E%3Cfilter id=\\'noise\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'1.2\\' numOctaves=\\'3\\' stitchTiles=\\'stitch\\'/%3E%3C/filter%3E%3Crect width=\\'400\\' height=\\'400\\' filter=\\'url(%23noise)\\' opacity=\\'0.15\\'/%3E%3C/svg%3E')] mix-blend-overlay" />
        </motion.div>
      </div>

      {/* 3. The Difference Layer Typography - This is the "World Class" trick */}
      {/* We set the text color to the exact background color (#DCD8D0). 
          With mix-blend-difference, it inverts to black over the background, and white over the dark image. */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col items-center justify-center pointer-events-none mix-blend-difference text-[#DCD8D0] px-4">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 2, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="flex flex-col items-center text-center w-full"
        >
          {/* Asymmetrical, screen-breaking typography */}
          <h2 className="font-serif text-[clamp(4.5rem,14vw,14rem)] leading-[0.75] tracking-tighter uppercase whitespace-nowrap mb-16 md:mb-24 w-full relative">
            <span className="block md:ml-[-15vw] text-left">The Hand</span>
            <span className="block italic font-light md:mr-[-15vw] text-right text-kaaj-gold mix-blend-normal mt-2 md:mt-4">Remains.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-12 md:gap-32 text-left mt-12 md:mt-32">
            <p className="font-sans text-sm sm:text-base md:text-lg max-w-sm leading-[2] tracking-wide font-light">
              We reject the machine&apos;s perfection. Our craft is found in the slight tension of a thread, the weight of the weave, the quiet hours of the maker.
            </p>
            <p className="font-sans text-sm sm:text-base md:text-lg max-w-sm leading-[2] tracking-wide font-light self-end md:text-right">
              The final stitch is not a conclusion. It is a signature. A quiet refusal to rush.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
