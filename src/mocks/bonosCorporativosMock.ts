import { BonoCorporativo } from "@/types/market";

export const mockBonosCorporativosData: BonoCorporativo[] = [
  { ticker: "YMCHO", issuer: "YPF 2027", coupon: 8.5, maturity: "2027-06-15", price: 98.5, yieldToMaturity: 8.92, rating: "AA", currency: "USD", timestamp: new Date().toISOString() },
  { ticker: "TLC1O", issuer: "Telecom 2026", coupon: 8.0, maturity: "2026-09-20", price: 99.2, yieldToMaturity: 7.15, rating: "AA+", currency: "USD", timestamp: new Date().toISOString() },
  { ticker: "PAMP7", issuer: "Pampa E. 2027", coupon: 7.5, maturity: "2027-03-10", price: 97.8, yieldToMaturity: 8.25, rating: "AA", currency: "USD", timestamp: new Date().toISOString() },
  { ticker: "PAE28", issuer: "PAE 2028", coupon: 9.0, maturity: "2028-01-15", price: 96.3, yieldToMaturity: 9.75, rating: "AA-", currency: "USD", timestamp: new Date().toISOString() },
  { ticker: "ARCOR", issuer: "Arcor 2026", coupon: 6.25, maturity: "2026-12-01", price: 100.1, yieldToMaturity: 6.05, rating: "AAA", currency: "USD", timestamp: new Date().toISOString() },
];

function varyPrice(price: number): number {
  const change = price * (Math.random() * 0.004 - 0.002);
  return Math.round((price + change) * 100) / 100;
}

export function simulateBonosCorporativosVariation(data: BonoCorporativo[]): BonoCorporativo[] {
  const now = new Date().toISOString();
  return data.map((b) => ({
    ...b,
    price: varyPrice(b.price),
    yieldToMaturity: Math.round((b.yieldToMaturity + (Math.random() * 0.1 - 0.05)) * 100) / 100,
    timestamp: now,
  }));
}
