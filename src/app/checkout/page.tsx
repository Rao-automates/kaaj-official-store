"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPKR } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postcode: string;
  notes: string;
}

const PROVINCES = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Gilgit-Baltistan",
  "Azad Kashmir",
];

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postcode: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bacs">("cod");
  const [orderNumber] = useState(
    () => `KO-${Date.now().toString().slice(-6)}`
  );

  const shipping = paymentMethod === "bacs" ? 0 : (cartTotal >= 5000 ? 0 : 250);
  const total = cartTotal + shipping;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      form.firstName.trim() !== "" &&
      form.lastName.trim() !== "" &&
      emailRegex.test(form.email) &&
      form.phone.length >= 10 &&
      form.address.trim() !== "" &&
      form.city.trim() !== "" &&
      form.province.trim() !== ""
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid() || loading || cart.items.length === 0) return;
    setLoading(true);
    
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form,
          cart: cart.items,
          cartTotal,
          shipping,
          total,
          paymentMethod,
          orderNumber,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process order");
      }

      setSubmitted(true);
      clearCart();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("There was an error processing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-transparent border border-kaaj-border text-kaaj-charcoal placeholder-kaaj-charcoal/40 px-4 py-3 font-sans text-sm focus:outline-none focus:border-kaaj-gold transition-colors";

  const labelClass =
    "block font-sans text-[10px] uppercase tracking-[0.15em] text-kaaj-charcoal mb-1.5";

  if (submitted) {
    return (
      <div className="min-h-screen bg-kaaj-cream flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center py-20 space-y-6">
          {/* Success icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-kaaj-gold/10 border border-kaaj-gold flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-gold mb-4">
              Order Confirmed
            </p>
            <h1 className="font-serif text-4xl text-kaaj-charcoal mb-3">
              Thank You, {form.firstName}!
            </h1>
            {paymentMethod === "bacs" ? (
              <div className="space-y-4">
                <p className="font-sans text-sm text-kaaj-muted leading-relaxed">
                  Your order <strong className="text-kaaj-charcoal">{orderNumber}</strong> has been placed successfully. 
                  Please make your direct bank transfer to our Meezan Bank account using the details below:
                </p>
                <div className="bg-kaaj-charcoal/5 border border-kaaj-border p-4 text-left font-sans text-sm text-kaaj-charcoal">
                  <p className="mb-1"><span className="text-kaaj-muted">Bank:</span> Meezan Bank</p>
                  <p className="mb-1"><span className="text-kaaj-muted">Account Title:</span> MEHWISH IMRAN</p>
                  <p className="mb-1"><span className="text-kaaj-muted">Account Number:</span> 01860103756198</p>
                  <p className="mb-1"><span className="text-kaaj-muted">IBAN:</span> PK42MEZN0001860103756198</p>
                  <p><span className="text-kaaj-muted">SWIFT/BIC:</span> MEZNPKKAXXX</p>
                </div>
                <p className="font-sans text-sm text-kaaj-muted leading-relaxed">
                  Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account. 
                  <strong className="text-kaaj-charcoal block mt-2">Please send your transaction screenshot on WhatsApp to confirm your order.</strong>
                </p>
              </div>
            ) : (
              <p className="font-sans text-sm text-kaaj-muted leading-relaxed">
                Your order <strong className="text-kaaj-charcoal">{orderNumber}</strong> has been
                placed successfully. Our team will confirm your order via call or WhatsApp shortly.
              </p>
            )}
          </div>

          <div className="bg-kaaj-cream-dark border border-kaaj-border p-5 text-left space-y-2">
            <p className="font-sans text-[10px] uppercase tracking-widest text-kaaj-muted">
              Delivery Details
            </p>
            <p className="font-sans text-sm text-kaaj-charcoal">
              {form.firstName} {form.lastName}
            </p>
            <p className="font-sans text-sm text-kaaj-muted">
              {form.address}, {form.city}, {form.province}
            </p>
            <p className="font-sans text-sm text-kaaj-muted">{form.phone}</p>
            <div className="pt-2 border-t border-kaaj-border mt-3">
              <div className="flex justify-between font-sans text-sm">
                <span className="text-kaaj-muted">Payment Method</span>
                <span className="text-kaaj-charcoal font-medium">
                  {paymentMethod === "bacs" ? "Direct Bank Transfer" : "Cash on Delivery"}
                </span>
              </div>
              <div className="flex justify-between font-sans text-sm mt-1">
                <span className="text-kaaj-muted">Order Total</span>
                <span className="font-serif text-lg text-kaaj-charcoal">
                  {formatPKR(String(total))}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link href="/shop">
              <Button variant="primary" size="lg">
                Continue Shopping
              </Button>
            </Link>
            <a href={`https://wa.me/923013305325?text=${encodeURIComponent(`Hello, my order ID is ${orderNumber}. ${paymentMethod === 'bacs' ? 'Here is my transaction screenshot:' : ''}`)}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                {paymentMethod === "bacs" ? "Send Screenshot on WhatsApp" : "Contact via WhatsApp"}
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kaaj-cream">
      {/* Header */}
      <div className="bg-kaaj-deep pt-32 pb-14 text-center relative overflow-hidden">
        <Image
          src="/hero.png"
          alt="Checkout"
          fill
          priority
          className="object-cover object-center opacity-30 grayscale"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
        <div className="relative z-10">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-gold mb-4">
            — Secure Checkout
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl text-kaaj-cream">Checkout</h1>
        </div>
      </div>

      {cart.items.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-serif text-2xl text-kaaj-charcoal mb-4">Your bag is empty</p>
          <Link href="/shop">
            <Button variant="primary" size="lg">Browse Collections</Button>
          </Link>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-5 gap-12"
          >
            {/* Left: Contact + Address */}
            <div className="lg:col-span-3 space-y-8">
              {/* Contact */}
              <div className="space-y-5">
                <h2 className="font-serif text-2xl text-kaaj-charcoal border-b border-kaaj-border pb-3">
                  Contact Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className={labelClass}>First Name *</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Ayesha"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelClass}>Last Name *</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Khan"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>Phone / WhatsApp *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="03XX-XXXXXXX"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="ayesha@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-5">
                <h2 className="font-serif text-2xl text-kaaj-charcoal border-b border-kaaj-border pb-3">
                  Delivery Address
                </h2>
                <div>
                  <label htmlFor="address" className={labelClass}>Street Address *</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={form.address}
                    onChange={handleChange}
                    required
                    placeholder="House #, Street, Area"
                    className={inputClass}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className={labelClass}>City *</label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={form.city}
                      onChange={handleChange}
                      required
                      placeholder="Lahore"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="postcode" className={labelClass}>Postcode</label>
                    <input
                      id="postcode"
                      name="postcode"
                      type="text"
                      value={form.postcode}
                      onChange={handleChange}
                      placeholder="54000"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="province" className={labelClass}>Province *</label>
                  <select
                    id="province"
                    name="province"
                    value={form.province}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="" className="bg-[#363832]">Select Province</option>
                    {PROVINCES.map((p) => (
                      <option key={p} value={p} className="bg-[#363832]">{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="notes" className={labelClass}>Order Notes (Optional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Special instructions, preferred delivery time, etc."
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h2 className="font-serif text-2xl text-kaaj-charcoal border-b border-kaaj-border pb-3">
                  Payment Method
                </h2>
                <div className="flex flex-col gap-3">
                  {/* COD */}
                  <label 
                    className={`flex items-center gap-4 border p-4 cursor-pointer transition-colors ${
                      paymentMethod === "cod" 
                        ? "border-kaaj-charcoal bg-kaaj-cream" 
                        : "border-kaaj-border bg-transparent hover:bg-kaaj-cream/50"
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="cod" 
                      checked={paymentMethod === "cod"} 
                      onChange={() => setPaymentMethod("cod")}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "cod" ? "border-kaaj-charcoal" : "border-kaaj-border"
                    }`}>
                      {paymentMethod === "cod" && <div className="w-2.5 h-2.5 rounded-full bg-kaaj-charcoal" />}
                    </div>
                    <div className="flex-1">
                      <p className={`font-sans text-sm font-medium uppercase tracking-wide ${
                        paymentMethod === "cod" ? "text-kaaj-charcoal" : "text-kaaj-charcoal/70"
                      }`}>
                        Cash on Delivery (COD)
                      </p>
                      <p className="font-sans text-xs text-kaaj-muted mt-0.5">
                        Pay when your order arrives at your doorstep.
                      </p>
                    </div>
                  </label>

                  {/* BACS */}
                  <label 
                    className={`flex items-center gap-4 border p-4 cursor-pointer transition-colors ${
                      paymentMethod === "bacs" 
                        ? "border-kaaj-charcoal bg-kaaj-cream" 
                        : "border-kaaj-border bg-transparent hover:bg-kaaj-cream/50"
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="bacs" 
                      checked={paymentMethod === "bacs"} 
                      onChange={() => setPaymentMethod("bacs")}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "bacs" ? "border-kaaj-charcoal" : "border-kaaj-border"
                    }`}>
                      {paymentMethod === "bacs" && <div className="w-2.5 h-2.5 rounded-full bg-kaaj-charcoal" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className={`font-sans text-sm font-medium uppercase tracking-wide ${
                          paymentMethod === "bacs" ? "text-kaaj-charcoal" : "text-kaaj-charcoal/70"
                        }`}>
                          Direct Bank Transfer
                        </p>
                        <span className="bg-kaaj-gold/20 text-kaaj-gold-dark text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                          Free Delivery
                        </span>
                      </div>
                      <p className="font-sans text-xs text-kaaj-muted mt-0.5">
                        Make your payment directly into our bank account. Your order will be shipped once the funds have cleared.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-kaaj-cream-dark border border-kaaj-border p-6 sticky top-28">
                <h2 className="font-serif text-xl text-kaaj-charcoal mb-5 pb-4 border-b border-kaaj-border">
                  Your Order
                </h2>

                {/* Items */}
                <div className="space-y-4 mb-5">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-14 h-18 flex-shrink-0 bg-kaaj-cream-dark overflow-hidden">
                        {item.image?.sourceUrl && (
                          <Image
                            src={item.image.sourceUrl}
                            alt={item.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        )}
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-kaaj-charcoal text-kaaj-cream text-[9px] flex items-center justify-center rounded-full font-sans">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-sm text-kaaj-charcoal line-clamp-2">
                          {item.name}
                        </p>
                        {Object.entries(item.selectedAttributes).map(([k, v]) => (
                          <p key={k} className="font-sans text-[10px] text-kaaj-muted">
                            {k.replace(/^pa_/, "")}: {v}
                          </p>
                        ))}
                      </div>
                      <span className="font-sans text-sm text-kaaj-charcoal flex-shrink-0">
                        {formatPKR(String(item.price * item.quantity))}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-kaaj-border mb-4" />

                {/* Totals */}
                <div className="space-y-2.5 font-sans text-sm">
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
                  <div className="h-px bg-kaaj-border" />
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-xs uppercase tracking-widest text-kaaj-charcoal">
                      Total
                    </span>
                    <span className="font-serif text-xl text-kaaj-charcoal">
                      {formatPKR(String(total))}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={loading}
                    disabled={loading || cart.items.length === 0}
                  >
                    Place Order — {paymentMethod === 'cod' ? 'COD' : 'Bank Transfer'}
                  </Button>
                  <p className="font-sans text-[10px] text-kaaj-muted text-center mt-3">
                    By placing your order you agree to our Terms & Conditions.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
