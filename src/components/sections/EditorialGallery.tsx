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
    <section className="py-24 md:py-32 bg-[#0A0A09] relative overflow-hidden">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Modern Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <FadeIn>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#EAE6DF]/40 mb-6 border-b border-[#EAE6DF]/10 pb-3 px-6">
              New Collection
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="flex flex-row items-center justify-center gap-3 md:gap-5 flex-wrap">
              <span className="font-sans text-[clamp(1.5rem,4vw,2.5rem)] font-light uppercase tracking-[0.2em] text-[#EAE6DF]/80">
                Aks by
              </span>
              <span className="font-sans text-[clamp(2rem,5vw,3.5rem)] uppercase tracking-[0.3em] font-medium text-[#EAE6DF] drop-shadow-md">
                KAAJ
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
              <div className="relative aspect-[3/4] w-full overflow-hidden group bg-[#111]">
                {/* Subtle dark gradient overlay to make images feel richer */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <Image 
                  src={src}
                  alt={`Aks by Kaaj Editorial ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                />
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="flex justify-center mt-4">
          <FadeIn delay={0.2}>
            <Link
              href="/shop"
              className="group flex flex-col items-center gap-4"
            >
              <span className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-[#EAE6DF]/60 group-hover:text-[#C9A84C] transition-colors duration-500">
                Explore The Pieces
              </span>
              <div className="h-10 w-px bg-gradient-to-b from-[#EAE6DF]/20 to-transparent group-hover:from-[#C9A84C]/60 transition-colors duration-500" />
            </Link>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}
