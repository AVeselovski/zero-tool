import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../utils/api";

const initialState = {
  groups: [],
  status: "idle",
  error: null,
};

// add new task list (group)
export const addTaskGroup = createAsyncThunk(
  "tasks/addTaskGroup",
  async (group, { getState }) => {
    const projectId = getState().projects.activeProject;
    const response = await api.post(`projects/${projectId}/new-group`, group);

    return response.data;
  }
);

// remove a task list (group) from state
export const removeTaskGroup = createAsyncThunk(
  "tasks/removeTaskGroup",
  async (groupId, { getState }) => {
    const projectId = getState().projects.activeProject;
    const response = await api.delete(`projects/${projectId}/${groupId}`);

    return response.data;
  }
);

// add a task to specific list (group)
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async ({ groupId, task }, { getState }) => {
    const projectId = getState().projects.activeProject;
    const response = await api.post(`projects/${projectId}/${groupId}`, task);

    return { groupId, task: response.data };
  }
);

// remove a task from list (group)
export const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async ({ groupId, taskId }, { getState }) => {
    const projectId = getState().projects.activeProject;
    const response = await api.delete(
      `projects/${projectId}/${groupId}/${taskId}`
    );

    return { groupId, taskId: response.data };
  }
);

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // populate task lists (groups)
    setTaskGroups: (state, action) => {
      return { ...state, groups: action.payload };
    },

    // remove a task list (group) from state
    removeTaskGroup: (state, action) => {
      const groups = state.groups.filter((t) => t._id !== action.payload);

      return { ...state, groups };
    },
  },
  extraReducers(builder) {
    // handle post group results
    builder.addCase(addTaskGroup.fulfilled, (state, action) => {
      const groups = [...state.groups, action.payload];

      return { ...state, groups, status: "succeeded" };
    });
    builder.addCase(addTaskGroup.rejected, (state, action) => {
      return { ...state, status: "failed", error: action.error.message };
    });

    // handle delete task results
    builder.addCase(removeTaskGroup.fulfilled, (state, action) => {
      const groups = state.groups.filter((t) => t._id !== action.payload);

      return { ...state, groups };
    });
    builder.addCase(removeTaskGroup.rejected, (state, action) => {
      return { ...state, status: "failed", error: action.error.message };
    });

    // handle post task results
    builder.addCase(addTask.fulfilled, (state, action) => {
      const group = state.groups.find((g) => g._id === action.payload.groupId);
      const tasks = [...group.tasks, action.payload.task];
      const updatedGroup = { ...group, tasks };
      const groups = state.groups.map((g) =>
        g._id === updatedGroup._id ? updatedGroup : g
      );

      return { ...state, groups, status: "succeeded" };
    });
    builder.addCase(addTask.rejected, (state, action) => {
      return { ...state, status: "failed", error: action.error.message };
    });

    // handle delete task results
    builder.addCase(removeTask.fulfilled, (state, action) => {
      const group = state.groups.find((g) => g._id === action.payload.groupId);
      const tasks = group.tasks.filter((t) => t._id !== action.payload.taskId);
      const updatedGroup = { ...group, tasks };
      const groups = state.groups.map((g) =>
        g._id === updatedGroup._id ? updatedGroup : g
      );

      return { ...state, groups, status: "succeeded" };
    });
    builder.addCase(removeTask.rejected, (state, action) => {
      return { ...state, status: "failed", error: action.error.message };
    });
  },
});

// Actions
export const { setTaskGroups } = slice.actions;

// Selectors
export const selectTaskGroups = (state) => state.tasks.groups;
export const selectTask = (groupId, taskId) => (state) => {
  const group = state.tasks.groups.find((g) => g._id === groupId);
  if (!group) return null;

  const task = group.tasks.find((t) => t._id === taskId);
  if (!task) return null;

  return task;
};

export default slice.reducer;
