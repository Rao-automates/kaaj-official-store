"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPKR, cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function CartDrawer() {
  const { cart, isDrawerOpen, closeDrawer, removeFromCart, updateQty, cartTotal, itemCount } =
    useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    if (isDrawerOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen, closeDrawer]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-kaaj-charcoal/40 backdrop-blur-sm z-40 transition-opacity duration-400",
          isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={cn(
          "fixed right-0 top-0 h-full w-full sm:w-[420px] bg-kaaj-cream z-50",
          "flex flex-col shadow-2xl",
          "transition-transform duration-400 ease-expo-out",
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-kaaj-border flex-shrink-0">
          <div>
            <h2 className="font-serif text-xl text-kaaj-charcoal">Your Bag</h2>
            {itemCount > 0 && (
              <p className="font-sans text-xs text-kaaj-muted mt-0.5">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </p>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="w-9 h-9 flex items-center justify-center text-kaaj-charcoal hover:text-kaaj-rose transition-colors"
            aria-label="Close cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
              <div className="opacity-20">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="1">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </div>
              <p className="font-serif text-xl text-kaaj-charcoal">Your bag is empty</p>
              <p className="font-sans text-xs text-kaaj-muted max-w-xs">
                Explore our curated collections and add your favourites.
              </p>
              <button
                onClick={closeDrawer}
                className="font-sans text-xs uppercase tracking-[0.18em] text-kaaj-charcoal border-b border-kaaj-charcoal pb-0.5 hover:text-kaaj-gold transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.items.map((item) => (
              <div key={item.id} className="flex gap-4 pb-5 border-b border-kaaj-border/50 last:border-0">
                {/* Image */}
                <Link
                  href={`/shop/${item.slug}`}
                  onClick={closeDrawer}
                  className="flex-shrink-0 relative w-20 h-24 bg-kaaj-cream-dark overflow-hidden"
                >
                  {item.image?.sourceUrl ? (
                    <Image
                      src={item.image.sourceUrl}
                      alt={item.image.altText || item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-kaaj-cream-dark" />
                  )}
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <Link
                    href={`/shop/${item.slug}`}
                    onClick={closeDrawer}
                    className="font-serif text-sm leading-snug text-kaaj-charcoal hover:text-kaaj-deep transition-colors line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  {Object.entries(item.selectedAttributes).map(([key, val]) => (
                    <p key={key} className="font-sans text-[10px] text-kaaj-muted uppercase tracking-wide">
                      {key.replace(/^pa_/, "").replace(/-/g, " ")}: {val}
                    </p>
                  ))}
                  <p className="font-sans text-sm text-kaaj-charcoal">
                    {formatPKR(String(item.price))}
                  </p>

                  {/* Qty + Remove */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center border border-kaaj-border">
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-kaaj-charcoal hover:bg-kaaj-cream-dark transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                      <span className="w-8 text-center font-sans text-xs text-kaaj-charcoal">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-kaaj-charcoal hover:bg-kaaj-cream-dark transition-colors"
                        aria-label="Increase quantity"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="font-sans text-[10px] uppercase tracking-wide text-kaaj-muted hover:text-kaaj-rose transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="flex-shrink-0 border-t border-kaaj-border px-6 py-5 space-y-4">
            {/* COD Badge */}
            <div className="flex items-center gap-2 bg-kaaj-blush/40 px-3 py-2.5 border border-kaaj-blush">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2D1B0E" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-kaaj-deep">
                Cash on Delivery available
              </p>
            </div>

            {/* Subtotal */}
            <div className="flex justify-between items-center">
              <span className="font-sans text-xs uppercase tracking-widest text-kaaj-muted">
                Subtotal
              </span>
              <span className="font-serif text-lg text-kaaj-charcoal">
                {formatPKR(String(cartTotal))}
              </span>
            </div>

            <p className="font-sans text-[10px] text-kaaj-muted">
              Shipping calculated at checkout.
            </p>

            {/* CTAs */}
            <div className="space-y-2.5">
              <Link href="/checkout" onClick={closeDrawer}>
                <Button variant="primary" size="lg" fullWidth>
                  Checkout
                </Button>
              </Link>
              <Link href="/cart" onClick={closeDrawer}>
                <Button variant="outline" size="md" fullWidth>
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
