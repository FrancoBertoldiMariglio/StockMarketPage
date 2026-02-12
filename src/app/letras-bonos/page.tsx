"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { HistoricalAreaChart } from "@/components/charts/HistoricalAreaChart";
import {
  TimeframeSelector,
  Timeframe,
} from "@/components/charts/TimeframeSelector";
import { useLetraBonos } from "@/hooks/useLetraBonos";
import { AnimatedValue } from "@/components/ui/AnimatedValue";
import { VariationBadge } from "@/components/ui/VariationBadge";
import { cn } from "@/lib/utils";

// Generate mock historical price data
function generatePriceHistory(basePrice: number, days: number, isARS: boolean) {
  const today = new Date();
  const data = [];
  const multiplier = isARS ? 100 : 1;
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const noise = (Math.random() * 2 - 1) * multiplier;
    data.push({
      date: date.toISOString().split("T")[0],
      value: Math.round((basePrice + noise + i * 0.05 * multiplier) * 100) / 100,
    });
  }
  return data;
}

export default function LetraBonosPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>("1M");
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const { data, previousData, isLoading } = useLetraBonos();

  const selectedItem = useMemo(() => {
    if (!data || !selectedTicker) return null;
    return data.find((lb) => lb.ticker === selectedTicker) || null;
  }, [data, selectedTicker]);

  const chartData = useMemo(() => {
    if (!selectedItem) return [];
    const daysMap: Record<Timeframe, number> = {
      "1D": 1, "1S": 7, "1M": 30, "3M": 90, "6M": 180, "1A": 365,
    };
    const isARS = selectedItem.currency === "ARS";
    return generatePriceHistory(selectedItem.price, daysMap[timeframe], isARS);
  }, [selectedItem, timeframe]);

  if (data && data.length > 0 && !selectedTicker) {
    setSelectedTicker(data[0].ticker);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-4 py-6">
          <Breadcrumb />
          <h1 className="text-xl font-semibold text-text-primary mb-6">
            Letras y Bonos Soberanos
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista */}
            <div className="lg:col-span-1">
              <div className="bg-bg-secondary rounded-lg border border-border-primary p-4">
                <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 text-xs text-text-secondary pb-2 mb-2 border-b border-border-primary">
                  <span className="font-medium">Instrumento</span>
                  <span className="font-medium text-right">Paridad</span>
                  <span className="font-medium text-right">Var %</span>
                </div>
                {isLoading || !data ? (
                  <div className="space-y-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-12 bg-bg-tertiary animate-pulse rounded" />
                    ))}
                  </div>
                ) : (
                  data.map((item, i) => {
                    const prev = previousData?.[i];
                    const isSelected = selectedTicker === item.ticker;
                    return (
                      <button
                        key={item.ticker}
                        onClick={() => setSelectedTicker(item.ticker)}
                        className={cn(
                          "w-full grid grid-cols-[1fr_auto_auto] gap-x-3 items-center py-2 border-b border-border-primary/30 hover:bg-bg-tertiary/50 transition-colors text-left",
                          isSelected && "bg-accent-cyan/10 border-l-2 border-l-accent-cyan"
                        )}
                      >
                        <div>
                          <span className="text-xs text-text-primary font-medium block">
                            {item.name}
                          </span>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="text-[10px] text-text-muted font-mono">
                              {item.ticker}
                            </span>
                            <span className={cn(
                              "text-[9px] px-1 rounded",
                              item.type === "letra" ? "bg-accent-cyan/20 text-accent-cyan" : "bg-accent-blue/20 text-accent-blue"
                            )}>
                              {item.type === "letra" ? "LECAP" : "BONO"}
                            </span>
                            <span className={cn(
                              "text-[9px] px-1 rounded",
                              item.law === "ny" ? "bg-positive/20 text-positive" : "bg-text-muted/20 text-text-muted"
                            )}>
                              {item.law.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-text-primary">
                          {item.parity.toFixed(1)}%
                        </span>
                        <VariationBadge value={item.variation} className="text-[11px]" />
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Gráfico */}
            <div className="lg:col-span-2">
              {selectedItem ? (
                <div className="bg-bg-secondary rounded-lg border border-border-primary p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-sm font-medium text-text-primary">
                        {selectedItem.ticker} - {selectedItem.name}
                      </h2>
                      <p className="text-xs text-text-muted mt-0.5">
                        {selectedItem.type === "letra" ? "Letra" : "Bono"} • Ley {selectedItem.law.toUpperCase()} • {selectedItem.currency}
                      </p>
                    </div>
                    <TimeframeSelector value={timeframe} onChange={setTimeframe} />
                  </div>

                  <HistoricalAreaChart
                    data={chartData}
                    height={300}
                    color={selectedItem.type === "letra" ? "#06b6d4" : "#3b82f6"}
                    gradientId={`lb-${selectedItem.ticker}`}
                    label="Precio"
                    formatValue={(v) =>
                      selectedItem.currency === "ARS"
                        ? `$${v.toLocaleString("es-AR")}`
                        : `US$${v.toFixed(2)}`
                    }
                  />

                  <div className="mt-4 pt-4 border-t border-border-primary">
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <span className="text-[10px] text-text-muted uppercase tracking-wider">
                          Precio
                        </span>
                        <p className="text-sm font-mono text-text-primary">
                          {selectedItem.currency === "ARS"
                            ? `$${selectedItem.price.toLocaleString("es-AR")}`
                            : `US$${selectedItem.price.toFixed(2)}`}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted uppercase tracking-wider">
                          TIR
                        </span>
                        <p className="text-sm font-mono text-accent-cyan">
                          {selectedItem.yieldToMaturity.toFixed(2)}%
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted uppercase tracking-wider">
                          Paridad
                        </span>
                        <p className="text-sm font-mono text-text-primary">
                          {selectedItem.parity.toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted uppercase tracking-wider">
                          Duration
                        </span>
                        <p className="text-sm font-mono text-text-primary">
                          {selectedItem.duration.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-bg-secondary rounded-lg border border-border-primary p-8 flex items-center justify-center h-[400px]">
                  <p className="text-sm text-text-muted">
                    Seleccioná un instrumento para ver su evolución
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
