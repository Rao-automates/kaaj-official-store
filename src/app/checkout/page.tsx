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
    "w-full bg-transparent border-0 border-b border-kaaj-charcoal/20 px-0 py-3 text-kaaj-charcoal font-sans text-sm focus:outline-none focus:ring-0 focus:border-kaaj-charcoal transition-colors placeholder:text-kaaj-charcoal/50 rounded-none";

  const labelClass =
    "block font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal/80 mb-1";

  if (submitted) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col pt-32 md:pt-48 pb-32 px-4">
        <div className="max-w-4xl mx-auto w-full text-center space-y-12">
          {/* Success icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full border border-kaaj-gold/30 bg-kaaj-gold/5 flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-gold mb-6">
              Order Confirmed
            </p>
            <h1 className="font-sans text-[clamp(2.5rem,8vw,5rem)] leading-none text-kaaj-charcoal tracking-tight mb-8">
              Thank You, {form.firstName}.
            </h1>
            
            <div className="max-w-2xl mx-auto space-y-6">
              {paymentMethod === "bacs" ? (
                <>
                  <p className="font-sans text-sm text-kaaj-charcoal/70 leading-relaxed">
                    Your order <strong className="text-kaaj-charcoal font-medium">{orderNumber}</strong> has been placed successfully. 
                    Please make your direct bank transfer to our account using the details below:
                  </p>
                  <div className="bg-kaaj-charcoal/5 border border-kaaj-charcoal/10 p-8 text-left font-sans text-sm text-kaaj-charcoal space-y-3">
                    <p><span className="text-kaaj-charcoal/70 inline-block w-32 uppercase tracking-[0.2em] text-[10px]">Bank</span> Meezan Bank</p>
                    <p><span className="text-kaaj-charcoal/70 inline-block w-32 uppercase tracking-[0.2em] text-[10px]">Account Title</span> MEHWISH IMRAN</p>
                    <p><span className="text-kaaj-charcoal/70 inline-block w-32 uppercase tracking-[0.2em] text-[10px]">Account #</span> 01860103756198</p>
                    <p><span className="text-kaaj-charcoal/70 inline-block w-32 uppercase tracking-[0.2em] text-[10px]">IBAN</span> PK42MEZN0001860103756198</p>
                  </div>
                  <p className="font-sans text-xs text-kaaj-charcoal/70 leading-relaxed mt-6">
                    Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared. 
                    <strong className="text-kaaj-charcoal font-medium block mt-2">Please send your transaction screenshot on WhatsApp to confirm your order.</strong>
                  </p>
                </>
              ) : (
                <p className="font-sans text-sm text-kaaj-charcoal/70 leading-relaxed">
                  Your order <strong className="text-kaaj-charcoal font-medium">{orderNumber}</strong> has been
                  placed successfully. Our team will confirm your order via call or WhatsApp shortly.
                </p>
              )}
            </div>
          </div>

          <div className="max-w-2xl mx-auto border border-kaaj-charcoal/10 p-8 text-left">
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-kaaj-charcoal/70 mb-6">
              Delivery Details
            </p>
            <div className="space-y-1">
              <p className="font-sans text-xl text-kaaj-charcoal">
                {form.firstName} {form.lastName}
              </p>
              <p className="font-sans text-sm text-kaaj-charcoal/70 pt-2">
                {form.address}, {form.city}, {form.province}
              </p>
              <p className="font-sans text-sm text-kaaj-charcoal/70">{form.phone}</p>
            </div>
            <div className="pt-8 mt-8 border-t border-kaaj-charcoal/10">
              <div className="flex justify-between items-end mb-2">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-kaaj-charcoal/70">Payment Method</span>
                <span className="font-sans text-sm text-kaaj-charcoal">
                  {paymentMethod === "bacs" ? "Direct Bank Transfer" : "Cash on Delivery"}
                </span>
              </div>
              <div className="flex justify-between items-end">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-kaaj-charcoal/70">Order Total</span>
                <span className="font-sans text-2xl text-kaaj-charcoal">
                  {formatPKR(String(total))}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/shop" className="group relative inline-flex items-center gap-4 py-4 px-12 border border-kaaj-charcoal/20 hover:border-kaaj-gold transition-colors duration-500 justify-center">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-kaaj-charcoal group-hover:text-kaaj-gold transition-colors duration-500">
                Continue Shopping
              </span>
            </Link>
            <a href={`https://wa.me/923013305325?text=${encodeURIComponent(`Hello, my order ID is ${orderNumber}. ${paymentMethod === 'bacs' ? 'Here is my transaction screenshot:' : ''}`)}`} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center gap-4 py-4 px-12 border border-kaaj-charcoal bg-kaaj-charcoal hover:bg-transparent hover:border-kaaj-gold transition-colors duration-500 justify-center">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-kaaj-cream group-hover:text-kaaj-gold transition-colors duration-500">
                {paymentMethod === "bacs" ? "Send Screenshot on WhatsApp" : "Contact via WhatsApp"}
              </span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent flex flex-col pt-32 md:pt-48 pb-32">
      {/* Editorial Header */}
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="flex flex-col items-start max-w-4xl">
          <h1 className="font-sans text-[clamp(3rem,10vw,7rem)] leading-[0.9] text-kaaj-charcoal tracking-tighter -ml-1 md:-ml-2 mb-8">
            Details.
          </h1>
        </div>
      </div>

      {cart.items.length === 0 ? (
        <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-center py-20 border border-kaaj-charcoal/20">
          <p className="font-sans text-3xl text-kaaj-charcoal mb-4">Your bag is empty</p>
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
        <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 xl:grid-cols-5 gap-16 xl:gap-24"
          >
            {/* Left: Contact + Address */}
            <div className="xl:col-span-3 space-y-16">
              {/* Contact */}
              <div className="space-y-8">
                <h2 className="font-sans text-3xl text-kaaj-charcoal border-b border-kaaj-charcoal/20 pb-6">
                  Contact
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="firstName" className={labelClass}>First Name *</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Jane"
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
                      placeholder="Doe"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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
                      placeholder="jane@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-8">
                <h2 className="font-sans text-3xl text-kaaj-charcoal border-b border-kaaj-charcoal/20 pb-6">
                  Delivery
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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
                  <div className="relative">
                    <select
                      id="province"
                      name="province"
                      value={form.province}
                      onChange={handleChange}
                      required
                      className={`${inputClass} appearance-none cursor-pointer`}
                    >
                      <option value="" className="bg-white text-kaaj-charcoal">Select Province</option>
                      {PROVINCES.map((p) => (
                        <option key={p} value={p} className="bg-white text-kaaj-charcoal">{p}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none text-kaaj-charcoal/70">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
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
              <div className="space-y-8">
                <h2 className="font-sans text-3xl text-kaaj-charcoal border-b border-kaaj-charcoal/20 pb-6">
                  Payment
                </h2>
                <div className="flex flex-col gap-6">
                  {/* COD */}
                  <label 
                    className={`flex items-center gap-6 border p-6 cursor-pointer transition-colors duration-500 ${
                      paymentMethod === "cod" 
                        ? "border-kaaj-charcoal bg-kaaj-charcoal/5" 
                        : "border-kaaj-charcoal/20 bg-transparent hover:border-kaaj-charcoal/50"
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
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors duration-500 ${
                      paymentMethod === "cod" ? "border-kaaj-charcoal" : "border-kaaj-charcoal/20"
                    }`}>
                      {paymentMethod === "cod" && <div className="w-2 h-2 rounded-full bg-kaaj-charcoal" />}
                    </div>
                    <div className="flex-1">
                      <p className={`font-sans text-xl transition-colors duration-500 ${
                        paymentMethod === "cod" ? "text-kaaj-charcoal" : "text-kaaj-charcoal/70"
                      }`}>
                        Cash on Delivery
                      </p>
                      <p className="font-sans text-xs text-kaaj-charcoal/70 mt-1">
                        Pay when your order arrives at your doorstep.
                      </p>
                    </div>
                  </label>

                  {/* BACS */}
                  <label 
                    className={`flex items-center gap-6 border p-6 cursor-pointer transition-colors duration-500 ${
                      paymentMethod === "bacs" 
                        ? "border-kaaj-charcoal bg-kaaj-charcoal/5" 
                        : "border-kaaj-charcoal/20 bg-transparent hover:border-kaaj-charcoal/50"
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
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors duration-500 ${
                      paymentMethod === "bacs" ? "border-kaaj-charcoal" : "border-kaaj-charcoal/20"
                    }`}>
                      {paymentMethod === "bacs" && <div className="w-2 h-2 rounded-full bg-kaaj-charcoal" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <p className={`font-sans text-xl transition-colors duration-500 ${
                          paymentMethod === "bacs" ? "text-kaaj-charcoal" : "text-kaaj-charcoal/70"
                        }`}>
                          Bank Transfer
                        </p>
                        <span className="border border-kaaj-gold/30 text-kaaj-gold text-[9px] px-2 py-1 uppercase tracking-widest">
                          Complimentary Delivery
                        </span>
                      </div>
                      <p className="font-sans text-xs text-kaaj-charcoal/70 mt-1">
                        Transfer directly to our bank account. Order ships upon clearance.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="xl:col-span-2">
              <div className="border border-kaaj-charcoal/20 p-8 sticky top-32 bg-kaaj-charcoal/5 backdrop-blur-md">
                <h2 className="font-sans text-2xl text-kaaj-charcoal mb-8 pb-6 border-b border-kaaj-charcoal/20">
                  Summary
                </h2>

                {/* Items */}
                <div className="space-y-6 mb-8">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-16 aspect-[3/4] flex-shrink-0 bg-kaaj-charcoal/5 overflow-hidden">
                        {item.image?.sourceUrl && (
                          <Image
                            src={item.image.sourceUrl}
                            alt={item.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        )}
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-kaaj-charcoal text-[#2E302A] text-[9px] flex items-center justify-center rounded-full font-sans">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                        <div>
                          <p className="font-sans text-sm text-kaaj-charcoal line-clamp-2">
                            {item.name}
                          </p>
                          {Object.entries(item.selectedAttributes).map(([k, v]) => (
                            <p key={k} className="font-sans text-[9px] uppercase tracking-[0.2em] text-kaaj-charcoal/70 mt-1">
                              {k.replace(/^pa_/, "")}: <span className="text-kaaj-charcoal/80">{v}</span>
                            </p>
                          ))}
                        </div>
                        <span className="font-sans text-xs text-kaaj-charcoal">
                          {formatPKR(String(item.price * item.quantity))}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-kaaj-charcoal/20 mb-8" />

                {/* Totals */}
                <div className="space-y-4 font-sans text-sm mb-8">
                  <div className="flex justify-between text-kaaj-charcoal/80">
                    <span className="text-[10px] uppercase tracking-[0.2em]">Subtotal</span>
                    <span className="font-sans text-lg text-kaaj-charcoal">{formatPKR(String(cartTotal))}</span>
                  </div>
                  <div className="flex justify-between text-kaaj-charcoal/80">
                    <span className="text-[10px] uppercase tracking-[0.2em]">Shipping</span>
                    <span className={shipping === 0 ? "font-sans text-lg text-kaaj-gold" : "font-sans text-lg text-kaaj-charcoal"}>
                      {shipping === 0 ? "Complimentary" : formatPKR(String(shipping))}
                    </span>
                  </div>
                </div>
                
                <div className="h-px bg-kaaj-charcoal/20 mb-8" />
                
                <div className="flex justify-between items-end mb-8">
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-kaaj-charcoal/70">
                    Total
                  </span>
                  <span className="font-sans text-3xl text-kaaj-charcoal">
                    {formatPKR(String(total))}
                  </span>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading || cart.items.length === 0}
                    className="group relative w-full flex items-center justify-center gap-4 py-4 border border-kaaj-charcoal hover:border-kaaj-gold transition-colors duration-500 bg-kaaj-charcoal text-kaaj-cream hover:bg-transparent hover:text-kaaj-gold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] transition-colors duration-500">
                      {loading ? "Processing..." : `Place Order — ${paymentMethod === 'cod' ? 'COD' : 'Bank Transfer'}`}
                    </span>
                  </button>
                  <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-kaaj-charcoal/70 text-center mt-4">
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
