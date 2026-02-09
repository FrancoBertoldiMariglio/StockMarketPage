import { MetalesCriptoData } from "@/types/market";

export const mockMetalesCriptoData: MetalesCriptoData = {
  metals: [
    { name: "Oro", symbol: "XAU", priceUSD: 2680, variation: 0.35, timestamp: new Date().toISOString() },
    { name: "Plata", symbol: "XAG", priceUSD: 31.2, variation: -0.22, timestamp: new Date().toISOString() },
    { name: "Cobre", symbol: "XCU", priceUSD: 4.15, variation: 0.12, timestamp: new Date().toISOString() },
  ],
  crypto: [
    { name: "Bitcoin", symbol: "BTC", priceUSD: 97500, variation: 1.8, timestamp: new Date().toISOString() },
    { name: "Ethereum", symbol: "ETH", priceUSD: 3350, variation: -0.45, timestamp: new Date().toISOString() },
    { name: "USDT", symbol: "USDT", priceUSD: 1.0, variation: 0.01, timestamp: new Date().toISOString() },
  ],
};

function varyPrice(price: number): number {
  const change = price * (Math.random() * 0.006 - 0.003);
  return Math.round((price + change) * 100) / 100;
}

export function simulateMetalesCriptoVariation(data: MetalesCriptoData): MetalesCriptoData {
  const now = new Date().toISOString();
  return {
    metals: data.metals.map((m) => ({
      ...m,
      priceUSD: varyPrice(m.priceUSD),
      variation: Math.round((Math.random() * 1.2 - 0.6) * 100) / 100,
      timestamp: now,
    })),
    crypto: data.crypto.map((c) => ({
      ...c,
      priceUSD: c.symbol === "USDT" ? 1.0 : varyPrice(c.priceUSD),
      variation: Math.round((Math.random() * 4 - 2) * 100) / 100,
      timestamp: now,
    })),
  };
}
