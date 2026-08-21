import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "K A A J",
  description:
    "KAAJ — Discover KAAJ’s exquisite collections. Pakistani women’s fashion crafted with heritage and contemporary elegance. Shop KAAJ online.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "K A A J",
    description:
      "Discover KAAJ’s exquisite collections. Shop Pakistani women’s fashion online.",
    url: "https://kaajofficial.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "K A A J",
    description:
      "Shop KAAJ’s exquisite collections online.",
  },
};

import { gqlFetch } from "@/lib/graphql-client";
import {
  GET_PRODUCTS,
  GET_FEATURED_PRODUCTS,
  GET_CATEGORIES,
} from "@/lib/queries";
import type {
  ProductsQueryResponse,
  CategoriesQueryResponse,
} from "@/lib/types";

export default async function HomePage() {
  let featuredProducts: any[] = [];
  let newArrivals: any[] = [];
  let categories: any[] = [];

  try {
    const [featured, arrivals, cats] = await Promise.all([
      gqlFetch<ProductsQueryResponse>(GET_FEATURED_PRODUCTS),
      gqlFetch<ProductsQueryResponse>(GET_PRODUCTS, { first: 8 }),
      gqlFetch<CategoriesQueryResponse>(GET_CATEGORIES),
    ]);

    featuredProducts = featured?.products?.nodes ?? [];
    newArrivals = arrivals?.products?.nodes ?? [];
    categories = (cats?.productCategories?.nodes ?? []).filter((c: any) => c.slug !== "uncategorized");
  } catch (err) {
    console.error("[SSR] Homepage fetch error:", err);
  }

  return (
    <HomeClient 
      initialFeatured={featuredProducts} 
      initialArrivals={newArrivals} 
      initialCategories={categories} 
    />
  );
}
