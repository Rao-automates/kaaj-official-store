"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function BrandStory() {
  const [isInstagram, setIsInstagram] = useState(false);
  const container = useRef<HTMLElement>(null);

  useEffect(() => {
    // Detect Instagram browser to fallback to images if autoplay is blocked
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (ua.indexOf("Instagram") > -1) {
      setIsInstagram(true);
    }
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-title", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.1 })
        .fromTo(".hero-text", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.8")
        .fromTo(".hero-media", { scale: 1.05, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }, "-=1");
    });

    mm.add("(max-width: 1023px)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".hero-media", { scale: 1.05, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" });
    });

    // Scroll animation to shrink the title into the navbar
    gsap.to(".hero-scroll-wrap", {
      scale: 0.5,
      y: -100,
      opacity: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=120",
        scrub: true,
      },
      immediateRender: false,
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center bg-[#FAF9F6] overflow-hidden pt-20 pb-12 lg:py-0">
      
      {/* DESKTOP LAYOUT (The Pillar & Typography Anchor) */}
      <div className="hidden lg:flex w-full h-[100dvh] max-w-8xl mx-auto px-8 xl:px-16 items-center justify-between">
        
        {/* Left: Typography Anchor */}
        <div className="flex-1 flex flex-col items-start pr-12">
          <div className="hero-scroll-wrap overflow-hidden mb-8 origin-left">
            <h1 className="hero-title font-sans text-[clamp(4rem,10vw,12rem)] leading-[0.8] tracking-tighter text-kaaj-charcoal -ml-2">
              K A A J
            </h1>
          </div>
          <p className="hero-text font-sans text-sm uppercase tracking-[0.3em] text-kaaj-charcoal/60 mb-12 max-w-sm leading-relaxed">
            Womenswear rooted in Pakistani craft. Discover the archives.
          </p>
          <Link
            href="/shop"
            className="hero-button group flex items-center justify-between py-4 px-8 border border-kaaj-charcoal hover:bg-kaaj-charcoal hover:text-white transition-all duration-500 w-64"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-medium">
              Explore Collection
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="group-hover:translate-x-1 transition-transform duration-500">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Right: The Video Pillar (Native Portrait Aspect Ratio) */}
        <div className="hero-media relative w-[450px] xl:w-[500px] aspect-[4/5] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
          {isInstagram ? (
            <Image
              src="/images/hero-desktop-bg.webp"
              alt="KAAJ Cinematic"
              fill
              className="object-cover"
              priority
              fetchPriority="high"
            />
          ) : (
            <video
              poster="/images/hero-desktop-bg.webp"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            >
              <source src="/videos/combo.mp4" type="video/mp4" />
            </video>
          )}
        </div>
      </div>

      {/* MOBILE LAYOUT (Framed Editorial) */}
      <div className="flex lg:hidden w-full flex-col px-4 mt-8">
        
        {/* Mobile Text Anchor */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="hero-scroll-wrap overflow-hidden mb-4 origin-center">
            <h1 className="hero-title font-sans text-[4.5rem] leading-[0.8] tracking-tighter text-kaaj-charcoal">
              K A A J
            </h1>
          </div>
          <p className="hero-text font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal/60">
            Pakistani Craft
          </p>
        </div>

        {/* Mobile Video Pillar (Native Ratio, Un-stretched) */}
        <div className="hero-media relative w-full aspect-[4/5] overflow-hidden shadow-sm">
          {isInstagram ? (
            <Image
              src="/images/hero-mobile-bg.webp"
              alt="KAAJ Cinematic"
              fill
              className="object-cover"
              priority
            />
          ) : (
            <video
              poster="/images/hero-mobile-bg.webp"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            >
              <source src="/videos/combo.mp4" type="video/mp4" />
            </video>
          )}
        </div>

        {/* Mobile Button (Clear Usability) */}
        <div className="hero-button mt-8 flex justify-center w-full">
          <Link
            href="/shop"
            className="group flex items-center justify-between py-4 px-6 border border-kaaj-charcoal text-kaaj-charcoal hover:bg-kaaj-charcoal hover:text-white transition-all duration-300 w-[85%] max-w-[320px]"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-medium">
              Explore Collection
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="group-hover:translate-x-1 transition-transform">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
