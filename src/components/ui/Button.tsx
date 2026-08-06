"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "gold";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  href?: string;
  shimmer?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-kaaj-charcoal text-kaaj-cream hover:bg-kaaj-charcoal-light active:scale-[0.97] shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20",
  secondary:
    "bg-kaaj-cream text-kaaj-charcoal border border-kaaj-border hover:bg-kaaj-blush active:scale-[0.97] shadow-md shadow-black/5",
  ghost:
    "bg-transparent text-kaaj-charcoal hover:bg-kaaj-cream/60 active:scale-[0.97]",
  outline:
    "bg-transparent text-kaaj-charcoal border border-kaaj-charcoal hover:bg-kaaj-charcoal hover:text-kaaj-cream active:scale-[0.97]",
  gold:
    "bg-kaaj-gold text-white hover:bg-kaaj-gold-dark active:scale-[0.97] shadow-lg shadow-kaaj-gold/20 hover:shadow-xl hover:shadow-kaaj-gold/30",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs tracking-widest",
  md: "px-6 py-3 text-xs tracking-widest",
  lg: "px-8 py-4 text-sm tracking-widest",
  xl: "px-10 py-5 text-sm tracking-widest",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      shimmer = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2",
          "font-sans uppercase transition-all duration-500",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transform-gpu",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          shimmer && "btn-shimmer",
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Processing…
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
