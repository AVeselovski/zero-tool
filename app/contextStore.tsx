// UNUSED, for UI handling in the future

import React, { createContext, useContext, useReducer, Reducer } from "react";

enum ActionType {
  ToggleSideNav = "toggle-side-nav",
  // ...
}

interface State {
  sideNavOpen: boolean;
}

// modify this once in use
interface Action {
  type: string;
  payload: any;
}

const initialState: State = { sideNavOpen: false };

const AppContext = createContext(initialState);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ToggleSideNav:
      return { ...state, sideNavOpen: !state.sideNavOpen };
    default:
      return state;
  }
};

function useStoreProvider(newState: State) {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, newState || initialState);

  return { state, dispatch };
}

export function StoreProvider({
  children,
  state,
}: {
  children: React.ReactNode;
  state?: Partial<State>;
}) {
  const store = useStoreProvider({ ...initialState, ...state });

  return <AppContext.Provider value={store.state}>{children}</AppContext.Provider>;
}

export const useStore = () => {
  return useContext(AppContext);
};
