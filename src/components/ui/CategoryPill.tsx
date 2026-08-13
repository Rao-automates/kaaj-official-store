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
        "border transition-all duration-300",
        active
          ? "bg-kaaj-olive text-kaaj-cream border-kaaj-olive"
          : "bg-transparent text-kaaj-charcoal border-kaaj-border hover:border-kaaj-olive hover:text-kaaj-charcoal"
      )}
    >
      {name}
      {count !== undefined && (
        <span
          className={cn(
            "text-[10px]",
            active ? "text-kaaj-cream/70" : "text-kaaj-charcoal/70"
          )}
        >
          ({count})
        </span>
      )}
    </Link>
  );
}
