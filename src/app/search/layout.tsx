import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search KAAJ’s exquisite collections of Pakistani women’s wear.",
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
