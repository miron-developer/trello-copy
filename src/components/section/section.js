import { useState } from "react";
import { useForm } from "react-hook-form";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

import { convertOneRef2InnerRef } from "@/lib/useForm";
import useDesk from "@/lib/useDesk";
import Task from "@/components/task/task";
import TextareaGray from "@/components/textarea-gray/textarea-gray";

import "./section.scss";

export default function Section({ type, name }) {
  const [isOpenAdding, setOpenAdding] = useState(false);

  // useForm
  const { watch, register } = useForm({ shouldUnregister: true });
  const description = watch("description");
  const field = convertOneRef2InnerRef(register("description"));

  // when field is empty, keep focusing
  field.onBlur = (e) => {
    if (!e.target.value) e.target.focus();
  };

  const { typedTasks, add } = useDesk({ type });

  const toggle = () => {
    setOpenAdding(!isOpenAdding);
  };

  const createTask = () => {
    if (!description) return;

    add({ id: uuidv4(), type, description });
    toggle();
  };

  return (
    <div className="board-section">
      <div className="board-section-header">
        <h2 className="board-section-header-title">{name}</h2>

        {/* типа экшны тут */}
      </div>

      <Droppable droppableId={type}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="board-section-tasks"
          >
            {typedTasks.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Task key={item.id} {...item} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {isOpenAdding ? (
        <div className="board-section-add-form">
          <TextareaGray
            className="board-section-add-form-textarea"
            placeholder="Add task description here"
            {...field}
          />

          <div className="board-section-add-form-btns">
            <button onClick={createTask}>Add Card</button>
            <button onClick={toggle}>
              <i className="fa-sharp fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      ) : (
        <button onClick={toggle} className="board-section-add-button">
          <i className="fa-solid fa-plus"></i>
          <span>Add task</span>
        </button>
      )}
    </div>
  );
}
