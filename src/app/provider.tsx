import AuthProvider from "@/context/auth-provider";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
