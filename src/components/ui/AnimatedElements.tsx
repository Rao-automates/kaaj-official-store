"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function AnimatedHeroTitle({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedLine() {
  return (
    <motion.div
      className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kaaj-gold/30 to-transparent"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
