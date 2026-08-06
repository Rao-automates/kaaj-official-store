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
      <div className="relative overflow-hidden bg-kaaj-cream-dark aspect-[2/3] mb-6">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {onSale && discount && (
            <Badge variant="sale" label={`−${discount}%`} />
          )}
          {isOutOfStock && <Badge variant="soldout" />}
        </div>

        {/* Product Image */}
        {imageUrl && !imgError ? (
          <Image
            src={imageUrl}
            alt={altText}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              "object-cover transition-transform duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
              "group-hover:scale-110"
            )}
            priority={priority}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-kaaj-cream-dark">
            <KaajPlaceholder />
          </div>
        )}

        {/* Quick Add Overlay */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "bg-kaaj-cream/20 backdrop-blur-[2px] opacity-0",
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
      <div className="space-y-3 px-2 md:px-0">
        <div className="flex flex-col gap-1.5">
          <div className="space-y-1">
            {category && (
              <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-kaaj-muted/80">
                {category.name}
              </p>
            )}
            <h3 className="font-serif text-2xl md:text-3xl font-light leading-none text-kaaj-charcoal group-hover:text-kaaj-gold transition-colors duration-300">
              {product.name}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            {onSale && product.regularPrice && (
              <span className="font-sans text-[10px] tracking-[0.2em] text-kaaj-muted line-through">
                {formatPKR(product.regularPrice)}
              </span>
            )}
            <span className={cn(
              "font-sans text-[11px] tracking-[0.2em] uppercase",
              onSale ? "text-kaaj-gold" : "text-kaaj-charcoal"
            )}>
              {formatPKR(product.salePrice || product.price)}
            </span>
          </div>
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
