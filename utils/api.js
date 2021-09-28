/**
 * Wrapper for `fetch()`, courtesy of
 * https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper and
 * https://redux.js.org/tutorials/essentials/part-3-data-flow.
 *
 * @param {string} endpoint Endpoint path.
 * @param {string} method Request method, defaults to GET.
 * @param {Object} body Optional request body.
 */
async function api(endpoint, method = "GET", body = undefined) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  let data;
  try {
    const response = await fetch(`/api/v1/${endpoint}`, options);
    data = await response.json();

    if (!response.ok) {
      const errorMsg = data.message
        ? `${data.message} - ${response.status}`
        : `API request failed - ${response.status}`;
      const error = new Error(errorMsg);
      console.error(error);

      return Promise.reject(error);
    }

    return {
      status: response.status,
      data: data.data,
      headers: response.headers,
      url: response.url,
    };
  } catch (error) {
    console.error(error);
    const errorMsg = error.message ? error.message : data;

    return Promise.reject({ error: `${errorMsg} - 500` });
  }
}

/**
 * @param {string} endpoint Endpoint path.
 */
api.get = function (endpoint) {
  return api(endpoint, "GET");
};

/**
 * @param {string} endpoint Endpoint path.
 * @param {Object} body Request body.
 */
api.post = function (endpoint, body) {
  return api(endpoint, "POST", body);
};

/**
 * @param {string} endpoint Endpoint path (with id).
 */
api.delete = function (endpoint) {
  return api(endpoint, "DELETE");
};

export default api;
