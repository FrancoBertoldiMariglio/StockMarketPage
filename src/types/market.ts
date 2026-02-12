export interface DolarQuote {
  type: string;
  buy: number;
  sell: number;
  variation: number;
  timestamp: string;
}

export interface RiesgoPais {
  value: number;
  variation: number;
  variationPercent: number;
  history: number[];
  timestamp: string;
}

export interface MetalQuote {
  name: string;
  symbol: string;
  priceUSD: number;
  variation: number;
  timestamp: string;
}

export interface CryptoQuote {
  name: string;
  symbol: string;
  priceUSD: number;
  variation: number;
  timestamp: string;
}

export interface MetalesCriptoData {
  metals: MetalQuote[];
  crypto: CryptoQuote[];
}

export type ETFCategory = "paises" | "metales" | "cripto";

export interface ETFQuote {
  ticker: string;
  name: string;
  country: string;
  countryFlag: string;
  category: ETFCategory;
  price: number;
  priceARS?: number; // Price in ARS when available
  variation: number;
  variationAbs: number;
  history: { date: string; close: number }[];
  timestamp: string;
}

export interface BonoCorporativo {
  ticker: string;
  issuer: string;
  coupon: number;
  maturity: string;
  price: number;
  yieldToMaturity: number;
  rating: string;
  currency: string;
  timestamp: string;
}

export interface LetraBono {
  ticker: string;
  name: string;
  type: "bono" | "letra";
  law: "arg" | "ny";
  price: number;
  yieldToMaturity: number;
  parity: number;
  duration: number;
  currency: string;
  variation: number;
  timestamp: string;
}

export interface CaucionRate {
  term: number;
  rateAvg: number;
  rateMin: number;
  rateMax: number;
  volume: number;
  timestamp: string;
}

export interface DescuentoCheque {
  market: "BYMA" | "MAV";
  segment: string;
  rateAvg: number;
  rateMin: number;
  rateMax: number;
  termDays: number;
  volume: number;
  timestamp: string;
}
