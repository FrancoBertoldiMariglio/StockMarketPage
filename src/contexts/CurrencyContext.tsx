"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Currency = "ARS" | "USD";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  hasSelectedCurrency: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

const STORAGE_KEY = "preferred_currency";

interface CurrencyProviderProps {
  children: ReactNode;
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [currency, setCurrencyState] = useState<Currency>("ARS");
  const [hasSelectedCurrency, setHasSelectedCurrency] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "ARS" || stored === "USD") {
      setCurrencyState(stored);
      setHasSelectedCurrency(true);
    }
    setIsHydrated(true);
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    setHasSelectedCurrency(true);
    localStorage.setItem(STORAGE_KEY, newCurrency);
  };

  if (!isHydrated) {
    return null;
  }

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, hasSelectedCurrency }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextType {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
