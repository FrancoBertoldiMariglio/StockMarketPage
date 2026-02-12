"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackLink } from "@/components/layout/BackLink";
import { ETFCriptoPanel } from "@/components/panels/ETFCriptoPanel";
import { useCurrency } from "@/contexts/CurrencyContext";
import { CurrencySelector } from "@/components/ui/CurrencySelector";

export default function ETFCriptoPage() {
  const { hasSelectedCurrency } = useCurrency();

  return (
    <div className="min-h-screen flex flex-col">
      {!hasSelectedCurrency && <CurrencySelector />}
      <Header />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-4 py-6">
          <BackLink />
          <h1 className="text-xl font-semibold text-text-primary mb-2">
            ETFs de Criptomonedas
          </h1>
          <p className="text-sm text-text-secondary mb-6">
            Los ETFs de criptomonedas ofrecen exposición a Bitcoin, Ethereum y
            otras criptomonedas a través de instrumentos regulados. Permiten
            invertir en cripto sin necesidad de gestionar wallets o exchanges.
          </p>

          <div className="max-w-lg">
            <ETFCriptoPanel />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
