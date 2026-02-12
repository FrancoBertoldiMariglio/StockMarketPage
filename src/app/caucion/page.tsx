"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackLink } from "@/components/layout/BackLink";
import { CaucionPanel } from "@/components/panels/CaucionPanel";
import { useCurrency } from "@/contexts/CurrencyContext";
import { CurrencySelector } from "@/components/ui/CurrencySelector";

export default function CaucionPage() {
  const { hasSelectedCurrency } = useCurrency();

  return (
    <div className="min-h-screen flex flex-col">
      {!hasSelectedCurrency && <CurrencySelector />}
      <Header />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-4 py-6">
          <BackLink />
          <h1 className="text-xl font-semibold text-text-primary mb-2">
            Cauciones Bursátiles
          </h1>
          <p className="text-sm text-text-secondary mb-6">
            Las cauciones son préstamos de corto plazo garantizados con títulos
            valores. Funcionan como un plazo fijo pero con mejor tasa. El
            colocador presta dinero y recibe intereses. El tomador obtiene
            liquidez sin vender sus activos.
          </p>

          <div className="max-w-md">
            <CaucionPanel />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
