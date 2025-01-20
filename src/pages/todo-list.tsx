import { CreateTodoDialog } from "@/components/create-todo-dialog";
import { TodoFilter } from "@/components/todo-filter";
import { TodoItem } from "@/components/todo-item";
import { TodoPagination } from "@/components/todo-pagination";
import { TodoSort } from "@/components/todo-sort";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTodosMutation, useTodosQuery } from "@/hooks/use-todos";
import { updateParams } from "@/lib/utils";
import { Todo } from "@/types/todo";
import { PlusIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { useSearchParams } from "react-router";

const TodoList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [createTodoDialogOpen, setCreateTodoDialogOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get("status") || "";
  const user = searchParams.get("user") || "";
  const sort = searchParams.get("sort") || "";
  const page = searchParams.get("page") || "";
  const title = searchParams.get("title") || "";

  const { todos, todoListMutate } = useTodosQuery({
    status,
    user,
    sort,
    page,
    title,
  });
  const { createTodo, isCreating } = useTodosMutation();

  const addTodo = async (todoItem: Todo) => {
    try {
      const newTodoItem: Todo = { ...todoItem, status: "todo" };
      await createTodo(newTodoItem);
      setCreateTodoDialogOpen(false);
      todoListMutate();
    } catch (error) {
      console.log("Unable to create todo due to ", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 py-16">
      <CreateTodoDialog
        isOpen={createTodoDialogOpen}
        onClose={setCreateTodoDialogOpen}
        onSubmit={addTodo}
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
        <div className="flex">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search todos with exact title..."
            className="flex-grow rounded-r-none"
          />
          <Button
            className="rounded-l-none"
            onClick={() =>
              updateParams({ title: searchTerm }, searchParams, setSearchParams)
            }
          >
            <SearchIcon />
          </Button>
        </div>
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
