import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/types/todo";
import React from "react";

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="flex items-center space-x-2">
      <Checkbox
        checked={todo?.status === "done"}
        onCheckedChange={onToggle}
        id={`todo-${todo.id}`}
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={`flex-grow ${
          todo?.status === "done" ? "line-through text-gray-500" : ""
        }`}
      >
        {todo?.title}
      </label>
      <Button variant="destructive" size="sm" onClick={onDelete}>
        Delete
      </Button>
    </li>
  );
};

export default TodoItem;
