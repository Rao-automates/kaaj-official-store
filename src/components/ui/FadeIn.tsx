"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Global observer to save memory
let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, (isVisible: boolean) => void>();

function getObserver() {
  if (typeof window === "undefined") return null;
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cb = callbacks.get(entry.target);
            if (cb) {
              cb(true);
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = getObserver();
    if (!obs) return;

    callbacks.set(el, (visible) => {
      setIsVisible(visible);
    });

    obs.observe(el);

    return () => {
      callbacks.delete(el);
      obs.unobserve(el);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-opacity duration-[800ms] ease-[cubic-bezier(0.21,0.47,0.32,0.98)]",
        isVisible ? "opacity-100" : "opacity-0",
        fullWidth ? "w-full" : ""
      )}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
