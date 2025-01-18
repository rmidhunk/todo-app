import { TodoList } from "@/pages/todo-list";
import { BrowserRouter, Route, Routes } from "react-router";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/todo-list" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
