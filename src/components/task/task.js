import { useState } from "react";
import { useForm } from "react-hook-form";

import { convertOneRef2InnerRef } from "@/lib/useForm";
import useDesk from "@/lib/useDesk";
import TextareaGray from "@/components/textarea-gray/textarea-gray";
import TaskEditAction from "@/components/task-edit-action/action";

import "./task.scss";

export default function Task({ id, type, description }) {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!isOpen);

  // useForm
  const { watch, register } = useForm({ shouldUnregister: true });
  const valueDescription = watch("description");
  const field = convertOneRef2InnerRef(
    register("description", { value: description })
  );

  // when field is empty, keep focusing
  field.onBlur = (e) => {
    if (!e.target.value) e.target.focus();
  };

  const { update, remove } = useDesk({});

  const updateTask = () => {
    if (!valueDescription) return;

    update({ id, type, description: valueDescription });
    toggle();
  };

  const removeTask = () => {
    remove(id);
    toggle();
  };

  return (
    <div className={`task ${isOpen ? "task-fixed" : ""}`}>
      {isOpen ? (
        <>
          <div className="task-edit-form">
            <TextareaGray
              className="task-edit-form-textarea"
              placeholder="Add task description here"
              {...field}
            />

            <div className="board-section-add-form-btns">
              <button onClick={updateTask}>Save</button>
              <button onClick={toggle}>
                <i className="fa-sharp fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="task-edit-panel">
              <TaskEditAction
                onClick={removeTask}
                iconClassName="fa-solid fa-trash"
                text="Delete task"
              />
            </div>
          </div>

          <div className="task-edit-filter" />
        </>
      ) : (
        <>
          <p>{description}</p>

          <span onClick={toggle}>
            <i className="fa-solid fa-pen"></i>
          </span>
        </>
      )}
    </div>
  );
}
