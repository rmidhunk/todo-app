import { useAuthQuery } from "@/hooks/use-authentication";
import { createContext, useContext, useState } from "react";

interface AuthContext {
  user: string | null;
  login: (username: string, password: string) => void;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { authData } = useAuthQuery();

  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));

  const login = async (username: string, password: string) => {
    try {
      if (authData.username === username && authData.password === password) {
        localStorage.setItem("user", username);
        setUser(username);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.log("Login failed due to ", error);
      throw new Error("Login failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
