"use client";

import FeaturedGrid from "@/components/sections/FeaturedGrid";
import BrandStory from "@/components/sections/BrandStory";
import ProductGrid from "@/components/product/ProductGrid";
import CategoryPill from "@/components/ui/CategoryPill";
import FadeIn from "@/components/ui/FadeIn";
import Link from "next/link";
import EditorialGallery from "@/components/sections/EditorialGallery";

interface HomeClientProps {
  initialFeatured: any[];
  initialArrivals: any[];
  initialCategories: any[];
}

export default function HomeClient({
  initialFeatured,
  initialArrivals,
  initialCategories,
}: HomeClientProps) {
  return (
    <>
      {/* Brand Story — THE landing section */}
      <BrandStory />

      {/* Featured Collection Grid */}
      {initialFeatured.length > 0 && (
        <FeaturedGrid products={initialFeatured} />
      )}

      {/* Editorial Lookbook (Aks Collection) */}
      <EditorialGallery />

      {/* New Arrivals */}
      <section className="py-24 sm:py-40 bg-transparent section-divider-top">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 md:mb-24 gap-8">
              <div>

                <h2 className="font-sans text-[clamp(2.5rem,8vw,5rem)] leading-[0.9] text-kaaj-charcoal tracking-tighter -ml-1">
                  New Arrivals.
                </h2>
              </div>
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 px-8 py-3.5 bg-kaaj-olive text-kaaj-cream hover:opacity-90 transition-all duration-500 btn-shimmer"
              >
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em]">
                  Shop New Arrivals
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="group-hover:translate-x-2 transition-transform duration-500 transform-gpu"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} direction="none">
            <ProductGrid products={initialArrivals} columns={4} />
          </FadeIn>
        </div>
      </section>

      {/* Categories */}
      {initialCategories.length > 0 && (
        <section className="py-24 sm:py-40 section-deep section-divider-top">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <FadeIn>
              <div className="flex items-center gap-6 mb-16">
                <div className="h-px w-12 bg-kaaj-charcoal/10" />
                <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-charcoal/70">
                  Explore by Category
                </p>
                <div className="h-px w-12 bg-kaaj-charcoal/10" />
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



      {/* Social CTA — minimal, not template */}
      <section className="relative py-32 sm:py-48 section-void">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <FadeIn>
            <p className="font-sans text-[clamp(2.5rem,6vw,4rem)] text-kaaj-charcoal mb-4 leading-[1.1] tracking-tight">
              Follow the making.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <a
              href="https://www.instagram.com/wearkaaj/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-sans text-[11px] tracking-[0.3em] lowercase text-kaaj-gold hover:text-kaaj-gold-light transition-colors duration-500 mb-16"
            >
              {/* @wearkaaj*/}
            </a>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex items-center gap-8">
              <a
                href="https://www.instagram.com/wearkaaj/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 py-6 px-10 border border-kaaj-charcoal/10 hover:border-kaaj-charcoal/30 transition-all duration-500 hover:-translate-y-1"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-kaaj-charcoal/70 group-hover:text-kaaj-gold transition-colors duration-500">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal/70 group-hover:text-kaaj-gold transition-colors duration-500">
                  Instagram
                </span>
              </a>
              <a
                href="https://www.facebook.com/people/K-A-A-J/61593156713945/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 py-6 px-10 border border-kaaj-charcoal/10 hover:border-kaaj-charcoal/30 transition-all duration-500 hover:-translate-y-1"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-kaaj-charcoal/70 group-hover:text-kaaj-gold transition-colors duration-500">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
                <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal/70 group-hover:text-kaaj-gold transition-colors duration-500">
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
