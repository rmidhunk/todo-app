import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUsersQuery } from "@/hooks/use-users";
import { User } from "@/types/user";
import { ChevronDownIcon } from "lucide-react";
import { useSearchParams } from "react-router";

interface NewParamsType {
  status?: "todo" | "in-progress" | "done";
  user?: string;
}

const TodoFilter = () => {
  const { users } = useUsersQuery();
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = (newParams: NewParamsType) => {
    const updatedParams = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        updatedParams.set(key, value.toString());
      } else {
        updatedParams.delete(key);
      }
    });
    setSearchParams(updatedParams);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          Filter
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => updateParams({ status: "todo" })}
              >
                Todo
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => updateParams({ status: "in-progress" })}
              >
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => updateParams({ status: "done" })}
              >
                Done
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Users</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {users?.map((user: User) => (
                <DropdownMenuItem
                  className="cursor-pointer"
                  key={user?.id}
                  onClick={() => updateParams({ user: user?.id })}
                >
                  {user?.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setSearchParams({})}
        >
          Clear all filters
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TodoFilter;
