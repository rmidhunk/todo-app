import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

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
