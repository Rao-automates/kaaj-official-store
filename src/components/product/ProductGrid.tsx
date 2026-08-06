"use client";

import ProductCard from "./ProductCard";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  columns?: 2 | 3 | 4;
  className?: string;
  emptyMessage?: string;
}

const columnClasses: Record<2 | 3 | 4, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
};

export default function ProductGrid({
  products,
  loading = false,
  columns = 4,
  className,
  emptyMessage,
}: ProductGridProps) {
  if (loading) {
    return <ProductGridSkeleton count={columns === 2 ? 4 : columns === 3 ? 6 : 8} />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="py-24 text-center">
        <div className="max-w-sm mx-auto space-y-4">
          {/* Decorative kaaj motif */}
          <div className="flex justify-center opacity-20">
            <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
              <path
                d="M24 4C24 4 16 12 8 20C16 28 24 44 24 44C24 44 32 28 40 20C32 12 24 4 24 4Z"
                stroke="#1C1C1C"
                strokeWidth="1.5"
              />
              <circle cx="24" cy="20" r="4" stroke="#1C1C1C" strokeWidth="1.5" />
            </svg>
          </div>
          <p className="font-serif text-2xl text-kaaj-charcoal">
            {emptyMessage || "New arrivals coming soon"}
          </p>
          <p className="font-sans text-sm text-kaaj-muted leading-relaxed">
            Our artisans are crafting something exquisite. Follow us on Instagram for updates.
          </p>
          <Link
            href="/shop"
            className="inline-block mt-4 font-sans text-xs uppercase tracking-[0.18em] text-kaaj-charcoal border-b border-kaaj-charcoal pb-0.5 hover:text-kaaj-gold transition-colors duration-200"
          >
            Browse all collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        "gap-y-16 md:gap-x-1 md:gap-y-20 w-full",
        "[&>*:nth-child(5n+1)]:md:col-span-2 [&>*:nth-child(5n+1)]:lg:col-span-2",
        className
      )}
    >
      {products.map((product, idx) => (
        <ProductCard key={product.id} product={product} priority={idx < 4} />
      ))}
    </div>
  );
}
