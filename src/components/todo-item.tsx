import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Todo } from "@/types/todo";
import React from "react";
import useSWRMutation from "swr/mutation";

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
}

interface DeleteRequestArgs {
  queryParams: string;
}

async function deleteRequest(url: string, { arg }: { arg: DeleteRequestArgs }) {
  return fetch(`${url}/${arg.queryParams}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle }) => {
  const { trigger: removeTodo, isMutating: isDeleting } = useSWRMutation(
    "http://localhost:3000/todo",
    deleteRequest,
  );

  const deleteTodo = async (id: string) => {
    try {
      await removeTodo({ queryParams: id });
    } catch (error) {
      console.log("Unable to create todo due to ", error);
    }
  };

  return (
    <li>
      <Card className="w-full p-4 shadow-md">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle
            className={`text-lg font-semibold ${
              todo.status === "done" ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.title}
          </CardTitle>
          <Badge
            className={
              todo.priority === "high"
                ? "bg-red-500 text-white"
                : todo.priority === "medium"
                ? "bg-yellow-500 text-white"
                : "bg-green-500 text-white"
            }
          >
            {todo.priority}
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{todo.description}</p>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={todo.status === "done"}
                onCheckedChange={onToggle}
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

export default TodoItem;
