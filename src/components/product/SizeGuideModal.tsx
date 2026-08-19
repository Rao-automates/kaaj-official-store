"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { sizeData, shalwarSizeData } from "@/lib/constants";
import { KameezFigure, ShalwarFigure } from "@/components/ui/MeasurementFigures";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TABS = ["Kameez", "Shalwar"] as const;
type TabType = typeof TABS[number];

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabType>("Kameez");

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
          <h2 className="font-sans text-2xl text-kaaj-charcoal">Size Guide</h2>
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

          {/* Tabs */}
          <div className="flex gap-1 border-b border-kaaj-border">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "font-sans text-[11px] uppercase tracking-[0.15em] px-5 py-3 transition-colors duration-300 border-b-2 -mb-px",
                  activeTab === tab
                    ? "text-kaaj-charcoal border-kaaj-charcoal font-semibold"
                    : "text-kaaj-charcoal/50 border-transparent hover:text-kaaj-charcoal/70"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Kameez Table */}
          {activeTab === "Kameez" && (
            <div className="space-y-4">
              <KameezFigure />
            </div>
          )}

          {/* Shalwar Table */}
          {activeTab === "Shalwar" && (
            <div className="space-y-4">
              <ShalwarFigure />
            </div>
          )}

          <div className="bg-kaaj-blush/30 border border-kaaj-blush p-4">
            <p className="font-sans text-xs text-kaaj-deep leading-relaxed">
              <strong className="uppercase tracking-wide">Note:</strong> Sizes may vary slightly
              between collections due to the nature of hand-crafted fabrics and embroidery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
