import TodoItem from "@/components/todo-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTodosMutation, useTodosQuery } from "@/hooks/use-todos";
import { Todo } from "@/types/todo";
import React, { useState } from "react";

const TodoList: React.FC = () => {
  const { todos } = useTodosQuery();
  const { createTodo, isCreating } = useTodosMutation();

  const [newTodo, setNewTodo] = useState("");

  const addTodo = async () => {
    try {
      const newTodoItem: Todo = {
        title: newTodo,
        status: "todo",
        dueDate: "2020-12-31",
        description: newTodo,
        assignedUser: 1,
        priority: "medium",
        tags: [],
      };
      await createTodo(newTodoItem);
      setNewTodo("");
    } catch (error) {
      console.log("Unable to create todo due to ", error);
    }
  };

  const toggleTodo = (id: string) => {
    // setTodos(
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    //   ),
    // );
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="flex-grow"
        />
        <Button disabled={isCreating} onClick={addTodo}>
          Add
        </Button>
      </div>
      <ul className="space-y-2">
        {todos?.map((todo: Todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleTodo(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export { TodoList };
