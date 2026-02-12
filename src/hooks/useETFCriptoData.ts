"use client";

import { usePolling } from "./usePolling";
import { fetchETFCriptoData } from "@/services/etfService";
import { ETFQuote } from "@/types/market";
import { POLLING_INTERVAL } from "@/config/env";

export function useETFCriptoData() {
  return usePolling<ETFQuote[]>(fetchETFCriptoData, POLLING_INTERVAL);
}
