import React from "react";

export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for KAAJ.",
};

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-kaaj-cream pt-32 md:pt-48 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-olive mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-kaaj-olive" /> Legal Information
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,8vw,5rem)] leading-[0.9] text-kaaj-charcoal tracking-tighter -ml-1 mb-8">
            Terms & Conditions.
          </h1>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-kaaj-charcoal/60 leading-relaxed">
            Last Updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
        </div>

        <div className="prose prose-sm md:prose-base prose-kaaj max-w-none text-kaaj-charcoal/80 font-sans leading-loose space-y-8">
          <section>
            <h2 className="font-serif text-2xl text-kaaj-charcoal mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing our website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-kaaj-charcoal mb-4">2. Intellectual Property</h2>
            <p>
              All content included on the KAAJ website, such as text, graphics, logos, images, audio clips, digital downloads, data compilations, and software, is the property of KAAJ or its content suppliers and protected by international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-kaaj-charcoal mb-4">3. Product Descriptions and Pricing</h2>
            <p>
              KAAJ attempts to be as accurate as possible. However, we do not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free. We reserve the right to correct any errors, inaccuracies, or omissions, and to change or update information or cancel orders if any information on the website is inaccurate at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-kaaj-charcoal mb-4">4. Shipping and Returns</h2>
            <p>
              Our shipping and return policies are outlined on their respective pages on our website. Please review our Returns & Exchange policy before making a purchase. Custom or tailored items are strictly non-refundable and non-exchangeable.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-kaaj-charcoal mb-4">5. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of Pakistan and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-kaaj-charcoal mb-4">6.2 DAMAGED, SHORT-MEASURED, OR DEFECTIVE ITEMS</h2>
            <p>
              If an order arrives damaged, short-measured beyond tolerance, or incorrect, you must notify us within 48 hours of delivery via email at <a href="mailto:support@kaajofficial.com" className="underline hover:text-kaaj-gold transition-colors">support@kaajofficial.com</a> with order details and photographic evidence. Verified defective or wrong items will be replaced or corrected at our cost, including return shipping.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-kaaj-charcoal mb-4">6.3 REFUND POLICY & SALE ITEMS</h2>
            <p>
              We operate on an Exchange or Store Credit policy. Cash refunds are not issued except in cases where an item is defective and a replacement is unavailable. Items purchased on sale, clearance, or custom promotional drop are Final Sale and non-exchangeable unless defective.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
