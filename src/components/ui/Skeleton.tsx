import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  count?: number;
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-sm relative overflow-hidden bg-kaaj-cream-dark",
        className
      )}
    >
      {/* Premium shimmer gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(220,216,208,0.06) 40%, rgba(220,216,208,0.12) 50%, rgba(220,216,208,0.06) 60%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmerSkeleton 2s ease-in-out infinite",
        }}
      />
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="group">
      <Skeleton className="w-full aspect-[3/4] mb-3" />
      <Skeleton className="h-3 w-1/3 mb-2" />
      <Skeleton className="h-4 w-2/3 mb-2" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: SkeletonProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default Skeleton;
