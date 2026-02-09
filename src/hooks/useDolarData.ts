"use client";

import { usePolling } from "./usePolling";
import { fetchDolarData } from "@/services/dolarService";
import { DolarQuote } from "@/types/market";
import { POLLING_INTERVAL } from "@/config/env";

export function useDolarData() {
  return usePolling<DolarQuote[]>(fetchDolarData, POLLING_INTERVAL);
}
