import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search KAAJ\u2019s complete collection of Pret, Unstitched, Luxury Lawn, and Formal Pakistani women\u2019s wear.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
