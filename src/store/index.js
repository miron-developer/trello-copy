import { configureStore } from "@reduxjs/toolkit";

import deskReducer, { deskSliceMiddleware } from "./desk/deskSlice";

const storeConfig = {
  reducer: {
    desk: deskReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().prepend(deskSliceMiddleware.middleware);
  },
};

export const store = configureStore(storeConfig);

export const setupStore = (preloadedState) => {
  return configureStore({ ...storeConfig, preloadedState });
};
