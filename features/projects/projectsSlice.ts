import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import api from "services/api";
import { RootState } from "app/store";

import type { IProject } from "../../types";

export const getAllProjects = createAsyncThunk(
  "tasks/getAllProjects",
  async () => {
    const response = await api.get(`projects`);
    return response.data;
  }
);

export interface ProjectsState {
  projects: IProject[];
  activeProject: string;
  status: string;
  error: string | undefined;
}

const initialState: ProjectsState = {
  projects: [],
  activeProject: "",
  status: "idle",
  error: undefined,
};

const slice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // set active project (TODO: should be persisted in local storage)
    setActiveProject: (state, action: PayloadAction<string>) => {
      state.activeProject = action.payload;
    },
  },
  extraReducers(builder) {
    /* handle GET projects */

    builder.addCase(getAllProjects.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getAllProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.status = "idle";
    });
    builder.addCase(getAllProjects.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    });

    /* * */
  },
});

// Actions
export const { setActiveProject } = slice.actions;

// Selectors
export const selectProjects = (state: RootState) => state.projects.projects;
export const selectActiveProject = (state: RootState) =>
  state.projects.activeProject;

export default slice.reducer;
