import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & Exchange",
  description:
    "KAAJ\u2019s hassle-free 7-day return and exchange policy. Submit a return request for your KAAJ order online within 7 days of delivery.",
  alternates: {
    canonical: "/returns",
  },
  openGraph: {
    title: "Returns & Exchange | K A A J",
    description:
      "Easy returns and exchanges within 7 days. Submit your return request online.",
    url: "https://kaajofficial.com/returns",
  },
};

export default function ReturnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
