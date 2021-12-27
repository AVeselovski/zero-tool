// UNUSED, for UI handling in the future

import React, { createContext, useContext, useReducer, Reducer } from "react";

enum ActionType {
  ToggleSideNav = "toggle-side-nav",
  // ...
}

interface IState {
  sideNavOpen: boolean;
}

// modify this once in use
interface Action {
  type: string;
  payload?: any;
}

interface ContextProps {
  state: IState;
  toggleNav: () => void;
}

const initialState: IState = { sideNavOpen: false };

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
    case ActionType.ToggleSideNav:
      return { ...state, sideNavOpen: !state.sideNavOpen };
    default:
      return state;
  }
};

export const UiContext = createContext({} as ContextProps);
export const UiContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<IState, Action>>(reducer, initialState);

  function toggleNav() {
    dispatch({
      type: ActionType.ToggleSideNav,
    });
  }

  const context = {
    state,
    toggleNav,
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
