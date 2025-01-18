import { Todo } from "@/types/todo";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
interface DeleteRequestArgs {
  queryParams: string;
}

const fetcher = (...args) => fetch(...args).then((res) => res.json());

async function postRequest(url: string, { arg }: { arg: Todo }) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

async function deleteRequest(url: string, { arg }: { arg: DeleteRequestArgs }) {
  return fetch(`${url}/${arg.queryParams}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

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
const useTodosMutation = () => {
  const { trigger, isMutating } = useSWRMutation(
    "http://localhost:3000/todo",
    postRequest,
  );
  return { createTodo: trigger, isCreating: isMutating };
};

const useDeleteTodosMutation = () => {
  const { trigger, isMutating } = useSWRMutation(
    "http://localhost:3000/todo",
    deleteRequest,
  );
  return { removeTodo: trigger, isDeleting: isMutating };
};

export { useTodosMutation, useTodosQuery, useDeleteTodosMutation };
