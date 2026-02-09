export const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false";
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
export const POLLING_INTERVAL = parseInt(
  process.env.NEXT_PUBLIC_POLLING_INTERVAL || "3000",
  10
);
