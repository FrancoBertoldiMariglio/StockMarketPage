"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export interface AreaChartDataPoint {
  date: string;
  value: number;
}

interface HistoricalAreaChartProps {
  data: AreaChartDataPoint[];
  height?: number;
  color?: string;
  gradientId?: string;
  formatValue?: (value: number) => string;
  formatDate?: (date: string) => string;
  label?: string;
}

const defaultFormatValue = (value: number) =>
  value.toLocaleString("es-AR", { maximumFractionDigits: 0 });

const defaultFormatDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString("es-AR", { day: "2-digit", month: "short" });
};

export function HistoricalAreaChart({
  data,
  height = 250,
  color = "#06b6d4",
  gradientId = "area-gradient",
  formatValue = defaultFormatValue,
  formatDate = defaultFormatDate,
  label = "Valor",
}: HistoricalAreaChartProps) {
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
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
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
          labelFormatter={(labelValue) => {
            const d = new Date(labelValue);
            return d.toLocaleDateString("es-AR", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            });
          }}
          formatter={(value) => [formatValue(Number(value)), label]}
        />
        <Area
          type="monotone"
          dataKey="value"
          name={label}
          stroke={color}
          strokeWidth={2}
          fill={`url(#${gradientId})`}
          isAnimationActive={true}
          animationDuration={500}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
