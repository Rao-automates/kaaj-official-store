"use client";

import { useState } from "react";
import Link from "next/link";

const COLLECTIONS = [
  { label: "Signature Stitched", href: "/shop" },
  { label: "New Arrivals", href: "/shop" },
  { label: "Sale", href: "/categories/sale" },
];

const HELP = [
  { label: "Size Guide", href: "/size-guide" },
  { label: "Care Instructions", href: "/shop" },
  { label: "Track Order", href: "/track-order" },
  { label: "Returns & Exchange", href: "/returns" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-transparent border-t border-kaaj-border text-kaaj-charcoal/80">
      {/* Trust Badges */}
      <div className="border-b border-kaaj-charcoal/10">
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
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-kaaj-charcoal">
                  {item.title}
                </p>
                <p className="font-sans text-[10px] text-kaaj-charcoal/40">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex flex-col items-start gap-4">
              {/* The Brand Symbol */}
              <div className="w-20 h-20 text-kaaj-charcoal">
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
                  <g fill="currentColor">
                    <g transform="translate(100, 100)" stroke="currentColor" fill="none">
                      <line x1="-12" y1="-45" x2="-12" y2="45" strokeWidth="2" />
                      <path d="M 38,-45 C -28,-20 -28,20 38,45" strokeWidth="2" />
                      <path d="M 18,-45 C -18,-20 -18,20 18,45" strokeWidth="0.75" opacity="0.5" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <p className="font-sans text-xs text-kaaj-charcoal/60 leading-relaxed max-w-xs mt-4">
              Where tradition meets modernity. K A A J brings the finest Pakistani
              craftsmanship to women who celebrate their heritage with pride.
            </p>
            {/* Social */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://www.instagram.com/wearkaaj/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center border border-kaaj-charcoal/20 text-kaaj-charcoal/60 hover:border-kaaj-gold hover:text-kaaj-gold transition-colors duration-200"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://wa.me/923013305325"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 flex items-center justify-center border border-kaaj-charcoal/20 text-kaaj-charcoal/60 hover:border-kaaj-gold hover:text-kaaj-gold transition-colors duration-200"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-5">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.25em] text-kaaj-charcoal">
              Collections
            </h3>
            <ul className="space-y-3">
              {COLLECTIONS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-xs text-kaaj-charcoal/60 hover:text-kaaj-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-5">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.25em] text-kaaj-charcoal">
              Help & Information
            </h3>
            <ul className="space-y-3">
              {HELP.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-xs text-kaaj-charcoal/60 hover:text-kaaj-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-5">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.25em] text-kaaj-charcoal">
              Stay Connected
            </h3>
            <p className="font-sans text-xs text-kaaj-charcoal/60 leading-relaxed">
              Be the first to know about new collections, exclusive offers, and styling inspiration.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-kaaj-charcoal/10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-[10px] text-kaaj-charcoal/40 tracking-wide">
            © {new Date().getFullYear()} K A A J. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms & Conditions"].map((label) => (
              <Link
                key={label}
                href="/shop"
                className="font-sans text-[10px] text-kaaj-charcoal/40 hover:text-kaaj-charcoal/70 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-sans text-[10px] text-kaaj-charcoal/60 tracking-widest">Made by</span>
            <a 
              href="https://www.linkedin.com/in/mohyuddin-rao-b9aa8337a" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 font-sans text-[10px] text-kaaj-charcoal/60 tracking-widest hover:text-kaaj-gold transition-colors group"
            >
              <svg viewBox="0 0 200 200" className="w-4 h-4 text-kaaj-gold group-hover:scale-110 transition-transform">
                <g fill="currentColor">
                  <g transform="translate(100, 100)" stroke="currentColor" fill="none">
                    <line x1="-12" y1="-45" x2="-12" y2="45" strokeWidth="2" />
                    <path d="M 38,-45 C -28,-20 -28,20 38,45" strokeWidth="2" />
                    <path d="M 18,-45 C -18,-20 -18,20 18,45" strokeWidth="0.75" opacity="0.5" />
                  </g>
                </g>
              </svg>
              Rao-automates
            </a>
          </div>
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

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Thank you! You have successfully subscribed.");
        setEmail("");
      } else {
        throw new Error(data.error || "Failed to subscribe");
      }
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-kaaj-gold/10 border border-kaaj-gold/30 p-4 text-center">
        <p className="font-sans text-xs text-kaaj-gold uppercase tracking-widest mb-1">Welcome to KAAJ</p>
        <p className="font-sans text-[10px] text-kaaj-charcoal/80">{message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Your email address"
          className="w-full bg-kaaj-charcoal/10 border border-kaaj-charcoal/20 text-kaaj-charcoal placeholder-kaaj-charcoal/30 px-4 py-3 font-sans text-xs focus:outline-none focus:border-kaaj-gold transition-colors"
          disabled={status === "loading"}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-kaaj-gold text-white py-3 font-sans text-[11px] uppercase tracking-[0.2em] hover:bg-kaaj-gold-dark transition-colors duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {status === "error" && (
        <p className="font-sans text-[10px] text-red-400 mt-1">{message}</p>
      )}
      <p className="font-sans text-[10px] text-kaaj-charcoal/30 mt-1">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}
