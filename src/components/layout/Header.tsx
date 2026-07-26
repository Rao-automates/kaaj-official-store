"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import SearchModal from "./SearchModal";

const NAV_LINKS_LEFT = [
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/shop" },
];

const NAV_LINKS_RIGHT = [
  { label: "Sale", href: "/shop" },
];

export default function Header() {
  const { itemCount, openDrawer } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-kaaj-charcoal/70 backdrop-blur-xl border-b border-white/5 py-2 shadow-2xl"
            : "bg-gradient-to-b from-black/60 to-transparent py-4"
        )}
      >
        {/* Main Header */}
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile: Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-kaaj-cream/90 hover:text-white transition-colors"
              aria-label="Open menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            {/* Desktop: Left Nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {NAV_LINKS_LEFT.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-sans text-xs uppercase tracking-[0.2em] text-kaaj-cream/80 hover:text-white transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-2 left-0 w-0 h-px bg-kaaj-gold transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Logo — Centre */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group transition-transform hover:scale-105 duration-500"
              aria-label="Kaaj Official Home"
            >
              <KaajLogo />
            </Link>

            {/* Right: Search + Cart */}
            <div className="flex items-center gap-6">
              {/* Desktop: Right Nav */}
              <nav className="hidden lg:flex items-center gap-8 mr-4" aria-label="Right navigation">
                {NAV_LINKS_RIGHT.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-sans text-xs uppercase tracking-[0.2em] text-kaaj-cream/80 hover:text-white transition-colors duration-300 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-2 left-0 w-0 h-px bg-kaaj-gold transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </nav>

              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="w-10 h-10 flex items-center justify-center text-kaaj-cream/90 hover:text-white transition-colors"
                aria-label="Search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>

              {/* Cart */}
              <button
                onClick={openDrawer}
                className="relative w-10 h-10 flex items-center justify-center text-kaaj-cream/90 hover:text-white transition-colors"
                aria-label={`Open cart${mounted && itemCount > 0 ? `, ${itemCount} items` : ""}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {mounted && itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-kaaj-gold text-kaaj-charcoal text-[9px] font-sans flex items-center justify-center rounded-full">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-opacity duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-kaaj-charcoal/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Slide-in Panel */}
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-[280px] bg-kaaj-cream flex flex-col",
            "transition-transform duration-400 ease-expo-out",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-kaaj-border">
            <span className="font-serif text-xl text-kaaj-charcoal">Menu</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-8 h-8 flex items-center justify-center text-kaaj-charcoal"
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 flex flex-col px-6 py-8 gap-1">
            {[...NAV_LINKS_LEFT, ...NAV_LINKS_RIGHT].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "py-3 font-sans text-sm uppercase tracking-[0.18em] border-b border-kaaj-border/50",
                  "transition-colors duration-200",
                  link.label === "Sale"
                    ? "text-kaaj-rose"
                    : "text-kaaj-charcoal hover:text-kaaj-gold"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="px-6 py-6 border-t border-kaaj-border">
            <p className="font-sans text-[10px] uppercase tracking-widest text-kaaj-muted mb-3">
              Follow us
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/wearkaaj/" target="_blank" rel="noopener noreferrer"
                className="text-kaaj-charcoal hover:text-kaaj-gold transition-colors" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://facebook.com/kaajofficial" target="_blank" rel="noopener noreferrer"
                className="text-kaaj-charcoal hover:text-kaaj-gold transition-colors" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://wa.me/923013305325" target="_blank" rel="noopener noreferrer"
                className="text-kaaj-charcoal hover:text-kaaj-gold transition-colors" aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function KaajLogo() {
  return (
    <div className="flex flex-col items-center select-none group-hover:opacity-100 transition-opacity drop-shadow-md">
      <span
        className="font-serif text-2xl tracking-[0.35em] text-white"
        style={{ letterSpacing: "0.35em" }}
      >
        KAAJ
      </span>
      <span className="font-sans text-[7px] uppercase tracking-[0.4em] text-white/70 mt-0.5">
        Official
      </span>
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
}
