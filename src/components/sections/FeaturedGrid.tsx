"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import FadeIn from "@/components/ui/FadeIn";
import type { Product } from "@/lib/types";

interface FeaturedGridProps {
  products: Product[];
}

const cardReveal = {
  hidden: {
    opacity: 0,
    clipPath: "inset(8% 0 8% 0)",
    y: 40,
    scale: 0.96,
  },
  visible: (i: number) => ({
    opacity: 1,
    clipPath: "inset(0% 0 0% 0)",
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      delay: i * 0.15,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function FeaturedGrid({ products }: FeaturedGridProps) {
  const hasProducts = products && products.length > 0;

  if (!hasProducts) return null;

  return (
    <section className="py-24 md:py-48 bg-transparent section-divider-top">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header - Editorial minimal */}
        <FadeIn>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-24 md:mb-40 gap-8">
            <div className="max-w-2xl">

              <h2 className="font-serif text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] text-kaaj-charcoal tracking-tighter -ml-1">
                Featured Works.
              </h2>
            </div>

            <Link
              href="/shop"
              className="group inline-flex items-center gap-4 pb-2 border-b border-kaaj-charcoal/30 hover:border-kaaj-gold transition-colors duration-700"
            >
              <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal group-hover:text-kaaj-gold transition-colors duration-700">
                View All Works
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                className="text-kaaj-charcoal group-hover:text-kaaj-gold transition-all group-hover:translate-x-3 duration-700 transform-gpu will-change-transform">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </FadeIn>

        {/* Floating Editorial Grid with clip-path reveals */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-24 md:gap-y-0">
          {products.slice(0, 4).map((product, idx) => {
            // Asymmetrical grid logic mapping
            const gridClasses = [
              "md:col-span-6 lg:col-span-5 md:col-start-1 lg:col-start-2",
              "md:col-span-5 lg:col-span-4 md:col-start-8 lg:col-start-8 md:mt-48",
              "md:col-span-7 lg:col-span-6 md:col-start-2 lg:col-start-3 md:mt-32",
              "md:col-span-4 lg:col-span-4 md:col-start-9 lg:col-start-9 md:-mt-24",
            ][idx % 4];

            return (
              <motion.div
                key={product.id}
                className={`col-span-1 ${gridClasses} relative`}
                custom={idx}
                variants={cardReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {/* Editorial number watermark */}
                <span className="absolute -top-8 md:-top-12 left-0 font-serif text-[4rem] md:text-[6rem] text-kaaj-charcoal/[0.04] leading-none pointer-events-none select-none z-0">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="relative z-10">
                  <ProductCard product={product} priority={idx < 2} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
