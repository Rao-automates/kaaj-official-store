import type { Metadata } from "next";
import { gqlFetch } from "@/lib/graphql-client";
import { 
  GET_PRODUCTS_BY_CATEGORY, 
  GET_CATEGORIES,
  GET_ALL_CATEGORY_SLUGS 
} from "@/lib/queries";
import type { ProductsQueryResponse, CategoriesQueryResponse } from "@/lib/types";
import ProductGrid from "@/components/product/ProductGrid";
import CategoryPill from "@/components/ui/CategoryPill";
import Image from "next/image";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  pret: {
    title: "Pret — Ready-to-Wear",
    description: "Shop KAAJ’s ready-to-wear Pret collection. Beautifully crafted everyday eastern wear.",
  },
  unstitched: {
    title: "Unstitched Collection",
    description: "Explore unstitched fabric sets — choose your style, tailor your fit.",
  },
  "luxury-lawn": {
    title: "Luxury Lawn",
    description: "Premium lawn suits with intricate embroidery and fine fabric. The epitome of summer elegance.",
  },
  formals: {
    title: "Formal Wear",
    description: "Occasion-ready formal wear for weddings, events, and celebrations.",
  },
};

async function getCategoryProducts(slug: string) {
  try {
    const data = await gqlFetch<ProductsQueryResponse>(GET_PRODUCTS_BY_CATEGORY, {
      slug: [slug],
      first: 24,
    });
    return data?.products?.nodes ?? [];
  } catch (err) {
    console.error("[Category] fetch error:", err);
    return [];
  }
}

async function getAllCategories() {
  try {
    const data = await gqlFetch<CategoriesQueryResponse>(GET_CATEGORIES);
    return data?.productCategories?.nodes ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = CATEGORY_META[slug];
  const name = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: meta?.title ?? name,
    description: meta?.description ?? `Shop ${name} from KAAJ.`,
    alternates: {
      canonical: `/categories/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  try {
    const data = await gqlFetch<{ productCategories: { nodes: { slug: string }[] } }>(
      GET_ALL_CATEGORY_SLUGS
    );
    return (data?.productCategories?.nodes ?? []).map((c) => ({
      slug: c.slug,
    }));
  } catch (err) {
    console.error("Failed to generate static params for categories", err);
    return [];
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [products, rawCategories] = await Promise.all([
    getCategoryProducts(slug),
    getAllCategories(),
  ]);

  const allCategories = rawCategories.filter((c: any) => c.slug !== "uncategorized");

  const meta = CATEGORY_META[slug];
  const categoryData = rawCategories.find((c: any) => c.slug === slug);
  let displayName = categoryData?.name || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  
  if (slug === 'aks') {
    displayName = 'عکس';
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://kaajofficial.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Categories",
        item: "https://kaajofficial.com/categories",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: displayName,
        item: `https://kaajofficial.com/categories/${slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-kaaj-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {/* Page Header */}
      <div className="bg-kaaj-cream pt-40 pb-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-sans text-[clamp(2.5rem,8vw,5rem)] leading-[0.9] text-kaaj-charcoal tracking-tighter mb-4">
            {displayName}.
          </h1>
          {meta?.description && (
            <p className="font-sans text-sm text-kaaj-charcoal/70 max-w-md mx-auto leading-relaxed">
              {meta.description}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters Row */}
        <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-8 mb-16 pb-8 border-b border-kaaj-charcoal/10">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 max-w-3xl">
            <CategoryPill name="All" href="/shop" active={false} />
            {allCategories.map((cat) => (
              <CategoryPill
                key={cat.slug}
                name={cat.name}
                slug={cat.slug}
                active={cat.slug === slug}
                count={cat.count}
              />
            ))}
          </div>
        </div>

        {/* Count */}
        {products.length > 0 && (
          <p className="font-sans text-xs text-kaaj-muted mb-6">
            {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Products */}
        <ProductGrid
          products={products}
          columns={4}
          emptyMessage={`No ${displayName} products yet — check back soon.`}
        />
      </div>
    </div>
  );
}
