import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

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
    default: "K A A J — Premium Pakistani Women’s Fashion",
    template: "%s | K A A J",
  },
  description:
    "Discover KAAJ’s exquisite collection of Pret, Unstitched, Luxury Lawn, and Formal wear. Premium Pakistani women’s fashion crafted with heritage and contemporary elegance.",
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
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://kaajofficial.com",
    siteName: "K A A J",
    title: "K A A J — Premium Pakistani Women’s Fashion",
    description:
      "Exquisite Pret, Unstitched, Luxury Lawn, and Formal collections for the modern Pakistani woman.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "K A A J",
    url: "https://kaajofficial.com",
    logo: "https://kaajofficial.com/icon.svg",
    description: "Premium Pakistani Women’s Fashion",
    sameAs: [
      "https://www.instagram.com/wearkaaj/"
    ]
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-kaaj-cream text-kaaj-charcoal antialiased">
        <CartProvider>
          <Header />
          <CartDrawer />
          <main id="main-content">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
