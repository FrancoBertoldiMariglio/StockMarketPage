"use client";

import { useETFPaisesData } from "@/hooks/useETFPaisesData";
import { ETFCategoryPanel } from "./ETFCategoryPanel";

export function ETFPaisesPanel() {
  const { data, previousData, isLoading, error, lastUpdated } =
    useETFPaisesData();

  return (
    <ETFCategoryPanel
      title="ETFs Países"
      data={data}
      previousData={previousData}
      isLoading={isLoading}
      error={error}
      lastUpdated={lastUpdated}
      labelColumn="País"
      href="/etf/paises"
    />
  );
}
