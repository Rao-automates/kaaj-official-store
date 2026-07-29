import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Order",
  description:
    "Track your KAAJ order status in real-time. Enter your order number and email to check the latest shipping and delivery updates.",
  alternates: {
    canonical: "/track-order",
  },
  openGraph: {
    title: "Track Your Order | K A A J",
    description:
      "Check the status of your KAAJ order. Enter your order ID and email to get real-time updates.",
    url: "https://kaajofficial.com/track-order",
  },
};

export default function TrackOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
