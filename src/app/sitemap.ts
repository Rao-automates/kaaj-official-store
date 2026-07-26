import { MetadataRoute } from 'next'
import { gqlFetch } from "@/lib/graphql-client";
import { GET_PRODUCTS, GET_CATEGORIES } from "@/lib/queries";
import type { ProductsQueryResponse, CategoriesQueryResponse } from "@/lib/types";

const URL = 'https://kaajofficial.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let products: any[] = [];
  try {
    // Fetch top 100 products for sitemap
    const data = await gqlFetch<ProductsQueryResponse>(GET_PRODUCTS, { first: 100 });
    products = data?.products?.nodes ?? [];
  } catch (err) {
    console.error("Sitemap product fetch error", err);
  }

  let categories: any[] = [];
  try {
    const data = await gqlFetch<CategoriesQueryResponse>(GET_CATEGORIES);
    categories = data?.productCategories?.nodes ?? [];
  } catch (err) {
    console.error("Sitemap category fetch error", err);
  }

  const productRoutes = products.map((product) => ({
    url: `${URL}/product/${product.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${URL}/categories/${category.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
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
    ...categoryRoutes,
    ...productRoutes,
  ]
}
