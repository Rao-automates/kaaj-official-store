"use client";

interface MarqueeProps {
  text?: string;
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

export default function Marquee({
  text = "HERITAGE · CRAFTSMANSHIP · MODERNITY · KAAJ",
  speed = "normal",
  className = "",
}: MarqueeProps) {
  const duration = speed === "slow" ? "60s" : speed === "fast" ? "20s" : "35s";

  // Repeat text enough times for seamless loop
  const repeated = `${text} · ${text} · ${text} · ${text} · `;

  return (
    <div
      className={`relative overflow-hidden select-none py-6 md:py-8 ${className}`}
      aria-hidden="true"
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-kaaj-gold/20 to-transparent" />
      
      <div
        className="flex whitespace-nowrap"
        style={{ animation: `marqueeScroll ${duration} linear infinite` }}
        onMouseEnter={(e) => { (e.currentTarget.style.animationPlayState = "paused"); }}
        onMouseLeave={(e) => { (e.currentTarget.style.animationPlayState = "running"); }}
      >
        <span className="font-serif text-[clamp(1rem,2.5vw,1.75rem)] text-kaaj-charcoal/70 tracking-[0.3em] uppercase">
          {repeated}
        </span>
        <span className="font-serif text-[clamp(1rem,2.5vw,1.75rem)] text-kaaj-charcoal/70 tracking-[0.3em] uppercase">
          {repeated}
        </span>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-kaaj-gold/20 to-transparent" />
    </div>
  );
}
