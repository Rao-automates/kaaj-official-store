import React from "react";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for KAAJ.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-kaaj-cream pt-32 md:pt-48 pb-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-charcoal mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-kaaj-charcoal" /> Legal Information
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,8vw,5rem)] leading-[0.9] text-kaaj-charcoal tracking-tighter -ml-1 mb-8">
            Privacy Policy.
          </h1>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-kaaj-charcoal/60 leading-relaxed">
            Effective Date: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
        </div>

        <div className="prose prose-sm md:prose-base prose-kaaj max-w-none text-kaaj-charcoal/80 font-sans leading-loose space-y-8">
          <section>
            <h2 className="font-serif text-2xl text-kaaj-charcoal mb-4">1. Information We Collect</h2>
            <p>
              At KAAJ, we respect your privacy and are committed to protecting your personal data. We collect information you provide directly to us when you make a purchase, create an account, sign up for our newsletter, or contact customer service. This may include your name, email address, shipping and billing addresses, phone number, and payment details.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-kaaj-charcoal mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to process your orders, communicate with you about your purchases, provide customer support, and improve our services. With your consent, we may also send you promotional emails about new collections, exclusive offers, and KAAJ news.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-kaaj-charcoal mb-4">3. Data Sharing and Security</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We implement a variety of security measures to maintain the safety of your personal information.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-kaaj-charcoal mb-4">4. Cookies</h2>
            <p>
              Our website uses cookies to enhance your shopping experience. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-kaaj-charcoal mb-4">5. Contact Us</h2>
            <p>
              If there are any questions regarding this privacy policy, you may contact us using the information below:
              <br /><br />
              <strong>Email:</strong> support@kaajofficial.com<br />
              <strong>WhatsApp:</strong> +92-301-330-5325
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
