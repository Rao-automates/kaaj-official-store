import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

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
    <section className="py-24 sm:py-32 bg-[#0A0A09] relative overflow-hidden">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-24">
          <FadeIn>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#EAE6DF]/60 mb-6">
              Collection
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-[#EAE6DF] tracking-tight max-w-2xl">
              Aks by Kaaj.
            </h2>
          </FadeIn>
        </div>

        {/* 
          CSS Columns Masonry Layout:
          Mobile: 2 columns 
          Desktop: 4 columns
        */}
        <div className="columns-2 md:columns-4 gap-4 md:gap-6 lg:gap-8 space-y-4 md:space-y-6 lg:space-y-8">
          {IMAGES.map((src, i) => (
            <FadeIn key={i} delay={0.1 + (i * 0.05)}>
              <div 
                className="relative w-full overflow-hidden group bg-white/5 break-inside-avoid"
                style={{ 
                  // Alternating aspect ratios to make it look like true editorial masonry
                  aspectRatio: i % 3 === 0 ? "3/4" : i % 2 === 0 ? "4/5" : "2/3" 
                }}
              >
                <Image 
                  src={src}
                  alt={`Aks by Kaaj Editorial ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
