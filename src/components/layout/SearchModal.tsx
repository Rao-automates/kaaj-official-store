"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-start pt-32 bg-kaaj-cream/95 backdrop-blur-md animate-fade-in">
      <button
        onClick={onClose}
        className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center text-kaaj-charcoal hover:text-kaaj-gold transition-colors"
        aria-label="Close search"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="w-full max-w-3xl px-6">
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-kaaj-gold mb-6 text-center">
          What are you looking for?
        </p>
        <form onSubmit={handleSubmit} className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search collections, products, or colors..."
            className="w-full bg-transparent border-b-2 border-kaaj-charcoal/20 text-kaaj-charcoal text-2xl md:text-4xl font-serif py-4 px-2 focus:outline-none focus:border-kaaj-gold placeholder-kaaj-charcoal/30 transition-colors text-center"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-kaaj-charcoal/70 hover:text-kaaj-gold transition-colors"
            aria-label="Submit search"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </form>

        <div className="mt-12 flex flex-col items-center gap-4">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-kaaj-muted">
            Popular Searches
          </span>
          <div className="flex flex-wrap justify-center gap-3">
            {["Velvet", "Chiffon", "Black", "Florals", "Kurta"].map((term) => (
              <button
                key={term}
                onClick={() => {
                  setQuery(term);
                  onClose();
                  router.push(`/search?q=${encodeURIComponent(term)}`);
                  setQuery("");
                }}
                className="font-sans text-xs text-kaaj-charcoal/70 hover:text-kaaj-charcoal border border-kaaj-charcoal/10 rounded-full px-4 py-2 hover:border-kaaj-gold transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
