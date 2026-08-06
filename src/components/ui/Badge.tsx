import { cn } from "@/lib/utils";

type BadgeVariant = "sale" | "new" | "featured" | "soldout" | "luxury";

interface BadgeProps {
  variant?: BadgeVariant;
  label?: string;
  className?: string;
}

const variants: Record<BadgeVariant, { classes: string; defaultLabel: string }> = {
  sale: {
    classes: "bg-kaaj-rose text-white",
    defaultLabel: "Sale",
  },
  new: {
    classes: "bg-kaaj-charcoal text-kaaj-cream",
    defaultLabel: "New",
  },
  featured: {
    classes: "bg-kaaj-gold text-white",
    defaultLabel: "Featured",
  },
  soldout: {
    classes: "bg-kaaj-muted text-white",
    defaultLabel: "Sold Out",
  },
  luxury: {
    classes: "bg-kaaj-deep text-kaaj-gold-light border border-kaaj-gold/30",
    defaultLabel: "Luxury",
  },
};

export default function Badge({ variant = "new", label, className }: BadgeProps) {
  const { classes, defaultLabel } = variants[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1",
        "text-[10px] font-sans uppercase tracking-[0.15em]",
        classes,
        className
      )}
    >
      {label ?? defaultLabel}
    </span>
  );
}
