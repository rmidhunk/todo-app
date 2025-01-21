import { fetcher } from "@/lib/api-utils";
import useSWR from "swr";

const useAuthQuery = () => {
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_URL}/auth`,
    fetcher,
  );

  return {
    authData: data,
    isAuthLoading: isLoading,
    isAuthError: error,
  };
};

export { useAuthQuery };
