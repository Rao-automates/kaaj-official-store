"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: ReactNode;
  delay?: number; // Delay in seconds (e.g. 0.2)
  direction?: "up" | "down" | "left" | "right" | "none";
  fullWidth?: boolean;
}

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  fullWidth = false,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Highly optimized IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a small requestAnimationFrame to ensure browser has painted before animating
          requestAnimationFrame(() => {
            setIsVisible(true);
          });
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        rootMargin: "-20px", // Trigger when slightly visible
        threshold: 0,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  // Hardware-accelerated CSS classes for animation
  const getDirectionClass = () => {
    if (isVisible) return "translate-x-0 translate-y-0 opacity-100";
    
    switch (direction) {
      case "up": return "translate-y-10 opacity-0";
      case "down": return "-translate-y-10 opacity-0";
      case "left": return "translate-x-10 opacity-0";
      case "right": return "-translate-x-10 opacity-0";
      case "none": return "opacity-0";
      default: return "translate-y-10 opacity-0";
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-out will-change-[opacity,transform]",
        fullWidth ? "w-full" : "",
        getDirectionClass()
      )}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
