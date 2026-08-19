import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import Link from "next/link";

export default function EditorialGallery() {
  return (
    <section className="py-24 md:py-32 bg-[#FAF9F6] relative overflow-hidden">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            <FadeIn>
              <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-kaaj-charcoal mb-6 border-b border-kaaj-charcoal/20 pb-3 drop-shadow-sm inline-block lg:w-auto">
                New Collection
              </p>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h2 className="font-sans text-[clamp(4rem,10vw,7rem)] font-medium text-[#141413] leading-none pb-8">
                عکس
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-4 font-sans text-xl md:text-[22px] leading-relaxed text-kaaj-charcoal/80 font-light mb-12 lg:text-right w-full" dir="rtl">
                <p>وقت سے بالاتر ایک حسین عکس۔</p>
                <p>ہر دھاگے میں بُنی روایت اور فنکاری کا احساس۔</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="w-full flex justify-center lg:justify-start">
                <Link
                  href="/categories/aks"
                  className="group inline-flex items-center gap-4 px-10 py-4 rounded-none bg-kaaj-olive text-kaaj-cream hover:bg-[#4A4D45] transition-all duration-500 shadow-sm"
                >
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em]">
                    Shop عکس Collection
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                    className="group-hover:translate-x-2 transition-transform duration-500 transform-gpu">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Image Content */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <FadeIn delay={0.2}>
              <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:max-w-none overflow-hidden bg-[#EAE6DF]">
                <Image 
                  src="/images/launch_1_decoration/ed-6.webp"
                  alt="Aks by Kaaj Editorial"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[2000ms] ease-out hover:scale-105"
                  priority
                />
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
