"use client";

import { useCaucionData } from "@/hooks/useCaucionData";
import { PanelCard } from "@/components/ui/PanelCard";
import { AnimatedValue } from "@/components/ui/AnimatedValue";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatCompactNumber } from "@/lib/formatters";
import { financialConcepts } from "@/components/ui/InfoTooltip";

const termLabels: Record<number, string> = {
  1: "1 d\u00eda",
  7: "7 d\u00edas",
  30: "30 d\u00edas",
};

export function CaucionPanel() {
  const { data, previousData, isLoading, error, lastUpdated } = useCaucionData();

  return (
    <PanelCard
      title="Cauciones"
      lastUpdated={lastUpdated}
      error={error}
      href="/caucion"
      infoTooltip={financialConcepts.caucion}
    >
      {isLoading || !data ? (
        <Skeleton rows={3} />
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {data.map((c, i) => {
            const prev = previousData?.[i];
            return (
              <div
                key={c.term}
                className="bg-bg-tertiary/50 rounded-md p-2.5 text-center"
              >
                <div className="text-[11px] text-text-secondary mb-1">
                  {termLabels[c.term] || `${c.term} d\u00edas`}
                </div>
                <AnimatedValue
                  value={c.rateAvg}
                  previousValue={prev?.rateAvg}
                  format="percent"
                  decimals={1}
                  className="text-base font-bold"
                />
                <div className="text-[10px] text-text-muted mt-1 font-mono">
                  {c.rateMin.toFixed(1)}% - {c.rateMax.toFixed(1)}%
                </div>
                <div className="text-[10px] text-text-muted mt-0.5">
                  Vol: {formatCompactNumber(c.volume)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </PanelCard>
  );
}
