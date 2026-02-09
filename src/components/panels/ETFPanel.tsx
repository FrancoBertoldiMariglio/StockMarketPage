"use client";

import { useState } from "react";
import { useETFData } from "@/hooks/useETFData";
import { PanelCard } from "@/components/ui/PanelCard";
import { AnimatedValue } from "@/components/ui/AnimatedValue";
import { VariationBadge } from "@/components/ui/VariationBadge";
import { Skeleton } from "@/components/ui/Skeleton";
import { ETFDetailChart } from "@/components/charts/ETFDetailChart";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function ETFPanel() {
  const { data, previousData, isLoading, error, lastUpdated } = useETFData();
  const [expandedTicker, setExpandedTicker] = useState<string | null>(null);

  return (
    <PanelCard title="ETFs Pa\u00edses" lastUpdated={lastUpdated} error={error}>
      {isLoading || !data ? (
        <Skeleton rows={6} />
      ) : (
        <div>
          <div className="grid grid-cols-[auto_1fr_auto_auto] gap-x-3 text-xs text-text-secondary pb-1.5 mb-1 border-b border-border-primary">
            <span className="font-medium">Ticker</span>
            <span className="font-medium">Pa\u00eds</span>
            <span className="font-medium text-right">Precio</span>
            <span className="font-medium text-right">Var %</span>
          </div>
          {data.map((etf, i) => {
            const prev = previousData?.[i];
            const isExpanded = expandedTicker === etf.ticker;
            return (
              <div key={etf.ticker}>
                <button
                  onClick={() =>
                    setExpandedTicker(isExpanded ? null : etf.ticker)
                  }
                  className="w-full grid grid-cols-[auto_1fr_auto_auto] gap-x-3 items-center py-1.5 border-b border-border-primary/30 hover:bg-bg-tertiary/50 transition-colors text-left"
                >
                  <span className="font-mono text-xs text-accent-cyan font-medium flex items-center gap-1">
                    {etf.ticker}
                    <ChevronDown
                      className={cn(
                        "w-3 h-3 text-text-muted transition-transform",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </span>
                  <span className="text-xs text-text-primary">
                    {etf.countryFlag} {etf.country}
                  </span>
                  <span className="text-right">
                    <AnimatedValue
                      value={etf.price}
                      previousValue={prev?.price}
                      format="currencyUSD"
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
                {isExpanded && (
                  <ETFDetailChart data={etf.history} ticker={etf.ticker} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </PanelCard>
  );
}
