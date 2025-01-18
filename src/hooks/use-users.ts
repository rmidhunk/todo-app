import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

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
