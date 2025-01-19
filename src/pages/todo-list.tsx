import CreateTodoDialog from "@/components/create-todo-dialog";
import { TodoItem } from "@/components/todo-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTodosMutation, useTodosQuery } from "@/hooks/use-todos";
import { Todo } from "@/types/todo";
import React, { useState } from "react";

const TodoList: React.FC = () => {
  const { todos } = useTodosQuery();
  const { createTodo, isCreating } = useTodosMutation();

  const [newTodo, setNewTodo] = useState("");
  const [createTodoDialogOpen, setCreateTodoDialogOpen] = useState(false);

  const addTodo = async (todoItem: Todo) => {
    try {
      const newTodoItem: Todo = { ...todoItem, status: "todo" };
      await createTodo(newTodoItem);
      setNewTodo("");
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
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-grow"
        />
        <Button onClick={() => setCreateTodoDialogOpen(true)}>
          Add a New Todo Item
        </Button>
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
