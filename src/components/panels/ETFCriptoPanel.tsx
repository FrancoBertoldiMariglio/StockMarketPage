"use client";

import { useETFCriptoData } from "@/hooks/useETFCriptoData";
import { ETFCategoryPanel } from "./ETFCategoryPanel";

export function ETFCriptoPanel() {
  const { data, previousData, isLoading, error, lastUpdated } =
    useETFCriptoData();

  return (
    <ETFCategoryPanel
      title="ETFs Criptomonedas"
      data={data}
      previousData={previousData}
      isLoading={isLoading}
      error={error}
      lastUpdated={lastUpdated}
      labelColumn="Cripto"
      href="/etf/cripto"
    />
  );
}
