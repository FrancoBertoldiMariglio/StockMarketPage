import { RiesgoPais } from "@/types/market";

function generateHistory(): number[] {
  const base = 680;
  return Array.from({ length: 30 }, () =>
    Math.round(base + (Math.random() * 100 - 50))
  );
}

export const mockRiesgoPaisData: RiesgoPais = {
  value: 680,
  variation: -12,
  variationPercent: -1.73,
  history: generateHistory(),
  timestamp: new Date().toISOString(),
};

export function simulateRiesgoPaisVariation(data: RiesgoPais): RiesgoPais {
  const change = Math.round(Math.random() * 10 - 5);
  const newValue = data.value + change;
  const newHistory = [...data.history.slice(1), newValue];
  return {
    value: newValue,
    variation: change,
    variationPercent: Math.round((change / data.value) * 10000) / 100,
    history: newHistory,
    timestamp: new Date().toISOString(),
  };
}
