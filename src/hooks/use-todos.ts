import { fetcher } from "@/lib/api-utils";
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

interface UseTodosQueryProps {
  page?: string;
  status?: string;
  user?: string;
  sort?: string;
  title?: string;
}

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

const useTodosQuery = ({
  status,
  user,
  sort,
  page,
  title,
}: UseTodosQueryProps) => {
  const params = new URLSearchParams();
  params.append("_page", page || "1");
  params.append("_per_page", "4");
  if (user) params.append("assignedUser", user);
  if (status) params.append("status", status);
  if (sort) params.append("_sort", sort);
  if (title) params.append("title", title);

  const url = `${import.meta.env.VITE_API_URL}/todo${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    todos: data,
    isTodoListLoading: isLoading,
    isTodoListError: error,
    todoListMutate: mutate,
  };
};
const useTodosMutation = () => {
  const { trigger, isMutating } = useSWRMutation(
    `${import.meta.env.VITE_API_URL}/todo`,
    postRequest,
  );
  return { createTodo: trigger, isCreating: isMutating };
};

const usePatchTodosMutation = () => {
  const { trigger, isMutating } = useSWRMutation(
    `${import.meta.env.VITE_API_URL}/todo`,
    patchRequest,
  );
  return { toggleTodoItem: trigger, isToggling: isMutating };
};

const useDeleteTodosMutation = () => {
  const { trigger, isMutating } = useSWRMutation(
    `${import.meta.env.VITE_API_URL}/todo`,
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
