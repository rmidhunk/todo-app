import { CreateTodoDialog } from "@/components/create-todo-dialog";
import { SearchTodo } from "@/components/search-todo";
import { TodoFilter } from "@/components/todo-filter";
import { TodoItem } from "@/components/todo-item";
import { TodoPagination } from "@/components/todo-pagination";
import { TodoSort } from "@/components/todo-sort";
import { Button } from "@/components/ui/button";
import { useTodosQuery } from "@/hooks/service-hooks/use-todos";
import { Todo } from "@/types/todo";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { useSearchParams } from "react-router";

const TodoList: React.FC = () => {
  const [createTodoDialogOpen, setCreateTodoDialogOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const params = ["status", "user", "sort", "page", "title"];
  const [status, user, sort, page, title] = params.map(
    (param) => searchParams.get(param) || "",
  );

  const { todos, todoListMutate } = useTodosQuery({
    status,
    user,
    sort,
    page,
    title,
  });

  return (
    <div className="max-w-md mx-auto mt-8 py-16">
      <CreateTodoDialog
        todoListMutate={todoListMutate}
        isOpen={createTodoDialogOpen}
        onClose={setCreateTodoDialogOpen}
      />

      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex justify-between">
          <Button onClick={() => setCreateTodoDialogOpen(true)}>
            <PlusIcon /> New Task
          </Button>
          <div className="flex gap-2">
            <TodoFilter />
            <TodoSort />
            <Button variant="outline" onClick={() => setSearchParams({})}>
              Clear All
            </Button>
          </div>
        </div>
        <SearchTodo />
      </div>
      <ul className="space-y-2 mb-4">
        {todos?.data?.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} todoListMutate={todoListMutate} />
        ))}
      </ul>
      {todos?.pages > 1 && <TodoPagination todos={todos} />}
    </div>
  );
};

export { TodoList };
