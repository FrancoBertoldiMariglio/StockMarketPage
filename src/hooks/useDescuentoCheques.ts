"use client";

import { usePolling } from "./usePolling";
import { fetchDescuentoCheques } from "@/services/descuentoChequesService";
import { DescuentoCheque } from "@/types/market";
import { POLLING_INTERVAL } from "@/config/env";

export function useDescuentoCheques() {
  return usePolling<DescuentoCheque[]>(fetchDescuentoCheques, POLLING_INTERVAL);
}
