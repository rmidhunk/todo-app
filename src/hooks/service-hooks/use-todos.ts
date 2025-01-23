import { fetcher } from "@/lib/api-utils";
import { TODOS_API } from "@/services/api-urls";
import { Todo } from "@/types/todo";
import { useSearchParams } from "react-router";
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
  const [searchParams] = useSearchParams();

  searchParams.set("_page", page || "1");
  searchParams.set("_per_page", "4");

  if (user) searchParams.set("assignedUser", user);
  if (status) searchParams.set("status", status);
  if (sort) searchParams.set("_sort", sort);
  if (title) searchParams.set("title", title);

  const url = `${TODOS_API}?${searchParams.toString()}`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    todos: data,
    isTodoListLoading: isLoading,
    isTodoListError: error,
    todoListMutate: mutate,
  };
};
const useTodosMutation = () => {
  const { trigger, isMutating } = useSWRMutation(`${TODOS_API}`, postRequest);
  return { createTodo: trigger, isCreating: isMutating };
};

const usePatchTodosMutation = () => {
  const { trigger, isMutating } = useSWRMutation(`${TODOS_API}`, patchRequest);
  return { toggleTodoItem: trigger, isToggling: isMutating };
};

const useDeleteTodosMutation = () => {
  const { trigger, isMutating } = useSWRMutation(`${TODOS_API}`, deleteRequest);
  return { removeTodo: trigger, isDeleting: isMutating };
};

export {
  useDeleteTodosMutation,
  usePatchTodosMutation,
  useTodosMutation,
  useTodosQuery,
};
