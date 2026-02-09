import { BonoCorporativo } from "@/types/market";
import { USE_MOCK } from "@/config/env";
import { mockBonosCorporativosData, simulateBonosCorporativosVariation } from "@/mocks/bonosCorporativosMock";

let currentData = [...mockBonosCorporativosData];

export async function fetchBonosCorporativos(): Promise<BonoCorporativo[]> {
  if (USE_MOCK) {
    currentData = simulateBonosCorporativosVariation(currentData);
    return currentData;
  }
  throw new Error("API not configured");
}
