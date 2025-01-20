import CreateTodoDialog from "@/components/create-todo-dialog";
import TodoFilter from "@/components/todo-filter";
import { TodoItem } from "@/components/todo-item";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useTodosMutation, useTodosQuery } from "@/hooks/use-todos";
import { Todo } from "@/types/todo";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { useSearchParams } from "react-router";

const TodoList: React.FC = () => {
  const [newTodo, setNewTodo] = useState("");
  const [createTodoDialogOpen, setCreateTodoDialogOpen] = useState(false);

  const [searchParams] = useSearchParams();

  const status = searchParams.get("status") || "";
  const user = searchParams.get("user") || "";

  const { todos } = useTodosQuery({ status, user });
  const { createTodo, isCreating } = useTodosMutation();

  const addTodo = async (todoItem: Todo) => {
    try {
      const newTodoItem: Todo = { ...todoItem, status: "todo" };
      await createTodo(newTodoItem);
      setCreateTodoDialogOpen(false);
    } catch (error) {
      console.log("Unable to create todo due to ", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 pt-16">
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
          <TodoFilter />
        </div>
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-grow"
        />
      </div>
      <ul className="space-y-2">
        {todos?.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export { TodoList };
