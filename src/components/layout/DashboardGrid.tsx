"use client";

import { DolarPanel } from "@/components/panels/DolarPanel";
import { RiesgoPaisPanel } from "@/components/panels/RiesgoPaisPanel";
import { ETFPaisesPanel } from "@/components/panels/ETFPaisesPanel";
import { ETFMetalesPanel } from "@/components/panels/ETFMetalesPanel";
import { ETFCriptoPanel } from "@/components/panels/ETFCriptoPanel";
import { BonosCorporativosPanel } from "@/components/panels/BonosCorporativosPanel";
import { LetraBonosPanel } from "@/components/panels/LetraBonosPanel";
import { CaucionPanel } from "@/components/panels/CaucionPanel";
import { useCurrency } from "@/contexts/CurrencyContext";

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 mt-4 first:mt-0">
      {title}
    </h2>
  );
}

export function DashboardGrid() {
  const { currency } = useCurrency();

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-4">
      {/* Currency indicator */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs text-text-muted">
          Mostrando precios en{" "}
          <span className="font-semibold text-text-secondary">
            {currency === "ARS" ? "Pesos Argentinos (ARS)" : "Dólares (USD)"}
          </span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {/* Column 1: Información General */}
        <div className="space-y-3 order-1">
          <SectionHeader title="Información General" />
          <DolarPanel />
          <RiesgoPaisPanel />
        </div>

        {/* Column 2: Instrumentos de Inversión - ETFs */}
        <div className="space-y-3 order-2">
          <SectionHeader title="Instrumentos de Inversión" />
          <ETFPaisesPanel />
          <ETFMetalesPanel />
          <ETFCriptoPanel />
        </div>

        {/* Column 3: Instrumentos de Inversión - Renta Fija y Financiamiento */}
        <div className="space-y-3 order-3">
          <SectionHeader title="Renta Fija y Financiamiento" />
          <BonosCorporativosPanel />
          <LetraBonosPanel />
          <CaucionPanel />
        </div>
      </div>
    </div>
  );
}
