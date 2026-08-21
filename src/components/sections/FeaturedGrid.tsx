"use client";

import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

/**
 * Editorial Lookbook — Full-bleed alternating photo + text strips.
 * Uses launch editorial photography instead of product cards.
 * Creates dramatic visual rhythm between sections.
 */

const LOOKBOOK_ITEMS = [
  {
    image: "/images/launch_1_decoration/ed-1.webp",
    alt: "KAAJ Editorial — Crimson Artistry",
    tagline: "The modern edit",
    label: "Aks Collection",
    href: "/categories/aks",
    align: "right" as const,
  },
  {
    image: "/images/launch_1_decoration/ed-4.webp",
    alt: "KAAJ Editorial — Quiet Luxury",
    tagline: "Shop the lookbook",
    label: "New Season",
    href: "/shop",
    align: "left" as const,
  },
];

export default function FeaturedGrid() {
  return (
    <section className="relative bg-transparent">
      {/* Smooth transition from hero */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#FAF9F6] to-transparent pointer-events-none -mt-1 z-10" />

      {LOOKBOOK_ITEMS.map((item, idx) => (
        <div
          key={idx}
          className={`relative w-full grid grid-cols-1 lg:grid-cols-2 min-h-[70vh] lg:min-h-[85vh] ${
            idx > 0 ? "" : ""
          }`}
        >
          {/* Image Side */}
          <div
            className={`relative overflow-hidden ${
              item.align === "right" ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <FadeIn delay={0.1} direction="none">
              <div className="relative w-full h-[60vh] lg:h-full min-h-[400px] lg:min-h-[85vh]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={idx === 0}
                />
                {/* Subtle inner shadow for depth */}
                <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.08)]" />
              </div>
            </FadeIn>
          </div>

          {/* Text Side */}
          <div
            className={`relative flex items-center ${
              item.align === "right" ? "lg:order-1" : "lg:order-2"
            } ${
              idx % 2 === 0
                ? "bg-[#141413]"
                : "bg-[#F5F3EC]"
            }`}
          >
            <div className="w-full px-8 sm:px-12 lg:px-20 xl:px-28 py-20 lg:py-0">
              <FadeIn delay={0.2}>
                <p
                  className={`font-sans text-[10px] uppercase tracking-[0.4em] mb-6 ${
                    idx % 2 === 0 ? "text-white/50" : "text-kaaj-charcoal/50"
                  }`}
                >
                  {item.label}
                </p>

                <h2
                  className={`font-sans text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight mb-10 max-w-md ${
                    idx % 2 === 0 ? "text-white" : "text-kaaj-charcoal"
                  }`}
                >
                  {item.tagline}
                </h2>

                <Link
                  href={item.href}
                  className={`group inline-flex items-center font-sans text-[10px] uppercase tracking-[0.3em] font-medium py-4 px-10 border transition-all duration-500 ${
                    idx % 2 === 0
                      ? "border-white/20 text-white hover:bg-white hover:text-kaaj-deep"
                      : "border-kaaj-charcoal/20 text-kaaj-charcoal hover:bg-kaaj-charcoal hover:text-white"
                  }`}
                >
                  Shop Now
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
