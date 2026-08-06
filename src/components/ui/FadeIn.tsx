"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  fullWidth?: boolean;
  blur?: boolean;
  scale?: boolean;
  className?: string;
  duration?: number;
}

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  fullWidth = false,
  blur = false,
  scale = false,
  className = "",
  duration = 0.9,
}: FadeInProps) {
  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      className={`${fullWidth ? "w-full" : ""} ${className}`}
      initial={{
        opacity: 0,
        ...directions[direction],
        ...(blur ? { filter: "blur(10px)" } : {}),
        ...(scale ? { scale: 0.95 } : {}),
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        ...(blur ? { filter: "blur(0px)" } : {}),
        ...(scale ? { scale: 1 } : {}),
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration,
        ease: [0.16, 1, 0.3, 1],
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}
