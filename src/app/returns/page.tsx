"use client";

import React from "react";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-transparent flex flex-col pt-32 md:pt-48 pb-32">
      {/* Editorial Header */}
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="flex flex-col items-start max-w-4xl">
          <h1 className="font-sans text-[clamp(3rem,10vw,7rem)] leading-[0.9] text-kaaj-charcoal tracking-tighter -ml-1 md:-ml-2 mb-8">
            Returns.
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 space-y-16">
        
        {/* Policies */}
        <div className="prose prose-sm md:prose-base prose-kaaj max-w-none text-kaaj-charcoal/80 font-sans leading-loose space-y-8">
          <section>
            <h2 className="font-sans text-2xl text-kaaj-charcoal mb-4">DAMAGED, SHORT-MEASURED, OR DEFECTIVE ITEMS</h2>
            <p>
              If an order arrives damaged, short-measured beyond tolerance, or incorrect, you must notify us within 48 hours of delivery via email at <a href="mailto:support@kaajofficial.com" className="underline hover:text-kaaj-gold transition-colors">support@kaajofficial.com</a> with order details and photographic evidence. Verified defective or wrong items will be replaced or corrected at our cost, including return shipping.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-2xl text-kaaj-charcoal mb-4">REFUND POLICY & SALE ITEMS</h2>
            <p>
              We operate on an Exchange or Store Credit policy. Cash refunds are not issued except in cases where an item is defective and a replacement is unavailable. Items purchased on sale, clearance, or custom promotional drop are Final Sale and non-exchangeable unless defective.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
