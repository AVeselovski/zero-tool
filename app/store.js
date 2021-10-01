import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { zeroApi } from "@services/zeroApi";
import projectsReducer from "@features/projects/projectsSlice";
import tasksReducer from "@features/tasks/tasksSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [zeroApi.reducerPath]: zeroApi.reducer,

    projects: projectsReducer,
    tasks: tasksReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(zeroApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
