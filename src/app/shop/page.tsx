import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop All Collections",
  description:
    "Browse KAAJ\u2019s complete collection of Pret, Unstitched, Luxury Lawn, and Formal Pakistani women\u2019s wear. Shop KAAJ online.",
  alternates: {
    canonical: "/shop",
  },
  openGraph: {
    title: "Shop All Collections | K A A J",
    description:
      "Browse KAAJ\u2019s complete Pret, Unstitched, Luxury Lawn, and Formal collections. Free delivery on orders over Rs. 5,000.",
    url: "https://kaajofficial.com/shop",
  },
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
