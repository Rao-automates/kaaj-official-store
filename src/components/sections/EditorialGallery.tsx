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
  "/images/launch_1_decoration/ed-9.webp",
];

export default function EditorialGallery() {
  return (
    <section className="py-24 sm:py-40 bg-kaaj-cream/30 relative overflow-hidden section-divider-top">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-32">
          <FadeIn>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-charcoal/60 mb-6">
              Collection
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-kaaj-charcoal tracking-tight max-w-2xl">
              Aks by Kaaj.
            </h2>
          </FadeIn>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 lg:gap-12">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-4 md:gap-8 lg:gap-12 pt-0 md:pt-16">
            {[0, 3, 6].map((i) => (
              <FadeIn key={i} delay={0.1}>
                <div className="relative aspect-[3/4] w-full overflow-hidden group bg-black/5">
                  <Image 
                    src={IMAGES[i]}
                    alt={`Editorial shot ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  />
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4 md:gap-8 lg:gap-12 pt-0 md:pt-40">
            {[1, 4, 7].map((i) => (
              <FadeIn key={i} delay={0.2}>
                <div className="relative aspect-[3/4] w-full overflow-hidden group bg-black/5">
                  <Image 
                    src={IMAGES[i]}
                    alt={`Editorial shot ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  />
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4 md:gap-8 lg:gap-12 pt-0 md:pt-0">
            {[2, 5, 8].map((i) => (
              <FadeIn key={i} delay={0.3}>
                <div className="relative aspect-[3/4] w-full overflow-hidden group bg-black/5">
                  <Image 
                    src={IMAGES[i]}
                    alt={`Editorial shot ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  />
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
