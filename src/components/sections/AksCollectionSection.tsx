import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AksCollectionSectionProps {
  eyebrow: string;
  heading: string;
  subtext: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  mainImage: { src: string; alt: string };
  detailImage?: { src: string; alt: string };
}

export default function AksCollectionSection({
  eyebrow,
  heading,
  subtext,
  ctaLabel,
  ctaHref,
  mainImage,
}: AksCollectionSectionProps) {
  return (
    <section className="relative w-full min-h-[80vh] lg:min-h-screen overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={mainImage.src}
          alt={mainImage.alt}
          fill
          className="object-cover object-top"
          sizes="100vw"
          priority
        />
        {/* Cinematic dark overlay — heavier on left for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.1) 100%)",
          }}
        />
        {/* Bottom gradient for depth */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Content overlay — left-aligned */}
      <div className="relative z-10 flex items-center min-h-[80vh] lg:min-h-screen">
        <div className="max-w-8xl mx-auto w-full px-6 sm:px-8 lg:px-16 xl:px-24 py-24 lg:py-0">
          <div className="max-w-xl">
            {/* Eyebrow */}
            <span className="font-sans text-[10px] text-white/50 uppercase tracking-[0.4em] block mb-8">
              {eyebrow}
            </span>

            {/* Urdu Heading */}
            <h2
              className="font-nastaliq text-white text-[56px] sm:text-[72px] lg:text-[96px] leading-none mb-4 font-semibold"
              dir="rtl"
              lang="ur"
            >
              {heading}
            </h2>


            {/* Subtext */}
            <p className="font-sans text-sm sm:text-base text-white/60 leading-relaxed max-w-sm mb-12">
              {subtext}
            </p>

            {/* CTA */}
            <Link
              href={ctaHref}
              className="group inline-flex items-center gap-4 py-4 px-10 border border-white/20 text-white hover:border-white/60 hover:bg-white/5 transition-all duration-500"
            >
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-medium">
                {ctaLabel}
              </span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="group-hover:translate-x-2 transition-transform duration-500 transform-gpu"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
