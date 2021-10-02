// UNUSED for now...
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "/api/v1";

// Define a service using a base URL and expected endpoints
export const zeroApi = createApi({
  reducerPath: "zeroApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => "projects",
      transformResponse: (response) => response.data,
    }),
    getProjectById: builder.query({
      query: (id) => `projects/${id}`,
      transformResponse: (response) => response.data,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
  useLazyGetProjectByIdQuery,
} = zeroApi;
