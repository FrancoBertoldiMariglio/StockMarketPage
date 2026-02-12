"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackLink } from "@/components/layout/BackLink";
import { ETFPaisesPanel } from "@/components/panels/ETFPaisesPanel";
import { useCurrency } from "@/contexts/CurrencyContext";
import { CurrencySelector } from "@/components/ui/CurrencySelector";

export default function ETFPaisesPage() {
  const { hasSelectedCurrency } = useCurrency();

  return (
    <div className="min-h-screen flex flex-col">
      {!hasSelectedCurrency && <CurrencySelector />}
      <Header />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-4 py-6">
          <BackLink />
          <h1 className="text-xl font-semibold text-text-primary mb-2">
            ETFs de Países
          </h1>
          <p className="text-sm text-text-secondary mb-6">
            Los ETFs de países permiten invertir en la economía de un país
            específico con una sola operación. Replican índices bursátiles
            locales y ofrecen diversificación geográfica a tu cartera.
          </p>

          <div className="max-w-lg">
            <ETFPaisesPanel />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
