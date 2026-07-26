// ── All WPGraphQL queries for the Kaaj Official storefront ───────────────────

// ── Product Fragment ─────────────────────────────────────────────────────────
const PRODUCT_CARD_FRAGMENT = `
  fragment ProductCard on Product {
    id
    databaseId
    name
    slug
    type
    status
    onSale
    image {
      sourceUrl
      altText
    }
    productCategories {
      nodes {
        id
        name
        slug
      }
    }
    ... on SimpleProduct {
      price
      regularPrice
      salePrice
      stockStatus
    }
    ... on VariableProduct {
      price
      regularPrice
      salePrice
      stockStatus
    }
  }
`;

// ── Get Products (listing / homepage) ────────────────────────────────────────
export const GET_PRODUCTS = `
  ${PRODUCT_CARD_FRAGMENT}
  query GetProducts($first: Int = 12, $after: String) {
    products(
      first: $first
      after: $after
      where: { status: "publish" }
    ) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// ── Get Search Results ────────────────────────────────────────────────────────
export const GET_SEARCH_RESULTS = `
  ${PRODUCT_CARD_FRAGMENT}
  query GetSearchResults($search: String!, $first: Int = 24, $after: String) {
    products(
      first: $first
      after: $after
      where: { status: "publish", search: $search }
    ) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// ── Get Featured / On-Sale Products ─────────────────────────────────────────
export const GET_FEATURED_PRODUCTS = `
  ${PRODUCT_CARD_FRAGMENT}
  query GetFeaturedProducts {
    products(
      first: 8
      where: { status: "publish", featured: true }
    ) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// ── Get Products by Category Slug ────────────────────────────────────────────
export const GET_PRODUCTS_BY_CATEGORY = `
  ${PRODUCT_CARD_FRAGMENT}
  query GetProductsByCategory($slug: [String!]!, $first: Int = 12, $after: String) {
    products(
      first: $first
      after: $after
      where: { status: "publish", categoryIn: $slug }
    ) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// ── Get Single Product Detail ─────────────────────────────────────────────────
export const GET_PRODUCT_BY_SLUG = `
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      databaseId
      name
      slug
      type
      status
      onSale
      description
      shortDescription
      image {
        sourceUrl
        altText
      }
      galleryImages {
        nodes {
          sourceUrl
          altText
        }
      }
      productCategories {
        nodes {
          id
          name
          slug
        }
      }
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
        stockStatus
      }
      ... on VariableProduct {
        price
        regularPrice
        salePrice
        stockStatus
        attributes {
          nodes {
            name
            options
            variation
          }
        }
        variations(first: 50) {
          nodes {
            id
            databaseId
            name
            stockStatus
            price
            regularPrice
            salePrice
            image {
              sourceUrl
              altText
            }
            attributes {
              nodes {
                name
                value
              }
            }
          }
        }
      }
    }
  }
`;

// ── Get Related Products ──────────────────────────────────────────────────────
export const GET_RELATED_PRODUCTS = `
  ${PRODUCT_CARD_FRAGMENT}
  query GetRelatedProducts($categoryIn: [String!]!, $notIn: [Int]) {
    products(
      first: 4
      where: {
        status: "publish"
        categoryIn: $categoryIn
        exclude: $notIn
      }
    ) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// ── Get All Categories ────────────────────────────────────────────────────────
export const GET_CATEGORIES = `
  query GetCategories {
    productCategories(first: 20, where: { hideEmpty: true }) {
      nodes {
        id
        name
        slug
        count
        image {
          sourceUrl
          altText
        }
      }
    }
  }
`;

// ── Get All Product Slugs (for static export) ─────────────────────────────────
export const GET_ALL_PRODUCT_SLUGS = `
  query GetAllProductSlugs {
    products(first: 100) {
      nodes {
        slug
      }
    }
  }
`;

// ── Get All Category Slugs (for static export) ────────────────────────────────
export const GET_ALL_CATEGORY_SLUGS = `
  query GetAllCategorySlugs {
    productCategories(first: 50) {
      nodes {
        slug
      }
    }
  }
`;
