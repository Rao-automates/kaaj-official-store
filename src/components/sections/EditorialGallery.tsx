import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import Link from "next/link";

export default function EditorialGallery() {
  return (
    <section className="py-24 md:py-32 lg:py-0 lg:min-h-[85vh] bg-[#FAF9F6] relative overflow-hidden flex items-center">
      
      {/* Massive Background Watermark to add depth without clutter */}
      <div className="absolute inset-0 flex items-center justify-center lg:justify-start lg:-translate-x-24 pointer-events-none z-0 opacity-[0.03]">
        <h2 className="font-sans text-[40vw] font-bold text-[#141413] leading-none whitespace-nowrap">
          عکس
        </h2>
      </div>

      <div className="max-w-[90rem] mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
        
        {/* Text Content - overlapping the image slightly */}
        <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 relative z-20 lg:translate-x-12">
          
          <FadeIn delay={0.1}>
            {/* Dramatic Typography */}
            <h2 className="font-sans text-[6rem] lg:text-[10rem] font-medium text-[#141413] leading-[0.8] tracking-tighter mb-8 drop-shadow-2xl">
              عکس
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            {/* Urdu Text beautifully framed */}
            <div className="relative pl-6 lg:pl-8 py-2 mb-12 border-l-2 border-kaaj-olive/30" dir="rtl">
              <p className="font-sans text-[22px] lg:text-[28px] leading-relaxed text-[#141413]/80 font-light lg:text-right">
                آپ کی شخصیت کا ایک نیا عکس۔
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="w-full flex justify-center lg:justify-start">
              <Link
                href="/categories/aks"
                className="group inline-flex items-center gap-6 px-12 py-5 rounded-none bg-kaaj-olive text-kaaj-cream hover:bg-[#4A4D45] transition-all duration-500 shadow-xl shadow-black/10"
              >
                <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.3em]">
                  Shop Collection
                </span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="group-hover:translate-x-2 transition-transform duration-500">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Image Content - Massive and imposing */}
        <div className="w-full lg:w-7/12 order-1 lg:order-2 relative z-10 lg:-translate-y-8">
          <FadeIn delay={0.2}>
            <Link href="/categories/aks" className="block relative aspect-[4/5] lg:aspect-[3/4] w-full max-w-[600px] lg:max-w-[700px] mx-auto lg:ml-auto lg:mr-0 overflow-hidden bg-[#EAE8E3] group shadow-2xl shadow-black/5">
              <Image 
                src="/images/launch_1_decoration/ed-6.webp"
                alt="Aks Collection by Kaaj"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.03]"
                priority
                quality={100}
              />
              
              {/* Subtle overlay gradient to make it look expensive */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            </Link>
          </FadeIn>
        </div>

      </div>
    </section>
  );
}
