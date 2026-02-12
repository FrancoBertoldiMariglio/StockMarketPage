"use client";

import { usePolling } from "./usePolling";
import { fetchETFMetalesData } from "@/services/etfService";
import { ETFQuote } from "@/types/market";
import { POLLING_INTERVAL } from "@/config/env";

export function useETFMetalesData() {
  return usePolling<ETFQuote[]>(fetchETFMetalesData, POLLING_INTERVAL);
}
