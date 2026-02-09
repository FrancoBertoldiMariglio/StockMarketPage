"use client";

import { usePolling } from "./usePolling";
import { fetchRiesgoPais } from "@/services/riesgoPaisService";
import { RiesgoPais } from "@/types/market";
import { POLLING_INTERVAL } from "@/config/env";

export function useRiesgoPais() {
  return usePolling<RiesgoPais>(fetchRiesgoPais, POLLING_INTERVAL);
}
