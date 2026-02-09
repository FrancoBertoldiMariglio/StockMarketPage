import { LetraBono } from "@/types/market";

export const mockLetraBonos: LetraBono[] = [
  { ticker: "AL30", name: "BONAR 2030 Ley Arg", type: "bono", law: "arg", price: 67.5, yieldToMaturity: 12.8, parity: 67.5, duration: 3.2, currency: "USD", variation: 0.35, timestamp: new Date().toISOString() },
  { ticker: "GD30", name: "GLOBAL 2030 Ley NY", type: "bono", law: "ny", price: 72.3, yieldToMaturity: 10.5, parity: 72.3, duration: 3.1, currency: "USD", variation: -0.18, timestamp: new Date().toISOString() },
  { ticker: "AL35", name: "BONAR 2035 Ley Arg", type: "bono", law: "arg", price: 58.2, yieldToMaturity: 14.2, parity: 58.2, duration: 5.8, currency: "USD", variation: 0.52, timestamp: new Date().toISOString() },
  { ticker: "GD35", name: "GLOBAL 2035 Ley NY", type: "bono", law: "ny", price: 63.4, yieldToMaturity: 11.8, parity: 63.4, duration: 5.6, currency: "USD", variation: -0.22, timestamp: new Date().toISOString() },
  { ticker: "S28F6", name: "LECAP Febrero 2026", type: "letra", law: "arg", price: 95200, yieldToMaturity: 3.8, parity: 95.2, duration: 0.05, currency: "ARS", variation: 0.02, timestamp: new Date().toISOString() },
  { ticker: "S31M6", name: "LECAP Marzo 2026", type: "letra", law: "arg", price: 89800, yieldToMaturity: 4.1, parity: 89.8, duration: 0.14, currency: "ARS", variation: -0.05, timestamp: new Date().toISOString() },
];

function varyPrice(price: number): number {
  const change = price * (Math.random() * 0.004 - 0.002);
  return Math.round((price + change) * 100) / 100;
}

export function simulateLetraBonos(data: LetraBono[]): LetraBono[] {
  const now = new Date().toISOString();
  return data.map((lb) => ({
    ...lb,
    price: varyPrice(lb.price),
    variation: Math.round((Math.random() * 1 - 0.5) * 100) / 100,
    yieldToMaturity: Math.round((lb.yieldToMaturity + (Math.random() * 0.1 - 0.05)) * 100) / 100,
    timestamp: now,
  }));
}
