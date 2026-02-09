import { RiesgoPais } from "@/types/market";
import { USE_MOCK } from "@/config/env";
import { mockRiesgoPaisData, simulateRiesgoPaisVariation } from "@/mocks/riesgoPaisMock";

let currentData = { ...mockRiesgoPaisData };

export async function fetchRiesgoPais(): Promise<RiesgoPais> {
  if (USE_MOCK) {
    currentData = simulateRiesgoPaisVariation(currentData);
    return currentData;
  }
  throw new Error("API not configured");
}
