"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { DolarPanel } from "@/components/panels/DolarPanel";
import { HistoricalLineChart } from "@/components/charts/HistoricalLineChart";
import {
  TimeframeSelector,
  Timeframe,
} from "@/components/charts/TimeframeSelector";
import { useDolarData } from "@/hooks/useDolarData";

// Generate mock historical data for visualization
function generateDolarHistory(days: number) {
  const today = new Date();
  const data = [];

  const basePrices = {
    oficial: 1050,
    blue: 1180,
    mep: 1155,
    ccl: 1170,
  };

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const noise = () => Math.random() * 20 - 10;

    data.push({
      date: date.toISOString().split("T")[0],
      oficial: Math.round(basePrices.oficial + noise() + i * 0.5),
      blue: Math.round(basePrices.blue + noise() * 1.5 + i * 0.8),
      mep: Math.round(basePrices.mep + noise() * 1.2 + i * 0.6),
      ccl: Math.round(basePrices.ccl + noise() * 1.3 + i * 0.7),
    });
  }

  return data;
}

const chartSeries = [
  { dataKey: "oficial", name: "Oficial", color: "#3b82f6" },
  { dataKey: "blue", name: "Blue", color: "#8b5cf6" },
  { dataKey: "mep", name: "MEP", color: "#06b6d4" },
  { dataKey: "ccl", name: "CCL", color: "#22c55e" },
];

export default function DolaresPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>("1M");
  const { data: dolarData } = useDolarData();

  const chartData = useMemo(() => {
    const daysMap: Record<Timeframe, number> = {
      "1D": 1,
      "1S": 7,
      "1M": 30,
      "3M": 90,
      "6M": 180,
      "1A": 365,
    };
    return generateDolarHistory(daysMap[timeframe]);
  }, [timeframe]);

  // Calculate spread (brecha) between blue and oficial
  const blueData = dolarData?.find((d) => d.type === "Blue");
  const oficialData = dolarData?.find((d) => d.type === "Oficial");
  const spread =
    blueData && oficialData
      ? ((blueData.sell - oficialData.sell) / oficialData.sell) * 100
      : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-4 py-6">
          <Breadcrumb />
          <h1 className="text-xl font-semibold text-text-primary mb-6">
            Tipos de Dólar
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Panel principal con cotizaciones */}
            <div className="lg:col-span-1">
              <DolarPanel />

              {/* Brecha blue/oficial */}
              {spread !== null && (
                <div className="mt-4 p-4 bg-bg-secondary rounded-lg border border-border-primary">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">
                      Brecha Blue/Oficial
                    </span>
                    <span className="text-lg font-mono font-semibold text-accent-blue">
                      {spread.toFixed(1)}%
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Gráfico histórico */}
            <div className="lg:col-span-2">
              <div className="bg-bg-secondary rounded-lg border border-border-primary p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-medium text-text-primary">
                    Evolución Histórica
                  </h2>
                  <TimeframeSelector value={timeframe} onChange={setTimeframe} />
                </div>

                <HistoricalLineChart
                  data={chartData}
                  series={chartSeries}
                  height={300}
                  showLegend={true}
                  formatValue={(v) => `$${v.toLocaleString("es-AR")}`}
                />

                <div className="mt-4 pt-4 border-t border-border-primary">
                  <div className="flex flex-wrap gap-4">
                    {chartSeries.map((s) => (
                      <div key={s.dataKey} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: s.color }}
                        />
                        <span className="text-xs text-text-secondary">
                          {s.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
