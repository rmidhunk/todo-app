import { fetcher } from "@/lib/api-utils";
import useSWR from "swr";

const useUsersQuery = () => {
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_URL}/users`,
    fetcher,
  );

  return {
    users: data,
    isUsersLoading: isLoading,
    isUsersError: error,
  };
};

export { useUsersQuery };
