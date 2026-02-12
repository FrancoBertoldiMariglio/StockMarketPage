import type { Metadata } from "next";
import "./globals.css";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { DashboardProvider } from "@/contexts/DashboardContext";
import { MainLayout } from "@/components/layout/MainLayout";

export const metadata: Metadata = {
  title: "Panel Financiero — Mercado Argentino",
  description:
    "Dashboard informativo con datos del mercado financiero argentino: dólar, bonos, ETFs, cauciones y más.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <CurrencyProvider>
          <SidebarProvider>
            <DashboardProvider>
              <MainLayout>{children}</MainLayout>
            </DashboardProvider>
          </SidebarProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
