import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import api from "services/api";
import { RootState } from "app/store";

import type { ITask, IGroup } from "types";

// fetch projects task groups
export const getProjectData = createAsyncThunk(
  "tasks/getProjectData",
  async (projectId: string) => {
    const response = await api.get(`projects/${projectId}`);

    return response.data.taskGroups as IGroup[];
  }
);

// add new task list/column (group)
export const addTaskGroup = createAsyncThunk(
  "tasks/addTaskGroup",
  async (group: Partial<IGroup>, { getState }) => {
    const state = getState() as RootState;
    const projectId = state.projects.activeProject;
    const response = await api.post(`projects/${projectId}/new-group`, group);

    return response.data as IGroup;
  }
);

// update task list/column (group)
export const updateTaskGroup = createAsyncThunk(
  "tasks/updateTaskGroup",
  async (group: Partial<IGroup>, { getState }) => {
    const state = getState() as RootState;
    const projectId = state.projects.activeProject;
    const response = await api.put(`projects/${projectId}/${group._id}`, group);

    return response.data as IGroup;
  }
);

// remove task list/column (group)
export const removeTaskGroup = createAsyncThunk(
  "tasks/removeTaskGroup",
  async (groupId: string, { getState }) => {
    const state = getState() as RootState;
    const projectId = state.projects.activeProject;
    const response = await api.delete(`projects/${projectId}/${groupId}`);

    return response.data as string;
  }
);

// add task to list/column (group)
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async ({ groupId, task }: { groupId: string; task: Partial<ITask> }, { getState }) => {
    const state = getState() as RootState;
    const projectId = state.projects.activeProject;
    const response = await api.post(`projects/${projectId}/${groupId}`, task);

    return response.data as ITask;
  }
);

// update task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task: ITask, { getState }) => {
    const state = getState() as RootState;
    const projectId = state.projects.activeProject;
    const response = await api.put(`projects/${projectId}/${task._groupId}/${task._id}`, task);

    return response.data as ITask;
  }
);

// remove task from list/column (group)
export const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async ({ groupId, taskId }: { groupId: string; taskId: string }, { getState }) => {
    const state = getState() as RootState;
    const projectId = state.projects.activeProject;
    const response = await api.delete(`projects/${projectId}/${groupId}/${taskId}`);

    return { groupId, taskId: response.data as string };
  }
);

// move task to next list/column (group)
type MoveTaskArgs = {
  currentPosition: number;
  taskId: string;
};
export const moveTask = createAsyncThunk<
  {
    oldGroupId: string;
    oldTaskId: string;
    newGroupId: string;
    newTask: ITask;
  },
  { currentPosition: number; taskId: string },
  { rejectValue: string }
>(
  "tasks/moveTask",
  async ({ currentPosition, taskId }: MoveTaskArgs, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const projectId = state.projects.activeProject;
    const groupsLength = state.tasks.groups.length;

    if (groupsLength <= currentPosition) {
      return rejectWithValue("Nowhere to move");
    }

    const nextGroupId = state.tasks.groups[currentPosition]._id;
    const currentGroupId = state.tasks.groups[currentPosition - 1]._id;

    const response = await api.post(`projects/${projectId}/${currentGroupId}/move-task`, {
      nextGroupId,
      taskId,
    });

    return {
      oldGroupId: currentGroupId,
      oldTaskId: taskId,
      newGroupId: nextGroupId,
      newTask: response.data as ITask,
    };
  }
);

interface TasksState {
  groups: IGroup[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | undefined;
}

const initialState = {
  groups: [],
  status: "idle",
  error: undefined,
} as TasksState;

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    /* handle GET groups */

    builder.addCase(getProjectData.fulfilled, (state, action) => {
      const groups = action.payload.map((g, i) => ({
        ...g,
        position: i + 1,
      }));

      state.groups = groups;
      state.status = "idle";
    });
    builder.addCase(getProjectData.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    });

    /* * */

    /* handle POST group results */

    builder.addCase(addTaskGroup.fulfilled, (state, action) => {
      const groupsLength = state.groups.length;
      const newGroup = { ...action.payload, position: groupsLength + 1 };

      state.groups.push(newGroup);
      state.status = "idle";
    });
    builder.addCase(addTaskGroup.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    });

    /* * */

    /* handle PUT group results */

    builder.addCase(updateTaskGroup.fulfilled, (state, action) => {
      const groupIndex = state.groups.findIndex(({ _id }) => _id === action.payload._id);

      state.groups[groupIndex] = action.payload;
      state.status = "idle";
    });
    builder.addCase(updateTaskGroup.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    });

    /* * */

    /* handle DELETE group results */

    builder.addCase(removeTaskGroup.fulfilled, (state, action) => {
      const groups = state.groups.filter((t) => t._id !== action.payload);

      state.groups = groups;
      state.status = "idle";
    });
    builder.addCase(removeTaskGroup.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    });

    /* * */

    /* handle POST task results */

    builder.addCase(addTask.fulfilled, (state, action) => {
      const groupIndex = state.groups.findIndex(({ _id }) => _id === action.payload._groupId);

      state.groups[groupIndex].tasks.push(action.payload);
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    });

    /* * */

    /* handle PUT task results */

    builder.addCase(updateTask.fulfilled, (state, action) => {
      const groupIndex = state.groups.findIndex(({ _id }) => _id === action.payload._groupId);
      const taskIndex = state.groups[groupIndex].tasks.findIndex(
        ({ _id }) => _id === action.payload._id
      );

      state.groups[groupIndex].tasks[taskIndex] = action.payload;
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    });

    /* * */

    /* handle DELETE task results */

    builder.addCase(removeTask.fulfilled, (state, action) => {
      const groupIndex = state.groups.findIndex(({ _id }) => _id === action.payload.groupId);
      const tasks = state.groups[groupIndex].tasks.filter(
        ({ _id }) => _id !== action.payload.taskId
      );

      state.groups[groupIndex].tasks = tasks;
    });
    builder.addCase(removeTask.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    });

    /* * */

    /* handle move task (POST) results */

    builder.addCase(moveTask.fulfilled, (state, action) => {
      // remove old
      const prevGroupIndex = state.groups.findIndex(({ _id }) => _id === action.payload.oldGroupId);
      const prevGroupTasks = state.groups[prevGroupIndex].tasks.filter(
        ({ _id }) => _id !== action.payload.oldTaskId
      );
      state.groups[prevGroupIndex].tasks = prevGroupTasks;

      // add new
      const nextGroupIndex = state.groups.findIndex(({ _id }) => _id === action.payload.newGroupId);
      state.groups[nextGroupIndex].tasks.push(action.payload.newTask);

      state.status = "succeeded";
    });
    builder.addCase(moveTask.rejected, (state, action) => {
      console.log(action);
      state.error = action.payload ? action.payload : action.error.message;
      state.status = "failed";
    });

    /* * */
  },
});

// Actions

// Selectors
export const selectTaskGroups = (state: RootState) => state.tasks.groups;
export const selectTask = (groupId: string, taskId: string | undefined) => (state: RootState) => {
  if (!taskId) return null;

  const group = state.tasks.groups.find((g) => g._id === groupId);
  if (!group) return null;

  const task = group.tasks.find((t) => t._id === taskId);
  if (!task) return null;

  return task;
};

export default slice.reducer;
