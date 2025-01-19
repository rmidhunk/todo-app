import { LoginPage } from "@/pages/login-page";
import { TodoList } from "@/pages/todo-list";
import PrivateRoute from "@/router/private-route";
import { BrowserRouter, Route, Routes } from "react-router";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/todo-list" element={<TodoList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
