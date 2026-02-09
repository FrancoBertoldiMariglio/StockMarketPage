import { DescuentoCheque } from "@/types/market";
import { USE_MOCK } from "@/config/env";
import { mockDescuentoChequesData, simulateDescuentoChequesVariation } from "@/mocks/descuentoChequesMock";

let currentData = [...mockDescuentoChequesData];

export async function fetchDescuentoCheques(): Promise<DescuentoCheque[]> {
  if (USE_MOCK) {
    currentData = simulateDescuentoChequesVariation(currentData);
    return currentData;
  }
  throw new Error("API not configured");
}
