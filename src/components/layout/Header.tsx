"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import SearchModal from "./SearchModal";

const NAV_LINKS = [
  { label: "Shop All", href: "/shop" },
  { label: "New Arrivals", href: "/shop" },
  { label: "Sale", href: "/categories/sale" },
  { label: "Story", href: "/about" },
];

export default function Header() {
  const { itemCount, openDrawer } = useCart();
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      setPastHero(window.scrollY > window.innerHeight * 0.6);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-500 py-4",
          scrolled || menuOpen
            ? "bg-[#FAF9F6]/98 sm:bg-[#FAF9F6]/95 sm:backdrop-blur-md border-b border-black/5"
            : "bg-transparent"
        )}
      >
        {/* Main Header */}
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Left: Hamburger ↔ Close toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative w-12 h-12 flex items-center justify-start transition-colors z-[60] text-kaaj-charcoal hover:text-kaaj-gold"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-6 h-4 flex flex-col justify-between">
                <div className={cn(
                  "h-[1px] bg-current transition-all duration-500 origin-left",
                  menuOpen ? "rotate-45 w-[22px] translate-x-[2px] -translate-y-[1px]" : "w-6"
                )} />
                <div className={cn(
                  "h-[1px] w-4 bg-current transition-all duration-300",
                  menuOpen ? "opacity-0 translate-x-4" : "opacity-100"
                )} />
                <div className={cn(
                  "h-[1px] bg-current transition-all duration-500 origin-left",
                  menuOpen ? "-rotate-45 w-[22px] translate-x-[2px] translate-y-[1px]" : "w-6"
                )} />
              </div>
            </button>

            {/* Center: Logo */}
            <Link
              href="/"
              className={cn(
                "absolute left-1/2 -translate-x-1/2 flex flex-col items-center group transition-all duration-500 pointer-events-auto translate-y-0",
                isHomepage && !scrolled ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100 hover:scale-105"
              )}
              aria-label="KAAJ Home"
              onClick={() => setMenuOpen(false)}
            >
              <KaajLogo />
            </Link>

            {/* Right: Search + Cart */}
            <div className="flex items-center gap-2 sm:gap-6">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-10 h-10 flex items-center justify-center text-kaaj-charcoal hover:text-kaaj-gold transition-colors"
                aria-label="Search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>

              <button
                onClick={openDrawer}
                className="relative w-10 h-10 flex items-center justify-center text-kaaj-charcoal hover:text-kaaj-gold transition-colors text-lg"
                aria-label={`Open cart${mounted && itemCount > 0 ? `, ${itemCount} items` : ""}`}
              >
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] hidden sm:block mr-2"></span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {mounted && itemCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-kaaj-gold text-[#2E302A] text-[9px] font-sans flex items-center justify-center rounded-full">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Fluid Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-500",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-full sm:w-[400px] bg-[#141413] border-r border-white/5 flex flex-col transform-gpu",
            "transition-transform duration-700 ease-expo-out",
            menuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Spacing for header */}
          <div className="h-28" />

          <nav className="flex-1 flex flex-col px-12 py-8 gap-6">
            {NAV_LINKS.map((link, idx) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="group w-fit"
              >
                <div className="overflow-hidden">
                  <span className={cn(
                    "block font-sans text-2xl sm:text-3xl uppercase tracking-[0.1em] font-medium transition-transform duration-500",
                    link.label === "Sale" ? "text-kaaj-rose group-hover:text-kaaj-rose/70" : "text-white group-hover:text-kaaj-gold",
                    menuOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                  )}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    {link.label}
                  </span>
                </div>
              </Link>
            ))}
          </nav>

          <div className="px-12 py-12 border-t border-white/5">
            <p className="font-sans text-[9px] uppercase tracking-[0.4em] text-white/50 mb-6 drop-shadow-sm">
              Connect
            </p>
            <div className="flex gap-6">
              <a href="https://www.instagram.com/wearkaaj/" target="_blank" rel="noopener noreferrer"
                className="text-white/80 hover:text-kaaj-gold transition-colors" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://www.facebook.com/people/K-A-A-J/61593156713945/" target="_blank" rel="noopener noreferrer"
                className="text-white/80 hover:text-kaaj-gold transition-colors" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://wa.me/923013305325" target="_blank" rel="noopener noreferrer"
                className="text-white/80 hover:text-kaaj-gold transition-colors" aria-label="WhatsApp">
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
    <div className="flex flex-col items-center select-none group-hover:opacity-80 transition-opacity">
      <span className="font-sans font-medium text-xl text-kaaj-charcoal tracking-[0.4em] drop-shadow-md">
        KAAJ
      </span>
    </div>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
}
