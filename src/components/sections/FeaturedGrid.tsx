"use client";

import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import FadeIn from "@/components/ui/FadeIn";
import type { Product } from "@/lib/types";

interface FeaturedGridProps {
  products: Product[];
}

export default function FeaturedGrid({ products }: FeaturedGridProps) {
  const hasProducts = products && products.length > 0;

  if (!hasProducts) return null;

  const gridClasses = [
    "md:col-span-6 lg:col-span-5 md:col-start-1 lg:col-start-2",
    "md:col-span-5 lg:col-span-4 md:col-start-8 lg:col-start-8 md:mt-48",
    "md:col-span-7 lg:col-span-6 md:col-start-2 lg:col-start-3 md:mt-32",
    "md:col-span-4 lg:col-span-4 md:col-start-9 lg:col-start-9 md:-mt-24",
  ];

  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-48 bg-transparent section-divider-top">
      {/* Smooth transition gradient from dark hero */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FAF9F6] to-transparent pointer-events-none -mt-1" />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header - Editorial minimal */}
        <FadeIn>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-24 md:mb-40 gap-8">
            <div className="max-w-2xl">

              <h2 className="font-sans font-medium text-[clamp(2rem,5vw,4rem)] leading-[0.9] text-kaaj-charcoal tracking-tighter -ml-1">
                Shop All.
              </h2>
            </div>

            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 px-8 py-3.5 bg-kaaj-olive text-kaaj-cream hover:opacity-90 transition-all duration-500 btn-shimmer"
            >
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em]">
                Shop All
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                className="group-hover:translate-x-2 transition-transform duration-500 transform-gpu">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </FadeIn>

        {/* Editorial Grid — no framer-motion, pure CSS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-24 md:gap-y-0">
          {products.slice(0, 4).map((product, idx) => (
            <div
              key={product.id}
              className={`col-span-1 ${gridClasses[idx % 4]} relative`}
            >
              {/* Editorial number watermark */}
              <span className="absolute -top-8 md:-top-12 left-0 font-sans text-[4rem] md:text-[6rem] text-kaaj-charcoal/[0.04] leading-none pointer-events-none select-none z-0">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <FadeIn delay={idx * 0.1}>
                <div className="relative z-10">
                  <ProductCard product={product} priority={idx < 2} />
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
