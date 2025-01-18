import { TaskList } from "@/pages/task-list";
import { BrowserRouter, Route, Routes } from "react-router";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tasks" element={<TaskList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
