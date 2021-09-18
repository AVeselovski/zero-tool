async function api(url, method = "GET", body = null) {
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

  let response;
  try {
    response = await fetch(`/api/v1/${url}`, options);

    if (!response.ok) {
      const errorMsg = `API request failed - ${response.status}`;
      const error = new Error(errorMsg);

      console.error(error);

      return { error: errorMsg };
    }
  } catch (error) {
    console.error(error);

    return { error: `${error} - 500` };
  }

  const data = await response.json();

  return data;
}

export default api;
