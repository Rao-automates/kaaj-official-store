"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BrandStory() {
  return (
    <section className="relative w-full min-h-[120vh] bg-kaaj-void text-kaaj-charcoal overflow-hidden flex items-center py-32 md:py-48">
      {/* Heavy Grain for cinematic feel */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'300\\' height=\\'300\\'%3E%3Cfilter id=\\'noise\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.8\\' numOctaves=\\'3\\' stitchTiles=\\'stitch\\'/%3E%3CfeColorMatrix type=\\'saturate\\' values=\\'0\\'/%3E%3C/filter%3E%3Crect width=\\'300\\' height=\\'300\\' filter=\\'url(%23noise)\\' opacity=\\'0.05\\'/%3E%3C/svg%3E')] opacity-60 mix-blend-overlay pointer-events-none z-0" />

      {/* Massive Background Typography - purely artistic tension */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 overflow-hidden flex flex-col items-center select-none">
        <h2 className="font-serif text-[28vw] leading-[0.75] text-kaaj-charcoal/[0.04] tracking-tighter uppercase whitespace-nowrap blur-[2px]">
          A Refusal
        </h2>
        <h2 className="font-serif text-[28vw] leading-[0.75] text-kaaj-charcoal/[0.04] tracking-tighter uppercase whitespace-nowrap blur-[2px]">
          To Rush
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-8 items-center">
          
          {/* Left: The Raw Copy */}
          <div className="lg:col-span-5 lg:col-start-2 flex flex-col justify-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <h3 className="font-serif text-[clamp(3.5rem,6vw,6rem)] leading-[0.85] tracking-tight mb-12">
                It starts <br/>
                <span className="italic text-kaaj-charcoal/40 font-light pr-2">with a</span> <br/>
                needle.
              </h3>

              <div className="space-y-8 max-w-md relative">
                {/* Decorative architectural line */}
                <div className="absolute -left-6 top-2 bottom-2 w-px bg-kaaj-charcoal/10 hidden md:block" />
                
                <p className="font-sans text-sm md:text-[15px] text-kaaj-charcoal/90 leading-[2.2] font-light">
                  The <em className="italic text-kaaj-charcoal">Kaaj</em> isn&apos;t just a buttonhole. It is the final breath before the garment is born. A quiet act of defiance against mass production.
                </p>
                <p className="font-sans text-sm md:text-[15px] text-kaaj-charcoal/50 leading-[2.2] font-light">
                  We don&apos;t just make clothes. We preserve the human touch. Every single stitch is a refusal to rush.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: The Art Installation Image */}
          <div className="lg:col-span-5 lg:col-start-8 relative mt-12 lg:mt-0">
            


            <motion.div 
              className="relative w-full max-w-md mx-auto aspect-[3/4] z-10 group"
              initial={{ opacity: 0, clipPath: "inset(20% 0 0 0)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              {/* Image Container with strict brutalist border */}
              <div className="absolute inset-0 border border-kaaj-charcoal/20 p-2 md:p-4 bg-kaaj-void/50">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/art-needle.png"
                    alt="A single golden needle piercing fabric"
                    fill
                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] grayscale-[40%] group-hover:grayscale-0"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  {/* Internal dark gradient to ground the image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-kaaj-void/90 via-kaaj-void/20 to-transparent opacity-80" />
                </div>
              </div>


            </motion.div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
