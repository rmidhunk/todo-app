import { fetcher } from "@/lib/api-utils";
import useSWR from "swr";

const useUsersQuery = () => {
  const { data, error, isLoading } = useSWR(
    `http://localhost:3000/users`,
    fetcher,
  );

  return {
    users: data,
    isUsersLoading: isLoading,
    isUsersError: error,
  };
};

export { useUsersQuery };
