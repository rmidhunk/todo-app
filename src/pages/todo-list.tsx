import TodoItem from "@/components/todo-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTodos } from "@/hooks/use-todos";
import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  // const [todos, setTodos] = useState<Todo[]>([]);
  const { todos } = useTodos();
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    // if (newTodo.trim() !== "") {
    //   setTodos([
    //     ...todos,
    //     {
    //       id: Date.now() + Math.random(),
    //       text: newTodo,
    //       completed: false,
    //     },
    //   ]);
    //   setNewTodo("");
    // }
  };

  const toggleTodo = (id: number) => {
    // setTodos(
    //   todos.map((todo) =>
    //     todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    //   ),
    // );
  };

  const deleteTodo = (id: number) => {
    // setTodos(todos.filter((todo) => todo.id !== id));
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
        <Button onClick={addTodo}>Add</Button>
      </div>
      <ul className="space-y-2">
        {todos?.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export { TodoList };
