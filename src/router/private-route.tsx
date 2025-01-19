import { useAuth } from "@/context/auth-provider";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const auth = useAuth();

  if (!auth?.user) return <Navigate to="/" />;
  return <Outlet />;
};

export default PrivateRoute;
