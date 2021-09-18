import { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

const initialState = {
  projects: [],
  activeProject: "",
  taskGroups: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PROJECTS":
      return { ...state, projects: action.projects };
    case "SET_ACTIVE_PROJECT":
      return { ...state, activeProject: action.activeProject };
    case "SET_TASK_GROUPS":
      return { ...state, taskGroups: action.taskGroups };
    case "ADD_TASK_GROUP": {
      const taskGroups = [...state.taskGroups, action.taskGroup];

      return { ...state, taskGroups };
    }
    case "REMOVE_TASK_GROUP": {
      const taskGroups = state.taskGroups.filter(
        (t) => t._id !== action.taskGroupId
      );

      return { ...state, taskGroups };
    }
    case "ADD_TASK": {
      /** (?) What are some best practices regarding handling these kind of operations? */
      const taskGroup = state.taskGroups.find(
        (g) => g._id === action.taskGroupId
      );
      const tasks = [...taskGroup.tasks, action.task];
      const updatedTaskGroup = { ...taskGroup, tasks };
      const taskGroups = state.taskGroups.map((g) =>
        g._id === updatedTaskGroup._id ? updatedTaskGroup : g
      );
      /** (?) */

      return { ...state, taskGroups };
    }
    case "REMOVE_TASK": {
      const taskGroup = state.taskGroups.find(
        (g) => g._id === action.taskGroupId
      );
      const tasks = taskGroup.tasks.filter((t) => t._id !== action.taskId);
      const updatedTaskGroup = { ...taskGroup, tasks };
      const taskGroups = state.taskGroups.map((g) =>
        g._id === updatedTaskGroup._id ? updatedTaskGroup : g
      );

      return { ...state, taskGroups };
    }
    default:
      return state;
  }
};

function useStoreProvider(newState) {
  const [state, dispatch] = useReducer(reducer, newState || initialState);

  return { state, dispatch };
}

export function StoreProvider({ children, state = null }) {
  const store = useStoreProvider(state);

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}

export const useStore = () => {
  return useContext(AppContext);
};
