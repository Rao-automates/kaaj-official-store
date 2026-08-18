import { sizeData, shalwarSizeData, dupattaSizeData } from "@/lib/constants";

export const metadata = {
  title: "Size Guide | K A A J",
  description: "Find your perfect fit with our comprehensive size guide for Shalwar Kameez and Dupatta.",
};

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-transparent pt-32 md:pt-48 pb-32">
      {/* Editorial Header */}
      <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="flex flex-col items-start max-w-4xl">
          <h1 className="font-serif text-[clamp(3rem,10vw,7rem)] leading-[0.9] text-kaaj-charcoal tracking-tighter -ml-1 md:-ml-2 mb-8">
            Sizing.
          </h1>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-kaaj-charcoal/70 max-w-xl leading-relaxed">
            All measurements are in inches. For the best fit, measure over your undergarments.
            If you are between sizes, we recommend sizing up for comfort.
          </p>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-20">
        
        {/* ── How to Measure ── */}
        <div className="max-w-3xl">
          <h2 className="font-serif text-2xl md:text-3xl text-kaaj-charcoal mb-6">How to Measure</h2>
          <div className="space-y-3">
            {[
              { label: "Shoulder", desc: "Measure from one shoulder bone to the other across the back." },
              { label: "Chest / Bust", desc: "Measure around the fullest part of your bust. Keep tape parallel to the floor." },
              { label: "Waist", desc: "Measure around the narrowest part of your waist, just above the navel." },
              { label: "Length", desc: "Measure vertically from the top of the shoulder to your desired length." },
              { label: "Arm Hole", desc: "Measure around the arm opening at the armpit." },
              { label: "Sleeve Length", desc: "Measure from the shoulder point, along the outside of the arm, to the wrist." },
            ].map((item) => (
              <div key={item.label} className="flex gap-3 py-3 border-b border-kaaj-charcoal/10">
                <span className="font-sans text-xs font-semibold text-kaaj-charcoal uppercase tracking-wide min-w-[120px]">{item.label}:</span>
                <span className="font-sans text-xs text-kaaj-charcoal/70 leading-relaxed">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Kameez (Shirt) Size Chart ── */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-kaaj-charcoal/10" />
            <h2 className="font-serif text-2xl md:text-3xl text-kaaj-charcoal whitespace-nowrap">Kameez</h2>
            <div className="h-px flex-1 bg-kaaj-charcoal/10" />
          </div>

          <div className="border border-kaaj-charcoal/20">
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-sans whitespace-nowrap">
                <thead>
                  <tr className="border-b border-kaaj-charcoal/20 bg-kaaj-charcoal/5">
                    {["Size", "Length", "Shoulder", "Chest", "Front Border", "Arm Hole", "Sleeve Length", "Sleeve Opening"].map((h) => (
                      <th
                        key={h}
                        className="py-6 px-6 text-center text-[10px] sm:text-xs uppercase tracking-[0.2em] text-kaaj-charcoal/70 font-normal border-r border-kaaj-charcoal/10 last:border-r-0"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeData.map((row) => (
                    <tr
                      key={row.size}
                      className="border-b border-kaaj-charcoal/10 hover:bg-kaaj-gold/5 transition-colors duration-500 last:border-b-0"
                    >
                      <td className="py-6 px-6 text-center font-serif text-lg text-kaaj-charcoal border-r border-kaaj-charcoal/10 bg-kaaj-charcoal/5">{row.size}</td>
                      <td className="py-6 px-6 text-center text-kaaj-charcoal/80 border-r border-kaaj-charcoal/10">{row.length}</td>
                      <td className="py-6 px-6 text-center text-kaaj-charcoal/80 border-r border-kaaj-charcoal/10">{row.shoulder}</td>
                      <td className="py-6 px-6 text-center text-kaaj-charcoal/80 border-r border-kaaj-charcoal/10">{row.chest}</td>
                      <td className="py-6 px-6 text-center text-kaaj-charcoal/80 border-r border-kaaj-charcoal/10">{row.frontBorder}</td>
                      <td className="py-6 px-6 text-center text-kaaj-charcoal/80 border-r border-kaaj-charcoal/10">{row.armHole}</td>
                      <td className="py-6 px-6 text-center text-kaaj-charcoal/80 border-r border-kaaj-charcoal/10">{row.sleeveLength}</td>
                      <td className="py-6 px-6 text-center text-kaaj-charcoal/80">{row.sleeveOpening}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── Shalwar Size Chart ── */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-kaaj-charcoal/10" />
            <h2 className="font-serif text-2xl md:text-3xl text-kaaj-charcoal whitespace-nowrap">Shalwar</h2>
            <div className="h-px flex-1 bg-kaaj-charcoal/10" />
          </div>

          <div className="border border-kaaj-charcoal/20">
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-sans whitespace-nowrap">
                <thead>
                  <tr className="border-b border-kaaj-charcoal/20 bg-kaaj-charcoal/5">
                    {["Size", "Length", "Waist", "Fullness", "Front Rise", "Back Rise", "Hem"].map((h) => (
                      <th
                        key={h}
                        className="py-6 px-6 text-center text-[10px] sm:text-xs uppercase tracking-[0.2em] text-kaaj-charcoal/70 font-normal border-r border-kaaj-charcoal/10 last:border-r-0"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shalwarSizeData.map((row) => (
                    <tr
                      key={row.size}
                      className="border-b border-kaaj-charcoal/10 hover:bg-kaaj-gold/5 transition-colors duration-500 last:border-b-0"
                    >
                      <td className="py-6 px-6 text-center font-serif text-lg text-kaaj-charcoal border-r border-kaaj-charcoal/10 bg-kaaj-charcoal/5">{row.size}</td>
                      <td className="py-6 px-6 text-center text-kaaj-charcoal/80 border-r border-kaaj-charcoal/10">{row.length}</td>
                      <td className="py-6 px-6 text-center text-kaaj-charcoal/80 border-r border-kaaj-charcoal/10">{row.waist}</td>
                      <td className="py-6 px-6 text-center text-kaaj-charcoal/80 border-r border-kaaj-charcoal/10">{row.fullness}</td>
                      <td className="py-6 px-6 text-center text-kaaj-charcoal/80 border-r border-kaaj-charcoal/10">{row.frontRise}</td>
                      <td className="py-6 px-6 text-center text-kaaj-charcoal/80 border-r border-kaaj-charcoal/10">{row.backRise}</td>
                      <td className="py-6 px-6 text-center text-kaaj-charcoal/80">{row.hem}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── Dupatta Size Chart ── */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-kaaj-charcoal/10" />
            <h2 className="font-serif text-2xl md:text-3xl text-kaaj-charcoal whitespace-nowrap">Dupatta</h2>
            <div className="h-px flex-1 bg-kaaj-charcoal/10" />
          </div>

          <div className="border border-kaaj-charcoal/20">
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-sans whitespace-nowrap">
                <thead>
                  <tr className="border-b border-kaaj-charcoal/20 bg-kaaj-charcoal/5">
                    {["Type", "Length", "Width"].map((h) => (
                      <th
                        key={h}
                        className="py-6 px-6 text-center text-[10px] sm:text-xs uppercase tracking-[0.2em] text-kaaj-charcoal/70 font-normal border-r border-kaaj-charcoal/10 last:border-r-0"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dupattaSizeData.map((row) => (
                    <tr
                      key={row.type}
                      className="border-b border-kaaj-charcoal/10 hover:bg-kaaj-gold/5 transition-colors duration-500 last:border-b-0"
                    >
                      <td className="py-6 px-6 text-center font-serif text-base text-kaaj-charcoal border-r border-kaaj-charcoal/10 bg-kaaj-charcoal/5">{row.type}</td>
                      <td className="py-6 px-6 text-center text-kaaj-charcoal/80 border-r border-kaaj-charcoal/10">{row.length}</td>
                      <td className="py-6 px-6 text-center text-kaaj-charcoal/80">{row.width}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-12 text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-kaaj-charcoal/70 leading-loose max-w-2xl mx-auto">
            <span className="text-kaaj-gold mr-2 block sm:inline">Note:</span>
            Sizes may vary slightly between collections due to the nature of hand-crafted fabrics and embroidery. 
            For unstitched fabric, please consult your local tailor for exact measurements.
          </p>
        </div>
      </div>
    </div>
  );
}
