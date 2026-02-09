"use client";

import { formatTime } from "@/lib/formatters";

interface PanelTimestampProps {
  date?: Date | null;
}

export function PanelTimestamp({ date }: PanelTimestampProps) {
  if (!date) return null;
  return (
    <span className="text-[11px] text-text-muted font-mono">
      {formatTime(date)}
    </span>
  );
}
