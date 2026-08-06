"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type BadgeVariant = "sale" | "new" | "featured" | "soldout" | "luxury";

interface BadgeProps {
  variant?: BadgeVariant;
  label?: string;
  className?: string;
  animate?: boolean;
}

const variants: Record<BadgeVariant, { classes: string; defaultLabel: string }> = {
  sale: {
    classes: "bg-kaaj-rose text-white shadow-lg shadow-kaaj-rose/20",
    defaultLabel: "Sale",
  },
  new: {
    classes: "bg-kaaj-charcoal text-kaaj-cream shadow-md shadow-black/10",
    defaultLabel: "New",
  },
  featured: {
    classes: "bg-kaaj-gold text-white shadow-lg shadow-kaaj-gold/20",
    defaultLabel: "Featured",
  },
  soldout: {
    classes: "bg-kaaj-muted text-white shadow-md shadow-black/10",
    defaultLabel: "Sold Out",
  },
  luxury: {
    classes: "bg-kaaj-deep text-kaaj-gold-light border border-kaaj-gold/30 shadow-lg shadow-kaaj-gold/10",
    defaultLabel: "Luxury",
  },
};

export default function Badge({ variant = "new", label, className, animate = true }: BadgeProps) {
  const { classes, defaultLabel } = variants[variant];

  const content = (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1",
        "text-[10px] font-sans uppercase tracking-[0.15em]",
        "backdrop-blur-sm",
        classes,
        className
      )}
    >
      {label ?? defaultLabel}
    </span>
  );

  if (!animate) return content;

  return (
    <motion.span
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15,
        delay: 0.2,
      }}
    >
      {content}
    </motion.span>
  );
}
