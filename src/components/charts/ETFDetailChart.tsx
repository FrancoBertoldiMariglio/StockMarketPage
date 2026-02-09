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

interface ETFDetailChartProps {
  data: { date: string; close: number }[];
  ticker: string;
}

export function ETFDetailChart({ data, ticker }: ETFDetailChartProps) {
  return (
    <div className="mt-2 overflow-hidden transition-all duration-300">
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`etf-grad-${ticker}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e1e3a" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "#55556a" }}
            tickFormatter={(v: string) => v.slice(5)}
            stroke="#1e1e3a"
          />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fontSize: 10, fill: "#55556a" }}
            stroke="#1e1e3a"
            width={50}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#12121a",
              border: "1px solid #1e1e3a",
              borderRadius: 6,
              fontSize: 12,
            }}
            labelStyle={{ color: "#8888a8" }}
            itemStyle={{ color: "#e8e8f0" }}
          />
          <Area
            type="monotone"
            dataKey="close"
            stroke="#3b82f6"
            strokeWidth={2}
            fill={`url(#etf-grad-${ticker})`}
            isAnimationActive={true}
            animationDuration={500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
