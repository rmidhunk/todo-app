import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { updateParams } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const SearchTodo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const debouncedSearch = useDebounce(searchTerm, 1000);

  useEffect(() => {
    updateParams({ title: debouncedSearch }, searchParams, setSearchParams);
  }, [debouncedSearch, searchParams, setSearchParams]);

  return (
    <>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search todos with exact title..."
        className="flex-grow"
      />
    </>
  );
};

export { SearchTodo };
