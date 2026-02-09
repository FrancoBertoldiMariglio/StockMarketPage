import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  rows?: number;
}

export function Skeleton({ className, rows = 3 }: SkeletonProps) {
  return (
    <div className={cn("animate-pulse space-y-3", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-bg-tertiary rounded"
          style={{ width: `${80 - i * 10}%` }}
        />
      ))}
    </div>
  );
}
