"use client";

import { cn } from "@/lib/utils";

interface VariantSelectorProps {
  attributeName: string;
  options: string[];
  selected: string;
  outOfStockOptions?: string[];
  onChange: (value: string) => void;
  rightElement?: React.ReactNode;
}

const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "Free Size"];

function sortOptions(options: string[], name: string): string[] {
  const lower = name.toLowerCase();
  if (lower.includes("size")) {
    return [...options].sort((a, b) => {
      const ai = SIZE_ORDER.indexOf(a);
      const bi = SIZE_ORDER.indexOf(b);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return a.localeCompare(b);
    });
  }
  return options;
}

export default function VariantSelector({
  attributeName,
  options,
  selected,
  outOfStockOptions = [],
  onChange,
  rightElement,
}: VariantSelectorProps) {
  const sorted = sortOptions(options, attributeName);
  const displayName = attributeName.replace(/^pa_/, "").replace(/-/g, " ");

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-sans text-[11px] font-semibold tracking-[0.1em] text-kaaj-charcoal capitalize">
            {displayName}
          </span>
          {selected && (
            <span className="font-sans text-[11px] text-kaaj-charcoal font-semibold">— {selected}</span>
          )}
        </div>
        {rightElement && <div>{rightElement}</div>}
      </div>

      <div className="flex flex-wrap gap-2">
        {sorted.map((option) => {
          const isSelected = selected === option;
          const isOOS = outOfStockOptions.includes(option);

          return (
            <button
              key={option}
              onClick={() => !isOOS && onChange(option)}
              disabled={isOOS}
              className={cn(
                "relative px-4 py-2 font-sans text-xs uppercase tracking-[0.1em]",
                "border transition-all duration-200",
                isSelected
                  ? "bg-kaaj-charcoal text-kaaj-cream border-kaaj-charcoal"
                  : isOOS
                  ? "bg-kaaj-cream text-kaaj-muted border-kaaj-border cursor-not-allowed"
                  : "bg-kaaj-cream text-kaaj-charcoal border-kaaj-border hover:border-kaaj-charcoal"
              )}
            >
              {option}
              {/* Strike-through for OOS */}
              {isOOS && (
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="absolute w-full h-px bg-kaaj-muted/50 rotate-[-30deg]" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
