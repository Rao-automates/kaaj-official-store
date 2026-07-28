# KAAJ - Project Context & Documentation

This document serves as the master context file for the **KAAJ** storefront. It should be referenced in any new chat to quickly bring the AI or developer up to speed on the project's state, design system, and technical architecture.

## 1. Brand Identity & Aesthetic
*   **Brand:** KAAJ (High-end Pakistani women's wear)
*   **Aesthetic:** "Quiet Luxury", Minimalist, Editorial, Brutalist but refined. Avoid generic e-commerce tropes.
*   **Theme Name:** "Washed Linen"
*   **Layout Rules:** 
    *   Strict adherence to the 2x2 grid system.
    *   High use of negative space.
    *   No cluttered "Trust Badges" in global footers. Badges are kept minimal, text-based, and placed strategically (e.g., in the PDP sidebar).

## 2. Design System & Color Palette
The colors are mapped in `tailwind.config.ts` and `src/app/globals.css`. 
*   **Cream (Backgrounds):** `#DCD8D0` (kaaj-cream)
*   **Charcoal (Primary Text/Accents):** `#1A1A18` (kaaj-charcoal)
*   **Deep/Olive (Secondary Accents):** `#363832` (kaaj-deep)
*   **Gold (Highlights/Accents):** `#C9A84C` (kaaj-gold)
*   **Muted (Secondary Text):** `#A9A499` (kaaj-muted)

*Note: These hex codes are also used for physical branding materials (like Thank You cards) to ensure perfect online-to-offline consistency.*

## 3. Technical Architecture
*   **Frontend:** Next.js 15 (App Router), React, Tailwind CSS.
*   **Backend / E-commerce Engine:** Headless WooCommerce via REST API (`https://api.kaajofficial.com/wp-json/wc/v3/orders`).
*   **Email Engine:** Hostinger Mail API SDK (`HOSTINGER_API_KEY`, `HOSTINGER_MAILBOX_ID`). Used for custom, luxury HTML email receipts.
*   **Hosting:** Vercel (CI/CD connected to `main` branch on GitHub).

## 4. Key Custom Implementations
### A. Product Detail Page (PDP)
*   **Cross-Selling:** Implemented a dynamic "Pairs well with" section at the bottom of the PDP to increase AOV.
*   **Trust Badges:** Rendered as a premium 3-column layout in the right-hand sticky sidebar ("Secure Checkout", "7-Day Returns", "Handcrafted in PK").

### B. Checkout Flow & Payment
*   **Payment Methods:** Supports "Cash on Delivery (COD)" and "Direct Bank Transfer (BACS)".
*   **Direct Bank Transfer (BACS) Logic:**
    *   Selecting BACS sets the shipping fee to `Rs. 0` (Free Delivery Incentive).
    *   WooCommerce Order Status is explicitly set to `on-hold` via API.
    *   **Bank Details:** Hardcoded in `src/app/checkout/page.tsx` and `src/app/api/checkout/route.ts` because WooCommerce REST API does not expose BACS account details dynamically.
    *   **Meezan Bank Details:** 
        *   Title: MEHWISH IMRAN
        *   Account: 01860103756198
        *   IBAN: PK42MEZN0001860103756198
        *   SWIFT: MEZNPKKAXXX
    *   **WhatsApp Integration:** Both the checkout success screen and email receipt include dynamic WhatsApp links pre-filled with the `orderNumber` to prompt users to send payment screenshots.

## 5. Ongoing / Future Notes
*   **SEO:** The brand name has transitioned from "KAAJ OFFICIAL" to just **K A A J**. Ensure all metadata, titles, and footers reflect this spacing.
*   **Currency Formatting:** Handled by `formatPKR` utility. Ensure strictly typed inputs (string manipulation) when interfacing with the WooCommerce GraphQL/REST returns.

---
*Generated on: July 29, 2026*
