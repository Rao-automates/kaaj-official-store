"use client";

import HeroBanner from "@/components/sections/HeroBanner";
import FeaturedGrid from "@/components/sections/FeaturedGrid";
import BrandStory from "@/components/sections/BrandStory";
import ProductGrid from "@/components/product/ProductGrid";
import CategoryPill from "@/components/ui/CategoryPill";
import FadeIn from "@/components/ui/FadeIn";
import Link from "next/link";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";

interface HomeClientProps {
  initialFeatured: any[];
  initialArrivals: any[];
  initialCategories: any[];
}

export default function HomeClient({ 
  initialFeatured, 
  initialArrivals, 
  initialCategories 
}: HomeClientProps) {

  return (
    <>
      {/* Hero */}
      <HeroBanner />

      {/* Featured Collection Grid */}
      {initialFeatured.length > 0 && (
        <FeaturedGrid products={initialFeatured} />
      )}

      {/* New Arrivals */}
      <section className="py-32 sm:py-64 bg-transparent border-t border-kaaj-cream/10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 md:mb-24 gap-8">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-gold mb-6 flex items-center gap-4">
                  <span className="w-8 h-px bg-kaaj-gold" /> Just In
                </p>
                <h2 className="font-serif text-[clamp(2.5rem,8vw,5rem)] leading-[0.9] text-kaaj-cream tracking-tighter -ml-1">
                  New Arrivals.
                </h2>
              </div>
              <Link
                href="/shop"
                className="group inline-flex items-center gap-4 pb-2 border-b border-kaaj-cream/30 hover:border-kaaj-gold transition-colors duration-500"
              >
                <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-cream group-hover:text-kaaj-gold transition-colors duration-500">
                  View Collection
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="text-kaaj-cream group-hover:text-kaaj-gold transition-colors group-hover:translate-x-2 duration-500 transform-gpu will-change-transform">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2} direction="none">
            <ProductGrid products={initialArrivals} columns={4} />
          </FadeIn>
        </div>
      </section>

      {/* Categories Showcase */}
      {initialCategories.length > 0 && (
        <section className="py-32 sm:py-48 bg-transparent border-t border-kaaj-cream/10">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <FadeIn>
              <div className="flex items-center gap-6 mb-16">
                <div className="h-px w-12 bg-kaaj-gold" />
                <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-cream/60">
                  Explore by Category
                </p>
                <div className="h-px w-12 bg-kaaj-gold" />
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

      {/* Minimal Social CTA strip */}
      <section className="bg-transparent py-24 sm:py-32 border-t border-kaaj-cream/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <p className="font-serif text-[clamp(2rem,5vw,3rem)] text-kaaj-cream mb-4 leading-tight tracking-tight">
            Join the Atelier
          </p>
          <p className="font-sans text-[10px] text-kaaj-cream/60 mb-12 tracking-[0.4em] uppercase">
            Follow the journey
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
            <a
              href="https://www.instagram.com/wearkaaj/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-4 py-4 px-12 border border-kaaj-cream/20 hover:border-kaaj-gold transition-colors duration-500 w-full sm:w-auto justify-center"
            >
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-kaaj-cream group-hover:text-kaaj-gold transition-colors duration-500">
                Instagram
              </span>
            </a>
            <a
              href="https://www.facebook.com/people/K-A-A-J/61593156713945/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-4 py-4 px-12 border border-kaaj-cream/20 hover:border-kaaj-gold transition-colors duration-500 w-full sm:w-auto justify-center"
            >
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-kaaj-cream group-hover:text-kaaj-gold transition-colors duration-500">
                Facebook
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
