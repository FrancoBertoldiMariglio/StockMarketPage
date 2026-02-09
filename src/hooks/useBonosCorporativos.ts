"use client";

import { usePolling } from "./usePolling";
import { fetchBonosCorporativos } from "@/services/bonosCorporativosService";
import { BonoCorporativo } from "@/types/market";
import { POLLING_INTERVAL } from "@/config/env";

export function useBonosCorporativos() {
  return usePolling<BonoCorporativo[]>(fetchBonosCorporativos, POLLING_INTERVAL);
}
