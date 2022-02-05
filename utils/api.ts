import { store } from "app/store";

export interface IRequestOptions {
  method: string;
  headers: { [key: string]: string };
  body: undefined | string;
}

/**
 * Wrapper for `fetch()`, courtesy of
 * https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper and
 * https://redux.js.org/tutorials/essentials/part-3-data-flow.
 *
 * @param endpoint Endpoint path
 * @param method Request method, defaults to GET
 * @param body Optional request body
 */
async function api(
  endpoint: string,
  method: string = "GET",
  body: { [key: string]: string } | undefined = undefined
) {
  const token = store.getState().auth.token;
  const options: IRequestOptions = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: undefined,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  let responseData;
  try {
    const response = await fetch(`/api/v1/${endpoint}`, options);
    responseData = await response.json();

    if (!response.ok) {
      const errorMsg = responseData.message
        ? `${responseData.message} - ${response.status}`
        : `API request failed - ${response.status}`;
      const error = new Error(errorMsg);
      console.error(error);

      return Promise.reject(error);
    }

    return {
      status: response.status,
      data: responseData.data,
      headers: response.headers,
      url: response.url,
    };
  } catch (error: any) {
    console.error(error);
    const errorMsg = error.message ? error.message : responseData;

    return Promise.reject(`500 - ${errorMsg}`);
  }
}

/**
 * @param endpoint Endpoint path
 */
api.get = function (endpoint: string) {
  return api(endpoint, "GET");
};

/**
 * @param endpoint Endpoint path
 * @param body Request body
 */
api.post = function (endpoint: string, body: { [key: string]: any }) {
  return api(endpoint, "POST", body);
};

/**
 * @param endpoint Endpoint path (with id)
 * @param body Request body
 */
api.put = function (endpoint: string, body: { [key: string]: any }) {
  return api(endpoint, "PUT", body);
};

/**
 * @param endpoint Endpoint path (with id)
 */
api.delete = function (endpoint: string) {
  return api(endpoint, "DELETE");
};

export default api;
