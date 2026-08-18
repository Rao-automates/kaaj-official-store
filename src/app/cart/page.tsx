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
    <div className="min-h-screen bg-transparent flex flex-col pt-32 md:pt-48 pb-32">
      {/* Editorial Header */}
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="flex flex-col items-start max-w-4xl">
          <h1 className="font-sans text-[clamp(3rem,10vw,7rem)] leading-[0.9] text-kaaj-charcoal tracking-tighter -ml-1 md:-ml-2 mb-8">
            Bag.
          </h1>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
        {cart.items.length === 0 ? (
          /* Empty state */
          <div className="text-center py-20 border border-kaaj-charcoal/20">
            <div className="flex justify-center mb-6 opacity-20">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#DCD8D0" strokeWidth="1">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </div>
            <p className="font-sans text-3xl text-kaaj-charcoal mb-4">
              Your bag is empty
            </p>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-kaaj-charcoal/70 mb-12 max-w-xs mx-auto leading-loose">
              Explore our curated archives and find something you love.
            </p>
            <Link href="/shop" className="group relative inline-flex items-center gap-4 py-4 px-12 border border-kaaj-charcoal/20 hover:border-kaaj-gold transition-colors duration-500 justify-center">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-kaaj-charcoal group-hover:text-kaaj-gold transition-colors duration-500">
                Browse Archives
              </span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Cart Items — left 2/3 */}
            <div className="lg:col-span-2 space-y-12">
              <div className="flex items-center justify-between pb-6 border-b border-kaaj-charcoal/20">
                <h2 className="font-sans text-3xl text-kaaj-charcoal">
                  {itemCount} {itemCount === 1 ? "Item" : "Items"}
                </h2>
                <Link
                  href="/shop"
                  className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal/70 hover:text-kaaj-gold transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>

              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-8 pb-12 border-b border-kaaj-charcoal/10 last:border-0"
                >
                  {/* Image */}
                  <Link
                    href={`/shop/${item.slug}`}
                    className="flex-shrink-0 relative w-full sm:w-40 aspect-[3/4] bg-kaaj-charcoal/5 overflow-hidden group"
                  >
                    {item.image?.sourceUrl ? (
                      <Image
                        src={item.image.sourceUrl}
                        alt={item.image.altText || item.name}
                        fill
                        sizes="160px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-kaaj-charcoal/5" />
                    )}
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between gap-4 items-start">
                        <Link
                          href={`/shop/${item.slug}`}
                          className="font-sans text-2xl leading-snug text-kaaj-charcoal hover:text-kaaj-gold transition-colors"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex-shrink-0 text-kaaj-charcoal/70 hover:text-kaaj-gold transition-colors mt-1"
                          aria-label="Remove item"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>

                      {/* Attributes */}
                      <div className="mt-4 space-y-2">
                        {Object.entries(item.selectedAttributes).map(([key, val]) => (
                          <p key={key} className="font-sans text-[10px] text-kaaj-charcoal/70 uppercase tracking-[0.2em]">
                            {key.replace(/^pa_/, "").replace(/-/g, " ")}: <span className="text-kaaj-charcoal">{val}</span>
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-end justify-between mt-8">
                      {/* Qty stepper */}
                      <div className="flex items-center border border-kaaj-charcoal/20">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center text-kaaj-charcoal hover:bg-kaaj-charcoal/10 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>
                        <span className="w-12 text-center font-sans text-xs text-kaaj-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-kaaj-charcoal hover:bg-kaaj-charcoal/10 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>
                      </div>

                      {/* Line total */}
                      <span className="font-sans text-2xl text-kaaj-charcoal">
                        {formatPKR(String(item.price * item.quantity))}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary — right 1/3 */}
            <div className="lg:col-span-1">
              <div className="border border-kaaj-charcoal/20 p-8 sticky top-28 bg-kaaj-charcoal/5 backdrop-blur-md">
                <h2 className="font-sans text-2xl text-kaaj-charcoal mb-8 pb-6 border-b border-kaaj-charcoal/20">
                  Summary
                </h2>

                <div className="space-y-6 text-sm font-sans mb-8">
                  <div className="flex justify-between text-kaaj-charcoal/80">
                    <span className="uppercase tracking-[0.2em] text-[10px]">Subtotal</span>
                    <span className="font-sans text-lg">{formatPKR(String(cartTotal))}</span>
                  </div>
                  <div className="flex justify-between text-kaaj-charcoal/80">
                    <span className="uppercase tracking-[0.2em] text-[10px]">Shipping</span>
                    <span className={shipping === 0 ? "text-kaaj-gold font-sans text-lg" : "font-sans text-lg"}>
                      {shipping === 0 ? "Complimentary" : formatPKR(String(shipping))}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[9px] uppercase tracking-[0.1em] text-kaaj-gold text-right">
                      Add {formatPKR(String(5000 - cartTotal))} more for complimentary delivery
                    </p>
                  )}
                </div>

                <div className="h-px bg-kaaj-charcoal/20 my-8" />

                <div className="flex justify-between items-end mb-10">
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-kaaj-charcoal/70">
                    Total
                  </span>
                  <span className="font-sans text-3xl text-kaaj-charcoal">
                    {formatPKR(String(total))}
                  </span>
                </div>

                {/* COD badge */}
                <div className="flex items-center justify-center gap-3 border border-kaaj-gold/30 bg-kaaj-gold/5 px-4 py-4 mb-8">
                  <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-gold">
                    Cash on Delivery Available
                  </p>
                </div>

                <Link href="/checkout" className="block w-full">
                  <button className="group relative w-full flex items-center justify-center gap-4 py-4 border border-kaaj-charcoal hover:border-kaaj-gold transition-colors duration-500 bg-kaaj-charcoal text-[#2E302A] hover:bg-transparent hover:text-kaaj-gold">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] transition-colors duration-500">
                      Proceed to Checkout
                    </span>
                  </button>
                </Link>

                <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-kaaj-charcoal/70 text-center mt-6">
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
