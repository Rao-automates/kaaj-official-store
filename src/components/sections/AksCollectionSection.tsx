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
  features,
  ctaLabel,
  ctaHref,
  mainImage,
  detailImage,
}: AksCollectionSectionProps) {
  return (
    <section className="bg-[#F7F3EC] w-full py-12 md:py-[72px] lg:py-24 px-5 overflow-hidden">
      <div className="max-w-[1240px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-[48px] lg:gap-16 items-center">
        
        {/* IMAGE COLUMN */}
        {/* On mobile, order-first puts the image above the text. On desktop, md:order-last keeps it on the right. */}
        <div className="order-first md:order-last relative w-full h-full flex justify-center md:justify-end items-center">
          {/* Main Image Frame Container */}
          <div className="relative w-full max-w-[500px] aspect-[4/5] mx-auto md:mx-0">
            {/* 16px Offset Gold Frame (10px on mobile) */}
            <div className="absolute top-[10px] left-[10px] md:top-[16px] md:left-[16px] w-full h-full border border-[#C9A227] z-0 pointer-events-none" />
            
            {/* Main Image */}
            <div className="relative w-full h-full z-10 bg-[#EAE8E3]">
              <Image
                src={mainImage.src}
                alt={mainImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Optional Detail Image */}
            {detailImage && (
              <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 w-32 h-32 md:w-48 md:h-48 z-20 border-[6px] border-[#F7F3EC] bg-[#EAE8E3] shadow-lg">
                <Image
                  src={detailImage.src}
                  alt={detailImage.alt}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            )}
          </div>
        </div>

        {/* TEXT COLUMN */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 order-last md:order-first">
          
          {/* Eyebrow */}
          <span className="font-jost text-[#6B6E47] uppercase tracking-[0.25em] text-xs md:text-sm font-semibold mb-6">
            {eyebrow}
          </span>

          {/* Heading */}
          {/* ~56px mobile, ~68px tablet, ~84px desktop */}
          <h2 
            className="font-nastaliq text-[#241F1A] text-[46px] sm:text-[56px] md:text-[68px] lg:text-[84px] leading-none mb-6 font-semibold"
            dir="rtl"
            lang="ur"
          >
            {heading}
          </h2>

          {/* Thin Gold Rule */}
          <div className="w-[56px] h-px bg-[#C9A227] mb-6" />

          {/* Subtext */}
          <p 
            className="font-nastaliq text-[#6B6459] text-lg md:text-xl lg:text-[22px] leading-relaxed max-w-[420px] mb-10"
            dir="rtl"
            lang="ur"
          >
            {subtext}
          </p>

          {/* CTA Button */}
          <Link
            href={ctaHref}
            className="group inline-flex items-center gap-4 bg-[#6B6E47] text-[#F7F3EC] px-10 py-4 font-jost uppercase tracking-[0.2em] text-sm md:text-[13px] font-semibold transition-colors duration-300 hover:bg-[#5a5c3c] mb-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6B6E47] focus-visible:ring-offset-[#F7F3EC]"
          >
            <span>{ctaLabel}</span>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className="transition-transform duration-300 group-hover:translate-x-2 motion-reduce:transition-none motion-reduce:transform-none"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          {/* Feature Tags */}
          {features && features.length > 0 && (
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-[#241F1A] font-jost text-[11px] md:text-xs uppercase tracking-widest font-medium">
              {features.map((feature, idx) => (
                <React.Fragment key={idx}>
                  <span>{feature}</span>
                  {idx < features.length - 1 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" aria-hidden="true" />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
