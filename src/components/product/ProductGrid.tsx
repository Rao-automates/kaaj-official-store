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
        <div className="max-w-sm mx-auto space-y-6">
          <div className="flex justify-center opacity-20">
            <div className="w-16 h-px bg-kaaj-charcoal/50" />
          </div>
          <p className="font-serif text-3xl text-kaaj-charcoal">
            {emptyMessage || "New works arriving soon."}
          </p>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-kaaj-charcoal/50 leading-loose">
            Our ateliers are crafting something exquisite. Follow us on Instagram for updates.
          </p>
          <Link
            href="/shop"
            className="inline-block mt-4 font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal border-b border-kaaj-charcoal/30 pb-2 hover:border-kaaj-gold transition-colors duration-500"
          >
            Browse Archives
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-x-4 gap-y-16 md:gap-x-6 md:gap-y-24",
        columnClasses[columns],
        className
      )}
    >
      {products.map((product, idx) => (
        <ProductCard key={product.id} product={product} priority={idx < 4} />
      ))}
    </div>
  );
}
