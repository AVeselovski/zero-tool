import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { IProject } from "../../types";

const API_URL = "/api/v1";

export const projectsApiSlice = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders(headers) {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchProjects: builder.query<{ success: string; data: IProject[] }, void>({
      query: () => "/projects",
      // transformResponse: (response) => response.data,
    }),
  }),
});

export const { useFetchProjectsQuery } = projectsApiSlice;
