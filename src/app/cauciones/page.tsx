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
import { useCaucionData } from "@/hooks/useCaucionData";
import { AnimatedValue } from "@/components/ui/AnimatedValue";
import { cn } from "@/lib/utils";

// Generate mock historical rate data
function generateRateHistory(baseRate: number, days: number) {
  const today = new Date();
  const data = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const noise = Math.random() * 1 - 0.5;
    data.push({
      date: date.toISOString().split("T")[0],
      value: Math.round((baseRate + noise + i * 0.01) * 100) / 100,
    });
  }
  return data;
}

function formatTerm(term: number): string {
  if (term === 1) return "1 día";
  if (term === 7) return "7 días";
  return `${term} días`;
}

export default function CaucionesPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>("1M");
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const { data, previousData, isLoading } = useCaucionData();

  const selectedCaucion = useMemo(() => {
    if (!data || selectedTerm === null) return null;
    return data.find((c) => c.term === selectedTerm) || null;
  }, [data, selectedTerm]);

  const chartData = useMemo(() => {
    if (!selectedCaucion) return [];
    const daysMap: Record<Timeframe, number> = {
      "1D": 1, "1S": 7, "1M": 30, "3M": 90, "6M": 180, "1A": 365,
    };
    return generateRateHistory(selectedCaucion.rateAvg, daysMap[timeframe]);
  }, [selectedCaucion, timeframe]);

  if (data && data.length > 0 && selectedTerm === null) {
    setSelectedTerm(data[0].term);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-4 py-6">
          <Breadcrumb />
          <h1 className="text-xl font-semibold text-text-primary mb-6">
            Cauciones Bursátiles
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de Plazos */}
            <div className="lg:col-span-1">
              <div className="bg-bg-secondary rounded-lg border border-border-primary p-4">
                <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 text-xs text-text-secondary pb-2 mb-2 border-b border-border-primary">
                  <span className="font-medium">Plazo</span>
                  <span className="font-medium text-right">Tasa</span>
                  <span className="font-medium text-right">Volumen</span>
                </div>
                {isLoading || !data ? (
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-14 bg-bg-tertiary animate-pulse rounded" />
                    ))}
                  </div>
                ) : (
                  data.map((caucion, i) => {
                    const prev = previousData?.[i];
                    const isSelected = selectedTerm === caucion.term;
                    return (
                      <button
                        key={caucion.term}
                        onClick={() => setSelectedTerm(caucion.term)}
                        className={cn(
                          "w-full grid grid-cols-[1fr_auto_auto] gap-x-3 items-center py-3 border-b border-border-primary/30 hover:bg-bg-tertiary/50 transition-colors text-left",
                          isSelected && "bg-accent-cyan/10 border-l-2 border-l-accent-cyan"
                        )}
                      >
                        <span className="text-sm text-text-primary font-medium">
                          {formatTerm(caucion.term)}
                        </span>
                        <AnimatedValue
                          value={caucion.rateAvg}
                          previousValue={prev?.rateAvg}
                          format="percent"
                          className="text-sm font-semibold"
                        />
                        <span className="text-xs text-text-muted font-mono">
                          ${(caucion.volume / 1000).toFixed(0)}K
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Gráfico de la Caución seleccionada */}
            <div className="lg:col-span-2">
              {selectedCaucion ? (
                <div className="bg-bg-secondary rounded-lg border border-border-primary p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-sm font-medium text-text-primary">
                        Caución a {formatTerm(selectedCaucion.term)}
                      </h2>
                      <p className="text-xs text-text-muted mt-0.5">
                        Evolución de la tasa promedio
                      </p>
                    </div>
                    <TimeframeSelector value={timeframe} onChange={setTimeframe} />
                  </div>

                  <HistoricalAreaChart
                    data={chartData}
                    height={300}
                    color="#22c55e"
                    gradientId={`caucion-${selectedCaucion.term}`}
                    label="Tasa"
                    formatValue={(v) => `${v.toFixed(2)}%`}
                  />

                  <div className="mt-4 pt-4 border-t border-border-primary">
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <span className="text-[10px] text-text-muted uppercase tracking-wider">
                          Tasa Promedio
                        </span>
                        <p className="text-sm font-mono text-positive">
                          {selectedCaucion.rateAvg.toFixed(2)}%
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted uppercase tracking-wider">
                          Mínima
                        </span>
                        <p className="text-sm font-mono text-text-primary">
                          {selectedCaucion.rateMin.toFixed(2)}%
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted uppercase tracking-wider">
                          Máxima
                        </span>
                        <p className="text-sm font-mono text-text-primary">
                          {selectedCaucion.rateMax.toFixed(2)}%
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-muted uppercase tracking-wider">
                          Volumen
                        </span>
                        <p className="text-sm font-mono text-text-primary">
                          ${selectedCaucion.volume.toLocaleString("es-AR")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-bg-secondary rounded-lg border border-border-primary p-8 flex items-center justify-center h-[400px]">
                  <p className="text-sm text-text-muted">
                    Seleccioná un plazo para ver su evolución
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
