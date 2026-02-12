"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ETFCategoryPanel } from "@/components/panels/ETFCategoryPanel";
import { HistoricalAreaChart } from "@/components/charts/HistoricalAreaChart";
import {
  TimeframeSelector,
  Timeframe,
} from "@/components/charts/TimeframeSelector";
import { useETFCriptoData } from "@/hooks/useETFCriptoData";
import { useCurrency } from "@/contexts/CurrencyContext";

export default function ETFCriptoPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>("1M");
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const { data, previousData, isLoading, error, lastUpdated } = useETFCriptoData();
  const { currency } = useCurrency();

  const selectedETF = useMemo(() => {
    if (!data || !selectedTicker) return null;
    return data.find((etf) => etf.ticker === selectedTicker) || null;
  }, [data, selectedTicker]);

  const chartData = useMemo(() => {
    if (!selectedETF?.history) return [];
    const today = new Date();
    return selectedETF.history.map((point, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (selectedETF.history.length - 1 - index));
      return {
        date: date.toISOString().split("T")[0],
        value: point.close,
      };
    });
  }, [selectedETF]);

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
            ETFs de Criptomonedas
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ETFCategoryPanel
                title="ETFs Cripto"
                data={data}
                previousData={previousData}
                isLoading={isLoading}
                error={error}
                lastUpdated={lastUpdated}
                labelColumn="Cripto"
                mode="detail"
                selectedTicker={selectedTicker}
                onSelectTicker={setSelectedTicker}
              />
            </div>

            <div className="lg:col-span-2">
              {selectedETF ? (
                <div className="bg-bg-secondary rounded-lg border border-border-primary p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-sm font-medium text-text-primary">
                        {selectedETF.ticker} - {selectedETF.countryFlag} {selectedETF.country}
                      </h2>
                      <p className="text-xs text-text-muted mt-0.5">
                        {selectedETF.name}
                      </p>
                    </div>
                    <TimeframeSelector value={timeframe} onChange={setTimeframe} />
                  </div>

                  <HistoricalAreaChart
                    data={chartData}
                    height={300}
                    color="#8b5cf6"
                    gradientId={`etf-${selectedETF.ticker}`}
                    label="Precio"
                    formatValue={(v) =>
                      currency === "ARS"
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
                          {currency === "ARS"
                            ? `$${(selectedETF.priceARS ?? selectedETF.price * 1050).toLocaleString("es-AR")}`
                            : `US$${selectedETF.price.toFixed(2)}`}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted uppercase tracking-wider">
                          Variación
                        </span>
                        <p className={`text-sm font-mono ${selectedETF.variation >= 0 ? "text-positive" : "text-negative"}`}>
                          {selectedETF.variation >= 0 ? "+" : ""}
                          {selectedETF.variation.toFixed(2)}%
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted uppercase tracking-wider">
                          Máximo
                        </span>
                        <p className="text-sm font-mono text-text-primary">
                          {selectedETF.history
                            ? `US$${Math.max(...selectedETF.history.map((h) => h.close)).toFixed(2)}`
                            : "-"}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted uppercase tracking-wider">
                          Mínimo
                        </span>
                        <p className="text-sm font-mono text-text-primary">
                          {selectedETF.history
                            ? `US$${Math.min(...selectedETF.history.map((h) => h.close)).toFixed(2)}`
                            : "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-bg-secondary rounded-lg border border-border-primary p-8 flex items-center justify-center h-[400px]">
                  <p className="text-sm text-text-muted">
                    Seleccioná un ETF para ver su evolución
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
