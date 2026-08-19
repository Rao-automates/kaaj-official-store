"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Badge from "@/components/ui/Badge";
import { formatPKR, parsePKR, isOnSale, discountPercent, cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addToCart } = useCart();
  const [imgError, setImgError] = useState(false);
  const [adding, setAdding] = useState(false);

  const onSale = isOnSale(product);
  const discount = discountPercent(product.regularPrice, product.salePrice);
  const isOutOfStock = product.stockStatus === "OUT_OF_STOCK";
  const category = product.productCategories?.nodes?.[0];

  const imageUrl = product.image?.sourceUrl;
  const altText = product.image?.altText || product.name;
  const secondaryImageUrl = product.galleryImages?.nodes?.[0]?.sourceUrl;
  const secondaryAltText = product.galleryImages?.nodes?.[0]?.altText || `${product.name} alternate view`;

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock || product.type === "VARIABLE") return;
    setAdding(true);
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: parsePKR(product.salePrice || product.price),
      quantity: 1,
      image: product.image,
      selectedAttributes: {},
      stockStatus: product.stockStatus,
    });
    setTimeout(() => setAdding(false), 1000);
  };

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-kaaj-cream-dark aspect-[3/4] mb-3">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {onSale && discount && (
            <Badge variant="sale" label={`−${discount}%`} />
          )}
          {isOutOfStock && <Badge variant="soldout" />}
        </div>

        {/* Product Image Container */}
        {imageUrl && !imgError ? (
          <>
            {/* Secondary Image (Fades in on hover) — lazy loaded */}
            {secondaryImageUrl && (
              <Image
                src={secondaryImageUrl}
                alt={secondaryAltText}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            )}
            {/* Primary Image (Fades out on hover if secondary exists) */}
            <Image
              src={imageUrl}
              alt={altText}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={cn(
                "object-cover transition-[transform,opacity] duration-700 ease-out z-[1]",
                "group-hover:scale-105",
                secondaryImageUrl ? "group-hover:opacity-0" : ""
              )}
              priority={priority}
              onError={() => setImgError(true)}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-kaaj-cream-dark z-[1] relative">
            <KaajPlaceholder />
          </div>
        )}

        {/* Quick Add Overlay */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "bg-kaaj-cream/20 sm:backdrop-blur-[2px] opacity-0",
            "transition-opacity duration-700 ease-expo-out",
            "group-hover:opacity-100",
            isOutOfStock && "hidden"
          )}
        >
          <button
            onClick={handleQuickAdd}
            className={cn(
              "font-sans text-[10px] uppercase tracking-[0.3em]",
              "text-kaaj-charcoal px-6 py-3 border border-kaaj-border/50 bg-kaaj-cream/50",
              "hover:border-kaaj-gold transition-colors duration-500",
              product.type === "VARIABLE"
                ? "cursor-pointer"
                : adding
                  ? "text-kaaj-gold"
                  : ""
            )}
          >
            {product.type === "VARIABLE"
              ? "Select Options"
              : adding
                ? "✓ Added"
                : "Quick Add"}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1">
        {category && (
          <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-kaaj-muted">
            {category.name}
          </p>
        )}
        <h3 className="font-sans text-base leading-snug text-kaaj-charcoal group-hover:text-kaaj-deep transition-colors duration-200 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 pt-0.5">
          <span className="font-sans text-sm text-kaaj-charcoal">
            {formatPKR(product.price)}
          </span>
          {/* Crossed-out regular price removed to hide the glitch */}
        </div>

      </div>
    </Link>
  );
}

function KaajPlaceholder() {
  return (
    <div className="flex flex-col items-center gap-2 opacity-20">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 4C24 4 16 12 8 20C16 28 24 44 24 44C24 44 32 28 40 20C32 12 24 4 24 4Z"
          stroke="#1C1C1C"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="24" cy="20" r="4" stroke="#1C1C1C" strokeWidth="1.5" fill="none" />
      </svg>
      <span className="font-sans text-[10px] uppercase tracking-widest text-kaaj-charcoal">
        Kaaj
      </span>
    </div>
  );
}
