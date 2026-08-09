"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode, useEffect, useState } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Disable Lenis on mobile for better native scroll performance
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || "ontouchstart" in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.4,
        smoothWheel: true,
        wheelMultiplier: 0.8,
      }}
    >
      {children as any}
    </ReactLenis>
  );
}
