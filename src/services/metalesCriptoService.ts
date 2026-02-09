import { MetalesCriptoData } from "@/types/market";
import { USE_MOCK } from "@/config/env";
import { mockMetalesCriptoData, simulateMetalesCriptoVariation } from "@/mocks/metalesCriptoMock";

let currentData = { ...mockMetalesCriptoData };

export async function fetchMetalesCripto(): Promise<MetalesCriptoData> {
  if (USE_MOCK) {
    currentData = simulateMetalesCriptoVariation(currentData);
    return currentData;
  }
  throw new Error("API not configured");
}
