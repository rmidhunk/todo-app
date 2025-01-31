import { useTodosQuery } from "@/hooks/service-hooks/use-todos";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TodoList } from ".";

vi.mock(import("@/hooks/service-hooks/use-todos"), async (importOriginal) => {
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

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <TodoList />
      </MemoryRouter>,
    );

    return {
      newTaskButton: screen.getByRole("button", { name: /new task/i }),
      createTodoDialog: screen.findByRole("dialog"),
      paginationNav: screen.findByRole("navigation"),
    };
  };

  const user = userEvent.setup();
  it("renders todo list with tasks", async () => {
    (useTodosQuery as vi.Mock).mockReturnValue({
      todos: {
        data: [{ id: "1", title: "Test Todo", status: "todo" }],
        pages: 1,
      },
      todoListMutate: vi.fn(),
    });

    renderComponent();

    expect(await screen.findByText("Test Todo")).toBeInTheDocument();
  });

  it("opens create todo dialog when 'New Task' button is clicked", async () => {
    const { newTaskButton, createTodoDialog } = renderComponent();

    await user.click(newTaskButton);

    expect(await createTodoDialog).toBeInTheDocument();
  });

  it("renders pagination if there are multiple pages", async () => {
    (useTodosQuery as vi.Mock).mockReturnValue({
      todos: { data: [], pages: 2 },
      todoListMutate: vi.fn(),
    });

    const { paginationNav } = renderComponent();

    expect(await paginationNav).toBeInTheDocument();
  });

  it("should have done status todo item have title  striked", async () => {
    (useTodosQuery as vi.Mock).mockReturnValue({
      todos: {
        data: [
          {
            id: "1",
            title: "1Learn JavaScript",
            status: "done",
            dueDate: "2020-12-31",
            description: "Learn JavaScript basics",
            assignedUser: "1",
            priority: "high",
            tags: [],
          },
        ],
        pages: 1,
      },
      todoListMutate: vi.fn(),
    });

    renderComponent();

    expect(await screen.getByText("1Learn JavaScript")).toHaveClass(
      "line-through",
    );
  });
});
