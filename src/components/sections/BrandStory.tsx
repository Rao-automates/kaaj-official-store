"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BrandStory() {
  return (
    <section className="relative w-full min-h-[100vh] bg-kaaj-cream text-kaaj-charcoal overflow-hidden flex items-center py-32 md:py-48">
      
      {/* Subtle background ambient light */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFFFFF]/40 to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Left: The Royal Image */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start">
            <motion.div 
              className="relative w-full max-w-[28rem] aspect-[4/5] mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              {/* Soft, unboxed image presentation */}
              <div className="absolute inset-0 overflow-hidden rounded-sm shadow-[0_30px_60px_rgba(26,26,24,0.08)]">
                <Image
                  src="/royal-embroidery.png"
                  alt="Opulent Pakistani zardozi embroidery"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={100}
                />
              </div>
              
              {/* Elegant floating caption overlapping the image */}
              <motion.div 
                className="absolute -bottom-6 -right-4 sm:-right-12 bg-kaaj-cream px-8 py-10 shadow-2xl z-20 max-w-[16rem]"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
              >
                <p className="font-serif text-kaaj-charcoal text-xl md:text-2xl italic leading-snug">The poetry of craft.</p>
                <div className="w-16 h-[1px] bg-kaaj-charcoal/20 mt-6" />
              </motion.div>
            </motion.div>
          </div>

          {/* Right: The Refined Copy */}
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-center mt-20 lg:mt-0">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <h2 className="font-serif text-[clamp(3.5rem,6vw,5.5rem)] leading-[1.05] tracking-tight mb-12 text-kaaj-charcoal">
                <span className="block font-light">Elegance</span>
                <span className="block italic text-kaaj-charcoal/60 mt-2">in every thread.</span>
              </h2>

              <div className="space-y-8 max-w-md">
                <p className="font-sans text-sm md:text-base text-kaaj-charcoal/80 leading-[2.2] font-light">
                  True luxury does not shout; it whispers. At KAAJ, our heritage is woven into the very fabric of our creations. We draw inspiration from the regal history of Pakistani craftsmanship, bringing centuries-old techniques into the modern era.
                </p>
                <p className="font-sans text-sm md:text-base text-kaaj-charcoal/60 leading-[2.2] font-light">
                  From the delicate placement of zardozi to the final, immaculate buttonhole, every garment is an homage to the artisans who dedicate their lives to the preservation of beauty.
                </p>
              </div>

              <motion.div 
                className="mt-16 flex items-center gap-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1 }}
              >
                <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-charcoal/40 whitespace-nowrap">
                  Est. 2026
                </span>
                <div className="w-full max-wxs h-[1px] bg-gradient-to-r from-kaaj-charcoal/10 to-transparent" />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
