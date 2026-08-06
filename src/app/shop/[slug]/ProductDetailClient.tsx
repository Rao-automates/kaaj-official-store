"use client";

import { useState, useMemo, useRef, useEffect } from "react";
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
  const buttonsRef = useRef<HTMLDivElement>(null);
  const stickyBarRef = useRef<HTMLDivElement>(null);

  // Track when the original button area scrolls out of view
  useEffect(() => {
    const target = buttonsRef.current;
    const stickyBar = stickyBarRef.current;
    if (!target || !stickyBar) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Direct DOM mutation prevents heavy React re-renders on scroll
        if (!entry.isIntersecting) {
          stickyBar.classList.remove("translate-y-[150%]", "opacity-0", "pointer-events-none");
          stickyBar.classList.add("translate-y-0", "opacity-100");
        } else {
          stickyBar.classList.add("translate-y-[150%]", "opacity-0", "pointer-events-none");
          stickyBar.classList.remove("translate-y-0", "opacity-100");
        }
      },
      { threshold: 0, rootMargin: "0px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const isVariable = product.type === "VARIABLE";
  const attributes = product.attributes?.nodes ?? [];
  const variations = product.variations?.nodes ?? [];
  const nonVariationAttributes = attributes.filter((a) => !a.variation);
  const hash = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const fakeLovedBy = (hash % 800) + 100;

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
              
              {/* Loved By Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-kaaj-charcoal/5 border border-kaaj-border/60 rounded-sm w-fit mt-1">
                <svg className="w-3 h-3 text-kaaj-charcoal/60" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span className="font-sans text-[9px] text-kaaj-charcoal font-semibold uppercase tracking-[0.2em]">Loved by {fakeLovedBy}</span>
              </div>

              {/* Specs Grid */}
              {nonVariationAttributes.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {nonVariationAttributes.map((attr) => (
                    <div key={attr.name} className="flex flex-col gap-0.5 p-3 bg-kaaj-charcoal/5 border border-kaaj-border/60 rounded-sm">
                      <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-kaaj-muted flex items-center gap-1.5">
                        <svg className="w-3 h-3 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <line x1="3" y1="9" x2="21" y2="9"/>
                        </svg>
                        {attr.name.replace(/^pa_/, "")}
                      </span>
                      <span className="font-sans text-xs font-semibold text-kaaj-charcoal pl-4.5">{attr.options.join(", ")}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="h-px bg-kaaj-border" />

              {/* Variant Selectors */}
              {isVariable && attributes.length > 0 && (
                <div className="space-y-6">
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
                        rightElement={
                          attr.name.toLowerCase().includes("size") ? (
                            <button
                              onClick={() => setSizeGuideOpen(true)}
                              className="font-sans text-[10px] uppercase tracking-[0.1em] text-kaaj-charcoal flex items-center gap-1 hover:text-kaaj-gold transition-colors"
                            >
                              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <path d="M9 4v16"/>
                              </svg>
                              Find my size
                            </button>
                          ) : undefined
                        }
                      />
                    ))}
                  {/* Specific Size Details */}
                  {Object.entries(selectedAttrs).map(([key, val]) => {
                    if (!key.toLowerCase().includes("size")) return null;
                    
                    let mappedSize = val.toUpperCase();
                    if (val.toLowerCase() === "small") mappedSize = "S";
                    if (val.toLowerCase() === "medium") mappedSize = "M";
                    if (val.toLowerCase() === "large") mappedSize = "L";
                    if (val.toLowerCase() === "extra small") mappedSize = "XS";
                    if (val.toLowerCase() === "extra large") mappedSize = "XL";

                    const measurements = sizeData.find((s) => s.size.toUpperCase() === mappedSize);
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
              <div className="flex flex-col gap-2 pt-2">
                <span className="font-sans text-[11px] font-semibold tracking-[0.1em] text-kaaj-charcoal">
                  Quantity
                </span>
                <div className="flex items-center border border-kaaj-border/80 rounded-sm w-32 bg-kaaj-charcoal/5">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex-1 h-10 flex items-center justify-center text-kaaj-charcoal hover:bg-kaaj-charcoal/10 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  </button>
                  <span className="w-10 text-center font-sans text-sm text-kaaj-charcoal font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex-1 h-10 flex items-center justify-center text-kaaj-charcoal hover:bg-kaaj-charcoal/10 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                  </button>
                </div>
              </div>

              {/* Add to Cart & Order Now */}
              <div ref={buttonsRef} className="pt-4 space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isOOS || variantNotSelected}
                  className={cn(
                    "w-full h-14 font-sans text-xs font-bold uppercase tracking-[0.2em] transition-all rounded-sm text-center flex items-center justify-center",
                    isOOS || variantNotSelected
                      ? "bg-kaaj-charcoal/10 text-kaaj-muted cursor-not-allowed"
                      : "bg-[#252525] text-white hover:bg-black shadow-lg"
                  )}
                >
                  {isOOS
                    ? "Out of Stock"
                    : variantNotSelected
                    ? "Select Options"
                    : addedToCart
                    ? "✓ Added To Cart"
                    : "ADD TO CART"}
                </button>
                <button
                  onClick={handleOrderNow}
                  disabled={isOOS || variantNotSelected}
                  className={cn(
                    "w-full h-14 font-sans text-xs font-bold uppercase tracking-[0.2em] transition-all rounded-sm text-center flex items-center justify-center",
                    isOOS || variantNotSelected
                      ? "bg-kaaj-charcoal/10 text-kaaj-muted cursor-not-allowed"
                      : "bg-kaaj-gold text-white hover:bg-kaaj-gold-dark shadow-lg"
                  )}
                >
                  {isOOS
                    ? "Out of Stock"
                    : variantNotSelected
                    ? "Select Options"
                    : "BUY NOW"}
                </button>
                {variantNotSelected && (
                  <p className="font-sans text-[10px] text-kaaj-charcoal/60 text-center mt-2">
                    Please select all options above to continue.
                  </p>
                )}
              </div>

              {/* Trust & Timeline */}
              <div className="pt-6 border-t border-kaaj-border mt-6 space-y-8">
                <div className="grid grid-cols-3 gap-2 px-1">
                  <div className="flex flex-col items-center gap-3 p-4 bg-kaaj-charcoal/5 border border-kaaj-border/40 rounded-sm text-center">
                    <svg className="w-5 h-5 text-kaaj-charcoal/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                    <span className="font-sans text-[8px] text-kaaj-charcoal font-bold uppercase tracking-[0.15em]">Secure<br/>Checkout</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 p-4 bg-kaaj-charcoal/5 border border-kaaj-border/40 rounded-sm text-center">
                    <svg className="w-5 h-5 text-kaaj-charcoal/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                    <span className="font-sans text-[8px] text-kaaj-charcoal font-bold uppercase tracking-[0.15em]">7-Day<br/>Returns</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 p-4 bg-kaaj-charcoal/5 border border-kaaj-border/40 rounded-sm text-center">
                    <svg className="w-5 h-5 text-kaaj-charcoal/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 3L2 20h20L12 3z"/>
                    </svg>
                    <span className="font-sans text-[8px] text-kaaj-charcoal font-bold uppercase tracking-[0.15em]">Handcrafted<br/>In PK</span>
                  </div>
                </div>
                
                <DeliveryTimeline />
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

      {/* Sticky Bottom Bar — appears when original buttons scroll out of view */}
      <div
        ref={stickyBarRef}
        className="fixed bottom-0 left-0 right-0 z-50 transition-[transform,opacity] duration-300 ease-expo-out translate-y-[150%] opacity-0 pointer-events-none transform-gpu will-change-transform"
      >
        <div className="bg-kaaj-deep/95 backdrop-blur-md border-t border-kaaj-border pb-[env(safe-area-inset-bottom)]">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            {/* Mobile: stack product info and buttons */}
            <div className="flex items-center gap-3">
              {/* Product mini-info (hidden on very small screens) */}
              <div className="hidden sm:flex items-center gap-3 flex-shrink-0 mr-auto">
                {(matchingVariation?.image || product.image) && (
                  <div className="relative w-12 h-12 rounded-sm overflow-hidden border border-kaaj-border/40 flex-shrink-0">
                    <Image
                      src={(matchingVariation?.image || product.image)?.sourceUrl || ""}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-kaaj-charcoal/70 truncate max-w-[180px]">
                    {product.name}
                  </p>
                  <p className="font-serif text-sm text-kaaj-charcoal">
                    {formatPKR(displayPrice)}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2 flex-1 sm:flex-none sm:ml-auto">
                <button
                  onClick={handleAddToCart}
                  disabled={isOOS || variantNotSelected}
                  className={cn(
                    "flex-1 sm:w-auto sm:px-8 h-11 font-sans text-[10px] font-bold uppercase tracking-[0.15em] transition-all rounded-sm flex items-center justify-center",
                    isOOS || variantNotSelected
                      ? "bg-kaaj-charcoal/10 text-kaaj-muted cursor-not-allowed"
                      : "bg-[#252525] text-white hover:bg-black border border-kaaj-border/30"
                  )}
                >
                  {isOOS
                    ? "Sold Out"
                    : variantNotSelected
                    ? "Select Options"
                    : addedToCart
                    ? "✓ Added"
                    : "Add to Cart"}
                </button>
                <button
                  onClick={handleOrderNow}
                  disabled={isOOS || variantNotSelected}
                  className={cn(
                    "flex-1 sm:w-auto sm:px-8 h-11 font-sans text-[10px] font-bold uppercase tracking-[0.15em] transition-all rounded-sm flex items-center justify-center",
                    isOOS || variantNotSelected
                      ? "bg-kaaj-charcoal/10 text-kaaj-muted cursor-not-allowed"
                      : "bg-kaaj-gold text-white hover:bg-kaaj-gold-dark"
                  )}
                >
                  {isOOS
                    ? "Sold Out"
                    : variantNotSelected
                    ? "Select Options"
                    : "Buy Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function DeliveryTimeline() {
  const formatDate = (date: Date) => date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  
  const today = new Date();
  const readyStart = new Date(today); readyStart.setDate(today.getDate() + 1);
  const readyEnd = new Date(today); readyEnd.setDate(today.getDate() + 2);
  const delStart = new Date(today); delStart.setDate(today.getDate() + 5);
  const delEnd = new Date(today); delEnd.setDate(today.getDate() + 10);

  return (
    <div className="relative pt-4 pb-2 px-6">
      {/* Connecting Line */}
      <div className="absolute top-8 left-12 right-12 h-0.5 bg-kaaj-charcoal/20"></div>
      
      <div className="flex justify-between relative z-10">
        {/* Step 1 */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-kaaj-charcoal text-white flex items-center justify-center">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <div className="text-center">
            <p className="font-sans text-[9px] font-bold text-kaaj-charcoal">{formatDate(today)}</p>
            <p className="font-sans text-[9px] text-kaaj-charcoal/60 uppercase tracking-widest mt-0.5">Ordered</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#252525] text-white flex items-center justify-center ring-4 ring-kaaj-cream">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="3" width="15" height="13"/>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
          </div>
          <div className="text-center">
            <p className="font-sans text-[9px] font-bold text-kaaj-charcoal">{formatDate(readyStart)} - {formatDate(readyEnd)}</p>
            <p className="font-sans text-[9px] text-kaaj-charcoal/60 uppercase tracking-widest mt-0.5">Order Ready</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#252525] text-white flex items-center justify-center ring-4 ring-kaaj-cream">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <div className="text-center">
            <p className="font-sans text-[9px] font-bold text-kaaj-charcoal">{formatDate(delStart)} - {formatDate(delEnd)}</p>
            <p className="font-sans text-[9px] text-kaaj-charcoal/60 uppercase tracking-widest mt-0.5">Delivered</p>
          </div>
        </div>
      </div>
    </div>
  );
}
