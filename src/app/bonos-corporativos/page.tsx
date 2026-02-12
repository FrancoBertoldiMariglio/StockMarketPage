"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackLink } from "@/components/layout/BackLink";
import { BonosCorporativosPanel } from "@/components/panels/BonosCorporativosPanel";
import { useCurrency } from "@/contexts/CurrencyContext";
import { CurrencySelector } from "@/components/ui/CurrencySelector";

export default function BonosCorporativosPage() {
  const { hasSelectedCurrency } = useCurrency();

  return (
    <div className="min-h-screen flex flex-col">
      {!hasSelectedCurrency && <CurrencySelector />}
      <Header />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-4 py-6">
          <BackLink />
          <h1 className="text-xl font-semibold text-text-primary mb-2">
            Bonos Corporativos
          </h1>
          <p className="text-sm text-text-secondary mb-6">
            Los bonos corporativos son instrumentos de deuda emitidos por
            empresas. Ofrecen rendimientos mayores que los bonos soberanos pero
            con mayor riesgo crediticio. El rating indica la calidad crediticia
            del emisor.
          </p>

          <div className="max-w-2xl">
            <BonosCorporativosPanel />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
