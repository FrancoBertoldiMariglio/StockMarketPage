"use client";

import { DollarSign, Banknote } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { cn } from "@/lib/utils";

interface CurrencyToggleProps {
  className?: string;
}

export function CurrencyToggle({ className }: CurrencyToggleProps) {
  const { currency, setCurrency } = useCurrency();

  return (
    <div
      className={cn(
        "flex items-center gap-0.5 bg-bg-tertiary rounded-lg p-0.5",
        className
      )}
    >
      <button
        onClick={() => setCurrency("USD")}
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200",
          currency === "USD"
            ? "bg-positive text-white shadow-sm"
            : "text-text-muted hover:text-text-secondary"
        )}
        aria-pressed={currency === "USD"}
      >
        <DollarSign className="w-3.5 h-3.5" />
        USD
      </button>
      <button
        onClick={() => setCurrency("ARS")}
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200",
          currency === "ARS"
            ? "bg-accent-blue text-white shadow-sm"
            : "text-text-muted hover:text-text-secondary"
        )}
        aria-pressed={currency === "ARS"}
      >
        <Banknote className="w-3.5 h-3.5" />
        ARS
      </button>
    </div>
  );
}
