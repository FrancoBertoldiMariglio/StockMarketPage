"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { RiesgoPaisPanel } from "@/components/panels/RiesgoPaisPanel";
import { HistoricalAreaChart } from "@/components/charts/HistoricalAreaChart";
import {
  TimeframeSelector,
  Timeframe,
} from "@/components/charts/TimeframeSelector";
import { useRiesgoPais } from "@/hooks/useRiesgoPais";

function generateChartData(history: number[], days: number) {
  const dataToUse = history.slice(-days);
  const today = new Date();

  return dataToUse.map((value, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (dataToUse.length - 1 - index));
    return {
      date: date.toISOString().split("T")[0],
      value,
    };
  });
}

export default function RiesgoPaisPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>("1M");
  const { data } = useRiesgoPais();

  const chartData = useMemo(() => {
    if (!data?.history) return [];
    const daysMap: Record<Timeframe, number> = {
      "1D": 1,
      "1S": 7,
      "1M": 30,
      "3M": 30,
      "6M": 30,
      "1A": 30,
    };
    return generateChartData(data.history, daysMap[timeframe]);
  }, [data?.history, timeframe]);

  const isNegativeTrend = data ? data.variation > 0 : false;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-4 py-6">
          <Breadcrumb />
          <h1 className="text-xl font-semibold text-text-primary mb-6">
            Riesgo País
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Panel principal */}
            <div className="lg:col-span-1">
              <RiesgoPaisPanel />
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

                <HistoricalAreaChart
                  data={chartData}
                  height={300}
                  color={isNegativeTrend ? "#ef4444" : "#22c55e"}
                  gradientId="riesgo-pais-gradient"
                  label="Riesgo País"
                  formatValue={(v) => `${v.toLocaleString("es-AR")} pts`}
                />

                <div className="mt-4 pt-4 border-t border-border-primary">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <span className="text-[10px] text-text-muted uppercase tracking-wider">
                        Máximo
                      </span>
                      <p className="text-sm font-mono text-text-primary">
                        {data?.history
                          ? Math.max(...data.history).toLocaleString("es-AR")
                          : "-"}{" "}
                        pts
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] text-text-muted uppercase tracking-wider">
                        Mínimo
                      </span>
                      <p className="text-sm font-mono text-text-primary">
                        {data?.history
                          ? Math.min(...data.history).toLocaleString("es-AR")
                          : "-"}{" "}
                        pts
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] text-text-muted uppercase tracking-wider">
                        Promedio
                      </span>
                      <p className="text-sm font-mono text-text-primary">
                        {data?.history
                          ? Math.round(
                              data.history.reduce((a, b) => a + b, 0) /
                                data.history.length
                            ).toLocaleString("es-AR")
                          : "-"}{" "}
                        pts
                      </p>
                    </div>
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
