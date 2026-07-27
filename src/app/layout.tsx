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
  title: {
    default: "KAAJ — Premium Pakistani Women's Fashion",
    template: "%s | KAAJ",
  },
  description:
    "Discover KAAJ's exquisite collection of Pret, Unstitched, Luxury Lawn, and Formal wear. Premium Pakistani women's fashion crafted with heritage and contemporary elegance.",
  keywords: [
    "Pakistani women's fashion",
    "Pret",
    "Unstitched",
    "Luxury Lawn",
    "Formals",
    "Pakistani clothing",
    "Eastern wear",
    "KAAJ",
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://kaajofficial.com",
    siteName: "KAAJ",
    title: "KAAJ — Premium Pakistani Women's Fashion",
    description:
      "Exquisite Pret, Unstitched, Luxury Lawn, and Formal collections for the modern Pakistani woman.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KAAJ",
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
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
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
