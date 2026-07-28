import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { gqlFetch } from "@/lib/graphql-client";
import { 
  GET_PRODUCT_BY_SLUG, 
  GET_RELATED_PRODUCTS,
  GET_ALL_PRODUCT_SLUGS 
} from "@/lib/queries";
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
    alternates: {
      canonical: `/shop/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  try {
    const data = await gqlFetch<{ products: { nodes: { slug: string }[] } }>(
      GET_ALL_PRODUCT_SLUGS
    );
    return (data?.products?.nodes ?? []).map((p) => ({
      slug: p.slug,
    }));
  } catch (err) {
    console.error("Failed to generate static params for products", err);
    return [];
  }
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

  const numericPrice = parseFloat(product.price?.replace(/[^\d.-]/g, '') || '0');

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image?.sourceUrl ? [product.image.sourceUrl] : [],
    description: product.shortDescription?.replace(/<[^>]*>/g, "") || product.name,
    offers: {
      "@type": "Offer",
      url: `https://kaajofficial.com/shop/${product.slug}`,
      priceCurrency: "PKR",
      price: numericPrice,
      availability: product.stockStatus === "IN_STOCK" 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "K A A J"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
