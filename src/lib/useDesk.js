import { useDispatch, useSelector } from "react-redux";

import {
  addTask,
  removeTask,
  updateTask,
  reorderTasks,
} from "@/store/desk/deskSlice";

export const TYPE_BACKLOG = "backlog";
export const TYPE_PROGRESS = "progress";
export const TYPE_TEST = "test";
export const TYPE_DONE = "done";

export default function useDesk({ type = TYPE_BACKLOG }) {
  const { tasks } = useSelector((state) => state.desk);

  const typedTasks = tasks?.filter((t) => t.type === type);

  const dispatch = useDispatch();

  const add = (taskInfo) => {
    dispatch(addTask(taskInfo));
  };

  const update = (taskInfo) => {
    dispatch(updateTask(taskInfo));
  };

  const remove = (taskId) => {
    dispatch(removeTask(taskId));
  };

  const reorder = (dstIndex, srcIndex, isNewColumn, newType) => {
    dispatch(reorderTasks({ dstIndex, srcIndex, isNewColumn, newType }));
  };

  return {
    tasks,
    typedTasks,

    add,
    update,
    remove,
    reorder,
  };
}
