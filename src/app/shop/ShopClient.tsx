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
        setCategories(
          (catData?.productCategories?.nodes ?? []).filter((c: any) => c.slug !== "uncategorized")
        );
      } catch (err) {
        console.error("Failed to fetch shop data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [currentSort]);

  return (
    <div className="min-h-screen bg-transparent pt-32 md:pt-48 pb-32">
      {/* Page Header - Editorial */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-32">
        <div className="flex flex-col items-start max-w-4xl">
          <h1 className="font-serif text-[clamp(3rem,10vw,7rem)] leading-[0.9] text-kaaj-charcoal tracking-tighter -ml-1 md:-ml-2 mb-8">
            Shop All.
          </h1>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-kaaj-charcoal/70 max-w-xl leading-relaxed">
            Discover the complete KAAJ range — an exploration of heritage artistry through modern silhouettes.
          </p>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters Row */}
        <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-8 mb-16 pb-8 border-b border-kaaj-charcoal/10">
          
          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 max-w-3xl">
            <CategoryPill name="All" href="/shop" active={true} />
            {categories.map((cat) => (
              <CategoryPill key={cat.slug} name={cat.name} slug={cat.slug} count={cat.count} />
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal/70">
              Sort
            </span>
            <div className="flex gap-2">
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
                  className={`px-4 py-2 font-sans text-[9px] uppercase tracking-[0.2em] transition-colors duration-500 border ${
                    currentSort === opt.value
                      ? "bg-kaaj-olive text-kaaj-cream border-kaaj-olive"
                      : "bg-transparent text-kaaj-charcoal border-kaaj-charcoal/20 hover:border-kaaj-olive"
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
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-kaaj-charcoal/70 mb-8">
            {products.length > 0
              ? `Showing ${products.length} works`
              : "0 works"}
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
