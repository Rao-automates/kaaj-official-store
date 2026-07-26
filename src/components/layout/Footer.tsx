"use client";

import Link from "next/link";

const COLLECTIONS = [
  { label: "Signature Stitched", href: "/shop" },
  { label: "New Arrivals", href: "/shop" },
  { label: "Sale", href: "/categories/sale" },
];

const HELP = [
  { label: "Size Guide", href: "/shop" },
  { label: "Care Instructions", href: "/shop" },
  { label: "Track Order", href: "/track-order" },
  { label: "Returns & Exchange", href: "/returns" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-kaaj-charcoal text-kaaj-cream/80">
      {/* Trust Badges */}
      <div className="border-b border-kaaj-cream/10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { 
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M5 9.5V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-1M5 9.5L1 12v5a2 2 0 002 2h2m-4-9.5h4" />
                    <circle cx="7" cy="19" r="2" />
                    <circle cx="19" cy="19" r="2" />
                  </svg>
                ), 
                title: "Free Delivery", 
                sub: "On orders over ₨ 5,000" 
              },
              { 
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M6 12h.01M18 12h.01" />
                  </svg>
                ), 
                title: "Cash on Delivery", 
                sub: "Nationwide COD available" 
              },
              { 
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M2 12a10 10 0 1010-10 10 10 0 00-10 10z" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                ), 
                title: "Easy Returns", 
                sub: "7-day return policy" 
              },
              { 
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.5-6.3-4.8-6.3 4.8 2.3-7.5-6-4.6h7.6z" />
                  </svg>
                ), 
                title: "Authentic Craft", 
                sub: "Hand-picked luxury fabrics" 
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-3">
                <span className="text-kaaj-gold">{item.icon}</span>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-kaaj-cream">
                  {item.title}
                </p>
                <p className="font-sans text-[10px] text-kaaj-cream/40">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-5">
            <div>
              <p 
                className="font-sans text-3xl text-kaaj-cream font-medium"
                style={{ letterSpacing: "0.5em", marginLeft: "0.5em" }}
              >
                KAAJ
              </p>
              <p className="font-sans text-[9px] uppercase tracking-[0.4em] text-kaaj-cream/40 mt-0.5">
                Official
              </p>
            </div>
            <p className="font-sans text-xs text-kaaj-cream/60 leading-relaxed max-w-xs">
              Where tradition meets modernity. Kaaj Official brings the finest Pakistani
              craftsmanship to women who celebrate their heritage with pride.
            </p>
            {/* Social */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://www.instagram.com/wearkaaj/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center border border-kaaj-cream/20 text-kaaj-cream/60 hover:border-kaaj-gold hover:text-kaaj-gold transition-colors duration-200"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://wa.me/923013305325"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 flex items-center justify-center border border-kaaj-cream/20 text-kaaj-cream/60 hover:border-kaaj-gold hover:text-kaaj-gold transition-colors duration-200"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-5">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.25em] text-kaaj-cream">
              Collections
            </h3>
            <ul className="space-y-3">
              {COLLECTIONS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-xs text-kaaj-cream/60 hover:text-kaaj-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-5">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.25em] text-kaaj-cream">
              Help & Information
            </h3>
            <ul className="space-y-3">
              {HELP.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-xs text-kaaj-cream/60 hover:text-kaaj-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-5">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.25em] text-kaaj-cream">
              Stay Connected
            </h3>
            <p className="font-sans text-xs text-kaaj-cream/60 leading-relaxed">
              Be the first to know about new collections, exclusive offers, and styling inspiration.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2.5"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-kaaj-cream/10 border border-kaaj-cream/20 text-kaaj-cream placeholder-kaaj-cream/30 px-4 py-3 font-sans text-xs focus:outline-none focus:border-kaaj-gold transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-kaaj-gold text-white py-3 font-sans text-[11px] uppercase tracking-[0.2em] hover:bg-kaaj-gold-dark transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
            <p className="font-sans text-[10px] text-kaaj-cream/30">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-kaaj-cream/10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-[10px] text-kaaj-cream/40 tracking-wide">
            © {new Date().getFullYear()} Kaaj Official. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms & Conditions"].map((label) => (
              <Link
                key={label}
                href="/shop"
                className="font-sans text-[10px] text-kaaj-cream/40 hover:text-kaaj-cream/70 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
          <p className="font-sans text-[10px] text-kaaj-cream/30 tracking-widest">
            Made with ♡ in Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
}
