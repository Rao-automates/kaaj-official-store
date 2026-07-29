import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "K A A J \u2014 Premium Pakistani Women\u2019s Fashion | KAAJ",
  description:
    "KAAJ \u2014 Discover KAAJ\u2019s exquisite collection of Pret, Unstitched, Luxury Lawn, and Formal wear. Premium Pakistani women\u2019s fashion crafted with heritage and contemporary elegance. Shop KAAJ online.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "K A A J \u2014 Premium Pakistani Women\u2019s Fashion",
    description:
      "Discover KAAJ\u2019s exquisite Pret, Unstitched, Luxury Lawn, and Formal collections. Shop Pakistani women\u2019s fashion online.",
    url: "https://kaajofficial.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "K A A J \u2014 Premium Pakistani Women\u2019s Fashion",
    description:
      "Shop KAAJ\u2019s exquisite Pret, Unstitched, Luxury Lawn, and Formal collections online.",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
