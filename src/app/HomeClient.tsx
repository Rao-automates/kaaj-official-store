"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import HeroBanner from "@/components/sections/HeroBanner";
import FeaturedGrid from "@/components/sections/FeaturedGrid";
import BrandStory from "@/components/sections/BrandStory";
import ProductGrid from "@/components/product/ProductGrid";
import CategoryPill from "@/components/ui/CategoryPill";
import FadeIn from "@/components/ui/FadeIn";
import { gqlFetch } from "@/lib/graphql-client";
import {
  GET_PRODUCTS,
  GET_FEATURED_PRODUCTS,
  GET_CATEGORIES,
} from "@/lib/queries";
import type {
  ProductsQueryResponse,
  CategoriesQueryResponse,
} from "@/lib/types";
import Link from "next/link";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import ProductCard from "@/components/product/ProductCard";

export default function HomeClient() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [featured, arrivals, cats] = await Promise.all([
          gqlFetch<ProductsQueryResponse>(GET_FEATURED_PRODUCTS),
          gqlFetch<ProductsQueryResponse>(GET_PRODUCTS, { first: 8 }),
          gqlFetch<CategoriesQueryResponse>(GET_CATEGORIES),
        ]);

        setFeaturedProducts(featured?.products?.nodes ?? []);
        setNewArrivals(arrivals?.products?.nodes ?? []);
        setCategories(cats?.productCategories?.nodes ?? []);
      } catch (err) {
        console.error("[Homepage] fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {/* Hero */}
      <HeroBanner />

      {/* Featured Collection Grid */}
      {!loading && featuredProducts.length > 0 && (
        <FeaturedGrid products={featuredProducts} />
      )}

      {/* Brand Story */}
      <BrandStory />

      {/* New Arrivals — Horizontal Scroll Showcase */}
      <section className="py-32 sm:py-40 bg-kaaj-cream-dark relative overflow-hidden">
        {/* Decorative top line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kaaj-gold/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn blur>
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="h-px w-8 bg-kaaj-gold"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: "left" }}
                  />
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-kaaj-gold">
                    Just In
                  </p>
                </div>
                <h2 className="font-serif text-5xl md:text-6xl text-kaaj-charcoal tracking-tight">New Arrivals</h2>
              </div>
              <Link
                href="/shop"
                className="hidden sm:inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.18em] text-kaaj-charcoal hover:text-kaaj-gold transition-all duration-500 group pb-2 border-b border-transparent hover:border-kaaj-gold"
              >
                View Collection
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="group-hover:translate-x-2 transition-transform duration-500">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
          </FadeIn>

          {/* Horizontal scroll on desktop, grid on mobile */}
          {loading ? (
            <ProductGridSkeleton count={4} />
          ) : (
            <>
              {/* Desktop: Horizontal scroll */}
              <div className="hidden md:block">
                <div
                  ref={scrollRef}
                  className="flex gap-6 overflow-x-auto scroll-snap-x scrollbar-hide pb-4 -mx-4 px-4"
                >
                  {newArrivals.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      className="flex-shrink-0 w-[280px] lg:w-[320px]"
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ProductCard product={product} priority={idx < 4} />
                    </motion.div>
                  ))}
                </div>
                {/* Scroll hint gradient */}
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-kaaj-cream-dark to-transparent pointer-events-none hidden md:block" />
              </div>

              {/* Mobile: Standard grid */}
              <div className="md:hidden">
                <ProductGrid products={newArrivals} columns={2} />
              </div>
            </>
          )}
        </div>
      </section>

      {/* Categories Showcase */}
      {(!loading && categories.length > 0) && (
        <section className="py-32 sm:py-40 bg-kaaj-cream relative">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn blur>
              <div className="flex items-center gap-6 mb-12">
                <motion.div
                  className="h-px w-12 bg-kaaj-gold"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "left" }}
                />
                <p className="font-sans text-xs uppercase tracking-[0.4em] text-kaaj-charcoal/60">
                  Browse by Category
                </p>
              </div>
            </FadeIn>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <CategoryPill
                    name={cat.name}
                    slug={cat.slug}
                    count={cat.count}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Instagram CTA — Redesigned */}
      <section className="relative bg-kaaj-deep py-20 overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kaaj-gold/30 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <FadeIn direction="left" blur>
              <div>
                <p className="font-serif text-3xl md:text-4xl text-kaaj-charcoal mb-3">
                  Follow the Thread
                </p>
                <p className="font-sans text-xs text-kaaj-charcoal/50 uppercase tracking-[0.3em]">
                  @wearkaaj on Instagram
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="right" blur delay={0.2}>
              <a
                href="https://www.instagram.com/wearkaaj/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.2em] text-kaaj-charcoal border border-kaaj-charcoal/20 px-8 py-4 hover:border-kaaj-gold hover:text-kaaj-gold transition-all duration-500 btn-shimmer backdrop-blur-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:scale-110 transition-transform duration-300">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                Follow for Inspiration
              </a>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
