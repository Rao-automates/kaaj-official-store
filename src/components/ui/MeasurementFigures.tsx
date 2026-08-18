/**
 * Measurement figure SVGs — clean line drawings showing 
 * where each measurement is taken on the garment.
 * Inspired by Nishat's size guide illustrations.
 */

export function KameezFigure() {
  return (
    <div className="flex flex-col items-center py-8">
      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-kaaj-charcoal/70 mb-6">Kameez Measurement Points</p>
      <svg viewBox="0 0 300 420" className="w-full max-w-[280px] h-auto" fill="none" stroke="#141413" strokeWidth="1">
        {/* Kameez outline */}
        {/* Collar / Neckline */}
        <path d="M 120,30 Q 150,20 180,30" strokeWidth="1.5" />
        
        {/* Shoulders */}
        <line x1="120" y1="30" x2="60" y2="55" strokeWidth="1.5" />
        <line x1="180" y1="30" x2="240" y2="55" strokeWidth="1.5" />
        
        {/* Sleeves */}
        <line x1="60" y1="55" x2="30" y2="170" strokeWidth="1.5" />
        <line x1="240" y1="55" x2="270" y2="170" strokeWidth="1.5" />
        
        {/* Sleeve openings */}
        <line x1="30" y1="170" x2="75" y2="170" strokeWidth="1.5" />
        <line x1="225" y1="170" x2="270" y2="170" strokeWidth="1.5" />
        
        {/* Sleeve to body join */}
        <line x1="75" y1="170" x2="80" y2="120" strokeWidth="1.5" />
        <line x1="225" y1="170" x2="220" y2="120" strokeWidth="1.5" />
        
        {/* Side seams */}
        <line x1="80" y1="120" x2="85" y2="370" strokeWidth="1.5" />
        <line x1="220" y1="120" x2="215" y2="370" strokeWidth="1.5" />
        
        {/* Hem */}
        <line x1="85" y1="370" x2="215" y2="370" strokeWidth="1.5" />

        {/* ── Measurement lines ── */}
        
        {/* Shoulder width */}
        <line x1="70" y1="42" x2="230" y2="42" stroke="#6B7053" strokeWidth="0.75" strokeDasharray="4 3" />
        <circle cx="70" cy="42" r="2" fill="#6B7053" stroke="none" />
        <circle cx="230" cy="42" r="2" fill="#6B7053" stroke="none" />
        <text x="150" y="16" textAnchor="middle" fill="#6B7053" fontSize="10" fontFamily="var(--font-inter), sans-serif" stroke="none">Shoulder</text>

        {/* Chest / Bust */}
        <line x1="80" y1="135" x2="220" y2="135" stroke="#6B7053" strokeWidth="0.75" strokeDasharray="4 3" />
        <circle cx="80" cy="135" r="2" fill="#6B7053" stroke="none" />
        <circle cx="220" cy="135" r="2" fill="#6B7053" stroke="none" />
        <text x="258" y="139" textAnchor="start" fill="#6B7053" fontSize="10" fontFamily="var(--font-inter), sans-serif" stroke="none">Chest</text>

        {/* Arm Hole */}
        <path d="M 80,120 Q 75,90 60,55" stroke="#6B7053" strokeWidth="0.75" strokeDasharray="4 3" fill="none" />
        <text x="42" y="82" textAnchor="end" fill="#6B7053" fontSize="9" fontFamily="var(--font-inter), sans-serif" stroke="none">Arm</text>
        <text x="42" y="93" textAnchor="end" fill="#6B7053" fontSize="9" fontFamily="var(--font-inter), sans-serif" stroke="none">Hole</text>

        {/* Sleeve Length */}
        <line x1="35" y1="55" x2="35" y2="170" stroke="#6B7053" strokeWidth="0.75" strokeDasharray="4 3" />
        <circle cx="35" cy="55" r="2" fill="#6B7053" stroke="none" />
        <circle cx="35" cy="170" r="2" fill="#6B7053" stroke="none" />
        <text x="18" y="118" textAnchor="middle" fill="#6B7053" fontSize="9" fontFamily="var(--font-inter), sans-serif" stroke="none" transform="rotate(-90 18 118)">Sleeve</text>

        {/* Length */}
        <line x1="250" y1="30" x2="250" y2="370" stroke="#6B7053" strokeWidth="0.75" strokeDasharray="4 3" />
        <circle cx="250" cy="30" r="2" fill="#6B7053" stroke="none" />
        <circle cx="250" cy="370" r="2" fill="#6B7053" stroke="none" />
        <text x="272" y="205" textAnchor="middle" fill="#6B7053" fontSize="10" fontFamily="var(--font-inter), sans-serif" stroke="none" transform="rotate(90 272 205)">Length</text>

        {/* Sleeve Opening */}
        <line x1="30" y1="180" x2="75" y2="180" stroke="#6B7053" strokeWidth="0.75" strokeDasharray="4 3" />
        <text x="52" y="195" textAnchor="middle" fill="#6B7053" fontSize="8" fontFamily="var(--font-inter), sans-serif" stroke="none">Sleeve Opening</text>

        {/* Front Border / Hip */}
        <line x1="85" y1="300" x2="215" y2="300" stroke="#6B7053" strokeWidth="0.75" strokeDasharray="4 3" />
        <circle cx="85" cy="300" r="2" fill="#6B7053" stroke="none" />
        <circle cx="215" cy="300" r="2" fill="#6B7053" stroke="none" />
        <text x="56" y="304" textAnchor="end" fill="#6B7053" fontSize="9" fontFamily="var(--font-inter), sans-serif" stroke="none">Front</text>
        <text x="56" y="315" textAnchor="end" fill="#6B7053" fontSize="9" fontFamily="var(--font-inter), sans-serif" stroke="none">Border</text>
      </svg>
    </div>
  );
}

