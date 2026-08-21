import type { Metadata } from "next";
import { Inter, Noto_Nastaliq_Urdu, Jost } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import PerformanceProvider from "@/components/providers/PerformanceProvider";
// Lenis smooth scroll removed — caused lag on high-res displays
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import Script from "next/script";



const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  variable: "--font-nastaliq",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kaajofficial.com"),
  title: {
    default: "K A A J",
    template: "%s | K A A J",
  },
  description:
    "KAAJ — Discover KAAJ’s exquisite collections. Pakistani women’s fashion crafted with heritage and contemporary elegance. Shop KAAJ online.",
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
    title: "K A A J",
    description:
      "KAAJ — Exquisite collections for the modern Pakistani woman. Shop KAAJ online.",
  },
  twitter: {
    card: "summary_large_image",
    title: "K A A J",
    description: "Pakistani Women's Fashion",
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
    description: "KAAJ — Pakistani Women’s Fashion. Shop exquisite collections online.",
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
    <html lang="en" className={inter.variable}>
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
      <body className={`${inter.variable} ${nastaliq.variable} ${jost.variable} font-sans bg-kaaj-cream text-kaaj-charcoal antialiased`}>
        <CartProvider>
          <PerformanceProvider />
          <Header />
          <CartDrawer />
          <main id="main-content">{children}</main>
          <Footer />
        </CartProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
