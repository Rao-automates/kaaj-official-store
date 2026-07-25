"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sizeData = [
  { size: "XS", chest: "34\"", waist: "28\"", hips: "36\"", length: "52\"" },
  { size: "S", chest: "36\"", waist: "30\"", hips: "38\"", length: "53\"" },
  { size: "M", chest: "38\"", waist: "32\"", hips: "40\"", length: "54\"" },
  { size: "L", chest: "40\"", waist: "34\"", hips: "42\"", length: "55\"" },
  { size: "XL", chest: "42\"", waist: "36\"", hips: "44\"", length: "56\"" },
  { size: "XXL", chest: "44\"", waist: "38\"", hips: "46\"", length: "57\"" },
];

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Size Guide"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-kaaj-charcoal/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={modalRef}
        className="relative bg-kaaj-cream z-10 w-full sm:max-w-lg max-h-[90vh] overflow-y-auto animate-fade-up"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-kaaj-border">
          <h2 className="font-serif text-2xl text-kaaj-charcoal">Size Guide</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-kaaj-charcoal hover:text-kaaj-rose transition-colors"
            aria-label="Close size guide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <p className="font-sans text-sm text-kaaj-muted leading-relaxed">
            All measurements are in inches. For the best fit, measure over your undergarments.
            If you are between sizes, we recommend sizing up.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-kaaj-border">
                  {["Size", "Chest", "Waist", "Hips", "Length"].map((h) => (
                    <th
                      key={h}
                      className="py-2.5 px-3 text-left text-[10px] uppercase tracking-[0.15em] text-kaaj-muted font-normal"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizeData.map((row, i) => (
                  <tr
                    key={row.size}
                    className={cn(
                      "border-b border-kaaj-border/50",
                      i % 2 === 0 ? "bg-transparent" : "bg-kaaj-cream-dark/50"
                    )}
                  >
                    <td className="py-3 px-3 font-medium text-kaaj-charcoal">{row.size}</td>
                    <td className="py-3 px-3 text-kaaj-charcoal">{row.chest}</td>
                    <td className="py-3 px-3 text-kaaj-charcoal">{row.waist}</td>
                    <td className="py-3 px-3 text-kaaj-charcoal">{row.hips}</td>
                    <td className="py-3 px-3 text-kaaj-charcoal">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-kaaj-blush/30 border border-kaaj-blush p-4">
            <p className="font-sans text-xs text-kaaj-deep leading-relaxed">
              <strong className="uppercase tracking-wide">Note:</strong> Sizes may vary slightly
              between collections due to the nature of hand-crafted fabrics and embroidery.
              For unstitched fabric, please consult your local tailor for exact measurements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
