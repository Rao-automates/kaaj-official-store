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
    <section className="py-32 sm:py-48 bg-[#0A0A09] relative overflow-hidden border-t border-white/5">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-32">
          <FadeIn>
            <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#EAE6DF]/50 mb-8 border-b border-[#EAE6DF]/10 pb-4 px-8">
              New Collection
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] text-[#EAE6DF] flex flex-col md:flex-row items-center justify-center gap-3 flex-wrap font-serif">
              <span className="font-light tracking-tight">Aks by Kaaj</span>
            </h2>
          </FadeIn>
        </div>

        {/* 
          CSS Columns Masonry Layout:
          Mobile: 2 columns 
          Desktop: 4 columns
          Increased gaps for a more luxurious editorial feel.
        */}
        <div className="columns-2 md:columns-4 gap-6 md:gap-8 lg:gap-12 space-y-6 md:space-y-8 lg:space-y-12 pb-24">
          {IMAGES.map((src, i) => (
            <FadeIn key={i} delay={0.1 + (i * 0.05)}>
              <div 
                className="relative w-full overflow-hidden group bg-transparent break-inside-avoid"
                style={{ 
                  aspectRatio: i % 3 === 0 ? "3/4" : i % 2 === 0 ? "4/5" : "2/3" 
                }}
              >
                <div className="absolute inset-0 bg-[#EAE6DF]/5 group-hover:bg-transparent transition-colors duration-1000 z-10 pointer-events-none" />
                <Image 
                  src={src}
                  alt={`Aks by Kaaj Editorial Look ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-all duration-[2s] group-hover:scale-105 group-hover:brightness-110"
                />
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="flex justify-center mt-8">
          <FadeIn delay={0.2}>
            <Link
              href="/shop"
              className="group flex flex-col items-center gap-4"
            >
              <span className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-[#EAE6DF]/60 group-hover:text-[#C9A84C] transition-colors duration-500">
                Explore The Pieces
              </span>
              <div className="h-12 w-px bg-gradient-to-b from-[#EAE6DF]/20 to-transparent group-hover:from-[#C9A84C]/60 transition-colors duration-500" />
            </Link>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}
