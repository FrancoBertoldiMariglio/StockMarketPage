import { LetraBono } from "@/types/market";
import { USE_MOCK } from "@/config/env";
import { mockLetraBonos, simulateLetraBonos } from "@/mocks/letraBonosMock";

let currentData = [...mockLetraBonos];

export async function fetchLetraBonos(): Promise<LetraBono[]> {
  if (USE_MOCK) {
    currentData = simulateLetraBonos(currentData);
    return currentData;
  }
  throw new Error("API not configured");
}
