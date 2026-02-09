"use client";

import { cn } from "@/lib/utils";
import { formatCurrency, formatPercent, formatNumber } from "@/lib/formatters";

interface AnimatedValueProps {
  value: number;
  previousValue?: number;
  format?: "currency" | "currencyUSD" | "percent" | "number";
  decimals?: number;
  className?: string;
}

export function AnimatedValue({
  value,
  previousValue,
  format = "number",
  decimals = 2,
  className,
}: AnimatedValueProps) {
  const direction =
    previousValue !== undefined && previousValue !== value
      ? value > previousValue
        ? "up"
        : value < previousValue
          ? "down"
          : null
      : null;

  let formatted: string;
  switch (format) {
    case "currency":
      formatted = formatCurrency(value, "ARS");
      break;
    case "currencyUSD":
      formatted = formatCurrency(value, "USD");
      break;
    case "percent":
      formatted = formatPercent(value, decimals);
      break;
    default:
      formatted = formatNumber(value, decimals);
  }

  return (
    <span
      key={`${value}-${previousValue}`}
      className={cn(
        "font-mono transition-colors duration-300 rounded px-1",
        direction === "up" && "flash-up text-positive",
        direction === "down" && "flash-down text-negative",
        className
      )}
    >
      {formatted}
    </span>
  );
}
