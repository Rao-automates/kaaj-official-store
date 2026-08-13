"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-kaaj-cream px-4 text-center">
      <div className="w-px h-16 bg-gradient-to-b from-transparent to-kaaj-charcoal/20 mb-8" />
      <h1 className="font-serif text-4xl md:text-6xl text-kaaj-charcoal tracking-tighter mb-4">
        Unexpected Error
      </h1>
      <h2 className="font-sans text-xs uppercase tracking-[0.3em] text-kaaj-charcoal mb-8">
        Something went wrong
      </h2>
      <p className="font-sans text-xs text-kaaj-charcoal/60 max-w-md mx-auto mb-10 leading-relaxed">
        We apologize for the inconvenience. Please try refreshing the page or return to the homepage.
      </p>
      
      <div className="flex gap-6 items-center">
        <button
          onClick={() => reset()}
          className="group inline-flex items-center gap-4 pb-2 border-b border-kaaj-charcoal/40 hover:border-kaaj-charcoal transition-colors duration-700"
        >
          <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal group-hover:text-kaaj-charcoal transition-colors duration-700">
            Try Again
          </span>
        </button>
        
        <span className="text-kaaj-charcoal/20">|</span>

        <Link
          href="/"
          className="group inline-flex items-center gap-4 pb-2 border-b border-kaaj-charcoal/20 hover:border-kaaj-charcoal transition-colors duration-700"
        >
          <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal/60 group-hover:text-kaaj-charcoal transition-colors duration-700">
            Return Home
          </span>
        </Link>
      </div>
    </div>
  );
}
