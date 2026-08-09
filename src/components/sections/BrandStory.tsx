"use client";

import { motion } from "framer-motion";

export default function BrandStory() {
  return (
    <section className="relative py-24 md:py-40 overflow-hidden section-void">
      {/* Grain */}
      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column editorial layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-0 items-start">
          
          {/* Left: The story */}
          <div className="md:col-span-5 md:col-start-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="font-sans text-[9px] uppercase tracking-[0.5em] text-kaaj-gold/70 mb-8">
                The name
              </p>
              
              <h2 className="font-serif text-5xl md:text-7xl text-kaaj-charcoal leading-[0.9] tracking-tight mb-10">
                Kaaj
              </h2>

              <div className="w-12 h-px bg-kaaj-gold/30 mb-10" />

              <p className="font-sans text-sm md:text-[15px] text-kaaj-charcoal/60 leading-[1.9] font-light max-w-md">
                In Pakistani tailoring, the <em className="text-kaaj-charcoal/80 not-italic font-normal">kaaj</em> is the 
                buttonhole — the final handmade stitch that completes a garment. It&apos;s never rushed. 
                It&apos;s the detail that separates craft from clothing.
              </p>

              <p className="font-sans text-xs text-kaaj-charcoal/40 leading-[1.9] font-light max-w-md mt-6">
                We named ourselves after it because we believe every piece should carry that same intention — 
                made with care, finished by hand, meant to last.
              </p>
            </motion.div>
          </div>

          {/* Right: Values — stripped down, no templates */}
          <div className="md:col-span-4 md:col-start-8 md:pt-32">
            <motion.div
              className="space-y-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              {[
                { label: "Heritage", text: "Rooted in South Asian textile tradition." },
                { label: "Craft", text: "Hand-selected fabrics, artisan finishing." },
                { label: "Now", text: "Contemporary silhouettes for today." },
              ].map((item) => (
                <div key={item.label} className="group">
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-kaaj-gold/60 mb-2">
                    {item.label}
                  </p>
                  <p className="font-sans text-xs text-kaaj-charcoal/40 font-light leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
