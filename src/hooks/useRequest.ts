import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

export type Response<T> = {
  count: number;
  next: number | null;
  previous: number | null;
  results: T;
};

export function useFetch<T>(url: string): [boolean, string, Response<T> | null] {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Response<T> | null>(null);
  const [error, setError] = useState("");
  async function makeRequest() {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      setData(response.data);
      setIsLoading(false);
    } catch (err: unknown) {
      const errorRequest = err as AxiosError;
      setIsLoading(false);
      setError(errorRequest.message);
    }
  }
  useEffect(() => {
    makeRequest();
  }, [url]);
  return [isLoading, error, data];
}
