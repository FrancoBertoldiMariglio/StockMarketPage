"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DashboardGrid } from "@/components/layout/DashboardGrid";
import { CurrencySelector } from "@/components/ui/CurrencySelector";
import { useCurrency } from "@/contexts/CurrencyContext";

export default function Home() {
  const { hasSelectedCurrency } = useCurrency();

  return (
    <div className="min-h-screen flex flex-col">
      {!hasSelectedCurrency && <CurrencySelector />}
      <Header />
      <main className="flex-1">
        <DashboardGrid />
      </main>
      <Footer />
    </div>
  );
}
