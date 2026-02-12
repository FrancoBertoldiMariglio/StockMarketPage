"use client";

import { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfoTooltipProps {
  title: string;
  content: string;
  className?: string;
}

export function InfoTooltip({ title, content, className }: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className={cn("relative inline-flex", className)}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-4 h-4 rounded-full flex items-center justify-center transition-colors",
          isOpen
            ? "bg-accent-blue text-white"
            : "bg-bg-tertiary text-text-muted hover:bg-accent-blue/20 hover:text-accent-blue"
        )}
        aria-label={`Información sobre ${title}`}
      >
        <Info className="w-3 h-3" />
      </button>

      {isOpen && (
        <div
          ref={tooltipRef}
          className="absolute z-50 left-0 top-full mt-2 w-64 p-3 bg-bg-secondary border border-border-primary rounded-lg shadow-lg"
        >
          <h4 className="text-xs font-semibold text-accent-blue mb-1.5">
            {title}
          </h4>
          <p className="text-[11px] text-text-secondary leading-relaxed">
            {content}
          </p>
          <div className="absolute -top-1.5 left-2 w-3 h-3 bg-bg-secondary border-l border-t border-border-primary rotate-45" />
        </div>
      )}
    </div>
  );
}

// Pre-defined tooltips for common financial concepts
export const financialConcepts = {
  etf: {
    title: "¿Qué es un ETF?",
    content:
      "Un ETF (Exchange Traded Fund) es un fondo de inversión que cotiza en bolsa como una acción. Permite invertir en un conjunto diversificado de activos con una sola compra, con costos más bajos que los fondos tradicionales.",
  },
  bonoCorporativo: {
    title: "¿Qué es un Bono Corporativo?",
    content:
      "Es un instrumento de deuda emitido por empresas privadas. Al comprar un bono, le prestás dinero a la empresa a cambio de un interés (cupón) y la devolución del capital en una fecha futura.",
  },
  letra: {
    title: "¿Qué es una Letra?",
    content:
      "Las Letras del Tesoro son instrumentos de deuda de corto plazo (menos de 1 año) emitidos por el gobierno. Se compran con descuento y al vencimiento se cobra el valor nominal completo.",
  },
  bono: {
    title: "¿Qué es un Bono Soberano?",
    content:
      "Es un instrumento de deuda emitido por el Estado Nacional. Paga intereses periódicos (cupón) y devuelve el capital al vencimiento. Puede estar bajo ley argentina o extranjera (NY).",
  },
  caucion: {
    title: "¿Qué es una Caución?",
    content:
      "Es un préstamo de corto plazo garantizado con títulos valores. El colocador presta dinero y recibe un interés. El tomador obtiene liquidez sin vender sus activos. Es como un plazo fijo pero con mejor tasa.",
  },
  riesgoPais: {
    title: "¿Qué es el Riesgo País?",
    content:
      "Es la diferencia entre la tasa de los bonos argentinos y los bonos del Tesoro de EEUU. Mide cuánto más rinde invertir en Argentina vs. EEUU. A mayor riesgo país, mayor es el costo de financiamiento del país.",
  },
  paridad: {
    title: "¿Qué es la Paridad?",
    content:
      "Es el precio del bono expresado como porcentaje de su valor nominal. Una paridad del 50% significa que el bono cotiza a la mitad de su valor de emisión.",
  },
  tir: {
    title: "¿Qué es la TIR?",
    content:
      "La Tasa Interna de Retorno representa el rendimiento anual que obtendrías si mantuvieras el bono hasta su vencimiento, considerando el precio actual, los cupones y la amortización.",
  },
  duration: {
    title: "¿Qué es la Duration?",
    content:
      "Es una medida de sensibilidad del precio del bono ante cambios en las tasas de interés. A mayor duration, más volátil es el precio del bono frente a movimientos de tasa.",
  },
};
