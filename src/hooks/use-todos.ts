import { Todo } from "@/types/todo";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
interface DeleteRequestArgs {
  queryParams: string;
}

interface PatchRequestArgs {
  requestBody: { status: "todo" | "done" };
  queryParams: string;
}

const fetcher = (...args) => fetch(...args).then((res) => res.json());

async function postRequest(url: string, { arg }: { arg: Todo }) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

async function patchRequest(url: string, { arg }: { arg: PatchRequestArgs }) {
  return fetch(`${url}/${arg.queryParams}`, {
    method: "PATCH",
    body: JSON.stringify(arg.requestBody),
  }).then((res) => res.json());
}

async function deleteRequest(url: string, { arg }: { arg: DeleteRequestArgs }) {
  return fetch(`${url}/${arg.queryParams}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

const useTodosQuery = ({ status, user }: { status: string; user: string }) => {
  const params = new URLSearchParams();
  if (user) params.append("assignedUser", user);
  if (status) params.append("status", status);

  const url = `http://localhost:3000/todo${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const { data, error, isLoading } = useSWR(url, fetcher);

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

const usePatchTodosMutation = () => {
  const { trigger, isMutating } = useSWRMutation(
    "http://localhost:3000/todo",
    patchRequest,
  );
  return { toggleTodoItem: trigger, isToggling: isMutating };
};

const useDeleteTodosMutation = () => {
  const { trigger, isMutating } = useSWRMutation(
    "http://localhost:3000/todo",
    deleteRequest,
  );
  return { removeTodo: trigger, isDeleting: isMutating };
};

export {
  useTodosMutation,
  useTodosQuery,
  useDeleteTodosMutation,
  usePatchTodosMutation,
};
