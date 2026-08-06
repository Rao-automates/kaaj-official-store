import Link from "next/link";
import { sizeData } from "@/lib/constants";

export const metadata = {
  title: "Size Guide | K A A J",
  description: "Find your perfect fit with our comprehensive size guide.",
};

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-kaaj-cream">
      {/* Spacer for global fixed header */}
      <div className="bg-kaaj-deep h-[100px] w-full" />

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.15em] text-kaaj-muted">
          <Link href="/" className="hover:text-kaaj-charcoal transition-colors">Home</Link>
          <span>/</span>
          <span className="text-kaaj-charcoal">Size Guide</span>
        </nav>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="font-serif text-4xl sm:text-5xl text-kaaj-charcoal">Size Guide</h1>
          <p className="font-sans text-sm text-kaaj-muted max-w-xl mx-auto leading-relaxed">
            All measurements are in inches. For the best fit, measure over your undergarments.
            If you are between sizes, we recommend sizing up for comfort.
          </p>
        </div>

        {/* Table Container */}
        <div className="bg-white border border-kaaj-border p-4 sm:p-8 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-sans whitespace-nowrap">
              <thead>
                <tr className="border-b border-kaaj-border bg-kaaj-cream-dark">
                  {["Size", "Length", "Shoulder", "Chest", "Front Border", "Arm Hole", "Sleeve Length", "Sleeve Opening"].map((h) => (
                    <th
                      key={h}
                      className="py-4 px-4 text-center text-[10px] sm:text-xs uppercase tracking-[0.15em] text-kaaj-charcoal font-semibold border-r border-kaaj-border last:border-r-0"
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
                    className="border-b border-kaaj-border/50 hover:bg-kaaj-gold/5 transition-colors"
                  >
                    <td className="py-5 px-4 text-center font-bold text-kaaj-charcoal border-r border-kaaj-border bg-kaaj-cream-dark/30">{row.size}</td>
                    <td className="py-5 px-4 text-center text-kaaj-charcoal border-r border-kaaj-border">{row.length}</td>
                    <td className="py-5 px-4 text-center text-kaaj-charcoal border-r border-kaaj-border">{row.shoulder}</td>
                    <td className="py-5 px-4 text-center text-kaaj-charcoal border-r border-kaaj-border">{row.chest}</td>
                    <td className="py-5 px-4 text-center text-kaaj-charcoal border-r border-kaaj-border">{row.frontBorder}</td>
                    <td className="py-5 px-4 text-center text-kaaj-charcoal border-r border-kaaj-border">{row.armHole}</td>
                    <td className="py-5 px-4 text-center text-kaaj-charcoal border-r border-kaaj-border">{row.sleeveLength}</td>
                    <td className="py-5 px-4 text-center text-kaaj-charcoal">{row.sleeveOpening}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-8 bg-kaaj-blush/30 border border-kaaj-blush p-6 text-center">
          <p className="font-sans text-xs sm:text-sm text-kaaj-deep leading-relaxed max-w-2xl mx-auto">
            <strong className="uppercase tracking-widest font-semibold mr-2 block sm:inline">Note:</strong>
            Sizes may vary slightly between collections due to the nature of hand-crafted fabrics and embroidery. 
            For unstitched fabric, please consult your local tailor for exact measurements.
          </p>
        </div>
      </div>
    </div>
  );
}
