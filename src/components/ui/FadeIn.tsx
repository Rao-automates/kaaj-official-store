"use client";

import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

  useGSAP(() => {
    if (!ref.current) return;

    let y = 0;
    let x = 0;

    switch (direction) {
      case "up":
        y = 50;
        break;
      case "down":
        y = -50;
        break;
      case "left":
        x = 50;
        break;
      case "right":
        x = -50;
        break;
      case "none":
        break;
    }

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        y: y,
        x: x,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 1.2,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%", // Triggers when the top of the element hits 85% of the viewport height
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: ref });

  return (
    <div
      ref={ref}
      className={cn(fullWidth ? "w-full" : "", className)}
    >
      {children}
    </div>
  );
}
