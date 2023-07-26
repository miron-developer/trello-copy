import { DragDropContext, Droppable } from "react-beautiful-dnd";

import useDesk, {
  TYPE_BACKLOG,
  TYPE_DONE,
  TYPE_PROGRESS,
  TYPE_TEST,
} from "@/lib/useDesk";
import Section from "@/components/section/section";

import "./desk.scss";

// default sections
const sections = [
  { type: TYPE_BACKLOG, name: "Backlog" },
  { type: TYPE_PROGRESS, name: "Progress" },
  { type: TYPE_TEST, name: "Test" },
  { type: TYPE_DONE, name: "Done" },
];

const orderOfSections = Object.values(sections).map((s) => s.type);

export default function Desk() {
  const { tasks, reorder } = useDesk({});

  const reorderTasks = (draggableId, dstDroppableId, dstIndex) => {
    const startIndex = tasks.findIndex((t) => t.id === draggableId);

    const typedTasks = tasks.filter((t) => t.type === dstDroppableId);

    // find end index
    if (dstIndex >= typedTasks.length && dstIndex > 0) {
      dstIndex -= 1;
    }
    const endIndexId = typedTasks[dstIndex]?.id;

    let endIndex;
    let isNewColumn = false;

    // new column
    if (typedTasks.length === 0) {
      endIndex = tasks.length - 1;
      isNewColumn = true;
    } else {
      endIndex = tasks.findIndex((t) => t.id === endIndexId);
    }

    // reorder
    reorder(endIndex, startIndex, isNewColumn, dstDroppableId);
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const srcSectionIndex = orderOfSections.indexOf(result.source.droppableId);
    const dstSectionIndex = orderOfSections.indexOf(
      result.destination.droppableId
    );

    // move only to further
    if (dstSectionIndex - srcSectionIndex < 0) return;

    // move only 1-by-1
    if (dstSectionIndex - srcSectionIndex > 1) return;

    reorderTasks(
      result.draggableId,
      result.destination.droppableId,
      result.destination.index
    );
  };

  return (
    <div className="desk">
      <h1 className="desk-title">Default Desk</h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <section className="desk-board">
          {sections.map((s) => (
            <Droppable key={s.type} droppableId={s.type}>
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <Section key={s.type} {...s} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </section>
      </DragDropContext>
    </div>
  );
}
