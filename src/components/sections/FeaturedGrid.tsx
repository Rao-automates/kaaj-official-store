import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/product/ProductCard";
import FadeIn from "@/components/ui/FadeIn";
import type { Product } from "@/lib/types";

interface FeaturedGridProps {
  products: Product[];
}

export default function FeaturedGrid({ products }: FeaturedGridProps) {
  const hasProducts = products && products.length > 0;

  if (!hasProducts) return null;

  return (
    <section className="py-24 md:py-48 bg-transparent">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Editorial minimal */}
        <FadeIn>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-24 md:mb-40 gap-8">
            <div className="max-w-2xl">
              <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-gold mb-6 flex items-center gap-4">
                <span className="w-8 h-px bg-kaaj-gold" /> Curated
              </p>
              <h2 className="font-serif text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] text-kaaj-charcoal tracking-tighter -ml-1">
                Featured Works.
              </h2>
            </div>
            
            <Link
              href="/shop"
              className="group inline-flex items-center gap-4 pb-2 border-b border-kaaj-charcoal/30 hover:border-kaaj-gold transition-colors duration-500"
            >
              <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal group-hover:text-kaaj-gold transition-colors duration-500">
                View All Works
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-kaaj-charcoal group-hover:text-kaaj-gold transition-colors group-hover:translate-x-2 duration-500 transform-gpu will-change-transform">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>
        </FadeIn>

        {/* Floating Editorial Grid */}
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-24 md:gap-y-0">
            {products.slice(0, 4).map((product, idx) => {
              // Asymmetrical grid logic mapping
              const gridClasses = [
                "md:col-span-6 lg:col-span-5 md:col-start-1 lg:col-start-2",
                "md:col-span-5 lg:col-span-4 md:col-start-8 lg:col-start-8 md:mt-48",
                "md:col-span-7 lg:col-span-6 md:col-start-2 lg:col-start-3 md:mt-32",
                "md:col-span-4 lg:col-span-4 md:col-start-9 lg:col-start-9 md:-mt-24",
              ][idx % 4];

              return (
                <div key={product.id} className={`col-span-1 ${gridClasses}`}>
                  <ProductCard product={product} priority={idx < 2} />
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
