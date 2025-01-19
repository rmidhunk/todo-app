export interface Todo {
  assignedUser: string;
  description: string;
  dueDate: string;
  id?: string;
  priority: string;
  status?: string;
  tags?: string[];
  title: string;
}
