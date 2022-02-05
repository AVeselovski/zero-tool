import { configureStore } from "@reduxjs/toolkit";

import { zeroApi } from "app/services/zeroApi";
import authReducer from "features/auth/authSlice";
import projectsReducer from "features/projects/projectsSlice";
import projectReducer from "features/project/projectSlice";

export const store = configureStore({
  reducer: {
    [zeroApi.reducerPath]: zeroApi.reducer,
    auth: authReducer,
    projects: projectsReducer,
    project: projectReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(zeroApi.middleware);
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { project: ProjectState, ... }
export type AppDispatch = typeof store.dispatch;
