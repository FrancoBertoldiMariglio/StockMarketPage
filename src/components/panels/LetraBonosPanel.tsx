"use client";

import { useLetraBonos } from "@/hooks/useLetraBonos";
import { PanelCard } from "@/components/ui/PanelCard";
import { AnimatedValue } from "@/components/ui/AnimatedValue";
import { VariationBadge } from "@/components/ui/VariationBadge";
import { Skeleton } from "@/components/ui/Skeleton";
import { LetraBono } from "@/types/market";

function TableHeader() {
  return (
    <thead>
      <tr className="text-text-secondary text-xs">
        <th className="text-left pb-1.5 font-medium">Ticker</th>
        <th className="text-right pb-1.5 font-medium">Precio</th>
        <th className="text-right pb-1.5 font-medium">TIR</th>
        <th className="text-right pb-1.5 font-medium">Paridad</th>
        <th className="text-right pb-1.5 font-medium hidden sm:table-cell">
          Var %
        </th>
      </tr>
    </thead>
  );
}

function BonoRow({
  item,
  prev,
}: {
  item: LetraBono;
  prev?: LetraBono;
}) {
  const isBono = item.type === "bono";
  return (
    <tr className="border-t border-border-primary/50">
      <td className="py-1.5">
        <div className="text-text-primary font-medium text-xs">{item.ticker}</div>
        <div className="text-text-muted text-[10px]">
          Ley {item.law === "ny" ? "NY" : "ARG"}
        </div>
      </td>
      <td className="py-1.5 text-right">
        <AnimatedValue
          value={item.price}
          previousValue={prev?.price}
          format={isBono ? "currencyUSD" : "currency"}
          className="text-xs"
        />
      </td>
      <td className="py-1.5 text-right">
        <AnimatedValue
          value={item.yieldToMaturity}
          previousValue={prev?.yieldToMaturity}
          format="percent"
          className="text-xs"
        />
      </td>
      <td className="py-1.5 text-right font-mono text-xs text-text-secondary">
        {item.parity.toFixed(1)}%
      </td>
      <td className="py-1.5 text-right hidden sm:table-cell">
        <VariationBadge value={item.variation} className="text-[11px]" />
      </td>
    </tr>
  );
}

export function LetraBonosPanel() {
  const { data, previousData, isLoading, error, lastUpdated } = useLetraBonos();

  const bonos = data?.filter((lb) => lb.type === "bono") || [];
  const letras = data?.filter((lb) => lb.type === "letra") || [];

  const findPrev = (ticker: string) =>
    previousData?.find((p) => p.ticker === ticker);

  return (
    <PanelCard title="Letras & Bonos Soberanos" lastUpdated={lastUpdated} error={error}>
      {isLoading || !data ? (
        <Skeleton rows={6} />
      ) : (
        <div className="space-y-3">
          <div>
            <h3 className="text-xs font-medium text-text-secondary mb-1">
              Bonos
            </h3>
            <table className="w-full text-xs">
              <TableHeader />
              <tbody>
                {bonos.map((b) => (
                  <BonoRow key={b.ticker} item={b} prev={findPrev(b.ticker)} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border-primary pt-2">
            <h3 className="text-xs font-medium text-text-secondary mb-1">
              LECAPs
            </h3>
            <table className="w-full text-xs">
              <TableHeader />
              <tbody>
                {letras.map((l) => (
                  <BonoRow key={l.ticker} item={l} prev={findPrev(l.ticker)} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </PanelCard>
  );
}
