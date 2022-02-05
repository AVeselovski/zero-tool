import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "app/store";
import { zeroApi } from "app/services/zeroApi";

import type { IProject } from "types";

type ProjectsState = {
  projects: IProject[];
  activeProject: number | null;
  status: string;
  error: string | undefined;
};

const initialState: ProjectsState = {
  projects: [],
  activeProject: null,
  status: "idle",
  error: undefined,
};

const slice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // TODO: should be persisted in local storage
    setActiveProject: (state, action: PayloadAction<number>) => {
      state.activeProject = action.payload;
    },
    setProjects: (state, action: PayloadAction<IProject[]>) => {
      state.projects = action.payload;
    },
  },
  extraReducers(builder) {
    /* Handle GET projects */
    builder.addMatcher(zeroApi.endpoints.fetchProjects.matchFulfilled, (state, { payload }) => {
      state.projects = payload;
    });
  },
});

/* Actions */

export const { setActiveProject, setProjects } = slice.actions;

/* Selectors */

export const selectProjects = (state: RootState) => state.projects.projects;
export const selectMappedProjects = (state: RootState) =>
  state.projects.projects.map((p) => ({ label: p.name, value: p.id }));
export const selectActiveProject = (state: RootState) =>
  state.projects.projects.find((p) => p.id === state.projects.activeProject);

export default slice.reducer;
