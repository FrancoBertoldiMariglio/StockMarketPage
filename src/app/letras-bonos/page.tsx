"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackLink } from "@/components/layout/BackLink";
import { LetraBonosPanel } from "@/components/panels/LetraBonosPanel";
import { useCurrency } from "@/contexts/CurrencyContext";
import { CurrencySelector } from "@/components/ui/CurrencySelector";

export default function LetraBonosPage() {
  const { hasSelectedCurrency } = useCurrency();

  return (
    <div className="min-h-screen flex flex-col">
      {!hasSelectedCurrency && <CurrencySelector />}
      <Header />
      <main className="flex-1">
        <div className="max-w-[1400px] mx-auto px-4 py-6">
          <BackLink />
          <h1 className="text-xl font-semibold text-text-primary mb-2">
            Letras y Bonos Soberanos
          </h1>
          <p className="text-sm text-text-secondary mb-6">
            Los bonos soberanos son instrumentos de deuda emitidos por el Estado
            Nacional. Las letras (LECAPs) son de corto plazo y se compran con
            descuento. Los bonos pagan cupones periódicos. La ley bajo la cual
            están emitidos (ARG o NY) afecta los derechos de los inversores.
          </p>

          <div className="max-w-2xl">
            <LetraBonosPanel />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
