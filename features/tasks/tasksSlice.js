import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "@services/api";

const initialState = {
  groups: [],
  status: "idle",
  error: null,
};

// fetch projects task groups
export const getProjectData = createAsyncThunk(
  "tasks/getProjectData",
  async (projectId) => {
    const response = await api.get(`projects/${projectId}`);

    return response.data;
  }
);

// add new task list/column (group)
export const addTaskGroup = createAsyncThunk(
  "tasks/addTaskGroup",
  async (group, { getState }) => {
    const projectId = getState().projects.activeProject;
    const response = await api.post(`projects/${projectId}/new-group`, group);

    return response.data;
  }
);

// update task list/column (group)
export const updateTaskGroup = createAsyncThunk(
  "tasks/updateTaskGroup",
  async (group, { getState }) => {
    const projectId = getState().projects.activeProject;
    const response = await api.put(`projects/${projectId}/${group._id}`, group);

    return response.data;
  }
);

// remove task list/column (group)
export const removeTaskGroup = createAsyncThunk(
  "tasks/removeTaskGroup",
  async (groupId, { getState }) => {
    const projectId = getState().projects.activeProject;
    const response = await api.delete(`projects/${projectId}/${groupId}`);

    return response.data;
  }
);

// add task to list/column (group)
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async ({ groupId, task }, { getState }) => {
    const projectId = getState().projects.activeProject;
    const response = await api.post(`projects/${projectId}/${groupId}`, task);

    return { groupId, task: response.data };
  }
);

// update task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task, { getState }) => {
    const projectId = getState().projects.activeProject;
    const response = await api.put(
      `projects/${projectId}/${task._groupId}/${task._id}`,
      task
    );

    return response.data;
  }
);

// remove task from list/column (group)
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

// move task to next list/column (group)
export const moveTask = createAsyncThunk(
  "tasks/moveTask",
  async ({ currentPosition, taskId }, { getState, rejectWithValue }) => {
    const projectId = getState().projects.activeProject;
    const groupsLength = getState().tasks.groups.length;

    if (groupsLength > currentPosition) {
      const nextGroupId = getState().tasks.groups[currentPosition]._id;
      const currentGroupId = getState().tasks.groups[currentPosition - 1]._id;

      const response = await api.post(
        `projects/${projectId}/${currentGroupId}/move-task`,
        { nextGroupId, taskId }
      );

      return {
        oldGroupId: currentGroupId,
        oldTaskId: taskId,
        newGroupId: nextGroupId,
        newTask: response.data,
      };
    } else {
      return rejectWithValue("Nowhere to move");
    }
  }
);

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // handle GET groups
    builder.addCase(getProjectData.fulfilled, (state, action) => {
      const groups = action.payload.taskGroups.map((g, i) => ({
        ...g,
        position: i + 1,
      }));

      return { ...state, groups };
    });
    builder.addCase(getProjectData.rejected, (state, action) => {
      return { ...state, status: "failed", error: action.error.message };
    });

    // handle POST group results
    builder.addCase(addTaskGroup.fulfilled, (state, action) => {
      const groupsLength = state.groups.length;
      const newGroup = { ...action.payload, position: groupsLength + 1 };
      const groups = [...state.groups, newGroup];

      return { ...state, groups, status: "succeeded" };
    });
    builder.addCase(addTaskGroup.rejected, (state, action) => {
      return { ...state, status: "failed", error: action.error.message };
    });

    // handle PUT group results
    builder.addCase(updateTaskGroup.fulfilled, (state, action) => {
      const groups = state.groups.map((g) =>
        g._id === action.payload._id ? action.payload : g
      );

      return { ...state, groups, status: "succeeded" };
    });
    builder.addCase(updateTaskGroup.rejected, (state, action) => {
      return { ...state, status: "failed", error: action.error.message };
    });

    // handle DELETE group results
    builder.addCase(removeTaskGroup.fulfilled, (state, action) => {
      const groups = state.groups.filter((t) => t._id !== action.payload);

      return { ...state, groups };
    });
    builder.addCase(removeTaskGroup.rejected, (state, action) => {
      return { ...state, status: "failed", error: action.error.message };
    });

    // handle POST task results
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

    // handle PUT task results
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const group = state.groups.find((g) => g._id === action.payload._groupId);
      const tasks = group.tasks.map((t) =>
        t._id === action.payload._id ? action.payload : t
      );
      const updatedGroup = { ...group, tasks };
      const groups = state.groups.map((g) =>
        g._id === updatedGroup._id ? updatedGroup : g
      );

      return { ...state, groups, status: "succeeded" };
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      return { ...state, status: "failed", error: action.error.message };
    });

    // handle DELETE task results
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

    // handle move task (POST) results
    builder.addCase(moveTask.fulfilled, (state, action) => {
      // remove old
      const prevGroup = state.groups.find(
        (g) => g._id === action.payload.oldGroupId
      );
      const prevGroupTasks = prevGroup.tasks.filter(
        (t) => t._id !== action.payload.oldTaskId
      );
      const updatedPrevGroup = { ...prevGroup, tasks: prevGroupTasks };

      // add new
      const nextGroup = state.groups.find(
        (g) => g._id === action.payload.newGroupId
      );
      const nextGroupTasks = [...nextGroup.tasks, action.payload.newTask];
      const updatedNextGroup = { ...nextGroup, tasks: nextGroupTasks };

      const groups = state.groups.map((g) => {
        if (g._id === updatedPrevGroup._id) return updatedPrevGroup;
        if (g._id === updatedNextGroup._id) return updatedNextGroup;
        return g;
      });

      return { ...state, groups, status: "succeeded" };
    });
    builder.addCase(moveTask.rejected, (state, action) => {
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
