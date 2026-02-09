"use client";

import { useBonosCorporativos } from "@/hooks/useBonosCorporativos";
import { PanelCard } from "@/components/ui/PanelCard";
import { AnimatedValue } from "@/components/ui/AnimatedValue";
import { Skeleton } from "@/components/ui/Skeleton";

export function BonosCorporativosPanel() {
  const { data, previousData, isLoading, error, lastUpdated } =
    useBonosCorporativos();

  return (
    <PanelCard
      title="Bonos Corporativos"
      lastUpdated={lastUpdated}
      error={error}
    >
      {isLoading || !data ? (
        <Skeleton rows={5} />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-text-secondary">
                <th className="text-left pb-2 font-medium">Emisor</th>
                <th className="text-right pb-2 font-medium">Cup&oacute;n</th>
                <th className="text-right pb-2 font-medium">Precio</th>
                <th className="text-right pb-2 font-medium">TIR</th>
                <th className="text-right pb-2 font-medium hidden sm:table-cell">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((b, i) => {
                const prev = previousData?.[i];
                return (
                  <tr
                    key={b.ticker}
                    className="border-t border-border-primary/50"
                  >
                    <td className="py-1.5 text-text-primary font-medium">
                      <div>{b.issuer}</div>
                      <div className="text-text-muted text-[10px] font-mono">
                        {b.ticker}
                      </div>
                    </td>
                    <td className="py-1.5 text-right font-mono text-text-secondary">
                      {b.coupon.toFixed(2)}%
                    </td>
                    <td className="py-1.5 text-right">
                      <AnimatedValue
                        value={b.price}
                        previousValue={prev?.price}
                        format="number"
                        className="text-xs"
                      />
                    </td>
                    <td className="py-1.5 text-right">
                      <AnimatedValue
                        value={b.yieldToMaturity}
                        previousValue={prev?.yieldToMaturity}
                        format="percent"
                        className="text-xs"
                      />
                    </td>
                    <td className="py-1.5 text-right hidden sm:table-cell">
                      <span className="text-accent-cyan font-mono text-[11px]">
                        {b.rating}
                      </span>
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
