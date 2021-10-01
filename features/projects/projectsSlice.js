import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  activeProject: "",
};

const slice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // populate available projects lists
    setProjects: (state, action) => {
      return { ...state, projects: action.payload };
    },

    // set active project (should be persisted in local storage)
    setActiveProject: (state, action) => {
      return { ...state, activeProject: action.payload };
    },
  },
});

// Actions
export const { setProjects, setActiveProject } = slice.actions;

// Selectors
export const selectProjects = (state) => state.projects.projects;
export const selectActiveProject = (state) => state.projects.activeProject;

export default slice.reducer;
