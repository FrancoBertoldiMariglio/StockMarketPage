import { ETFQuote, ETFCategory } from "@/types/market";
import { USE_MOCK } from "@/config/env";
import {
  mockETFPaisesData,
  mockETFMetalesData,
  mockETFCriptoData,
  simulateETFVariation,
} from "@/mocks/etfMock";

let currentPaisesData = [...mockETFPaisesData];
let currentMetalesData = [...mockETFMetalesData];
let currentCriptoData = [...mockETFCriptoData];

export async function fetchETFPaisesData(): Promise<ETFQuote[]> {
  if (USE_MOCK) {
    currentPaisesData = simulateETFVariation(currentPaisesData);
    return currentPaisesData;
  }
  throw new Error("API not configured");
}

export async function fetchETFMetalesData(): Promise<ETFQuote[]> {
  if (USE_MOCK) {
    currentMetalesData = simulateETFVariation(currentMetalesData);
    return currentMetalesData;
  }
  throw new Error("API not configured");
}

export async function fetchETFCriptoData(): Promise<ETFQuote[]> {
  if (USE_MOCK) {
    currentCriptoData = simulateETFVariation(currentCriptoData);
    return currentCriptoData;
  }
  throw new Error("API not configured");
}

// Legacy export for backward compatibility
export const fetchETFData = fetchETFPaisesData;
