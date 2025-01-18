import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CreateTodoDialog = () => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create New Todo</DialogTitle>
      </DialogHeader>
    </DialogContent>
  );
};

export default CreateTodoDialog;
