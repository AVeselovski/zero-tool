// UNUSED, for UI handling in the future

import { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

const initialState = {};

const reducer = (state, action) => {
  switch (action.type) {
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
