import { DescuentoCheque } from "@/types/market";

export const mockDescuentoChequesData: DescuentoCheque[] = [
  { market: "BYMA", segment: "Avalados", rateAvg: 38.5, rateMin: 36.0, rateMax: 41.0, termDays: 120, volume: 8500, timestamp: new Date().toISOString() },
  { market: "BYMA", segment: "No Avalados", rateAvg: 45.2, rateMin: 42.0, rateMax: 48.5, termDays: 90, volume: 3200, timestamp: new Date().toISOString() },
  { market: "MAV", segment: "Avalados", rateAvg: 39.0, rateMin: 36.5, rateMax: 41.5, termDays: 115, volume: 6800, timestamp: new Date().toISOString() },
  { market: "MAV", segment: "Patrocinados", rateAvg: 42.0, rateMin: 39.0, rateMax: 45.0, termDays: 100, volume: 2100, timestamp: new Date().toISOString() },
];

export function simulateDescuentoChequesVariation(data: DescuentoCheque[]): DescuentoCheque[] {
  const now = new Date().toISOString();
  return data.map((d) => ({
    ...d,
    rateAvg: Math.round((d.rateAvg + (Math.random() * 0.4 - 0.2)) * 100) / 100,
    rateMin: Math.round((d.rateMin + (Math.random() * 0.3 - 0.15)) * 100) / 100,
    rateMax: Math.round((d.rateMax + (Math.random() * 0.3 - 0.15)) * 100) / 100,
    volume: Math.round(d.volume + (Math.random() * 100 - 50)),
    timestamp: now,
  }));
}
