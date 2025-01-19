import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-provider";

const Header = () => {
  const auth = useAuth();

  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <div className="text-lg font-bold">Todo App</div>
      <div className="flex items-center space-x-4">
        {auth?.user && (
          <>
            <p className="text-sm">Logged in as: {auth?.user}</p>
            <Button variant="destructive" onClick={() => {}}>
              Logout
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export { Header };
