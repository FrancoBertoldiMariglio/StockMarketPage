"use client";

import { ResponsiveContainer, AreaChart, Area } from "recharts";

interface MiniChartProps {
  data: number[];
  color?: string;
  height?: number;
}

export function MiniChart({
  data,
  color = "#3b82f6",
  height = 40,
}: MiniChartProps) {
  const chartData = data.map((value, index) => ({ index, value }));
  const isPositive = data.length > 1 && data[data.length - 1] >= data[0];
  const lineColor = isPositive ? "#22c55e" : "#ef4444";

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={chartData}>
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={lineColor} stopOpacity={0.3} />
            <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={lineColor}
          strokeWidth={1.5}
          fill={`url(#gradient-${color})`}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
