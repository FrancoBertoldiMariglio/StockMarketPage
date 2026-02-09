export function formatCurrency(
  value: number,
  currency: "ARS" | "USD" = "ARS"
): string {
  if (currency === "USD") {
    return `US$${value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  return `$${value.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatPercent(value: number, decimals: number = 2): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
}

export function formatNumber(value: number, decimals: number = 2): string {
  return value.toLocaleString("es-AR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatCompactNumber(value: number): string {
  if (value >= 1_000_000) {
    return `$${formatNumber(value / 1_000_000, 0)}M`;
  }
  if (value >= 1_000) {
    return `$${formatNumber(value / 1_000, 0)}K`;
  }
  return `$${formatNumber(value, 0)}`;
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}
