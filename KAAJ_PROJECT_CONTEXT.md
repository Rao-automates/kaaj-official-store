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
*   **Cross-Selling ("Pairs well with"):** Implemented a dynamic cross-selling section at the absolute bottom of the PDP to increase Average Order Value (AOV). It displays complementary products in a clean grid.
*   **Trust Badges Logic:** We explicitly removed repetitive trust badges from the global site footer. Instead, they are rendered as a premium 3-column layout in the right-hand sticky sidebar of the PDP ("Secure Checkout", "7-Day Returns", "Handcrafted in PK").

### B. Checkout Flow & Payment Logic
*   **Payment Methods Supported:** "Cash on Delivery (COD)" and "Direct Bank Transfer (BACS)".
*   **Dynamic Checkout Button:** The "Place Order" button dynamically updates its text based on the selected payment method (e.g., "Place Order — COD" vs "Place Order — Bank Transfer").
*   **BACS (Direct Bank Transfer) Incentive & Logic:**
    *   Selecting BACS automatically overrides and sets the shipping fee to `Rs. 0` (Free Delivery Incentive).
    *   The WooCommerce Order Status is explicitly mapped to `on-hold` via the API, allowing the KAAJ team to manually verify the bank transfer before moving it to `processing`.
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

## 5. Metadata, SEO, & Formatting Standards
*   **The Apostrophe Bug (`&#39;`):** When writing meta descriptions (like in `src/app/layout.tsx`), Next.js automatically escapes standard straight single quotes (`'`) into HTML entities (`&#39;`). Google's search engine crawler sometimes fails to parse this and displays the ugly raw entity in Search Results. 
    *   **Strict Solution:** We strictly use the typographic curly apostrophe (`’`) (HTML entity `&#8217;`) in *all* metadata strings (e.g., `KAAJ’s`, `women’s`). This permanently prevents the HTML entity bug from appearing on Google SERPs.
*   **Brand Formatting:** The brand name must always be formatted as **K A A J** (with single spaces between letters) in user-facing titles, metadata, and footers. Do not use "Kaaj Official".
*   **Currency Formatting:** All prices are handled by the custom `formatPKR` utility. Ensure strictly typed inputs (string manipulation) when interfacing with the WooCommerce GraphQL/REST returns, as WooCommerce sometimes returns prices as strings or floats inconsistently.

---
*End of Document. Generated on: July 29, 2026*
