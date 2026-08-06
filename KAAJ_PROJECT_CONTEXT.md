# KAAJ - Comprehensive Master Context & Architecture Document

This document serves as the absolute master context file for the **KAAJ** storefront. It captures every minute detail, design decision, technical workaround, and aesthetic rule established in the project. Any future AI or developer must read this file in its entirety before making *any* code modifications.

## 1. Brand Identity & Aesthetic ("Quiet Luxury")
*   **Brand:** KAAJ (High-end Pakistani women's wear)
*   **Theme Name:** "Washed Linen"
*   **Aesthetic Philosophy:** "Quiet Luxury", Minimalist, Editorial, Brutalist but highly refined. The goal is a premium, high-fashion editorial feel. Avoid generic e-commerce tropes at all costs.
*   **Layout Rules:** 
    *   Strict adherence to the 2x2 grid system for product displays.
    *   Asymmetrical, editorial layouts are preferred over rigid, boxy designs.
    *   High use of negative space (whitespace is a design element, not empty space).
    *   No cluttered, generic "Trust Badges" in global footers. Badges are kept minimal, text-based, and placed strategically (e.g., in the PDP sidebar only).

## 2. Design System: Typography & Color Palette
The design system is strictly enforced via `tailwind.config.ts` and `src/app/globals.css`.

### Typography
*   **Primary Font (Headings/Editorial):** Cormorant (Google Fonts). Mapped to `--font-cormorant`. Used for high-end luxury headers.
*   **Secondary Font (UI/Body):** Inter (Google Fonts). Mapped to `--font-inter`. Used for readable, crisp UI elements like buttons, badges, and small text.

### Color Palette (The "Washed Linen" Theme)
*   **Cream (Backgrounds):** `#DCD8D0` (kaaj-cream) - Used for the main body background.
*   **Charcoal (Primary Text/Accents):** `#1A1A18` (kaaj-charcoal) - Used for main headings, body text, and heavy borders.
*   **Deep/Olive (Secondary Accents):** `#363832` (kaaj-deep) - Used for subtle dark accents.
*   **Gold (Highlights/CTAs):** `#C9A84C` (kaaj-gold) - Used *sparingly* for high-intent actions, like the WhatsApp CTA.
*   **Muted (Secondary Text):** `#A9A499` (kaaj-muted) - Used for labels, placeholder text, and subtle borders.

*Note: These exact hex codes are also used for physical branding materials (like Thank You cards) to ensure perfect online-to-offline brand consistency.*

## 3. Technical Architecture
*   **Frontend Framework:** Next.js 15 (App Router), React, Tailwind CSS.
*   **Backend / E-commerce Engine:** Headless WooCommerce via REST API (`https://api.kaajofficial.com/wp-json/wc/v3/...`).
*   **Email Engine:** Hostinger Mail API SDK (`HOSTINGER_API_KEY`, `HOSTINGER_MAILBOX_ID`). Used for custom, luxury HTML email receipts because default WooCommerce emails are disabled/bypassed in this headless setup.
*   **Hosting & Deployment:** Vercel (CI/CD connected to the `main` branch on GitHub).

## 4. Key Custom Implementations & Minutiae

### A. Product Detail Page (PDP)
*   **Sticky Mobile Actions ("Buy Now / Add to Cart"):** A sticky bottom bar utilizing `IntersectionObserver` keeps the primary CTA buttons always visible on mobile devices as the user scrolls, significantly improving conversion rates.
    *   *Mobile UX Fix:* To prevent "white flash" glitches caused by iOS Safari's URL bar expanding/collapsing, the bar is hidden using `translate-y-[150%]` (ensuring it is fully off-screen) and utilizes `pb-[env(safe-area-inset-bottom)]` to extend the background underneath the home indicator.
*   **Cross-Selling ("Pairs well with"):** Implemented a dynamic cross-selling section at the absolute bottom of the PDP to increase Average Order Value (AOV). It displays complementary products in a clean grid.
*   **Trust Badges Logic:** We explicitly removed repetitive trust badges from the global site footer. Instead, they are rendered as a premium 3-column layout in the right-hand sticky sidebar of the PDP ("Secure Checkout", "7-Day Returns", "Handcrafted in PK").

### B. Checkout Flow & Payment Logic
*   **Payment Methods Supported:** "Cash on Delivery (COD)" and "Direct Bank Transfer (BACS)".
*   **Dynamic Checkout Button:** The "Place Order" button dynamically updates its text based on the selected payment method (e.g., "Place Order — COD" vs "Place Order — Bank Transfer").
*   **BACS (Direct Bank Transfer) Incentive & Logic:**
    *   Selecting BACS automatically overrides and sets the shipping fee to `Rs. 0` (Free Delivery Incentive).
    *   The WooCommerce Order Status is explicitly mapped to `pending` via the API, allowing the KAAJ team to manually verify the bank transfer before moving it to `processing`.
*   **COD (Cash on Delivery) Logic:**
    *   The WooCommerce Order Status is explicitly mapped to `processing` via the API, as the customer has fully committed to the purchase and the store must now fulfill it.
*   **No Customer Accounts (Guest Checkout Only):** To minimize friction for luxury shoppers and avoid technical overhead (authentication/passwords), the site operates strictly via Guest Checkout. Order tracking is handled via a lightweight `/track-order` lookup page.
*   **Hardcoded Bank Details (API Limitation):** Because the WooCommerce REST API (v3) does not securely expose BACS account details dynamically for headless setups, the bank details are intentionally hardcoded in both `src/app/checkout/page.tsx` and `src/app/api/checkout/route.ts`.
    *   **Meezan Bank Details:** 
        *   **Title:** MEHWISH IMRAN
        *   **Account:** 01860103756198
        *   **IBAN:** PK42MEZN0001860103756198
        *   **SWIFT/BIC:** MEZNPKKAXXX
*   **WhatsApp Integration:** Both the checkout success screen and the Hostinger HTML email receipt include dynamic WhatsApp CTA buttons (styled in KAAJ Gold). These buttons link to `923013305325` and are pre-filled with a message containing the specific `orderNumber` to prompt users to send their payment screenshots.

### C. Email Templates
*   **Footer Branding:** The footer of transactional emails has been explicitly stripped of "KAAJ OFFICIAL STORE" and replaced with the spaced, minimalist mark: **K A A J**. 
*   **Conditional Rendering:** The email template in `route.ts` uses conditional logic to inject the Meezan Bank details HTML block *only* if `paymentMethod === "bacs"`.

## 5. SEO, Metadata, & Security Architecture
*   **Enterprise JSON-LD Structured Data:**
    *   **Organization & WebSite:** Injected globally in `src/app/layout.tsx`. Enables Google Sitelinks Search Box via `SearchAction`, and provides local business signals via `contactPoint` and `address`.
    *   **Product Schema:** Rendered dynamically on `shop/[slug]/page.tsx` including `sku`, `brand`, `itemCondition`, and full pricing/availability offers.
    *   **BreadcrumbList:** Added to Product and Category pages to render clean SERP navigation paths (e.g., `Home > Shop > Pret`).
*   **Canonical URLs (Deduplication Strategy):** Every single indexable route explicitly defines an `alternates.canonical` tag to prevent Google duplicate content penalties from query parameters (like `?sort=price`).
*   **Metadata Wrappers for Client Pages:** Since Next.js `"use client"` files cannot export metadata, thin server-component wrappers (`layout.tsx`) are strictly used for all client-side pages (Contact, Returns, Track Order, Cart, Checkout, Search) to ensure complete `<title>` and `<meta name="description">` coverage.
*   **Crawl Budget Optimization (`robots.ts`):** Explicitly blocks `/api/`, `/cart`, `/checkout`, and `/search` to ensure Google's crawl budget is focused purely on product discovery.
*   **Sitemap Generation (`sitemap.ts`):** Automatically maps all static and dynamic (Product, Category) routes. The dynamic product route base is strictly `/shop/` (not `/product/`).
*   **Security & Performance Headers (`next.config.ts`):** Enforces HSTS, X-Frame-Options (DENY), X-Content-Type-Options (nosniff), and strict Referrer-Policies to maximize Google Trust signals. Enforces `trailingSlash: false`.
*   **The Apostrophe Bug (`&#39;`):** When writing meta descriptions (like in `src/app/layout.tsx`), Next.js automatically escapes standard straight single quotes (`'`) into HTML entities (`&#39;`). We strictly use the typographic curly apostrophe (`’`) (HTML entity `&#8217;`) in *all* metadata strings (e.g., `KAAJ’s`, `women’s`) to prevent this.
*   **Brand Formatting:** The brand name must always be formatted as **K A A J** (with single spaces between letters) in user-facing titles, metadata, and footers. Do not use "Kaaj Official".
*   **Currency Formatting:** All prices are handled by the custom `formatPKR` utility. Ensure strictly typed inputs (string manipulation) when interfacing with the WooCommerce GraphQL/REST returns.
*   **Favicon & Google Search Icons:** The app utilizes `src/app/icon.svg` for modern browsers. However, to ensure compatibility with Google's slow Favicon crawler (`Googlebot-Image`) and legacy bots, explicit fallback files (`src/app/favicon.ico` and `src/app/apple-icon.png`) are strictly maintained.

## 6. Performance & Analytics (Lighthouse 100/100)
*   **Google Analytics 4 (GA4):** Integrated using Next.js's highly optimized `@next/third-parties/google` component in `src/app/layout.tsx`. Requires the `NEXT_PUBLIC_GA_ID` environment variable in Vercel to activate tracking. This method ensures zero impact on performance scores.
*   **LCP (Largest Contentful Paint) Optimization:** To achieve 100/100 on Mobile Lighthouse, all primary above-the-fold images (such as the main `HeroBanner` and `Category` page heroes) must include `priority={true}` AND `fetchPriority="high"`. This overrides browser-level lazy-loading bottlenecks and forces the hero images to download instantly.

## 7. Store Management Strategy
*   **No Web Admin Portal:** We explicitly decided *not* to build a custom Next.js admin dashboard. All order management, status updates, and inventory tracking are handled exclusively through the native **WooCommerce Mobile App** (or the WordPress backend if necessary). This keeps the Next.js repository strictly focused on the customer storefront, maximizing security and minimizing technical debt.

## 8. Future Enhancements & Automation

### WhatsApp Order Confirmations (Zero-Cost Architecture)
A robust, free architecture has been designed to automate WhatsApp order confirmations using the Meta Cloud API and headless WooCommerce webhooks. This architecture avoids paid SaaS plugins entirely.

*   **Infrastructure:** To remain completely free, the system will use an **Oracle Cloud Always Free Tier** VPS (Compute Instance). 
*   **Automation Engine:** A self-hosted **n8n Community Edition** instance will be deployed via Docker on the Oracle VPS. The `infrastructure/docker-compose.yml` file has been scaffolded to support this.
*   **Routing & SSL:** **Nginx Proxy Manager** (via Docker) will handle Let's Encrypt SSL certificates automatically, which is a strict requirement for n8n webhooks and the Meta API.
*   **Data Flow:** 
    1.  WordPress/WooCommerce triggers an `Order Created` webhook.
    2.  n8n receives the JSON payload.
    3.  A custom JavaScript node within n8n sanitizes the Pakistani phone number (stripping leading zeros/spaces and converting to the strict international format `923XXXXXXXXX`).
    4.  n8n hits the Meta WhatsApp Cloud API using a Permanent System User Token to send a pre-approved template message to the customer.

---
*End of Document. Generated on: August 2026*
