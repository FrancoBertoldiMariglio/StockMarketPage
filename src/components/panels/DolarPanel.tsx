"use client";

import { useDolarData } from "@/hooks/useDolarData";
import { PanelCard } from "@/components/ui/PanelCard";
import { AnimatedValue } from "@/components/ui/AnimatedValue";
import { VariationBadge } from "@/components/ui/VariationBadge";
import { Skeleton } from "@/components/ui/Skeleton";

export function DolarPanel() {
  const { data, previousData, isLoading, error, lastUpdated } = useDolarData();

  return (
    <PanelCard
      title="Tipos de Dólar"
      lastUpdated={lastUpdated}
      error={error}
      href="/dolares"
    >
      {isLoading || !data ? (
        <Skeleton rows={7} />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-text-secondary text-xs">
                <th className="text-left pb-2 font-medium">Tipo</th>
                <th className="text-right pb-2 font-medium">Compra</th>
                <th className="text-right pb-2 font-medium">Venta</th>
                <th className="text-right pb-2 font-medium">Var %</th>
              </tr>
            </thead>
            <tbody>
              {data.map((q, i) => {
                const prev = previousData?.[i];
                return (
                  <tr
                    key={q.type}
                    className="border-t border-border-primary/50"
                  >
                    <td className="py-1.5 text-text-primary font-medium text-xs">
                      {q.type}
                    </td>
                    <td className="py-1.5 text-right">
                      <AnimatedValue
                        value={q.buy}
                        previousValue={prev?.buy}
                        format="currency"
                        className="text-xs"
                      />
                    </td>
                    <td className="py-1.5 text-right">
                      <AnimatedValue
                        value={q.sell}
                        previousValue={prev?.sell}
                        format="currency"
                        className="text-xs"
                      />
                    </td>
                    <td className="py-1.5 text-right">
                      <VariationBadge value={q.variation} className="text-[11px]" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </PanelCard>
  );
}
