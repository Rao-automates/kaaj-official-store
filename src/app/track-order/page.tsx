"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

interface OrderData {
  id: number;
  status: string;
  date_created: string;
  total: string;
  currency: string;
  billing: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

export default function TrackOrderPage() {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    
    const formData = new FormData(e.currentTarget);
    const orderId = formData.get("orderId") as string;
    const email = formData.get("email") as string;

    try {
      const res = await fetch("/api/track-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to find order");
      }

      // Merge the provided email so we can display it later
      setOrderData({ ...data.order, billing: { ...data.order.billing, email } });
      setStatus("success");
    } catch (err: any) {
      setErrorMessage(err.message);
      setStatus("error");
    }
  };

  const getStatusDisplay = (wcStatus: string) => {
    switch (wcStatus) {
      case "completed":
        return {
          title: "Completed",
          desc: "Your order has been fulfilled and dispatched. It should be with you shortly.",
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          )
        };
      case "cancelled":
      case "refunded":
      case "failed":
        return {
          title: "Cancelled",
          desc: "This order has been cancelled or refunded. If you believe this is an error, please contact support.",
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          )
        };
      case "processing":
      case "on-hold":
      default:
        return {
          title: "Processing",
          desc: "Your order has been received and is currently being processed. You will receive an email with tracking details once it has been dispatched.",
          icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          )
        };
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-kaaj-cream flex flex-col">
      {/* Header Section */}
      <div className="bg-kaaj-deep pt-32 pb-14 text-center relative overflow-hidden flex-shrink-0">
        <Image
          src="/hero.png"
          alt="Track Order"
          fill
          priority
          className="object-cover object-center opacity-20 mix-blend-luminosity"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
        <div className="relative z-10 px-4">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-gold mb-4">
            — Order Status
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl text-kaaj-charcoal">
            Track Your Order
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-20">
        
        {status === "success" && orderData ? (
          <div className="bg-kaaj-cream-dark border border-kaaj-border p-8 md:p-12">
            <div className="text-center mb-10 border-b border-kaaj-border pb-8">
              <h2 className="font-serif text-2xl text-kaaj-charcoal mb-2">Order #{orderData.id}</h2>
              <p className="font-sans text-sm text-kaaj-muted">
                Placed by {orderData.billing.email}
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full border border-kaaj-gold text-kaaj-gold flex items-center justify-center bg-kaaj-gold/5">
                  {getStatusDisplay(orderData.status).icon}
                </div>
                <h3 className="font-sans text-[10px] uppercase tracking-widest text-kaaj-charcoal">
                  {getStatusDisplay(orderData.status).title}
                </h3>
                <p className="font-sans text-sm text-kaaj-muted text-center max-w-sm leading-relaxed">
                  {getStatusDisplay(orderData.status).desc}
                </p>
              </div>

              <div className="pt-8 border-t border-kaaj-border text-center">
                <Button variant="outline" onClick={() => { setStatus("idle"); setOrderData(null); }}>
                  Track Another Order
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-kaaj-cream-dark border border-kaaj-border p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="font-serif text-2xl text-kaaj-charcoal mb-3">Order Details</h2>
              <p className="font-sans text-sm text-kaaj-muted leading-relaxed">
                To track your order please enter your Order ID in the box below and the email address you used during checkout.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === "error" && (
                <div className="p-4 border border-red-200 bg-red-50 text-red-600 font-sans text-sm text-center">
                  {errorMessage}
                </div>
              )}
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="orderId" className="block font-sans text-[10px] uppercase tracking-widest text-kaaj-charcoal">
                    Order ID *
                  </label>
                  <input
                    type="text"
                    id="orderId"
                    name="orderId"
                    required
                    placeholder="Found in your order confirmation email"
                    className="w-full bg-transparent border border-kaaj-border p-3 font-sans text-sm text-kaaj-charcoal focus:outline-none focus:border-kaaj-gold transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block font-sans text-[10px] uppercase tracking-widest text-kaaj-charcoal">
                    Billing Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Email you used during checkout"
                    className="w-full bg-transparent border border-kaaj-border p-3 font-sans text-sm text-kaaj-charcoal focus:outline-none focus:border-kaaj-gold transition-colors"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  variant="primary" 
                  fullWidth 
                  size="lg"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Finding Order..." : "Track Order"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
