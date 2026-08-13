"use client";

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
    <div className="min-h-screen bg-transparent flex flex-col pt-32 md:pt-48 pb-32">
      {/* Editorial Header */}
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="flex flex-col items-start max-w-4xl">
          <h1 className="font-serif text-[clamp(3rem,10vw,7rem)] leading-[0.9] text-kaaj-charcoal tracking-tighter -ml-1 md:-ml-2 mb-8">
            Tracking.
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6">
        
        {status === "success" && orderData ? (
          <div className="border border-kaaj-charcoal/20 p-8 md:p-16">
            <div className="text-center mb-12 border-b border-kaaj-charcoal/10 pb-12">
              <h2 className="font-serif text-3xl text-kaaj-charcoal mb-4">Order #{orderData.id}</h2>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-kaaj-charcoal/50">
                Placed by {orderData.billing.email}
              </p>
            </div>
            
            <div className="space-y-12">
              <div className="flex flex-col items-center justify-center space-y-6">
                <div className="w-16 h-16 rounded-full border border-kaaj-gold/30 text-kaaj-gold flex items-center justify-center bg-kaaj-gold/5">
                  {getStatusDisplay(orderData.status).icon}
                </div>
                <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] text-kaaj-charcoal">
                  {getStatusDisplay(orderData.status).title}
                </h3>
                <p className="font-sans text-sm text-kaaj-charcoal/60 text-center max-w-md leading-relaxed">
                  {getStatusDisplay(orderData.status).desc}
                </p>
              </div>

              <div className="pt-12 border-t border-kaaj-charcoal/10 text-center">
                <button 
                  type="button"
                  onClick={() => { setStatus("idle"); setOrderData(null); }}
                  className="group relative inline-flex items-center gap-4 py-4 px-12 border border-kaaj-charcoal/20 hover:border-kaaj-gold transition-colors duration-500 justify-center"
                >
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-kaaj-charcoal group-hover:text-kaaj-gold transition-colors duration-500">
                    Track Another Order
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-kaaj-charcoal/20 p-8 md:p-16">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl text-kaaj-charcoal mb-4">Order Details</h2>
              <p className="font-sans text-xs text-kaaj-charcoal/50 leading-relaxed max-w-lg mx-auto">
                To track your order please enter your Order ID in the box below and the email address you used during checkout.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-12 max-w-lg mx-auto">
              {status === "error" && (
                <div className="p-4 border border-red-500/20 text-red-400 font-sans text-xs uppercase tracking-widest text-center">
                  {errorMessage}
                </div>
              )}
              
              <div className="space-y-8">
                <div className="space-y-2">
                  <label htmlFor="orderId" className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal/50 block">
                    Order ID *
                  </label>
                  <input
                    type="text"
                    id="orderId"
                    name="orderId"
                    required
                    placeholder="Found in your confirmation email"
                    className="w-full bg-transparent border-0 border-b border-kaaj-charcoal/20 px-0 py-3 text-kaaj-charcoal font-sans text-sm focus:outline-none focus:ring-0 focus:border-kaaj-gold transition-colors placeholder:text-kaaj-charcoal/20 rounded-none"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal/50 block">
                    Billing Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Email used during checkout"
                    className="w-full bg-transparent border-0 border-b border-kaaj-charcoal/20 px-0 py-3 text-kaaj-charcoal font-sans text-sm focus:outline-none focus:ring-0 focus:border-kaaj-gold transition-colors placeholder:text-kaaj-charcoal/20 rounded-none"
                  />
                </div>
              </div>

              <div className="pt-4 text-center">
                <button 
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative inline-flex items-center gap-4 py-4 px-12 border border-kaaj-charcoal/20 hover:border-kaaj-gold transition-colors duration-500 justify-center w-full sm:w-auto"
                >
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-kaaj-charcoal group-hover:text-kaaj-gold transition-colors duration-500">
                    {status === "loading" ? "Finding Order..." : "Track Order"}
                  </span>
                  {!status && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                      className="text-kaaj-charcoal group-hover:text-kaaj-gold transition-colors group-hover:translate-x-2 duration-500 transform-gpu will-change-transform">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
