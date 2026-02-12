import { ETFQuote, ETFCategory } from "@/types/market";

function generateHistory(basePrice: number): { date: string; close: number }[] {
  const now = new Date();
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (29 - i));
    return {
      date: d.toISOString().split("T")[0],
      close:
        Math.round(
          (basePrice + (Math.random() * basePrice * 0.06 - basePrice * 0.03)) *
            100
        ) / 100,
    };
  });
}

// Conversion rate for ARS prices (mock - would come from API)
const USD_TO_ARS = 1050;

// ETFs Países
export const mockETFPaisesData: ETFQuote[] = [
  {
    ticker: "SPY",
    name: "SPDR S&P 500",
    country: "EEUU",
    countryFlag: "🇺🇸",
    category: "paises",
    price: 605.3,
    priceARS: 605.3 * USD_TO_ARS,
    variation: 0.45,
    variationAbs: 2.71,
    history: generateHistory(605.3),
    timestamp: new Date().toISOString(),
  },
  {
    ticker: "EWZ",
    name: "iShares MSCI Brazil",
    country: "Brasil",
    countryFlag: "🇧🇷",
    category: "paises",
    price: 28.15,
    priceARS: 28.15 * USD_TO_ARS,
    variation: -1.2,
    variationAbs: -0.34,
    history: generateHistory(28.15),
    timestamp: new Date().toISOString(),
  },
  {
    ticker: "FXI",
    name: "iShares China Large-Cap",
    country: "China",
    countryFlag: "🇨🇳",
    category: "paises",
    price: 31.8,
    priceARS: 31.8 * USD_TO_ARS,
    variation: 0.68,
    variationAbs: 0.22,
    history: generateHistory(31.8),
    timestamp: new Date().toISOString(),
  },
  {
    ticker: "EWW",
    name: "iShares MSCI Mexico",
    country: "México",
    countryFlag: "🇲🇽",
    category: "paises",
    price: 52.4,
    priceARS: 52.4 * USD_TO_ARS,
    variation: 0.15,
    variationAbs: 0.08,
    history: generateHistory(52.4),
    timestamp: new Date().toISOString(),
  },
  {
    ticker: "INDA",
    name: "iShares MSCI India",
    country: "India",
    countryFlag: "🇮🇳",
    category: "paises",
    price: 54.9,
    priceARS: 54.9 * USD_TO_ARS,
    variation: -0.3,
    variationAbs: -0.16,
    history: generateHistory(54.9),
    timestamp: new Date().toISOString(),
  },
  {
    ticker: "VEA",
    name: "Vanguard FTSE Developed",
    country: "Desarrollados",
    countryFlag: "🌍",
    category: "paises",
    price: 50.2,
    priceARS: 50.2 * USD_TO_ARS,
    variation: 0.22,
    variationAbs: 0.11,
    history: generateHistory(50.2),
    timestamp: new Date().toISOString(),
  },
];

// ETFs Metales
export const mockETFMetalesData: ETFQuote[] = [
  {
    ticker: "GLD",
    name: "SPDR Gold Shares",
    country: "Oro",
    countryFlag: "🥇",
    category: "metales",
    price: 247.8,
    priceARS: 247.8 * USD_TO_ARS,
    variation: 0.32,
    variationAbs: 0.79,
    history: generateHistory(247.8),
    timestamp: new Date().toISOString(),
  },
  {
    ticker: "SLV",
    name: "iShares Silver Trust",
    country: "Plata",
    countryFlag: "🥈",
    category: "metales",
    price: 28.45,
    priceARS: 28.45 * USD_TO_ARS,
    variation: -0.18,
    variationAbs: -0.05,
    history: generateHistory(28.45),
    timestamp: new Date().toISOString(),
  },
  {
    ticker: "COPX",
    name: "Global X Copper Miners",
    country: "Cobre",
    countryFlag: "🔶",
    category: "metales",
    price: 42.3,
    priceARS: 42.3 * USD_TO_ARS,
    variation: 0.55,
    variationAbs: 0.23,
    history: generateHistory(42.3),
    timestamp: new Date().toISOString(),
  },
  {
    ticker: "PPLT",
    name: "abrdn Platinum ETF",
    country: "Platino",
    countryFlag: "⬜",
    category: "metales",
    price: 89.2,
    priceARS: 89.2 * USD_TO_ARS,
    variation: -0.42,
    variationAbs: -0.37,
    history: generateHistory(89.2),
    timestamp: new Date().toISOString(),
  },
];

// ETFs Criptomonedas
export const mockETFCriptoData: ETFQuote[] = [
  {
    ticker: "BITO",
    name: "ProShares Bitcoin Strategy",
    country: "Bitcoin",
    countryFlag: "₿",
    category: "cripto",
    price: 24.8,
    priceARS: 24.8 * USD_TO_ARS,
    variation: 1.85,
    variationAbs: 0.45,
    history: generateHistory(24.8),
    timestamp: new Date().toISOString(),
  },
  {
    ticker: "ETHE",
    name: "Grayscale Ethereum Trust",
    country: "Ethereum",
    countryFlag: "Ξ",
    category: "cripto",
    price: 32.1,
    priceARS: 32.1 * USD_TO_ARS,
    variation: -0.95,
    variationAbs: -0.31,
    history: generateHistory(32.1),
    timestamp: new Date().toISOString(),
  },
  {
    ticker: "GBTC",
    name: "Grayscale Bitcoin Trust",
    country: "Bitcoin",
    countryFlag: "₿",
    category: "cripto",
    price: 62.4,
    priceARS: 62.4 * USD_TO_ARS,
    variation: 2.1,
    variationAbs: 1.28,
    history: generateHistory(62.4),
    timestamp: new Date().toISOString(),
  },
  {
    ticker: "ARKB",
    name: "ARK 21Shares Bitcoin ETF",
    country: "Bitcoin",
    countryFlag: "₿",
    category: "cripto",
    price: 71.5,
    priceARS: 71.5 * USD_TO_ARS,
    variation: 1.92,
    variationAbs: 1.35,
    history: generateHistory(71.5),
    timestamp: new Date().toISOString(),
  },
];

// Legacy export for backward compatibility
export const mockETFData: ETFQuote[] = mockETFPaisesData;

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
      priceARS: newPrice * USD_TO_ARS,
      variation: Math.round((Math.random() * 2 - 1) * 100) / 100,
      variationAbs: diff,
      timestamp: now,
    };
  });
}
