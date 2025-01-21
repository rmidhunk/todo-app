import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Todo } from "@/types/todo";

interface DeleteTodoConfirmDialogProps {
  todoItem: Todo;
  onDelete: (id: string) => void;
}

const DeleteTodoConfirmDialog = ({
  todoItem,
  onDelete,
}: DeleteTodoConfirmDialogProps) => {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Delete Todo</DialogTitle>
        <DialogDescription>
          Do you really want to delete this todo: {todoItem?.title}
        </DialogDescription>
      </DialogHeader>

      <DialogFooter className="justify-end">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            type="button"
            variant="default"
            onClick={() => {
              onDelete(todoItem?.id);
            }}
          >
            Delete
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export { DeleteTodoConfirmDialog };
