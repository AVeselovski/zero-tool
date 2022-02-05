import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { RootState } from "../store";
import type { ICard, IList, IProject } from "types";

const API_URL = "/api/v1";

type PostListRequest = {
  projectId: number;
  data: {
    name: string;
  };
};

type DeleteListRequest = {
  projectId: number;
  listId: number;
};

type PatchListRequest = DeleteListRequest & {
  data: {
    name?: string;
  };
};

type MoveListRequest = DeleteListRequest & {
  data: {
    position: number;
  };
};

type PostCardRequest = {
  projectId: number;
  listId: number;
  data: {
    name: string;
    body: string;
  };
};

type DeleteCardRequest = {
  projectId: number;
  listId: number;
  cardId: number;
};

type PatchCardRequest = DeleteCardRequest & {
  data: {
    name?: string;
    body?: string;
  };
};

type MoveCardRequest = DeleteCardRequest & {
  data: {
    position: number;
    listId: number;
  };
};

export const zeroApi = createApi({
  reducerPath: "zeroApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    // TODO: optimistic updates with onQueryStarted

    /* Projects */
    fetchProjects: builder.query<IProject[], void>({
      query: () => "projects",
      transformResponse: (response: { data: IProject[] }) => response.data,
    }),
    fetchProjectById: builder.query<IProject, string>({
      query: (id) => `projects/${id}`,
      transformResponse: (response: { data: IProject }) => response.data,
    }),

    /* Lists */
    postList: builder.mutation<IList, PostListRequest>({
      query: ({ projectId, data }) => ({
        url: `projects/${projectId}/lists`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: { data: IList }) => response.data,
    }),
    patchList: builder.mutation<IList, PatchListRequest>({
      query: ({ projectId, listId, data }) => ({
        url: `projects/${projectId}/lists/${listId}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: { data: IList }) => response.data,
    }),
    moveList: builder.mutation<IList[], MoveListRequest>({
      query: ({ projectId, listId, data }) => ({
        url: `projects/${projectId}/lists/${listId}/move`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: { data: IList[] }) => response.data,
    }),
    deleteList: builder.mutation<{ listId: number }, DeleteListRequest>({
      query: ({ projectId, listId }) => ({
        url: `projects/${projectId}/lists/${listId}`,
        method: "DELETE",
      }),
      transformResponse: (response: { data: { listId: number } }) => response.data,
    }),

    /* Cards */
    postCard: builder.mutation<ICard, PostCardRequest>({
      query: ({ projectId, listId, data }) => ({
        url: `projects/${projectId}/lists/${listId}/cards`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: { data: ICard }) => response.data,
    }),
    patchCard: builder.mutation<ICard, PatchCardRequest>({
      query: ({ projectId, listId, cardId, data }) => ({
        url: `projects/${projectId}/lists/${listId}/cards/${cardId}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: { data: ICard }) => response.data,
    }),
    moveCard: builder.mutation<IList[], MoveCardRequest>({
      query: ({ projectId, listId, cardId, data }) => ({
        url: `projects/${projectId}/lists/${listId}/cards/${cardId}/move`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: { data: IList[] }) => response.data,
    }),
    deleteCard: builder.mutation<{ listId: number; cardId: number }, DeleteCardRequest>({
      query: ({ projectId, listId, cardId }) => ({
        url: `projects/${projectId}/lists/${listId}/cards/${cardId}`,
        method: "DELETE",
      }),
      transformResponse: (response: { data: { listId: number; cardId: number } }) => response.data,
    }),
  }),
});

export const {
  useFetchProjectsQuery,
  useFetchProjectByIdQuery,
  usePostListMutation,
  usePatchListMutation,
  useMoveListMutation,
  useDeleteListMutation,
  usePostCardMutation,
  usePatchCardMutation,
  useMoveCardMutation,
  useDeleteCardMutation,
} = zeroApi;
