"use client";

import { usePolling } from "./usePolling";
import { fetchLetraBonos } from "@/services/letraBonosService";
import { LetraBono } from "@/types/market";
import { POLLING_INTERVAL } from "@/config/env";

export function useLetraBonos() {
  return usePolling<LetraBono[]>(fetchLetraBonos, POLLING_INTERVAL);
}
