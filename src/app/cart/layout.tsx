import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Bag",
  description:
    "Review the items in your KAAJ shopping bag before checkout. Free delivery on orders over Rs. 5,000.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/cart",
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
