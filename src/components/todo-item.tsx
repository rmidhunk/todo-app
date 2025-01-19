import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useDeleteTodosMutation,
  usePatchTodosMutation,
} from "@/hooks/use-todos";
import { cn } from "@/lib/utils";
import { Todo } from "@/types/todo";
import React from "react";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { removeTodo, isDeleting } = useDeleteTodosMutation();
  const { toggleTodoItem, isToggling } = usePatchTodosMutation();

  const toggleTodo = async (id: string) => {
    try {
      const updatedTodo: { status: "todo" | "done" } = {
        status: todo?.status === "done" ? "todo" : "done",
      };
      await toggleTodoItem({
        requestBody: updatedTodo,
        queryParams: id,
      });
    } catch (error) {
      console.log("Unable to toggle todo due to ", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await removeTodo({ queryParams: id });
    } catch (error) {
      console.log("Unable to delete todo due to ", error);
    }
  };

  return (
    <li>
      <Card className="w-full p-4 shadow-md">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle
            className={cn(
              `text-lg font-semibold`,
              todo.status === "done" ? "line-through text-gray-500" : "",
            )}
          >
            {todo.title}
          </CardTitle>

          {todo.priority && (
            <Badge
              className={cn(
                todo.priority === "high"
                  ? "bg-red-500 text-white"
                  : todo.priority === "medium"
                  ? "bg-yellow-500 text-white"
                  : "bg-green-500 text-white",
              )}
            >
              {todo.priority}
            </Badge>
          )}
          <Badge variant="secondary" className="capitalize">
            {todo?.status}
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{todo.description}</p>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={todo.status === "done"}
                disabled={isToggling}
                onCheckedChange={() => toggleTodo(todo?.id)}
                id={`todo-${todo.id}`}
              />
              <label htmlFor={`todo-${todo.id}`} className="text-sm">
                Mark as Done
              </label>
            </div>
            <span className="text-sm text-gray-500">Due: {todo.dueDate}</span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-700">
              Assigned User: {todo.assignedUser}
            </span>
            <Button
              variant="destructive"
              size="sm"
              disabled={isDeleting}
              onClick={() => deleteTodo(todo?.id)}
            >
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </li>
  );
};

export { TodoItem };