export function ShalwarFigure() {
  return (
    <div className="flex flex-col items-center py-8">
      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-kaaj-charcoal/70 mb-6">Shalwar Measurement Points</p>
      <svg viewBox="0 0 280 400" className="w-full max-w-[250px] h-auto" fill="none" stroke="#141413" strokeWidth="1">
        {/* Waistband */}
        <path d="M 70,30 L 210,30" strokeWidth="1.5" />
        <line x1="70" y1="30" x2="65" y2="45" strokeWidth="1.5" />
        <line x1="210" y1="30" x2="215" y2="45" strokeWidth="1.5" />
        <line x1="65" y1="45" x2="215" y2="45" strokeWidth="1.5" />
        
        {/* Hip area - wider */}
        <line x1="65" y1="45" x2="50" y2="130" strokeWidth="1.5" />
        <line x1="215" y1="45" x2="230" y2="130" strokeWidth="1.5" />
        
        {/* Crotch / fullness curve */}
        <path d="M 50,130 Q 60,180 100,200" strokeWidth="1.5" />
        <path d="M 230,130 Q 220,180 180,200" strokeWidth="1.5" />
        
        {/* Inner seam connecting at crotch */}
        <path d="M 100,200 Q 140,165 180,200" strokeWidth="1.5" />
        
        {/* Left leg */}
        <line x1="100" y1="200" x2="95" y2="370" strokeWidth="1.5" />
        <line x1="50" y1="130" x2="55" y2="370" strokeWidth="1.5" />
        
        {/* Right leg */}
        <line x1="180" y1="200" x2="185" y2="370" strokeWidth="1.5" />
        <line x1="230" y1="130" x2="225" y2="370" strokeWidth="1.5" />
        
        {/* Hem */}
        <line x1="55" y1="370" x2="95" y2="370" strokeWidth="1.5" />
        <line x1="185" y1="370" x2="225" y2="370" strokeWidth="1.5" />

        {/* ── Measurement lines ── */}
        
        {/* Waist */}
        <line x1="70" y1="37" x2="210" y2="37" stroke="#6B7053" strokeWidth="0.75" strokeDasharray="4 3" />
        <circle cx="70" cy="37" r="2" fill="#6B7053" stroke="none" />
        <circle cx="210" cy="37" r="2" fill="#6B7053" stroke="none" />
        <text x="140" y="24" textAnchor="middle" fill="#6B7053" fontSize="10" fontFamily="var(--font-inter), sans-serif" stroke="none">Waist</text>

        {/* Fullness (at widest point) */}
        <line x1="50" y1="130" x2="230" y2="130" stroke="#6B7053" strokeWidth="0.75" strokeDasharray="4 3" />
        <circle cx="50" cy="130" r="2" fill="#6B7053" stroke="none" />
        <circle cx="230" cy="130" r="2" fill="#6B7053" stroke="none" />
        <text x="252" y="134" textAnchor="start" fill="#6B7053" fontSize="9" fontFamily="var(--font-inter), sans-serif" stroke="none">Fullness</text>

        {/* Length (full) */}
        <line x1="38" y1="30" x2="38" y2="370" stroke="#6B7053" strokeWidth="0.75" strokeDasharray="4 3" />
        <circle cx="38" cy="30" r="2" fill="#6B7053" stroke="none" />
        <circle cx="38" cy="370" r="2" fill="#6B7053" stroke="none" />
        <text x="20" y="205" textAnchor="middle" fill="#6B7053" fontSize="10" fontFamily="var(--font-inter), sans-serif" stroke="none" transform="rotate(-90 20 205)">Length</text>

        {/* Front Rise */}
        <line x1="140" y1="37" x2="140" y2="182" stroke="#6B7053" strokeWidth="0.75" strokeDasharray="4 3" />
        <circle cx="140" cy="37" r="2" fill="#6B7053" stroke="none" />
        <circle cx="140" cy="182" r="2" fill="#6B7053" stroke="none" />
        <text x="148" y="115" textAnchor="start" fill="#6B7053" fontSize="9" fontFamily="var(--font-inter), sans-serif" stroke="none">Front</text>
        <text x="148" y="126" textAnchor="start" fill="#6B7053" fontSize="9" fontFamily="var(--font-inter), sans-serif" stroke="none">Rise</text>

        {/* Hem */}
        <line x1="55" y1="380" x2="95" y2="380" stroke="#6B7053" strokeWidth="0.75" strokeDasharray="4 3" />
        <circle cx="55" cy="380" r="2" fill="#6B7053" stroke="none" />
        <circle cx="95" cy="380" r="2" fill="#6B7053" stroke="none" />
        <text x="75" y="396" textAnchor="middle" fill="#6B7053" fontSize="9" fontFamily="var(--font-inter), sans-serif" stroke="none">Hem</text>
      </svg>
    </div>
  );
}
