"use client";

import { useDescuentoCheques } from "@/hooks/useDescuentoCheques";
import { PanelCard } from "@/components/ui/PanelCard";
import { AnimatedValue } from "@/components/ui/AnimatedValue";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatCompactNumber } from "@/lib/formatters";

export function DescuentoChequesPanel() {
  const { data, previousData, isLoading, error, lastUpdated } =
    useDescuentoCheques();

  const byma = data?.filter((d) => d.market === "BYMA") || [];
  const mav = data?.filter((d) => d.market === "MAV") || [];

  return (
    <PanelCard
      title="Descuento de Cheques"
      lastUpdated={lastUpdated}
      error={error}
    >
      {isLoading || !data ? (
        <Skeleton rows={4} />
      ) : (
        <div className="space-y-3">
          {[
            { label: "BYMA", items: byma },
            { label: "MAV", items: mav },
          ].map(({ label, items }) => (
            <div key={label}>
              <h3 className="text-xs font-medium text-text-secondary mb-1.5">
                {label}
              </h3>
              <div className="space-y-1">
                {items.map((d) => {
                  const prev = previousData?.find(
                    (p) =>
                      p.market === d.market && p.segment === d.segment
                  );
                  return (
                    <div
                      key={`${d.market}-${d.segment}`}
                      className="flex items-center justify-between py-1 border-b border-border-primary/30 last:border-0"
                    >
                      <div>
                        <span className="text-xs text-text-primary">
                          {d.segment}
                        </span>
                        <span className="text-[10px] text-text-muted ml-1.5">
                          {d.termDays}d
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <AnimatedValue
                          value={d.rateAvg}
                          previousValue={prev?.rateAvg}
                          format="percent"
                          decimals={1}
                          className="text-xs font-semibold"
                        />
                        <span className="text-[10px] text-text-muted font-mono">
                          {formatCompactNumber(d.volume)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </PanelCard>
  );
}
