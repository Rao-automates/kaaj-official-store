// ── Types for WPGraphQL / WooCommerce responses ─────────────────────────────

export interface ProductImage {
  sourceUrl: string;
  altText: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  count?: number;
  image?: ProductImage | null;
}

export interface ProductAttribute {
  name: string;
  value: string;
}

export interface ProductVariation {
  id: string;
  name: string;
  databaseId: number;
  stockStatus: "IN_STOCK" | "OUT_OF_STOCK" | "ON_BACKORDER";
  price: string;
  regularPrice: string;
  salePrice: string | null;
  image?: ProductImage | null;
  attributes: {
    nodes: ProductAttribute[];
  };
}

export interface Product {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  type: "SIMPLE" | "VARIABLE" | "GROUPED" | "EXTERNAL";
  status: string;
  description: string;
  shortDescription: string;
  price: string;
  regularPrice: string;
  salePrice: string | null;
  onSale: boolean;
  stockStatus: "IN_STOCK" | "OUT_OF_STOCK" | "ON_BACKORDER";
  image: ProductImage | null;
  galleryImages: {
    nodes: ProductImage[];
  };
  productCategories: {
    nodes: ProductCategory[];
  };
  variations?: {
    nodes: ProductVariation[];
  };
  // WooCommerce attributes (for variable products)
  attributes?: {
    nodes: {
      name: string;
      options: string[];
      variation: boolean;
    }[];
  };
}

// ── Cart Types ───────────────────────────────────────────────────────────────

export interface CartItem {
  id: string; // product id + variant id combo
  productId: string;
  variationId?: string;
  name: string;
  slug: string;
  price: number; // numeric PKR value
  quantity: number;
  image: ProductImage | null;
  selectedAttributes: Record<string, string>;
  stockStatus: "IN_STOCK" | "OUT_OF_STOCK" | "ON_BACKORDER";
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QTY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

export interface CartState {
  items: CartItem[];
}

// ── Order Types ──────────────────────────────────────────────────────────────

export interface OrderAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface CheckoutFormData extends OrderAddress {
  notes?: string;
}

// ── GraphQL Response Wrappers ────────────────────────────────────────────────

export interface ProductsQueryResponse {
  products: {
    nodes: Product[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

export interface ProductQueryResponse {
  product: Product | null;
}

export interface CategoriesQueryResponse {
  productCategories: {
    nodes: ProductCategory[];
  };
}
