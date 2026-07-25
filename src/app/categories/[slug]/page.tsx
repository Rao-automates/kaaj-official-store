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

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  pret: {
    title: "Pret — Ready-to-Wear",
    description: "Shop Kaaj Official's ready-to-wear Pret collection. Beautifully crafted everyday eastern wear.",
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
    description: meta?.description ?? `Shop ${name} from Kaaj Official.`,
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
  const [products, allCategories] = await Promise.all([
    getCategoryProducts(slug),
    getAllCategories(),
  ]);

  const meta = CATEGORY_META[slug];
  const displayName = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="min-h-screen bg-kaaj-cream">
      {/* Category Hero */}
      <div className="bg-kaaj-deep text-kaaj-cream pt-40 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
        <div className="relative z-10">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-gold mb-4">
            — Collections
          </p>
          <h1 className="font-serif text-display-md text-kaaj-cream">{displayName}</h1>
          {meta?.description && (
            <p className="font-sans text-sm text-kaaj-cream/60 mt-3 max-w-md mx-auto">
              {meta.description}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category nav */}
        <div className="flex flex-wrap gap-2 mb-10">
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
