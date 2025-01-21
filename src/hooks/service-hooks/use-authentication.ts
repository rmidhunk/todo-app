import { fetcher } from "@/lib/api-utils";
import { AUTH_API } from "@/services/api-urls";
import useSWR from "swr";

const useAuthQuery = () => {
  const { data, error, isLoading } = useSWR(`${AUTH_API}`, fetcher);

  return {
    authData: data,
    isAuthLoading: isLoading,
    isAuthError: error,
  };
};

export { useAuthQuery };
