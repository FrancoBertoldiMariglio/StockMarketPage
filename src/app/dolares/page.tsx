"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackLink } from "@/components/layout/BackLink";
import { DolarPanel } from "@/components/panels/DolarPanel";
import { useCurrency } from "@/contexts/CurrencyContext";
import { CurrencySelector } from "@/components/ui/CurrencySelector";

export default function DolaresPage() {
  const { hasSelectedCurrency } = useCurrency();

  return (
    <div className="min-h-screen flex flex-col">
      {!hasSelectedCurrency && <CurrencySelector />}
      <Header />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-4 py-6">
          <BackLink />
          <h1 className="text-xl font-semibold text-text-primary mb-2">
            Tipos de Dólar
          </h1>
          <p className="text-sm text-text-secondary mb-6">
            Cotizaciones de los diferentes tipos de dólar en Argentina. El dólar
            oficial es el tipo de cambio regulado por el BCRA. El dólar blue es
            el mercado paralelo. El MEP y CCL son tipos de cambio obtenidos
            mediante operaciones bursátiles.
          </p>

          <div className="max-w-md">
            <DolarPanel />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
