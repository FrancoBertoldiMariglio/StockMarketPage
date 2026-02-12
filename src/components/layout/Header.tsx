"use client";

import { TrendingUp, Activity, Clock, BarChart3 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CurrencyToggle } from "@/components/ui/CurrencyToggle";
import { MobileMenuButton } from "./Sidebar";

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

export function Header() {
  const [showSpecs, setShowSpecs] = useState(false);

  return (
    <header className="border-b border-border-primary bg-bg-secondary/80 backdrop-blur-sm sticky top-0 z-40">
      {/* Top bar: Mobile menu + Logo + Currency toggle */}
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <MobileMenuButton />

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent-cyan" />
            </div>
            <div>
              <h1 className="font-semibold text-text-primary text-sm leading-tight">
                Panel Financiero
              </h1>
              <span className="text-[11px] text-text-muted">Argentina</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CurrencyToggle />
          <button
            onClick={() => setShowSpecs((v) => !v)}
            className={cn(
              "hidden sm:block text-[11px] px-2.5 py-1.5 rounded-md border transition-colors",
              showSpecs
                ? "bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan"
                : "border-border-primary text-text-secondary hover:border-border-hover hover:text-text-primary"
            )}
          >
            Especificaciones
          </button>
        </div>
      </div>

      {/* Especificaciones expandable */}
      {showSpecs && (
        <div className="max-w-[1400px] mx-auto px-4 border-t border-border-primary/60">
          <EspecificacionesContent />
        </div>
      )}
    </header>
  );
}
