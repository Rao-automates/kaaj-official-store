import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-kaaj-cream px-4 text-center">
      <div className="w-px h-16 bg-gradient-to-b from-transparent to-kaaj-charcoal/20 mb-8" />
      <h1 className="font-serif text-6xl md:text-8xl text-kaaj-charcoal tracking-tighter mb-4">
        404
      </h1>
      <h2 className="font-sans text-xs uppercase tracking-[0.3em] text-kaaj-charcoal mb-8">
        Page Not Found
      </h2>
      <p className="font-sans text-xs text-kaaj-charcoal/60 max-w-md mx-auto mb-10 leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="group inline-flex items-center gap-4 pb-2 border-b border-kaaj-charcoal/40 hover:border-kaaj-charcoal transition-colors duration-700"
      >
        <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-kaaj-charcoal group-hover:text-kaaj-charcoal transition-colors duration-700">
          Return Home
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-kaaj-charcoal/60 group-hover:text-kaaj-charcoal transition-all group-hover:translate-x-1 duration-500"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
    </div>
  );
}
