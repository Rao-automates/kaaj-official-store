"use client";

import { ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// 1. Single Global Observer (fixes Desktop stutter by avoiding 50 observer instances)
let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, () => void>();

function getObserver() {
  if (typeof window === "undefined") return null;
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cb = callbacks.get(entry.target);
            if (cb) {
              // Add a small rAF to ensure smooth paint
              requestAnimationFrame(() => {
                cb();
              });
              callbacks.delete(entry.target);
              observer?.unobserve(entry.target);
            }
          }
        });
      },
      { rootMargin: "0px", threshold: 0 }
    );
  }
  return observer;
}

interface FadeInProps {
  children: ReactNode;
  delay?: number;
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = getObserver();
    if (!obs) return;

    // 2. Direct DOM Mutation (fixes Desktop stutter by bypassing React VDOM re-renders)
    callbacks.set(el, () => {
      el.classList.remove("opacity-0");
      el.classList.add("opacity-100");
    });

    obs.observe(el);

    return () => {
      callbacks.delete(el);
      obs.unobserve(el);
    };
  }, []);

  const getInitialClass = () => {
    switch (direction) {
      case "none": return "opacity-0";
      default: return "opacity-0"; // Removed translate to fix WebKit hit-area bug
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(0.21,0.47,0.32,0.98)]",
        getInitialClass(),
        fullWidth ? "w-full" : ""
      )}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
