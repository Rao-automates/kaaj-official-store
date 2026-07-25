"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      {/* @ts-expect-error React 19 vs older @types/react mismatch for ReactNode */}
      {children}
    </ReactLenis>
  );
}
