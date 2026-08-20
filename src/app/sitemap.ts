import { MetadataRoute } from 'next'
import { gqlFetch } from "@/lib/graphql-client";
import { GET_PRODUCTS, GET_CATEGORIES } from "@/lib/queries";
import type { ProductsQueryResponse, CategoriesQueryResponse } from "@/lib/types";

const URL = 'https://kaajofficial.com'

export const revalidate = 3600; // regenerate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let products: any[] = [];
  try {
    const data = await gqlFetch<ProductsQueryResponse>(GET_PRODUCTS, { first: 100 });
    products = data?.products?.nodes ?? [];
  } catch (err) {
    console.error("Sitemap product fetch error", err);
  }

  let categories: any[] = [];
  try {
    const data = await gqlFetch<CategoriesQueryResponse>(GET_CATEGORIES);
    categories = (data?.productCategories?.nodes ?? []).filter((c: any) => c.slug !== "uncategorized");
  } catch (err) {
    console.error("Sitemap category fetch error", err);
  }

  // Static pages — highest priority crawl targets
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: URL,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${URL}/shop`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${URL}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${URL}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${URL}/size-guide`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${URL}/returns`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${URL}/track-order`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${URL}/privacy`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.1,
    },
    {
      url: `${URL}/terms`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.1,
    },
  ];

  // Product pages — fix: was /product/, actual route is /shop/
  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${URL}/shop/${product.slug}`,
    lastModified: product.modified || new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Category pages
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${URL}/categories/${category.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
  ]
}
