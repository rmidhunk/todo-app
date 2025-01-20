import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Todo } from "@/types/todo";
import { useSearchParams } from "react-router";

interface NewParamsType {
  page?: number | null;
}

interface TodoPaginationProps {
  todos: {
    data: Todo[];
    first: number;
    items: number;
    last: number;
    next: number | null;
    pages: number;
    prev: number | null;
  };
}

const TodoPagination = ({ todos }: TodoPaginationProps) => {
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
    <Pagination>
      <PaginationContent>
        <Button variant="ghost" disabled={!todos?.prev}>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => updateParams({ page: todos?.prev })}
            />
          </PaginationItem>
        </Button>
        {todos?.pages &&
          Array.from({ length: todos.pages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink onClick={() => updateParams({ page: index + 1 })}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        <Button variant="ghost" disabled={!todos?.next}>
          <PaginationItem>
            <PaginationNext
              onClick={() => updateParams({ page: todos?.next })}
            />
          </PaginationItem>
        </Button>
      </PaginationContent>
    </Pagination>
  );
};

export default TodoPagination;
