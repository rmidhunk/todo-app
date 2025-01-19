import AuthProvider from "@/context/auth-provider";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <AuthProvider>{children}</AuthProvider>;
};
