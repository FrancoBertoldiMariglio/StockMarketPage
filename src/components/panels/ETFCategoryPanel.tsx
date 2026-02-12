"use client";

import { useState } from "react";
import { PanelCard } from "@/components/ui/PanelCard";
import { AnimatedValue } from "@/components/ui/AnimatedValue";
import { VariationBadge } from "@/components/ui/VariationBadge";
import { Skeleton } from "@/components/ui/Skeleton";
import { ETFDetailChart } from "@/components/charts/ETFDetailChart";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/contexts/CurrencyContext";
import { ETFQuote } from "@/types/market";
import { financialConcepts } from "@/components/ui/InfoTooltip";

interface ETFCategoryPanelProps {
  title: string;
  data: ETFQuote[] | null;
  previousData?: ETFQuote[] | null;
  isLoading: boolean;
  error: Error | null;
  lastUpdated: Date | null;
  labelColumn?: string;
  href?: string;
  // New props for detail page mode
  mode?: "dashboard" | "detail";
  selectedTicker?: string | null;
  onSelectTicker?: (ticker: string) => void;
}

export function ETFCategoryPanel({
  title,
  data,
  previousData,
  isLoading,
  error,
  lastUpdated,
  labelColumn = "País",
  href,
  mode = "dashboard",
  selectedTicker,
  onSelectTicker,
}: ETFCategoryPanelProps) {
  const { currency } = useCurrency();
  const [expandedTicker, setExpandedTicker] = useState<string | null>(null);

  const isDashboard = mode === "dashboard";

  const handleClick = (ticker: string) => {
    if (isDashboard) {
      setExpandedTicker(expandedTicker === ticker ? null : ticker);
    } else if (onSelectTicker) {
      onSelectTicker(ticker);
    }
  };

  const content = (
    <>
      {isLoading || !data ? (
        <Skeleton rows={6} />
      ) : (
        <div>
          <div className="grid grid-cols-[auto_1fr_auto_auto] gap-x-3 text-xs text-text-secondary pb-1.5 mb-1 border-b border-border-primary">
            <span className="font-medium">Ticker</span>
            <span className="font-medium">{labelColumn}</span>
            <span className="font-medium text-right">
              Precio ({currency})
            </span>
            <span className="font-medium text-right">Var %</span>
          </div>
          {data.map((etf, i) => {
            const prev = previousData?.[i];
            const isExpanded = isDashboard && expandedTicker === etf.ticker;
            const isSelected = !isDashboard && selectedTicker === etf.ticker;
            const displayPrice =
              currency === "ARS" ? (etf.priceARS ?? etf.price * 1050) : etf.price;
            const prevDisplayPrice =
              currency === "ARS"
                ? (prev?.priceARS ?? (prev?.price ?? 0) * 1050)
                : prev?.price;

            return (
              <div key={etf.ticker}>
                <button
                  onClick={() => handleClick(etf.ticker)}
                  className={cn(
                    "w-full grid grid-cols-[auto_1fr_auto_auto] gap-x-3 items-center py-1.5 border-b border-border-primary/30 hover:bg-bg-tertiary/50 transition-colors text-left",
                    isSelected && "bg-accent-cyan/10 border-l-2 border-l-accent-cyan"
                  )}
                >
                  <span className="font-mono text-xs text-accent-cyan font-medium flex items-center gap-1">
                    {etf.ticker}
                    {isDashboard && (
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 text-text-muted transition-transform",
                          isExpanded && "rotate-180"
                        )}
                      />
                    )}
                  </span>
                  <span className="text-xs text-text-primary">
                    {etf.countryFlag} {etf.country}
                  </span>
                  <span className="text-right">
                    <AnimatedValue
                      value={displayPrice}
                      previousValue={prevDisplayPrice}
                      format={currency === "ARS" ? "currency" : "currencyUSD"}
                      className="text-xs"
                    />
                  </span>
                  <span className="text-right">
                    <VariationBadge
                      value={etf.variation}
                      className="text-[11px]"
                    />
                  </span>
                </button>
                {/* Only show expandable chart in dashboard mode */}
                {isDashboard && isExpanded && (
                  <ETFDetailChart data={etf.history} ticker={etf.ticker} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );

  // In detail mode, don't wrap in PanelCard
  if (!isDashboard) {
    return (
      <div className="bg-bg-secondary rounded-lg border border-border-primary p-4">
        {content}
      </div>
    );
  }

  return (
    <PanelCard
      title={title}
      lastUpdated={lastUpdated}
      error={error}
      href={href}
      infoTooltip={financialConcepts.etf}
    >
      {content}
    </PanelCard>
  );
}
