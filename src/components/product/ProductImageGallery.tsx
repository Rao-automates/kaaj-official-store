"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import type { ProductImage } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  mainImage: ProductImage | null;
  galleryImages: ProductImage[];
  productName: string;
}

export default function ProductImageGallery({
  mainImage,
  galleryImages,
  productName,
}: ProductImageGalleryProps) {
  const allImages = [
    ...(mainImage ? [mainImage] : []),
    ...galleryImages.filter((img) => img.sourceUrl !== mainImage?.sourceUrl),
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const activeImage = allImages[activeIdx];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }, [zoomed]);

  if (allImages.length === 0) {
    return (
      <div className="aspect-[3/4] bg-kaaj-cream-dark flex items-center justify-center">
        <div className="opacity-20 text-center">
          <p className="font-sans text-4xl text-kaaj-charcoal">Kaaj</p>
          <p className="font-sans text-xs uppercase tracking-widest text-kaaj-muted mt-2">
            Image Coming Soon
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-4">
      {/* Thumbnail Rail */}
      {allImages.length > 1 && (
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[680px] pb-1 md:pb-0 md:pr-1 scrollbar-hide">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "relative flex-shrink-0 w-16 h-20 md:w-18 md:h-22 overflow-hidden transition-all duration-200",
                activeIdx === idx
                  ? "ring-1 ring-kaaj-charcoal ring-offset-1"
                  : "opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={img.sourceUrl}
                alt={img.altText || `${productName} view ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div
        className="relative flex-1 aspect-[3/4] bg-kaaj-cream-dark overflow-hidden cursor-zoom-in"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        {activeImage && (
          <Image
            src={activeImage.sourceUrl}
            alt={activeImage.altText || productName}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className={cn(
              "object-cover transition-transform duration-300 ease-out",
              zoomed ? "scale-150" : "scale-100"
            )}
            style={
              zoomed
                ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
                : undefined
            }
            priority
          />
        )}

        {/* Image counter */}
        {allImages.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-kaaj-charcoal/70 text-kaaj-cream text-[10px] font-sans tracking-widest px-2.5 py-1.5 backdrop-blur-sm">
            {activeIdx + 1} / {allImages.length}
          </div>
        )}

        {/* Arrow navigation on mobile */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={() => setActiveIdx((i) => (i > 0 ? i - 1 : allImages.length - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-sm md:hidden hover:bg-white transition-colors"
              aria-label="Previous image"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => setActiveIdx((i) => (i < allImages.length - 1 ? i + 1 : 0))}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-sm md:hidden hover:bg-white transition-colors"
              aria-label="Next image"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
