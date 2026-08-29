"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { gqlFetch } from "@/lib/graphql-client";
import { GET_SEARCH_RESULTS } from "@/lib/queries";
import type { ProductsQueryResponse } from "@/lib/types";
import ProductGrid from "@/components/product/ProductGrid";
import Link from "next/link";
import Image from "next/image";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const rawQuery = searchParams.get("q");
  const query = rawQuery || "";
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      if (!query) {
        setProducts([]);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await gqlFetch<ProductsQueryResponse>(GET_SEARCH_RESULTS, {
          search: query,
          first: 24,
        });
        setProducts(data?.products?.nodes ?? []);
      } catch (err) {
        console.error("[Search] fetch error:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-kaaj-cream">
      {/* Search Header */}
      <div className="bg-kaaj-cream pt-40 pb-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-sans text-[clamp(2rem,6vw,4rem)] leading-[1] text-kaaj-charcoal tracking-tight mb-4">
            {query ? (
              <>
                Results for <span className="text-kaaj-charcoal/70">"{query}"</span>
              </>
            ) : (
              "What are you looking for?"
            )}
          </h1>
          {query && !loading && (
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-kaaj-charcoal/70 mt-6">
              {products.length} product{products.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-kaaj-charcoal/20 border-t-kaaj-charcoal rounded-full animate-spin mx-auto"></div>
          </div>
        ) : products.length > 0 ? (
          <ProductGrid products={products} columns={4} />
        ) : (
          <div className="text-center py-20 max-w-lg mx-auto">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="mx-auto text-kaaj-charcoal/70 mb-6"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <h2 className="font-sans text-2xl text-kaaj-charcoal mb-4">
              No results found
            </h2>
            <p className="font-sans text-sm text-kaaj-muted mb-8">
              We couldn't find any products matching "{query}". Try checking your spelling or searching for a broader term like "Lawn" or "Pret".
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center border border-[#252525] text-[#252525] hover:bg-[#252525] hover:text-white transition-colors duration-300 px-8 py-3 font-sans text-[10px] uppercase tracking-[0.2em]"
            >
              Back to Shop
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-kaaj-cream flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-kaaj-charcoal/20 border-t-kaaj-charcoal rounded-full animate-spin"></div>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
