"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { gqlFetch } from "@/lib/graphql-client";
import { GET_PRODUCTS, GET_CATEGORIES } from "@/lib/queries";
import type { ProductsQueryResponse, CategoriesQueryResponse } from "@/lib/types";
import ProductGrid from "@/components/product/ProductGrid";
import CategoryPill from "@/components/ui/CategoryPill";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import Image from "next/image";

const SORT_OPTIONS = [
  { value: "", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function ShopClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentSort = searchParams.get("sort") || "";

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [prodData, catData] = await Promise.all([
          gqlFetch<ProductsQueryResponse>(GET_PRODUCTS, { first: 24 }),
          gqlFetch<CategoriesQueryResponse>(GET_CATEGORIES),
        ]);

        let fetchedProducts = prodData?.products?.nodes ?? [];
        if (currentSort === "price-asc") {
          fetchedProducts = [...fetchedProducts].sort((a, b) => {
            const pa = parseFloat((a.price || "0").replace(/[^0-9.]/g, ""));
            const pb = parseFloat((b.price || "0").replace(/[^0-9.]/g, ""));
            return pa - pb;
          });
        } else if (currentSort === "price-desc") {
          fetchedProducts = [...fetchedProducts].sort((a, b) => {
            const pa = parseFloat((a.price || "0").replace(/[^0-9.]/g, ""));
            const pb = parseFloat((b.price || "0").replace(/[^0-9.]/g, ""));
            return pb - pa;
          });
        }

        setProducts(fetchedProducts);
        setCategories(catData?.productCategories?.nodes ?? []);
      } catch (err) {
        console.error("Failed to fetch shop data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [currentSort]);

  return (
    <div className="min-h-screen bg-kaaj-cream">
      {/* Page Header */}
      <div className="bg-kaaj-deep text-kaaj-cream pt-40 pb-20 text-center relative overflow-hidden">
        <Image
          src="/hero.png"
          alt="KAAJ Collection"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center opacity-30 mix-blend-luminosity"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
        <div className="relative z-10">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-gold mb-4">
            — Our Collections
          </p>
          <h1 className="font-serif text-display-md text-kaaj-charcoal">Shop All</h1>
          <p className="font-sans text-sm text-kaaj-charcoal/70 mt-3 max-w-md mx-auto">
            Discover the complete KAAJ range — from everyday pret to occasion-ready formals.
          </p>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            <CategoryPill name="All" slug="" active={true} />
            {categories.map((cat) => (
              <CategoryPill key={cat.slug} name={cat.name} slug={cat.slug} count={cat.count} />
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-kaaj-muted">
              Sort:
            </span>
            <div className="flex gap-1.5">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams.toString());
                    if (opt.value) {
                      newParams.set("sort", opt.value);
                    } else {
                      newParams.delete("sort");
                    }
                    router.push(newParams.toString() ? `/shop?${newParams.toString()}` : "/shop");
                  }}
                  className={`px-3 py-1.5 font-sans text-[10px] uppercase tracking-wide border transition-colors duration-200 ${
                    currentSort === opt.value
                      ? "bg-kaaj-charcoal text-kaaj-cream border-kaaj-charcoal"
                      : "bg-transparent text-kaaj-charcoal border-kaaj-border hover:border-kaaj-charcoal"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result count */}
        {!loading && (
          <p className="font-sans text-xs text-kaaj-muted mb-6">
            {products.length > 0
              ? `${products.length} product${products.length === 1 ? "" : "s"}`
              : "0 products"}
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <ProductGridSkeleton count={12} />
        ) : (
          <ProductGrid products={products} columns={4} />
        )}
      </div>
    </div>
  );
}
