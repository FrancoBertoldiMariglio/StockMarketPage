import { DolarQuote } from "@/types/market";
import { USE_MOCK } from "@/config/env";
import { mockDolarData, simulateDolarVariation } from "@/mocks/dolarMock";

let currentData = [...mockDolarData];

export async function fetchDolarData(): Promise<DolarQuote[]> {
  if (USE_MOCK) {
    currentData = simulateDolarVariation(currentData);
    return currentData;
  }
  throw new Error("API not configured");
}
