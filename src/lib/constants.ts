// 20 minutes in milliseconds - realistic for financial data updates
export const POLLING_INTERVAL = parseInt(
  process.env.NEXT_PUBLIC_POLLING_INTERVAL || "1200000",
  10
);
