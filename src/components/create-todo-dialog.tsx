import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Todo } from "@/types/todo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreateTodoDialogProps {
  isOpen: boolean;
  onClose: (data: boolean) => void;
  onSubmit: (data: Todo) => void;
}

const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

const CreateTodoDialog: React.FC<CreateTodoDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const form = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Todo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
            <Button type="submit">Create Todo</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTodoDialog;
