import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "https://swapi.dev/api/";

export const starWarsApi = createApi({
  reducerPath: "starWarsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    // auth headers here
    prepareHeaders(headers) {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");

      return headers;
    },
  }),
  endpoints(builder) {
    return {
      getStarships: builder.query({
        query(limit = 2) {
          return `/starships?limit=${limit}`;
        },
      }),
    };
  },
});

export const { useGetStarshipsQuery } = starWarsApi;
