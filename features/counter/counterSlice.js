import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const slice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = slice.actions;

// Thunks
export const incrementAsync = (amount) => async (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// Selectors
export const selectCount = (state) => state.counter.value;

export default slice.reducer;
