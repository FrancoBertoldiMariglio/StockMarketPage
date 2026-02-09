"use client";

import { Activity, TrendingUp, Clock, BarChart3 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

function EspecificacionesContent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 py-3">
      <div className="flex items-start gap-2">
        <Clock className="w-4 h-4 text-accent-cyan mt-0.5 shrink-0" />
        <div>
          <h4 className="text-xs font-medium text-text-primary">
            Actualizaci&oacute;n
          </h4>
          <p className="text-[11px] text-text-secondary leading-relaxed">
            Datos actualizados cada 3 segundos mediante polling autom&aacute;tico
          </p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <BarChart3 className="w-4 h-4 text-accent-cyan mt-0.5 shrink-0" />
        <div>
          <h4 className="text-xs font-medium text-text-primary">Mercados</h4>
          <p className="text-[11px] text-text-secondary leading-relaxed">
            BYMA, MAV, ROFEX &mdash; D&oacute;lar, bonos, ETFs, cauciones y cheques
          </p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <TrendingUp className="w-4 h-4 text-accent-cyan mt-0.5 shrink-0" />
        <div>
          <h4 className="text-xs font-medium text-text-primary">Indicadores</h4>
          <p className="text-[11px] text-text-secondary leading-relaxed">
            Riesgo pa&iacute;s, metales, criptomonedas y tasas de referencia
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
            Los valores parpadean en verde o rojo al detectar variaciones de precio
          </p>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [showSpecs, setShowSpecs] = useState(false);

  return (
    <header className="border-b border-border-primary bg-bg-secondary/80 backdrop-blur-sm sticky top-0 z-50">
      {/* Top bar: Logo + name */}
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
            Panel Informativo &mdash; Mercado Argentino
          </span>
        </div>
      </div>
    </header>
  );
}
