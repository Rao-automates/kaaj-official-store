"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-kaaj-cream flex flex-col">
      {/* Header Section */}
      <div className="bg-kaaj-deep pt-32 pb-14 text-center relative overflow-hidden flex-shrink-0">
        <Image
          src="/hero.png"
          alt="Contact Us"
          fill
          priority
          className="object-cover object-center opacity-30 mix-blend-luminosity"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />
        <div className="relative z-10 px-4">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-gold mb-4">
            — Get in Touch
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl text-kaaj-cream">
            Contact Us
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          
          {/* Left: Info */}
          <div className="space-y-12">
            <div>
              <h2 className="font-serif text-2xl text-kaaj-charcoal mb-4">
                We're Here to Help
              </h2>
              <p className="font-sans text-sm text-kaaj-muted leading-relaxed">
                Whether you have a question about our latest collection, need assistance with sizing, or want to track an order, our client services team is at your complete disposal.
              </p>
            </div>

            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-kaaj-border flex items-center justify-center flex-shrink-0 text-kaaj-gold">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-sans text-[10px] uppercase tracking-widest text-kaaj-charcoal mb-1">
                    Email Support
                  </h3>
                  <a 
                    href="mailto:support@kaajofficial.com" 
                    className="font-sans text-sm text-kaaj-muted hover:text-kaaj-gold transition-colors"
                  >
                    support@kaajofficial.com
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-kaaj-border flex items-center justify-center flex-shrink-0 text-kaaj-gold">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-sans text-[10px] uppercase tracking-widest text-kaaj-charcoal mb-1">
                    WhatsApp Chat
                  </h3>
                  <a 
                    href="https://wa.me/923013305325" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-kaaj-muted hover:text-kaaj-gold transition-colors"
                  >
                    +92 301 330 5325
                  </a>
                  <p className="font-sans text-xs text-kaaj-muted/60 mt-1">
                    Available Mon-Sat, 10am to 7pm PKT
                  </p>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-kaaj-border flex items-center justify-center flex-shrink-0 text-kaaj-gold">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-sans text-[10px] uppercase tracking-widest text-kaaj-charcoal mb-1">
                    Instagram Direct
                  </h3>
                  <a 
                    href="https://www.instagram.com/wearkaaj/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-kaaj-muted hover:text-kaaj-gold transition-colors"
                  >
                    @wearkaaj
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Direct Action */}
          <div className="bg-kaaj-cream-dark border border-kaaj-border p-8 flex flex-col justify-center h-full">
            <h3 className="font-serif text-xl text-kaaj-charcoal mb-4">
              Need immediate assistance?
            </h3>
            <p className="font-sans text-sm text-kaaj-muted mb-8 leading-relaxed">
              For the fastest response regarding an existing order, please contact us directly via WhatsApp with your Order Number ready.
            </p>
            
            <a href="https://wa.me/923013305325" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg" fullWidth>
                Chat on WhatsApp
              </Button>
            </a>

            <div className="mt-6 pt-6 border-t border-kaaj-border">
              <p className="font-sans text-xs text-kaaj-muted text-center leading-relaxed">
                By contacting us, you agree to our privacy policy. We typically respond within 24 hours during business days.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
