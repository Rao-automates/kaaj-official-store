"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-transparent flex flex-col pt-32 md:pt-48 pb-32">
      {/* Editorial Header */}
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-16 md:mb-32">
        <div className="flex flex-col items-start max-w-4xl">
          <h1 className="font-sans text-[clamp(3rem,10vw,7rem)] leading-[0.9] text-kaaj-charcoal tracking-tighter -ml-1 md:-ml-2 mb-8">
            Contact.
          </h1>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-kaaj-charcoal/70 max-w-xl leading-relaxed">
            Our client services team is at your complete disposal for any inquiries regarding collections, sizing, or bespoke requests.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          
          {/* Left: Info */}
          <div className="space-y-12">
            <div className="space-y-12">
              {/* WhatsApp */}
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 flex items-center justify-center border border-kaaj-charcoal/20 text-kaaj-gold rounded-full transition-colors duration-500 group-hover:border-kaaj-gold">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] text-kaaj-charcoal/80 mb-2">
                    WhatsApp Chat
                  </h3>
                  <a 
                    href="https://wa.me/923013305325" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-sans text-2xl text-kaaj-charcoal hover:text-kaaj-gold transition-colors duration-500"
                  >
                    +92 301 330 5325
                  </a>
                  <p className="font-sans text-[9px] uppercase tracking-widest text-kaaj-charcoal/70 mt-4">
                    Mon-Sat, 10am to 7pm PKT
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 flex items-center justify-center border border-kaaj-charcoal/20 text-kaaj-gold rounded-full transition-colors duration-500 group-hover:border-kaaj-gold">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] text-kaaj-charcoal/80 mb-2">
                    Email Support
                  </h3>
                  <a 
                    href="mailto:support@kaajofficial.com" 
                    className="font-sans text-2xl text-kaaj-charcoal hover:text-kaaj-gold transition-colors duration-500"
                  >
                    support@kaajofficial.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Minimal Form */}
          <div>
            <form className="space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal/80 block">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    className="w-full bg-transparent border-0 border-b border-kaaj-charcoal/20 px-0 py-3 text-kaaj-charcoal font-sans text-sm focus:outline-none focus:ring-0 focus:border-kaaj-charcoal transition-colors placeholder:text-kaaj-charcoal/50 rounded-none"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal/80 block">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    className="w-full bg-transparent border-0 border-b border-kaaj-charcoal/20 px-0 py-3 text-kaaj-charcoal font-sans text-sm focus:outline-none focus:ring-0 focus:border-kaaj-charcoal transition-colors placeholder:text-kaaj-charcoal/50 rounded-none"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal/80 block">Message</label>
                <textarea 
                  id="message"
                  rows={4}
                  className="w-full bg-transparent border-0 border-b border-kaaj-charcoal/20 px-0 py-3 text-kaaj-charcoal font-sans text-sm focus:outline-none focus:ring-0 focus:border-kaaj-charcoal transition-colors placeholder:text-kaaj-charcoal/50 resize-none rounded-none"
                  placeholder="How can we assist you?"
                ></textarea>
              </div>
              
              <button 
                type="button"
                className="group relative inline-flex items-center gap-4 py-4 px-12 border border-kaaj-charcoal/20 hover:border-kaaj-gold transition-colors duration-500 w-full sm:w-auto justify-center"
              >
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-kaaj-charcoal group-hover:text-kaaj-gold transition-colors duration-500">
                  Send Message
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="text-kaaj-charcoal group-hover:text-kaaj-gold transition-colors group-hover:translate-x-2 duration-500 transform-gpu will-change-transform">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
