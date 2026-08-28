"use client";

import { useRef, useState, useEffect } from "react";
import FadeIn from "@/components/ui/FadeIn";

/* ─────────────────────────────────────────────────────────────────
   Real reviews from KAAJ's Google Business Profile (Place ID: ChIJk2-Rwg4_sz4R91sLzi-921s)
   When you have a Google Places API key, this swaps to live-fetched data.
───────────────────────────────────────────────────────────────── */
export const STATIC_REVIEWS = [
  {
    id: 1,
    author: "Alish Sheikh",
    initials: "AS",
    rating: 5,
    date: "a week ago",
    location: "Karachi, Pakistan",
    text: "The outfit was even more beautiful in person. The fabric feels premium and comfortable.",
  },
  {
    id: 2,
    author: "Laila Khursheed",
    initials: "LK",
    rating: 5,
    date: "a week ago",
    location: "Karachi, Pakistan",
    text: "I've personally worn outfits designed by her, and I can genuinely say that the quality, attention to detail, and finishing are beautiful. The fabrics are comfortable, the cuts are elegant, and every outfit feels thoughtfully designed.",
  },
  {
    id: 3,
    author: "Mariam Sohail",
    initials: "MS",
    rating: 5,
    date: "2 weeks ago",
    location: "Karachi, Pakistan",
    text: "Such a beautiful collection! Great quality, lovely designs, and everything arrived perfectly. Definitely recommending this brand!",
  },
  {
    id: 4,
    author: "Zohaib Ali",
    initials: "ZA",
    rating: 5,
    date: "2 weeks ago",
    location: "Karachi, Pakistan",
    text: "Amazing quality for the price. Washed it three times already and the color hasn't faded at all.",
  },
  {
    id: 5,
    author: "Ahsan Amir",
    initials: "AA",
    rating: 5,
    date: "2 weeks ago",
    location: "Karachi, Pakistan",
    text: "Fabrics were good and it was giving premium vibes — excellent work.",
  },
  {
    id: 6,
    author: "Lubna Khurram",
    initials: "LK",
    rating: 5,
    date: "a week ago",
    location: "Karachi, Pakistan",
    text: "Hyped for this launch! Your designs are always next level.",
  },
];

const AGGREGATE = { rating: 4.9, total: 15 };

/* ── Shared Star Component ── */
function StarRating({ count = 5, size = 11 }: { count?: number; size?: number }) {
  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" className="flex-none">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={i < count ? "#C9A84C" : "none"}
            stroke="#C9A84C"
            strokeWidth={i < count ? 0 : 1.5}
          />
        </svg>
      ))}
    </div>
  );
}

/* ── Google G Logo ── */
function GoogleLogo({ size = 12 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

/* ── Location Pin ── */
function LocationPin() {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-none">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

/* ════════════════════════════════════════════════
   PRODUCT PAGE: Compact auto-rotating ticker
   Usage: import { ProductReviewTicker } from "@/components/sections/GoogleReviews"
════════════════════════════════════════════════ */
export function ProductReviewTicker() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % STATIC_REVIEWS.length);
        setVisible(true);
      }, 400);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const review = STATIC_REVIEWS[current];

  return (
    <a
      href="https://www.google.com/maps/place/?q=place_id:ChIJk2-Rwg4_sz4R91sLzi-921s"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 bg-[#2A2B29] hover:bg-[#323430] border border-white/[0.06] hover:border-kaaj-gold/30 transition-all duration-500 px-4 py-3.5 cursor-pointer"
    >
      {/* Left: Decorative quote mark */}
      <span className="font-serif text-3xl leading-none text-kaaj-gold/50 mt-0.5 flex-none select-none">&ldquo;</span>

      {/* Middle: Review content */}
      <div
        className="flex-1 min-w-0 transition-all duration-400"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(4px)" }}
      >
        <p className="font-sans text-[11px] leading-relaxed text-white/65 line-clamp-2 group-hover:text-white/80 transition-colors duration-300">
          {review.text}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <StarRating count={review.rating} size={9} />
          <span className="font-sans text-[9px] text-white/35 tracking-wide">— {review.author}</span>
          <span className="font-sans text-[8px] text-white/20 tracking-wide hidden sm:inline">· {review.location}</span>
        </div>
      </div>

      {/* Right: Google badge + dot indicator */}
      <div className="flex flex-col items-end gap-2 flex-none">
        <div className="flex items-center gap-1 opacity-40 group-hover:opacity-70 transition-opacity duration-300">
          <GoogleLogo size={10} />
          <span className="font-sans text-[7px] uppercase tracking-[0.15em] text-white/50">Review</span>
        </div>
        <div className="flex gap-1">
          {STATIC_REVIEWS.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 12 : 4,
                height: 4,
                background: i === current ? "#C9A84C" : "rgba(255,255,255,0.12)",
              }}
            />
          ))}
        </div>
      </div>
    </a>
  );
}

