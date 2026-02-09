import { CaucionRate } from "@/types/market";

export const mockCaucionData: CaucionRate[] = [
  { term: 1, rateAvg: 32.5, rateMin: 30.0, rateMax: 35.0, volume: 45200, timestamp: new Date().toISOString() },
  { term: 7, rateAvg: 34.0, rateMin: 32.5, rateMax: 36.0, volume: 28700, timestamp: new Date().toISOString() },
  { term: 30, rateAvg: 36.5, rateMin: 34.0, rateMax: 39.0, volume: 12300, timestamp: new Date().toISOString() },
];

export function simulateCaucionVariation(data: CaucionRate[]): CaucionRate[] {
  const now = new Date().toISOString();
  return data.map((c) => ({
    ...c,
    rateAvg: Math.round((c.rateAvg + (Math.random() * 0.4 - 0.2)) * 100) / 100,
    rateMin: Math.round((c.rateMin + (Math.random() * 0.3 - 0.15)) * 100) / 100,
    rateMax: Math.round((c.rateMax + (Math.random() * 0.3 - 0.15)) * 100) / 100,
    volume: Math.round(c.volume + (Math.random() * 200 - 100)),
    timestamp: now,
  }));
}
