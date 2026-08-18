"use client";

import { useEffect, useState } from "react";

export default function InAppBrowserNotice() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isInstagram = ua.indexOf("Instagram") > -1;
    
    if (isInstagram) {
      const isAndroid = /android/i.test(ua);
      if (isAndroid) {
        // Try deep linking directly to Chrome on Android
        try {
          const currentUrl = window.location.href.replace(/^https?:\/\//, '');
          window.location.href = `intent://${currentUrl}#Intent;scheme=https;package=com.android.chrome;end`;
        } catch (e) {
          console.error("Deep link failed:", e);
        }
      }
      
      // Always show the banner as a fallback (and for iOS which blocks auto-redirects)
      setShowBanner(true);
    }
  }, []);

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-kaaj-charcoal text-kaaj-cream p-4 shadow-2xl border-t border-white/10 animate-fade-up">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="font-sans text-[11px] md:text-[12px] uppercase tracking-[0.1em] font-medium leading-relaxed">
            For a faster shopping experience, tap <strong className="font-bold tracking-widest text-lg leading-none mx-1">...</strong> (top right) and select <strong className="border-b border-white/40 pb-0.5 ml-1">Open in Browser</strong>.
          </p>
        </div>
        <button 
          onClick={() => setShowBanner(false)}
          className="p-2 hover:bg-white/10 transition-colors rounded-none"
          aria-label="Close notice"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}
