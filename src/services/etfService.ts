import { ETFQuote } from "@/types/market";
import { USE_MOCK } from "@/config/env";
import { mockETFData, simulateETFVariation } from "@/mocks/etfMock";

let currentData = [...mockETFData];

export async function fetchETFData(): Promise<ETFQuote[]> {
  if (USE_MOCK) {
    currentData = simulateETFVariation(currentData);
    return currentData;
  }
  throw new Error("API not configured");
}
