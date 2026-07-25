import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop All Collections",
  description:
    "Browse Kaaj Official's complete collection of Pret, Unstitched, Luxury Lawn, and Formal Pakistani women's wear.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-kaaj-cream flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-kaaj-charcoal/20 border-t-kaaj-charcoal rounded-full animate-spin"></div>
      </div>
    }>
      <ShopClient />
    </Suspense>
  );
}
