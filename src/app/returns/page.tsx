"use client";

import Image from "next/image";
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
    
    // Check file size if a file is attached (4.5MB limit on Vercel, so we limit to 4MB)
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
        // Do NOT set Content-Type header when sending FormData
        // Fetch automatically sets the correct multipart boundary
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
    <div className="min-h-screen bg-kaaj-cream flex flex-col">
      {/* Header Section */}
      <div className="bg-kaaj-deep pt-32 pb-14 text-center relative overflow-hidden flex-shrink-0">
        <Image
          src="/hero.png"
          alt="Returns and Exchanges"
          fill
          priority
          className="object-cover object-center opacity-20 mix-blend-luminosity"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
        <div className="relative z-10 px-4">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-gold mb-4">
            — Client Services
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl text-kaaj-charcoal">
            Returns & Exchange
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-20">
        
        {status === "success" ? (
          <div className="bg-kaaj-cream-dark border border-kaaj-border p-12 text-center">
            <h2 className="font-serif text-2xl text-kaaj-charcoal mb-4">Request Received</h2>
            <p className="font-sans text-sm text-kaaj-muted mb-8 leading-relaxed max-w-md mx-auto">
              Your return request has been submitted successfully. Our client services team will review your request and get back to you within 24-48 hours.
            </p>
            <Button variant="outline" onClick={() => setStatus("idle")}>
              Submit Another Request
            </Button>
          </div>
        ) : (
          <div className="bg-kaaj-cream-dark border border-kaaj-border p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="font-serif text-2xl text-kaaj-charcoal mb-3">Initiate a Return</h2>
              <p className="font-sans text-sm text-kaaj-muted leading-relaxed">
                Please enter your order details below to request a return or exchange.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === "error" && (
                <div className="p-4 border border-red-200 bg-red-50 text-red-600 font-sans text-sm text-center">
                  Something went wrong. Please try again or contact support directly.
                </div>
              )}
              {fileError && (
                <div className="p-4 border border-red-200 bg-red-50 text-red-600 font-sans text-sm text-center">
                  {fileError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="orderId" className="block font-sans text-[10px] uppercase tracking-widest text-kaaj-charcoal">
                    Order Number *
                  </label>
                  <input
                    type="text"
                    id="orderId"
                    name="orderId"
                    required
                    placeholder="e.g. 12345"
                    className="w-full bg-transparent border border-kaaj-border p-3 font-sans text-sm text-kaaj-charcoal focus:outline-none focus:border-kaaj-gold transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block font-sans text-[10px] uppercase tracking-widest text-kaaj-charcoal">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="w-full bg-transparent border border-kaaj-border p-3 font-sans text-sm text-kaaj-charcoal focus:outline-none focus:border-kaaj-gold transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="reason" className="block font-sans text-[10px] uppercase tracking-widest text-kaaj-charcoal">
                  Reason for Return *
                </label>
                <div className="relative">
                  <select
                    id="reason"
                    name="reason"
                    required
                    className="w-full bg-transparent border border-kaaj-border p-3 pr-10 font-sans text-sm text-kaaj-charcoal focus:outline-none focus:border-kaaj-gold transition-colors appearance-none"
                  >
                    <option value="">Select a reason...</option>
                    <option value="Incorrect Item">Received incorrect item</option>
                    <option value="Damaged">Item arrived damaged/defective</option>
                    <option value="Size Issue">Sizing issue</option>
                    <option value="Not as Expected">Item not as expected</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-kaaj-muted">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="details" className="block font-sans text-[10px] uppercase tracking-widest text-kaaj-charcoal">
                  Additional Details
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  placeholder="Please provide any additional information..."
                  className="w-full bg-transparent border border-kaaj-border p-3 font-sans text-sm text-kaaj-charcoal focus:outline-none focus:border-kaaj-gold transition-colors resize-none"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="image" className="block font-sans text-[10px] uppercase tracking-widest text-kaaj-charcoal">
                  Upload Image (Optional, Max 4MB)
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="w-full bg-transparent border border-kaaj-border p-3 font-sans text-sm text-kaaj-charcoal focus:outline-none focus:border-kaaj-gold transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-sans file:uppercase file:tracking-widest file:bg-kaaj-deep file:text-kaaj-charcoal hover:file:bg-kaaj-charcoal cursor-pointer"
                />
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  variant="primary" 
                  fullWidth 
                  size="lg"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Submitting..." : "Submit Request"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
