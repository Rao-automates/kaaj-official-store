"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryPillProps {
  name: string;
  slug?: string;
  href?: string;
  active?: boolean;
  count?: number;
}

export default function CategoryPill({
  name,
  slug,
  href,
  active = false,
  count,
}: CategoryPillProps) {
  const linkHref = href ?? (slug ? `/categories/${slug}` : "#");

  return (
    <Link
      href={linkHref}
      className={cn(
        "inline-flex items-center gap-2 px-5 py-2.5",
        "font-sans text-xs uppercase tracking-[0.18em] whitespace-nowrap",
        "border transition-all duration-500 transform-gpu",
        "wipe-fill",
        active
          ? "bg-kaaj-charcoal text-kaaj-cream border-kaaj-charcoal shadow-lg shadow-kaaj-charcoal/20"
          : "bg-transparent text-kaaj-charcoal border-kaaj-border hover:border-kaaj-charcoal/50 hover:text-kaaj-charcoal hover:scale-[1.03]"
      )}
    >
      {name}
      {count !== undefined && (
        <span
          className={cn(
            "text-[10px] transition-colors duration-300",
            active ? "text-kaaj-gold-light" : "text-kaaj-charcoal/50"
          )}
        >
          ({count})
        </span>
      )}
    </Link>
  );
}
