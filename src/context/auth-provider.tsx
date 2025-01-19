import { useAuthQuery } from "@/hooks/use-authentication";
import { createContext, useContext, useState } from "react";

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
