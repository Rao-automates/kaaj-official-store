import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges Tailwind classes safely, resolving conflicts */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a WooCommerce price string (e.g. "4500" or "4,500.00") to PKR display.
 * Returns "₨ 4,500" style strings.
 */
export function formatPKR(priceStr: string | null | undefined): string {
  if (!priceStr) return "—";
  
  // If the price contains an <ins> tag, use that as the active price
  let activeStr = priceStr;
  const insMatch = priceStr.match(/<ins[^>]*>(.*?)<\/ins>/i);
  if (insMatch) {
    activeStr = insMatch[1];
  }

  // Strip HTML tags
  const stripped = activeStr.replace(/<[^>]*>/g, "");
  
  // Find the first sequence of digits, commas, and periods
  const match = stripped.match(/[0-9]+([.,][0-9]+)*/);
  if (!match) return "—";

  // Remove commas and parse
  const cleaned = match[0].replace(/,/g, "");
  const num = parseFloat(cleaned);
  if (isNaN(num)) return "—";
  
  return `₨ ${num.toLocaleString("en-PK", { maximumFractionDigits: 0 })}`;
}

/**
 * Parse a WooCommerce price string to a plain number (PKR).
 */
export function parsePKR(priceStr: string | null | undefined): number {
  if (!priceStr) return 0;
  
  let activeStr = priceStr;
  const insMatch = priceStr.match(/<ins[^>]*>(.*?)<\/ins>/i);
  if (insMatch) {
    activeStr = insMatch[1];
  }

  const stripped = activeStr.replace(/<[^>]*>/g, "");
  const match = stripped.match(/[0-9]+([.,][0-9]+)*/);
  if (!match) return 0;

  const cleaned = match[0].replace(/,/g, "");
  return parseFloat(cleaned) || 0;
}

/** Truncate text to a maximum number of characters */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

/** Strip HTML tags from a string */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

/** Generate a unique cart item ID from product + variant attributes */
export function generateCartId(
  productId: string,
  attributes: Record<string, string>
): string {
  const attrStr = Object.entries(attributes)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join("|");
  return `${productId}__${attrStr}`;
}

/** Get a human-readable label for a product variant */
export function getVariantLabel(attributes: Record<string, string>): string {
  return Object.values(attributes).join(" / ");
}

/** Check if a product is on sale */
export function isOnSale(product: {
  salePrice?: string | null;
  onSale?: boolean;
}): boolean {
  return !!(product.onSale || product.salePrice);
}

/** Calculate discount percentage */
export function discountPercent(
  regular: string | null | undefined,
  sale: string | null | undefined
): number | null {
  const reg = parsePKR(regular);
  const sal = parsePKR(sale);
  if (!reg || !sal || sal >= reg) return null;
  return Math.round(((reg - sal) / reg) * 100);
}

/** Slugify a string for URL use */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
