import { fireEvent, screen } from "@testing-library/react";
import { v4 } from "uuid";
import "@testing-library/jest-dom";

import { TYPE_BACKLOG, TYPE_PROGRESS } from "@/lib/useDesk";
import { renderWithProviders } from "@/lib/test-utils";

import Desk from "./desk";

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

describe("test Desk component", () => {
  it("renders Backlog section in Desk", () => {
    renderWithProviders(<Desk />);

    const linkElement = screen.getByText(/Backlog/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("renders desk with tasks", () => {
    renderWithProviders(<Desk />, {
      preloadedState: {
        desk: {
          tasks: mockTasks,
        },
      },
    });

    const linkElement = screen.getByText(/hello from task/i);
    expect(linkElement).toBeInTheDocument();
  });

  // dnd can't testable
  // it("renders Desk with tasks & dnd to further", () => {
  //   renderWithProviders(<Desk />, {
  //     preloadedState: {
  //       desk: {
  //         tasks: mockTasks,
  //       },
  //     },
  //   });

  //   const linkElement = screen.getByText(/hello from task/i);
  //   expect(linkElement).toBeInTheDocument();

  //   // dnd prep
  //   const backlogColumn = screen.getByText(/Backlog/i);
  //   expect(backlogColumn).toBeInTheDocument();

  //   const progressColumn = screen.getByText(/Progress/i);
  //   expect(progressColumn).toBeInTheDocument();

  //   // eslint-disable-next-line testing-library/no-node-access
  //   const dragElem = linkElement.parentElement;

  //   // dnd events
  //   fireEvent.dragStart(dragElem);
  //   fireEvent.dragEnter(progressColumn);
  //   fireEvent.dragOver(progressColumn);
  //   fireEvent.drop(progressColumn);

  //   // remove backlog column
  //   // eslint-disable-next-line testing-library/no-node-access
  //   backlogColumn.parentElement.parentElement.remove();
  //   expect(screen.queryByText(/Backlog/i)).not.toBeInTheDocument();

  //   // check is task keep existing
  //   expect(screen.getByText(/hello from task/i)).toBeInTheDocument();
  // });

  // it("renders Desk with tasks & dnd to back", () => {
  //   const mockTasksForThisTest = [
  //     {
  //       id: v4(),
  //       type: TYPE_PROGRESS,
  //       description: "hello from task",
  //     },
  //   ];

  //   renderWithProviders(<Desk />, {
  //     preloadedState: {
  //       desk: {
  //         tasks: mockTasksForThisTest,
  //       },
  //     },
  //   });

  //   const linkElement = screen.getByText(/hello from task/i);
  //   expect(linkElement).toBeInTheDocument();

  //   // dnd prep
  //   const backlogColumn = screen.getByText(/Backlog/i);
  //   expect(backlogColumn).toBeInTheDocument();

  //   const progressColumn = screen.getByText(/Progress/i);
  //   expect(progressColumn).toBeInTheDocument();

  //   // eslint-disable-next-line testing-library/no-node-access
  //   const dragElem = linkElement.parentElement;

  //   // dnd events
  //   fireEvent.dragStart(dragElem);
  //   fireEvent.dragEnter(backlogColumn);
  //   fireEvent.dragOver(backlogColumn);
  //   fireEvent.drop(backlogColumn);

  //   // remove progress column
  //   // eslint-disable-next-line testing-library/no-node-access
  //   progressColumn.parentElement.parentElement.remove();
  //   expect(screen.queryByText(/Progress/i)).not.toBeInTheDocument();

  //   // check is task keep existing
  //   expect(screen.queryByText(/hello from task/i)).not.toBeInTheDocument();
  // });
});
