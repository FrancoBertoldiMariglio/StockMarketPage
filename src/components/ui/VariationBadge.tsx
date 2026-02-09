import { cn } from "@/lib/utils";
import { formatPercent } from "@/lib/formatters";

interface VariationBadgeProps {
  value: number;
  className?: string;
}

export function VariationBadge({ value, className }: VariationBadgeProps) {
  const icon = value > 0 ? "\u25B2" : value < 0 ? "\u25BC" : "";
  return (
    <span
      className={cn(
        "font-mono text-xs inline-flex items-center gap-0.5",
        value > 0 && "text-positive",
        value < 0 && "text-negative",
        value === 0 && "text-text-muted",
        className
      )}
    >
      {icon} {formatPercent(value)}
    </span>
  );
}
