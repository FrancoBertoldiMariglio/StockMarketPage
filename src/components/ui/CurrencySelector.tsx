"use client";

import { useCurrency, Currency } from "@/contexts/CurrencyContext";
import { DollarSign, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";

interface CurrencySelectorProps {
  onSelect?: () => void;
}

export function CurrencySelector({ onSelect }: CurrencySelectorProps) {
  const { setCurrency } = useCurrency();

  const handleSelect = (currency: Currency) => {
    setCurrency(currency);
    onSelect?.();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-primary/95 backdrop-blur-sm">
      <div className="max-w-lg w-full mx-4 p-6 bg-bg-secondary rounded-xl border border-border-primary shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Bienvenido al Panel Financiero
          </h2>
          <p className="text-sm text-text-secondary">
            Seleccioná la moneda en la que tenés tus fondos para invertir.
            <br />
            <span className="text-text-muted text-xs">
              Podés cambiar esta opción en cualquier momento.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleSelect("ARS")}
            className={cn(
              "group relative p-5 rounded-lg border-2 transition-all duration-200",
              "border-border-primary hover:border-accent-blue hover:bg-accent-blue/5",
              "focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-bg-secondary"
            )}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-accent-blue/10 flex items-center justify-center group-hover:bg-accent-blue/20 transition-colors">
                <Banknote className="w-7 h-7 text-accent-blue" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary text-lg">
                  Pesos
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Tengo ARS para invertir
                </p>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-3 text-center">
              <span className="text-[10px] text-text-muted bg-bg-tertiary px-2 py-0.5 rounded">
                Precios en ARS
              </span>
            </div>
          </button>

          <button
            onClick={() => handleSelect("USD")}
            className={cn(
              "group relative p-5 rounded-lg border-2 transition-all duration-200",
              "border-border-primary hover:border-accent-green hover:bg-accent-green/5",
              "focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 focus:ring-offset-bg-secondary"
            )}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-accent-green/10 flex items-center justify-center group-hover:bg-accent-green/20 transition-colors">
                <DollarSign className="w-7 h-7 text-accent-green" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary text-lg">
                  Dólares
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Tengo USD para invertir
                </p>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-3 text-center">
              <span className="text-[10px] text-text-muted bg-bg-tertiary px-2 py-0.5 rounded">
                Precios en USD
              </span>
            </div>
          </button>
        </div>

        <p className="text-center text-[11px] text-text-muted mt-5">
          En Argentina, los mismos instrumentos se pueden comprar en pesos o
          dólares. Esta selección ajustará los precios mostrados.
        </p>
      </div>
    </div>
  );
}
