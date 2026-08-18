import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import Link from "next/link";

const IMAGES = [
  "/images/launch_1_decoration/ed-1.webp",
  "/images/launch_1_decoration/ed-2.webp",
  "/images/launch_1_decoration/ed-3.webp",
  "/images/launch_1_decoration/ed-4.webp",
  "/images/launch_1_decoration/ed-5.webp",
  "/images/launch_1_decoration/ed-6.webp",
  "/images/launch_1_decoration/ed-7.webp",
  "/images/launch_1_decoration/ed-8.webp",
];

export default function EditorialGallery() {
  return (
    <section className="py-24 md:py-32 bg-[#FAF9F6] relative overflow-hidden">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Modern Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <FadeIn>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-charcoal mb-6 border-b border-kaaj-charcoal/20 pb-3 px-6 drop-shadow-sm">
              New Collection
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="flex flex-row items-center justify-center">
              <span className="font-sans text-[clamp(4rem,10vw,7rem)] font-medium text-[#141413] leading-none pb-4">
                عکس
              </span>
            </h2>
          </FadeIn>
        </div>

        {/* 
          Ultra-Modern Clean Grid Layout
          Instead of messy masonry, a strict symmetrical grid is used for a premium, high-fashion catalog feel.
        */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 lg:gap-6 pb-20">
          {IMAGES.map((src, i) => (
            <FadeIn key={i} delay={0.05 * i}>
              <Link href="/shop" className="block relative aspect-[3/4] w-full overflow-hidden group bg-[#EAE6DF] cursor-pointer">
                {/* Dark gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                {/* Shop Now label on hover */}
                <div className="absolute bottom-0 left-0 right-0 z-20 p-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/90 border-b border-white/40 pb-1">
                    Shop Now
                  </span>
                </div>
                <Image 
                  src={src}
                  alt={`Aks by Kaaj Editorial ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                />
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="flex justify-center mt-8">
          <FadeIn delay={0.2}>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-[#141413] text-white hover:bg-[#141413]/90 transition-all duration-500 btn-shimmer"
            >
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em]">
                Shop Aks Collection
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                className="group-hover:translate-x-2 transition-transform duration-500 transform-gpu">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}
