"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const sizeData = [
  { size: "XS", length: "32", shoulder: "14", chest: "19", frontBorder: "24", armHole: "9.5", sleeveLength: "21.5", sleeveOpening: "8" },
  { size: "S", length: "32", shoulder: "14.5", chest: "20", frontBorder: "24", armHole: "10", sleeveLength: "22", sleeveOpening: "8" },
  { size: "M", length: "32", shoulder: "15", chest: "21", frontBorder: "25", armHole: "10.5", sleeveLength: "22.5", sleeveOpening: "8" },
  { size: "L", length: "32", shoulder: "15.5", chest: "22.5", frontBorder: "26", armHole: "11", sleeveLength: "23", sleeveOpening: "8" },
  { size: "XL", length: "32", shoulder: "16", chest: "24", frontBorder: "27", armHole: "11.75", sleeveLength: "23.5", sleeveOpening: "8" },
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
        className="relative bg-kaaj-cream z-10 w-full sm:max-w-4xl max-h-[90vh] overflow-y-auto animate-fade-up"
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
            <table className="w-full text-sm font-sans whitespace-nowrap">
              <thead>
                <tr className="border-b border-kaaj-border bg-kaaj-cream-dark">
                  {["Size", "Length", "Shoulder", "Chest", "Front Border", "Arm Hole", "Sleeve Length", "Sleeve Opening"].map((h) => (
                    <th
                      key={h}
                      className="py-3 px-4 text-center text-[10px] uppercase tracking-[0.15em] text-kaaj-charcoal font-semibold border-r border-kaaj-border last:border-r-0"
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
                    className="border-b border-kaaj-border/50 hover:bg-kaaj-gold/5 transition-colors"
                  >
                    <td className="py-4 px-4 text-center font-bold text-kaaj-charcoal border-r border-kaaj-border bg-kaaj-cream-dark/30">{row.size}</td>
                    <td className="py-4 px-4 text-center text-kaaj-charcoal border-r border-kaaj-border">{row.length}</td>
                    <td className="py-4 px-4 text-center text-kaaj-charcoal border-r border-kaaj-border">{row.shoulder}</td>
                    <td className="py-4 px-4 text-center text-kaaj-charcoal border-r border-kaaj-border">{row.chest}</td>
                    <td className="py-4 px-4 text-center text-kaaj-charcoal border-r border-kaaj-border">{row.frontBorder}</td>
                    <td className="py-4 px-4 text-center text-kaaj-charcoal border-r border-kaaj-border">{row.armHole}</td>
                    <td className="py-4 px-4 text-center text-kaaj-charcoal border-r border-kaaj-border">{row.sleeveLength}</td>
                    <td className="py-4 px-4 text-center text-kaaj-charcoal">{row.sleeveOpening}</td>
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
