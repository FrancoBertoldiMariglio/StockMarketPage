"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackLink } from "@/components/layout/BackLink";
import { ETFMetalesPanel } from "@/components/panels/ETFMetalesPanel";
import { useCurrency } from "@/contexts/CurrencyContext";
import { CurrencySelector } from "@/components/ui/CurrencySelector";

export default function ETFMetalesPage() {
  const { hasSelectedCurrency } = useCurrency();

  return (
    <div className="min-h-screen flex flex-col">
      {!hasSelectedCurrency && <CurrencySelector />}
      <Header />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-4 py-6">
          <BackLink />
          <h1 className="text-xl font-semibold text-text-primary mb-2">
            ETFs de Metales
          </h1>
          <p className="text-sm text-text-secondary mb-6">
            Los ETFs de metales te permiten invertir en commodities como oro,
            plata y cobre sin necesidad de poseer el metal físico. Son una forma
            de protección contra la inflación y diversificación de cartera.
          </p>

          <div className="max-w-lg">
            <ETFMetalesPanel />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
