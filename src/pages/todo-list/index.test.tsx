import { useTodosQuery } from "@/hooks/use-todos";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TodoList } from ".";

vi.mock(import("@/hooks/use-todos"), async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useTodosQuery: vi.fn(),
  };
});

describe("TodoList Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders todo list with tasks", async () => {
    (useTodosQuery as vi.Mock).mockReturnValue({
      todos: {
        data: [{ id: "1", title: "Test Todo", status: "todo" }],
        pages: 1,
      },
      todoListMutate: vi.fn(),
    });

    render(
      <MemoryRouter>
        <TodoList />
      </MemoryRouter>,
    );

    screen.debug(null, 200000);
    expect(await screen.findByText("Test Todo")).toBeInTheDocument();
  });
});
