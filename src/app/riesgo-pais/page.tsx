"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackLink } from "@/components/layout/BackLink";
import { RiesgoPaisPanel } from "@/components/panels/RiesgoPaisPanel";
import { useCurrency } from "@/contexts/CurrencyContext";
import { CurrencySelector } from "@/components/ui/CurrencySelector";

export default function RiesgoPaisPage() {
  const { hasSelectedCurrency } = useCurrency();

  return (
    <div className="min-h-screen flex flex-col">
      {!hasSelectedCurrency && <CurrencySelector />}
      <Header />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-4 py-6">
          <BackLink />
          <h1 className="text-xl font-semibold text-text-primary mb-2">
            Riesgo País
          </h1>
          <p className="text-sm text-text-secondary mb-6">
            El Riesgo País mide la diferencia de rendimiento entre los bonos
            argentinos y los bonos del Tesoro de Estados Unidos. Un valor más
            alto indica mayor percepción de riesgo y mayores costos de
            financiamiento para el país.
          </p>

          <div className="max-w-md">
            <RiesgoPaisPanel />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
