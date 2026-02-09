"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UsePollingResult<T> {
  data: T | null;
  previousData: T | null;
  isLoading: boolean;
  error: Error | null;
  lastUpdated: Date | null;
}

export function usePolling<T>(
  fetchFn: () => Promise<T>,
  intervalMs: number = 3000
): UsePollingResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [previousData, setPreviousData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const fetchFnRef = useRef(fetchFn);

  useEffect(() => {
    fetchFnRef.current = fetchFn;
  }, [fetchFn]);

  const doFetch = useCallback(async () => {
    try {
      const result = await fetchFnRef.current();
      setData((prev) => {
        setPreviousData(prev);
        return result;
      });
      setError(null);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    doFetch();
    const id = setInterval(doFetch, intervalMs);
    return () => clearInterval(id);
  }, [doFetch, intervalMs]);

  return { data, previousData, isLoading, error, lastUpdated };
}
