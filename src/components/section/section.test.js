import { fireEvent, screen } from "@testing-library/react";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 } from "uuid";
import { act } from "react-test-renderer";
import "@testing-library/jest-dom";

import { TYPE_BACKLOG } from "@/lib/useDesk";
import { renderWithProviders } from "@/lib/test-utils";

import Section from "./section";

const mockTasks = [
  {
    id: v4(),
    type: TYPE_BACKLOG,
    description: "hello from task",
  },
  {
    id: v4(),
    type: TYPE_BACKLOG,
    description: "test2",
  },
];

describe("test section component", () => {
  it("renders section", () => {
    renderWithProviders(
      <>
        <DragDropContext>
          <Section type={TYPE_BACKLOG} name="Backlog" />
        </DragDropContext>
      </>
    );

    const linkElement = screen.getByText(/Backlog/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("renders section with tasks", () => {
    renderWithProviders(
      <>
        <DragDropContext>
          <Section type={TYPE_BACKLOG} name="Backlog" />
        </DragDropContext>
      </>,
      {
        preloadedState: {
          desk: {
            tasks: mockTasks,
          },
        },
      }
    );

    const linkElement = screen.getByText(/hello from task/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("add task", () => {
    renderWithProviders(
      <>
        <DragDropContext>
          <Section type={TYPE_BACKLOG} name="Backlog" />
        </DragDropContext>
      </>
    );

    const btnElement = screen.getByText(/Add task/i);
    expect(btnElement).toBeInTheDocument();

    // click btn to adding
    act(() => {
      btnElement.click();
    });

    // find textarea
    const textareaElement = screen.getByPlaceholderText(
      /Add Task description here/i
    );
    expect(textareaElement).toBeInTheDocument();

    // & focus
    textareaElement.focus();

    // & type
    const text = "New Task Description";
    fireEvent.change(textareaElement, {
      target: { value: text },
    });

    expect(textareaElement.value).toBe(text);

    // save task
    const btnElementSave = screen.getByText(/Add Card/i);
    expect(btnElementSave).toBeInTheDocument();

    // click btn to saving
    act(() => {
      btnElementSave.click();
    });

    // find new task
    const newTaskElement = screen.getByText(text);
    expect(newTaskElement).toBeInTheDocument();
  });
});
