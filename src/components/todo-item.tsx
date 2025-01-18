import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

interface Todo {
  assignedUser: 1;
  description: string;
  dueDate: string;
  id: string;
  priority: string;
  status: string;
  tags: [];
  title: string;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="flex items-center space-x-2">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={onToggle}
        id={`todo-${todo.id}`}
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={`flex-grow ${
          todo.completed ? "line-through text-gray-500" : ""
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
