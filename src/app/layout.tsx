import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import PerformanceProvider from "@/components/providers/PerformanceProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { GoogleAnalytics } from "@next/third-parties/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kaajofficial.com"),
  title: {
    default: "K A A J — Premium Pakistani Women’s Fashion | KAAJ",
    template: "%s | K A A J",
  },
  description:
    "KAAJ — Discover KAAJ’s exquisite collection of Pret, Unstitched, Luxury Lawn, and Formal wear. Premium Pakistani women’s fashion crafted with heritage and contemporary elegance. Shop KAAJ online.",
  keywords: [
    "Pakistani women’s fashion",
    "Pakistani designer dresses",
    "Luxury pret wear Pakistan",
    "Unstitched lawn collections",
    "Pakistani formal wear",
    "Ready to wear Pakistani clothes",
    "Pakistani suits online UK USA",
    "Pakistani boutique online",
    "Pakistani luxury lawn 2026",
    "Designer pret wear online",
    "Unstitched chiffon suits",
    "Embroidered lawn suits",
    "Festive unstitched collection",
    "Heavy formal dresses Pakistani",
    "Pakistani designer clothes online UK",
    "Luxury formal wear Pakistan",
    "Pret",
    "Unstitched",
    "Luxury Lawn",
    "Formals",
    "Eastern wear",
    "Desi fashion",
    "KAAJ",
    "KAAJ Pakistan",
    "KAAJ clothing",
    "KAAJ fashion",
    "KAAJ online store",
    "K A A J",
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://kaajofficial.com",
    siteName: "K A A J",
    title: "K A A J — Premium Pakistani Women’s Fashion | KAAJ",
    description:
      "KAAJ — Exquisite Pret, Unstitched, Luxury Lawn, and Formal collections for the modern Pakistani woman. Shop KAAJ online.",
  },
  twitter: {
    card: "summary_large_image",
    title: "K A A J",
    description: "Premium Pakistani Women's Fashion",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KAAJ",
    alternateName: "K A A J",
    url: "https://kaajofficial.com",
    logo: "https://kaajofficial.com/icon.svg",
    description: "KAAJ — Premium Pakistani Women’s Fashion. Shop Pret, Unstitched, Luxury Lawn, and Formal wear online.",
    sameAs: [
      "https://www.instagram.com/wearkaaj/"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+92-301-330-5325",
      contactType: "customer service",
      availableLanguage: ["English", "Urdu"],
      areaServed: ["PK", "GB", "US", "AE", "CA"],
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
    },
  };

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KAAJ",
    alternateName: "K A A J",
    url: "https://kaajofficial.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://kaajofficial.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body className="font-sans bg-kaaj-cream text-kaaj-charcoal antialiased">
        <CartProvider>
          <PerformanceProvider />
          <Header />
          <CartDrawer />
          <main id="main-content">{children}</main>
          <Footer />
        </CartProvider>
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      </body>
    </html>
  );
}
