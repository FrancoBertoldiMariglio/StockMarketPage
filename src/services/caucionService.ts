import { CaucionRate } from "@/types/market";
import { USE_MOCK } from "@/config/env";
import { mockCaucionData, simulateCaucionVariation } from "@/mocks/caucionMock";

let currentData = [...mockCaucionData];

export async function fetchCaucionData(): Promise<CaucionRate[]> {
  if (USE_MOCK) {
    currentData = simulateCaucionVariation(currentData);
    return currentData;
  }
  throw new Error("API not configured");
}
