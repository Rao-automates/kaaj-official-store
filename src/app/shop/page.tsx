import type { Metadata } from "next";
import { Suspense } from "react";
import ProductGrid from "@/components/product/ProductGrid";
import CategoryPill from "@/components/ui/CategoryPill";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { gqlFetch } from "@/lib/graphql-client";
import { GET_PRODUCTS, GET_CATEGORIES } from "@/lib/queries";
import type { ProductsQueryResponse, CategoriesQueryResponse } from "@/lib/types";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shop All Collections",
  description:
    "Browse Kaaj Official's complete collection of Pret, Unstitched, Luxury Lawn, and Formal Pakistani women's wear.",
};

export const revalidate = 60;

interface ShopPageProps {
  searchParams: Promise<{ category?: string; sort?: string; page?: string }>;
}

async function getShopProducts(sort?: string) {
  try {
    const data = await gqlFetch<ProductsQueryResponse>(GET_PRODUCTS, { first: 24 });
    let products = data?.products?.nodes ?? [];

    if (sort === "price-asc") {
      products = [...products].sort((a, b) => {
        const pa = parseFloat((a.price || "0").replace(/[^0-9.]/g, ""));
        const pb = parseFloat((b.price || "0").replace(/[^0-9.]/g, ""));
        return pa - pb;
      });
    } else if (sort === "price-desc") {
      products = [...products].sort((a, b) => {
        const pa = parseFloat((a.price || "0").replace(/[^0-9.]/g, ""));
        const pb = parseFloat((b.price || "0").replace(/[^0-9.]/g, ""));
        return pb - pa;
      });
    }

    return products;
  } catch (err) {
    console.error("[Shop] fetch error:", err);
    return [];
  }
}

async function getCategories() {
  try {
    const data = await gqlFetch<CategoriesQueryResponse>(GET_CATEGORIES);
    return data?.productCategories?.nodes ?? [];
  } catch {
    return [];
  }
}

const SORT_OPTIONS = [
  { value: "", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const currentSort = params.sort || "";

  const [products, categories] = await Promise.all([
    getShopProducts(currentSort),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-kaaj-cream">
      {/* Page Header */}
      <div className="bg-kaaj-deep text-kaaj-cream pt-40 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
        <div className="relative z-10">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-gold mb-4">
            — Our Collections
          </p>
          <h1 className="font-serif text-display-md text-kaaj-cream">Shop All</h1>
          <p className="font-sans text-sm text-kaaj-cream/60 mt-3 max-w-md mx-auto">
            Discover the complete Kaaj Official range — from everyday pret to occasion-ready formals.
          </p>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            <CategoryPill name="All" slug="" />
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
                <Link
                  key={opt.value}
                  href={opt.value ? `/shop?sort=${opt.value}` : "/shop"}
                  className={`px-3 py-1.5 font-sans text-[10px] uppercase tracking-wide border transition-colors duration-200 ${
                    currentSort === opt.value
                      ? "bg-kaaj-charcoal text-kaaj-cream border-kaaj-charcoal"
                      : "bg-transparent text-kaaj-charcoal border-kaaj-border hover:border-kaaj-charcoal"
                  }`}
                >
                  {opt.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Result count */}
        <p className="font-sans text-xs text-kaaj-muted mb-6">
          {products.length > 0
            ? `${products.length} product${products.length === 1 ? "" : "s"}`
            : ""}
        </p>

        {/* Grid */}
        <Suspense fallback={<ProductGridSkeleton count={12} />}>
          <ProductGrid products={products} columns={4} />
        </Suspense>
      </div>
    </div>
  );
}
