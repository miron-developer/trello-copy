import { configureStore } from "@reduxjs/toolkit";

import deskReducer, { deskSliceMiddleware } from "./desk/deskSlice";

export const store = configureStore({
  reducer: {
    desk: deskReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().prepend(deskSliceMiddleware.middleware);
  },
});
