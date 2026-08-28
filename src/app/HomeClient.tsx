"use client";

import BrandStory from "@/components/sections/BrandStory";
import ProductGrid from "@/components/product/ProductGrid";
import GoogleReviews from "@/components/sections/GoogleReviews";
import FadeIn from "@/components/ui/FadeIn";
import Marquee from "@/components/ui/Marquee";
import Link from "next/link";
import Image from "next/image";


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
  { src: "/images/launch_1_decoration/ed-9-v3.webp", alt: "KAAJ Editorial 3", span: "" },
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

      {/* ── 2. Sale Announcement Marquee ── */}
      <div className="bg-[#FAF9F6] border-b border-kaaj-charcoal/10 cursor-pointer hover:opacity-90 transition-opacity">
        <Link href="/categories/sale" className="block">
          <Marquee
            text="END OF SEASON SALE — ENJOY 11% OFF ENTIRE STOCK"
            speed="normal"
            className="text-kaaj-rose"
          />
        </Link>
      </div>

      {/* ── 4. New Arrivals — Typographic Header + Product Grid ── */}
      <section className="bg-[#FAF9F6] pt-16 sm:pt-24 pb-20 sm:pb-28">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header & Desktop CTA */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8 border-b border-kaaj-charcoal/10 pb-12 sm:pb-16">
            <FadeIn>
              <h2 className="font-sans text-[clamp(2.5rem,6vw,5rem)] leading-none text-kaaj-charcoal tracking-tight">
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

      {/* ── 5. Google Reviews — Social Proof ── */}
      <GoogleReviews />

      {/* ── 6. Visual Category Showcase ── */}
      {initialCategories.length > 0 && (
        <section className="py-20 sm:py-28 bg-[#FAF9F6]">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="mb-16 md:mb-20">
                <h2 className="font-sans text-[clamp(2rem,5vw,3.5rem)] leading-[0.9] text-kaaj-charcoal tracking-tighter">
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

      {/* ── 6. The Journal (Instagram) ── */}
      <section className="bg-[#FAF9F6] pt-24 pb-32 overflow-hidden text-kaaj-charcoal">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-kaaj-charcoal/10 pb-8 gap-8">
          <div className="flex flex-col">
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-charcoal/60 mb-6">
              Connect
            </p>
            <h2 className="font-sans text-[clamp(3rem,8vw,6rem)] leading-[0.9] tracking-tighter">
              THE ARCHIVE
            </h2>
          </div>
          <a
            href="https://www.instagram.com/wearkaaj/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 font-sans text-xs tracking-widest hover:text-kaaj-rose transition-colors duration-300"
          >
            <span>Follow @wearkaaj</span>
          </a>
        </div>

        {/* Horizontal scrollable track for images */}
        <div className="flex gap-4 sm:gap-8 px-4 sm:px-6 lg:px-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8">
          {MOSAIC_IMAGES.map((img, idx) => (
            <a
              key={idx}
              href="https://www.instagram.com/wearkaaj/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex-none w-[75vw] sm:w-[45vw] lg:w-[28vw] aspect-[3/4] snap-center overflow-hidden group cursor-pointer"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-all duration-[1500ms] group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0"
                sizes="(max-width: 640px) 75vw, (max-width: 1024px) 45vw, 28vw"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
