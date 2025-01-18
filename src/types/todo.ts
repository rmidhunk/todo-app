export interface Todo {
  assignedUser: number;
  description: string;
  dueDate: string;
  id?: string;
  priority: string;
  status?: string;
  tags?: string[];
  title: string;
}
