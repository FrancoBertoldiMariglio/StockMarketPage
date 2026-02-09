"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DashboardGrid } from "@/components/layout/DashboardGrid";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <DashboardGrid />
      </main>
      <Footer />
    </div>
  );
}
