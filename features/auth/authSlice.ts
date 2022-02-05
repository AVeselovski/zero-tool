import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "app/store";
import type { IAuthUser } from "types";

type AuthState = {
  user: IAuthUser | null;
  token: string | null;
};

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: IAuthUser; token: string }>
    ) => {
      state.user = user;
      state.token = token;
    },
  },
});

export const { setCredentials } = slice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;

export default slice.reducer;
