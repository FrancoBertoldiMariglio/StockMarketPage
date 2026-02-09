import { ETFQuote } from "@/types/market";

function generateHistory(basePrice: number): { date: string; close: number }[] {
  const now = new Date();
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (29 - i));
    return {
      date: d.toISOString().split("T")[0],
      close: Math.round((basePrice + (Math.random() * basePrice * 0.06 - basePrice * 0.03)) * 100) / 100,
    };
  });
}

export const mockETFData: ETFQuote[] = [
  { ticker: "SPY", name: "SPDR S&P 500", country: "EEUU", countryFlag: "\u{1F1FA}\u{1F1F8}", price: 605.3, variation: 0.45, variationAbs: 2.71, history: generateHistory(605.3), timestamp: new Date().toISOString() },
  { ticker: "EWZ", name: "iShares MSCI Brazil", country: "Brasil", countryFlag: "\u{1F1E7}\u{1F1F7}", price: 28.15, variation: -1.2, variationAbs: -0.34, history: generateHistory(28.15), timestamp: new Date().toISOString() },
  { ticker: "FXI", name: "iShares China Large-Cap", country: "China", countryFlag: "\u{1F1E8}\u{1F1F3}", price: 31.8, variation: 0.68, variationAbs: 0.22, history: generateHistory(31.8), timestamp: new Date().toISOString() },
  { ticker: "EWW", name: "iShares MSCI Mexico", country: "M\u00e9xico", countryFlag: "\u{1F1F2}\u{1F1FD}", price: 52.4, variation: 0.15, variationAbs: 0.08, history: generateHistory(52.4), timestamp: new Date().toISOString() },
  { ticker: "INDA", name: "iShares MSCI India", country: "India", countryFlag: "\u{1F1EE}\u{1F1F3}", price: 54.9, variation: -0.3, variationAbs: -0.16, history: generateHistory(54.9), timestamp: new Date().toISOString() },
  { ticker: "VEA", name: "Vanguard FTSE Developed", country: "Desarrollados", countryFlag: "\u{1F30D}", price: 50.2, variation: 0.22, variationAbs: 0.11, history: generateHistory(50.2), timestamp: new Date().toISOString() },
];

function varyPrice(price: number): number {
  const change = price * (Math.random() * 0.006 - 0.003);
  return Math.round((price + change) * 100) / 100;
}

export function simulateETFVariation(data: ETFQuote[]): ETFQuote[] {
  const now = new Date().toISOString();
  return data.map((etf) => {
    const newPrice = varyPrice(etf.price);
    const diff = Math.round((newPrice - etf.price) * 100) / 100;
    return {
      ...etf,
      price: newPrice,
      variation: Math.round((Math.random() * 2 - 1) * 100) / 100,
      variationAbs: diff,
      timestamp: now,
    };
  });
}
