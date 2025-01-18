import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useTodosQuery = () => {
  const { data, error, isLoading } = useSWR(
    `http://localhost:3000/todo`,
    fetcher,
  );

  return {
    todos: data,
    isTodoListLoading: isLoading,
    isTodoListError: error,
  };
};

export { useTodosQuery };
