"use client";

import { usePolling } from "./usePolling";
import { fetchMetalesCripto } from "@/services/metalesCriptoService";
import { MetalesCriptoData } from "@/types/market";
import { POLLING_INTERVAL } from "@/config/env";

export function useMetalesCripto() {
  return usePolling<MetalesCriptoData>(fetchMetalesCripto, POLLING_INTERVAL);
}
