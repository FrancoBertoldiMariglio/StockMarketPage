"use client";

import { usePolling } from "./usePolling";
import { fetchETFPaisesData } from "@/services/etfService";
import { ETFQuote } from "@/types/market";
import { POLLING_INTERVAL } from "@/config/env";

export function useETFPaisesData() {
  return usePolling<ETFQuote[]>(fetchETFPaisesData, POLLING_INTERVAL);
}
