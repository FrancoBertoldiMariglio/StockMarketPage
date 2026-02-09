import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  isConnected: boolean;
  className?: string;
}

export function StatusIndicator({
  isConnected,
  className,
}: StatusIndicatorProps) {
  return (
    <span
      className={cn(
        "inline-block w-2 h-2 rounded-full",
        isConnected ? "bg-positive" : "bg-negative",
        className
      )}
    />
  );
}
