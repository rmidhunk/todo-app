import { fetcher } from "@/lib/api-utils";
import useSWR from "swr";

const useAuthQuery = () => {
  const { data, error, isLoading } = useSWR(
    `http://localhost:3000/auth`,
    fetcher,
  );

  return {
    authData: data,
    isAuthLoading: isLoading,
    isAuthError: error,
  };
};

export { useAuthQuery };
