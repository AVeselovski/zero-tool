import React, { createContext, useContext, useReducer, Reducer } from "react";

enum ActionType {
  ToggleAppNav = "toggle-app-nav",
  ToggleProjectSidebar = "toggle-project-sidebar",
  // ...
}

interface IState {
  appNavOpen: boolean;
  projectSidebarOpen: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

interface ContextProps {
  state: IState;
  toggleAppNav: () => void;
  toggleProjectSidebar: () => void;
}

const initialState: IState = { appNavOpen: false, projectSidebarOpen: false };

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case ActionType.ToggleAppNav:
      return { ...state, appNavOpen: !state.appNavOpen };
    case ActionType.ToggleProjectSidebar:
      return { ...state, projectSidebarOpen: !state.projectSidebarOpen };
    default:
      return state;
  }
};

export const UiContext = createContext({} as ContextProps);
export const UiContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<IState, Action>>(reducer, initialState);

  function toggleAppNav() {
    dispatch({
      type: ActionType.ToggleAppNav,
    });
  }

  function toggleProjectSidebar() {
    dispatch({
      type: ActionType.ToggleProjectSidebar,
    });
  }

  const context = {
    state,
    toggleAppNav,
    toggleProjectSidebar,
  };

  return <UiContext.Provider value={context}>{children}</UiContext.Provider>;
};

export const useUi = () => {
  return useContext(UiContext);
};

// export const useUi = (newState?: IState) => {
//   const [state, dispatch] = useReducer<Reducer<IState, Action>>(reducer, newState || initialState);

//   return { state, dispatch };
// };
