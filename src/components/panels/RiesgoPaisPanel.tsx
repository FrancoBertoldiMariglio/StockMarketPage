"use client";

import { useRiesgoPais } from "@/hooks/useRiesgoPais";
import { PanelCard } from "@/components/ui/PanelCard";
import { AnimatedValue } from "@/components/ui/AnimatedValue";
import { MiniChart } from "@/components/ui/MiniChart";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";
import { financialConcepts } from "@/components/ui/InfoTooltip";

export function RiesgoPaisPanel() {
  const { data, previousData, isLoading, error, lastUpdated } = useRiesgoPais();

  return (
    <PanelCard
      title="Riesgo País"
      lastUpdated={lastUpdated}
      error={error}
      href="/riesgo-pais"
      infoTooltip={financialConcepts.riesgoPais}
    >
      {isLoading || !data ? (
        <Skeleton rows={2} />
      ) : (
        <div>
          <div className="flex items-end gap-3 mb-2">
            <AnimatedValue
              value={data.value}
              previousValue={previousData?.value}
              format="number"
              decimals={0}
              className="text-2xl font-bold"
            />
            <div className="flex items-center gap-1 pb-1">
              <span
                className={cn(
                  "font-mono text-sm",
                  data.variation < 0 ? "text-positive" : "text-negative"
                )}
              >
                {data.variation > 0 ? "+" : ""}
                {data.variation} pts
              </span>
              <span
                className={cn(
                  "font-mono text-xs",
                  data.variationPercent < 0
                    ? "text-positive"
                    : "text-negative"
                )}
              >
                ({data.variationPercent > 0 ? "+" : ""}
                {data.variationPercent.toFixed(2)}%)
              </span>
            </div>
          </div>
          <MiniChart data={data.history} />
        </div>
      )}
    </PanelCard>
  );
}
