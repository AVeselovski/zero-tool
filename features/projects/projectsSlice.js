import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "@services/api";

const initialState = {
  projects: [],
  activeProject: "",
  status: "idle",
  error: null,
};

// fetch projects task groups
export const getAllProjects = createAsyncThunk(
  "tasks/getAllProjects",
  async () => {
    const response = await api.get(`projects`);

    return response.data;
  }
);

const slice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // set projects (just in case for now)
    setProjects: (state, action) => {
      const projects = action.payload.map((p) => ({
        _id: p._id.toString(),
        title: p.title,
      }));

      return { ...state, projects };
    },
    // set active project (should be persisted in local storage)
    setActiveProject: (state, action) => {
      return { ...state, activeProject: action.payload };
    },
  },
  extraReducers(builder) {
    // handle GET projects
    builder.addCase(getAllProjects.fulfilled, (state, action) => {
      return { ...state, projects: action.payload };
    });
    builder.addCase(getAllProjects.rejected, (state, action) => {
      return { ...state, status: "failed", error: action.error.message };
    });
  },
});

// Actions
export const { setProjects, setActiveProject } = slice.actions;

// Selectors
export const selectProjects = (state) => state.projects.projects;
export const selectActiveProject = (state) => state.projects.activeProject;

export default slice.reducer;
