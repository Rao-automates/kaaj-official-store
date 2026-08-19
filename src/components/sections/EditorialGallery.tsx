import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import Link from "next/link";

export default function EditorialGallery() {
  return (
    <section className="py-24 md:py-32 lg:py-40 bg-[#FAF9F6] relative overflow-hidden">
      <div className="max-w-[85rem] mx-auto px-6 sm:px-8 lg:px-12">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          
          {/* Text Content */}
          <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">

            
            <FadeIn delay={0.1}>
              <h2 className="font-sans text-[5rem] lg:text-[7.5rem] font-medium text-[#141413] leading-none tracking-tight mb-8">
                عکس
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-3 font-sans text-lg lg:text-[20px] leading-relaxed text-[#141413]/60 font-light mb-14 w-full lg:text-right" dir="rtl">
                <p>آپ کی شخصیت کا ایک نیا عکس۔</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="w-full flex justify-center lg:justify-start">
                <Link
                  href="/categories/aks"
                  className="group inline-flex items-center gap-4 px-10 py-[18px] rounded-none bg-kaaj-olive text-kaaj-cream hover:bg-[#4A4D45] transition-colors duration-500"
                >
                  <span className="font-sans text-[11px] font-medium uppercase tracking-[0.25em]">
                    Shop Collection
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                    className="group-hover:translate-x-1.5 transition-transform duration-500">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Image Content */}
          <div className="w-full lg:w-6/12 order-1 lg:order-2">
            <FadeIn delay={0.2}>
              <Link href="/categories/aks" className="block relative aspect-[4/5] w-full max-w-[500px] mx-auto lg:mx-0 lg:ml-auto overflow-hidden bg-[#EAE8E3] group">
                <Image 
                  src="/images/launch_1_decoration/ed-6.webp"
                  alt="Aks Collection by Kaaj"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                  priority
                  quality={90}
                />
              </Link>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
