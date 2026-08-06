import FadeIn from "@/components/ui/FadeIn";

export default function BrandStory() {
  return (
    <section className="py-40 bg-kaaj-deep text-kaaj-cream relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kaaj-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-kaaj-gold/30 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Urdu-inspired decorative element */}
        <FadeIn delay={0.1}>
          <div className="flex items-center justify-center gap-8 mb-16">
            <div className="h-px w-24 bg-kaaj-gold/40" />
            <div className="w-10 h-10 flex items-center justify-center opacity-80">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path
                  d="M16 2C16 2 10 9 4 16C10 23 16 30 16 30C16 30 22 23 28 16C22 9 16 2 16 2Z"
                  stroke="#C9A84C"
                  strokeWidth="0.5"
                  fill="none"
                />
                <circle cx="16" cy="16" r="3.5" stroke="#C9A84C" strokeWidth="0.5" fill="none" />
              </svg>
            </div>
            <div className="h-px w-24 bg-kaaj-gold/40" />
          </div>
        </FadeIn>

        {/* Headline */}
        <FadeIn delay={0.2}>
          <h2 className="font-serif text-6xl md:text-8xl text-kaaj-cream mb-10 leading-[0.9] tracking-tight">
            The Art of the<br />
            <em className="not-italic text-kaaj-gold block mt-2">Kaaj</em>
          </h2>
        </FadeIn>

        {/* Body */}
        <FadeIn delay={0.3}>
          <div className="max-w-2xl mx-auto space-y-8">
            <p className="font-sans text-base md:text-lg text-kaaj-cream/80 leading-relaxed font-light">
              In the craft of Pakistani fashion, the <em>kaaj</em> — the buttonhole — is the
              final touch that transforms fabric into art. It is the meeting point of tradition
              and precision, the detail that separates a garment from a masterpiece.
            </p>
            <p className="font-sans text-sm md:text-base text-kaaj-cream/60 leading-relaxed font-light pb-16">
              KAAJ was founded on this philosophy: that every piece of clothing should
              tell a story of heritage, crafted with the care and attention that your culture deserves.
            </p>
          </div>
        </FadeIn>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pt-16 border-t border-kaaj-gold/10">
          {[
            { title: "Heritage", desc: "Every design is rooted in centuries of South Asian textile tradition.", delay: 0.2 },
            { title: "Craftsmanship", desc: "Hand-selected fabrics, intricate embroidery, and artisan finishing.", delay: 0.4 },
            { title: "Modernity", desc: "Contemporary silhouettes that honour tradition while celebrating today's woman.", delay: 0.6 },
          ].map((v) => (
            <FadeIn key={v.title} delay={v.delay}>
              <div className="text-center group">
                <h3 className="font-serif text-2xl md:text-3xl text-kaaj-gold mb-6 group-hover:scale-105 transition-transform duration-500">{v.title}</h3>
                <p className="font-sans text-xs md:text-sm text-kaaj-cream/50 leading-relaxed font-light tracking-wide max-w-[200px] mx-auto">{v.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
