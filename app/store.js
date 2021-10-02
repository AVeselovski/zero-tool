import { configureStore } from "@reduxjs/toolkit";

import projectsReducer from "@features/projects/projectsSlice";
import tasksReducer from "@features/tasks/tasksSlice";

/**
 * Revert RTK Query until better understanding of proper usage and testing.
 */

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
  },
});
