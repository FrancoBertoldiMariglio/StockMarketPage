"use client";

import { usePolling } from "./usePolling";
import { fetchCaucionData } from "@/services/caucionService";
import { CaucionRate } from "@/types/market";
import { POLLING_INTERVAL } from "@/config/env";

export function useCaucionData() {
  return usePolling<CaucionRate[]>(fetchCaucionData, POLLING_INTERVAL);
}
