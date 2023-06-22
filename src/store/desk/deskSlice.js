import { createSlice } from "@reduxjs/toolkit";

import { DESK } from "@/lib/storage-names";

import { defineStorageMiddleware } from "./storageMiddleware";

const desk = JSON.parse(window.localStorage.getItem(DESK));

const initialState = {
  tasks: desk?.tasks || [],
};

export const deskSlice = createSlice({
  name: "desk",
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter((t) => t?.id !== action.payload);
    },
    updateTask(state, action) {
      const i = state.tasks.findIndex((t) => t?.id === action.payload?.id);
      if (i === -1) return;

      state.tasks[i] = action.payload;
    },
    reorderTasks(state, action) {
      const { dstIndex, srcIndex, isNewColumn, newType } = action.payload;

      // copy
      const srcIndexTask = { ...state.tasks[srcIndex], type: newType };

      // update type even if newType = oldType
      !isNewColumn && (state.tasks[dstIndex].type = newType);
      const dstId = state.tasks[dstIndex].id;

      // remove src
      state.tasks.splice(srcIndex, 1);

      const newDstIndex = state.tasks.findIndex((t) => t.id === dstId);

      // insert in min position max position task
      state.tasks.splice(newDstIndex, 0, srcIndexTask);
    },
  },
});

// define middleware
const storageMiddleware = defineStorageMiddleware(deskSlice.name);

// Action creators are generated for each case reducer function
export const { addTask, removeTask, updateTask, reorderTasks } =
  deskSlice.actions;
export const deskSliceMiddleware = storageMiddleware;

export default deskSlice.reducer;
