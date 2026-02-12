"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export interface ChartDataPoint {
  date: string;
  [key: string]: string | number;
}

export interface ChartSeries {
  dataKey: string;
  name: string;
  color: string;
}

interface HistoricalLineChartProps {
  data: ChartDataPoint[];
  series: ChartSeries[];
  height?: number;
  showLegend?: boolean;
  formatValue?: (value: number) => string;
  formatDate?: (date: string) => string;
}

const defaultFormatValue = (value: number) =>
  value.toLocaleString("es-AR", { maximumFractionDigits: 2 });

const defaultFormatDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString("es-AR", { day: "2-digit", month: "short" });
};

export function HistoricalLineChart({
  data,
  series,
  height = 250,
  showLegend = false,
  formatValue = defaultFormatValue,
  formatDate = defaultFormatDate,
}: HistoricalLineChartProps) {
  if (!data || data.length === 0) {
    return (
      <div
        className="flex items-center justify-center bg-bg-tertiary/30 rounded-lg"
        style={{ height }}
      >
        <span className="text-sm text-text-muted">Sin datos disponibles</span>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e1e3a" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 10, fill: "#55556a" }}
          tickFormatter={formatDate}
          stroke="#1e1e3a"
        />
        <YAxis
          domain={["auto", "auto"]}
          tick={{ fontSize: 10, fill: "#55556a" }}
          stroke="#1e1e3a"
          width={60}
          tickFormatter={(v) => formatValue(v)}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#12121a",
            border: "1px solid #1e1e3a",
            borderRadius: 6,
            fontSize: 12,
          }}
          labelStyle={{ color: "#8888a8", marginBottom: 4 }}
          labelFormatter={(label) => {
            const d = new Date(label);
            return d.toLocaleDateString("es-AR", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            });
          }}
          formatter={(value) => [
            formatValue(Number(value)),
            "",
          ]}
        />
        {showLegend && (
          <Legend
            wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
            iconType="line"
          />
        )}
        {series.map((s) => (
          <Line
            key={s.dataKey}
            type="monotone"
            dataKey={s.dataKey}
            name={s.name}
            stroke={s.color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 0 }}
            isAnimationActive={true}
            animationDuration={500}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
