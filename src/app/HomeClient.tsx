"use client";

import FeaturedGrid from "@/components/sections/FeaturedGrid";
import BrandStory from "@/components/sections/BrandStory";
import ProductGrid from "@/components/product/ProductGrid";
import FadeIn from "@/components/ui/FadeIn";
import Link from "next/link";
import Image from "next/image";
import AksCollectionSection from "@/components/sections/AksCollectionSection";

interface HomeClientProps {
  initialFeatured: any[];
  initialArrivals: any[];
  initialCategories: any[];
}

/* ─── Editorial Photo Grid for Category Section ─── */
const CATEGORY_VISUALS: Record<string, string> = {
  aks: "/images/launch_1_decoration/ed-3.webp",
  "signature-stitched": "/images/launch_1_decoration/ed-5.webp",
  sale: "/images/launch_1_decoration/ed-7.webp",
};

/* ─── Instagram Mosaic Photos ─── */
const MOSAIC_IMAGES = [
  { src: "/images/launch_1_decoration/ed-2.webp", alt: "KAAJ Editorial 1", span: "row-span-2" },
  { src: "/images/launch_1_decoration/ed-5.webp", alt: "KAAJ Editorial 2", span: "" },
  { src: "/images/launch_1_decoration/ed-9.webp", alt: "KAAJ Editorial 3", span: "" },
  { src: "/images/launch_1_decoration/ed-7.webp", alt: "KAAJ Editorial 4", span: "row-span-2" },
  { src: "/images/launch_1_decoration/ed-3.webp", alt: "KAAJ Editorial 5", span: "" },
  { src: "/images/launch_1_decoration/ed-8.webp", alt: "KAAJ Editorial 6", span: "" },
];

export default function HomeClient({
  initialFeatured,
  initialArrivals,
  initialCategories,
}: HomeClientProps) {
  return (
    <>
      {/* ── 1. Hero — Cinematic Video Landing ── */}
      <BrandStory />

      {/* ── 2. Editorial Lookbook — Full-Bleed Photo Strips ── */}
      <FeaturedGrid />

      {/* ── 3. Aks Collection — Cinematic Full-Bleed ── */}
      <AksCollectionSection
        eyebrow="THE COLLECTION"
        heading="عکس"
        subtext="Tradition, reimagined — explore the Aks edit."
        features={[]}
        ctaLabel="SHOP AKS"
        ctaHref="/categories/aks"
        mainImage={{ src: "/images/launch_1_decoration/ed-6.webp", alt: "Aks Collection" }}
      />

      {/* ── 4. New Arrivals — Typographic Header + Product Grid ── */}
      <section className="bg-[#FAF9F6] pt-16 sm:pt-24 pb-20 sm:pb-28">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Desktop CTA */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8 border-b border-kaaj-charcoal/10 pb-12 sm:pb-16">
            <FadeIn>
              <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-kaaj-charcoal/50 mb-6">
                Latest Drops
              </p>
              <h2 className="font-sans text-[clamp(3.5rem,8vw,7rem)] leading-[0.85] text-kaaj-charcoal tracking-tighter">
                New Arrivals
              </h2>
            </FadeIn>

            <FadeIn delay={0.2} direction="none" className="hidden md:block mb-2">
              <Link
                href="/shop"
                className="group inline-flex items-center font-sans text-[10px] uppercase tracking-[0.3em] font-medium py-4 px-12 border border-kaaj-charcoal/20 transition-all duration-500 hover:bg-kaaj-charcoal hover:text-white"
              >
                View All
              </Link>
            </FadeIn>
          </div>

          {/* Product Grid */}
          <FadeIn delay={0.15} direction="none">
            <ProductGrid products={initialArrivals.slice(0, 8)} columns={4} />
          </FadeIn>

          {/* Mobile CTA */}
          <FadeIn delay={0.3} direction="up" className="md:hidden">
            <div className="mt-16 flex justify-center">
              <Link
                href="/shop"
                className="group inline-flex items-center font-sans text-[10px] uppercase tracking-[0.3em] font-medium py-4 px-12 border border-kaaj-charcoal/20 transition-all duration-500 hover:bg-kaaj-charcoal hover:text-white"
              >
                View All
              </Link>
            </div>
          </FadeIn>
          
        </div>
      </section>

      {/* ── 5. Visual Category Showcase ── */}
      {initialCategories.length > 0 && (
        <section className="py-20 sm:py-28 bg-[#141413]">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="mb-16 md:mb-20">
                <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/40 mb-4">
                  Browse
                </p>
                <h2 className="font-sans text-[clamp(2rem,5vw,3.5rem)] leading-[0.9] text-white tracking-tighter">
                  Collections
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {initialCategories.map((cat, idx) => {
                const imgSrc =
                  CATEGORY_VISUALS[cat.slug] ||
                  `/images/launch_1_decoration/ed-${(idx % 9) + 1}.webp`;

                return (
                  <FadeIn key={cat.slug} delay={idx * 0.1}>
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="group relative block overflow-hidden aspect-[4/5]"
                    >
                      <Image
                        src={imgSrc}
                        alt={cat.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Dark overlay for text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500" />

                      {/* Category Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-10">
                        <h3 className="font-sans text-xl sm:text-2xl text-white tracking-tight mb-1">
                          {cat.name}
                        </h3>
                        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50">
                          {cat.count} {cat.count === 1 ? "Piece" : "Pieces"}
                        </p>
                      </div>

                      {/* Hover arrow indicator */}
                      <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="1.5"
                          className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. Instagram Photo Mosaic + Social CTA ── */}
      <section>
        {/* Mosaic Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] sm:auto-rows-[250px] lg:auto-rows-[280px]">
          {MOSAIC_IMAGES.map((img, idx) => (
            <a
              key={idx}
              href="https://www.instagram.com/wearkaaj/"
              target="_blank"
              rel="noopener noreferrer"
              className={`relative overflow-hidden group ${img.span}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
            </a>
          ))}
        </div>

        {/* Simple Instagram Bar */}
        <a
          href="https://www.instagram.com/wearkaaj/"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-[#141413] py-5 text-center group hover:bg-[#1a1a18] transition-colors duration-300"
        >
          <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-white/50 group-hover:text-white/80 transition-colors duration-300">
            @wearkaaj
          </span>
        </a>
      </section>
    </>
  );
}
