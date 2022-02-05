import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { zeroApi } from "app/services/zeroApi";

import type { RootState } from "../../app/store";
import type { IProject } from "types";

type ProjectState = IProject;

const initialState: ProjectState = {
  id: null,
  name: "",
  description: "Lorem ipsum, projectus descriptum.",
  ownerId: null,
  lists: [],
  users: [],
};

const slice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* Handle fetch project (GET) */
    builder.addMatcher(zeroApi.endpoints.fetchProjectById.matchFulfilled, (_, { payload }) => {
      const sorted = payload.lists.slice().sort((a, b) => a.position - b.position);

      return {
        ...payload,
        lists: sorted,
      };
    });

    /* Handle add list (POST) */
    builder.addMatcher(zeroApi.endpoints.postList.matchFulfilled, (state, { payload }) => {
      state.lists.push(payload);
    });

    /* Handle update list (PATCH) */
    builder.addMatcher(zeroApi.endpoints.patchList.matchFulfilled, (state, { payload }) => {
      const listIndex = state.lists.findIndex(({ id }) => id === payload.id);

      state.lists[listIndex] = payload;
    });

    /* Handle move list (PATCH) */
    builder.addMatcher(zeroApi.endpoints.moveList.matchFulfilled, (state, { payload }) => {
      state.lists = payload;
    });

    /* Handle delete list (DELETE) */
    builder.addMatcher(zeroApi.endpoints.deleteList.matchFulfilled, (state, { payload }) => {
      const lists = state.lists.filter(({ id }) => id !== payload.listId);

      state.lists = lists;
    });

    /* Handle add card (POST) */
    builder.addMatcher(zeroApi.endpoints.postCard.matchFulfilled, (state, { payload }) => {
      const listIndex = state.lists.findIndex(({ id }) => id === payload.listId);

      state.lists[listIndex].cards.push(payload);
    });

    /* Handle update card (PATCH) */
    builder.addMatcher(zeroApi.endpoints.patchCard.matchFulfilled, (state, { payload }) => {
      const listIndex = state.lists.findIndex(({ id }) => id === payload.listId);
      const cardIndex = state.lists[listIndex].cards.findIndex(({ id }) => id === payload.id);

      state.lists[listIndex].cards[cardIndex] = payload;
    });

    /* Handle move card (PATCH) */
    builder.addMatcher(zeroApi.endpoints.moveCard.matchFulfilled, (state, { payload }) => {
      state.lists = payload;
    });

    /* Handle delete card (DELETE) */
    builder.addMatcher(zeroApi.endpoints.deleteCard.matchFulfilled, (state, { payload }) => {
      const listIndex = state.lists.findIndex(({ id }) => id === payload.listId);
      const cards = state.lists[listIndex].cards.filter(({ id }) => id !== payload.cardId);

      state.lists[listIndex].cards = cards;
    });
  },
});

// export const {} = slice.actions;

export const selectProject = (state: RootState) => state.project;
export const selectProjectId = (state: RootState) => state.project.id;
export const selectLists = (state: RootState) => state.project.lists;
export const selectListByPosition = (position: number) => (state: RootState) => {
  if (!position) return null;

  const list = state.project.lists[position - 1];
  if (!list) return null;

  return list;
};
export const selectCard = (listId: number, cardId: number | undefined) => (state: RootState) => {
  if (!cardId) return null;

  const list = state.project.lists.find(({ id }) => id === listId);
  if (!list) return null;

  const card = list.cards.find(({ id }) => id === cardId);
  if (!card) return null;

  return card;
};

export default slice.reducer;
