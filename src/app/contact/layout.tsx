import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with KAAJ\u2019s client services team. Reach us via WhatsApp, email, or Instagram for order inquiries, sizing help, and styling advice.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | K A A J",
    description:
      "Need help with your KAAJ order? Contact our client services team via WhatsApp or email.",
    url: "https://kaajofficial.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