/* ════════════════════════════════════════════════
   HOMEPAGE: Full editorial reviews section
════════════════════════════════════════════════ */
export default function GoogleReviews() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-[#FAF9F6] pt-20 sm:pt-28 pb-24 sm:pb-32">

      {/* ── Section Header ── */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-kaaj-charcoal/10 pb-8">
            {/* Left: Title + location eyebrow */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <LocationPin />
                <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-charcoal/50">
                  Karachi, Pakistan · Google Reviews
                </p>
              </div>
              <h2 className="font-sans text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.9] tracking-tighter text-kaaj-charcoal">
                What They Say
              </h2>
            </div>

            {/* Right: Aggregate + View on Google */}
            <div className="flex items-center gap-5 mb-2">
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-sans text-5xl font-light tracking-tight text-kaaj-charcoal leading-none">
                    {AGGREGATE.rating.toFixed(1)}
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-kaaj-charcoal/35 self-center">/ 5</span>
                </div>
                <StarRating count={5} size={13} />
                <a
                  href="https://www.google.com/maps/place/?q=place_id:ChIJk2-Rwg4_sz4R91sLzi-921s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 mt-1 group"
                >
                  <GoogleLogo size={11} />
                  <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-kaaj-charcoal/40 group-hover:text-kaaj-charcoal/60 transition-colors underline underline-offset-2 decoration-kaaj-charcoal/20">
                    {AGGREGATE.total} reviews · View on Google
                  </p>
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* ── 2×2 Grid with internal vertical scroll — no visible scrollbar ── */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="none">
          {/*
            Fixed height = 2 card rows (260px each) + 1 gap (16px) = 536px.
            scrollbar-hide keeps the page still; only this container scrolls.
          */}
          <div
            ref={scrollRef}
            className="overflow-y-auto scrollbar-hide"
            style={{ maxHeight: "556px" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {STATIC_REVIEWS.map((review) => (
                <a
                  key={review.id}
                  href="https://www.google.com/maps/place/?q=place_id:ChIJk2-Rwg4_sz4R91sLzi-921s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-[#2A2B29] hover:bg-[#323430] border border-white/[0.06] hover:border-kaaj-gold/30 transition-all duration-500 p-6 sm:p-7 flex flex-col gap-4 min-h-[260px] relative overflow-hidden cursor-pointer"
                >
                  {/* Decorative quote watermark */}
                  <span className="absolute top-2 right-4 font-serif text-[7rem] leading-none text-white/[0.04] select-none pointer-events-none transition-all duration-500 group-hover:text-kaaj-gold/10">
                    &ldquo;
                  </span>

                  {/* Stars + verified badge */}
                  <div className="flex items-center justify-between">
                    <StarRating count={review.rating} size={12} />
                    <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-70 transition-opacity duration-300">
                      <GoogleLogo size={11} />
                      <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-white/60">
                        Verified
                      </span>
                    </div>
                  </div>

                  {/* Review text */}
                  <blockquote className="font-sans text-[13.5px] leading-relaxed text-white/70 group-hover:text-white/85 transition-colors duration-300 flex-1 relative z-10">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>

                  {/* Author + location + date */}
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center flex-none">
                        <span className="font-sans text-[10px] font-semibold text-white/50">
                          {review.initials}
                        </span>
                      </div>
                      <div>
                        <p className="font-sans text-[11px] font-medium text-white/65 tracking-wide group-hover:text-white/80 transition-colors duration-300">
                          {review.author}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5 text-white/30 group-hover:text-kaaj-gold/50 transition-colors duration-300">
                          <LocationPin />
                          <span className="font-sans text-[9px] tracking-wide">
                            {review.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/25">
                      {review.date}
                    </span>
                  </div>
                </a>
              ))}

              {/* Leave a review CTA */}
              <a
                href="https://www.google.com/maps/place/?q=place_id:ChIJk2-Rwg4_sz4R91sLzi-921s"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#2A2B29] hover:bg-[#323430] border border-dashed border-white/[0.08] hover:border-kaaj-gold/40 transition-all duration-500 p-6 sm:p-7 flex flex-col items-start justify-between min-h-[260px]"
              >
                <div className="w-10 h-10 border border-kaaj-gold/30 rounded-full flex items-center justify-center group-hover:border-kaaj-gold/70 group-hover:bg-kaaj-gold/10 transition-all duration-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="text-kaaj-gold/70 group-hover:text-kaaj-gold group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-all duration-300">
                    <line x1="7" y1="17" x2="17" y2="7"/>
                    <polyline points="7 7 17 7 17 17"/>
                  </svg>
                </div>
                <div>
                  <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-white/40 group-hover:text-white/65 transition-colors duration-300 leading-loose mb-3">
                    Loved your experience?<br />Share it on Google.
                  </p>
                  <div className="flex items-center gap-2">
                    <GoogleLogo size={12} />
                    <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-white/30 group-hover:text-kaaj-gold transition-colors duration-300">
                      View Our Profile
                    </span>
                  </div>
                </div>
              </a>

            </div>
          </div>

          {/* Scroll hint */}
          <div className="flex items-center justify-center gap-2 mt-5 opacity-35">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-kaaj-charcoal/50">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="8 12 12 16 16 12"/>
            </svg>
            <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal/40">
              Scroll for more
            </span>
          </div>

        </FadeIn>
      </div>
    </section>
  );
}


