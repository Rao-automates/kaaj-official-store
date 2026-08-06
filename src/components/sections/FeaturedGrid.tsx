"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import FadeIn from "@/components/ui/FadeIn";
import type { Product } from "@/lib/types";

interface FeaturedGridProps {
  products: Product[];
}

// Placeholder editorial cards when no products exist
const EDITORIAL_PLACEHOLDERS = [
  {
    id: "ph1", title: "Signature Stitched Collection", tag: "New Arrival",
    bg: "from-kaaj-deep to-kaaj-charcoal", href: "/shop",
    image: "/featured.png",
    light: true,
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: i * 0.1,
    },
  }),
};

export default function FeaturedGrid({ products }: FeaturedGridProps) {
  const hasProducts = products && products.length > 0;

  return (
    <section className="py-32 bg-kaaj-cream relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kaaj-gold/20 to-transparent" />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {hasProducts ? (
          <>
            {/* Section Header */}
            <FadeIn blur>
              <div className="flex items-end justify-between mb-16">
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
                      Curated for You
                    </p>
                  </div>
                  <h2 className="font-serif text-5xl md:text-6xl text-kaaj-charcoal tracking-tight">
                    Featured Collection
                  </h2>
                </div>
                <Link
                  href="/shop"
                  className="hidden sm:inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.18em] text-kaaj-charcoal hover:text-kaaj-gold transition-all duration-500 group pb-2 border-b border-transparent hover:border-kaaj-gold"
                >
                  View All
                  <motion.svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                    className="transition-transform duration-500 group-hover:translate-x-2"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </motion.svg>
                </Link>
              </div>
            </FadeIn>

            {/* Staggered product grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-16">
              {products.slice(0, 8).map((product, idx) => (
                <motion.div
                  key={product.id}
                  custom={idx}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className={idx === 0 ? "col-span-2 row-span-2 md:col-span-1 md:row-span-1 lg:col-span-2 lg:row-span-2" : ""}
                >
                  <ProductCard product={product} priority={idx < 4} />
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          /* Editorial placeholder grid - Simplified for one collection */
          <FadeIn delay={0.2} direction="up" blur>
            <div className="w-full">
              {EDITORIAL_PLACEHOLDERS.map((card) => (
                <Link
                  key={card.id}
                  href={card.href}
                  className={`relative block overflow-hidden bg-gradient-to-br ${card.bg} aspect-video group md:h-[600px] w-full`}
                >
                  <EditorialCard title={card.title} tag={card.tag} light={card.light} large image={card.image} />
                </Link>
              ))}
            </div>
          </FadeIn>
        )}

        {/* Mobile view all */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.18em] text-kaaj-charcoal border-b border-kaaj-charcoal pb-0.5 hover:text-kaaj-gold hover:border-kaaj-gold transition-all duration-300"
          >
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  );
}

function EditorialCard({
  title,
  tag,
  large = false,
  light = false,
  image,
}: {
  title: string;
  tag: string;
  large?: boolean;
  light?: boolean;
  image?: string;
}) {
  return (
    <>
      {image ? (
        <Image src={image} alt={title} fill className="object-cover opacity-90 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
      ) : (
        <div className="absolute inset-0 bg-grain opacity-40" />
      )}
      {/* Dark overlay at bottom for text visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
      <div className="absolute inset-0 group-hover:bg-black/20 transition-colors duration-700" />

      {/* Decorative motif */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <svg width={large ? "200" : "120"} height={large ? "200" : "120"} viewBox="0 0 48 48" fill="none">
          <path d="M24 4C24 4 16 12 8 20C16 28 24 44 24 44C24 44 32 28 40 20C32 12 24 4 24 4Z"
            stroke={light ? "#F5F0E8" : "#1C1C1C"} strokeWidth="1" />
          <circle cx="24" cy="20" r="4" stroke={light ? "#F5F0E8" : "#1C1C1C"} strokeWidth="1" />
        </svg>
      </div>

      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 p-8 md:p-10 max-w-2xl glass border border-white/10 shadow-2xl rounded-sm">
        <p className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.3em] mb-4 text-kaaj-gold drop-shadow-md">
          {tag}
        </p>
        <h3 className={`font-serif leading-tight mb-8 drop-shadow-xl ${large ? "text-4xl md:text-5xl lg:text-6xl" : "text-2xl"} text-white`}>
          {title}
        </h3>
        <div className="mt-2 flex items-center gap-3 font-sans text-xs md:text-[11px] uppercase tracking-[0.2em] text-white drop-shadow-md">
          <span className="border-b border-kaaj-gold/60 pb-1 hover:border-kaaj-gold transition-colors">Explore Collection</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
            className="group-hover:translate-x-2 transition-transform duration-500 text-kaaj-gold">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </>
  );
}
