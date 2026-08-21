"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Single shared observer — one instance handles ALL FadeIn elements on the page.
// This avoids creating 50+ separate observers which kills low-end devices.
let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, () => void>();

function getObserver() {
  if (typeof window === "undefined") return null;
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (let i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            const cb = callbacks.get(entries[i].target);
            if (cb) {
              cb();
              callbacks.delete(entries[i].target);
              observer?.unobserve(entries[i].target);
            }
          }
        }
      },
      { rootMargin: "50px", threshold: 0 }
    );
  }
  return observer;
}

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  fullWidth?: boolean;
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  fullWidth = false,
  className,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = getObserver();
    if (!obs) return;

    callbacks.set(el, () => setIsVisible(true));
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
        "transition-opacity duration-700 ease-out",
        isVisible ? "opacity-100" : "opacity-0",
        fullWidth ? "w-full" : "",
        className
      )}
      style={delay > 0 ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
