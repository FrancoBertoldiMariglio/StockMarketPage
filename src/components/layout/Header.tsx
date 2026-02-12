"use client";

import {
  Activity,
  TrendingUp,
  Clock,
  BarChart3,
  DollarSign,
  Banknote,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/contexts/CurrencyContext";

function EspecificacionesContent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 py-3">
      <div className="flex items-start gap-2">
        <Clock className="w-4 h-4 text-accent-cyan mt-0.5 shrink-0" />
        <div>
          <h4 className="text-xs font-medium text-text-primary">
            Actualización
          </h4>
          <p className="text-[11px] text-text-secondary leading-relaxed">
            Datos actualizados cada 20 minutos mediante polling automático
          </p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <BarChart3 className="w-4 h-4 text-accent-cyan mt-0.5 shrink-0" />
        <div>
          <h4 className="text-xs font-medium text-text-primary">Mercados</h4>
          <p className="text-[11px] text-text-secondary leading-relaxed">
            BYMA, MAV, ROFEX — Dólar, bonos, ETFs, cauciones y cheques
          </p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <TrendingUp className="w-4 h-4 text-accent-cyan mt-0.5 shrink-0" />
        <div>
          <h4 className="text-xs font-medium text-text-primary">Indicadores</h4>
          <p className="text-[11px] text-text-secondary leading-relaxed">
            Riesgo país, metales, criptomonedas y tasas de referencia
          </p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <Activity className="w-4 h-4 text-accent-cyan mt-0.5 shrink-0" />
        <div>
          <h4 className="text-xs font-medium text-text-primary">
            Flash en vivo
          </h4>
          <p className="text-[11px] text-text-secondary leading-relaxed">
            Los valores parpadean en verde o rojo al detectar variaciones de
            precio
          </p>
        </div>
      </div>
    </div>
  );
}

function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center gap-1 bg-bg-tertiary rounded-lg p-0.5">
      <button
        onClick={() => setCurrency("ARS")}
        className={cn(
          "flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-colors",
          currency === "ARS"
            ? "bg-accent-blue text-white"
            : "text-text-muted hover:text-text-secondary"
        )}
      >
        <Banknote className="w-3 h-3" />
        ARS
      </button>
      <button
        onClick={() => setCurrency("USD")}
        className={cn(
          "flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-colors",
          currency === "USD"
            ? "bg-accent-green text-white"
            : "text-text-muted hover:text-text-secondary"
        )}
      >
        <DollarSign className="w-3 h-3" />
        USD
      </button>
    </div>
  );
}

const navItems = [
  {
    section: "Info General",
    items: ["Dólares", "Riesgo País"],
  },
  {
    section: "Instrumentos",
    items: ["ETFs Países", "ETFs Metales", "ETFs Cripto"],
  },
  {
    section: "Renta Fija",
    items: ["Bonos Corp.", "Letras y Bonos", "Caución"],
  },
];

export function Header() {
  const [showSpecs, setShowSpecs] = useState(false);

  return (
    <header className="border-b border-border-primary bg-bg-secondary/80 backdrop-blur-sm sticky top-0 z-50">
      {/* Top bar: Logo + name + currency toggle */}
      <div className="max-w-[1400px] mx-auto px-4 pt-3 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo placeholder */}
          <div className="w-9 h-9 rounded-lg bg-accent-blue/10 border border-accent-blue/30 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-accent-blue" />
          </div>
          <div>
            <h1 className="font-semibold text-text-primary text-sm leading-tight">
              Panel Financiero
            </h1>
            <span className="text-[11px] text-text-muted">Argentina</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CurrencyToggle />
          <button
            onClick={() => setShowSpecs((v) => !v)}
            className={cn(
              "text-[11px] px-2.5 py-1 rounded-md border transition-colors",
              showSpecs
                ? "bg-accent-blue/10 border-accent-blue/30 text-accent-blue"
                : "border-border-primary text-text-secondary hover:border-border-hover hover:text-text-primary"
            )}
          >
            Especificaciones
          </button>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="max-w-[1400px] mx-auto px-4 border-t border-border-primary/60">
        <nav className="flex items-center gap-6 py-2 overflow-x-auto">
          {navItems.map((group) => (
            <div key={group.section} className="flex items-center gap-2">
              <span className="text-[10px] text-text-muted uppercase tracking-wider">
                {group.section}:
              </span>
              <div className="flex items-center gap-1">
                {group.items.map((item) => (
                  <button
                    key={item}
                    className="text-[11px] px-2 py-0.5 rounded text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors whitespace-nowrap"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Especificaciones expandable */}
      {showSpecs && (
        <div className="max-w-[1400px] mx-auto px-4 border-t border-border-primary/60">
          <EspecificacionesContent />
        </div>
      )}

      {/* Subtitle bar */}
      <div className="bg-bg-tertiary/40 border-t border-border-primary/60">
        <div className="max-w-[1400px] mx-auto px-4 py-1.5 flex items-center justify-center">
          <span className="text-xs text-text-secondary font-medium tracking-wide">
            Panel Informativo — Mercado Argentino
          </span>
        </div>
      </div>
    </header>
  );
}
