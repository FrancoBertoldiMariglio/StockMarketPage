import { DolarQuote } from "@/types/market";

export const mockDolarData: DolarQuote[] = [
  { type: "Oficial", buy: 1055, sell: 1095, variation: 0.12, timestamp: new Date().toISOString() },
  { type: "Blue", buy: 1180, sell: 1210, variation: -0.41, timestamp: new Date().toISOString() },
  { type: "MEP", buy: 1155, sell: 1165, variation: 0.23, timestamp: new Date().toISOString() },
  { type: "CCL", buy: 1170, sell: 1185, variation: 0.08, timestamp: new Date().toISOString() },
  { type: "Tarjeta", buy: 1410, sell: 1410, variation: 0.12, timestamp: new Date().toISOString() },
  { type: "Cripto", buy: 1175, sell: 1190, variation: -0.15, timestamp: new Date().toISOString() },
  { type: "Mayorista", buy: 1050, sell: 1052, variation: 0.1, timestamp: new Date().toISOString() },
];

function varyPrice(price: number): number {
  const change = price * (Math.random() * 0.006 - 0.003);
  return Math.round((price + change) * 100) / 100;
}

export function simulateDolarVariation(data: DolarQuote[]): DolarQuote[] {
  const now = new Date().toISOString();
  return data.map((q) => {
    const newBuy = varyPrice(q.buy);
    const newSell = varyPrice(q.sell);
    const newVar = Math.round((Math.random() * 1.2 - 0.6) * 100) / 100;
    return { ...q, buy: newBuy, sell: newSell, variation: newVar, timestamp: now };
  });
}
