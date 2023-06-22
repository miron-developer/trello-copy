import { createListenerMiddleware } from "@reduxjs/toolkit";

import { DESK } from "@/lib/storage-names";

// listen events and make some action
const storageMiddleware = createListenerMiddleware();

export const defineStorageMiddleware = (predicate) => {
  function effect(action, listenerApi) {
    window.localStorage.setItem(
      DESK,
      JSON.stringify(listenerApi.getState().desk)
    );
  }

  storageMiddleware.startListening({ predicate: () => predicate, effect });

  return storageMiddleware;
};
