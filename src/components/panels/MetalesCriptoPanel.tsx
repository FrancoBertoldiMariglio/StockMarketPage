"use client";

import { useMetalesCripto } from "@/hooks/useMetalesCripto";
import { PanelCard } from "@/components/ui/PanelCard";
import { AnimatedValue } from "@/components/ui/AnimatedValue";
import { VariationBadge } from "@/components/ui/VariationBadge";
import { Skeleton } from "@/components/ui/Skeleton";

export function MetalesCriptoPanel() {
  const { data, previousData, isLoading, error, lastUpdated } = useMetalesCripto();

  return (
    <PanelCard title="Metales & Cripto" lastUpdated={lastUpdated} error={error}>
      {isLoading || !data ? (
        <Skeleton rows={6} />
      ) : (
        <div className="space-y-3">
          <div>
            <h3 className="text-xs font-medium text-text-secondary mb-1.5">
              Metales
            </h3>
            <div className="space-y-1">
              {data.metals.map((m, i) => {
                const prev = previousData?.metals[i];
                return (
                  <div
                    key={m.symbol}
                    className="flex items-center justify-between py-1 border-b border-border-primary/30 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-text-muted font-mono w-8">
                        {m.symbol}
                      </span>
                      <span className="text-xs text-text-primary">{m.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AnimatedValue
                        value={m.priceUSD}
                        previousValue={prev?.priceUSD}
                        format="currencyUSD"
                        className="text-xs"
                      />
                      <VariationBadge value={m.variation} className="text-[11px]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-medium text-text-secondary mb-1.5">
              Criptomonedas
            </h3>
            <div className="space-y-1">
              {data.crypto.map((c, i) => {
                const prev = previousData?.crypto[i];
                return (
                  <div
                    key={c.symbol}
                    className="flex items-center justify-between py-1 border-b border-border-primary/30 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-text-muted font-mono w-8">
                        {c.symbol}
                      </span>
                      <span className="text-xs text-text-primary">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AnimatedValue
                        value={c.priceUSD}
                        previousValue={prev?.priceUSD}
                        format="currencyUSD"
                        className="text-xs"
                      />
                      <VariationBadge value={c.variation} className="text-[11px]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </PanelCard>
  );
}
