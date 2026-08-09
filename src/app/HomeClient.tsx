"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroBanner from "@/components/sections/HeroBanner";
import FeaturedGrid from "@/components/sections/FeaturedGrid";
import BrandStory from "@/components/sections/BrandStory";
import ProductCard from "@/components/product/ProductCard";
import ProductGrid from "@/components/product/ProductGrid";
import CategoryPill from "@/components/ui/CategoryPill";
import Marquee from "@/components/ui/Marquee";
import FadeIn from "@/components/ui/FadeIn";
import Link from "next/link";

interface HomeClientProps {
  initialFeatured: any[];
  initialArrivals: any[];
  initialCategories: any[];
}

/* ── Horizontal Scroll Section (Desktop Only) ──────────────────────────── */
function HorizontalScrollSection({ products }: { products: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(products.length - 1) * 25}%`]);

  return (
    <div ref={containerRef} className="hidden lg:block relative" style={{ height: `${products.length * 50}vh` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Scroll progress indicator */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-kaaj-gold/40 origin-left z-10"
          style={{ scaleX: scrollYProgress }}
        />

        <motion.div className="flex gap-8 pl-[5vw]" style={{ x }}>
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              className="w-[320px] flex-shrink-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard product={product} priority={idx < 2} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function HomeClient({
  initialFeatured,
  initialArrivals,
  initialCategories,
}: HomeClientProps) {
  return (
    <>
      {/* Hero */}
      <HeroBanner />

      {/* Marquee Divider */}
      <Marquee
        text="HERITAGE · CRAFTSMANSHIP · MODERNITY · KAAJ"
        speed="normal"
      />

      {/* Featured Collection Grid */}
      {initialFeatured.length > 0 && (
        <FeaturedGrid products={initialFeatured} />
      )}

      {/* Brand Story — was imported but never rendered! */}
      <BrandStory />

      {/* Second Marquee Divider */}
      <Marquee
        text="PRET · UNSTITCHED · LUXURY LAWN · FORMALS · KAAJ"
        speed="slow"
      />

      {/* New Arrivals */}
      <section className="py-24 sm:py-40 bg-transparent section-divider-top">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 md:mb-24 gap-8">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-gold mb-6 flex items-center gap-4">
                  <motion.span
                    className="inline-block w-8 h-px bg-kaaj-gold"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "left" }}
                  />
                  Just In
                </p>
                <h2 className="font-serif text-[clamp(2.5rem,8vw,5rem)] leading-[0.9] text-kaaj-charcoal tracking-tighter -ml-1">
                  New Arrivals.
                </h2>
              </div>
              <Link
                href="/shop"
                className="group inline-flex items-center gap-4 pb-2 border-b border-kaaj-charcoal/30 hover:border-kaaj-gold transition-colors duration-700"
              >
                <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal group-hover:text-kaaj-gold transition-colors duration-700">
                  View Collection
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-kaaj-charcoal group-hover:text-kaaj-gold transition-all group-hover:translate-x-3 duration-700 transform-gpu will-change-transform"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </FadeIn>

          {/* Desktop: Horizontal scroll gallery */}
          {initialArrivals.length > 0 && (
            <HorizontalScrollSection products={initialArrivals} />
          )}

          {/* Mobile: Staggered 2-column grid */}
          <div className="lg:hidden">
            <FadeIn delay={0.2} direction="none">
              <ProductGrid products={initialArrivals} columns={2} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      {initialCategories.length > 0 && (
        <section className="py-24 sm:py-40 section-deep section-divider-top">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <FadeIn>
              <div className="flex items-center gap-6 mb-16">
                <motion.div
                  className="h-px w-12 bg-kaaj-gold/40"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "right" }}
                />
                <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-charcoal/60">
                  Explore by Category
                </p>
                <motion.div
                  className="h-px w-12 bg-kaaj-gold/40"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
                {initialCategories.map((cat) => (
                  <CategoryPill
                    key={cat.slug}
                    name={cat.name}
                    slug={cat.slug}
                    count={cat.count}
                  />
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Artful Social CTA */}
      <section className="relative py-32 sm:py-48 section-void overflow-hidden">
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-kaaj-gold/[0.04] blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <FadeIn>
            <p className="font-serif text-[clamp(2.5rem,6vw,4rem)] text-kaaj-charcoal mb-4 leading-[1.1] tracking-tight">
              Follow the making.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <a
              href="https://www.instagram.com/wearkaaj/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-sans text-[11px] tracking-[0.3em] uppercase text-kaaj-gold hover:text-kaaj-gold-light transition-colors duration-500 mb-16"
            >
              @wearkaaj
            </a>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex items-center gap-8">
              <a
                href="https://www.instagram.com/wearkaaj/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 py-6 px-10 border border-kaaj-charcoal/10 hover:border-kaaj-gold/40 transition-all duration-500 hover:-translate-y-1"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-kaaj-charcoal/60 group-hover:text-kaaj-gold transition-colors duration-500">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal/60 group-hover:text-kaaj-gold transition-colors duration-500">
                  Instagram
                </span>
              </a>
              <a
                href="https://www.facebook.com/people/K-A-A-J/61593156713945/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 py-6 px-10 border border-kaaj-charcoal/10 hover:border-kaaj-gold/40 transition-all duration-500 hover:-translate-y-1"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-kaaj-charcoal/60 group-hover:text-kaaj-gold transition-colors duration-500">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
                <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal/60 group-hover:text-kaaj-gold transition-colors duration-500">
                  Facebook
                </span>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
