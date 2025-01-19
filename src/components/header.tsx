import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-provider";
import { ListTodoIcon } from "lucide-react";

const Header = () => {
  const auth = useAuth();

  return (
    <header className="fixed w-full top-0 bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <ListTodoIcon />
        <h1 className="text-lg font-bold">Todo App</h1>
      </div>
      <div className="flex items-center space-x-4">
        {auth?.user && (
          <>
            <p className="text-sm">Logged in as: {auth?.user}</p>
            <Button
              variant="destructive"
              onClick={() => {
                auth?.logout();
              }}
            >
              Logout
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export { Header };
