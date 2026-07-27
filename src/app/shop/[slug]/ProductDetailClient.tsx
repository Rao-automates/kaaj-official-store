"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import VariantSelector from "@/components/product/VariantSelector";
import SizeGuideModal from "@/components/product/SizeGuideModal";
import { sizeData } from "@/lib/constants";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProductGrid from "@/components/product/ProductGrid";
import {
  formatPKR,
  parsePKR,
  stripHtml,
  isOnSale,
  discountPercent,
  generateCartId,
  cn,
} from "@/lib/utils";
import type { Product, ProductVariation } from "@/lib/types";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [selectedAttrs, setSelectedAttrs] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [descOpen, setDescOpen] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  const isVariable = product.type === "VARIABLE";
  const attributes = product.attributes?.nodes ?? [];
  const variations = product.variations?.nodes ?? [];

  // Find the matching variation
  const matchingVariation = useMemo<ProductVariation | null>(() => {
    if (!isVariable || Object.keys(selectedAttrs).length === 0) return null;
    return (
      variations.find((v) => {
        return v.attributes.nodes.every((attr) => {
          const selected = selectedAttrs[attr.name];
          return !selected || selected === attr.value;
        });
      }) ?? null
    );
  }, [selectedAttrs, variations, isVariable]);

  // Price display
  const displayPrice = useMemo(() => {
    if (matchingVariation) return matchingVariation.salePrice || matchingVariation.price;
    return product.salePrice || product.price;
  }, [matchingVariation, product]);

  const displayRegularPrice = useMemo(() => {
    if (matchingVariation) return matchingVariation.regularPrice;
    return product.regularPrice;
  }, [matchingVariation, product]);

  const onSale = isOnSale({ salePrice: displayPrice, onSale: product.onSale });
  const discount = discountPercent(displayRegularPrice, displayPrice);

  // OOS logic
  const isOOS = useMemo(() => {
    if (matchingVariation) return matchingVariation.stockStatus === "OUT_OF_STOCK";
    if (isVariable) return false; // haven't selected yet
    return product.stockStatus === "OUT_OF_STOCK";
  }, [matchingVariation, isVariable, product.stockStatus]);

  const variantNotSelected = isVariable && Object.keys(selectedAttrs).length < attributes.filter((a) => a.variation).length;

  const handleAddToCart = () => {
    if (isOOS || variantNotSelected) return;
    addToCart({
      productId: product.id,
      variationId: matchingVariation?.id,
      name: product.name,
      slug: product.slug,
      price: parsePKR(displayPrice),
      quantity,
      image: matchingVariation?.image || product.image,
      selectedAttributes: selectedAttrs,
      stockStatus: isOOS ? "OUT_OF_STOCK" : "IN_STOCK",
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleOrderNow = () => {
    if (isOOS || variantNotSelected) return;
    addToCart({
      productId: product.id,
      variationId: matchingVariation?.id,
      name: product.name,
      slug: product.slug,
      price: parsePKR(displayPrice),
      quantity,
      image: matchingVariation?.image || product.image,
      selectedAttributes: selectedAttrs,
      stockStatus: isOOS ? "OUT_OF_STOCK" : "IN_STOCK",
    });
    router.push("/checkout");
  };

  const galleryImages = product.galleryImages?.nodes ?? [];
  const category = product.productCategories?.nodes?.[0];

  return (
    <>
      <div className="min-h-screen bg-kaaj-cream">
        {/* Header spacer block to support the transparent global header */}
        <div className="bg-kaaj-deep h-[100px] w-full" />

        {/* Breadcrumb */}
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.15em] text-kaaj-muted">
            <Link href="/" className="hover:text-kaaj-charcoal transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-kaaj-charcoal transition-colors">Shop</Link>
            {category && (
              <>
                <span>/</span>
                <Link href={`/categories/${category.slug}`} className="hover:text-kaaj-charcoal transition-colors">
                  {category.name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-kaaj-charcoal line-clamp-1">{product.name}</span>
          </nav>
        </div>

        {/* Main PDP grid */}
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left: Gallery */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <ProductImageGallery
                mainImage={matchingVariation?.image || product.image}
                galleryImages={galleryImages}
                productName={product.name}
              />
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex gap-2">
                {category && (
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-kaaj-gold">
                    {category.name}
                  </span>
                )}
                {onSale && discount && (
                  <Badge variant="sale" label={`${discount}% off`} />
                )}
                {isOOS && <Badge variant="soldout" />}
              </div>

              {/* Product Name */}
              <h1 className="font-serif text-heading-xl text-kaaj-charcoal leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-2xl text-kaaj-charcoal">
                  {formatPKR(displayPrice)}
                </span>
                {onSale && displayRegularPrice && (
                  <span className="font-sans text-sm text-kaaj-muted line-through">
                    {formatPKR(displayRegularPrice)}
                  </span>
                )}
              </div>

              {/* Short Description */}
              {product.shortDescription && (
                <p className="font-sans text-sm text-kaaj-muted leading-relaxed">
                  {stripHtml(product.shortDescription)}
                </p>
              )}

              <div className="h-px bg-kaaj-border" />

              {/* Variant Selectors */}
              {isVariable && attributes.length > 0 && (
                <div className="space-y-5">
                  {attributes
                    .filter((attr) => attr.variation)
                    .map((attr) => (
                      <VariantSelector
                        key={attr.name}
                        attributeName={attr.name}
                        options={attr.options}
                        selected={selectedAttrs[attr.name] || ""}
                        onChange={(val) =>
                          setSelectedAttrs((prev) => ({ ...prev, [attr.name]: val }))
                        }
                      />
                    ))}

                  {/* Size Guide link */}
                  {attributes.some((a) => a.name.toLowerCase().includes("size")) && (
                    <button
                      onClick={() => setSizeGuideOpen(true)}
                      className="font-sans text-[11px] uppercase tracking-[0.15em] text-kaaj-muted hover:text-kaaj-charcoal underline-offset-4 underline transition-colors"
                    >
                      Size Guide
                    </button>
                  )}
                  {/* Specific Size Details */}
                  {Object.entries(selectedAttrs).map(([key, val]) => {
                    if (!key.toLowerCase().includes("size")) return null;
                    const measurements = sizeData.find((s) => s.size === val);
                    if (!measurements) return null;
                    
                    return (
                      <div key={`size-details-${val}`} className="mt-4 p-4 bg-kaaj-cream-dark/50 border border-kaaj-border/60">
                        <p className="font-sans text-[11px] uppercase tracking-widest text-kaaj-charcoal font-semibold mb-2">
                          Size {val} Measurements
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4">
                          <p className="font-sans text-[10px] text-kaaj-charcoal"><span className="text-kaaj-muted">Length:</span> {measurements.length}"</p>
                          <p className="font-sans text-[10px] text-kaaj-charcoal"><span className="text-kaaj-muted">Chest:</span> {measurements.chest}"</p>
                          <p className="font-sans text-[10px] text-kaaj-charcoal"><span className="text-kaaj-muted">Shoulder:</span> {measurements.shoulder}"</p>
                          <p className="font-sans text-[10px] text-kaaj-charcoal"><span className="text-kaaj-muted">Sleeve:</span> {measurements.sleeveLength}"</p>
                          <p className="font-sans text-[10px] text-kaaj-charcoal"><span className="text-kaaj-muted">Arm Hole:</span> {measurements.armHole}"</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-kaaj-charcoal">
                  Qty
                </span>
                <div className="flex items-center border border-kaaj-border">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-kaaj-charcoal hover:bg-kaaj-cream-dark transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                  <span className="w-12 text-center font-sans text-sm text-kaaj-charcoal">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-kaaj-charcoal hover:bg-kaaj-cream-dark transition-colors"
                    aria-label="Increase quantity"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Add to Cart & Order Now */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="xl"
                    fullWidth
                    onClick={handleAddToCart}
                    disabled={isOOS || variantNotSelected}
                  >
                    {isOOS
                      ? "Out of Stock"
                      : variantNotSelected
                      ? "Select Options"
                      : addedToCart
                      ? "✓ Added"
                      : "Add to Bag"}
                  </Button>
                  
                  <Button
                    variant="primary"
                    size="xl"
                    fullWidth
                    onClick={handleOrderNow}
                    disabled={isOOS || variantNotSelected}
                  >
                    {isOOS ? "Out of Stock" : "Order Now"}
                  </Button>
                </div>

                {variantNotSelected && (
                  <p className="font-sans text-xs text-kaaj-rose text-center">
                    Please select all options above to continue.
                  </p>
                )}
              </div>

              {/* COD note */}
              <div className="flex items-center gap-3 bg-kaaj-blush/40 border border-kaaj-blush px-4 py-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D1B0E" strokeWidth="1.5">
                  <rect x="1" y="4" width="22" height="16" rx="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-kaaj-deep font-medium">
                    Cash on Delivery
                  </p>
                  <p className="font-sans text-[10px] text-kaaj-deep/60 mt-0.5">
                    Free delivery on orders over ₨ 5,000
                  </p>
                </div>
              </div>

              <div className="h-px bg-kaaj-border" />

              {/* Description Accordion */}
              {product.description && (
                <div className="border-b border-kaaj-border">
                  <button
                    onClick={() => setDescOpen(!descOpen)}
                    className="flex items-center justify-between w-full py-4 text-left"
                    aria-expanded={descOpen}
                  >
                    <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-kaaj-charcoal">
                      Product Details
                    </span>
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                      className={cn("transition-transform duration-300", descOpen && "rotate-180")}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {descOpen && (
                    <div
                      className="pb-5 product-description"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16 bg-kaaj-cream-dark">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-10">
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-kaaj-gold mb-3">
                  — You May Also Like
                </p>
                <h2 className="font-serif text-heading-lg text-kaaj-charcoal">
                  Related Products
                </h2>
              </div>
              <ProductGrid products={relatedProducts} columns={4} />
            </div>
          </section>
        )}
      </div>

      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </>
  );
}
