import { configureStore } from "@reduxjs/toolkit";

import projectsReducer from "features/projects/projectsSlice";
import tasksReducer from "features/tasks/tasksSlice";
import { projectsApiSlice } from "features/projects/projectsApiSlice";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
    [projectsApiSlice.reducerPath]: projectsApiSlice.reducer, // should replace "projects"?
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(projectsApiSlice.middleware);
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { tasks: TasksState, ... }
export type AppDispatch = typeof store.dispatch;
