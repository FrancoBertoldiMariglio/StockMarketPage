"use client";

import { cn } from "@/lib/utils";

export type Timeframe = "1D" | "1S" | "1M" | "3M" | "6M" | "1A";

interface TimeframeSelectorProps {
  value: Timeframe;
  onChange: (timeframe: Timeframe) => void;
  className?: string;
}

const timeframes: { value: Timeframe; label: string }[] = [
  { value: "1D", label: "1D" },
  { value: "1S", label: "1S" },
  { value: "1M", label: "1M" },
  { value: "3M", label: "3M" },
  { value: "6M", label: "6M" },
  { value: "1A", label: "1A" },
];

export function TimeframeSelector({
  value,
  onChange,
  className,
}: TimeframeSelectorProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 bg-bg-tertiary rounded-lg p-0.5",
        className
      )}
    >
      {timeframes.map((tf) => (
        <button
          key={tf.value}
          onClick={() => onChange(tf.value)}
          className={cn(
            "px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200",
            value === tf.value
              ? "bg-accent-cyan text-white shadow-sm"
              : "text-text-muted hover:text-text-secondary hover:bg-bg-secondary/50"
          )}
        >
          {tf.label}
        </button>
      ))}
    </div>
  );
}

export function getTimeframeDays(timeframe: Timeframe): number {
  const mapping: Record<Timeframe, number> = {
    "1D": 1,
    "1S": 7,
    "1M": 30,
    "3M": 90,
    "6M": 180,
    "1A": 365,
  };
  return mapping[timeframe];
}
