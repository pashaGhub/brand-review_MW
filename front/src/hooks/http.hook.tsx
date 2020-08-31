import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (
      url: string,
      method: string = "GET",
      body: any,
      headers: any = { "Content-Type": "application/json" }
    ) => {
      if (body) {
        body = JSON.stringify(body);
      }

      setLoading(true);
      try {
        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        setLoading(false);
        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
