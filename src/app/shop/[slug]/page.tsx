import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { gqlFetch } from "@/lib/graphql-client";
import { GET_PRODUCT_BY_SLUG, GET_RELATED_PRODUCTS } from "@/lib/queries";
import type {
  ProductQueryResponse,
  ProductsQueryResponse,
} from "@/lib/types";
import ProductDetailClient from "./ProductDetailClient";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

async function getProduct(slug: string) {
  try {
    const data = await gqlFetch<ProductQueryResponse>(GET_PRODUCT_BY_SLUG, {
      slug,
    });
    return data?.product ?? null;
  } catch (err) {
    console.error("[PDP] fetch error:", err);
    return null;
  }
}

async function getRelatedProducts(
  categorySlugs: string[],
  excludeId: number
) {
  try {
    const data = await gqlFetch<ProductsQueryResponse>(GET_RELATED_PRODUCTS, {
      categoryIn: categorySlugs,
      notIn: [excludeId],
    });
    return data?.products?.nodes ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description:
      product.shortDescription
        ? product.shortDescription.replace(/<[^>]*>/g, "").slice(0, 160)
        : `Shop ${product.name} from Kaaj Official's exclusive collection.`,
    openGraph: {
      images: product.image?.sourceUrl ? [product.image.sourceUrl] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const categorySlugs =
    product.productCategories?.nodes?.map((c) => c.slug) ?? [];
  const relatedProducts = await getRelatedProducts(
    categorySlugs,
    product.databaseId
  );

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
