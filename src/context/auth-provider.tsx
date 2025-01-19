import { createContext, useContext, useState } from "react";

interface AuthContext {
  user: string | null;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
