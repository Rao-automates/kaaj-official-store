import type { Metadata } from "next";
import { gqlFetch } from "@/lib/graphql-client";
import { GET_SEARCH_RESULTS } from "@/lib/queries";
import type { ProductsQueryResponse } from "@/lib/types";
import ProductGrid from "@/components/product/ProductGrid";
import Link from "next/link";

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: "Search Results — Kaaj Official",
  description: "Search the Kaaj Official catalog.",
};

async function getSearchResults(query: string) {
  if (!query) return [];
  try {
    const data = await gqlFetch<ProductsQueryResponse>(GET_SEARCH_RESULTS, {
      search: query,
      first: 24,
    });
    return data?.products?.nodes ?? [];
  } catch (err) {
    console.error("[Search] fetch error:", err);
    return [];
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const rawQuery = resolvedParams.q;
  const query = typeof rawQuery === "string" ? rawQuery : "";
  
  const products = await getSearchResults(query);

  return (
    <div className="min-h-screen bg-kaaj-cream">
      {/* Search Header */}
      <div className="bg-kaaj-deep text-kaaj-cream pt-40 pb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
        <div className="relative z-10 px-4">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-gold mb-4">
            — Search Results
          </p>
          <h1 className="font-serif text-3xl md:text-display-sm text-kaaj-cream max-w-3xl mx-auto leading-tight">
            {query ? (
              <>
                Showing results for <span className="text-kaaj-gold">"{query}"</span>
              </>
            ) : (
              "What are you looking for?"
            )}
          </h1>
          {query && (
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-kaaj-cream/60 mt-6">
              {products.length} product{products.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {products.length > 0 ? (
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
              className="mx-auto text-kaaj-charcoal/30 mb-6"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <h2 className="font-serif text-2xl text-kaaj-charcoal mb-4">
              No results found
            </h2>
            <p className="font-sans text-sm text-kaaj-muted mb-8">
              We couldn't find any products matching "{query}". Try checking your spelling or searching for a broader term like "Lawn" or "Pret".
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center border border-kaaj-charcoal text-kaaj-charcoal hover:bg-kaaj-charcoal hover:text-kaaj-cream transition-colors duration-300 px-8 py-3 font-sans text-[10px] uppercase tracking-[0.2em]"
            >
              Back to Shop
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
