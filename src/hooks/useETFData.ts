"use client";

import { usePolling } from "./usePolling";
import { fetchETFData } from "@/services/etfService";
import { ETFQuote } from "@/types/market";
import { POLLING_INTERVAL } from "@/config/env";

export function useETFData() {
  return usePolling<ETFQuote[]>(fetchETFData, POLLING_INTERVAL);
}
