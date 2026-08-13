"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

export default function ReturnsPage() {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFileError("");
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    
    const file = formData.get("image") as File | null;
    if (file && file.size > 0) {
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > 4) {
        setFileError("Please select an image smaller than 4MB.");
        setStatus("idle");
        return;
      }
    }

    try {
      const res = await fetch("/api/returns", {
        method: "POST",
        body: formData,
      });
      
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-transparent flex flex-col pt-32 md:pt-48 pb-32">
      {/* Editorial Header */}
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="flex flex-col items-start max-w-4xl">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-gold mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-kaaj-gold" /> Client Services
          </p>
          <h1 className="font-serif text-[clamp(3rem,10vw,7rem)] leading-[0.9] text-kaaj-charcoal tracking-tighter -ml-1 md:-ml-2 mb-8">
            Returns.
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 space-y-16">
        
        {/* Policies */}
        <div className="prose prose-sm md:prose-base prose-kaaj max-w-none text-kaaj-charcoal/80 font-sans leading-loose space-y-8">
          <section>
            <h2 className="font-serif text-2xl text-kaaj-charcoal mb-4">DAMAGED, SHORT-MEASURED, OR DEFECTIVE ITEMS</h2>
            <p>
              If an order arrives damaged, short-measured beyond tolerance, or incorrect, you must notify us within 48 hours of delivery via email at <a href="mailto:support@kaajofficial.com" className="underline hover:text-kaaj-gold transition-colors">support@kaajofficial.com</a> with order details and photographic evidence. Verified defective or wrong items will be replaced or corrected at our cost, including return shipping.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-kaaj-charcoal mb-4">REFUND POLICY & SALE ITEMS</h2>
            <p>
              We operate on an Exchange or Store Credit policy. Cash refunds are not issued except in cases where an item is defective and a replacement is unavailable. Items purchased on sale, clearance, or custom promotional drop are Final Sale and non-exchangeable unless defective.
            </p>
          </section>
        </div>
        
        {status === "success" ? (
          <div className="border border-kaaj-charcoal/20 p-8 md:p-16 text-center">
            <h2 className="font-serif text-3xl text-kaaj-charcoal mb-4">Request Received</h2>
            <p className="font-sans text-xs text-kaaj-charcoal/60 mb-12 leading-relaxed max-w-md mx-auto">
              Your return request has been submitted successfully. Our client services team will review your request and get back to you within 24-48 hours.
            </p>
            <button 
              type="button"
              onClick={() => setStatus("idle")}
              className="group relative inline-flex items-center gap-4 py-4 px-12 border border-kaaj-charcoal/20 hover:border-kaaj-gold transition-colors duration-500 justify-center"
            >
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-kaaj-charcoal group-hover:text-kaaj-gold transition-colors duration-500">
                Submit Another Request
              </span>
            </button>
          </div>
        ) : (
          <div className="border border-kaaj-charcoal/20 p-8 md:p-16">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl text-kaaj-charcoal mb-4">Initiate a Return</h2>
              <p className="font-sans text-xs text-kaaj-charcoal/50 leading-relaxed max-w-lg mx-auto">
                Please enter your order details below to request a return or exchange.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-12 max-w-2xl mx-auto">
              {status === "error" && (
                <div className="p-4 border border-red-500/20 text-red-400 font-sans text-xs uppercase tracking-widest text-center">
                  Something went wrong. Please try again or contact support directly.
                </div>
              )}
              {fileError && (
                <div className="p-4 border border-red-500/20 text-red-400 font-sans text-xs uppercase tracking-widest text-center">
                  {fileError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="orderId" className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal/80 block">
                    Order Number *
                  </label>
                  <input
                    type="text"
                    id="orderId"
                    name="orderId"
                    required
                    placeholder="e.g. 12345"
                    className="w-full bg-transparent border-0 border-b border-kaaj-charcoal/20 px-0 py-3 text-kaaj-charcoal font-sans text-sm focus:outline-none focus:ring-0 focus:border-kaaj-charcoal transition-colors placeholder:text-kaaj-charcoal/50 rounded-none"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal/80 block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="w-full bg-transparent border-0 border-b border-kaaj-charcoal/20 px-0 py-3 text-kaaj-charcoal font-sans text-sm focus:outline-none focus:ring-0 focus:border-kaaj-charcoal transition-colors placeholder:text-kaaj-charcoal/50 rounded-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="reason" className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal/80 block">
                  Reason for Return *
                </label>
                <div className="relative">
                  <select
                    id="reason"
                    name="reason"
                    required
                    className="w-full bg-transparent border-0 border-b border-kaaj-charcoal/20 px-0 py-3 text-kaaj-charcoal font-sans text-sm focus:outline-none focus:ring-0 focus:border-kaaj-charcoal transition-colors appearance-none rounded-none"
                  >
                    <option value="" className="bg-white text-kaaj-charcoal">Select a reason...</option>
                    <option value="Incorrect Item" className="bg-white text-kaaj-charcoal">Received incorrect item</option>
                    <option value="Damaged" className="bg-white text-kaaj-charcoal">Item arrived damaged/defective</option>
                    <option value="Size Issue" className="bg-white text-kaaj-charcoal">Sizing issue</option>
                    <option value="Not as Expected" className="bg-white text-kaaj-charcoal">Item not as expected</option>
                    <option value="Other" className="bg-white text-kaaj-charcoal">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none text-kaaj-charcoal/40">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="details" className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal/80 block">
                  Additional Details
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  placeholder="Please provide any additional information..."
                  className="w-full bg-transparent border-0 border-b border-kaaj-charcoal/20 px-0 py-3 text-kaaj-charcoal font-sans text-sm focus:outline-none focus:ring-0 focus:border-kaaj-charcoal transition-colors placeholder:text-kaaj-charcoal/50 resize-none rounded-none"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="image" className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal/80 block">
                  Upload Image (Optional, Max 4MB)
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="w-full bg-transparent border-0 border-b border-kaaj-charcoal/20 px-0 py-3 text-kaaj-charcoal font-sans text-sm focus:outline-none focus:border-kaaj-gold transition-colors file:mr-6 file:py-2 file:px-6 file:border file:border-kaaj-charcoal/20 file:text-[9px] file:font-sans file:uppercase file:tracking-[0.2em] file:bg-transparent file:text-kaaj-charcoal hover:file:border-kaaj-gold cursor-pointer"
                />
              </div>

              <div className="pt-8 text-center">
                <button 
                  type="submit"
                  disabled={status === "loading"}
                  className="group relative inline-flex items-center gap-4 py-4 px-12 border border-kaaj-charcoal/20 hover:border-kaaj-gold transition-colors duration-500 justify-center w-full sm:w-auto"
                >
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-kaaj-charcoal group-hover:text-kaaj-gold transition-colors duration-500">
                    {status === "loading" ? "Submitting..." : "Submit Request"}
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
