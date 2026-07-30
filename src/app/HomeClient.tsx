"use client";

import { useEffect, useState } from "react";
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

export default function HomeClient() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

      {/* New Arrivals */}
      <section className="py-48 sm:py-64 bg-kaaj-cream-dark">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-end justify-between mb-16">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-kaaj-gold mb-4">
                  — Just In
                </p>
                <h2 className="font-serif text-5xl md:text-6xl text-kaaj-charcoal tracking-tight">New Arrivals</h2>
              </div>
              <Link
                href="/shop"
                className="hidden sm:inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.18em] text-kaaj-charcoal hover:text-kaaj-gold transition-colors duration-300 group pb-2 border-b border-transparent hover:border-kaaj-gold"
              >
                View Collection
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="group-hover:translate-x-1 transition-transform duration-300">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.2} direction="none">
            {loading ? <ProductGridSkeleton count={4} /> : <ProductGrid products={newArrivals} columns={4} />}
          </FadeIn>
        </div>
      </section>

      {/* Categories Showcase */}
      {(!loading && categories.length > 0) && (
        <section className="py-48 sm:py-64 bg-kaaj-cream">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="flex items-center gap-6 mb-12">
                <div className="h-px w-12 bg-kaaj-gold" />
                <p className="font-sans text-xs uppercase tracking-[0.4em] text-kaaj-charcoal/60">
                  Browse by Category
                </p>
              </div>
            </FadeIn>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <CategoryPill
                  key={cat.slug}
                  name={cat.name}
                  slug={cat.slug}
                  count={cat.count}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Instagram CTA strip */}
      <section className="bg-kaaj-charcoal py-12">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-serif text-2xl text-kaaj-cream mb-3">
            Follow Us on Instagram
          </p>
          <p className="font-sans text-xs text-kaaj-cream/80 mb-6 uppercase tracking-widest">
            @wearkaaj
          </p>
          <a
            href="https://www.instagram.com/wearkaaj/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-kaaj-gold border border-kaaj-gold px-8 py-3 hover:bg-kaaj-gold hover:text-white transition-all duration-300"
          >
            Follow for Inspiration
          </a>
        </div>
      </section>
    </>
  );
}
