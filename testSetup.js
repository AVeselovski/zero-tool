// From Redux examples, setups redux wrapper, to be figured out later...
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import projectsReducer from "@features/projects/projectsSlice";
import tasksReducer from "@features/tasks/tasksSlice";

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        projects: projectsReducer,
        tasks: tasksReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
