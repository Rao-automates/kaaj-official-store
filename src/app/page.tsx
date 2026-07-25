import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Kaaj Official — Premium Pakistani Women's Fashion",
};

export const revalidate = 60;

async function getHomepageData() {
  try {
    const [featured, newArrivals, categories] = await Promise.all([
      gqlFetch<ProductsQueryResponse>(GET_FEATURED_PRODUCTS),
      gqlFetch<ProductsQueryResponse>(GET_PRODUCTS, { first: 8 }),
      gqlFetch<CategoriesQueryResponse>(GET_CATEGORIES),
    ]);

    return {
      featuredProducts: featured?.products?.nodes ?? [],
      newArrivals: newArrivals?.products?.nodes ?? [],
      categories: categories?.productCategories?.nodes ?? [],
    };
  } catch (err) {
    console.error("[Homepage] GraphQL fetch error:", err);
    return { featuredProducts: [], newArrivals: [], categories: [] };
  }
}

export default async function HomePage() {
  const { featuredProducts, newArrivals, categories } = await getHomepageData();

  const primaryCategories = [
    { name: "Shop All", slug: "all" },
    { name: "Signature Stitched", slug: "shop" },
    { name: "Sale", slug: "sale" },
  ];

  return (
    <>
      {/* Hero */}
      <HeroBanner />

      {/* Category Strip */}
      <section className="bg-kaaj-cream border-y border-kaaj-border py-4 overflow-x-auto scrollbar-hide">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 min-w-max">
            {primaryCategories.map((cat) => (
              <CategoryPill key={cat.slug} name={cat.name} slug={cat.slug === "all" ? "" : cat.slug} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection Grid */}
      <FeaturedGrid products={featuredProducts} />

      {/* Brand Story */}
      <BrandStory />

      {/* New Arrivals */}
      <section className="py-32 bg-kaaj-cream-dark">
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
                See More
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="group-hover:translate-x-1 transition-transform duration-300">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.2} direction="none">
            <ProductGrid products={newArrivals} columns={4} />
          </FadeIn>
        </div>
      </section>

      {/* Categories Showcase */}
      {categories.length > 0 && (
        <section className="py-32 bg-kaaj-cream">
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
          <p className="font-sans text-xs text-kaaj-cream/60 mb-6 uppercase tracking-widest">
            @kaajofficial
          </p>
          <a
            href="https://instagram.com/kaajofficial"
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
