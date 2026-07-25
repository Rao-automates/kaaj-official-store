"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPKR, cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, cartTotal, itemCount } = useCart();

  const shipping = cartTotal >= 5000 ? 0 : 250;
  const total = cartTotal + shipping;

  return (
    <div className="min-h-screen bg-kaaj-cream">
      {/* Page header */}
      <div className="bg-kaaj-deep py-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
        <div className="relative z-10">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-gold mb-4">
            — Your Selection
          </p>
          <h1 className="font-serif text-display-md text-kaaj-cream">
            Shopping Bag
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {cart.items.length === 0 ? (
          /* Empty state */
          <div className="text-center py-20">
            <div className="flex justify-center mb-6 opacity-20">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="1">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </div>
            <p className="font-serif text-3xl text-kaaj-charcoal mb-4">
              Your bag is empty
            </p>
            <p className="font-sans text-sm text-kaaj-muted mb-8 max-w-xs mx-auto">
              Explore our curated collections and find something you love.
            </p>
            <Link href="/shop">
              <Button variant="primary" size="lg">
                Browse Collections
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items — left 2/3 */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-kaaj-border">
                <h2 className="font-serif text-xl text-kaaj-charcoal">
                  {itemCount} {itemCount === 1 ? "Item" : "Items"}
                </h2>
                <Link
                  href="/shop"
                  className="font-sans text-[11px] uppercase tracking-[0.15em] text-kaaj-muted hover:text-kaaj-charcoal transition-colors border-b border-current pb-0.5"
                >
                  Continue Shopping
                </Link>
              </div>

              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-5 pb-6 border-b border-kaaj-border/50 last:border-0"
                >
                  {/* Image */}
                  <Link
                    href={`/shop/${item.slug}`}
                    className="flex-shrink-0 relative w-24 h-32 bg-kaaj-cream-dark overflow-hidden group"
                  >
                    {item.image?.sourceUrl ? (
                      <Image
                        src={item.image.sourceUrl}
                        alt={item.image.altText || item.name}
                        fill
                        sizes="96px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-kaaj-cream-dark" />
                    )}
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4">
                      <Link
                        href={`/shop/${item.slug}`}
                        className="font-serif text-lg leading-snug text-kaaj-charcoal hover:text-kaaj-deep transition-colors"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex-shrink-0 text-kaaj-muted hover:text-kaaj-rose transition-colors mt-0.5"
                        aria-label="Remove item"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>

                    {/* Attributes */}
                    {Object.entries(item.selectedAttributes).map(([key, val]) => (
                      <p key={key} className="font-sans text-[11px] text-kaaj-muted uppercase tracking-wide mt-1">
                        {key.replace(/^pa_/, "").replace(/-/g, " ")}: {val}
                      </p>
                    ))}

                    <div className="flex items-center justify-between mt-4">
                      {/* Qty stepper */}
                      <div className="flex items-center border border-kaaj-border">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center text-kaaj-charcoal hover:bg-kaaj-cream-dark transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>
                        <span className="w-10 text-center font-sans text-sm text-kaaj-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center text-kaaj-charcoal hover:bg-kaaj-cream-dark transition-colors"
                          aria-label="Increase quantity"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>
                      </div>

                      {/* Line total */}
                      <span className="font-serif text-lg text-kaaj-charcoal">
                        {formatPKR(String(item.price * item.quantity))}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary — right 1/3 */}
            <div className="lg:col-span-1">
              <div className="bg-kaaj-cream-dark border border-kaaj-border p-6 sticky top-28">
                <h2 className="font-serif text-xl text-kaaj-charcoal mb-5 pb-4 border-b border-kaaj-border">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm font-sans">
                  <div className="flex justify-between text-kaaj-charcoal">
                    <span>Subtotal</span>
                    <span>{formatPKR(String(cartTotal))}</span>
                  </div>
                  <div className="flex justify-between text-kaaj-charcoal">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-kaaj-olive font-medium" : ""}>
                      {shipping === 0 ? "Free" : formatPKR(String(shipping))}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[11px] text-kaaj-muted">
                      Add {formatPKR(String(5000 - cartTotal))} more for free delivery
                    </p>
                  )}
                </div>

                <div className="h-px bg-kaaj-border my-5" />

                <div className="flex justify-between items-center mb-6">
                  <span className="font-sans text-sm uppercase tracking-widest text-kaaj-charcoal">
                    Total
                  </span>
                  <span className="font-serif text-2xl text-kaaj-charcoal">
                    {formatPKR(String(total))}
                  </span>
                </div>

                {/* COD badge */}
                <div className="flex items-center gap-2 bg-kaaj-blush/50 border border-kaaj-blush px-3 py-2.5 mb-4">
                  <span className="text-sm">💵</span>
                  <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-kaaj-deep">
                    Cash on Delivery Available
                  </p>
                </div>

                <Link href="/checkout">
                  <Button variant="primary" size="lg" fullWidth>
                    Proceed to Checkout
                  </Button>
                </Link>

                <p className="font-sans text-[10px] text-kaaj-muted text-center mt-4">
                  Secure checkout · No hidden fees
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
