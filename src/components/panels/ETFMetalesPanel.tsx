"use client";

import { useETFMetalesData } from "@/hooks/useETFMetalesData";
import { ETFCategoryPanel } from "./ETFCategoryPanel";

export function ETFMetalesPanel() {
  const { data, previousData, isLoading, error, lastUpdated } =
    useETFMetalesData();

  return (
    <ETFCategoryPanel
      title="ETFs Metales"
      data={data}
      previousData={previousData}
      isLoading={isLoading}
      error={error}
      lastUpdated={lastUpdated}
      labelColumn="Metal"
      href="/etf/metales"
    />
  );
}
